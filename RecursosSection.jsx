// RecursosSection.jsx — Sección Recursos: Mis recursos, Asignaciones, Configuración.
// Los recursos son un store compartido; llegan por props desde AppRoot.

// ── MOCK DATA ────────────────────────────────────────────────────────────────

const MOCK_RECURSOS = [
  { id: 1, nombre: 'Secador profesional', categoria: 'Equipo',     cantidad: 4,  activo: true },
  { id: 2, nombre: 'Kit de coloración',   categoria: 'Material',   cantidad: 12, activo: true },
  { id: 3, nombre: 'Silla de barbería',   categoria: 'Mobiliario', cantidad: 3,  activo: true },
  { id: 4, nombre: 'Plancha de pelo',     categoria: 'Equipo',     cantidad: 5,  activo: true },
  { id: 5, nombre: 'Toallas',             categoria: 'Material',   cantidad: 40, activo: true },
  { id: 6, nombre: 'Carro auxiliar',      categoria: 'Mobiliario', cantidad: 2,  activo: false },
];

const RECURSO_CATEGORIAS = ['Equipo', 'Material', 'Mobiliario'];
const RECURSO_CAT_ICON = { Equipo: 'wrench', Material: 'package', Mobiliario: 'armchair' };

const MOCK_ASIGNACIONES = [
  { id: 1, recurso: 'Secador profesional', colaborador: 'Andrea Morales', cuando: 'Hoy 10:30' },
  { id: 2, recurso: 'Kit de coloración',   colaborador: 'Andrea Morales', cuando: 'Hoy 10:30' },
  { id: 3, recurso: 'Silla de barbería',   colaborador: 'Diego Fuentes',  cuando: 'Hoy 14:00' },
];

// ── MODAL DE RECURSO ───────────────────────────────────────────────────────────

function buildRecursoForm(r) {
  return {
    nombre:    r?.nombre    || '',
    categoria: r?.categoria || RECURSO_CATEGORIAS[0],
    cantidad:  r?.cantidad  || 1,
    activo:    r?.activo !== undefined ? r.activo : true,
  };
}

