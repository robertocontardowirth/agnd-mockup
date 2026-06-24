// AgendaSection.jsx — Sección Agenda: 6 sub-vistas (Hoy, Semana, Mes, Horarios, Excepciones, Bloqueos)

// ── MOCK DATA ────────────────────────────────────────────────────────────────

const MOCK_CITAS_HOY = [
  { id: 1,  hora: '09:00', duracion: 60, cliente: 'Valentina Rojas',  servicio: 'Corte + Brushing', colaborador: 'Andrea M.', estado: 'confirmed', notas: 'Primera visita del mes' },
  { id: 7,  hora: '09:30', duracion: 60, cliente: 'Martina Soto',     servicio: 'Manicure',          colaborador: 'Paula R.',  estado: 'confirmed', notas: '' },
  { id: 2,  hora: '10:30', duracion: 90, cliente: 'Carolina Pérez',   servicio: 'Coloración',        colaborador: 'Andrea M.', estado: 'confirmed', notas: '' },
  { id: 3,  hora: '12:00', duracion: 45, cliente: 'Sofía Herrera',    servicio: 'Manicure',          colaborador: 'Paula R.',  estado: 'pending',   notas: 'Confirmar por WhatsApp' },
  { id: 4,  hora: '14:00', duracion: 60, cliente: 'Camila Fuentes',   servicio: 'Corte + Brushing',  colaborador: 'Andrea M.', estado: 'confirmed', notas: '' },
  { id: 5,  hora: '15:30', duracion: 60, cliente: 'Daniela Torres',   servicio: 'Pedicure',          colaborador: 'Paula R.',  estado: 'pending',   notas: '' },
  { id: 6,  hora: '17:00', duracion: 90, cliente: 'Isabel Castro',    servicio: 'Coloración',        colaborador: 'Andrea M.', estado: 'confirmed', notas: '' },
];

const MOCK_CITAS_SEMANA = [
  { id: 10, dayIndex: 0, hora: '09:00', duracion: 60, cliente: 'Valentina Rojas',  servicio: 'Corte + Brushing', colaborador: 'Andrea M.', estado: 'confirmed' },
  { id: 11, dayIndex: 0, hora: '11:00', duracion: 45, cliente: 'Sofía Herrera',    servicio: 'Manicure',         colaborador: 'Paula R.',  estado: 'pending' },
  { id: 12, dayIndex: 1, hora: '10:00', duracion: 90, cliente: 'Carolina Pérez',   servicio: 'Coloración',       colaborador: 'Andrea M.', estado: 'confirmed' },
  { id: 13, dayIndex: 2, hora: '09:30', duracion: 60, cliente: 'Camila Fuentes',   servicio: 'Corte + Brushing', colaborador: 'Andrea M.', estado: 'confirmed' },
  { id: 14, dayIndex: 2, hora: '14:00', duracion: 45, cliente: 'Fernanda Muñoz',   servicio: 'Manicure',         colaborador: 'Paula R.',  estado: 'confirmed' },
  { id: 15, dayIndex: 3, hora: '11:00', duracion: 60, cliente: 'Daniela Torres',   servicio: 'Pedicure',         colaborador: 'Paula R.',  estado: 'done' },
  { id: 16, dayIndex: 4, hora: '09:00', duracion: 90, cliente: 'Isabel Castro',    servicio: 'Coloración',       colaborador: 'Andrea M.', estado: 'confirmed' },
  { id: 17, dayIndex: 4, hora: '11:30', duracion: 60, cliente: 'Valentina Rojas',  servicio: 'Corte',            colaborador: 'Andrea M.', estado: 'confirmed' },
];

const MOCK_CITAS_MES = [
  { id: 20, fecha: '2026-05-04', hora: '09:00', cliente: 'Valentina Rojas',  estado: 'confirmed' },
  { id: 21, fecha: '2026-05-04', hora: '11:00', cliente: 'Sofía Herrera',    estado: 'pending' },
  { id: 22, fecha: '2026-05-04', hora: '14:00', cliente: 'Camila Fuentes',   estado: 'confirmed' },
  { id: 23, fecha: '2026-05-11', hora: '10:00', cliente: 'Carolina Pérez',   estado: 'confirmed' },
  { id: 24, fecha: '2026-05-18', hora: '09:00', cliente: 'Daniela Torres',   estado: 'confirmed' },
  { id: 25, fecha: '2026-05-18', hora: '11:30', cliente: 'Isabel Castro',    estado: 'pending' },
  { id: 26, fecha: '2026-05-20', hora: '09:00', cliente: 'Fernanda Muñoz',   estado: 'confirmed' },
  { id: 27, fecha: '2026-05-26', hora: '10:00', cliente: 'Jorge Salazar',    estado: 'cancelled' },
  { id: 28, fecha: '2026-05-28', hora: '14:00', cliente: 'Andrea García',    estado: 'confirmed' },
];

const MOCK_HORARIOS = [
  { id: 'lun', label: 'Lunes',     activo: true,  apertura: '09:00', cierre: '19:00', colacion: true,  colacionDesde: '13:00', colacionHasta: '14:00' },
  { id: 'mar', label: 'Martes',    activo: true,  apertura: '09:00', cierre: '19:00', colacion: true,  colacionDesde: '13:00', colacionHasta: '14:00' },
  { id: 'mie', label: 'Miércoles', activo: true,  apertura: '09:00', cierre: '19:00', colacion: true,  colacionDesde: '13:00', colacionHasta: '14:00' },
  { id: 'jue', label: 'Jueves',    activo: true,  apertura: '09:00', cierre: '19:00', colacion: true,  colacionDesde: '13:00', colacionHasta: '14:00' },
  { id: 'vie', label: 'Viernes',   activo: true,  apertura: '09:00', cierre: '18:00', colacion: true,  colacionDesde: '13:00', colacionHasta: '14:00' },
  { id: 'sab', label: 'Sábado',    activo: true,  apertura: '10:00', cierre: '14:00', colacion: false, colacionDesde: '13:00', colacionHasta: '14:00' },
  { id: 'dom', label: 'Domingo',   activo: false, apertura: '10:00', cierre: '14:00', colacion: false, colacionDesde: '13:00', colacionHasta: '14:00' },
];

