// PricingApp.jsx — página dedicada de Precios

function PricingApp() {
  React.useEffect(() => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  });

  return (
    <>
      <SiteNav active="pricing" />

      {/* ===== HEADER ===== */}
      <header className="page-header tinted">
        <div className="container-1280">
          <div className="eyebrow-row">Precios</div>
          <h1>Empieza gratis. <span className="accent">Crece cuando quieras.</span></h1>
          <p className="lead">Sin tarjeta, sin compromiso. Plan Free para siempre — Plan Pro cuando tu negocio lo pida.</p>
        </div>
      </header>

      {/* ===== PLANES ===== */}
      <section className="section">
        <div className="container">
          <div className="pricing">
            <div className="plan">
              <h4>Free</h4>
              <div className="plan-tagline">Para empezar y validar tu flujo de reservas.</div>
              <div className="plan-price">$0 <span className="plan-price-unit">/ mes</span></div>
              <ul>
                <li>Hasta 50 reservas / mes</li>
                <li>Página de reserva personalizada</li>
                <li>1 calendario sincronizado</li>
                <li>Recordatorios por email</li>
                <li>CRM básico</li>
              </ul>
              <a href="register.html" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Empezar gratis
              </a>
            </div>
            <div className="plan featured">
              <span className="plan-tag">Recomendado</span>
              <h4>Pro</h4>
              <div className="plan-tagline">Cuando tu agenda es tu negocio.</div>
              <div className="plan-price">$8.990 <span className="plan-price-unit">CLP / mes</span></div>
              <ul>
                <li>Reservas ilimitadas</li>
                <li>Dominio propio (tumarca.cl)</li>
                <li>Múltiples calendarios y profesionales</li>
                <li>Recordatorios por WhatsApp</li>
                <li>Pagos en línea y abonos</li>
                <li>CRM completo + reportes</li>
                <li>Todas las integraciones</li>
                <li>Soporte prioritario</li>
              </ul>
              <a href="register.html" className="btn" style={{ background: 'var(--agnd-aqua-300)', color: 'var(--agnd-plum-700)', width: '100%', justifyContent: 'center' }}>
                Probar Pro 14 días
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ DE PRECIOS ===== */}
      <PricingFAQ />

      <SiteFooter />
    </>
  );
}

function PricingFAQ() {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: '¿Necesito tarjeta de crédito para empezar?', a: 'No. El plan Free no pide tarjeta y dura para siempre. Solo te pediremos datos de pago cuando decidas pasar a Pro.' },
    { q: '¿Puedo cambiar de plan cuando quiera?', a: 'Sí. Pasas de Free a Pro (o vuelves) en cualquier momento desde tu panel. Los cambios se aplican de inmediato y se prorratean.' },
    { q: '¿Qué pasa al terminar la prueba de 14 días?', a: 'Si no continúas con Pro, tu cuenta vuelve al plan Free sin perder tus datos. Nunca te cobramos sin avisar.' },
    { q: '¿Hay costos ocultos o comisiones por reserva?', a: 'No cobramos comisión por reserva. El precio que ves es el precio final; los pagos en línea solo tienen la tarifa de la pasarela que elijas.' },
    { q: '¿Puedo usar mi propio dominio?', a: 'Sí, en el plan Pro puedes conectar agendamiento.tumarca.cl o cualquier subdominio que prefieras. Te entregamos las instrucciones DNS — toma cinco minutos.' },
  ];

  return (
    <section className="section section-tinted">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Preguntas frecuentes</div>
          <h2 className="section-title" style={{ margin: '0 auto', textAlign: 'center' }}>
            Todo sobre <span style={{ color: 'var(--accent-live)', fontStyle: 'italic', fontWeight: 500 }}>precios y planes.</span>
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
    </section>
  );
}

window.PricingApp = PricingApp;