function RecursoModal({ mode, recurso, onClose, onSave }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = React.useState(() => buildRecursoForm(recurso));
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const up = k => e => set(k, e.target.value);
  const ok = form.nombre.trim() && Number(form.cantidad) > 0;

  const save = () => {
    if (!ok) return;
    onSave({
      id: isEdit ? recurso.id : Date.now(),
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      cantidad: parseInt(form.cantidad, 10) || 1,
      activo: form.activo,
    });
  };

  const footer = (
    <React.Fragment>
      <button className="btn-sm-ghost reserva-footer-btn" onClick={onClose}>Cancelar</button>
      <button className="btn-primary-sm reserva-footer-btn" disabled={!ok} onClick={save}>
        <Icon name="check" />{isEdit ? 'Guardar cambios' : 'Crear recurso'}
      </button>
    </React.Fragment>
  );

  return (
    <Modal eyebrow="Recursos" title={isEdit ? 'Editar recurso' : 'Nuevo recurso'} onClose={onClose} footer={footer}>
      <div className="reserva-field">
        <label className="reserva-field-label">Nombre</label>
        <input type="text" className="reserva-input" placeholder="Ej: Secador profesional" value={form.nombre} onChange={up('nombre')} autoFocus />
      </div>

      <div className="reserva-field-grid">
        <div className="reserva-field">
          <label className="reserva-field-label">Categoría</label>
          <select className="reserva-input" value={form.categoria} onChange={up('categoria')}>
            {RECURSO_CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="reserva-field">
          <label className="reserva-field-label">Cantidad</label>
          <input type="number" min="1" className="reserva-input" value={form.cantidad} onChange={up('cantidad')} />
        </div>
      </div>

      <div className="reserva-field">
        <label className="reserva-field-label">Estado</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AgendaToggle value={form.activo} onChange={v => set('activo', v)} />
          <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{form.activo ? 'Activo' : 'Inactivo'}</span>
        </div>
      </div>
    </Modal>
  );
}

// ── MIS RECURSOS ──────────────────────────────────────────────────────────────

function RecursoCard({ recurso, onEdit }) {
  const r = recurso;
  return (
    <div className={`entity-card${r.activo ? '' : ' is-inactive'}`}>
      <div className="entity-card-head">
        <span className="entity-icon"><Icon name={RECURSO_CAT_ICON[r.categoria] || 'package'} /></span>
        <div className="entity-head-text">
          <div className="entity-title">{r.nombre}</div>
          <div className="entity-sub">{r.categoria}</div>
        </div>
        <button className="entity-edit-btn" onClick={() => onEdit(r)} aria-label="Editar recurso"><Icon name="pencil" /></button>
      </div>

      <div className="entity-meta-row">
        <Icon name="hash" />
        <span>{r.cantidad} {r.cantidad === 1 ? 'unidad' : 'unidades'}</span>
      </div>

      <div className="entity-card-foot">
        <span className={`badge ${r.activo ? 'badge-activo' : 'badge-inactivo'}`}>{r.activo ? 'Activo' : 'Inactivo'}</span>
      </div>
    </div>
  );
}

function MisRecursosView({ recursos, onSave }) {
  const [query, setQuery] = React.useState('');
  const [modal, setModal] = React.useState(null);

  const handleSave = (r) => { onSave(r); setModal(null); };

  const q = query.trim().toLowerCase();
  const filtered = recursos.filter(r =>
    !q || r.nombre.toLowerCase().includes(q) || r.categoria.toLowerCase().includes(q));

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Mis recursos</div>
          <div className="agenda-config-desc">Equipamiento y materiales que usan tus servicios.</div>
        </div>
        <button className="btn-primary-sm" onClick={() => setModal({ mode: 'new' })}>
          <Icon name="plus" />Nuevo recurso
        </button>
      </div>

      <div className="mgmt-toolbar">
        <div className="mgmt-search">
          <Icon name="search" />
          <input placeholder="Buscar por nombre o categoría…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="clientes-empty"><Icon name="package" /><span>Sin recursos</span></div>
      ) : (
        <div className="cards-grid">
          {filtered.map(r => (
            <RecursoCard key={r.id} recurso={r} onEdit={(rec) => setModal({ mode: 'edit', recurso: rec })} />
          ))}
        </div>
      )}

      {modal && (
        <RecursoModal mode={modal.mode} recurso={modal.recurso} onClose={() => setModal(null)} onSave={handleSave} />
      )}
    </div>
  );
}

// ── ASIGNACIONES ──────────────────────────────────────────────────────────────

