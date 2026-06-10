// SiteChrome.jsx — shared nav + footer for marketing pages

function SiteNav({ active }) {
  const link = (id, label, href) => (
    <a href={href} className={active === id ? 'active' : ''}>{label}</a>
  );
  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <a href="AGND Landing.html" style={{ textDecoration: 'none' }}>
          <Logo size={28} />
        </a>
        <div className="site-nav-links">
          {link('product', 'Producto', 'AGND Landing.html#features')}
          {link('pricing', 'Precios', 'AGND Landing.html#pricing')}
          {link('about', 'Nosotros', 'AGND QuienesSomos.html')}
          {link('contact', 'Contacto', 'AGND Contacto.html')}
        </div>
        <div className="site-nav-cta">
          <a href="AGND Login.html" className="btn-nav ghost">Iniciar sesión</a>
          <a href="AGND Register.html" className="btn-nav primary">Empezar gratis</a>
        </div>
      </div>
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-1280">
        <div className="site-footer-grid">
          <div>
            <Logo size={28} />
            <p className="footer-blurb">
              Plataforma de agendamiento para servicios. Hecha en Santiago, para Latinoamérica.
            </p>
          </div>
          <div>
            <h6>Producto</h6>
            <ul>
              <li><a href="AGND Landing.html#features">Página de reserva</a></li>
              <li><a href="AGND Landing.html#features">CRM</a></li>
              <li><a href="AGND Landing.html#pricing">Precios</a></li>
              <li><a href="AGND Landing.html#features">Integraciones</a></li>
            </ul>
          </div>
          <div>
            <h6>Recursos</h6>
            <ul>
              <li><a href="AGND Contacto.html">Contacto</a></li>
              <li><a href="#">Centro de ayuda</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Estado del sistema</a></li>
            </ul>
          </div>
          <div>
            <h6>Empresa</h6>
            <ul>
              <li><a href="AGND QuienesSomos.html">Sobre AGND</a></li>
              <li><a href="AGND Privacidad.html">Privacidad</a></li>
              <li><a href="AGND Terminos.html">Términos</a></li>
              <li><a href="AGND Login.html">Iniciar sesión</a></li>
            </ul>
          </div>
        </div>
        <div className="site-footer-bottom">
          <span>© 2026 AGND.CL · Hecho con cuidado en Santiago</span>
          <span style={{ display: 'flex', gap: 18 }}>
            <a href="#">Instagram</a>
            <a href="#">X</a>
            <a href="#">LinkedIn</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

window.SiteNav = SiteNav;
window.SiteFooter = SiteFooter;
