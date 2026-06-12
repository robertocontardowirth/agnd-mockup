// SiteChrome.jsx — shared nav + footer for marketing pages

const onLanding = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
const h = (hash) => onLanding ? hash : `index.html${hash}`;

function SiteNav({ active }) {
  const [open, setOpen] = React.useState(false);

  const items = [
    { id: 'pricing', label: 'Precios',  href: 'precios.html' },
    { id: 'about',   label: 'Nosotros', href: 'quienes-somos.html' },
    { id: 'contact', label: 'Contacto', href: 'contacto.html' },
  ];

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <a href="index.html" style={{ textDecoration: 'none' }}>
          <Logo size={28} />
        </a>
        <div className="site-nav-links">
          {items.map(it => (
            <a key={it.id} href={it.href} className={active === it.id ? 'active' : ''}>{it.label}</a>
          ))}
        </div>
        <div className="site-nav-cta">
          <a href="login.html" className="btn-nav ghost">Iniciar sesión</a>
          <a href="register.html" className="btn-nav primary">Empezar gratis</a>
        </div>
        <button
          className={`site-nav-burger ${open ? 'open' : ''}`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`site-nav-mobile ${open ? 'open' : ''}`}>
        <div className="site-nav-mobile-links">
          {items.map(it => (
            <a key={it.id} href={it.href} className={active === it.id ? 'active' : ''} onClick={() => setOpen(false)}>{it.label}</a>
          ))}
        </div>
        <div className="site-nav-mobile-cta">
          <a href="login.html" className="btn-nav ghost">Iniciar sesión</a>
          <a href="register.html" className="btn-nav primary">Empezar gratis</a>
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
              <li><a href={h('#features')}>Página de reserva</a></li>
              <li><a href={h('#features')}>CRM</a></li>
              <li><a href="precios.html">Precios</a></li>
              <li><a href={h('#features')}>Integraciones</a></li>
            </ul>
          </div>
          <div>
            <h6>Recursos</h6>
            <ul>
              <li><a href="contacto.html">Contacto</a></li>
              <li><a href="#">Centro de ayuda</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Estado del sistema</a></li>
            </ul>
          </div>
          <div>
            <h6>Empresa</h6>
            <ul>
              <li><a href="quienes-somos.html">Sobre AGND</a></li>
              <li><a href="privacidad.html">Privacidad</a></li>
              <li><a href="terminos.html">Términos</a></li>
              <li><a href="login.html">Iniciar sesión</a></li>
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
