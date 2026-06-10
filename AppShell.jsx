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

function AppTopBar({ section, onSection }) {
  return (
    <header className="app-topbar">
      <div className="app-topbar-left">
        <a href="AGND Landing.html" title="Volver al inicio">
          <Logo size={24} />
        </a>
        <span className="app-topbar-sep" />
        <nav className="app-topbar-nav" role="navigation" aria-label="Secciones principales">
          {APP_SECTIONS.map(s => (
            <button
              key={s.id}
              className={`app-topbar-item${section === s.id ? ' active' : ''}`}
              onClick={() => onSection(s.id)}
              aria-current={section === s.id ? 'page' : undefined}
            >
              <i data-lucide={s.icon} />
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="app-topbar-right">
        <button className="icon-btn" title="Notificaciones" aria-label="Notificaciones">
          <i data-lucide="bell" />
        </button>
        <button className="icon-btn" title="Ayuda" aria-label="Ayuda">
          <i data-lucide="circle-help" />
        </button>
        <button className="icon-btn" title="Configuración" aria-label="Configuración">
          <i data-lucide="settings" />
        </button>
        <div className="app-avatar" role="button" tabIndex="0" aria-label="Mi cuenta">RC</div>
      </div>
    </header>
  );
}

function AppSidebar({ section, sub, onSub }) {
  const config = SIDEBAR_CONFIG[section];
  if (!config) return null;

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
              className={`app-sidebar-item${sub === item.id ? ' active' : ''}`}
              onClick={() => onSub(item.id)}
              aria-current={sub === item.id ? 'page' : undefined}
            >
              <i data-lucide={item.icon} />
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
