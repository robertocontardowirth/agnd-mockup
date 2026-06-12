// Sections.jsx — todas las secciones de contenido de la landing AGND

// =================== FEATURES ===================
function Features({ visible }) {
  if (!visible) return null;
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-eyebrow">Capacidades</div>
        <h2 className="section-title">
          Todo lo que necesitas para que tu agenda<br />
          <span style={{ color: 'var(--accent-live)', fontStyle: 'italic', fontWeight: 500 }}>se gestione sola.</span>
        </h2>
        <p className="section-lead" style={{ fontSize: "23px" }}>
          Una plataforma pensada para que tus clientes reserven en segundos y tu equipo nunca pierda una cita.
        </p>

        <div className="features-grid">
          <div className="tile span-2" style={{ background: 'var(--agnd-plum-500)', color: 'var(--agnd-mint-100)', borderColor: 'var(--agnd-plum-500)' }}>
            <div className="tile-num" style={{ color: 'var(--agnd-aqua-300)' }}>01 · agenda inteligente</div>
            <h4 style={{ color: 'var(--agnd-mint-100)' }}>Página de reserva con tu marca, en tu dominio.</h4>
            <p style={{ color: 'rgba(221,255,247,0.72)' }}>
              Cada cliente recibe una página propia — agendamiento.tumarca.cl — con tus colores, tu logo y tu lenguaje. Tus usuarios reservan en menos de 30 segundos, desde el celular, sin descargar nada.
            </p>
          </div>
          <div className="tile">
            <div className="tile-num">02</div>
            <h4>Recordatorios automáticos</h4>
            <p>Email y WhatsApp 24h y 1h antes. Reduce el no-show hasta un 70%.</p>
          </div>
          <div className="tile">
            <div className="tile-num">03</div>
            <h4>Pagos en línea</h4>
            <p>Cobra al momento de reservar o pide un abono. Stripe, Mercado Pago, Webpay.</p>
          </div>
          <div className="tile">
            <div className="tile-num">04</div>
            <h4>Equipos y horarios</h4>
            <p>Múltiples profesionales, disponibilidad por sucursal, buffer entre citas, días libres.</p>
          </div>
          <div className="tile">
            <div className="tile-num">05</div>
            <h4>Reglas inteligentes</h4>
            <p>Cancelaciones, reagendamientos y políticas con la lógica que tu negocio realmente necesita.</p>
          </div>
        </div>
      </div>
    </section>);

}

// =================== BOOKING SHOWCASE ===================
function BookingShowcase({ visible }) {
  if (!visible) return null;
  return (
    <section className="section section-tinted">
      <div className="container">
        <div className="mockup-wrap">
          <div>
            <div className="section-eyebrow">Tu página de reserva</div>
            <h2 className="section-title">
              Una página que parece <span style={{ color: 'var(--accent-live)', fontStyle: 'italic', fontWeight: 500 }}>tuya</span>, no nuestra.
            </h2>
            <p className="section-lead">
              Sin "powered by", sin marca de la plataforma, sin embudos genéricos. Tu URL, tu identidad, tu flujo. Listo en cinco minutos.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
              'Dominio propio o subdominio personalizado',
              'Tipografía, colores y logo configurables',
              'Texto y políticas en tu voz',
              'Mobile-first — el 78% reserva desde el celular'].
              map((t, i) =>
              <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'baseline', fontSize: 16, color: 'var(--fg-1)' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '22%', background: 'var(--accent-live)', flexShrink: 0, transform: 'translateY(1px)' }} />
                  {t}
                </li>
              )}
            </ul>
            <a href="#" className="btn btn-ghost">
              Ver demo en vivo
              <i data-lucide="arrow-up-right" style={{ width: 16, height: 16 }} />
            </a>
          </div>
          <div>
            <BookingCardMock />
          </div>
        </div>
      </div>
    </section>);

}

