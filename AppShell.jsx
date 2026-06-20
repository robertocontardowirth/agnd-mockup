// AppShell.jsx — app chrome: top bar + contextual sidebar

const APP_SECTIONS = [
  { id: 'home',     label: 'Inicio',   icon: 'layout-dashboard' },
  { id: 'agenda',   label: 'Agenda',   icon: 'calendar' },
  { id: 'clientes', label: 'Clientes', icon: 'users' },
  { id: 'equipo',   label: 'Equipo',   icon: 'user-check' },
  { id: 'espacios', label: 'Espacios', icon: 'building-2' },
  { id: 'recursos', label: 'Recursos', icon: 'package' },
];

const SIDEBAR_CONFIG = {
  home: null,
  agenda: {
    groups: [
      {
        items: [
          { id: 'hoy',    label: 'Hoy',    icon: 'sun' },
          { id: 'semana', label: 'Semana', icon: 'calendar-days' },
          { id: 'mes',    label: 'Mes',    icon: 'calendar-range' },
        ],
      },
      {
        label: 'Configuración',
        items: [
          { id: 'horarios',    label: 'Horarios',    icon: 'clock' },
          { id: 'excepciones', label: 'Excepciones', icon: 'calendar-x' },
          { id: 'bloqueos',    label: 'Bloqueos',    icon: 'ban' },
        ],
      },
    ],
  },
  clientes: {
    groups: [
      {
        items: [
          { id: 'todos',      label: 'Todos',      icon: 'users' },
          { id: 'frecuentes', label: 'Frecuentes', icon: 'star' },
          { id: 'nuevos',     label: 'Nuevos',     icon: 'user-plus' },
        ],
      },
      {
        label: 'Organizar',
        items: [
          { id: 'grupos',   label: 'Grupos',   icon: 'layers' },
          { id: 'importar', label: 'Importar', icon: 'upload' },
        ],
      },
    ],
  },
  equipo: {
    groups: [
      {
        items: [
          { id: 'colaboradores', label: 'Colaboradores',    icon: 'user-check' },
          { id: 'roles',         label: 'Roles y permisos', icon: 'shield' },
        ],
      },
      {
        label: 'Disponibilidad',
        items: [
          { id: 'horarios-equipo', label: 'Horarios de equipo', icon: 'clock-3' },
        ],
      },
    ],
  },
  espacios: {
    groups: [
      {
        items: [
          { id: 'mis-espacios',       label: 'Mis espacios',   icon: 'building-2' },
          { id: 'disponibilidad-esp', label: 'Disponibilidad', icon: 'calendar-check' },
        ],
      },
      {
        label: 'Ajustes',
        items: [
          { id: 'config-espacios', label: 'Configuración', icon: 'settings-2' },
        ],
      },
    ],
  },
  recursos: {
    groups: [
      {
        items: [
          { id: 'mis-recursos', label: 'Mis recursos',  icon: 'package' },
          { id: 'asignaciones', label: 'Asignaciones',  icon: 'link' },
        ],
      },
      {
        label: 'Ajustes',
        items: [
          { id: 'config-recursos', label: 'Configuración', icon: 'settings-2' },
        ],
      },
    ],
  },
};

const MOCK_NOTIFICACIONES = [
  { id: 1, icon: 'calendar-plus',  text: 'Valentina Rojas agendó para mañana a las 10:00', time: 'hace 5 min',  unread: true },
  { id: 2, icon: 'calendar-x',     text: 'Jorge Salazar canceló su cita de hoy 15:30',     time: 'hace 22 min', unread: true },
  { id: 3, icon: 'user-plus',      text: 'Nuevo cliente registrado: Fernanda Muñoz',        time: 'hace 1 h',    unread: true },
  { id: 4, icon: 'calendar-clock', text: 'Camila Fuentes reagendó su cita a las 13:00',     time: 'hace 2 h',    unread: false },
  { id: 5, icon: 'check-circle',   text: 'Recordatorio enviado a 8 clientes de mañana',     time: 'ayer',        unread: false },
];

