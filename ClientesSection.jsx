// ClientesSection.jsx — CRM: lista de clientes + modal de creación/edición
// Los clientes son un store compartido; llegan por props desde AppRoot.

// ── MOCK DATA ────────────────────────────────────────────────────────────────

const MOCK_CLIENTES = [
  { id: 1, nombre: 'Valentina Rojas',  telefono: '+56 9 8123 4567', email: 'valentina.rojas@gmail.com', direccion: 'Av. Providencia 1234, depto 56', region: 'Metropolitana de Santiago', comuna: 'Providencia', etiqueta: 'frecuente', visitas: 14, ultimaVisita: '2026-06-10', notas: 'Prefiere a Andrea. Alérgica a tintes con amoníaco.' },
  { id: 2, nombre: 'Carolina Pérez',   telefono: '+56 9 7654 3210', email: 'caro.perez@gmail.com',      etiqueta: 'frecuente', visitas: 9,  ultimaVisita: '2026-06-08', notas: '' },
  { id: 3, nombre: 'Sofía Herrera',    telefono: '+56 9 5544 3322', email: 'sofia.herrera@outlook.com', etiqueta: 'regular',   visitas: 4,  ultimaVisita: '2026-05-28', notas: 'Confirmar siempre por WhatsApp.' },
  { id: 4, nombre: 'Camila Fuentes',   telefono: '+56 9 4433 2211', email: 'camila.fuentes@gmail.com',  etiqueta: 'regular',   visitas: 5,  ultimaVisita: '2026-06-01', notas: '' },
  { id: 5, nombre: 'Daniela Torres',   telefono: '+56 9 3322 1100', email: 'dani.torres@gmail.com',     etiqueta: 'regular',   visitas: 3,  ultimaVisita: '2026-05-20', notas: '' },
  { id: 6, nombre: 'Isabel Castro',    telefono: '+56 9 2211 0099', email: 'isabel.castro@gmail.com',   direccion: 'Calle Valparaíso 480', region: 'Valparaíso', comuna: 'Viña del Mar', etiqueta: 'frecuente', visitas: 11, ultimaVisita: '2026-06-12', notas: 'Le gusta agendar temprano.' },
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
    nombre:    cliente?.nombre    || '',
    telefono:  cliente?.telefono  || '',
    email:     cliente?.email     || '',
    direccion: cliente?.direccion || '',
    region:    cliente?.region    || '',
    comuna:    cliente?.comuna    || '',
    etiqueta:  cliente?.etiqueta  || 'nuevo',
    notas:     cliente?.notas     || '',
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
      direccion: form.direccion.trim(),
      region: form.region,
      comuna: form.comuna,
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
            <label className="reserva-field-label">Dirección <span className="reserva-field-opt">(opcional)</span></label>
            <input
              type="text"
              className="reserva-input"
              placeholder="Calle y número, depto…"
              value={form.direccion}
              onChange={up('direccion')}
            />
          </div>

          <div className="reserva-field-grid">
            <div className="reserva-field">
              <label className="reserva-field-label">Región <span className="reserva-field-opt">(opcional)</span></label>
              <select
                className="reserva-input"
                value={form.region}
                onChange={e => setForm(f => ({ ...f, region: e.target.value, comuna: '' }))}
              >
                <option value="">Selecciona región…</option>
                {(window.CHILE_REGIONES || []).map(r => (
                  <option key={r.region} value={r.region}>{r.region}</option>
                ))}
              </select>
            </div>
            <div className="reserva-field">
              <label className="reserva-field-label">Comuna <span className="reserva-field-opt">(opcional)</span></label>
              <select
                className="reserva-input"
                value={form.comuna}
                disabled={!form.region}
                onChange={up('comuna')}
              >
                <option value="">{form.region ? 'Selecciona comuna…' : 'Elige región primero'}</option>
                {comunasDeRegion(form.region).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
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

// ── GRUPOS ──────────────────────────────────────────────────────────────────

const GRUPO_COLORS = ['#4CD5D2', '#E8739A', '#AA4465', '#FF8A65', '#6C8AE4', '#5BBF6A', '#F2B705', '#9B7EDE'];

const MOCK_GRUPOS = [
  { id: 1, nombre: 'VIP', color: '#E8739A', descripcion: 'Clientes preferentes con atención prioritaria.', clienteIds: [1, 6] },
  { id: 2, nombre: 'Coloración', color: '#9B7EDE', descripcion: 'Se atienden coloración de forma periódica.', clienteIds: [2, 6] },
  { id: 3, nombre: 'Por recuperar', color: '#FF8A65', descripcion: 'Sin visitas hace más de 2 meses.', clienteIds: [5] },
];

function buildGrupoForm(g) {
  return {
    nombre:      g?.nombre      || '',
    color:       g?.color       || GRUPO_COLORS[0],
    descripcion: g?.descripcion || '',
    clienteIds:  g?.clienteIds ? [...g.clienteIds] : [],
  };
}

function ClienteGrupoModal({ mode, grupo, clientes, onClose, onSave }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = React.useState(() => buildGrupoForm(grupo));
  const [q, setQ] = React.useState('');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleMember = id => setForm(f => ({
    ...f,
    clienteIds: f.clienteIds.includes(id) ? f.clienteIds.filter(x => x !== id) : [...f.clienteIds, id],
  }));
  const ok = form.nombre.trim();

  const save = () => {
    if (!ok) return;
    onSave({
      id: isEdit ? grupo.id : Date.now(),
      nombre: form.nombre.trim(),
      color: form.color,
      descripcion: form.descripcion.trim(),
      clienteIds: form.clienteIds,
    });
  };

  const footer = (
    <React.Fragment>
      <button className="btn-sm-ghost reserva-footer-btn" onClick={onClose}>Cancelar</button>
      <button className="btn-primary-sm reserva-footer-btn" disabled={!ok} onClick={save}>
        <Icon name="check" />{isEdit ? 'Guardar cambios' : 'Crear grupo'}
      </button>
    </React.Fragment>
  );

  const ql = q.trim().toLowerCase();
  const lista = clientes.filter(c => !ql || c.nombre.toLowerCase().includes(ql));

  return (
    <Modal eyebrow="Clientes" title={isEdit ? 'Editar grupo' : 'Nuevo grupo'} onClose={onClose} footer={footer}>
      <div className="reserva-field">
        <label className="reserva-field-label">Nombre del grupo</label>
        <input type="text" className="reserva-input" placeholder="Ej: VIP, Coloración…" value={form.nombre} onChange={e => set('nombre', e.target.value)} autoFocus />
      </div>

      <div className="reserva-field">
        <label className="reserva-field-label">Color</label>
        <div className="grupo-color-swatches">
          {GRUPO_COLORS.map(col => (
            <button
              key={col}
              type="button"
              className={`grupo-color-swatch${form.color === col ? ' is-active' : ''}`}
              style={{ background: col }}
              onClick={() => set('color', col)}
              aria-label={`Color ${col}`}
            >
              {form.color === col && <Icon name="check" />}
            </button>
          ))}
        </div>
      </div>

      <div className="reserva-field">
        <label className="reserva-field-label">Descripción <span className="reserva-field-opt">(opcional)</span></label>
        <input type="text" className="reserva-input" placeholder="¿Para qué usas este grupo?" value={form.descripcion} onChange={e => set('descripcion', e.target.value)} />
      </div>

      <div className="reserva-field">
        <label className="reserva-field-label">Miembros <span className="reserva-field-opt">({form.clienteIds.length} seleccionados)</span></label>
        <div className="grupo-member-search">
          <Icon name="search" />
          <input type="text" placeholder="Buscar cliente…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <div className="grupo-member-list">
          {lista.length === 0 ? (
            <div className="grupo-member-empty">Sin resultados</div>
          ) : lista.map(c => {
            const on = form.clienteIds.includes(c.id);
            return (
              <button key={c.id} type="button" className={`grupo-member${on ? ' on' : ''}`} onClick={() => toggleMember(c.id)}>
                <span className={`cliente-avatar cliente-avatar-${avatarColorIndex(c.nombre)} grupo-member-avatar`}>{iniciales(c.nombre)}</span>
                <span className="grupo-member-name">{c.nombre}</span>
                <span className="grupo-member-check">{on && <Icon name="check" />}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

function GrupoCard({ grupo, clientes, onEdit, onDelete }) {
  const miembros = clientes.filter(c => grupo.clienteIds.includes(c.id));
  const preview = miembros.slice(0, 4);
  const extra = miembros.length - preview.length;
  return (
    <div className="grupo-card">
      <span className="grupo-card-bar" style={{ background: grupo.color }} />
      <div className="grupo-card-body">
        <div className="grupo-card-head">
          <span className="grupo-dot" style={{ background: grupo.color }}><Icon name="users" /></span>
          <div className="grupo-head-text">
            <div className="grupo-title">{grupo.nombre}</div>
            <div className="grupo-count">{miembros.length} {miembros.length === 1 ? 'cliente' : 'clientes'}</div>
          </div>
          <div className="grupo-actions">
            <button className="agenda-action-btn edit" onClick={() => onEdit(grupo)} aria-label="Editar grupo"><Icon name="pencil" /></button>
            <button className="agenda-action-btn" onClick={() => onDelete(grupo)} aria-label="Eliminar grupo"><Icon name="trash-2" /></button>
          </div>
        </div>
        {grupo.descripcion && <div className="grupo-desc">{grupo.descripcion}</div>}
        <div className="grupo-avatars">
          {miembros.length === 0 ? (
            <span className="grupo-empty-members">Sin clientes aún</span>
          ) : (
            <React.Fragment>
              {preview.map(c => (
                <span key={c.id} className={`cliente-avatar cliente-avatar-${avatarColorIndex(c.nombre)} grupo-avatar`}>{iniciales(c.nombre)}</span>
              ))}
              {extra > 0 && <span className="grupo-avatar grupo-avatar-more">+{extra}</span>}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

function ClientesGruposView({ clientes }) {
  const [grupos, setGrupos] = React.useState(MOCK_GRUPOS);
  const [modal, setModal] = React.useState(null);          // null | { mode, grupo }
  const [confirmDel, setConfirmDel] = React.useState(null); // grupo a eliminar

  const handleSave = (g) => {
    setGrupos(p => (p.some(x => x.id === g.id) ? p.map(x => (x.id === g.id ? g : x)) : [...p, g]));
    setModal(null);
  };
  const handleDelete = () => {
    if (confirmDel) setGrupos(p => p.filter(x => x.id !== confirmDel.id));
    setConfirmDel(null);
  };

  return (
    <div className="clientes-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Grupos</div>
          <div className="agenda-config-desc">Organiza tus clientes en grupos y segmentos para campañas y recordatorios.</div>
        </div>
        <button className="btn-primary-sm" onClick={() => setModal({ mode: 'new' })}>
          <Icon name="plus" />Nuevo grupo
        </button>
      </div>

      {grupos.length === 0 ? (
        <div className="clientes-empty"><Icon name="layers" /><span>Aún no tienes grupos. Crea el primero.</span></div>
      ) : (
        <div className="cards-grid">
          {grupos.map(g => (
            <GrupoCard key={g.id} grupo={g} clientes={clientes} onEdit={(gr) => setModal({ mode: 'edit', grupo: gr })} onDelete={setConfirmDel} />
          ))}
        </div>
      )}

      {modal && (
        <ClienteGrupoModal
          mode={modal.mode}
          grupo={modal.grupo}
          clientes={clientes}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {confirmDel && (
        <ConfirmDialog
          title="Eliminar grupo"
          message={`¿Eliminar el grupo “${confirmDel.nombre}”? Los clientes no se borran, solo se deshace la agrupación.`}
          confirmLabel="Eliminar grupo"
          danger
          onConfirm={handleDelete}
          onClose={() => setConfirmDel(null)}
        />
      )}
    </div>
  );
}

// ── IMPORTAR ────────────────────────────────────────────────────────────────

// Convierte texto pegado o CSV en filas {nombre, telefono, email}. Acepta coma,
// punto y coma o tabulación como separador; ignora líneas vacías y una cabecera.
function parseImport(text) {
  return (text || '')
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean)
    .map((line, i) => {
      const parts = line.split(/[,;\t]/).map(s => s.trim());
      return { _i: i, nombre: parts[0] || '', telefono: parts[1] || '', email: parts[2] || '' };
    })
    .filter(r => r.nombre && !/^nombre$/i.test(r.nombre));
}

function ClientesImportarView({ clientes, onSaveCliente }) {
  const [metodo, setMetodo] = React.useState('pegar'); // 'pegar' | 'archivo'
  const [raw, setRaw] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [done, setDone] = React.useState(null); // nº importados
  const fileRef = React.useRef(null);

  const rows = React.useMemo(() => parseImport(raw), [raw]);
  const validos = rows.filter(r => r.nombre && r.telefono);

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setRaw(String(reader.result || ''));
    reader.readAsText(file);
  };

  const descargarPlantilla = () => {
    const csv = 'nombre,telefono,email\nJuanita Soto,+56 9 1234 5678,juanita@correo.cl\n';
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'plantilla-clientes.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importar = () => {
    if (validos.length === 0) return;
    const base = Date.now();
    validos.forEach((r, i) => {
      onSaveCliente({
        id: base + i,
        nombre: r.nombre,
        telefono: r.telefono,
        email: r.email,
        etiqueta: 'nuevo',
        visitas: 0,
        ultimaVisita: '',
        notas: '',
      });
    });
    setDone(validos.length);
    setRaw(''); setFileName('');
  };

  const reset = () => { setDone(null); setRaw(''); setFileName(''); };

  if (done != null) {
    return (
      <div className="clientes-view">
        <div className="import-done">
          <div className="import-done-check"><Icon name="check" /></div>
          <h2 className="import-done-title">{done} {done === 1 ? 'cliente importado' : 'clientes importados'}</h2>
          <p className="import-done-sub">Ya están en “Todos los clientes”, con la etiqueta Nuevo.</p>
          <button className="btn-primary-sm" onClick={reset}><Icon name="upload" />Importar otra lista</button>
        </div>
      </div>
    );
  }

  return (
    <div className="clientes-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Importar clientes</div>
          <div className="agenda-config-desc">Suma varios clientes de una vez desde un archivo CSV o pegando una lista.</div>
        </div>
        <button className="btn-sm-ghost" onClick={descargarPlantilla}><Icon name="download" />Descargar plantilla</button>
      </div>

      <div className="import-methods">
        <button className={`reserva-segment-btn${metodo === 'pegar' ? ' active' : ''}`} onClick={() => setMetodo('pegar')}>
          <Icon name="clipboard" />Pegar lista
        </button>
        <button className={`reserva-segment-btn${metodo === 'archivo' ? ' active' : ''}`} onClick={() => setMetodo('archivo')}>
          <Icon name="file-up" />Archivo CSV
        </button>
      </div>

      <div className="import-card">
        {metodo === 'pegar' ? (
          <React.Fragment>
            <div className="import-hint">Una persona por línea, con el formato <code>Nombre, Teléfono, Email</code>.</div>
            <textarea
              className="reserva-input reserva-textarea import-textarea"
              rows="6"
              placeholder={'Valentina Rojas, +56 9 8123 4567, valentina@correo.cl\nCarolina Pérez, +56 9 7654 3210'}
              value={raw}
              onChange={e => setRaw(e.target.value)}
            />
          </React.Fragment>
        ) : (
          <div className="import-file">
            <input ref={fileRef} type="file" accept=".csv,text/csv,text/plain" onChange={onFile} hidden />
            <button className="import-dropzone" onClick={() => fileRef.current && fileRef.current.click()}>
              <Icon name="file-up" />
              <span className="import-dropzone-title">{fileName || 'Selecciona un archivo CSV'}</span>
              <span className="import-dropzone-sub">Columnas: nombre, teléfono, email</span>
            </button>
          </div>
        )}
      </div>

      {rows.length > 0 && (
        <div className="import-preview">
          <div className="import-preview-head">
            <span className="import-preview-title">Vista previa</span>
            <span className="import-preview-count">{validos.length} de {rows.length} listos para importar</span>
          </div>
          <div className="import-table">
            <div className="import-table-head">
              <div>Nombre</div><div>Teléfono</div><div>Email</div><div />
            </div>
            {rows.map(r => {
              const valido = r.nombre && r.telefono;
              return (
                <div key={r._i} className={`import-table-row${valido ? '' : ' is-invalid'}`}>
                  <div className="import-cell-name">{r.nombre || <em>Sin nombre</em>}</div>
                  <div>{r.telefono || <span className="import-missing">Falta teléfono</span>}</div>
                  <div className="import-cell-email">{r.email || '—'}</div>
                  <div className="import-cell-status">
                    {valido ? <Icon name="check" /> : <Icon name="alert-circle" />}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="import-actions">
            <button className="btn-sm-ghost" onClick={() => setRaw('')}>Limpiar</button>
            <button className="btn-primary-sm" disabled={validos.length === 0} onClick={importar}>
              <Icon name="user-plus" />Importar {validos.length} {validos.length === 1 ? 'cliente' : 'clientes'}
            </button>
          </div>
        </div>
      )}
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

  // Sub-vistas con flujo propio (tras los hooks de arriba, para no alterar su orden)
  if (view === 'grupos')   return <ClientesGruposView clientes={clientes} />;
  if (view === 'importar') return <ClientesImportarView clientes={clientes} onSaveCliente={onSaveCliente} />;

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