const MOCK_EXCEPCIONES = [
  { id: 1, fecha: '2026-06-21', motivo: 'Día del trabajo', tipo: 'closed' },
  { id: 2, fecha: '2026-07-04', motivo: 'Fiestas Patrias', tipo: 'closed' },
  { id: 3, fecha: '2026-05-30', motivo: 'Evento especial mañana', tipo: 'special', apertura: '09:00', cierre: '13:00' },
];

const MOCK_BLOQUEOS = [
  { id: 1, fecha: '2026-05-20', desde: '13:00', hasta: '15:00', colaborador: 'Andrea M.', motivo: 'Reunión de equipo' },
  { id: 2, fecha: '2026-05-22', desde: '10:00', hasta: '11:30', colaborador: 'Paula R.',  motivo: 'Capacitación' },
  { id: 3, fecha: '2026-05-28', desde: '09:00', hasta: '12:00', colaborador: 'Todos',     motivo: 'Limpieza general' },
];

const COLABORADORES = ['Andrea M.', 'Paula R.', 'Todos'];

// Servicios con su duración por defecto (min) — usados por el flujo de nueva reserva
const SERVICIOS = [
  { nombre: 'Corte',            duracion: 45 },
  { nombre: 'Corte + Brushing', duracion: 60 },
  { nombre: 'Coloración',       duracion: 90 },
  { nombre: 'Manicure',         duracion: 45 },
  { nombre: 'Pedicure',         duracion: 60 },
];
const RESERVA_COLABORADORES = ['Andrea M.', 'Paula R.'];

// ── SHARED PRIMITIVES ────────────────────────────────────────────────────────

function AgendaViewHeader({ title, onPrev, onNext, onReset, resetLabel, summary, children }) {
  return (
    <div className="agenda-view-header">
      <div className="agenda-nav-group">
        <button className="agenda-nav-btn" onClick={onPrev} aria-label="Anterior">
          <Icon name="chevron-left" />
        </button>
        <span className="agenda-nav-title">{title}</span>
        <button className="agenda-nav-btn" onClick={onNext} aria-label="Siguiente">
          <Icon name="chevron-right" />
        </button>
        {onReset && (
          <button className="agenda-reset-btn" onClick={onReset}>
            {resetLabel || 'Hoy'}
          </button>
        )}
      </div>
      {summary}
      <div className="agenda-header-actions">{children}</div>
    </div>
  );
}

function AgendaEmptyState({ icon, message }) {
  return (
    <div className="agenda-empty-state">
      <Icon name={icon || 'calendar'} />
      <span>{message || 'Sin datos'}</span>
    </div>
  );
}

// ── HOY VIEW ─────────────────────────────────────────────────────────────────

function AgendaSummaryRow({ citas }) {
  const total = citas.length;
  const pendientes = citas.filter(c => c.estado === 'pending').length;
  const horas = (citas.reduce((acc, c) => acc + c.duracion, 0) / 60).toFixed(1);
  return (
    <div className="agenda-summary-row">
      <div className="agenda-summary-chip">
        <span className="agenda-summary-num">{total}</span> citas
      </div>
      <div className="agenda-summary-sep" />
      <div className="agenda-summary-chip">
        <span className="agenda-summary-num">{horas}h</span> ocupadas
      </div>
      <div className="agenda-summary-sep" />
      <div className="agenda-summary-chip">
        <span className="agenda-summary-num">{pendientes}</span> pendientes
      </div>
    </div>
  );
}

// Detalle de la reserva en modo consulta, mostrado dentro del panel lateral
function ReservaDetalle({ cita }) {
  return (
    <div className="reserva-detail">
      <div className="reserva-detail-time">
        <Icon name="clock" />
        <span>{cita.hora} · {cita.duracion} min</span>
      </div>
      <div className="cita-detail-grid">
        <div className="cita-detail-row cita-detail-row--full">
          <div className="cita-detail-label">Cliente</div>
          <div className="cita-detail-value">{cita.cliente}</div>
        </div>
        <div className="cita-detail-row">
          <div className="cita-detail-label">Servicio</div>
          <div className="cita-detail-value">{cita.servicio}</div>
        </div>
        <div className="cita-detail-row">
          <div className="cita-detail-label">Colaborador</div>
          <div className="cita-detail-value">{cita.colaborador}</div>
        </div>
        <div className="cita-detail-row">
          <div className="cita-detail-label">Estado</div>
          <div className="cita-detail-value"><EstadoBadge estado={cita.estado} /></div>
        </div>
        <div className="cita-detail-row cita-detail-row--full">
          <div className="cita-detail-label">Notas</div>
          <div className="cita-detail-value">{cita.notas || '—'}</div>
        </div>
      </div>
    </div>
  );
}

// ── TIMELINE · bloques posicionados por hora de inicio y altos según duración ──

const TIMELINE_START = 8;   // primera hora visible
const TIMELINE_END   = 21;  // límite inferior (exclusivo)
const HOUR_PX = 84;         // alto de cada franja horaria
const PX_PER_MIN = HOUR_PX / 60;

