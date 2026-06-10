// ContactoApp.jsx — página de contacto AGND

function ContactoApp() {
  const REASONS = [
    { id: 'demo',    label: 'Quiero una demo',         icon: 'play-circle' },
    { id: 'sales',   label: 'Hablar con ventas',       icon: 'briefcase' },
    { id: 'support', label: 'Ayuda con mi cuenta',     icon: 'life-buoy' },
    { id: 'partner', label: 'Alianza / Partner',       icon: 'handshake' },
    { id: 'press',   label: 'Prensa',                  icon: 'newspaper' },
    { id: 'other',   label: 'Otra cosa',               icon: 'message-circle' },
  ];

  const [reason, setReason] = React.useState('demo');
  const [form, setForm] = React.useState({ name: '', email: '', business: '', message: '' });
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const valid = form.name && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) && form.message.length > 5;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1200);
  };

  React.useEffect(() => { if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons(); });

  return (
    <>
      <SiteNav active="contact" />

      <header className="page-header tinted">
        <div className="container-1280">
          <div className="eyebrow-row">Contacto</div>
          <h1>Conversemos. Sin <span className="accent">script.</span></h1>
          <p className="lead">Dudas, demos, soporte o ideas locas. Te leemos y respondemos —de verdad— en menos de 24 horas hábiles.</p>
          <div className="meta-row">
            <div><span className="meta-key">Respuesta</span><span className="meta-val">&lt; 24h</span></div>
            <div><span className="meta-key">Cobertura</span><span className="meta-val">Chile · LATAM</span></div>
            <div><span className="meta-key">Idiomas</span><span className="meta-val">ES · EN · PT</span></div>
          </div>
        </div>
      </header>

      <section>
        <div className="container-1280">
          <div className="contact-grid">
            {/* ===== Form ===== */}
            <div className="contact-form-card">
              {!done && (
                <>
                  <h2>Cuéntanos qué necesitas.</h2>
                  <p className="form-sub">Mientras más contexto, mejor. Te conectamos con la persona correcta del equipo.</p>

                  <form onSubmit={submit} noValidate>
                    <div className="cf" style={{ marginBottom: 20 }}>
                      <label>Motivo</label>
                      <div className="reason-chips">
                        {REASONS.map(r => (
                          <button type="button" key={r.id}
                            className={`reason-chip ${reason === r.id ? 'active' : ''}`}
                            onClick={() => setReason(r.id)}>
                            <i data-lucide={r.icon} style={{ width: 14, height: 14 }}></i>
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="contact-field-group">
                      <div className="contact-field-row">
                        <div className="fl-field">
                          <input id="name" placeholder=" " value={form.name} onChange={update('name')} autoComplete="name" />
                          <label htmlFor="name">Nombre</label>
                        </div>
                        <div className="fl-field">
                          <input id="business" placeholder=" " value={form.business} onChange={update('business')} autoComplete="organization" />
                          <label htmlFor="business">Negocio <span className="fl-optional">(opcional)</span></label>
                        </div>
                      </div>

                      <div className="fl-field">
                        <input id="email" type="email" placeholder=" " value={form.email} onChange={update('email')} autoComplete="email" />
                        <label htmlFor="email">Email</label>
                      </div>

                      <div className="fl-field fl-field--textarea">
                        <textarea id="message" placeholder=" " value={form.message} onChange={update('message')} />
                        <label htmlFor="message">Mensaje</label>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={!valid || submitting}>
                      {submitting ? <>Enviando…</> : <>Enviar mensaje <i data-lucide="send" style={{ width: 16, height: 16 }}></i></>}
                    </button>
                  </form>
                </>
              )}

              {done && (
                <div className="contact-success">
                  <div className="contact-success-icon">
                    <i data-lucide="check"></i>
                  </div>
                  <div>
                    <h3>Recibido. Gracias, {form.name.split(' ')[0] || 'crack'}.</h3>
                    <p>Te respondemos a <strong>{form.email}</strong> en menos de 24 horas hábiles. Mientras tanto, puedes <a href="index.html#features" style={{ color: 'var(--agnd-plum-500)', borderBottom: '1px solid', textDecoration: 'none' }}>explorar el producto</a>.</p>
                  </div>
                </div>
              )}
            </div>

            {/* ===== Channels rail ===== */}
            <div className="channels">
              <div className="channel-card featured">
                <div className="channel-head">
                  <div className="channel-icon"><i data-lucide="message-square"></i></div>
                  <h4>Chat en vivo</h4>
                </div>
                <p>La forma más rápida para dudas urgentes durante horario hábil.</p>
                <span className="channel-meta">Lun a Vie · 9:00 – 19:00 CLT</span>
              </div>

              <div className="channel-card">
                <div className="channel-head">
                  <div className="channel-icon"><i data-lucide="mail"></i></div>
                  <h4>Email directo</h4>
                </div>
                <p>Para conversaciones largas, envíos de archivos o requerimientos comerciales.</p>
                <a className="channel-link" href="mailto:hola@agnd.cl">hola@agnd.cl <i data-lucide="arrow-up-right" style={{ width: 12, height: 12 }}></i></a>
              </div>

              <div className="channel-card">
                <div className="channel-head">
                  <div className="channel-icon"><i data-lucide="life-buoy"></i></div>
                  <h4>Soporte</h4>
                </div>
                <p>¿Eres cliente? Entra al centro de ayuda o escribe desde tu cuenta para soporte prioritario.</p>
                <a className="channel-link" href="#">Centro de ayuda <i data-lucide="arrow-up-right" style={{ width: 12, height: 12 }}></i></a>
              </div>

              <div className="office-card">
                <div className="office-mosaic">
                  <MosaicTile pattern="010101111" size={56} on="#4CD5D2" off="#DEDAD2" />
                </div>
                <div>
                  <h4>Oficina Santiago</h4>
                  <p>Av. Apoquindo 4501, piso 12<br/>Las Condes, Región Metropolitana</p>
                  <div className="office-meta">VISITAS CON CITA · LUN–VIE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

window.ContactoApp = ContactoApp;
