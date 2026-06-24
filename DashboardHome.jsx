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

// Mini gráfico de línea (sparkline) para visualizar la progresión de un indicador.
function Sparkline({ data, color = 'var(--accent-live)', width = 78, height = 36 }) {
  const gid = React.useMemo(() => 'sk' + Math.random().toString(36).slice(2, 8), []);
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => [
    i * stepX,
    height - 3 - ((v - min) / span) * (height - 6),
  ]);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${width.toFixed(1)},${height} L0,${height} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg className="dash-spark" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.24" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.4" fill={color} />
    </svg>
  );
}

// Gráfico de barras full-width — se usa cuando la tarjeta está en modo compacto
// (panel de reserva abierto), apilado bajo el texto en lugar de a la derecha.
function BarChart({ data, color = 'var(--accent-live)' }) {
  if (!data || !data.length) return null;
  const max = Math.max(...data) || 1;
  return (
    <div className="dash-bars" aria-hidden="true">
      {data.map((v, i) => (
        <span
          key={i}
          className="dash-bar"
          style={{
            height: `${Math.max(10, (v / max) * 100)}%`,
            background: color,
            opacity: i === data.length - 1 ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
}

function StatCard({ label, value, sub, icon, accent, trend, trendColor, compact }) {
  const color = trendColor || 'var(--accent-live)';
  return (
    <div className={`dash-stat-card${accent ? ' accent' : ''}${compact ? ' compact' : ''}`}>
      <div className="dash-stat-top">
        <div className="dash-stat-icon">
          <Icon name={icon} />
        </div>
        <div className="dash-stat-text">
          <div className="dash-stat-value">{value}</div>
          <div className="dash-stat-label">{label}</div>
          {sub && <div className="dash-stat-sub">{sub}</div>}
        </div>
      </div>
      {trend && (compact
        ? <BarChart data={trend} color={color} />
        : <Sparkline data={trend} color={color} />)}
    </div>
  );
}

// Diálogo de confirmación reutilizable (acciones destructivas como anular).
function ConfirmDialog({ title, message, confirmLabel, danger, onConfirm, onClose }) {
  const footer = (
    <React.Fragment>
      <button className="btn-sm-ghost confirm-cancel" onClick={onClose}>Cancelar</button>
      <button className={`btn-primary-sm${danger ? ' danger' : ''}`} onClick={onConfirm}>
        {confirmLabel || 'Confirmar'}
      </button>
    </React.Fragment>
  );
  return (
    <Modal eyebrow="Confirmación" title={title} onClose={onClose} footer={footer}>
      <p className="confirm-msg">{message}</p>
    </Modal>
  );
}

// Menú de opciones por cita (botón "..."). Se renderiza en position:fixed vía
// portal para no quedar recortado por el overflow:hidden de la tarjeta.
function CitaRowMenu({ cita, onEdit, onUpdate, onRequestCancel }) {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState({ top: 0, left: 0 });
  const btnRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const MENU_W = 200;

  const toggle = (e) => {
    e.stopPropagation();
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: Math.max(8, r.right - MENU_W) });
    }
    setOpen(o => !o);
  };

  // Si no cabe abajo (p. ej. última fila cerca del borde inferior), abre hacia arriba.
  React.useLayoutEffect(() => {
    if (!open || !btnRef.current || !menuRef.current) return;
    const b = btnRef.current.getBoundingClientRect();
    const h = menuRef.current.offsetHeight;
    const gap = 4;
    const top = (b.bottom + gap + h > window.innerHeight - 8)
      ? Math.max(8, b.top - h - gap)
      : b.bottom + gap;
    setPos(p => ({ ...p, top }));
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onDown = e => { if (!e.target.closest('.row-menu') && !e.target.closest('.cita-action')) setOpen(false); };
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    const close = () => setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  const act = fn => e => { e.stopPropagation(); setOpen(false); fn(); };

  const menu = (
    <div ref={menuRef} className="row-menu" style={{ top: pos.top, left: pos.left, width: MENU_W }} role="menu">
      <button className="row-menu-item" role="menuitem" onClick={act(() => onEdit(cita))}>
        <Icon name="pencil" />Editar
      </button>
      {cita.estado !== 'confirmed' && cita.estado !== 'cancelled' && (
        <button className="row-menu-item" role="menuitem" onClick={act(() => onUpdate({ ...cita, estado: 'confirmed' }))}>
          <Icon name="check-circle" />Confirmar
        </button>
      )}
      {cita.estado !== 'done' && (
        <button className="row-menu-item" role="menuitem" onClick={act(() => onUpdate({ ...cita, estado: 'done' }))}>
          <Icon name="check-check" />Marcar realizada
        </button>
      )}
      <div className="row-menu-sep" />
      <button className="row-menu-item danger" role="menuitem" onClick={act(() => onRequestCancel(cita))}>
        <Icon name="x-circle" />Anular
      </button>
    </div>
  );

  return (
    <React.Fragment>
      <button
        ref={btnRef}
        className="cita-action"
        onClick={toggle}
        aria-label="Opciones"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Icon name="more-horizontal" />
      </button>
      {open && ReactDOM.createPortal(menu, document.body)}
    </React.Fragment>
  );
}

function AgendaHoy({ citas, onRowClick, onEdit, onUpdate, onRequestCancel, onVerCalendario, activeId }) {
  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <div className="dash-card-title">
          <Icon name="calendar" />
          Agenda de hoy
        </div>
        <button className="btn-sm-ghost" onClick={onVerCalendario}>
          Ver calendario<Icon name="arrow-right" />
        </button>
      </div>
      <div className="cita-list">
        {citas.map(c => (
          <div
            key={c.id}
            className={`cita-row${activeId === c.id ? ' selected' : ''}`}
            onClick={() => onRowClick(c)}
          >
            <div className="cita-hora">{c.hora}</div>
            <div className="cita-info">
              <div className="cita-cliente">{c.cliente}</div>
              <div className="cita-meta">{c.servicio} · {c.duracion} min · {c.colaborador}</div>
            </div>
            <EstadoBadge estado={c.estado} />
            <CitaRowMenu cita={c} onEdit={onEdit} onUpdate={onUpdate} onRequestCancel={onRequestCancel} />
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

// Series de tendencia (mock) para los sparklines de cada indicador.
const STAT_TRENDS = {
  citas:        [5, 6, 5, 7, 6, 8, 7],
  confirmadas:  [3, 4, 4, 5, 4, 6, 5],
  pendientes:   [3, 2, 3, 1, 2, 1, 2],
  nuevos:       [1, 2, 1, 3, 2, 2, 3],
};

function DashboardHome({ citas, onSaveCita, onSaveCliente, onSaveBloqueo, onNavigate }) {
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
  // cita pendiente de confirmación de anulación
  const [confirmCancel, setConfirmCancel] = React.useState(null);

  const openNew = () => setPanel({ mode: 'new', hora: '' });
  const openView = (cita) => setPanel({ mode: 'view', cita });
  const openEdit = (cita) => setPanel({ mode: 'edit', cita });
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

  const handleConfirmCancel = () => {
    if (confirmCancel) {
      onSaveCita({ ...confirmCancel, estado: 'cancelled' });
      // Si el panel de detalle mostraba esta cita, lo cerramos.
      setPanel(p => (p && p.cita && p.cita.id === confirmCancel.id ? null : p));
    }
    setConfirmCancel(null);
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
          <StatCard label="Citas hoy"       value={String(citas.length)} sub="+2 vs ayer"  icon="calendar"    accent trend={STAT_TRENDS.citas} compact={!!panel} />
          <StatCard label="Confirmadas"     value={String(citas.filter(c => c.estado === 'confirmed').length)} icon="check-circle" trend={STAT_TRENDS.confirmadas} compact={!!panel} />
          <StatCard label="Pendientes"      value={String(citas.filter(c => c.estado === 'pending').length)}   icon="clock" trend={STAT_TRENDS.pendientes} compact={!!panel} />
          <StatCard label="Nuevos clientes" value="3" sub="esta semana" icon="user-plus" trend={STAT_TRENDS.nuevos} compact={!!panel} />
        </div>

        <div className={`dash-grid${panel ? ' single' : ''}`}>
          <div className="dash-col-main">
            <AgendaHoy
              citas={citas}
              onRowClick={openView}
              onEdit={openEdit}
              onUpdate={onSaveCita}
              onRequestCancel={setConfirmCancel}
              onVerCalendario={() => onNavigate && onNavigate('agenda')}
              activeId={panel && panel.cita ? panel.cita.id : null}
            />
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
          onEdit={openEdit}
          onReagendar={openEdit}
          onAnular={setConfirmCancel}
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

      {confirmCancel && (
        <ConfirmDialog
          title="Anular cita"
          message={`¿Seguro que quieres anular la cita de ${confirmCancel.cliente} a las ${confirmCancel.hora}? El cliente será notificado.`}
          confirmLabel="Sí, anular cita"
          danger
          onConfirm={handleConfirmCancel}
          onClose={() => setConfirmCancel(null)}
        />
      )}
    </div>
  );
}

Object.assign(window, { DashboardHome, EstadoBadge, StatCard, AgendaHoy });
