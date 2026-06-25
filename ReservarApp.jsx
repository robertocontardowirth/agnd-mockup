// ReservarApp.jsx — página pública de reservas (agnd.cl/reservar/estudio-roberto)
// Flujo de 4 pasos para el cliente final: Servicio → Profesional → Fecha y hora
// → Tus datos, con un resumen lateral y pantalla de confirmación.
// Usa el componente Icon (no lucide.createIcons) para evitar crashes de React.

// ── DATOS DEL NEGOCIO (mock) ──────────────────────────────────────────────────

const NEGOCIO = {
  nombre: 'Estudio Roberto',
  rubro: 'Peluquería y estética',
  direccion: 'Av. Providencia 1234, of. 56 · Providencia',
  rating: 4.9,
  reviews: 212,
};

const CATEGORIAS = [
  { id: 'cabello',  label: 'Cabello',  icon: 'scissors' },
  { id: 'unas',     label: 'Uñas',     icon: 'sparkles' },
  { id: 'barberia', label: 'Barbería', icon: 'scissors' },
];

const SERVICIOS = [
  { id: 'corte',          cat: 'cabello',  nombre: 'Corte',            duracion: 45, precio: 12000, desc: 'Lavado, corte y peinado.' },
  { id: 'corte-brushing', cat: 'cabello',  nombre: 'Corte + Brushing', duracion: 60, precio: 18000, desc: 'Corte con terminación de brushing.' },
  { id: 'coloracion',     cat: 'cabello',  nombre: 'Coloración',       duracion: 90, precio: 35000, desc: 'Color completo con productos premium.' },
  { id: 'brushing',       cat: 'cabello',  nombre: 'Brushing',         duracion: 30, precio: 9000,  desc: 'Peinado y terminación.' },
  { id: 'manicure',       cat: 'unas',     nombre: 'Manicure',         duracion: 45, precio: 14000, desc: 'Manicure tradicional o semipermanente.' },
  { id: 'pedicure',       cat: 'unas',     nombre: 'Pedicure',         duracion: 60, precio: 16000, desc: 'Pedicure completo con esmaltado.' },
  { id: 'barberia',       cat: 'barberia', nombre: 'Barbería',         duracion: 30, precio: 10000, desc: 'Arreglo de barba y perfilado.' },
];

const PROS = [
  { id: 1, nombre: 'Andrea Morales', rol: 'Estilista senior', color: '#4CD5D2', foto: 'https://randomuser.me/api/portraits/women/68.jpg', servicios: ['corte', 'corte-brushing', 'coloracion', 'brushing'] },
  { id: 2, nombre: 'Paula Reyes',    rol: 'Manicurista',       color: '#FFA69E', foto: 'https://randomuser.me/api/portraits/women/44.jpg', servicios: ['manicure', 'pedicure'] },
  { id: 3, nombre: 'Diego Fuentes',  rol: 'Barbero',           color: '#AA4465', foto: 'https://randomuser.me/api/portraits/men/32.jpg',   servicios: ['corte', 'barberia'] },
];

// ── CONFIGURACIÓN GUARDADA ────────────────────────────────────────────────────
// La página de configuración del admin (ReservasConfigSection) guarda en
// localStorage bajo esta clave; aquí la leemos y la aplicamos a la página pública.

const RESERVAS_CONFIG_KEY = 'agnd.reservas.config';

const RESERVAS_CONFIG_DEFAULTS = {
  online: true,
  titulo: 'Reserva tu hora',
  bienvenida: 'Agenda con nosotros en menos de un minuto.',
  acento: 'aqua',
  mostrarLogo: true,
  mostrarRating: true,
  mostrarPrecios: true,
  mostrarDuracion: true,
  profesionalesVisibles: null,
  sinPreferencia: true,
  confirmacionAuto: true,
  anticipacionMin: '60',
  ventanaDias: '14',
  requiereTelefono: true,
  requiereEmail: false,
  politica: '',
};

// Acentos disponibles → variables CSS de la página de reservas (--bk*).
const BK_ACENTOS = {
  aqua:  { bk: '#4CD5D2', deep: '#1F9C99', soft: '#E6FAF8', ring: 'rgba(76,213,210,.28)',  on: '#053b3a' },
  rose:  { bk: '#E8739A', deep: '#C24E78', soft: '#FCE9F0', ring: 'rgba(232,115,154,.28)', on: '#ffffff' },
  plum:  { bk: '#AA4465', deep: '#7E2E49', soft: '#F6E6EC', ring: 'rgba(170,68,101,.28)',  on: '#ffffff' },
  coral: { bk: '#FF8A65', deep: '#E0623B', soft: '#FFEDE5', ring: 'rgba(255,138,101,.28)', on: '#ffffff' },
};