function NotificationsMenu() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(MOCK_NOTIFICACIONES);
  const ref = React.useRef(null);
  const unread = items.filter(n => n.unread).length;

  React.useEffect(() => {
    if (!open) return;
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const marcarTodas = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));
  const marcarUna   = id => setItems(prev => prev.map(n => (n.id === id ? { ...n, unread: false } : n)));

  return (
    <div className="notif-wrap" ref={ref}>
      <button
        className="icon-btn"
        title="Notificaciones"
        aria-label="Notificaciones"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <Icon name="bell" />
        {unread > 0 && <span className="notif-dot">{unread}</span>}
      </button>

      {open && (
        <div className="notif-menu" role="menu">
          <div className="notif-menu-header">
            <span className="notif-menu-title">Notificaciones</span>
            {unread > 0 && <button className="notif-mark" onClick={marcarTodas}>Marcar todas como leídas</button>}
          </div>

          <div className="notif-list">
            {items.length === 0 ? (
              <div className="notif-empty"><Icon name="bell-off" /><span>Sin notificaciones</span></div>
            ) : items.map(n => (
              <button
                key={n.id}
                className={`notif-item${n.unread ? ' is-unread' : ''}`}
                role="menuitem"
                onClick={() => marcarUna(n.id)}
              >
                <span className="notif-item-icon"><Icon name={n.icon} /></span>
                <span className="notif-item-body">
                  <span className="notif-item-text">{n.text}</span>
                  <span className="notif-item-time">{n.time}</span>
                </span>
                {n.unread && <span className="notif-unread-dot" />}
              </button>
            ))}
          </div>

          <div className="notif-menu-foot">
            <button className="notif-foot-btn">Ver todas las notificaciones</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AppTopBar({ section, onSection }) {
  return (
    <header className="app-topbar">
      <div className="app-topbar-inner">
        <div className="app-topbar-left">
          <button className="app-topbar-logo" onClick={() => onSection('home')} title="Inicio" aria-label="Ir al inicio">
            <Logo size={24} />
          </button>
          <span className="app-topbar-sep" />
          <nav className="app-topbar-nav" role="navigation" aria-label="Secciones principales">
            {APP_SECTIONS.map(s => (
              <button
                key={s.id}
                className={`app-topbar-item${section === s.id ? ' active' : ''}`}
                onClick={() => onSection(s.id)}
                aria-current={section === s.id ? 'page' : undefined}
              >
                <Icon name={s.icon} />
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="app-topbar-right">
          <NotificationsMenu />
          <button className="icon-btn" title="Ayuda" aria-label="Ayuda">
            <Icon name="circle-help" />
          </button>
          <button className="icon-btn" title="Configuración" aria-label="Configuración">
            <Icon name="settings" />
          </button>
          <div className="app-avatar" role="button" tabIndex="0" aria-label="Mi cuenta">RC</div>
        </div>
      </div>
    </header>
  );
}

function AppSidebar({ section, sub, onSub }) {
  const config = SIDEBAR_CONFIG[section];
  if (!config) return null;

  // Sin sub explícito, el contenido muestra el primer item; reflejarlo como activo
  const activeSub = sub || config.groups[0].items[0].id;

  return (
    <aside className="app-sidebar" aria-label="Navegación secundaria">
      {config.groups.map((group, gi) => (
        <React.Fragment key={gi}>
          {gi > 0 && <div className="app-sidebar-divider" />}
          {group.label && (
            <div className="app-sidebar-group-label">{group.label}</div>
          )}
          {group.items.map(item => (
            <button
              key={item.id}
              className={`app-sidebar-item${activeSub === item.id ? ' active' : ''}`}
              onClick={() => onSub(item.id)}
              aria-current={activeSub === item.id ? 'page' : undefined}
            >
              <Icon name={item.icon} />
              {item.label}
            </button>
          ))}
        </React.Fragment>
      ))}
    </aside>
  );
}

function AppShell({ section, onSection, sub, onSub, children }) {
  const hasSidebar = !!SIDEBAR_CONFIG[section];
  return (
    <div className="app-layout">
      <AppTopBar section={section} onSection={onSection} />
      <div className="app-body">
        {hasSidebar && (
          <AppSidebar section={section} sub={sub} onSub={onSub} />
        )}
        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { AppShell, AppTopBar, AppSidebar, APP_SECTIONS, SIDEBAR_CONFIG });
