// CuentaSection.jsx — secciones de cuenta abiertas desde el menú del avatar:
// Mi perfil, Mi negocio, Suscripción y plan, Configuración.
// Son vistas mock: el estado de formularios vive en usePersistedState para
// sobrevivir a la navegación, igual que el resto de la configuración.

// ── HELPERS COMPARTIDOS ───────────────────────────────────────────────────────

function CuentaHeader({ title, desc, actions }) {
  return (
    <div className="agenda-config-header">
      <div>
        <div className="agenda-config-title">{title}</div>
        <div className="agenda-config-desc">{desc}</div>
      </div>
      {actions}
    </div>
  );
}

// Botón de guardado con confirmación efímera (mock: no persiste a backend).
function SaveButton({ onSave, label = 'Guardar cambios' }) {
  const [done, setDone] = React.useState(false);
  const click = () => {
    if (onSave) onSave();
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };
  return (
    <button className="btn-primary-sm" onClick={click}>
      <Icon name={done ? 'check' : 'save'} />{done ? 'Guardado' : label}
    </button>
  );
}

function Field({ label, opt, children }) {
  return (
    <div className="reserva-field">
      <label className="reserva-field-label">
        {label}{opt && <span className="reserva-field-opt"> (opcional)</span>}
      </label>
      {children}
    </div>
  );
}

// ── MI PERFIL ─────────────────────────────────────────────────────────────────

function PerfilSection() {
  const [form, setForm] = usePersistedState('cuenta.perfil', {
    nombre: 'Roberto', apellido: 'Contardo', email: 'roberto@agnd.cl',
    telefono: '+56 9 6543 2109', cargo: 'dueno', idioma: 'es', dosPasos: false,
  });
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const ini = `${form.nombre[0] || ''}${form.apellido[0] || ''}`.toUpperCase();

  return (
    <div className="cuenta-view">
      <CuentaHeader
        title="Mi perfil"
        desc="Tu información personal y cómo apareces en AGND."
        actions={<SaveButton onSave={() => {}} />}
      />

      <div className="cuenta-card">
        <div className="cuenta-profile">
          <span className="cuenta-avatar-lg">{ini}</span>
          <div className="cuenta-profile-info">
            <div className="cuenta-profile-name">{form.nombre} {form.apellido}</div>
            <div className="cuenta-profile-email">{form.email}</div>
          </div>
          <button className="btn-sm-ghost"><Icon name="camera" />Cambiar foto</button>
        </div>

        <div className="reserva-field-grid">
          <Field label="Nombre"><input className="reserva-input" value={form.nombre} onChange={up('nombre')} /></Field>
          <Field label="Apellido"><input className="reserva-input" value={form.apellido} onChange={up('apellido')} /></Field>
        </div>
        <div className="reserva-field-grid">
          <Field label="Email"><input type="email" className="reserva-input" value={form.email} onChange={up('email')} /></Field>
          <Field label="Teléfono"><input type="tel" className="reserva-input" value={form.telefono} onChange={up('telefono')} /></Field>
        </div>
        <div className="reserva-field-grid">
          <Field label="Cargo">
            <select className="reserva-input" value={form.cargo} onChange={up('cargo')}>
              <option value="dueno">Dueño / Administrador</option>
              <option value="profesional">Profesional</option>
              <option value="recepcion">Recepción</option>
            </select>
          </Field>
          <Field label="Idioma">
            <select className="reserva-input" value={form.idioma} onChange={up('idioma')}>
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </Field>
        </div>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Seguridad</div>
        <div className="settings-row">
          <div className="settings-row-label">Contraseña<span>Última actualización hace 3 meses</span></div>
          <button className="btn-sm-ghost"><Icon name="lock" />Cambiar contraseña</button>
        </div>
        <div className="settings-row">
          <div className="settings-row-label">Verificación en dos pasos<span>Añade una capa extra de seguridad</span></div>
          <AgendaToggle value={form.dosPasos} onChange={v => set('dosPasos', v)} />
        </div>
      </div>
    </div>
  );
}

// ── MI NEGOCIO ────────────────────────────────────────────────────────────────

const RESERVA_PUBLIC_LINK = 'https://agnd.cl/reservar/estudio-roberto';