// =================== CRM SHOWCASE ===================
function CrmShowcase({ visible }) {
  if (!visible) return null;
  const rows = [
  { initials: 'IM', color: ['var(--agnd-aqua-300)', 'var(--agnd-plum-700)'], name: 'Isidora Martínez', meta: 'isi@hotmail.cl', when: 'mar 27 · 10:00', tag: 'mint', tagText: 'Confirmado' },
  { initials: 'RP', color: ['var(--agnd-coral-200)', 'var(--agnd-rose-700)'], name: 'Rodrigo Pérez', meta: '+56 9 8421 ...', when: 'mar 27 · 11:30', tag: 'coral', tagText: 'Pendiente' },
  { initials: 'FC', color: ['var(--agnd-plum-500)', 'var(--agnd-mint-100)'], name: 'Florencia Cortés', meta: 'flo@studio.cl', when: 'mar 27 · 14:30', tag: 'mint', tagText: 'Confirmado' },
  { initials: 'JB', color: ['var(--agnd-bone)', 'var(--fg-1)'], name: 'Joaquín Bravo', meta: 'jbravo@mail.cl', when: 'mié 28 · 09:00', tag: 'bone', tagText: 'Recurrente' },
  { initials: 'CV', color: ['var(--agnd-aqua-300)', 'var(--agnd-plum-700)'], name: 'Catalina Vidal', meta: '+56 9 7311 ...', when: 'mié 28 · 16:00', tag: 'mint', tagText: 'Confirmado' }];


  return (
    <section className="section">
      <div className="container">
        <div className="mockup-wrap" style={{ gridTemplateColumns: '1fr 1.15fr' }}>
          <div className="crm-card">
            <div className="crm-toolbar">
              <div className="crm-tabs">
                <div className="crm-tab active">Hoy</div>
                <div className="crm-tab">Esta semana</div>
                <div className="crm-tab">Todos</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--fg-3)' }}>
                <i data-lucide="search" style={{ width: 14, height: 14 }} />
                <i data-lucide="filter" style={{ width: 14, height: 14 }} />
              </div>
            </div>
            <div className="crm-row head">
              <span></span>
              <span>Cliente</span>
              <span>Contacto</span>
              <span>Cita</span>
              <span>Estado</span>
            </div>
            {rows.map((r, i) =>
            <div className="crm-row" key={i}>
                <div className="crm-avatar" style={{ background: r.color[0], color: r.color[1] }}>{r.initials}</div>
                <div className="crm-name">{r.name}</div>
                <div className="crm-meta">{r.meta}</div>
                <div className="crm-meta">{r.when}</div>
                <div><span className={`pill ${r.tag}`}>{r.tagText}</span></div>
              </div>
            )}
          </div>
          <div>
            <div className="section-eyebrow">Gestión interna</div>
            <h2 className="section-title">
              Tus clientes y su historial,<br />
              <span style={{ color: 'var(--accent-live)', fontStyle: 'italic', fontWeight: 500 }}>en un solo lugar.</span>
            </h2>
            <p className="section-lead">
              Cada reserva alimenta un CRM ligero pensado para servicios. Notas privadas, frecuencia de visita, ingreso por cliente, cumpleaños — todo lo que un negocio de servicios realmente usa.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--fg-1)' }}>
                  4.2 <span style={{ fontSize: 16, color: 'var(--fg-3)' }}>min</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 6 }}>tiempo medio para registrar un cliente nuevo</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--fg-1)' }}>
                  100% <span style={{ fontSize: 16, color: 'var(--fg-3)' }}>auto</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 6 }}>sincronizado con cada nueva reserva</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// =================== HOW IT WORKS ===================