function AsignacionForm({ recursos, colaboradores, onConfirm, onCancel }) {
  const [form, setForm] = React.useState({
    recurso: recursos[0] ? recursos[0].nombre : '',
    colaborador: colaboradores[0] ? colaboradores[0].nombre : '',
    cuando: '',
  });
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const ok = form.recurso && form.colaborador && form.cuando.trim();

  return (
    <div className="agenda-form-inline">
      <div className="agenda-form-row">
        <label className="agenda-form-label">Recurso</label>
        <select className="agenda-time-input agenda-form-input-grow" value={form.recurso} onChange={up('recurso')}>
          {recursos.map(r => <option key={r.id} value={r.nombre}>{r.nombre}</option>)}
        </select>
      </div>
      <div className="agenda-form-row">
        <label className="agenda-form-label">Colaborador</label>
        <select className="agenda-time-input agenda-form-input-grow" value={form.colaborador} onChange={up('colaborador')}>
          {colaboradores.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
        </select>
      </div>
      <div className="agenda-form-row">
        <label className="agenda-form-label">Cuándo</label>
        <input type="text" className="agenda-time-input agenda-form-input-grow" placeholder="Ej: Hoy 16:00" value={form.cuando} onChange={up('cuando')} />
      </div>
      <div className="agenda-form-actions">
        <button className="btn-primary-sm" disabled={!ok} onClick={() => ok && onConfirm(form)}>
          <Icon name="plus" />Asignar
        </button>
        <button className="btn-sm-ghost" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

function AsignacionesView({ recursos }) {
  const [items, setItems] = React.useState(MOCK_ASIGNACIONES);
  const [showForm, setShowForm] = React.useState(false);

  const colaboradores = window.MOCK_COLABORADORES || [];
  const recursosActivos = recursos.filter(r => r.activo);

  const add = (form) => { setItems(p => [{ id: Date.now(), ...form }, ...p]); setShowForm(false); };
  const remove = (id) => setItems(p => p.filter(a => a.id !== id));

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Asignaciones</div>
          <div className="agenda-config-desc">Qué recurso usa cada colaborador y cuándo.</div>
        </div>
        {!showForm && (
          <button className="btn-primary-sm" onClick={() => setShowForm(true)}>
            <Icon name="plus" />Nueva asignación
          </button>
        )}
      </div>

      {showForm && (
        <AsignacionForm
          recursos={recursosActivos}
          colaboradores={colaboradores}
          onConfirm={add}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="agenda-table">
        <div className="agenda-table-head" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 2 }}>Recurso</div>
          <div style={{ flex: 2 }}>Colaborador</div>
          <div style={{ flex: 1 }}>Cuándo</div>
          <div style={{ width: 32 }} />
        </div>
        {items.length === 0 ? (
          <div className="clientes-empty"><Icon name="link" /><span>Sin asignaciones</span></div>
        ) : items.map(a => (
          <div key={a.id} className="agenda-table-row" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 2 }} className="entity-row-strong">{a.recurso}</div>
            <div style={{ flex: 2, color: 'var(--fg-2)', fontSize: 14 }}>{a.colaborador}</div>
            <div style={{ flex: 1, color: 'var(--fg-3)', fontSize: 14 }}>{a.cuando}</div>
            <button className="agenda-action-btn" onClick={() => remove(a.id)} aria-label="Quitar asignación">
              <Icon name="trash-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CONFIGURACIÓN ─────────────────────────────────────────────────────────────

const RECURSO_AJUSTES = [
  { k: 'sinStock',  label: 'Avisar cuando un recurso quede sin stock', desc: 'Recibes una alerta al llegar a cero unidades disponibles.' },
  { k: 'bloquear',  label: 'Bloquear reservas sin recurso disponible', desc: 'No permite agendar si falta un recurso requerido por el servicio.' },
  { k: 'solapadas', label: 'Permitir asignar a citas solapadas',       desc: 'Un mismo recurso puede asignarse a citas que coinciden en horario.' },
];

function ConfigRecursosView() {
  const [vals, setVals] = React.useState({ sinStock: true, bloquear: false, solapadas: false });

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Configuración de recursos</div>
          <div className="agenda-config-desc">Reglas de stock y asignación de tus recursos.</div>
        </div>
      </div>

      <div className="agenda-table">
        {RECURSO_AJUSTES.map(s => (
          <div key={s.k} className="agenda-table-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ minWidth: 0 }}>
              <div className="entity-row-strong" style={{ fontSize: 14 }}>{s.label}</div>
              <div className="entity-sub" style={{ whiteSpace: 'normal' }}>{s.desc}</div>
            </div>
            <AgendaToggle value={vals[s.k]} onChange={v => setVals(o => ({ ...o, [s.k]: v }))} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

function RecursosSection({ sub, recursos, onSaveRecurso }) {
  const view = sub || 'mis-recursos';
  if (view === 'asignaciones')     return <AsignacionesView recursos={recursos} />;
  if (view === 'config-recursos')  return <ConfigRecursosView />;
  return <MisRecursosView recursos={recursos} onSave={onSaveRecurso} />;
}

Object.assign(window, { RecursosSection, MOCK_RECURSOS });
