// QuienesSomosApp.jsx — página Quiénes Somos / Sobre AGND

const VALORES = [
  { icon: 'target', title: 'Nuestra misión', body: 'Lograr que cualquier agenda funcione en segundos, para que los profesionales se enfoquen en lo que saben hacer bien.' },
  { icon: 'eye',    title: 'Nuestra visión', body: 'Ser la plataforma de reservas de referencia en Latinoamérica para negocios de servicios.' },
  { icon: 'heart',  title: 'Nuestros valores', body: 'Claridad sobre complejidad. Calidad sobre velocidad. Y siempre, el cliente al centro.' },
];

const HISTORIA = [
  { year: '2023', label: 'El problema',    desc: 'Detectamos el caos del agendamiento en negocios de servicios hispanohablantes.' },
  { year: '2024', label: 'El lanzamiento', desc: 'AGND.CL entra en beta con los primeros 50 negocios de Santiago.' },
  { year: '2025', label: 'La expansión',   desc: 'Crecemos a México, Colombia y Perú. Superamos las 10.000 reservas mensuales.' },
  { year: '2026', label: 'Hoy',            desc: 'Más de 500 negocios activos, nuevas integraciones y pagos en toda LATAM.' },
];

const EQUIPO = [
  { name: 'Martina Vega',      role: 'Co-fundadora & CEO',  bio: 'Diseñadora de productos con 10 años en startups. Obsesionada con la experiencia de usuario.',                         initials: 'MV', color: '#4CD5D2' },
  { name: 'Sebastián Pino',    role: 'Co-fundador & CTO',   bio: 'Ingeniero de software. Construyó plataformas de pagos en fintech antes de fundar AGND.',                             initials: 'SP', color: '#AA4465' },
  { name: 'Valentina Cruz',    role: 'Head of Growth',      bio: 'Especialista en expansión LATAM. Lideró go-to-market en tres países simultáneamente.',                               initials: 'VC', color: '#222A55' },
  { name: 'Tomás Herrera',     role: 'Lead Engineer',       bio: 'Arquitecto de sistemas distribuidos. Le gusta que las cosas funcionen rápido y sin sorpresas.',                      initials: 'TH', color: '#4CD5D2' },
];

const SectionEyebrow = ({ children }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 12,
    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
    letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)',
    marginBottom: 18,
  }}>
    <span style={{ display: 'block', width: 28, height: 1.5, background: 'var(--accent)', flexShrink: 0 }} />
    {children}
  </div>
);

function QuienesSomosApp() {
  React.useEffect(() => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  });

  return (
    <>
      <SiteNav active="about" />

      {/* ===== HEADER ===== */}
      <header className="page-header tinted">
        <div className="container-1280">
          <div className="eyebrow-row">Sobre AGND</div>
          <h1>Hecho en Santiago, <span className="accent">para el mundo.</span></h1>
          <p className="lead">Somos un equipo pequeño con una obsesión grande: que cualquier profesional pueda gestionar su agenda sin depender de hojas de cálculo, llamadas o WhatsApps interminables.</p>
          <div className="meta-row">
            <div><span className="meta-key">Fundado</span><span className="meta-val">2024</span></div>
            <div><span className="meta-key">Sede</span><span className="meta-val">Santiago, Chile</span></div>
            <div><span className="meta-key">Cobertura</span><span className="meta-val">Chile · LATAM</span></div>
            <div><span className="meta-key">Equipo</span><span className="meta-val">12 personas</span></div>
          </div>
        </div>
      </header>

      {/* ===== MISIÓN / VISIÓN / VALORES ===== */}
      <section style={{ padding: '88px 0 72px', borderBottom: '1px solid var(--border)' }}>
        <div className="container-1280">
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 3.2vw, 44px)',
            lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 700,
            color: 'var(--fg-1)', maxWidth: 820, margin: '0 0 64px',
          }}>
            "Creemos que gestionar una agenda debe ser tan simple como enviar un mensaje. Que el tiempo de un profesional vale, y que sus clientes merecen una experiencia fluida desde la primera reserva."
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {VALORES.map((v, i) => (
              <div key={i} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 20, padding: 32 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--agnd-mint-100)', color: 'var(--agnd-aqua-700)', display: 'grid', placeItems: 'center', marginBottom: 18 }}>
                  <i data-lucide={v.icon} style={{ width: 20, height: 20 }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg-1)', margin: '0 0 10px' }}>{v.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)', margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HISTORIA ===== */}
      <section style={{ padding: '88px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container-1280">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <SectionEyebrow>Nuestra historia</SectionEyebrow>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 3vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.03em', fontWeight: 700, color: 'var(--fg-1)', margin: '0 0 24px' }}>
                Empezó con un problema real.
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: '0 0 18px' }}>
                En 2023, uno de nuestros fundadores trabajaba en un estudio de diseño en Santiago. Cada semana perdía horas coordinando reuniones por WhatsApp, confirmando citas a mano y reenviando la dirección a clientes que ya la tenían.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: '0 0 18px' }}>
                Las soluciones existentes eran caras, estaban en inglés o requerían un equipo técnico para configurarlas. Así nació AGND: una herramienta pensada desde el primer día para el mercado hispanohablante.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0 }}>
                Hoy trabajamos con cientos de negocios en Chile y seguimos expandiéndonos por Latinoamérica, con el mismo equipo pequeño, ágil y comprometido del primer día.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {HISTORIA.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.05em', paddingTop: 4, minWidth: 36, flexShrink: 0 }}>{h.year}</div>
                  <div style={{ flex: 1, borderLeft: '2px solid var(--border)', paddingLeft: 20, paddingBottom: 28 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, color: 'var(--fg-1)', marginBottom: 4 }}>{h.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.5 }}>{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== EQUIPO ===== */}
      <section style={{ padding: '88px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container-1280">
          <div style={{ marginBottom: 56 }}>
            <SectionEyebrow>El equipo</SectionEyebrow>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 3vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.03em', fontWeight: 700, color: 'var(--fg-1)', margin: 0 }}>
              Las personas detrás de AGND.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {EQUIPO.map((p, i) => (
              <div key={i} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 16, transition: 'all 150ms var(--ease-out)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--fg-1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#FBFAF7', letterSpacing: '-0.02em' }}>
                  {p.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 700, color: 'var(--fg-1)', marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>{p.role}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6 }}>{p.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: '88px 0' }}>
        <div className="container-1280">
          <div className="legal-end">
            <div>
              <h4>¿Te sumás al equipo?</h4>
              <p>Siempre estamos buscando personas excepcionales. Escríbenos.</p>
            </div>
            <div className="end-actions">
              <a href="contacto.html" className="btn-end primary">
                Contactar al equipo
                <i data-lucide="arrow-right" style={{ width: 14, height: 14 }} />
              </a>
              <a href="register.html" className="btn-end ghost">
                Probar AGND gratis
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

window.QuienesSomosApp = QuienesSomosApp;
