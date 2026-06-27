// ReservasConfigSection.jsx — Configuración de la página pública de reservas
// (agnd.cl/reservar/<slug>). Sub-vistas: General, Apariencia, Servicios,
// Profesionales y Reglas. Reutiliza CuentaHeader, SaveButton, Field y
// AgendaToggle. El estado vive en usePersistedState (mock, no persiste a backend).
// Lee el catálogo real desde window.MOCK_SERVICIOS y window.MOCK_COLABORADORES.

const RC_ACENTOS = [
  { id: 'aqua',  label: 'Aqua',  color: '#4CD5D2' },
  { id: 'rose',  label: 'Rosa',  color: '#E8739A' },
  { id: 'plum',  label: 'Plum',  color: '#AA4465' },
  { id: 'coral', label: 'Coral', color: '#FF8A65' },
];

const rcPrecio = n => '$' + (n || 0).toLocaleString('es-CL');
const rcAcentoColor = id => (RC_ACENTOS.find(a => a.id === id) || RC_ACENTOS[0]).color;

// Clave compartida con la página pública de reservas (ReservarApp lee de aquí).
const RC_STORE_KEY = 'agnd.reservas.config';

// Carga la config guardada (localStorage) fusionada sobre los valores por defecto,
// para que la página pública y el admin compartan el mismo estado entre recargas.
function rcLoadConfig() {
  const base = reservasDefaults();
  try {
    const raw = localStorage.getItem(RC_STORE_KEY);
    if (raw) return { ...base, ...JSON.parse(raw) };
  } catch (e) { /* mock: sin persistencia disponible */ }
  return base;
}

function reservasDefaults() {
  const servicios = window.MOCK_SERVICIOS || [];
  const colaboradores = window.MOCK_COLABORADORES || [];
  const serviciosVisibles = {};
  servicios.forEach(s => { serviciosVisibles[s.id] = !!s.activo; });
  const profesionalesVisibles = {};
  colaboradores.forEach(c => { profesionalesVisibles[c.id] = !!c.activo; });
  return {
    online: true,
    slug: 'estudio-roberto',
    titulo: 'Reserva tu hora',
    bienvenida: 'Agenda con nosotros en menos de un minuto.',
    acento: 'aqua',
    mostrarLogo: true,
    mostrarRating: true,
    mostrarPrecios: true,
    mostrarDuracion: true,
    serviciosVisibles,
    profesionalesVisibles,
    sinPreferencia: true,
    confirmacionAuto: true,
    anticipacionMin: '60',
    ventanaDias: '14',
    intervaloMin: '30',
    requiereTelefono: true,
    requiereEmail: false,
    politica: 'Puedes cancelar o reagendar tu hora hasta 2 horas antes sin costo.',
  };
}

// Fila de ajuste con etiqueta + descripción a la izquierda y control a la derecha.
function RcOptionRow({ label, desc, children }) {
  return (
    <div className="settings-row">
      <div className="settings-row-label">{label}{desc && <span>{desc}</span>}</div>
      {children}
    </div>
  );
}

// ── VISTA · GENERAL ────────────────────────────────────────────────────────────

