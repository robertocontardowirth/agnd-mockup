// RecoveryApp.jsx — recuperación de contraseña AGND (2 estados)

function RecoveryApp() {
  const [email, setEmail] = React.useState('');
  const [stage, setStage] = React.useState('request'); // 'request' | 'sent'
  const [submitting, setSubmitting] = React.useState(false);

  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  const submit = (e) => {
    e.preventDefault();
    if (!emailValid) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStage('sent');
    }, 1100);
  };

  React.useEffect(() => { if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons(); });

  return (
    <div className="auth-shell">
      <main className="auth-form-col">
        <TopBar rightLabel="¿Recordaste tu clave?" rightLinkText="Inicia sesión" rightHref="login.html" />

        <div className="auth-form-wrap">
          {stage === 'request' && (
            <>
              <a href="login.html" className="back-link">
                <i data-lucide="arrow-left"></i> Volver a inicio de sesión
              </a>

              <div className="auth-eyebrow">Recuperar acceso</div>
              <h1 className="auth-title">¿Olvidaste tu <span className="accent">contraseña</span>?</h1>
              <p className="auth-sub">No te preocupes. Pásanos el email con el que creaste tu cuenta y te enviaremos un link para restablecerla.</p>

              <form onSubmit={submit} noValidate>
                <div className="field-group">
                  <div className="field">
                    <label className="field-label" htmlFor="email">Email de tu cuenta</label>
                    <input id="email" type="email" className="field-input"
                      placeholder="hola@tunegocio.cl"
                      value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" autoFocus />
                    <div className="field-hint">Te llegará un correo desde <strong>no-reply@agnd.cl</strong> en menos de 1 minuto.</div>
                  </div>
                </div>

                <button type="submit" className={`btn btn-primary auth-submit ${submitting ? 'is-loading' : ''}`} disabled={!emailValid || submitting}>
                  {submitting ? <><span className="spinner" /> Enviando link…</> : <>Enviar link de recuperación <i data-lucide="send" style={{ width: 16, height: 16 }}></i></>}
                </button>

                <div className="auth-footer">
                  ¿Aún no tienes cuenta? <a href="register.html">Crear cuenta gratis</a>
                </div>
              </form>
            </>
          )}

          {stage === 'sent' && (
            <div className="recovery-success">
              <div className="success-icon-wrap">
                <i data-lucide="mail-check"></i>
              </div>

              <div className="auth-eyebrow" style={{ color: 'var(--success)' }}>Listo</div>
              <h1 className="auth-title">Revisa tu <span className="accent">bandeja</span>.</h1>
              <p className="auth-sub">Si existe una cuenta asociada, te enviamos un link para crear una contraseña nueva. El enlace caduca en 30 minutos.</p>

              <div className="success-email-pill">
                <i data-lucide="at-sign" style={{ width: 14, height: 14 }}></i>
                {email}
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 22, marginTop: 4 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--fg-3)', textTransform: 'uppercase', marginBottom: 14 }}>¿No te llegó?</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--fg-2)' }}>
                  <li style={{ display: 'flex', gap: 10 }}><i data-lucide="check" style={{ width: 16, height: 16, color: 'var(--agnd-aqua-700)', marginTop: 3 }}></i> Revisa la carpeta de spam o promociones.</li>
                  <li style={{ display: 'flex', gap: 10 }}><i data-lucide="check" style={{ width: 16, height: 16, color: 'var(--agnd-aqua-700)', marginTop: 3 }}></i> Confirma que escribiste el email correcto.</li>
                  <li style={{ display: 'flex', gap: 10 }}><i data-lucide="check" style={{ width: 16, height: 16, color: 'var(--agnd-aqua-700)', marginTop: 3 }}></i> Espera 60 segundos antes de pedir otro link.</li>
                </ul>
              </div>

              <div className="success-actions">
                <button type="button" className="ghost-btn" onClick={() => { setStage('request'); }}>
                  Reenviar el correo
                </button>
                <a href="login.html" className="ghost-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <i data-lucide="arrow-left" style={{ width: 14, height: 14 }}></i> Volver al login
                </a>
              </div>
            </div>
          )}
        </div>

        <TinyFoot />
      </main>

      <BrandPanelMosaic />
    </div>
  );
}

window.RecoveryApp = RecoveryApp;
