// LoginApp.jsx — inicio de sesión AGND

function LoginApp() {
  const [form, setForm] = React.useState({ email: '', password: '', remember: true });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(false);
  const formRef = React.useRef(null);

  // Sincroniza el autocompletado del navegador con el estado (no dispara onChange)
  React.useEffect(() => {
    const f = formRef.current;
    if (!f) return;
    const sync = () => setForm(prev => {
      const email = f.querySelector('#email');
      const pwd = f.querySelector('#password');
      const next = { ...prev };
      if (email && email.value && email.value !== prev.email) next.email = email.value;
      if (pwd && pwd.value && pwd.value !== prev.password) next.password = pwd.value;
      return next;
    });
    const onAnim = (e) => { if (e.animationName === 'onAutoFillStart') sync(); };
    f.addEventListener('animationstart', onAnim, true);
    const timers = [60, 200, 500, 1000].map(t => setTimeout(sync, t));
    return () => {
      f.removeEventListener('animationstart', onAnim, true);
      timers.forEach(clearTimeout);
    };
  }, []);

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    // Lee los valores reales del DOM: el click ya es un gesto del usuario,
    // así que aquí sí están disponibles los datos autocompletados por el navegador.
    const f = formRef.current;
    const email = ((f && f.querySelector('#email')?.value) || form.email).trim();
    const password = (f && f.querySelector('#password')?.value) || form.password;
    setForm(prev => ({ ...prev, email, password }));
    if (!email || !password) return;
    setError(false);
    setSubmitting(true);
    setTimeout(() => {
      // demo: muestra error si pw es "demo"
      if (password === 'demo') {
        setSubmitting(false);
        setError(true);
        return;
      }
      // éxito: entra a la plataforma interna
      window.location.href = 'app.html';
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

          <form ref={formRef} onSubmit={submit} noValidate>
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

            <button type="submit" className={`btn btn-primary auth-submit ${submitting ? 'is-loading' : ''}`} disabled={submitting}>
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