function HowItWorks({ visible }) {
  if (!visible) return null;
  const steps = [
  { n: '01', t: 'Conecta tu calendario', d: 'Google, Outlook o Apple Calendar. AGND respeta los bloqueos que ya tienes.' },
  { n: '02', t: 'Personaliza tu página', d: 'Servicios, duración, precios, horarios. Se ve tuya en cinco minutos.' },
  { n: '03', t: 'Comparte el enlace', d: 'En tu Instagram, en tu firma de email, como QR en tu local. Donde quieras.' },
  { n: '04', t: 'Recibe reservas', d: 'Confirmación automática, recordatorios, cobro y registro en CRM.' }];

  return (
    <section className="section section-inverse">
      <div className="container">
        <div className="section-eyebrow" style={{ color: 'var(--agnd-aqua-300)' }}>Cómo funciona</div>
        <h2 className="section-title" style={{ color: 'var(--agnd-mint-100)' }}>
          Cuatro pasos. <span style={{ color: 'var(--agnd-aqua-300)', fontStyle: 'italic', fontWeight: 500 }}>Una tarde.</span>
        </h2>
        <p className="section-lead" style={{ color: 'rgba(221,255,247,0.7)' }}>
          Sin onboarding eterno, sin "agenda una llamada con ventas". Configuras AGND tú mismo, hoy.
        </p>
        <div className="steps">
          {steps.map((s, i) =>
          <div key={i} className="step" style={{ borderTopColor: 'var(--agnd-mint-100)' }}>
              <div className="step-num" style={{ color: 'var(--agnd-aqua-300)' }}>{s.n}</div>
              <h4 style={{ color: 'var(--agnd-mint-100)' }}>{s.t}</h4>
              <p style={{ color: 'rgba(221,255,247,0.7)' }}>{s.d}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// =================== USE CASES ===================
function UseCases({ visible }) {
  if (!visible) return null;
  const cases = [
  { icon: 'scissors', t: 'Peluquerías y barberías', d: 'Múltiples profesionales, servicios con duraciones distintas, fidelización por cliente.', s: '2.4× más reservas online' },
  { icon: 'stethoscope', t: 'Clínicas y consultas', d: 'Fichas privadas, historial médico, recordatorios y políticas de cancelación claras.', s: '−68% no-shows' },
  { icon: 'briefcase', t: 'Consultores y coaches', d: 'Sesiones por hora, paquetes prepagos, integración con Meet y Zoom automática.', s: '4.7h liberadas / semana' },
  { icon: 'sparkles', t: 'Estudios y spas', d: 'Cabinas, equipos, abonos al reservar, lista de espera para cancelaciones.', s: '+34% facturación mensual' },
  { icon: 'graduation-cap', t: 'Profesores y tutores', d: 'Clases recurrentes, cobro adelantado, reagendamientos en segundos.', s: '0 emails de coordinación' },
  { icon: 'wrench', t: 'Talleres y servicios', d: 'Recogida, entrega, presupuesto y aprobación en un solo flujo.', s: '92% reservas auto-gestionadas' },
  { icon: 'building', t: 'Agencias B2B', d: 'Pipeline de demos, ronda robin entre vendedores, sincronización con tu CRM.', s: '3.1 demos / día / vendedor' },
  { icon: 'heart', t: 'Salud mental', d: 'Confidencialidad, sesiones online, copagos y recibos automáticos.', s: 'HIPAA-friendly' }];

  return (
    <section className="section">
      <div className="container">
        <div className="section-eyebrow">Para tu rubro</div>
        <h2 className="section-title">
          Diseñada para servicios.<br />
          <span style={{ color: 'var(--accent-live)', fontStyle: 'italic', fontWeight: 500 }}>De cualquier tamaño.</span>
        </h2>
        <p className="section-lead">
          Pequeño negocio, profesional independiente o equipo de 50 personas. AGND se adapta a tu lógica, no al revés.
        </p>
        <div className="usecases">
          {cases.map((c, i) =>
          <div className="usecase" key={i}>
              <i data-lucide={c.icon} style={{ width: 22, height: 22, color: 'var(--accent-live)' }} />
              <h5>{c.t}</h5>
              <p>{c.d}</p>
              <div className="usecase-stat">{c.s}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// =================== INTEGRATIONS ===================
function Integrations({ visible }) {
  if (!visible) return null;
  const items = [
  { name: 'Google Calendar', tag: 'Calendario', icon: 'calendar' },
  { name: 'Outlook 365', tag: 'Calendario', icon: 'calendar-clock' },
  { name: 'Apple Calendar', tag: 'Calendario', icon: 'calendar-days' },
  { name: 'Zoom', tag: 'Videollamada', icon: 'video' },
  { name: 'Google Meet', tag: 'Videollamada', icon: 'monitor-play' },
  { name: 'WhatsApp', tag: 'Mensajes', icon: 'message-circle' },
  { name: 'Stripe', tag: 'Pagos', icon: 'credit-card' },
  { name: 'Mercado Pago', tag: 'Pagos', icon: 'wallet' },
  { name: 'Webpay', tag: 'Pagos', icon: 'badge-dollar-sign' },
  { name: 'Mailchimp', tag: 'Email', icon: 'mail' },
  { name: 'Zapier', tag: '6.000+ apps', icon: 'zap' },
  { name: 'API REST', tag: 'Para devs', icon: 'code' }];

  return (
    <section className="section section-tinted">
      <div className="container">
        <div className="integrations-grid">
          <div className="integrations-intro">
            <div className="section-eyebrow">Integraciones</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
              Vive en el stack que <span style={{ color: 'var(--accent-live)', fontStyle: 'italic', fontWeight: 500 }}>ya usas.</span>
            </h2>
            <p className="section-lead" style={{ marginBottom: 24 }}>
              AGND se conecta con tu calendario, tu pasarela de pago y tu CRM. Si no está en la lista, lo hacemos vía Zapier o API.
            </p>
            <a href="#" className="btn btn-link">
              Ver todas las integraciones
              <i data-lucide="arrow-right" style={{ width: 16, height: 16 }} />
            </a>
          </div>
          <div className="integrations-row">
            {items.map((it, i) =>
            <div className="integration" key={i}>
                <div className="integration-icon">
                  <i data-lucide={it.icon} style={{ width: 18, height: 18, color: 'var(--agnd-aqua-700)' }} />
                </div>
                <div>
                  <div className="integration-name">{it.name}</div>
                  <div className="integration-tag">{it.tag}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// =================== TESTIMONIAL ===================
function Testimonial({ visible }) {
  if (!visible) return null;
  return (
    <section className="section">
      <div className="container">
        <div className="testi">
          <div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8, width: 200
            }}>
              {['010101111'].map((p) => p.split('').map((c, i) =>
              <div key={i} style={{
                aspectRatio: 1,
                borderRadius: '22%',
                background: c === '1' ? 'var(--agnd-rose-500)' : 'var(--agnd-bone)'
              }} />
              ))}
            </div>
          </div>
          <div>
            <p className="testi-quote">
              Pasamos de coordinar reservas por Instagram — un caos diario — a tener una página propia donde nuestros clientes se agendan solos. Lo notable es que se ve como nosotras, no como un software más. Recuperamos cinco horas a la semana. Mínimo.
            </p>
            <div className="testi-author">
              <div className="avatar">VS</div>
              <div>
                <div className="testi-author-name">Valentina Soto</div>
                <div className="testi-author-role">Co-fundadora, Estudio Ámbar (Santiago)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// =================== FAQ ===================
function FAQ({ visible }) {
  if (!visible) return null;
  const [open, setOpen] = React.useState(0);
  const items = [
  { q: '¿Necesito tarjeta de crédito para empezar?', a: 'No. El plan Free no pide tarjeta y dura para siempre. Solo te pediremos datos de pago cuando decidas pasar a Pro.' },
  { q: '¿Puedo usar mi propio dominio?', a: 'Sí, en el plan Pro puedes conectar agendamiento.tumarca.cl o cualquier subdominio que prefieras. Te entregamos las instrucciones DNS — toma cinco minutos.' },
  { q: '¿AGND reemplaza a mi calendario?', a: 'No, lo respeta. AGND lee la disponibilidad de Google, Outlook o Apple Calendar y nunca propone un horario en el que ya tienes algo bloqueado.' },
  { q: '¿Cómo se ve la página para mis clientes?', a: 'Como tu marca, no como AGND. Configuras logo, tipografía, colores y copy. Nada que delate la plataforma — ni "powered by", ni embudos genéricos.' },
  { q: '¿Funciona en celular?', a: 'Sí, tanto la página de reserva (donde el 78% de tus clientes terminará reservando) como el panel interno funcionan perfectamente en mobile.' },
  { q: '¿Qué pasa si necesito ayuda?', a: 'Soporte por chat en horario hábil para todos. Soporte prioritario y onboarding asistido para Pro. Cero llamadas con vendedores.' }];

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Preguntas frecuentes</div>
          <h2 className="section-title" style={{ margin: '0 auto', textAlign: 'center' }}>
            Lo que la gente <span style={{ color: 'var(--accent-live)', fontStyle: 'italic', fontWeight: 500 }}>suele preguntar.</span>
          </h2>
        </div>
        <div className="faq-list">
          {items.map((it, i) =>
          <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                {it.q}
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-a">{it.a}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// =================== FINAL CTA ===================
function FinalCTA({ visible }) {
  if (!visible) return null;
  return (
    <section className="section-inverse" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="final-cta" style={{ position: 'relative', zIndex: 2 }}>
        <h2 style={{ color: 'var(--agnd-mint-100)' }}>
          Tu agenda merece<br />
          <span className="accent">sin vueltas.</span>
        </h2>
        <p style={{ color: 'rgba(221,255,247,0.7)', fontSize: 18, maxWidth: 540, margin: '0 auto 40px' }}>
          Crea tu página de reserva en cinco minutos. Sin tarjeta, sin onboarding, sin llamadas.
        </p>
        <div className="actions">
          <a href="register.html" className="btn" style={{ background: 'var(--agnd-aqua-300)', color: 'var(--agnd-plum-700)' }}>
            Empezar gratis
            <i data-lucide="arrow-right" style={{ width: 16, height: 16 }} />
          </a>
          <a href="#" className="btn btn-ghost" style={{ borderColor: 'rgba(221,255,247,0.3)', color: 'var(--agnd-mint-100)' }}>
            Ver demo en vivo
          </a>
        </div>
      </div>
      {/* Mosaic motif at bottom */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(40, 1fr)',
        gap: 6,
        position: 'absolute',
        bottom: -20, left: 0, right: 0,
        opacity: 0.18,
        zIndex: 1
      }}>
        {Array.from({ length: 80 }).map((_, i) =>
        <div key={i} style={{
          aspectRatio: 1,
          borderRadius: '22%',
          background: i % 7 === 0 ? 'var(--agnd-aqua-300)' : i % 11 === 0 ? 'var(--agnd-coral-400)' : 'rgba(221,255,247,0.15)'
        }} />
        )}
      </div>
    </section>);

}

// =================== FOOTER ===================
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo size={28} />
            <p className="footer-blurb">
              Plataforma de agendamiento para servicios. Hecha en Santiago, para Latinoamérica.
            </p>
          </div>
          <div>
            <h6>Producto</h6>
            <ul>
              <li><a href="#">Página de reserva</a></li>
              <li><a href="#">CRM</a></li>
              <li><a href="#">Pagos</a></li>
              <li><a href="#">Integraciones</a></li>
              <li><a href="#">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h6>Recursos</h6>
            <ul>
              <li><a href="#">Centro de ayuda</a></li>
              <li><a href="#">Plantillas</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Estado del sistema</a></li>
            </ul>
          </div>
          <div>
            <h6>Empresa</h6>
            <ul>
              <li><a href="quienes-somos.html">Sobre AGND</a></li>
              <li><a href="#">Clientes</a></li>
              <li><a href="privacidad.html">Privacidad</a></li>
              <li><a href="terminos.html">Términos</a></li>
              <li><a href="contacto.html">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AGND · Hecho con cuidado en Santiago</span>
          <span style={{ display: 'flex', gap: 16 }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>X</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
          </span>
        </div>
      </div>
    </footer>);

}

Object.assign(window, {
  Features, BookingShowcase, CrmShowcase, HowItWorks,
  UseCases, Integrations, Testimonial, Pricing, FAQ,
  FinalCTA, Footer
});