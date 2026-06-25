// ServiciosSection.jsx — Sección Servicios: catálogo de servicios del negocio.
// Cada servicio se asocia a un colaborador (profesional) y tiene un precio base.
// Los servicios son un store compartido; llegan por props desde AppRoot.
// El catálogo (SERVICIO_CATEGORIAS, SERVICIO_CAT_ICON, MOCK_SERVICIOS) se define en
// ServiciosCatalog.jsx —fuente única compartida con la página pública de reservas—.
// MOCK_COLABORADORES se define en EquipoSection.jsx (carga antes que este script).

// ── HELPERS ──────────────────────────────────────────────────────────────────

function precioCLP(n) {
  return '$' + Number(n || 0).toLocaleString('es-CL');
}

function colaboradorById(id) {
  const list = window.MOCK_COLABORADORES || [];
  return list.find(c => c.id === id) || null;
}

function svcInitials(nombre) {
  return (nombre || '').split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

// ── MODAL DE SERVICIO ──────────────────────────────────────────────────────────

function buildServicioForm(s, colaboradores) {
  const firstCol = colaboradores[0] ? colaboradores[0].id : null;
  return {
    nombre:        s?.nombre        || '',
    categoria:     s?.categoria     || SERVICIO_CATEGORIAS[0],
    colaboradorId: s?.colaboradorId ?? firstCol,
    duracion:      s?.duracion      || 45,
    precio:        s?.precio        ?? '',
    activo:        s?.activo !== undefined ? s.activo : true,
  };
}

function ServicioModal({ mode, servicio, colaboradores, onClose, onSave }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = React.useState(() => buildServicioForm(servicio, colaboradores));
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const up = k => e => set(k, e.target.value);
  const ok = form.nombre.trim() && form.colaboradorId != null && Number(form.precio) > 0 && Number(form.duracion) > 0;

  const save = () => {
    if (!ok) return;
    onSave({
      id: isEdit ? servicio.id : Date.now(),
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      colaboradorId: Number(form.colaboradorId),
      duracion: parseInt(form.duracion, 10) || 45,
      precio: parseInt(form.precio, 10) || 0,
      activo: form.activo,
    });
  };

  const footer = (
    <React.Fragment>
      <button className="btn-sm-ghost reserva-footer-btn" onClick={onClose}>Cancelar</button>
      <button className="btn-primary-sm reserva-footer-btn" disabled={!ok} onClick={save}>
        <Icon name="check" />{isEdit ? 'Guardar cambios' : 'Crear servicio'}
      </button>
    </React.Fragment>
  );

  return (
    <Modal eyebrow="Servicios" title={isEdit ? 'Editar servicio' : 'Nuevo servicio'} onClose={onClose} footer={footer}>
      <div className="reserva-field">
        <label className="reserva-field-label">Nombre del servicio</label>
        <input type="text" className="reserva-input" placeholder="Ej: Corte + Brushing" value={form.nombre} onChange={up('nombre')} autoFocus />
      </div>

      <div className="reserva-field">
        <label className="reserva-field-label">Profesional a cargo</label>
        <select className="reserva-input" value={form.colaboradorId ?? ''} onChange={up('colaboradorId')}>
          {colaboradores.length === 0 && <option value="">Sin colaboradores</option>}
          {colaboradores.map(c => <option key={c.id} value={c.id}>{c.nombre} · {c.cargo}</option>)}
        </select>
      </div>

      <div className="reserva-field-grid">
        <div className="reserva-field">
          <label className="reserva-field-label">Categoría</label>
          <select className="reserva-input" value={form.categoria} onChange={up('categoria')}>
            {SERVICIO_CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="reserva-field">
          <label className="reserva-field-label">Duración (min)</label>
          <select className="reserva-input" value={form.duracion} onChange={up('duracion')}>
            {[15, 30, 45, 60, 75, 90, 120].map(m => <option key={m} value={m}>{m} min</option>)}
          </select>
        </div>
      </div>

      <div className="reserva-field">
        <label className="reserva-field-label">Precio base</label>
        <div className="input-prefix">
          <span className="input-prefix-symbol">$</span>
          <input type="number" min="0" step="500" className="reserva-input" placeholder="0" value={form.precio} onChange={up('precio')} />
        </div>
      </div>

      <div className="reserva-field">
        <label className="reserva-field-label">Estado</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AgendaToggle value={form.activo} onChange={v => set('activo', v)} />
          <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{form.activo ? 'Disponible para reservar' : 'No disponible'}</span>
        </div>
      </div>
    </Modal>
  );
}

// ── TABLA DE SERVICIOS ─────────────────────────────────────────────────────────

function ServicioRow({ servicio, onEdit }) {
  const s = servicio;
  const col = colaboradorById(s.colaboradorId);
  return (
    <div className={`servicios-row${s.activo ? '' : ' is-inactive'}`} onClick={() => onEdit(s)}>
      <div className="servicios-cell-name">
        <span className="servicio-cat-icon"><Icon name={SERVICIO_CAT_ICON[s.categoria] || 'tag'} /></span>
        <div style={{ minWidth: 0 }}>
          <div className="entity-row-strong">{s.nombre}</div>
          <div className="entity-sub">{s.categoria}</div>
        </div>
      </div>
      <div className="servicios-cell-pro">
        {col ? (
          <React.Fragment>
            <span className="servicio-pro-dot" style={{ background: col.color }}>{svcInitials(col.nombre)}</span>
            <span className="servicio-pro-name">{col.nombre}</span>
          </React.Fragment>
        ) : <span className="servicio-pro-name" style={{ color: 'var(--fg-3)' }}>Sin asignar</span>}
      </div>
      <div className="servicios-cell-dur"><Icon name="clock" />{s.duracion} min</div>
      <div className="servicios-cell-precio">{precioCLP(s.precio)}</div>
      <div className="servicios-cell-estado">
        <span className={`badge ${s.activo ? 'badge-activo' : 'badge-inactivo'}`}>{s.activo ? 'Activo' : 'Inactivo'}</span>
      </div>
      <button className="entity-edit-btn" onClick={(e) => { e.stopPropagation(); onEdit(s); }} aria-label="Editar servicio">
        <Icon name="pencil" />
      </button>
    </div>
  );
}

function ServiciosTodosView({ servicios, onSave }) {
  const [query, setQuery] = React.useState('');
  const [cat, setCat] = React.useState('todas');
  const [modal, setModal] = React.useState(null);
  const colaboradores = (window.MOCK_COLABORADORES || []).filter(c => c.activo !== false);

  const handleSave = (s) => { onSave(s); setModal(null); };

  const q = query.trim().toLowerCase();
  const filtered = servicios.filter(s => {
    if (cat !== 'todas' && s.categoria !== cat) return false;
    if (!q) return true;
    const col = colaboradorById(s.colaboradorId);
    return s.nombre.toLowerCase().includes(q)
      || s.categoria.toLowerCase().includes(q)
      || (col && col.nombre.toLowerCase().includes(q));
  });

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Servicios</div>
          <div className="agenda-config-desc">Tu catálogo: cada servicio con su profesional y precio base.</div>
        </div>
        <button className="btn-primary-sm" onClick={() => setModal({ mode: 'new' })}>
          <Icon name="plus" />Nuevo servicio
        </button>
      </div>

      <div className="mgmt-toolbar">
        <div className="mgmt-search">
          <Icon name="search" />
          <input placeholder="Buscar por servicio, categoría o profesional…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="servicios-cat-filter">
          <button className={`chip-filter${cat === 'todas' ? ' active' : ''}`} onClick={() => setCat('todas')}>Todas</button>
          {SERVICIO_CATEGORIAS.map(c => (
            <button key={c} className={`chip-filter${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div className="servicios-table">
        <div className="servicios-head">
          <div className="servicios-cell-name">Servicio</div>
          <div className="servicios-cell-pro">Profesional</div>
          <div className="servicios-cell-dur">Duración</div>
          <div className="servicios-cell-precio">Precio base</div>
          <div className="servicios-cell-estado">Estado</div>
          <div className="servicios-cell-edit" />
        </div>
        {filtered.length === 0 ? (
          <div className="clientes-empty"><Icon name="tag" /><span>Sin servicios</span></div>
        ) : filtered.map(s => (
          <ServicioRow key={s.id} servicio={s} onEdit={(svc) => setModal({ mode: 'edit', servicio: svc })} />
        ))}
      </div>

      {modal && (
        <ServicioModal
          mode={modal.mode}
          servicio={modal.servicio}
          colaboradores={colaboradores}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

// ── POR CATEGORÍA ──────────────────────────────────────────────────────────────

function ServiciosCategoriasView({ servicios }) {
  const grupos = SERVICIO_CATEGORIAS.map(cat => {
    const items = servicios.filter(s => s.categoria === cat);
    const activos = items.filter(s => s.activo);
    const precios = activos.map(s => s.precio);
    return {
      cat,
      total: items.length,
      activos: activos.length,
      desde: precios.length ? Math.min(...precios) : null,
    };
  }).filter(g => g.total > 0);

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Por categoría</div>
          <div className="agenda-config-desc">Cómo se distribuye tu catálogo de servicios.</div>
        </div>
      </div>

      <div className="cards-grid">
        {grupos.map(g => (
          <div key={g.cat} className="entity-card">
            <div className="entity-card-head">
              <span className="entity-icon"><Icon name={SERVICIO_CAT_ICON[g.cat] || 'tag'} /></span>
              <div className="entity-head-text">
                <div className="entity-title">{g.cat}</div>
                <div className="entity-sub">{g.activos} de {g.total} activos</div>
              </div>
            </div>
            <div className="entity-meta-row">
              <Icon name="tag" />
              <span>{g.desde != null ? `Desde ${precioCLP(g.desde)}` : 'Sin precio'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

function ServiciosSection({ sub, servicios, onSaveServicio }) {
  const view = sub || 'todos';
  if (view === 'categorias') return <ServiciosCategoriasView servicios={servicios} />;
  return <ServiciosTodosView servicios={servicios} onSave={onSaveServicio} />;
}

Object.assign(window, { ServiciosSection });
