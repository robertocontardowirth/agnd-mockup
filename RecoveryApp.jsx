// RecoveryApp.jsx — recuperación de contraseña AGND (2 estados)

const IcoArrowLeft = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const IcoSend      = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
const IcoMailCheck = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>;
const IcoAtSign    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>;
const IcoCheck     = ({ color }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 3, flexShrink: 0 }}><path d="M20 6 9 17l-5-5"/></svg>;

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


  return (
    <div className="auth-shell">
      <main className="auth-form-col">
        <TopBar rightLabel="¿Recordaste tu clave?" rightLinkText="Inicia sesión" rightHref="login.html" />

        <div className="auth-form-wrap">
          {stage === 'request' && (
            <>
              <a href="login.html" className="back-link">
                <IcoArrowLeft /> Volver a inicio de sesión
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
                  {submitting ? <><span className="spinner" /> Enviando link…</> : <>Enviar link de recuperación <IcoSend /></>}
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
                <IcoMailCheck />
              </div>

              <div className="auth-eyebrow" style={{ color: 'var(--success)' }}>Listo</div>
              <h1 className="auth-title">Revisa tu <span className="accent">bandeja</span>.</h1>
              <p className="auth-sub">Si existe una cuenta asociada, te enviamos un link para crear una contraseña nueva. El enlace caduca en 30 minutos.</p>

              <div className="success-email-pill">
                <IcoAtSign />
                {email}
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 22, marginTop: 4 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--fg-3)', textTransform: 'uppercase', marginBottom: 14 }}>¿No te llegó?</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--fg-2)' }}>
                  <li style={{ display: 'flex', gap: 10 }}><IcoCheck color="var(--agnd-aqua-700)" /> Revisa la carpeta de spam o promociones.</li>
                  <li style={{ display: 'flex', gap: 10 }}><IcoCheck color="var(--agnd-aqua-700)" /> Confirma que escribiste el email correcto.</li>
                  <li style={{ display: 'flex', gap: 10 }}><IcoCheck color="var(--agnd-aqua-700)" /> Espera 60 segundos antes de pedir otro link.</li>
                </ul>
              </div>

              <div className="success-actions">
                <button type="button" className="ghost-btn" onClick={() => { setStage('request'); }}>
                  Reenviar el correo
                </button>
                <a href="login.html" className="ghost-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <IcoArrowLeft size={14} /> Volver al login
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
