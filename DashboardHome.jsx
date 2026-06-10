// DashboardHome.jsx — vista de inicio del dashboard AGND

const MOCK_CITAS = [
  { id: 1, hora: '09:00', cliente: 'Valentina Rojas',  servicio: 'Corte + Brushing', duracion: 60, colaborador: 'Andrea M.', estado: 'confirmed' },
  { id: 2, hora: '10:00', cliente: 'Carolina Pérez',   servicio: 'Coloración',        duracion: 90, colaborador: 'Andrea M.', estado: 'confirmed' },
  { id: 3, hora: '11:30', cliente: 'Sofía Herrera',    servicio: 'Manicure',          duracion: 45, colaborador: 'Paula R.',  estado: 'pending' },
  { id: 4, hora: '13:00', cliente: 'Camila Fuentes',   servicio: 'Corte + Brushing',  duracion: 60, colaborador: 'Andrea M.', estado: 'confirmed' },
  { id: 5, hora: '14:30', cliente: 'Daniela Torres',   servicio: 'Pedicure',          duracion: 60, colaborador: 'Paula R.',  estado: 'pending' },
  { id: 6, hora: '16:00', cliente: 'Isabel Castro',    servicio: 'Coloración',        duracion: 90, colaborador: 'Andrea M.', estado: 'confirmed' },
];

const MOCK_ACTIVITY = [
  { id: 1, text: 'Valentina Rojas agendó para mañana 10:00',   time: 'hace 5 min',  icon: 'calendar-plus' },
  { id: 2, text: 'Jorge Salazar canceló su cita de hoy 15:30', time: 'hace 22 min', icon: 'calendar-x' },
  { id: 3, text: 'Nuevo cliente: Fernanda Muñoz',               time: 'hace 1h',     icon: 'user-plus' },
  { id: 4, text: 'Camila Fuentes reagendó a las 13:00',         time: 'hace 2h',     icon: 'calendar-clock' },
];

function EstadoBadge({ estado }) {
  const map = {
    confirmed: { label: 'Confirmada', cls: 'badge-confirmed' },
    pending:   { label: 'Pendiente',  cls: 'badge-pending' },
    cancelled: { label: 'Cancelada',  cls: 'badge-cancelled' },
    done:      { label: 'Realizada',  cls: 'badge-done' },
  };
  const { label, cls } = map[estado] || map.pending;
  return <span className={`badge ${cls}`}>{label}</span>;
}

function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div className={`dash-stat-card${accent ? ' accent' : ''}`}>
      <div className="dash-stat-icon">
        <i data-lucide={icon} />
      </div>
      <div>
        <div className="dash-stat-value">{value}</div>
        <div className="dash-stat-label">{label}</div>
        {sub && <div className="dash-stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

function AgendaHoy() {
  const [selected, setSelected] = React.useState(null);

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <div className="dash-card-title">
          <i data-lucide="calendar" />
          Agenda de hoy
        </div>
        <button className="btn-sm-ghost">Ver calendario</button>
      </div>
      <div className="cita-list">
        {MOCK_CITAS.map(c => (
          <div
            key={c.id}
            className={`cita-row${selected === c.id ? ' selected' : ''}`}
            onClick={() => setSelected(selected === c.id ? null : c.id)}
          >
            <div className="cita-hora">{c.hora}</div>
            <div className="cita-info">
              <div className="cita-cliente">{c.cliente}</div>
              <div className="cita-meta">{c.servicio} · {c.duracion} min · {c.colaborador}</div>
            </div>
            <EstadoBadge estado={c.estado} />
            <button
              className="cita-action"
              onClick={e => e.stopPropagation()}
              aria-label="Opciones"
            >
              <i data-lucide="more-horizontal" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccionesRapidas() {
  const actions = [
    { icon: 'calendar-plus', label: 'Nueva reserva',          primary: true },
    { icon: 'user-plus',     label: 'Agregar cliente' },
    { icon: 'clock',         label: 'Bloquear horario' },
    { icon: 'link',          label: 'Copiar link de reserva' },
  ];

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <div className="dash-card-title">
          <i data-lucide="zap" />
          Acciones rápidas
        </div>
      </div>
      <div className="quick-actions">
        {actions.map(a => (
          <button key={a.label} className={`quick-action-btn${a.primary ? ' primary' : ''}`}>
            <i data-lucide={a.icon} />
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ActividadReciente() {
  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <div className="dash-card-title">
          <i data-lucide="activity" />
          Actividad reciente
        </div>
      </div>
      <div className="activity-list">
        {MOCK_ACTIVITY.map(a => (
          <div key={a.id} className="activity-row">
            <div className="activity-icon">
              <i data-lucide={a.icon} />
            </div>
            <div>
              <div className="activity-text">{a.text}</div>
              <div className="activity-time">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardHome() {
  const today = new Date().toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const todayCap = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div className="dash-home">
      <div className="dash-header">
        <div>
          <div className="dash-greeting">Buenos días, Roberto.</div>
          <div className="dash-date">{todayCap}</div>
        </div>
        <button className="btn-primary-sm">
          <i data-lucide="calendar-plus" />
          Nueva reserva
        </button>
      </div>

      <div className="dash-stats-row">
        <StatCard label="Citas hoy"       value="8" sub="+2 vs ayer"  icon="calendar"    accent />
        <StatCard label="Confirmadas"     value="6"                   icon="check-circle" />
        <StatCard label="Pendientes"      value="2"                   icon="clock" />
        <StatCard label="Nuevos clientes" value="3" sub="esta semana" icon="user-plus" />
      </div>

      <div className="dash-grid">
        <div className="dash-col-main">
          <AgendaHoy />
        </div>
        <div className="dash-col-side">
          <AccionesRapidas />
          <ActividadReciente />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardHome, EstadoBadge, StatCard, AgendaHoy });