function NegocioSection() {
  const [form, setForm] = usePersistedState('cuenta.negocio', {
    nombre: 'Estudio Roberto', rubro: 'peluqueria', rut: '76.543.210-9',
    telefono: '+56 9 6543 2109', email: 'hola@estudioroberto.cl',
    direccion: 'Av. Providencia 1234, of. 56', comuna: 'Providencia', ciudad: 'Santiago',
    instagram: '@estudioroberto', sitio: 'estudioroberto.cl', reservasOnline: true,
  });
  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const [copied, setCopied] = React.useState(false);

  const copiar = async () => {
    try { await navigator.clipboard.writeText(RESERVA_PUBLIC_LINK); } catch (e) { /* mock */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cuenta-view">
      <CuentaHeader
        title="Mi negocio"
        desc="Los datos de tu negocio y tu página pública de reservas."
        actions={<SaveButton onSave={() => {}} />}
      />

      <div className="cuenta-card">
        <div className="cuenta-profile">
          <span className="cuenta-biz-logo"><Icon name="store" /></span>
          <div className="cuenta-profile-info">
            <div className="cuenta-profile-name">{form.nombre}</div>
            <div className="cuenta-profile-email">Peluquería y estética</div>
          </div>
          <button className="btn-sm-ghost"><Icon name="image" />Cambiar logo</button>
        </div>

        <div className="reserva-field-grid">
          <Field label="Nombre del negocio"><input className="reserva-input" value={form.nombre} onChange={up('nombre')} /></Field>
          <Field label="Rubro">
            <select className="reserva-input" value={form.rubro} onChange={up('rubro')}>
              <option value="peluqueria">Peluquería</option>
              <option value="estetica">Centro de estética</option>
              <option value="barberia">Barbería</option>
              <option value="spa">Spa / Masajes</option>
              <option value="unas">Manicure / Uñas</option>
              <option value="otro">Otro</option>
            </select>
          </Field>
        </div>
        <div className="reserva-field-grid">
          <Field label="RUT"><input className="reserva-input" value={form.rut} onChange={up('rut')} /></Field>
          <Field label="Teléfono"><input type="tel" className="reserva-input" value={form.telefono} onChange={up('telefono')} /></Field>
        </div>
        <Field label="Email de contacto"><input type="email" className="reserva-input" value={form.email} onChange={up('email')} /></Field>
        <Field label="Dirección"><input className="reserva-input" value={form.direccion} onChange={up('direccion')} /></Field>
        <div className="reserva-field-grid">
          <Field label="Comuna"><input className="reserva-input" value={form.comuna} onChange={up('comuna')} /></Field>
          <Field label="Ciudad"><input className="reserva-input" value={form.ciudad} onChange={up('ciudad')} /></Field>
        </div>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Reservas online</div>
        <div className="settings-row">
          <div className="settings-row-label">Aceptar reservas online<span>Permite que tus clientes agenden solos</span></div>
          <AgendaToggle value={form.reservasOnline} onChange={v => set('reservasOnline', v)} />
        </div>
        <Field label="Tu link público de reserva">
          <div className="input-with-action">
            <input className="reserva-input" value={RESERVA_PUBLIC_LINK} readOnly />
            <button className="btn-sm-ghost" onClick={copiar}>
              <Icon name={copied ? 'check' : 'copy'} />{copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </Field>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Redes y presencia</div>
        <div className="reserva-field-grid">
          <Field label="Instagram" opt><input className="reserva-input" value={form.instagram} onChange={up('instagram')} /></Field>
          <Field label="Sitio web" opt><input className="reserva-input" value={form.sitio} onChange={up('sitio')} /></Field>
        </div>
      </div>
    </div>
  );
}

// ── SUSCRIPCIÓN Y PLAN ────────────────────────────────────────────────────────

const PLANES = [
  {
    id: 'basico', nombre: 'Básico', precio: '$0', periodo: '/mes', desc: 'Para partir',
    features: ['1 colaborador', 'Hasta 50 citas al mes', 'Agenda online', 'Recordatorios por email'],
  },
  {
    id: 'pro', nombre: 'Pro', precio: '$19.990', periodo: '/mes', desc: 'Para negocios en crecimiento', actual: true,
    features: ['Hasta 5 colaboradores', 'Citas ilimitadas', 'Espacios y recursos', 'Recordatorios por WhatsApp', 'Reportes avanzados'],
  },
  {
    id: 'premium', nombre: 'Premium', precio: '$39.990', periodo: '/mes', desc: 'Para equipos grandes',
    features: ['Colaboradores ilimitados', 'Multi-sucursal', 'API e integraciones', 'Soporte prioritario', 'Marca personalizada'],
  },
];

const USO = [
  { label: 'Citas este mes', valor: 148, max: null, sub: 'Ilimitadas en tu plan' },
  { label: 'Colaboradores', valor: 3, max: 5 },
  { label: 'Espacios', valor: 2, max: 5 },
];

const FACTURAS = [
  { id: 1, fecha: '1 jun 2026', monto: '$19.990' },
  { id: 2, fecha: '1 may 2026', monto: '$19.990' },
  { id: 3, fecha: '1 abr 2026', monto: '$19.990' },
];

function PlanSection() {
  return (
    <div className="cuenta-view cuenta-view-wide">
      <CuentaHeader
        title="Suscripción y plan"
        desc="Tu plan actual, consumo y facturación."
      />

      <div className="cuenta-card plan-current">
        <div className="plan-current-main">
          <span className="plan-current-icon"><Icon name="crown" /></span>
          <div>
            <div className="plan-current-name">Plan Pro <span className="plan-badge">Actual</span></div>
            <div className="plan-current-sub">Se renueva el 1 de julio de 2026 · $19.990/mes</div>
          </div>
        </div>
        <button className="btn-sm-ghost">Administrar suscripción</button>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Consumo del plan</div>
        <div className="usage-list">
          {USO.map(u => {
            const pct = u.max ? Math.min(100, Math.round((u.valor / u.max) * 100)) : null;
            return (
              <div key={u.label} className="usage-row">
                <div className="usage-row-top">
                  <span className="usage-label">{u.label}</span>
                  <span className="usage-value">{u.max ? `${u.valor} / ${u.max}` : u.valor}</span>
                </div>
                {pct !== null
                  ? <div className="usage-bar"><div className="usage-bar-fill" style={{ width: `${pct}%` }} /></div>
                  : <div className="usage-sub">{u.sub}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="settings-section-title cuenta-block-title">Cambiar de plan</div>
        <div className="plan-grid">
          {PLANES.map(p => (
            <div key={p.id} className={`plan-card${p.actual ? ' featured' : ''}`}>
              <div className="plan-card-name">{p.nombre}{p.actual && <span className="plan-badge">Actual</span>}</div>
              <div className="plan-desc">{p.desc}</div>
              <div className="plan-price">{p.precio}<span>{p.periodo}</span></div>
              <div className="plan-features">
                {p.features.map(f => (
                  <div key={f} className="plan-feature"><Icon name="check" />{f}</div>
                ))}
              </div>
              <div className="plan-cta">
                {p.actual
                  ? <button className="btn-sm-ghost plan-cta-btn" disabled>Plan actual</button>
                  : <button className="btn-primary-sm plan-cta-btn">{p.precio === '$0' ? 'Cambiar a Básico' : `Cambiar a ${p.nombre}`}</button>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Método de pago</div>
        <div className="settings-row">
          <div className="settings-row-label cuenta-pay">
            <span className="cuenta-pay-icon"><Icon name="credit-card" /></span>
            <span>Visa terminada en 4242<span className="cuenta-pay-exp">Expira 09/2027</span></span>
          </div>
          <button className="btn-sm-ghost">Cambiar</button>
        </div>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Historial de facturación</div>
        <div className="billing-list">
          {FACTURAS.map(f => (
            <div key={f.id} className="billing-row">
              <div className="billing-row-main">
                <span className="billing-row-icon"><Icon name="file-text" /></span>
                <div>
                  <div className="billing-date">{f.fecha}</div>
                  <div className="billing-meta">Plan Pro · Pagada</div>
                </div>
              </div>
              <div className="billing-row-end">
                <span className="billing-amount">{f.monto}</span>
                <button className="entity-edit-btn" aria-label="Descargar"><Icon name="download" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CONFIGURACIÓN ─────────────────────────────────────────────────────────────

const CONFIG_ACENTOS = [
  { v: 'aqua',  l: 'Aqua',  c: '#4CD5D2' },
  { v: 'rose',  l: 'Rosa',  c: '#AA4465' },
  { v: 'plum',  l: 'Plum',  c: '#222A55' },
  { v: 'coral', l: 'Coral', c: '#FFA69E' },
];

function ConfigSection({ theme, onTweak }) {
  const [prefs, setPrefs] = usePersistedState('app.settings', {
    email: true, push: false, resumen: true, duracion: 60, primerDia: 'lun',
  });
  const setPref = (k, v) => setPrefs(p => ({ ...p, [k]: v }));
  const g = (k, d) => (prefs[k] === undefined ? d : prefs[k]);

  return (
    <div className="cuenta-view">
      <CuentaHeader
        title="Configuración"
        desc="Ajustes generales de tu cuenta y de la aplicación."
      />

      <div className="cuenta-card">
        <div className="settings-section-title">Apariencia</div>
        <div className="settings-row">
          <div className="settings-row-label">Modo oscuro<span>Cambia el tema de la interfaz</span></div>
          <AgendaToggle value={theme.dark} onChange={v => onTweak('dark', v)} />
        </div>
        <div className="settings-row">
          <div className="settings-row-label">Color de acento<span>Personaliza el color principal</span></div>
          <div className="color-swatches">
            {CONFIG_ACENTOS.map(a => (
              <button
                key={a.v}
                type="button"
                className={`color-swatch${theme.accent === a.v ? ' active' : ''}`}
                style={{ background: a.c }}
                onClick={() => onTweak('accent', a.v)}
                aria-label={a.l}
              />
            ))}
          </div>
        </div>
        <div className="settings-row">
          <div className="settings-row-label">Idioma de la interfaz</div>
          <select className="reserva-input settings-select" value={g('idioma', 'es')} onChange={e => setPref('idioma', e.target.value)}>
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
          </select>
        </div>
        <div className="settings-row">
          <div className="settings-row-label">Zona horaria</div>
          <select className="reserva-input settings-select" value={g('zona', 'scl')} onChange={e => setPref('zona', e.target.value)}>
            <option value="scl">Santiago (GMT-4)</option>
            <option value="bsas">Buenos Aires (GMT-3)</option>
            <option value="bog">Bogotá (GMT-5)</option>
            <option value="mex">Ciudad de México (GMT-6)</option>
          </select>
        </div>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Notificaciones</div>
        <div className="settings-row">
          <div className="settings-row-label">Recordatorios por email<span>Avisos automáticos a tus clientes</span></div>
          <AgendaToggle value={g('email', true)} onChange={v => setPref('email', v)} />
        </div>
        <div className="settings-row">
          <div className="settings-row-label">Notificaciones push<span>Alertas en este dispositivo</span></div>
          <AgendaToggle value={g('push', false)} onChange={v => setPref('push', v)} />
        </div>
        <div className="settings-row">
          <div className="settings-row-label">Resumen diario<span>Un correo con tu agenda del día</span></div>
          <AgendaToggle value={g('resumen', true)} onChange={v => setPref('resumen', v)} />
        </div>
      </div>

      <div className="cuenta-card">
        <div className="settings-section-title">Agenda</div>
        <div className="settings-row">
          <div className="settings-row-label">Duración por defecto</div>
          <select className="reserva-input settings-select" value={g('duracion', 60)} onChange={e => setPref('duracion', parseInt(e.target.value, 10))}>
            {[30, 45, 60, 90].map(m => <option key={m} value={m}>{m} min</option>)}
          </select>
        </div>
        <div className="settings-row">
          <div className="settings-row-label">Primer día de la semana</div>
          <select className="reserva-input settings-select" value={g('primerDia', 'lun')} onChange={e => setPref('primerDia', e.target.value)}>
            <option value="lun">Lunes</option>
            <option value="dom">Domingo</option>
          </select>
        </div>
      </div>

      <div className="cuenta-card cuenta-danger">
        <div className="settings-section-title">Zona de peligro</div>
        <div className="settings-row">
          <div className="settings-row-label">Exportar mis datos<span>Descarga toda tu información en un archivo</span></div>
          <button className="btn-sm-ghost"><Icon name="download" />Exportar</button>
        </div>
        <div className="settings-row">
          <div className="settings-row-label">Eliminar cuenta<span>Esta acción es permanente e irreversible</span></div>
          <button className="btn-danger-sm"><Icon name="trash-2" />Eliminar cuenta</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PerfilSection, NegocioSection, PlanSection, ConfigSection });
