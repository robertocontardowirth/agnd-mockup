// EquipoSection.jsx — Sección Equipo: Colaboradores, Roles y permisos, Horarios de equipo.
// Los colaboradores son un store compartido; llegan por props desde AppRoot.

// ── MOCK DATA ────────────────────────────────────────────────────────────────

const MOCK_COLABORADORES = [
  { id: 1, nombre: 'Andrea Morales', cargo: 'Estilista senior', email: 'andrea@agnd.cl', telefono: '+56 9 8888 1111', color: '#4CD5D2', servicios: ['Corte', 'Coloración', 'Brushing'], activo: true },
  { id: 2, nombre: 'Paula Reyes',    cargo: 'Manicurista',      email: 'paula@agnd.cl',  telefono: '+56 9 7777 2222', color: '#FFA69E', servicios: ['Manicure', 'Pedicure'], activo: true },
  { id: 3, nombre: 'Diego Fuentes',  cargo: 'Barbero',          email: 'diego@agnd.cl',  telefono: '+56 9 6666 3333', color: '#AA4465', servicios: ['Corte', 'Barbería'], activo: true },
  { id: 4, nombre: 'Camila Vega',    cargo: 'Recepción',        email: 'camila@agnd.cl', telefono: '+56 9 5555 4444', color: '#222A55', servicios: [], activo: false },
];

const CARGOS = ['Estilista senior', 'Estilista', 'Barbero', 'Manicurista', 'Recepción', 'Administrador'];
const SERVICIOS_EQUIPO = ['Corte', 'Brushing', 'Coloración', 'Manicure', 'Pedicure', 'Barbería'];
const COLORES_EQUIPO = ['#4CD5D2', '#FFA69E', '#AA4465', '#222A55', '#93E1D8', '#E9B44C'];

const MOCK_ROLES = [
  { id: 1, nombre: 'Administrador', descripcion: 'Control total del negocio y su configuración.', miembros: 1, permisos: { agenda: true, clientes: true, equipo: true, espacios: true, recursos: true, reportes: true, config: true } },
  { id: 2, nombre: 'Profesional',   descripcion: 'Gestiona su propia agenda y sus clientes.',     miembros: 3, permisos: { agenda: true, clientes: true, equipo: false, espacios: false, recursos: true, reportes: false, config: false } },
  { id: 3, nombre: 'Recepción',     descripcion: 'Agenda citas y administra la cartera de clientes.', miembros: 1, permisos: { agenda: true, clientes: true, equipo: false, espacios: true, recursos: false, reportes: false, config: false } },
];

const PERMISOS = [
  { k: 'agenda',   l: 'Agenda' },
  { k: 'clientes', l: 'Clientes' },
  { k: 'equipo',   l: 'Equipo' },
  { k: 'espacios', l: 'Espacios' },
  { k: 'recursos', l: 'Recursos' },
  { k: 'reportes', l: 'Reportes' },
  { k: 'config',   l: 'Configuración' },
];