const toMin  = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
const fmtMin = (min)  => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;

// Asigna a cada cita una columna y el total de columnas de su grupo de solapamiento,
// para repartir el ancho cuando varias citas coinciden en el tiempo.
function layoutCitas(citas) {
  const evs = citas
    .map(c => ({ ...c, start: toMin(c.hora), end: toMin(c.hora) + c.duracion }))
    .sort((a, b) => a.start - b.start || a.end - b.end);

  const colEnds = [];
  evs.forEach(ev => {
    let col = colEnds.findIndex(end => ev.start >= end);
    if (col === -1) { col = colEnds.length; colEnds.push(ev.end); }
    else colEnds[col] = ev.end;
    ev.col = col;
  });

  // Reparte en clusters de solapamiento encadenado para fijar el total de columnas
  let from = 0, maxEnd = -Infinity;
  const seal = (a, b) => {
    const cols = Math.max(...evs.slice(a, b).map(e => e.col)) + 1;
    for (let i = a; i < b; i++) evs[i].cols = cols;
  };
  evs.forEach((ev, idx) => {
    if (idx > 0 && ev.start >= maxEnd) { seal(from, idx); from = idx; maxEnd = ev.end; }
    else maxEnd = Math.max(maxEnd, ev.end);
  });
  if (evs.length) seal(from, evs.length);
  return evs;
}

function CitaBlock({ cita, style, selected, onOpen }) {
  const short = cita.duracion <= 30;
  return (
    <div
      className={`cita-block status-${cita.estado}${selected ? ' selected' : ''}${short ? ' is-short' : ''}`}
      style={style}
      onClick={() => onOpen(cita)}
      role="button"
      tabIndex="0"
    >
      <div className="cita-block-time">{cita.hora}–{fmtMin(toMin(cita.hora) + cita.duracion)}</div>
      <div className="cita-block-client">{cita.cliente}</div>
      {cita.duracion >= 60 && <div className="cita-block-meta">{cita.servicio} · {cita.colaborador}</div>}
    </div>
  );
}