function loadReservasConfig() {
  try {
    const raw = localStorage.getItem(RESERVAS_CONFIG_KEY);
    if (raw) return { ...RESERVAS_CONFIG_DEFAULTS, ...JSON.parse(raw) };
  } catch (e) { /* mock: sin persistencia disponible */ }
  return RESERVAS_CONFIG_DEFAULTS;
}

function accentStyle(acento) {
  const a = BK_ACENTOS[acento] || BK_ACENTOS.aqua;
  return { '--bk': a.bk, '--bk-deep': a.deep, '--bk-soft': a.soft, '--bk-ring': a.ring, '--bk-on': a.on };
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

const DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function precioCLP(n) { return '$' + n.toLocaleString('es-CL'); }

function iniciales(nombre) {
  return nombre.split(' ').filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

// Próximos N días desde hoy (ventana configurable). Domingo = cerrado.
function buildDates(dias) {
  const total = Math.max(1, parseInt(dias, 10) || 14);
  const out = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 0; i < total; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push({
      key: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
      dia: DIAS[d.getDay()],
      num: d.getDate(),
      mes: MESES[d.getMonth()],
      cerrado: d.getDay() === 0,
      hoy: i === 0,
      date: d,
    });
  }
  return out;
}

// Slots de 30 min entre 10:00 y 19:00. Disponibilidad mock determinista por fecha.
// earliestTs (opcional): marca como ocupados los slots anteriores a esa marca de
// tiempo, para respetar la anticipación mínima configurada.
function buildSlots(fecha, earliestTs) {
  if (!fecha || fecha.cerrado) return { manana: [], tarde: [] };
  const manana = [], tarde = [];
  for (let h = 10; h < 19; h++) {
    for (const m of [0, 30]) {
      const idx = (h * 2) + (m === 30 ? 1 : 0);
      let libre = (fecha.num + idx) % 3 !== 0;
      if (libre && earliestTs != null) {
        const slot = new Date(fecha.date);
        slot.setHours(h, m, 0, 0);
        if (slot.getTime() < earliestTs) libre = false;
      }
      const t = `${String(h).padStart(2, '0')}:${m === 0 ? '00' : '30'}`;
      (h < 13 ? manana : tarde).push({ t, libre });
    }
  }
  return { manana, tarde };
}

// ── BARRA SUPERIOR ────────────────────────────────────────────────────────────

function ReservarTopBar() {
  return (
    <header className="bk-topbar">
      <div className="bk-topbar-inner">
        <Logo size={22} />
        <span className="bk-topbar-powered">Reservas con <strong>AGND</strong></span>
      </div>
    </header>
  );
}

function NegocioHero({ cfg }) {
  return (
    <div className="bk-hero">
      {cfg.mostrarLogo && <div className="bk-hero-logo"><Icon name="scissors" size={26} /></div>}
      <div className="bk-hero-text">
        <h1 className="bk-hero-name">{NEGOCIO.nombre}</h1>
        <div className="bk-hero-rubro">{NEGOCIO.rubro}</div>
        <div className="bk-hero-meta">
          {cfg.mostrarRating && (
            <React.Fragment>
              <span className="bk-hero-rating"><Icon name="star" size={14} />{NEGOCIO.rating} <em>({NEGOCIO.reviews})</em></span>
              <span className="bk-hero-dot">·</span>
            </React.Fragment>
          )}
          <span className="bk-hero-addr"><Icon name="map-pin" size={14} />{NEGOCIO.direccion}</span>
        </div>
      </div>
    </div>
  );
}

// ── STEPPER ───────────────────────────────────────────────────────────────────

const STEPS = ['Servicio', 'Profesional', 'Fecha y hora', 'Tus datos'];

function Stepper({ step }) {
  return (
    <ol className="bk-stepper">
      {STEPS.map((label, i) => {
        const state = i < step ? 'done' : i === step ? 'active' : 'todo';
        return (
          <li key={label} className={`bk-step is-${state}`}>
            <span className="bk-step-dot">{i < step ? <Icon name="check" size={14} /> : i + 1}</span>
            <span className="bk-step-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

// ── PASO 1 · SERVICIO ─────────────────────────────────────────────────────────

function ServicioStep({ value, onPick, cfg }) {
  return (
    <div className="bk-step-body">
      <h2 className="bk-step-title">¿Qué te quieres hacer?</h2>
      <p className="bk-step-desc">Elige el servicio que quieres reservar.</p>

      {CATEGORIAS.map(cat => {
        const items = SERVICIOS.filter(s => s.cat === cat.id);
        if (!items.length) return null;
        return (
          <div key={cat.id} className="bk-cat">
            <div className="bk-cat-head"><Icon name={cat.icon} size={15} />{cat.label}</div>
            <div className="bk-service-list">
              {items.map(s => (
                <button
                  key={s.id}
                  className={`bk-service${value === s.id ? ' is-selected' : ''}`}
                  onClick={() => onPick(s.id)}
                >
                  <div className="bk-service-main">
                    <div className="bk-service-name">{s.nombre}</div>
                    <div className="bk-service-desc">{s.desc}</div>
                    {cfg.mostrarDuracion && <div className="bk-service-dur"><Icon name="clock" size={13} />{s.duracion} min</div>}
                  </div>
                  <div className="bk-service-end">
                    {cfg.mostrarPrecios && <span className="bk-service-price">{precioCLP(s.precio)}</span>}
                    <span className="bk-radio" aria-hidden="true">{value === s.id && <Icon name="check" size={14} />}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── PASO 2 · PROFESIONAL ──────────────────────────────────────────────────────

// Avatar del profesional: foto si existe (con fallback a iniciales si falla la
// carga), ícono para "Sin preferencia", o iniciales sobre su color.
function ProAvatar({ pro, size }) {
  const [err, setErr] = React.useState(false);
  const dim = size ? { width: size, height: size } : undefined;
  if (pro.any) {
    return <span className="bk-pro-avatar is-any" style={dim}><Icon name="users" size={size ? size * 0.46 : 20} /></span>;
  }
  if (pro.foto && !err) {
    return (
      <span className="bk-pro-avatar" style={dim}>
        <img className="bk-pro-photo" src={pro.foto} alt={pro.nombre} loading="lazy" onError={() => setErr(true)} />
      </span>
    );
  }
  return <span className="bk-pro-avatar" style={{ ...dim, background: pro.color }}>{iniciales(pro.nombre)}</span>;
}

function ProfesionalStep({ servicioId, value, onPick, cfg }) {
  const vis = cfg.profesionalesVisibles;
  const elegibles = PROS
    .filter(p => p.servicios.includes(servicioId))
    .filter(p => !vis || vis[p.id] !== false);
  const sinPref = { id: 'any', nombre: 'Sin preferencia', rol: 'Te asignamos al mejor disponible', any: true };
  const opciones = cfg.sinPreferencia ? [sinPref, ...elegibles] : elegibles;

  return (
    <div className="bk-step-body">
      <h2 className="bk-step-title">¿Con quién?</h2>
      <p className="bk-step-desc">Elige tu profesional o deja que lo asignemos por ti.</p>

      <div className="bk-pro-grid">
        {opciones.map(p => (
          <button
            key={p.id}
            className={`bk-pro${value === p.id ? ' is-selected' : ''}`}
            onClick={() => onPick(p.id)}
          >
            <ProAvatar pro={p} />
            <span className="bk-pro-text">
              <span className="bk-pro-name">{p.nombre}</span>
              <span className="bk-pro-rol">{p.rol}</span>
            </span>
            {value === p.id && <span className="bk-pro-check"><Icon name="check" size={15} /></span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── PASO 3 · FECHA Y HORA ─────────────────────────────────────────────────────

function FechaHoraStep({ fechas, fechaKey, hora, onPickFecha, onPickHora, earliestTs }) {
  const fecha = fechas.find(f => f.key === fechaKey) || null;
  const { manana, tarde } = buildSlots(fecha, earliestTs);
  const hayCupos = manana.some(s => s.libre) || tarde.some(s => s.libre);

  const renderGroup = (label, slots) => (
    slots.length > 0 && (
      <div className="bk-slot-group">
        <div className="bk-slot-group-label">{label}</div>
        <div className="bk-slot-grid">
          {slots.map(s => (
            <button
              key={s.t}
              className={`bk-slot${hora === s.t ? ' is-selected' : ''}`}
              disabled={!s.libre}
              onClick={() => onPickHora(s.t)}
            >
              {s.t}
            </button>
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className="bk-step-body">
      <h2 className="bk-step-title">¿Cuándo te acomoda?</h2>
      <p className="bk-step-desc">Selecciona un día y luego una hora disponible.</p>

      <div className="bk-date-scroll">
        {fechas.map(f => (
          <button
            key={f.key}
            className={`bk-date${fechaKey === f.key ? ' is-selected' : ''}${f.cerrado ? ' is-closed' : ''}`}
            disabled={f.cerrado}
            onClick={() => onPickFecha(f.key)}
          >
            <span className="bk-date-dia">{f.hoy ? 'Hoy' : f.dia}</span>
            <span className="bk-date-num">{f.num}</span>
            <span className="bk-date-mes">{f.mes}</span>
          </button>
        ))}
      </div>

      {!fecha ? (
        <div className="bk-slot-empty"><Icon name="calendar" size={18} />Elige un día para ver las horas.</div>
      ) : !hayCupos ? (
        <div className="bk-slot-empty"><Icon name="calendar-x" size={18} />No hay horas disponibles este día.</div>
      ) : (
        <div className="bk-slots">
          {renderGroup('Mañana', manana)}
          {renderGroup('Tarde', tarde)}
        </div>
      )}
    </div>
  );
}

// ── PASO 4 · TUS DATOS ────────────────────────────────────────────────────────

function DatosStep({ datos, acepta, onChange, onAcepta, cfg }) {
  const up = k => e => onChange(k, e.target.value);
  return (
    <div className="bk-step-body">
      <h2 className="bk-step-title">Tus datos</h2>
      <p className="bk-step-desc">Para confirmar tu reserva y enviarte el recordatorio.</p>

      <div className="bk-form">
        <div className="bk-field">
          <label className="bk-label">Nombre y apellido</label>
          <input className="bk-input" value={datos.nombre} onChange={up('nombre')} placeholder="Tu nombre" autoFocus />
        </div>
        <div className="bk-field-grid">
          <div className="bk-field">
            <label className="bk-label">Teléfono {!cfg.requiereTelefono && <span className="bk-opt">(opcional)</span>}</label>
            <input className="bk-input" type="tel" value={datos.telefono} onChange={up('telefono')} placeholder="+56 9 ..." />
          </div>
          <div className="bk-field">
            <label className="bk-label">Email {cfg.requiereEmail ? null : <span className="bk-opt">(opcional)</span>}</label>
            <input className="bk-input" type="email" value={datos.email} onChange={up('email')} placeholder="correo@ejemplo.com" />
          </div>
        </div>
        <div className="bk-field">
          <label className="bk-label">Comentario <span className="bk-opt">(opcional)</span></label>
          <textarea className="bk-input bk-textarea" rows="3" value={datos.notas} onChange={up('notas')} placeholder="¿Algo que debamos saber?" />
        </div>

        <label className="bk-check">
          <input type="checkbox" checked={acepta} onChange={e => onAcepta(e.target.checked)} />
          <span>Acepto la <a href="terminos.html" target="_blank">política de reservas</a> y el tratamiento de mis datos.</span>
        </label>
      </div>
    </div>
  );
}

// ── RESUMEN LATERAL ───────────────────────────────────────────────────────────

function ResumenCard({ servicio, pro, fecha, hora, cfg }) {
  const Row = ({ icon, label, value, node }) => (
    <div className="bk-sum-row">
      <span className="bk-sum-icon">{node || <Icon name={icon} size={16} />}</span>
      <span className="bk-sum-label">{label}</span>
      <span className={`bk-sum-value${value ? '' : ' is-empty'}`}>{value || '—'}</span>
    </div>
  );
  const fechaTxt = fecha ? `${fecha.hoy ? 'Hoy' : fecha.dia} ${fecha.num} ${fecha.mes}` : null;
  const proTxt = pro ? (pro.any ? 'Sin preferencia' : pro.nombre) : null;
  const proNode = pro && !pro.any ? <ProAvatar pro={pro} size={22} /> : null;

  return (
    <aside className="bk-summary">
      <div className="bk-summary-head">
        <span className="bk-summary-biz-logo"><Icon name="scissors" size={18} /></span>
        <div>
          <div className="bk-summary-biz">{NEGOCIO.nombre}</div>
          <div className="bk-summary-sub">Tu reserva</div>
        </div>
      </div>

      <div className="bk-sum-rows">
        <Row icon="sparkles" label="Servicio" value={servicio ? servicio.nombre : null} />
        <Row icon="user" label="Profesional" value={proTxt} node={proNode} />
        <Row icon="calendar" label="Fecha" value={fechaTxt} />
        <Row icon="clock" label="Hora" value={hora} />
      </div>

      {servicio && (cfg.mostrarDuracion || cfg.mostrarPrecios) && (
        <div className="bk-summary-total">
          {cfg.mostrarDuracion && (
            <div className="bk-summary-total-line">
              <span>Duración</span><span>{servicio.duracion} min</span>
            </div>
          )}
          {cfg.mostrarPrecios && (
            <div className="bk-summary-total-line is-price">
              <span>Total</span><span>{precioCLP(servicio.precio)}</span>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

// ── CONFIRMACIÓN ──────────────────────────────────────────────────────────────

function Confirmacion({ codigo, servicio, pro, fecha, hora, datos, onReset, cfg }) {
  const fechaTxt = fecha ? `${fecha.hoy ? 'Hoy' : fecha.dia} ${fecha.num} ${fecha.mes}` : '';
  const proTxt = pro ? (pro.any ? 'Sin preferencia' : pro.nombre) : '';
  const estadoTxt = cfg.confirmacionAuto ? '¡Reserva confirmada!' : 'Reserva recibida';
  const subTxt = cfg.confirmacionAuto
    ? `Te enviamos los detalles${datos.email ? ` a ${datos.email}` : ''}.`
    : 'Te avisaremos en cuanto el negocio confirme tu hora.';
  return (
    <div className="bk-done">
      <div className="bk-done-check"><Icon name={cfg.confirmacionAuto ? 'check' : 'clock'} size={34} /></div>
      <h1 className="bk-done-title">{estadoTxt}</h1>
      <p className="bk-done-sub">
        {subTxt} Tu código es <strong>{codigo}</strong>.
      </p>

      <div className="bk-done-card">
        <div className="bk-done-row"><Icon name="sparkles" size={16} /><span>{servicio.nombre}</span>{cfg.mostrarPrecios && <b>{precioCLP(servicio.precio)}</b>}</div>
        <div className="bk-done-row"><Icon name="user" size={16} /><span>{proTxt}</span></div>
        <div className="bk-done-row"><Icon name="calendar" size={16} /><span>{fechaTxt}</span></div>
        <div className="bk-done-row"><Icon name="clock" size={16} /><span>{hora}{cfg.mostrarDuracion ? ` · ${servicio.duracion} min` : ''}</span></div>
        <div className="bk-done-row"><Icon name="map-pin" size={16} /><span>{NEGOCIO.direccion}</span></div>
      </div>

      {cfg.politica && <p className="bk-done-policy"><Icon name="info" size={14} />{cfg.politica}</p>}

      <div className="bk-done-actions">
        <button className="bk-btn bk-btn-ghost"><Icon name="calendar-plus" size={16} />Agregar al calendario</button>
        <button className="bk-btn bk-btn-primary" onClick={onReset}>Hacer otra reserva</button>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────

function ReservarApp() {
  const cfg = React.useMemo(loadReservasConfig, []);
  const fechas = React.useMemo(() => buildDates(cfg.ventanaDias), [cfg.ventanaDias]);
  // Marca de tiempo mínima reservable según la anticipación configurada.
  const earliestTs = React.useMemo(
    () => Date.now() + (parseInt(cfg.anticipacionMin, 10) || 0) * 60000,
    [cfg.anticipacionMin]
  );
  const pageStyle = accentStyle(cfg.acento);

  const [step, setStep] = React.useState(0);
  const [servicioId, setServicioId] = React.useState(null);
  const [proId, setProId] = React.useState(null);
  const [fechaKey, setFechaKey] = React.useState(null);
  const [hora, setHora] = React.useState(null);
  const [datos, setDatos] = React.useState({ nombre: '', telefono: '', email: '', notas: '' });
  const [acepta, setAcepta] = React.useState(false);
  const [codigo, setCodigo] = React.useState(null);

  const servicio = SERVICIOS.find(s => s.id === servicioId) || null;
  const proOpciones = [{ id: 'any', nombre: 'Sin preferencia', any: true }, ...PROS];
  const pro = proOpciones.find(p => p.id === proId) || null;
  const fecha = fechas.find(f => f.key === fechaKey) || null;

  const pickServicio = (id) => {
    setServicioId(id);
    // Si el profesional elegido ya no ofrece el nuevo servicio, lo reseteamos.
    if (proId && proId !== 'any' && !PROS.find(p => p.id === proId)?.servicios.includes(id)) setProId(null);
  };
  const setDato = (k, v) => setDatos(d => ({ ...d, [k]: v }));

  const datosOk = datos.nombre.trim()
    && (!cfg.requiereTelefono || datos.telefono.trim())
    && (!cfg.requiereEmail || datos.email.trim())
    && acepta;
  const canNext =
    step === 0 ? !!servicioId :
    step === 1 ? !!proId :
    step === 2 ? !!(fechaKey && hora) :
    step === 3 ? !!datosOk : false;

  const next = () => {
    if (!canNext) return;
    if (step < 3) { setStep(step + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else {
      setCodigo('AG-' + Math.floor(1000 + Math.random() * 9000));
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const back = () => { if (step > 0) setStep(step - 1); };

  const reset = () => {
    setStep(0); setServicioId(null); setProId(null); setFechaKey(null); setHora(null);
    setDatos({ nombre: '', telefono: '', email: '', notas: '' }); setAcepta(false); setCodigo(null);
  };

  // Reservas desactivadas desde la configuración: página cerrada al público.
  if (!cfg.online) {
    return (
      <div className="bk-page" style={pageStyle}>
        <ReservarTopBar />
        <main className="bk-main bk-main-done">
          <div className="bk-done">
            <div className="bk-done-check bk-done-check--off"><Icon name="calendar-off" size={32} /></div>
            <h1 className="bk-done-title">Reservas no disponibles</h1>
            <p className="bk-done-sub">
              {NEGOCIO.nombre} no está aceptando reservas online en este momento. Inténtalo más tarde o contáctanos directamente.
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="bk-page" style={pageStyle}>
        <ReservarTopBar />
        <main className="bk-main bk-main-done">
          <Confirmacion codigo={codigo} servicio={servicio} pro={pro} fecha={fecha} hora={hora} datos={datos} onReset={reset} cfg={cfg} />
        </main>
      </div>
    );
  }

  return (
    <div className="bk-page" style={pageStyle}>
      <ReservarTopBar />
      <main className="bk-main">
        <NegocioHero cfg={cfg} />
        {(cfg.titulo || cfg.bienvenida) && (
          <div className="bk-welcome">
            {cfg.titulo && <h2 className="bk-welcome-title">{cfg.titulo}</h2>}
            {cfg.bienvenida && <p className="bk-welcome-sub">{cfg.bienvenida}</p>}
          </div>
        )}
        <div className="bk-layout">
          <div className="bk-flow">
            <Stepper step={step} />
            <div className="bk-card">
              {step === 0 && <ServicioStep value={servicioId} onPick={pickServicio} cfg={cfg} />}
              {step === 1 && <ProfesionalStep servicioId={servicioId} value={proId} onPick={setProId} cfg={cfg} />}
              {step === 2 && <FechaHoraStep fechas={fechas} fechaKey={fechaKey} hora={hora} onPickFecha={setFechaKey} onPickHora={setHora} earliestTs={earliestTs} />}
              {step === 3 && <DatosStep datos={datos} acepta={acepta} onChange={setDato} onAcepta={setAcepta} cfg={cfg} />}

              <div className="bk-actions">
                {step > 0
                  ? <button className="bk-btn bk-btn-ghost" onClick={back}><Icon name="arrow-left" size={16} />Volver</button>
                  : <span />}
                <button className="bk-btn bk-btn-primary" disabled={!canNext} onClick={next}>
                  {step === 3 ? <>Confirmar reserva<Icon name="check" size={16} /></> : <>Continuar<Icon name="arrow-right" size={16} /></>}
                </button>
              </div>
            </div>
          </div>

          <ResumenCard servicio={servicio} pro={pro} fecha={fecha} hora={hora} cfg={cfg} />
        </div>
      </main>
    </div>
  );
}

window.ReservarApp = ReservarApp;
