// ClientesSection.jsx — CRM: lista de clientes + modal de creación/edición
// Los clientes son un store compartido; llegan por props desde AppRoot.

// ── MOCK DATA ────────────────────────────────────────────────────────────────

const MOCK_CLIENTES = [
  { id: 1, nombre: 'Valentina Rojas',  telefono: '+56 9 8123 4567', email: 'valentina.rojas@gmail.com', etiqueta: 'frecuente', visitas: 14, ultimaVisita: '2026-06-10', notas: 'Prefiere a Andrea. Alérgica a tintes con amoníaco.' },
  { id: 2, nombre: 'Carolina Pérez',   telefono: '+56 9 7654 3210', email: 'caro.perez@gmail.com',      etiqueta: 'frecuente', visitas: 9,  ultimaVisita: '2026-06-08', notas: '' },
  { id: 3, nombre: 'Sofía Herrera',    telefono: '+56 9 5544 3322', email: 'sofia.herrera@outlook.com', etiqueta: 'regular',   visitas: 4,  ultimaVisita: '2026-05-28', notas: 'Confirmar siempre por WhatsApp.' },
  { id: 4, nombre: 'Camila Fuentes',   telefono: '+56 9 4433 2211', email: 'camila.fuentes@gmail.com',  etiqueta: 'regular',   visitas: 5,  ultimaVisita: '2026-06-01', notas: '' },
  { id: 5, nombre: 'Daniela Torres',   telefono: '+56 9 3322 1100', email: 'dani.torres@gmail.com',     etiqueta: 'regular',   visitas: 3,  ultimaVisita: '2026-05-20', notas: '' },
  { id: 6, nombre: 'Isabel Castro',    telefono: '+56 9 2211 0099', email: 'isabel.castro@gmail.com',   etiqueta: 'frecuente', visitas: 11, ultimaVisita: '2026-06-12', notas: 'Le gusta agendar temprano.' },
  { id: 7, nombre: 'Fernanda Muñoz',   telefono: '+56 9 1100 9988', email: 'fer.munoz@gmail.com',       etiqueta: 'nuevo',     visitas: 1,  ultimaVisita: '2026-06-13', notas: 'Primera visita esta semana.' },
  { id: 8, nombre: 'Andrea García',    telefono: '+56 9 9988 7766', email: 'andrea.garcia@gmail.com',   etiqueta: 'nuevo',     visitas: 1,  ultimaVisita: '2026-06-14', notas: '' },
];

