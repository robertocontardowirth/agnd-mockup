// DashboardHome.jsx — vista de inicio del dashboard AGND
// Las citas son un store compartido con la Agenda; llegan por props desde AppRoot.

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
        <Icon name={icon} />
      </div>
      <div>
        <div className="dash-stat-value">{value}</div>
        <div className="dash-stat-label">{label}</div>
        {sub && <div className="dash-stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

function AgendaHoy({ citas }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <div className="dash-card-title">
          <Icon name="calendar" />
          Agenda de hoy
        </div>
        <button className="btn-sm-ghost">Ver calendario</button>
      </div>
      <div className="cita-list">
        {citas.map(c => (
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
              <Icon name="more-horizontal" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const RESERVA_LINK = 'https://agnd.cl/reservar/estudio-roberto';

function AccionesRapidas({ onNuevaReserva, onAgregarCliente, onBloquearHorario }) {
  const [copied, setCopied] = React.useState(false);

  const copiarLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(RESERVA_LINK);
      } else {
        const ta = document.createElement('textarea');
        ta.value = RESERVA_LINK;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch (e) { /* sin portapapeles: igual damos feedback */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions = [
    { id: 'nueva',   icon: 'calendar-plus', label: 'Nueva reserva',    primary: true, onClick: onNuevaReserva },
    { id: 'cliente', icon: 'user-plus',     label: 'Agregar cliente',  onClick: onAgregarCliente },
    { id: 'bloqueo', icon: 'clock',         label: 'Bloquear horario', onClick: onBloquearHorario },
    {
      id: 'link',
      icon: copied ? 'check' : 'link',
      label: copied ? '¡Link copiado!' : 'Copiar link de reserva',
      onClick: copiarLink,
      success: copied,
    },
  ];

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <div className="dash-card-title">
          <Icon name="zap" />
          Acciones rápidas
        </div>
      </div>
      <div className="quick-actions">
        {actions.map(a => (
          <button
            key={a.id}
            className={`quick-action-btn${a.primary ? ' primary' : ''}${a.success ? ' success' : ''}`}
            onClick={a.onClick}
          >
            <Icon name={a.icon} />
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
          <Icon name="activity" />
          Actividad reciente
        </div>
      </div>
      <div className="activity-list">
        {MOCK_ACTIVITY.map(a => (
          <div key={a.id} className="activity-row">
            <div className="activity-icon">
              <Icon name={a.icon} />
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

function DashboardHome({ citas, onSaveCita, onSaveCliente, onSaveBloqueo }) {
  const today = new Date().toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const todayCap = today.charAt(0).toUpperCase() + today.slice(1);

  // null = cerrado | { mode: 'new', hora } | { mode: 'edit', cita }
  const [panel, setPanel] = React.useState(null);
  // null = cerrado | { mode: 'new' } — modal de alta rápida de cliente
  const [clienteModal, setClienteModal] = React.useState(null);
  // bloqueo de horario (acción rápida)
  const [bloqueoModal, setBloqueoModal] = React.useState(false);

  const openNew = () => setPanel({ mode: 'new', hora: '' });
  const openNuevoCliente = () => setClienteModal({ mode: 'new' });
  const openBloqueo = () => setBloqueoModal(true);

  const handleSave = (cita) => {
    onSaveCita(cita);
    setPanel(null);
  };

  const handleSaveCliente = (cliente) => {
    if (onSaveCliente) onSaveCliente(cliente);
    setClienteModal(null);
  };

  const handleSaveBloqueo = (bloqueo) => {
    if (onSaveBloqueo) onSaveBloqueo(bloqueo);
    setBloqueoModal(false);
  };

  return (
    <div className={`dash-home${panel ? ' has-panel' : ''}`}>
      <div className="dash-home-main">
        <div className="dash-header">
          <div>
            <div className="dash-greeting">Buenos días, Roberto.</div>
            <div className="dash-date">{todayCap}</div>
          </div>
          {!panel && (
            <button className="btn-primary-sm" onClick={openNew}>
              <Icon name="calendar-plus" />
              Nueva reserva
            </button>
          )}
        </div>

        <div className="dash-stats-row">
          <StatCard label="Citas hoy"       value={String(citas.length)} sub="+2 vs ayer"  icon="calendar"    accent />
          <StatCard label="Confirmadas"     value={String(citas.filter(c => c.estado === 'confirmed').length)} icon="check-circle" />
          <StatCard label="Pendientes"      value={String(citas.filter(c => c.estado === 'pending').length)}   icon="clock" />
          <StatCard label="Nuevos clientes" value="3" sub="esta semana" icon="user-plus" />
        </div>

        <div className={`dash-grid${panel ? ' single' : ''}`}>
          <div className="dash-col-main">
            <AgendaHoy citas={citas} />
          </div>
          {!panel && (
            <div className="dash-col-side">
              <AccionesRapidas onNuevaReserva={openNew} onAgregarCliente={openNuevoCliente} onBloquearHorario={openBloqueo} />
              <ActividadReciente />
            </div>
          )}
        </div>
      </div>

      {panel && (
        <ReservaPanel
          mode={panel.mode}
          cita={panel.cita}
          initialHora={panel.hora}
          onClose={() => setPanel(null)}
          onSave={handleSave}
        />
      )}

      {clienteModal && (
        <ClienteModal
          mode={clienteModal.mode}
          cliente={clienteModal.cliente}
          onClose={() => setClienteModal(null)}
          onSave={handleSaveCliente}
        />
      )}

      {bloqueoModal && (
        <BloqueoModal
          onClose={() => setBloqueoModal(false)}
          onSave={handleSaveBloqueo}
        />
      )}
    </div>
  );
}

Object.assign(window, { DashboardHome, EstadoBadge, StatCard, AgendaHoy });
