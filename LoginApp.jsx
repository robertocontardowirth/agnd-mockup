// LoginApp.jsx — inicio de sesión AGND

function LoginApp() {
  const [form, setForm] = React.useState({ email: '', password: '', remember: true });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(false);

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const canSubmit = form.email && form.password;

  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(false);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      // demo: muestra error si pw es "demo"
      if (form.password === 'demo') setError(true);
    }, 1100);
  };

  React.useEffect(() => { if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons(); });

  return (
    <div className="auth-shell">
      <main className="auth-form-col">
        <TopBar rightLabel="¿Sin cuenta?" rightLinkText="Crear cuenta" rightHref="register.html" />

        <div className="auth-form-wrap">
          <div className="auth-eyebrow">Bienvenid@ de vuelta</div>
          <h1 className="auth-title">Hola otra <span className="accent">vez</span>.</h1>
          <p className="auth-sub">Entra a tu agenda, revisa las reservas del día y dedícale tiempo a lo que importa.</p>

          <form onSubmit={submit} noValidate>
            <GoogleButton>Continuar con Google</GoogleButton>

            <div className="auth-divider">o con tu email</div>

            <div className="field-group">
              <div className="field">
                <label className="field-label" htmlFor="email">Email</label>
                <input id="email" type="email" className={`field-input ${error ? 'error' : ''}`}
                  placeholder="hola@tunegocio.cl"
                  value={form.email} onChange={update('email')} autoComplete="email" autoFocus />
              </div>

              <PasswordField
                id="password"
                label="Contraseña"
                value={form.password}
                onChange={update('password')}
                placeholder="Tu contraseña"
                labelAside={<a href="recovery.html">¿Olvidaste tu contraseña?</a>}
                autoComplete="current-password"
              />

              {error && (
                <div className="field-hint error" style={{ marginTop: -6 }}>
                  <i data-lucide="alert-circle" style={{ width: 12, height: 12 }}></i>
                  Email o contraseña incorrectos. Vuelve a intentarlo.
                </div>
              )}
            </div>

            <label className="checkbox-row" style={{ marginBottom: 8 }}>
              <input type="checkbox" checked={form.remember} onChange={update('remember')} />
              <span>Mantener sesión iniciada en este equipo</span>
            </label>

            <button type="submit" className={`btn btn-primary auth-submit ${submitting ? 'is-loading' : ''}`} disabled={!canSubmit || submitting}>
              {submitting ? <><span className="spinner" /> Entrando…</> : <>Entrar a mi agenda <i data-lucide="arrow-right" style={{ width: 16, height: 16 }}></i></>}
            </button>

            <div className="auth-footer">
              ¿Aún no tienes cuenta? <a href="register.html">Pruébalo gratis</a>
            </div>
          </form>
        </div>

        <TinyFoot />
      </main>

      <BrandPanelQuote
        quote="Abro AGND y veo el día completo. Sin llamadas perdidas, sin huecos. La calma de saber que todo encaja."
        author="Tomás Aravena"
        role="Barbería Norte · Ñuñoa"
        stats={[
          { num: '38h', label: 'Ahorradas al mes' },
          { num: '92%', label: 'Tasa de asistencia' },
          { num: '24/7', label: 'Reservas online' },
        ]}
      />
    </div>
  );
}

window.LoginApp = LoginApp;