function RcGeneralView({ cfg, up, set }) {
  const [copied, setCopied] = React.useState(false);
  const link = `https://agnd.cl/reservar/${cfg.slug || ''}`;
  const copiar = async () => {
    try { await navigator.clipboard.writeText(link); } catch (e) { /* mock */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <React.Fragment>
      <div className="cuenta-card">
        <div className="settings-section-title">Estado</div>
        <RcOptionRow label="Aceptar reservas online" desc="Permite que tus clientes agenden solos">
          <AgendaToggle value={cfg.online} onChange={v => set('online', v)} />
        </RcOptionRow>
        {!cfg.online && (
          <div className="rc-offline-note">
            <Icon name="eye-off" />Tu página está oculta: los clientes no pueden reservar mientras esté desactivada.
          </div>
        )}
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Tu enlace público</div>
        <Field label="Dirección de tu página">
          <div className="rc-slug">
            <span className="rc-slug-prefix">agnd.cl/reservar/</span>
            <input className="reserva-input" value={cfg.slug} onChange={up('slug')} />
          </div>
        </Field>
        <div className="input-with-action">
          <input className="reserva-input" value={link} readOnly />
          <button className="btn-sm-ghost" onClick={copiar}>
            <Icon name={copied ? 'check' : 'copy'} />{copied ? 'Copiado' : 'Copiar'}
          </button>
          <a className="btn-sm-ghost" href="reservar.html" target="_blank" rel="noopener">
            <Icon name="external-link" />Abrir
          </a>
        </div>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Textos de bienvenida</div>
        <Field label="Título">
          <input className="reserva-input" value={cfg.titulo} onChange={up('titulo')} placeholder="Reserva tu hora" />
        </Field>
        <Field label="Mensaje de bienvenida" opt>
          <textarea className="reserva-input reserva-textarea" rows="2" value={cfg.bienvenida} onChange={up('bienvenida')} />
        </Field>
      </div>
    </React.Fragment>
  );
}

// ── VISTA · APARIENCIA ─────────────────────────────────────────────────────────

function RcPreview({ cfg }) {
  const color = rcAcentoColor(cfg.acento);
  return (
    <div className="rc-preview" style={{ '--rc-accent': color }}>
      <div className="rc-preview-bar">
        <span className="rc-preview-dot" /><span className="rc-preview-dot" /><span className="rc-preview-dot" />
        <span className="rc-preview-url">agnd.cl/reservar/{cfg.slug}</span>
      </div>
      <div className="rc-preview-body">
        <div className="rc-preview-hero">
          {cfg.mostrarLogo && <span className="rc-preview-logo"><Icon name="scissors" size={16} /></span>}
          <div>
            <div className="rc-preview-name">Estudio Roberto</div>
            {cfg.mostrarRating && (
              <div className="rc-preview-rating"><Icon name="star" size={11} />4.9 <em>(212)</em></div>
            )}
          </div>
        </div>
        <div className="rc-preview-title">{cfg.titulo || 'Reserva tu hora'}</div>
        {cfg.bienvenida && <div className="rc-preview-sub">{cfg.bienvenida}</div>}
        <div className="rc-preview-service">
          <div>
            <div className="rc-preview-service-name">Corte + Brushing</div>
            {cfg.mostrarDuracion && <div className="rc-preview-service-meta">60 min</div>}
          </div>
          {cfg.mostrarPrecios && <span className="rc-preview-price">{rcPrecio(25000)}</span>}
        </div>
        <div className="rc-preview-btn">Continuar</div>
      </div>
    </div>
  );
}

function RcAparienciaView({ cfg, set }) {
  return (
    <div className="rc-apariencia">
      <div className="rc-apariencia-controls">
        <div className="cuenta-card">
          <div className="settings-section-title">Color de acento</div>
          <div className="rc-swatches">
            {RC_ACENTOS.map(a => (
              <button
                key={a.id}
                className={`rc-swatch${cfg.acento === a.id ? ' is-active' : ''}`}
                onClick={() => set('acento', a.id)}
                aria-pressed={cfg.acento === a.id}
              >
                <span className="rc-swatch-color" style={{ background: a.color }}>
                  {cfg.acento === a.id && <Icon name="check" size={15} />}
                </span>
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div className="cuenta-card">
          <div className="settings-section-title">Elementos visibles</div>
          <RcOptionRow label="Mostrar logo" desc="El logo del negocio en la cabecera">
            <AgendaToggle value={cfg.mostrarLogo} onChange={v => set('mostrarLogo', v)} />
          </RcOptionRow>
          <RcOptionRow label="Mostrar calificación" desc="Estrellas y reseñas del negocio">
            <AgendaToggle value={cfg.mostrarRating} onChange={v => set('mostrarRating', v)} />
          </RcOptionRow>
          <RcOptionRow label="Mostrar precios" desc="El precio de cada servicio">
            <AgendaToggle value={cfg.mostrarPrecios} onChange={v => set('mostrarPrecios', v)} />
          </RcOptionRow>
          <RcOptionRow label="Mostrar duración" desc="La duración estimada de cada servicio">
            <AgendaToggle value={cfg.mostrarDuracion} onChange={v => set('mostrarDuracion', v)} />
          </RcOptionRow>
        </div>
      </div>

      <div className="rc-apariencia-preview">
        <div className="rc-preview-label">Vista previa</div>
        <RcPreview cfg={cfg} />
      </div>
    </div>
  );
}

// ── VISTA · SERVICIOS ──────────────────────────────────────────────────────────

function RcServiciosView({ cfg, toggleMap }) {
  const servicios = (window.MOCK_SERVICIOS || []).filter(s => s.activo);
  const visibles = servicios.filter(s => cfg.serviciosVisibles[s.id]).length;

  return (
    <div className="cuenta-card">
      <div className="rc-list-head">
        <div className="settings-section-title">Servicios en tu página</div>
        <span className="rc-count">{visibles} de {servicios.length} visibles</span>
      </div>
      <p className="rc-list-desc">Elige qué servicios pueden reservar tus clientes. Solo aparecen los servicios activos de tu catálogo.</p>
      <div className="rc-rows">
        {servicios.length === 0 ? (
          <div className="rc-empty"><Icon name="tag" />No tienes servicios activos en tu catálogo.</div>
        ) : servicios.map(s => (
          <div key={s.id} className="rc-row">
            <div className="rc-row-icon"><Icon name="scissors" size={15} /></div>
            <div className="rc-row-main">
              <div className="rc-row-name">{s.nombre}</div>
              <div className="rc-row-meta">{s.categoria} · {s.duracion} min · {rcPrecio(s.precio)}</div>
            </div>
            <AgendaToggle value={!!cfg.serviciosVisibles[s.id]} onChange={() => toggleMap('serviciosVisibles', s.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── VISTA · PROFESIONALES ──────────────────────────────────────────────────────

function RcProfesionalesView({ cfg, set, toggleMap }) {
  const pros = (window.MOCK_COLABORADORES || []).filter(c => c.activo);
  const visibles = pros.filter(p => cfg.profesionalesVisibles[p.id]).length;

  return (
    <React.Fragment>
      <div className="cuenta-card">
        <div className="rc-list-head">
          <div className="settings-section-title">Profesionales en tu página</div>
          <span className="rc-count">{visibles} de {pros.length} visibles</span>
        </div>
        <p className="rc-list-desc">Elige qué profesionales pueden elegir tus clientes al reservar.</p>
        <div className="rc-rows">
          {pros.length === 0 ? (
            <div className="rc-empty"><Icon name="user-check" />No tienes profesionales activos.</div>
          ) : pros.map(p => (
            <div key={p.id} className="rc-row">
              <span className="rc-avatar" style={{ background: p.color }}>
                {p.nombre.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
              </span>
              <div className="rc-row-main">
                <div className="rc-row-name">{p.nombre}</div>
                <div className="rc-row-meta">{p.cargo}</div>
              </div>
              <AgendaToggle value={!!cfg.profesionalesVisibles[p.id]} onChange={() => toggleMap('profesionalesVisibles', p.id)} />
            </div>
          ))}
        </div>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Asignación</div>
        <RcOptionRow label="Permitir “Sin preferencia”" desc="El cliente puede dejar que asignes al mejor disponible">
          <AgendaToggle value={cfg.sinPreferencia} onChange={v => set('sinPreferencia', v)} />
        </RcOptionRow>
      </div>
    </React.Fragment>
  );
}

// ── VISTA · REGLAS ─────────────────────────────────────────────────────────────

function RcReglasView({ cfg, up, set }) {
  return (
    <React.Fragment>
      <div className="cuenta-card">
        <div className="settings-section-title">Disponibilidad</div>
        <div className="reserva-field-grid">
          <Field label="Anticipación mínima">
            <select className="reserva-input" value={cfg.anticipacionMin} onChange={up('anticipacionMin')}>
              <option value="0">Sin mínimo</option>
              <option value="30">30 minutos antes</option>
              <option value="60">1 hora antes</option>
              <option value="120">2 horas antes</option>
              <option value="1440">1 día antes</option>
            </select>
          </Field>
          <Field label="Ventana de reserva">
            <select className="reserva-input" value={cfg.ventanaDias} onChange={up('ventanaDias')}>
              <option value="7">Próximos 7 días</option>
              <option value="14">Próximos 14 días</option>
              <option value="30">Próximos 30 días</option>
              <option value="60">Próximos 60 días</option>
            </select>
          </Field>
          <Field label="Intervalo entre horas">
            <select className="reserva-input" value={cfg.intervaloMin} onChange={up('intervaloMin')}>
              <option value="15">Cada 15 minutos</option>
              <option value="20">Cada 20 minutos</option>
              <option value="30">Cada 30 minutos</option>
              <option value="45">Cada 45 minutos</option>
              <option value="60">Cada 1 hora</option>
            </select>
          </Field>
        </div>
        <RcOptionRow label="Confirmar reservas automáticamente" desc="Si lo desactivas, deberás aprobar cada reserva manualmente">
          <AgendaToggle value={cfg.confirmacionAuto} onChange={v => set('confirmacionAuto', v)} />
        </RcOptionRow>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Datos del cliente</div>
        <RcOptionRow label="Exigir teléfono" desc="El cliente debe ingresar su teléfono para reservar">
          <AgendaToggle value={cfg.requiereTelefono} onChange={v => set('requiereTelefono', v)} />
        </RcOptionRow>
        <RcOptionRow label="Exigir email" desc="El cliente debe ingresar su email para reservar">
          <AgendaToggle value={cfg.requiereEmail} onChange={v => set('requiereEmail', v)} />
        </RcOptionRow>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Política de reservas</div>
        <Field label="Texto mostrado al confirmar" opt>
          <textarea className="reserva-input reserva-textarea" rows="3" value={cfg.politica} onChange={up('politica')} />
        </Field>
      </div>
    </React.Fragment>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────────

const RC_VIEW_META = {
  general:        { title: 'General',       desc: 'Estado, enlace público y textos de tu página de reservas.' },
  apariencia:     { title: 'Apariencia',    desc: 'Color, logo y qué información ve el cliente.' },
  servicios:      { title: 'Servicios',     desc: 'Qué servicios pueden reservar tus clientes.' },
  profesionales:  { title: 'Profesionales', desc: 'Qué profesionales pueden elegir al reservar.' },
  reglas:         { title: 'Reglas de reserva', desc: 'Disponibilidad, datos requeridos y política.' },
};

function ReservasConfigSection({ sub }) {
  const [cfg, setCfg] = usePersistedState('reservas.config', rcLoadConfig);

  // Cada cambio se refleja en localStorage para que la página pública lo aplique.
  React.useEffect(() => {
    try { localStorage.setItem(RC_STORE_KEY, JSON.stringify(cfg)); } catch (e) { /* mock */ }
  }, [cfg]);

  const up = k => e => setCfg(c => ({ ...c, [k]: e.target.value }));
  const set = (k, v) => setCfg(c => ({ ...c, [k]: v }));
  const toggleMap = (mapKey, id) =>
    setCfg(c => ({ ...c, [mapKey]: { ...c[mapKey], [id]: !c[mapKey][id] } }));

  const view = sub || 'general';
  const meta = RC_VIEW_META[view] || RC_VIEW_META.general;

  return (
    <div className="cuenta-view">
      <CuentaHeader title={meta.title} desc={meta.desc} actions={<SaveButton onSave={() => {}} />} />
      {view === 'general'       && <RcGeneralView cfg={cfg} up={up} set={set} />}
      {view === 'apariencia'    && <RcAparienciaView cfg={cfg} set={set} />}
      {view === 'servicios'     && <RcServiciosView cfg={cfg} toggleMap={toggleMap} />}
      {view === 'profesionales' && <RcProfesionalesView cfg={cfg} set={set} toggleMap={toggleMap} />}
      {view === 'reglas'        && <RcReglasView cfg={cfg} up={up} set={set} />}
    </div>
  );
}

Object.assign(window, { ReservasConfigSection });