const DIAS = [
  { k: 'lun', l: 'Lun' }, { k: 'mar', l: 'Mar' }, { k: 'mie', l: 'Mié' },
  { k: 'jue', l: 'Jue' }, { k: 'vie', l: 'Vie' }, { k: 'sab', l: 'Sáb' }, { k: 'dom', l: 'Dom' },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────

function initials(nombre) {
  return nombre.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

// ── MODAL DE COLABORADOR ───────────────────────────────────────────────────────

function buildColaboradorForm(c) {
  return {
    nombre:    c?.nombre   || '',
    cargo:     c?.cargo    || CARGOS[0],
    email:     c?.email    || '',
    telefono:  c?.telefono || '',
    color:     c?.color    || COLORES_EQUIPO[0],
    servicios: c?.servicios ? [...c.servicios] : [],
    activo:    c?.activo !== undefined ? c.activo : true,
  };
}

function ColaboradorModal({ mode, colaborador, onClose, onSave }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = React.useState(() => buildColaboradorForm(colaborador));
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const up = k => e => set(k, e.target.value);
  const toggleServicio = (s) => setForm(f => ({
    ...f,
    servicios: f.servicios.includes(s) ? f.servicios.filter(x => x !== s) : [...f.servicios, s],
  }));
  const ok = form.nombre.trim() && form.cargo;

  const save = () => {
    if (!ok) return;
    onSave({
      id: isEdit ? colaborador.id : Date.now(),
      nombre: form.nombre.trim(),
      cargo: form.cargo,
      email: form.email.trim(),
      telefono: form.telefono.trim(),
      color: form.color,
      servicios: form.servicios,
      activo: form.activo,
    });
  };

  const footer = (
    <React.Fragment>
      <button className="btn-sm-ghost reserva-footer-btn" onClick={onClose}>Cancelar</button>
      <button className="btn-primary-sm reserva-footer-btn" disabled={!ok} onClick={save}>
        <Icon name="check" />{isEdit ? 'Guardar cambios' : 'Crear colaborador'}
      </button>
    </React.Fragment>
  );

  return (
    <Modal eyebrow="Equipo" title={isEdit ? 'Editar colaborador' : 'Nuevo colaborador'} onClose={onClose} footer={footer}>
      <div className="reserva-field">
        <label className="reserva-field-label">Nombre</label>
        <input type="text" className="reserva-input" placeholder="Nombre y apellido" value={form.nombre} onChange={up('nombre')} autoFocus />
      </div>

      <div className="reserva-field">
        <label className="reserva-field-label">Cargo</label>
        <select className="reserva-input" value={form.cargo} onChange={up('cargo')}>
          {CARGOS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="reserva-field-grid">
        <div className="reserva-field">
          <label className="reserva-field-label">Email <span className="reserva-field-opt">(opcional)</span></label>
          <input type="email" className="reserva-input" placeholder="correo@ejemplo.com" value={form.email} onChange={up('email')} />
        </div>
        <div className="reserva-field">
          <label className="reserva-field-label">Teléfono <span className="reserva-field-opt">(opcional)</span></label>
          <input type="tel" className="reserva-input" placeholder="+56 9 ..." value={form.telefono} onChange={up('telefono')} />
        </div>
      </div>

      <div className="reserva-field">
        <label className="reserva-field-label">Color de agenda</label>
        <div className="color-swatches">
          {COLORES_EQUIPO.map(c => (
            <button
              key={c}
              type="button"
              className={`color-swatch${form.color === c ? ' active' : ''}`}
              style={{ background: c }}
              onClick={() => set('color', c)}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="reserva-field">
        <label className="reserva-field-label">Servicios que ofrece</label>
        <div className="chip-select">
          {SERVICIOS_EQUIPO.map(s => (
            <button
              key={s}
              type="button"
              className={`chip-select-btn${form.servicios.includes(s) ? ' active' : ''}`}
              onClick={() => toggleServicio(s)}
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

// ── COLABORADORES ──────────────────────────────────────────────────────────────

function ColaboradorCard({ colaborador, onEdit }) {
  const c = colaborador;
  return (
    <div className={`entity-card${c.activo ? '' : ' is-inactive'}`}>
      <div className="entity-card-head">
        <span className="entity-avatar" style={{ background: c.color }}>{initials(c.nombre)}</span>
        <div className="entity-head-text">
          <div className="entity-title">{c.nombre}</div>
          <div className="entity-sub">{c.cargo}</div>
        </div>
        <button className="entity-edit-btn" onClick={() => onEdit(c)} aria-label="Editar colaborador"><Icon name="pencil" /></button>
      </div>

      {c.servicios.length > 0 && (
        <div className="chip-row">
          {c.servicios.map(s => <span key={s} className="chip">{s}</span>)}
        </div>
      )}

      <div className="entity-card-foot">
        <span className={`badge ${c.activo ? 'badge-activo' : 'badge-inactivo'}`}>{c.activo ? 'Activo' : 'Inactivo'}</span>
        {c.email && <span className="entity-sub">{c.email}</span>}
      </div>
    </div>
  );
}

function ColaboradoresView({ colaboradores, onSave }) {
  const [query, setQuery] = React.useState('');
  const [modal, setModal] = React.useState(null);

  const handleSave = (c) => { onSave(c); setModal(null); };

  const q = query.trim().toLowerCase();
  const filtered = colaboradores.filter(c =>
    !q || c.nombre.toLowerCase().includes(q) || c.cargo.toLowerCase().includes(q));

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Colaboradores</div>
          <div className="agenda-config-desc">Tu equipo y los servicios que ofrece cada persona.</div>
        </div>
        <button className="btn-primary-sm" onClick={() => setModal({ mode: 'new' })}>
          <Icon name="user-plus" />Nuevo colaborador
        </button>
      </div>

      <div className="mgmt-toolbar">
        <div className="mgmt-search">
          <Icon name="search" />
          <input placeholder="Buscar por nombre o cargo…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="clientes-empty"><Icon name="users" /><span>Sin colaboradores</span></div>
      ) : (
        <div className="cards-grid">
          {filtered.map(c => (
            <ColaboradorCard key={c.id} colaborador={c} onEdit={(col) => setModal({ mode: 'edit', colaborador: col })} />
          ))}
        </div>
      )}

      {modal && (
        <ColaboradorModal mode={modal.mode} colaborador={modal.colaborador} onClose={() => setModal(null)} onSave={handleSave} />
      )}
    </div>
  );
}

// ── ROLES Y PERMISOS ────────────────────────────────────────────────────────

function RolesView() {
  const [roles, setRoles] = React.useState(MOCK_ROLES);

  const togglePerm = (roleId, permK) => setRoles(rs =>
    rs.map(r => r.id === roleId ? { ...r, permisos: { ...r.permisos, [permK]: !r.permisos[permK] } } : r));

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Roles y permisos</div>
          <div className="agenda-config-desc">Qué puede ver y hacer cada tipo de usuario.</div>
        </div>
      </div>

      <div className="cards-grid">
        {roles.map(r => (
          <div key={r.id} className="entity-card">
            <div className="entity-card-head">
              <span className="entity-icon"><Icon name="shield" /></span>
              <div className="entity-head-text">
                <div className="entity-title">{r.nombre}</div>
                <div className="entity-sub">{r.miembros} {r.miembros === 1 ? 'miembro' : 'miembros'}</div>
              </div>
            </div>
            <div className="entity-sub" style={{ whiteSpace: 'normal' }}>{r.descripcion}</div>
            <div className="perm-grid">
              {PERMISOS.map(p => (
                <div key={p.k} className="perm-item">
                  <span>{p.l}</span>
                  <AgendaToggle value={!!r.permisos[p.k]} onChange={() => togglePerm(r.id, p.k)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── HORARIOS DE EQUIPO ────────────────────────────────────────────────────────

function HorariosEquipoView({ colaboradores }) {
  const [dias, setDias] = React.useState(() => {
    const map = {};
    colaboradores.forEach(c => { map[c.id] = c.activo ? ['lun', 'mar', 'mie', 'jue', 'vie'] : []; });
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
          <div className="agenda-config-title">Horarios de equipo</div>
          <div className="agenda-config-desc">Los días en que cada colaborador está disponible para reservas.</div>
        </div>
      </div>

      <div className="agenda-table">
        {colaboradores.map(c => (
          <div key={c.id} className="agenda-table-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 180 }}>
              <span className="entity-avatar" style={{ background: c.color, width: 32, height: 32, fontSize: 12 }}>{initials(c.nombre)}</span>
              <div>
                <div className="entity-row-strong" style={{ fontSize: 14 }}>{c.nombre}</div>
                <div className="entity-sub">{c.cargo}</div>
              </div>
            </div>
            <div className="day-pills">
              {DIAS.map(d => {
                const on = (dias[c.id] || []).includes(d.k);
                return (
                  <button key={d.k} type="button" className={`day-pill${on ? ' on' : ''}`} onClick={() => toggle(c.id, d.k)}>
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

// ── ROOT ──────────────────────────────────────────────────────────────────────

function EquipoSection({ sub, colaboradores, onSaveColaborador }) {
  const view = sub || 'colaboradores';
  if (view === 'roles')           return <RolesView />;
  if (view === 'horarios-equipo') return <HorariosEquipoView colaboradores={colaboradores} />;
  return <ColaboradoresView colaboradores={colaboradores} onSave={onSaveColaborador} />;
}

Object.assign(window, { EquipoSection, MOCK_COLABORADORES });