function Timeline({ citas, selectedId, onOpen, onAdd }) {
  const startMin = TIMELINE_START * 60;
  const hours = [];
  for (let h = TIMELINE_START; h < TIMELINE_END; h++) hours.push(h);

  const laidOut = layoutCitas(
    citas.filter(c => { const s = toMin(c.hora); return s >= startMin && s < TIMELINE_END * 60; })
  );

  return (
    <div className="timeline">
      <div className="timeline-grid">
        {hours.map(h => (
          <div key={h} className="timeline-hour-row" style={{ height: HOUR_PX }}>
            <span className="timeline-hour-label">{fmtMin(h * 60)}</span>
            <button
              type="button"
              className="timeline-hour-add"
              onClick={() => onAdd(fmtMin(h * 60))}
              aria-label={`Nueva cita a las ${fmtMin(h * 60)}`}
            >
              <Icon name="plus" />
            </button>
          </div>
        ))}
      </div>
      <div className="timeline-events">
        {laidOut.map(ev => {
          const width = 100 / ev.cols;
          return (
            <CitaBlock
              key={ev.id}
              cita={ev}
              selected={selectedId === ev.id}
              onOpen={onOpen}
              style={{
                top: (ev.start - startMin) * PX_PER_MIN,
                height: ev.duracion * PX_PER_MIN,
                left: `${ev.col * width}%`,
                width: `calc(${width}% - 6px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── PANEL DE RESERVA · convive con el contenido (no overlay). Sirve para crear y editar ──

function buildInitialForm({ cita, initialHora }) {
  if (cita) {
    return {
      cliente: cita.cliente || '',
      servicio: cita.servicio || '',
      colaborador: cita.colaborador || RESERVA_COLABORADORES[0],
      hora: cita.hora || '',
      duracion: cita.duracion || 60,
      estado: cita.estado || 'confirmed',
      notas: cita.notas || '',
    };
  }
  return {
    cliente: '', servicio: '', colaborador: RESERVA_COLABORADORES[0],
    hora: initialHora || '', duracion: 60, estado: 'confirmed', notas: '',
  };
}

function ReservaPanel({ mode, cita, initialHora, onClose, onSave, onEdit, onReagendar, onAnular }) {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';
  const [form, setForm] = React.useState(() => buildInitialForm({ cita, initialHora }));

  // Re-sincroniza el formulario al cambiar el objetivo (otra cita, o de crear↔editar)
  React.useEffect(() => {
    setForm(buildInitialForm({ cita, initialHora }));
  }, [mode, cita, initialHora]);

  // Cerrar con Escape
  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const onServicio = e => {
    const nombre = e.target.value;
    const s = SERVICIOS.find(x => x.nombre === nombre);
    setForm(f => ({ ...f, servicio: nombre, duracion: s ? s.duracion : f.duracion }));
  };
  const ok = form.cliente.trim() && form.servicio && form.hora;

  const save = () => {
    if (!ok) return;
    onSave({
      id: isEdit ? cita.id : Date.now(),
      hora: form.hora,
      duracion: parseInt(form.duracion, 10) || 60,
      cliente: form.cliente.trim(),
      servicio: form.servicio,
      colaborador: form.colaborador,
      estado: form.estado,
      notas: form.notas.trim(),
    });
  };

  const panelTitle = isView ? 'Detalle de reserva' : isEdit ? 'Editar reserva' : 'Nueva reserva';

  return (
      <aside className="reserva-panel" role="dialog" aria-label={panelTitle}>
        <div className="reserva-panel-header">
          <div>
            <div className="reserva-panel-eyebrow">Agenda</div>
            <div className="reserva-panel-title">{panelTitle}</div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar">
            <Icon name="x" />
          </button>
        </div>

        {isView ? (
          <React.Fragment>
            <div className="reserva-panel-body">
              <ReservaDetalle cita={cita} />
            </div>
            <div className="reserva-panel-footer reserva-panel-footer--view">
              <button className="btn-primary-sm reserva-footer-btn" onClick={() => onEdit(cita)}>
                <Icon name="pencil" />Editar
              </button>
              <button className="btn-sm-ghost reserva-footer-btn" onClick={() => onReagendar(cita)}>
                <Icon name="calendar-clock" />Reagendar
              </button>
              <button className="btn-sm-ghost reserva-footer-btn reserva-btn-danger" onClick={() => onAnular(cita)}>
                <Icon name="x-circle" />Anular
              </button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
        <div className="reserva-panel-body">
          <div className="reserva-field">
            <label className="reserva-field-label">Cliente</label>
            <input
              type="text"
              className="reserva-input"
              placeholder="Nombre del cliente"
              value={form.cliente}
              onChange={up('cliente')}
              autoFocus
            />
          </div>

          <div className="reserva-field">
            <label className="reserva-field-label">Servicio</label>
            <select className="reserva-input" value={form.servicio} onChange={onServicio}>
              <option value="" disabled>Seleccionar servicio…</option>
              {SERVICIOS.map(s => <option key={s.nombre} value={s.nombre}>{s.nombre}</option>)}
            </select>
          </div>

          <div className="reserva-field">
            <label className="reserva-field-label">Colaborador</label>
            <select className="reserva-input" value={form.colaborador} onChange={up('colaborador')}>
              {RESERVA_COLABORADORES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="reserva-field-grid">
            <div className="reserva-field">
              <label className="reserva-field-label">Hora</label>
              <input type="time" className="reserva-input" value={form.hora} onChange={up('hora')} />
            </div>
            <div className="reserva-field">
              <label className="reserva-field-label">Duración</label>
              <select className="reserva-input" value={form.duracion} onChange={up('duracion')}>
                {[30, 45, 60, 90, 120].map(m => <option key={m} value={m}>{m} min</option>)}
              </select>
            </div>
          </div>

          <div className="reserva-field">
            <label className="reserva-field-label">Estado</label>
            <div className="reserva-segment">
              {[{ v: 'confirmed', l: 'Confirmada' }, { v: 'pending', l: 'Pendiente' }].map(o => (
                <button
                  key={o.v}
                  type="button"
                  className={`reserva-segment-btn${form.estado === o.v ? ' active' : ''}`}
                  onClick={() => setForm(f => ({ ...f, estado: o.v }))}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          <div className="reserva-field">
            <label className="reserva-field-label">Notas <span className="reserva-field-opt">(opcional)</span></label>
            <textarea
              className="reserva-input reserva-textarea"
              rows="3"
              placeholder="Detalles, preferencias…"
              value={form.notas}
              onChange={up('notas')}
            />
          </div>
        </div>

        <div className="reserva-panel-footer">
          <button className="btn-sm-ghost reserva-footer-btn" onClick={onClose}>Cancelar</button>
          <button className="btn-primary-sm reserva-footer-btn" disabled={!ok} onClick={save}>
            <Icon name="check" />{isEdit ? 'Guardar cambios' : 'Crear reserva'}
          </button>
        </div>
          </React.Fragment>
        )}
      </aside>
  );
}

function HoyView({ citas, onSaveCita }) {
  const [dayOffset, setDayOffset] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState(null);
  // null = cerrado | { mode: 'view'|'edit', cita } | { mode: 'new', hora }
  const [panel, setPanel] = React.useState(null);

  const closePanel = () => { setPanel(null); setSelectedId(null); };
  const openNew  = (hora) => { setSelectedId(null); setPanel({ mode: 'new', hora: hora || '' }); };
  const openView = (cita) => { setSelectedId(cita.id); setPanel({ mode: 'view', cita }); };
  const openEdit = (cita) => { setSelectedId(cita.id); setPanel({ mode: 'edit', cita }); };

  const handleSave = (cita) => {
    onSaveCita(cita);
    closePanel();
  };

  const handleAnular = (cita) => {
    onSaveCita({ ...cita, estado: 'cancelled' });
    closePanel();
  };

  const today = new Date();
  const date = new Date(today);
  date.setDate(date.getDate() + dayOffset);

  const isToday = dayOffset === 0;
  const dayNames   = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const titleDay   = `${dayNames[date.getDay()]} ${date.getDate()} de ${monthNames[date.getMonth()]}`;
  const title = isToday
    ? `Hoy — ${titleDay}`
    : titleDay.charAt(0).toUpperCase() + titleDay.slice(1);

  return (
    <div className={`agenda-view${panel ? ' has-panel' : ''}`}>
      <div className="agenda-view-main">
        <AgendaViewHeader
          title={title}
          onPrev={() => { setDayOffset(d => d - 1); closePanel(); }}
          onNext={() => { setDayOffset(d => d + 1); closePanel(); }}
          onReset={!isToday ? () => { setDayOffset(0); closePanel(); } : null}
          resetLabel="Hoy"
          summary={<AgendaSummaryRow citas={citas} />}
        >
          {!panel && (
            <button className="btn-primary-sm" onClick={() => openNew('')}>
              <Icon name="calendar-plus" />
              Nueva cita
            </button>
          )}
        </AgendaViewHeader>

        <div className="timeline-wrap">
          <Timeline
            citas={citas}
            selectedId={selectedId}
            onOpen={openView}
            onAdd={openNew}
          />
        </div>
      </div>

      {panel && (
        <ReservaPanel
          mode={panel.mode}
          cita={panel.cita}
          initialHora={panel.hora}
          onClose={closePanel}
          onSave={handleSave}
          onEdit={openEdit}
          onReagendar={openEdit}
          onAnular={handleAnular}
        />
      )}
    </div>
  );
}

// ── SEMANA VIEW ───────────────────────────────────────────────────────────────

function CitaCardCompact({ cita, selected, onOpen }) {
  return (
    <div
      className={`semana-cita-card${selected ? ' selected' : ''}`}
      onClick={() => onOpen(cita)}
      role="button"
      tabIndex="0"
    >
      <div className="semana-cita-time">{cita.hora}</div>
      <div className="semana-cita-client">{cita.cliente}</div>
      <EstadoBadge estado={cita.estado} />
    </div>
  );
}

function SemanaDayColumn({ dayName, dayNumber, citas, isToday, selectedId, onOpen }) {
  return (
    <div className={`semana-col${isToday ? ' is-today' : ''}`}>
      <div className="semana-col-header">
        <div className="semana-col-dayname">{dayName}</div>
        <div className={`semana-col-daynumber${isToday ? ' is-today' : ''}`}>{dayNumber}</div>
      </div>
      <div className="semana-col-body">
        {citas.length === 0
          ? <div className="semana-empty">—</div>
          : citas.map(c => (
            <CitaCardCompact key={c.id} cita={c} selected={selectedId === c.id} onOpen={onOpen} />
          ))
        }
      </div>
    </div>
  );
}

function SemanaView() {
  const [weekOffset, setWeekOffset] = React.useState(0);
  const [citasSemana, setCitasSemana] = React.useState(MOCK_CITAS_SEMANA);
  const [selectedId, setSelectedId] = React.useState(null);
  // null = cerrado | { mode: 'view'|'edit', cita }
  const [panel, setPanel] = React.useState(null);

  const closePanel = () => { setPanel(null); setSelectedId(null); };
  const openView   = (cita) => { setSelectedId(cita.id); setPanel({ mode: 'view', cita }); };
  const openEdit   = (cita) => { setSelectedId(cita.id); setPanel({ mode: 'edit', cita }); };

  // Conserva dayIndex (y demás campos no editados) al guardar la cita de la semana
  const handleSave = (updated) => {
    setCitasSemana(prev => prev.map(c => (c.id === updated.id ? { ...c, ...updated } : c)));
    closePanel();
  };
  const handleAnular = (cita) => {
    setCitasSemana(prev => prev.map(c => (c.id === cita.id ? { ...c, estado: 'cancelled' } : c)));
    closePanel();
  };

  const today = new Date();
  const dow = today.getDay();
  const mondayDiff = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayDiff + weekOffset * 7);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const shortMonths = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const title = `${monday.getDate()} ${shortMonths[monday.getMonth()]} — ${sunday.getDate()} ${shortMonths[sunday.getMonth()]} ${sunday.getFullYear()}`;

  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
  const todayStr = today.toDateString();

  return (
    <div className={`agenda-view${panel ? ' has-panel' : ''}`}>
      <div className="agenda-view-main">
        <AgendaViewHeader
          title={title}
          onPrev={() => { setWeekOffset(w => w - 1); closePanel(); }}
          onNext={() => { setWeekOffset(w => w + 1); closePanel(); }}
          onReset={weekOffset !== 0 ? () => { setWeekOffset(0); closePanel(); } : null}
          resetLabel="Esta semana"
        />
        <div className="semana-grid">
          {days.map((d, i) => (
            <SemanaDayColumn
              key={i}
              dayName={dayNames[i]}
              dayNumber={d.getDate()}
              citas={citasSemana.filter(c => c.dayIndex === i)}
              isToday={d.toDateString() === todayStr}
              selectedId={selectedId}
              onOpen={openView}
            />
          ))}
        </div>
      </div>

      {panel && (
        <ReservaPanel
          mode={panel.mode}
          cita={panel.cita}
          onClose={closePanel}
          onSave={handleSave}
          onEdit={openEdit}
          onReagendar={openEdit}
          onAnular={handleAnular}
        />
      )}
    </div>
  );
}

// ── MES VIEW ─────────────────────────────────────────────────────────────────

function MesDayCell({ date, citas, isToday, isSelected, isOut, onClick }) {
  const dots = citas.slice(0, 2);
  const overflow = citas.length - 2;
  return (
    <div
      className={`mes-day-cell${isToday ? ' is-today' : ''}${isSelected ? ' is-selected' : ''}${isOut ? ' is-out' : ''}`}
      onClick={isOut ? undefined : onClick}
      role={isOut ? undefined : 'button'}
      tabIndex={isOut ? undefined : 0}
    >
      <div className={`mes-day-number${isToday ? ' today-circle' : ''}`}>{date.getDate()}</div>
      {citas.length > 0 && (
        <div className="mes-dot-row">
          {dots.map((c, i) => <span key={i} className={`mes-dot status-${c.estado}`} />)}
          {overflow > 0 && <span className="mes-overflow-count">+{overflow}</span>}
        </div>
      )}
    </div>
  );
}

function MesSidePanel({ date, citas, onClose }) {
  const dayNames   = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const title = `${dayNames[date.getDay()]} ${date.getDate()} de ${monthNames[date.getMonth()]}`;
  return (
    <div className="mes-side-panel">
      <div className="mes-side-panel-header">
        <div className="mes-side-panel-title">{title}</div>
        <button className="icon-btn" onClick={onClose} aria-label="Cerrar">
          <Icon name="x" />
        </button>
      </div>
      <div className="mes-side-panel-body">
        {citas.length === 0 ? (
          <AgendaEmptyState icon="calendar" message="Sin citas este día" />
        ) : (
          <div className="cita-list">
            {citas.map(c => (
              <div key={c.id} className="cita-row">
                <div className="cita-hora">{c.hora}</div>
                <div className="cita-info">
                  <div className="cita-cliente">{c.cliente}</div>
                </div>
                <EstadoBadge estado={c.estado} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MesView() {
  const [monthOffset, setMonthOffset] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const today = new Date();
  const baseDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year  = baseDate.getFullYear();
  const month = baseDate.getMonth();

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const weekDayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const title = `${monthNames[month]} ${year}`;

  // Build Mon-first grid (6 weeks = 42 cells)
  const firstDay = new Date(year, month, 1);
  const startDow = firstDay.getDay();
  const offset = startDow === 0 ? 6 : startDow - 1;
  const startDate = new Date(year, month, 1 - offset);

  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });

  const toIso = d =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const todayIso = toIso(today);

  const citasByDate = {};
  MOCK_CITAS_MES.forEach(c => {
    if (!citasByDate[c.fecha]) citasByDate[c.fecha] = [];
    citasByDate[c.fecha].push(c);
  });

  const selectedIso    = selectedDate ? toIso(selectedDate) : null;
  const selectedCitas  = selectedDate ? (citasByDate[toIso(selectedDate)] || []) : [];

  const handleDayClick = d => {
    const iso = toIso(d);
    setSelectedDate(iso === selectedIso ? null : d);
  };

  return (
    <div className="agenda-view">
      <AgendaViewHeader
        title={title}
        onPrev={() => { setMonthOffset(m => m - 1); setSelectedDate(null); }}
        onNext={() => { setMonthOffset(m => m + 1); setSelectedDate(null); }}
        onReset={monthOffset !== 0 ? () => { setMonthOffset(0); setSelectedDate(null); } : null}
        resetLabel="Mes actual"
      />
      <div className={`mes-layout${selectedDate ? ' has-panel' : ''}`}>
        <div className="mes-grid-wrap">
          <div className="mes-weekday-header">
            {weekDayNames.map(d => <div key={d} className="mes-weekday-cell">{d}</div>)}
          </div>
          <div className="mes-grid">
            {cells.map((d, i) => {
              const iso = toIso(d);
              return (
                <MesDayCell
                  key={i}
                  date={d}
                  citas={citasByDate[iso] || []}
                  isToday={iso === todayIso}
                  isSelected={iso === selectedIso}
                  isOut={d.getMonth() !== month}
                  onClick={() => handleDayClick(d)}
                />
              );
            })}
          </div>
        </div>
        {selectedDate && (
          <MesSidePanel
            date={selectedDate}
            citas={selectedCitas}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </div>
    </div>
  );
}

// ── HORARIOS VIEW ─────────────────────────────────────────────────────────────

function AgendaToggle({ value, onChange }) {
  return (
    <button
      className={`agenda-toggle${value ? ' on' : ''}`}
      onClick={() => onChange(!value)}
      role="switch"
      aria-checked={value}
    >
      <span className="agenda-toggle-thumb" />
    </button>
  );
}

function HorarioRow({ dia, onChange, onApplyColacionAll }) {
  return (
    <div className="agenda-table-row horario-row">
      <div className="horario-day-name">{dia.label}</div>
      <AgendaToggle value={dia.activo} onChange={v => onChange({ ...dia, activo: v })} />

      <div className={`horario-times${!dia.activo ? ' disabled' : ''}`}>
        <span className="horario-time-label">Atención</span>
        <input
          type="time"
          className="agenda-time-input"
          value={dia.apertura}
          disabled={!dia.activo}
          onChange={e => onChange({ ...dia, apertura: e.target.value })}
        />
        <span className="horario-time-sep">—</span>
        <input
          type="time"
          className="agenda-time-input"
          value={dia.cierre}
          disabled={!dia.activo}
          onChange={e => onChange({ ...dia, cierre: e.target.value })}
        />
      </div>

      {dia.activo ? (
        <div className="horario-colacion">
          <span className="horario-divider" />
          <span className="horario-colacion-head"><Icon name="coffee" />Colación</span>
          <AgendaToggle value={!!dia.colacion} onChange={v => onChange({ ...dia, colacion: v })} />
          {dia.colacion ? (
            <React.Fragment>
              <input
                type="time"
                className="agenda-time-input"
                value={dia.colacionDesde || '13:00'}
                onChange={e => onChange({ ...dia, colacionDesde: e.target.value })}
              />
              <span className="horario-time-sep">—</span>
              <input
                type="time"
                className="agenda-time-input"
                value={dia.colacionHasta || '14:00'}
                onChange={e => onChange({ ...dia, colacionHasta: e.target.value })}
              />
              <button
                type="button"
                className="horario-apply-all"
                onClick={() => onApplyColacionAll(dia)}
                title="Aplicar esta colación a todos los días"
              >
                <Icon name="copy" />Aplicar a todos
              </button>
            </React.Fragment>
          ) : (
            <span className="horario-colacion-off">Sin colación</span>
          )}
        </div>
      ) : (
        <span className="badge badge-closed">Cerrado</span>
      )}
    </div>
  );
}

function HorariosView() {
  const [horarios, setHorarios] = React.useState(MOCK_HORARIOS);
  const [saved, setSaved] = React.useState(false);

  const updateDia = (idx, updated) => {
    setSaved(false);
    setHorarios(h => h.map((d, i) => i === idx ? updated : d));
  };

  // Copia la colación de un día (toggle + horas) a todos los días abiertos.
  const applyColacionAll = (source) => {
    setSaved(false);
    setHorarios(h => h.map(d => d.activo ? {
      ...d,
      colacion: source.colacion,
      colacionDesde: source.colacionDesde,
      colacionHasta: source.colacionHasta,
    } : d));
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="agenda-config-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Horarios de atención</div>
          <div className="agenda-config-desc">Configura los días, horarios y la colación en que tu negocio atiende reservas.</div>
        </div>
        <button className={`agenda-save-btn${saved ? ' saved' : ''}`} onClick={save}>
          {saved ? <React.Fragment><Icon name="check" />Guardado</React.Fragment> : 'Guardar cambios'}
        </button>
      </div>
      <div className="agenda-table">
        {horarios.map((dia, i) => (
          <HorarioRow
            key={dia.id}
            dia={dia}
            onChange={updated => updateDia(i, updated)}
            onApplyColacionAll={applyColacionAll}
          />
        ))}
      </div>
    </div>
  );
}

// ── EXCEPCIONES VIEW ──────────────────────────────────────────────────────────

// Modal de creación/edición de excepciones (días cerrados u horario especial).
function ExcepcionModal({ mode, excepcion, onClose, onSave }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = React.useState(() => ({
    fecha: excepcion?.fecha || '',
    tipo: excepcion?.tipo || 'closed',
    motivo: excepcion?.motivo || '',
    apertura: excepcion?.apertura || '09:00',
    cierre: excepcion?.cierre || '14:00',
  }));
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const ok = form.fecha && form.motivo.trim() && (form.tipo !== 'special' || (form.apertura && form.cierre));

  const save = () => {
    if (!ok) return;
    const exc = {
      id: isEdit ? excepcion.id : Date.now(),
      fecha: form.fecha,
      tipo: form.tipo,
      motivo: form.motivo.trim(),
    };
    if (form.tipo === 'special') { exc.apertura = form.apertura; exc.cierre = form.cierre; }
    onSave(exc);
  };

  const footer = (
    <React.Fragment>
      <button className="btn-sm-ghost reserva-footer-btn" onClick={onClose}>Cancelar</button>
      <button className="btn-primary-sm reserva-footer-btn" disabled={!ok} onClick={save}>
        <Icon name="check" />{isEdit ? 'Guardar cambios' : 'Crear excepción'}
      </button>
    </React.Fragment>
  );

  return (
    <Modal eyebrow="Agenda" title={isEdit ? 'Editar excepción' : 'Nueva excepción'} onClose={onClose} footer={footer}>
      <div className="reserva-field">
        <label className="reserva-field-label">Fecha</label>
        <input type="date" className="reserva-input" value={form.fecha} onChange={up('fecha')} autoFocus />
      </div>
      <div className="reserva-field">
        <label className="reserva-field-label">Tipo</label>
        <select className="reserva-input" value={form.tipo} onChange={up('tipo')}>
          <option value="closed">Cerrado</option>
          <option value="special">Horario especial</option>
        </select>
      </div>
      {form.tipo === 'special' && (
        <div className="reserva-field-grid">
          <div className="reserva-field">
            <label className="reserva-field-label">Desde</label>
            <input type="time" className="reserva-input" value={form.apertura} onChange={up('apertura')} />
          </div>
          <div className="reserva-field">
            <label className="reserva-field-label">Hasta</label>
            <input type="time" className="reserva-input" value={form.cierre} onChange={up('cierre')} />
          </div>
        </div>
      )}
      <div className="reserva-field">
        <label className="reserva-field-label">Motivo</label>
        <input type="text" className="reserva-input" placeholder="Ej: Feriado nacional" value={form.motivo} onChange={up('motivo')} />
      </div>
    </Modal>
  );
}

function ExcepcionesView() {
  const [items, setItems] = React.useState(MOCK_EXCEPCIONES);
  const [modal, setModal] = React.useState(null);          // null | { mode, excepcion }
  const [confirmDel, setConfirmDel] = React.useState(null); // excepción a eliminar

  const handleSave = exc => {
    setItems(p => (p.some(e => e.id === exc.id) ? p.map(e => (e.id === exc.id ? exc : e)) : [...p, exc]));
    setModal(null);
  };
  const handleDelete = () => {
    if (confirmDel) setItems(p => p.filter(e => e.id !== confirmDel.id));
    setConfirmDel(null);
  };

  const fmtFecha = iso => {
    const [y, m, d] = iso.split('-');
    const mm = ['', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${d} ${mm[parseInt(m)]} ${y}`;
  };

  return (
    <div className="agenda-config-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Excepciones</div>
          <div className="agenda-config-desc">Días en que el negocio cierra o tiene horario especial.</div>
        </div>
        <button className="btn-primary-sm" onClick={() => setModal({ mode: 'new' })}>
          <Icon name="plus" />Nueva excepción
        </button>
      </div>
      <div className="agenda-table">
        <div className="agenda-table-head excepciones-head">
          <div>Fecha</div><div>Motivo</div><div>Tipo</div><div />
        </div>
        {items.length === 0 ? (
          <AgendaEmptyState icon="calendar-x" message="Sin excepciones registradas" />
        ) : items.map(exc => (
          <div key={exc.id} className="agenda-table-row excepciones-row">
            <div className="agenda-table-fecha">{fmtFecha(exc.fecha)}</div>
            <div className="agenda-table-motivo">{exc.motivo}</div>
            <div>
              {exc.tipo === 'closed'
                ? <span className="badge badge-closed">Cerrado</span>
                : <span className="badge badge-special">Horario especial{exc.apertura ? ` · ${exc.apertura}–${exc.cierre}` : ''}</span>
              }
            </div>
            <div className="agenda-row-actions">
              <button className="agenda-action-btn edit" onClick={() => setModal({ mode: 'edit', excepcion: exc })} aria-label="Editar excepción">
                <Icon name="pencil" />
              </button>
              <button className="agenda-action-btn" onClick={() => setConfirmDel(exc)} aria-label="Eliminar excepción">
                <Icon name="trash-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <ExcepcionModal
          mode={modal.mode}
          excepcion={modal.excepcion}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {confirmDel && (
        <ConfirmDialog
          title="Eliminar excepción"
          message={`¿Eliminar la excepción del ${fmtFecha(confirmDel.fecha)} (${confirmDel.motivo})? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          danger
          onConfirm={handleDelete}
          onClose={() => setConfirmDel(null)}
        />
      )}
    </div>
  );
}

// ── BLOQUEOS VIEW ─────────────────────────────────────────────────────────────

// Modal de bloqueo · acceso rápido para bloquear una franja desde cualquier lado
function BloqueoModal({ onClose, onSave }) {
  const [form, setForm] = React.useState({ fecha: '', desde: '', hasta: '', colaborador: COLABORADORES[0], motivo: '' });
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const ok = form.fecha && form.desde && form.hasta && form.motivo.trim();

  const save = () => {
    if (!ok) return;
    onSave({
      id: Date.now(),
      fecha: form.fecha,
      desde: form.desde,
      hasta: form.hasta,
      colaborador: form.colaborador,
      motivo: form.motivo.trim(),
    });
  };

  const footer = (
    <React.Fragment>
      <button className="btn-sm-ghost reserva-footer-btn" onClick={onClose}>Cancelar</button>
      <button className="btn-primary-sm reserva-footer-btn" disabled={!ok} onClick={save}>
        <Icon name="check" />Bloquear
      </button>
    </React.Fragment>
  );

  return (
    <Modal eyebrow="Agenda" title="Bloquear horario" onClose={onClose} footer={footer}>
      <div className="reserva-field">
        <label className="reserva-field-label">Fecha</label>
        <input type="date" className="reserva-input" value={form.fecha} onChange={up('fecha')} autoFocus />
      </div>
      <div className="reserva-field-grid">
        <div className="reserva-field">
          <label className="reserva-field-label">Desde</label>
          <input type="time" className="reserva-input" value={form.desde} onChange={up('desde')} />
        </div>
        <div className="reserva-field">
          <label className="reserva-field-label">Hasta</label>
          <input type="time" className="reserva-input" value={form.hasta} onChange={up('hasta')} />
        </div>
      </div>
      <div className="reserva-field">
        <label className="reserva-field-label">Colaborador</label>
        <select className="reserva-input" value={form.colaborador} onChange={up('colaborador')}>
          {COLABORADORES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="reserva-field">
        <label className="reserva-field-label">Motivo</label>
        <input type="text" className="reserva-input" placeholder="Ej: Colación, reunión, capacitación…" value={form.motivo} onChange={up('motivo')} />
      </div>
    </Modal>
  );
}

function BloqueosView({ bloqueos, onSaveBloqueo, onRemoveBloqueo }) {
  const [showModal, setShowModal] = React.useState(false);

  const handleSave = b => { onSaveBloqueo(b); setShowModal(false); };

  const fmtFecha = iso => {
    const [y, m, d] = iso.split('-');
    const mm = ['', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${d} ${mm[parseInt(m)]} ${y}`;
  };

  return (
    <div className="agenda-config-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Bloqueos de horario</div>
          <div className="agenda-config-desc">Franjas de tiempo en que un colaborador no está disponible para reservas.</div>
        </div>
        <button className="btn-primary-sm" onClick={() => setShowModal(true)}>
          <Icon name="plus" />Nuevo bloqueo
        </button>
      </div>
      <div className="agenda-table">
        <div className="agenda-table-head bloqueos-head">
          <div>Fecha</div><div>Horario</div><div>Colaborador</div><div>Motivo</div><div />
        </div>
        {bloqueos.length === 0 ? (
          <AgendaEmptyState icon="ban" message="Sin bloqueos registrados" />
        ) : bloqueos.map(b => (
          <div key={b.id} className="agenda-table-row bloqueos-row">
            <div className="agenda-table-fecha">{fmtFecha(b.fecha)}</div>
            <div className="agenda-table-rango">{b.desde} — {b.hasta}</div>
            <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>{b.colaborador}</div>
            <div className="agenda-table-motivo">{b.motivo}</div>
            <button className="agenda-action-btn" onClick={() => onRemoveBloqueo(b.id)} aria-label="Eliminar">
              <Icon name="trash-2" />
            </button>
          </div>
        ))}
      </div>

      {showModal && <BloqueoModal onClose={() => setShowModal(false)} onSave={handleSave} />}
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

function AgendaSection({ sub, citas, onSaveCita, bloqueos, onSaveBloqueo, onRemoveBloqueo }) {
  const view = sub || 'hoy';
  if (view === 'hoy')         return <HoyView citas={citas} onSaveCita={onSaveCita} />;
  if (view === 'semana')      return <SemanaView />;
  if (view === 'mes')         return <MesView />;
  if (view === 'horarios')    return <HorariosView />;
  if (view === 'excepciones') return <ExcepcionesView />;
  if (view === 'bloqueos')    return <BloqueosView bloqueos={bloqueos} onSaveBloqueo={onSaveBloqueo} onRemoveBloqueo={onRemoveBloqueo} />;
  return <HoyView citas={citas} onSaveCita={onSaveCita} />;
}

Object.assign(window, { AgendaSection, ReservaPanel, BloqueoModal, MOCK_CITAS_HOY, MOCK_BLOQUEOS });