const CLIENTE_ETIQUETAS = [
  { v: 'nuevo',     l: 'Nuevo' },
  { v: 'regular',   l: 'Regular' },
  { v: 'frecuente', l: 'Frecuente' },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────

function iniciales(nombre) {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase();
}

// Color determinista por cliente: misma persona → mismo color en cada render.
// El color vive en clases CSS (.cliente-avatar-N) para que el modo oscuro pueda
// adaptarlo (tinte translúcido + texto claro), igual que los badges.
const AVATAR_COLOR_COUNT = 8;

function avatarColorIndex(seed) {
  const str = String(seed);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % AVATAR_COLOR_COUNT;
}

function fmtFechaCorta(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  const mm = ['', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${parseInt(d, 10)} ${mm[parseInt(m, 10)]}`;
}

function ClienteEtiquetaBadge({ etiqueta }) {
  const map = {
    nuevo:     'badge-nuevo',
    regular:   'badge-regular',
    frecuente: 'badge-frecuente',
  };
  const label = (CLIENTE_ETIQUETAS.find(e => e.v === etiqueta) || {}).l || etiqueta;
  return <span className={`badge ${map[etiqueta] || 'badge-regular'}`}>{label}</span>;
}

// ── MODAL DE CLIENTE · overlay centrado, reutilizable para crear y editar ──────

function buildClienteForm(cliente) {
  return {
    nombre:   cliente?.nombre   || '',
    telefono: cliente?.telefono || '',
    email:    cliente?.email    || '',
    etiqueta: cliente?.etiqueta || 'nuevo',
    notas:    cliente?.notas    || '',
  };
}

function ClienteModal({ mode, cliente, onClose, onSave }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = React.useState(() => buildClienteForm(cliente));

  React.useEffect(() => { setForm(buildClienteForm(cliente)); }, [mode, cliente]);

  // Cerrar con Escape + bloquear el scroll del fondo mientras el modal está abierto
  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const ok = form.nombre.trim() && form.telefono.trim();

  const save = () => {
    if (!ok) return;
    onSave({
      id: isEdit ? cliente.id : Date.now(),
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      email: form.email.trim(),
      etiqueta: form.etiqueta,
      notas: form.notas.trim(),
      visitas: isEdit ? cliente.visitas : 0,
      ultimaVisita: isEdit ? cliente.ultimaVisita : '',
    });
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? 'Editar cliente' : 'Nuevo cliente'}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <div className="modal-eyebrow">Clientes</div>
            <div className="modal-title">{isEdit ? 'Editar cliente' : 'Nuevo cliente'}</div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar">
            <Icon name="x" />
          </button>
        </div>

        <div className="modal-body">
          <div className="reserva-field">
            <label className="reserva-field-label">Nombre</label>
            <input
              type="text"
              className="reserva-input"
              placeholder="Nombre y apellido"
              value={form.nombre}
              onChange={up('nombre')}
              autoFocus
            />
          </div>

          <div className="reserva-field-grid">
            <div className="reserva-field">
              <label className="reserva-field-label">Teléfono</label>
              <input
                type="tel"
                className="reserva-input"
                placeholder="+56 9 ..."
                value={form.telefono}
                onChange={up('telefono')}
              />
            </div>
            <div className="reserva-field">
              <label className="reserva-field-label">Email <span className="reserva-field-opt">(opcional)</span></label>
              <input
                type="email"
                className="reserva-input"
                placeholder="correo@ejemplo.com"
                value={form.email}
                onChange={up('email')}
              />
            </div>
          </div>

          <div className="reserva-field">
            <label className="reserva-field-label">Etiqueta</label>
            <div className="reserva-segment reserva-segment-3">
              {CLIENTE_ETIQUETAS.map(o => (
                <button
                  key={o.v}
                  type="button"
                  className={`reserva-segment-btn${form.etiqueta === o.v ? ' active' : ''}`}
                  onClick={() => setForm(f => ({ ...f, etiqueta: o.v }))}
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
              placeholder="Preferencias, alergias, recordatorios…"
              value={form.notas}
              onChange={up('notas')}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-sm-ghost reserva-footer-btn" onClick={onClose}>Cancelar</button>
          <button className="btn-primary-sm reserva-footer-btn" disabled={!ok} onClick={save}>
            <Icon name="check" />{isEdit ? 'Guardar cambios' : 'Crear cliente'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── LISTA ─────────────────────────────────────────────────────────────────────

function ClienteRow({ cliente, onEdit }) {
  const ci = avatarColorIndex(cliente.nombre);
  return (
    <div className="cliente-row" onClick={() => onEdit(cliente)} role="button" tabIndex="0">
      <div className={`cliente-avatar cliente-avatar-${ci}`}>{iniciales(cliente.nombre)}</div>
      <div className="cliente-info">
        <div className="cliente-nombre">{cliente.nombre}</div>
        <div className="cliente-contacto">{cliente.telefono}{cliente.email ? ` · ${cliente.email}` : ''}</div>
      </div>
      <div className="cliente-stats">
        <div className="cliente-stat-visitas">{cliente.visitas} {cliente.visitas === 1 ? 'visita' : 'visitas'}</div>
        <div className="cliente-stat-ultima">Últ. {fmtFechaCorta(cliente.ultimaVisita)}</div>
      </div>
      <ClienteEtiquetaBadge etiqueta={cliente.etiqueta} />
      <button
        className="cliente-edit-btn"
        onClick={e => { e.stopPropagation(); onEdit(cliente); }}
        aria-label="Editar cliente"
      >
        <Icon name="pencil" />
      </button>
    </div>
  );
}

const SUB_META = {
  todos:      { title: 'Todos los clientes', desc: 'Tu base completa de clientes y su historial.' },
  frecuentes: { title: 'Clientes frecuentes', desc: 'Quienes más reservan en tu negocio.' },
  nuevos:     { title: 'Clientes nuevos', desc: 'Sumados recientemente a tu cartera.' },
};

function ClientesSection({ sub, clientes, onSaveCliente }) {
  const view = sub || 'todos';

  const [query, setQuery] = React.useState('');
  // null = cerrado | { mode: 'new' } | { mode: 'edit', cliente }
  const [modal, setModal] = React.useState(null);

  const openNew  = () => setModal({ mode: 'new' });
  const openEdit = (cliente) => setModal({ mode: 'edit', cliente });

  const handleSave = (cliente) => {
    onSaveCliente(cliente);
    setModal(null);
  };

  // Sub-vistas que aún no forman parte de este flujo (tras los hooks, para no romper su orden)
  if (view === 'grupos' || view === 'importar') {
    const ph = view === 'grupos'
      ? { icon: 'layers', label: 'Grupos', desc: 'Organiza tus clientes en grupos y segmentos.' }
      : { icon: 'upload', label: 'Importar', desc: 'Importa tus clientes desde un archivo o contactos.' };
    return (
      <div className="placeholder-view">
        <Icon name={ph.icon} />
        <h2>{ph.label}</h2>
        <p>{ph.desc}</p>
        <p style={{ marginTop: 4, fontSize: 12, opacity: .6 }}>Esta sección está en construcción.</p>
      </div>
    );
  }

  const meta = SUB_META[view] || SUB_META.todos;

  const filtered = clientes.filter(c => {
    if (view === 'frecuentes' && c.etiqueta !== 'frecuente') return false;
    if (view === 'nuevos' && c.etiqueta !== 'nuevo') return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return c.nombre.toLowerCase().includes(q)
      || c.telefono.toLowerCase().includes(q)
      || c.email.toLowerCase().includes(q);
  });

  return (
    <div className="clientes-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">{meta.title}</div>
          <div className="agenda-config-desc">{meta.desc}</div>
        </div>
        <button className="btn-primary-sm" onClick={openNew}>
          <Icon name="user-plus" />
          Nuevo cliente
        </button>
      </div>

      <div className="clientes-toolbar">
        <div className="clientes-search">
          <Icon name="search" />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o email…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="clientes-count">{filtered.length} {filtered.length === 1 ? 'cliente' : 'clientes'}</div>
      </div>

      <div className="cliente-list">
        {filtered.length === 0 ? (
          <div className="clientes-empty">
            <Icon name="users" />
            <span>{query.trim() ? 'Sin resultados para tu búsqueda' : 'Sin clientes en esta vista'}</span>
          </div>
        ) : (
          filtered.map(c => <ClienteRow key={c.id} cliente={c} onEdit={openEdit} />)
        )}
      </div>

      {modal && (
        <ClienteModal
          mode={modal.mode}
          cliente={modal.cliente}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

Object.assign(window, { ClientesSection, ClienteModal, MOCK_CLIENTES });
