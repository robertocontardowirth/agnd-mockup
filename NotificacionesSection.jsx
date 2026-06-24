// NotificacionesSection.jsx — página completa de notificaciones.
// Se abre desde el dropdown del topbar ("Ver todas las notificaciones").
// Reusa MOCK_NOTIFICACIONES (definido en AppShell.jsx, carga antes que este script).

const NOTIF_PAGE_SEED = [
  { id: 1,  icon: 'calendar-plus',  text: 'Valentina Rojas agendó para mañana a las 10:00', time: 'hace 5 min',  grupo: 'Hoy',     unread: true },
  { id: 2,  icon: 'calendar-x',     text: 'Jorge Salazar canceló su cita de hoy 15:30',     time: 'hace 22 min', grupo: 'Hoy',     unread: true },
  { id: 3,  icon: 'user-plus',      text: 'Nuevo cliente registrado: Fernanda Muñoz',        time: 'hace 1 h',    grupo: 'Hoy',     unread: true },
  { id: 4,  icon: 'calendar-clock', text: 'Camila Fuentes reagendó su cita a las 13:00',     time: 'hace 2 h',    grupo: 'Hoy',     unread: false },
  { id: 5,  icon: 'check-circle',   text: 'Recordatorio enviado a 8 clientes de mañana',     time: 'ayer 18:30',  grupo: 'Ayer',    unread: false },
  { id: 6,  icon: 'credit-card',    text: 'Pago recibido de Carolina Pérez por $28.000',     time: 'ayer 16:10',  grupo: 'Ayer',    unread: false },
  { id: 7,  icon: 'star',           text: 'Isabel Castro dejó una reseña de 5 estrellas',    time: 'ayer 12:45',  grupo: 'Ayer',    unread: false },
  { id: 8,  icon: 'calendar-plus',  text: 'Daniela Torres agendó Pedicure para el viernes',  time: 'lun 09:20',   grupo: 'Esta semana', unread: false },
  { id: 9,  icon: 'user-check',     text: 'Andrea Morales actualizó su disponibilidad',      time: 'lun 08:05',   grupo: 'Esta semana', unread: false },
  { id: 10, icon: 'bell',           text: 'Tu plan Pro se renueva en 7 días',                time: 'dom 19:00',   grupo: 'Esta semana', unread: false },
];

function NotificacionesView() {
  const [items, setItems] = React.useState(NOTIF_PAGE_SEED);
  const [filtro, setFiltro] = React.useState('todas'); // 'todas' | 'noleidas'

  const unread = items.filter(n => n.unread).length;
  const marcarTodas = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));
  const toggleUna   = id => setItems(prev => prev.map(n => (n.id === id ? { ...n, unread: false } : n)));

  const visibles = filtro === 'noleidas' ? items.filter(n => n.unread) : items;

  // Agrupar respetando el orden de aparición de los grupos.
  const grupos = [];
  visibles.forEach(n => {
    let g = grupos.find(x => x.label === n.grupo);
    if (!g) { g = { label: n.grupo, items: [] }; grupos.push(g); }
    g.items.push(n);
  });

  return (
    <div className="notif-page">
      <div className="notif-page-head">
        <div>
          <h1 className="notif-page-title">Notificaciones</h1>
          <p className="notif-page-sub">
            {unread > 0 ? `Tienes ${unread} sin leer` : 'Estás al día'}
          </p>
        </div>
        {unread > 0 && (
          <button className="btn-sm-ghost" onClick={marcarTodas}>
            <Icon name="check-check" />Marcar todas como leídas
          </button>
        )}
      </div>

      <div className="notif-page-tabs" role="tablist">
        <button
          className={`notif-page-tab${filtro === 'todas' ? ' active' : ''}`}
          role="tab" aria-selected={filtro === 'todas'}
          onClick={() => setFiltro('todas')}
        >
          Todas <span className="notif-page-count">{items.length}</span>
        </button>
        <button
          className={`notif-page-tab${filtro === 'noleidas' ? ' active' : ''}`}
          role="tab" aria-selected={filtro === 'noleidas'}
          onClick={() => setFiltro('noleidas')}
        >
          No leídas <span className="notif-page-count">{unread}</span>
        </button>
      </div>

      {grupos.length === 0 ? (
        <div className="notif-page-empty">
          <Icon name="bell-off" />
          <span>No hay notificaciones sin leer</span>
        </div>
      ) : grupos.map(g => (
        <div key={g.label} className="notif-page-group">
          <div className="notif-page-group-label">{g.label}</div>
          <div className="notif-page-list">
            {g.items.map(n => (
              <div key={n.id} className={`notif-page-item${n.unread ? ' is-unread' : ''}`}>
                <span className="notif-page-item-icon"><Icon name={n.icon} /></span>
                <div className="notif-page-item-body">
                  <div className="notif-page-item-text">{n.text}</div>
                  <div className="notif-page-item-time">{n.time}</div>
                </div>
                {n.unread
                  ? <button className="notif-page-item-action" onClick={() => toggleUna(n.id)}>Marcar leída</button>
                  : <span className="notif-page-item-read"><Icon name="check" />Leída</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { NotificacionesView });
