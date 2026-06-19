// EspaciosSection.jsx — Sección Espacios: Mis espacios, Disponibilidad, Configuración.
// Los espacios son un store compartido; llegan por props desde AppRoot.

// ── MOCK DATA ────────────────────────────────────────────────────────────────

const MOCK_ESPACIOS = [
  { id: 1, nombre: 'Box 1',                 tipo: 'Box',       capacidad: 1, equipamiento: ['Lavacabezas', 'Espejo', 'Silla hidráulica'], activo: true },
  { id: 2, nombre: 'Sala de color',         tipo: 'Sala',      capacidad: 3, equipamiento: ['Espejo', 'Vaporizador'], activo: true },
  { id: 3, nombre: 'Estación de manicure',  tipo: 'Estación',  capacidad: 2, equipamiento: ['Mesa manicure'], activo: true },
  { id: 4, nombre: 'Box 2',                 tipo: 'Box',       capacidad: 1, equipamiento: ['Lavacabezas', 'Espejo'], activo: false },
];

const ESPACIO_TIPOS = ['Box', 'Sala', 'Estación'];
const ESPACIO_EQUIPAMIENTO = ['Lavacabezas', 'Espejo', 'Silla hidráulica', 'Mesa manicure', 'Vaporizador', 'Secador'];
const ESPACIO_TIPO_ICON = { Box: 'box', Sala: 'door-open', 'Estación': 'armchair' };

const ESPACIO_DIAS = [
  { k: 'lun', l: 'Lun' }, { k: 'mar', l: 'Mar' }, { k: 'mie', l: 'Mié' },
  { k: 'jue', l: 'Jue' }, { k: 'vie', l: 'Vie' }, { k: 'sab', l: 'Sáb' }, { k: 'dom', l: 'Dom' },
];

// ── MODAL DE ESPACIO ───────────────────────────────────────────────────────────

function buildEspacioForm(e) {
  return {
    nombre:       e?.nombre    || '',
    tipo:         e?.tipo      || ESPACIO_TIPOS[0],
    capacidad:    e?.capacidad || 1,
    equipamiento: e?.equipamiento ? [...e.equipamiento] : [],
    activo:       e?.activo !== undefined ? e.activo : true,
  };
}

function EspacioModal({ mode, espacio, onClose, onSave }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = React.useState(() => buildEspacioForm(espacio));
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const up = k => e => set(k, e.target.value);
  const toggleEquip = (s) => setForm(f => ({
    ...f,
    equipamiento: f.equipamiento.includes(s) ? f.equipamiento.filter(x => x !== s) : [...f.equipamiento, s],
  }));
  const ok = form.nombre.trim();

  const save = () => {
    if (!ok) return;
    onSave({
      id: isEdit ? espacio.id : Date.now(),
      nombre: form.nombre.trim(),
      tipo: form.tipo,
      capacidad: parseInt(form.capacidad, 10) || 1,
      equipamiento: form.equipamiento,
      activo: form.activo,
    });
  };

  const footer = (
    <React.Fragment>
      <button className="btn-sm-ghost reserva-footer-btn" onClick={onClose}>Cancelar</button>
      <button className="btn-primary-sm reserva-footer-btn" disabled={!ok} onClick={save}>
        <Icon name="check" />{isEdit ? 'Guardar cambios' : 'Crear espacio'}
      </button>
    </React.Fragment>
  );

  return (
    <Modal eyebrow="Espacios" title={isEdit ? 'Editar espacio' : 'Nuevo espacio'} onClose={onClose} footer={footer}>
      <div className="reserva-field">
        <label className="reserva-field-label">Nombre</label>
        <input type="text" className="reserva-input" placeholder="Ej: Box 1" value={form.nombre} onChange={up('nombre')} autoFocus />
      </div>

      <div className="reserva-field-grid">
        <div className="reserva-field">
          <label className="reserva-field-label">Tipo</label>
          <select className="reserva-input" value={form.tipo} onChange={up('tipo')}>
            {ESPACIO_TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="reserva-field">
          <label className="reserva-field-label">Capacidad</label>
          <select className="reserva-input" value={form.capacidad} onChange={up('capacidad')}>
            {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>)}
          </select>
        </div>
      </div>

      <div className="reserva-field">
        <label className="reserva-field-label">Equipamiento</label>
        <div className="chip-select">
          {ESPACIO_EQUIPAMIENTO.map(s => (
            <button
              key={s}
              type="button"
              className={`chip-select-btn${form.equipamiento.includes(s) ? ' active' : ''}`}
              onClick={() => toggleEquip(s)}
            >
              {s}
            </button>
          ))}
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

// ── MIS ESPACIOS ────────────────────────────────────────────────────────────

function EspacioCard({ espacio, onEdit }) {
  const e = espacio;
  return (
    <div className={`entity-card${e.activo ? '' : ' is-inactive'}`}>
      <div className="entity-card-head">
        <span className="entity-icon"><Icon name={ESPACIO_TIPO_ICON[e.tipo] || 'box'} /></span>
        <div className="entity-head-text">
          <div className="entity-title">{e.nombre}</div>
          <div className="entity-sub">{e.tipo} · {e.capacidad} {e.capacidad === 1 ? 'persona' : 'personas'}</div>
        </div>
        <button className="entity-edit-btn" onClick={() => onEdit(e)} aria-label="Editar espacio"><Icon name="pencil" /></button>
      </div>

      {e.equipamiento.length > 0 && (
        <div className="chip-row">
          {e.equipamiento.map(s => <span key={s} className="chip">{s}</span>)}
        </div>
      )}

      <div className="entity-card-foot">
        <span className={`badge ${e.activo ? 'badge-activo' : 'badge-inactivo'}`}>{e.activo ? 'Activo' : 'Inactivo'}</span>
      </div>
    </div>
  );
}

function MisEspaciosView({ espacios, onSave }) {
  const [query, setQuery] = React.useState('');
  const [modal, setModal] = React.useState(null);

  const handleSave = (e) => { onSave(e); setModal(null); };

  const q = query.trim().toLowerCase();
  const filtered = espacios.filter(e =>
    !q || e.nombre.toLowerCase().includes(q) || e.tipo.toLowerCase().includes(q));

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Mis espacios</div>
          <div className="agenda-config-desc">Salas, boxes y estaciones físicas donde atiendes.</div>
        </div>
        <button className="btn-primary-sm" onClick={() => setModal({ mode: 'new' })}>
          <Icon name="plus" />Nuevo espacio
        </button>
      </div>

      <div className="mgmt-toolbar">
        <div className="mgmt-search">
          <Icon name="search" />
          <input placeholder="Buscar por nombre o tipo…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="clientes-empty"><Icon name="building-2" /><span>Sin espacios</span></div>
      ) : (
        <div className="cards-grid">
          {filtered.map(e => (
            <EspacioCard key={e.id} espacio={e} onEdit={(esp) => setModal({ mode: 'edit', espacio: esp })} />
          ))}
        </div>
      )}

      {modal && (
        <EspacioModal mode={modal.mode} espacio={modal.espacio} onClose={() => setModal(null)} onSave={handleSave} />
      )}
    </div>
  );
}

// ── DISPONIBILIDAD ────────────────────────────────────────────────────────────

function DisponibilidadEspView({ espacios }) {
  const [dias, setDias] = React.useState(() => {
    const map = {};
    espacios.forEach(e => { map[e.id] = e.activo ? ['lun', 'mar', 'mie', 'jue', 'vie', 'sab'] : []; });
    return map;
  });

  const toggle = (id, k) => setDias(m => {
    const cur = m[id] || [];
    return { ...m, [id]: cur.includes(k) ? cur.filter(x => x !== k) : [...cur, k] };
  });

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Disponibilidad de espacios</div>
          <div className="agenda-config-desc">Los días en que cada espacio puede recibir reservas.</div>
        </div>
      </div>

      <div className="agenda-table">
        {espacios.map(e => (
          <div key={e.id} className="agenda-table-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 180 }}>
              <span className="entity-icon" style={{ width: 32, height: 32 }}><Icon name={ESPACIO_TIPO_ICON[e.tipo] || 'box'} /></span>
              <div>
                <div className="entity-row-strong" style={{ fontSize: 14 }}>{e.nombre}</div>
                <div className="entity-sub">{e.tipo}</div>
              </div>
            </div>
            <div className="day-pills">
              {ESPACIO_DIAS.map(d => {
                const on = (dias[e.id] || []).includes(d.k);
                return (
                  <button key={d.k} type="button" className={`day-pill${on ? ' on' : ''}`} onClick={() => toggle(e.id, d.k)}>
                    {d.l}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CONFIGURACIÓN ─────────────────────────────────────────────────────────────

const ESPACIO_AJUSTES = [
  { k: 'requerir',    label: 'Requerir espacio al agendar',         desc: 'Cada cita debe tener un espacio asignado para confirmarse.' },
  { k: 'simultaneas', label: 'Permitir reservas simultáneas',       desc: 'Un mismo espacio puede ocuparse por varias citas según su capacidad.' },
  { k: 'inactivos',   label: 'Ocultar espacios inactivos',          desc: 'Los espacios marcados como inactivos no aparecen al agendar.' },
];

function ConfigEspaciosView() {
  const [vals, setVals] = React.useState({ requerir: true, simultaneas: false, inactivos: true });

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Configuración de espacios</div>
          <div className="agenda-config-desc">Reglas de cómo se asignan y reservan tus espacios.</div>
        </div>
      </div>

      <div className="agenda-table">
        {ESPACIO_AJUSTES.map(s => (
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

function EspaciosSection({ sub, espacios, onSaveEspacio }) {
  const view = sub || 'mis-espacios';
  if (view === 'disponibilidad-esp') return <DisponibilidadEspView espacios={espacios} />;
  if (view === 'config-espacios')    return <ConfigEspaciosView />;
  return <MisEspaciosView espacios={espacios} onSave={onSaveEspacio} />;
}

Object.assign(window, { EspaciosSection, MOCK_ESPACIOS });
