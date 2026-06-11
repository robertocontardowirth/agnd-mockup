// RegisterApp.jsx — flujo de registro AGND (3 pasos)

const IcoArrowLeft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const IcoArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const IcoRocket     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;

const STEP_LABELS = ['Crear cuenta', 'Tu negocio', 'Disponibilidad'];

const CATEGORIAS = [
  { value: 'salud',       label: 'Salud y bienestar' },
  { value: 'belleza',     label: 'Belleza y estética' },
  { value: 'deporte',     label: 'Deporte y fitness' },
  { value: 'educacion',   label: 'Educación y tutorías' },
  { value: 'nutricion',   label: 'Nutrición y dietética' },
  { value: 'masajes',     label: 'Masajes y terapias' },
  { value: 'veterinaria', label: 'Veterinaria' },
  { value: 'otro',        label: 'Otro' },
];

const ZONAS = [
  { value: 'America/Santiago',     label: 'Santiago (GMT-3 / -4)' },
  { value: 'America/Buenos_Aires', label: 'Buenos Aires (GMT-3)' },
  { value: 'America/Lima',         label: 'Lima (GMT-5)' },
  { value: 'America/Bogota',       label: 'Bogotá (GMT-5)' },
  { value: 'America/Mexico_City',  label: 'Ciudad de México (GMT-6)' },
  { value: 'America/Sao_Paulo',    label: 'São Paulo (GMT-3)' },
];

const DAYS = [
  { key: 'lun', label: 'Lunes' },
  { key: 'mar', label: 'Martes' },
  { key: 'mie', label: 'Miércoles' },
  { key: 'jue', label: 'Jueves' },
  { key: 'vie', label: 'Viernes' },
  { key: 'sab', label: 'Sábado' },
  { key: 'dom', label: 'Domingo' },
];

const DEFAULT_SCHEDULE = {
  lun: { on: true,  from: '09:00', to: '18:00' },
  mar: { on: true,  from: '09:00', to: '18:00' },
  mie: { on: true,  from: '09:00', to: '18:00' },
  jue: { on: true,  from: '09:00', to: '18:00' },
  vie: { on: true,  from: '09:00', to: '18:00' },
  sab: { on: false, from: '09:00', to: '14:00' },
  dom: { on: false, from: '09:00', to: '14:00' },
};

function RegStepper({ step }) {
  return (
    <div className="reg-stepper">
      {STEP_LABELS.map((lbl, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className={`reg-step-line${step > i ? ' done' : ''}`} />}
          <div className={`reg-step-node${step === i + 1 ? ' active' : ''}${step > i + 1 ? ' done' : ''}`}>
            {step > i + 1
              ? <i data-lucide="check" style={{ width: 10, height: 10 }} />
              : i + 1}
          </div>
        </React.Fragment>
      ))}
      <span className="reg-step-label">Paso {step} · {STEP_LABELS[step - 1]}</span>
    </div>
  );
}

/* ── Paso 1: cuenta ───────────────────────────────────────────── */
function Step1({ form, update, blur, touched, onNext }) {
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);
  const emailErr   = touched.email && form.email && !emailValid;
  const canNext    = form.name && form.business && emailValid && form.password.length >= 8 && form.terms;

  return (
    <>
      <div className="auth-eyebrow">Empieza gratis</div>
      <h1 className="auth-title">Agenda <span className="accent">ahora</span>.</h1>
      <p className="auth-sub">Sin tarjeta, sin compromisos. En menos de 5 minutos empiezas a recibir reservas.</p>

      <form onSubmit={(e) => { e.preventDefault(); if (canNext) onNext(); }} noValidate>
        <GoogleButton>Registrarme con Google</GoogleButton>
        <div className="auth-divider">o con tu email</div>

        <div className="field-group">
          <div className="field-row">
            <div className="fl-field">
              <input id="name" placeholder=" " value={form.name} onChange={update('name')} autoComplete="name" />
              <label htmlFor="name">Nombre completo</label>
            </div>
            <div className="fl-field">
              <input id="business" placeholder=" " value={form.business} onChange={update('business')} autoComplete="organization" />
              <label htmlFor="business">Nombre del negocio</label>
            </div>
          </div>

          <div className="fl-field">
            <input id="email" type="email" placeholder=" "
              className={emailErr ? 'error' : ''}
              value={form.email} onChange={update('email')} onBlur={blur('email')} autoComplete="email" />
            <label htmlFor="email">Email</label>
            {emailErr && (
              <div className="field-hint error">
                <i data-lucide="alert-circle" style={{ width: 12, height: 12 }}></i> Revisa el formato del email.
              </div>
            )}
          </div>

          <PasswordField
            id="password" label="Contraseña"
            value={form.password} onChange={update('password')}
            showStrength floatLabel autoComplete="new-password"
          />
        </div>

        <label className="checkbox-row" style={{ marginBottom: 8 }}>
          <input type="checkbox" checked={form.terms} onChange={update('terms')} />
          <span>Acepto los <a href="terminos.html" target="_blank">Términos</a> y la <a href="privacidad.html" target="_blank">Política de privacidad</a>.</span>
        </label>

        <button type="submit" className="btn btn-primary auth-submit" disabled={!canNext}>
          Continuar <IcoArrowRight />
        </button>

        <div className="auth-footer">
          ¿Ya tienes cuenta? <a href="login.html">Inicia sesión</a>
        </div>
      </form>
    </>
  );
}

/* ── Paso 2: negocio ──────────────────────────────────────────── */
function Step2({ form, update, onNext, onBack }) {
  const canNext = form.categoria && form.zona;

  return (
    <>
      <h1 className="auth-title">Tu <span className="accent">negocio</span>.</h1>
      <p className="auth-sub">
        Cuéntanos un poco sobre {form.business || 'tu negocio'} para personalizar tu experiencia.
      </p>

      <form onSubmit={(e) => { e.preventDefault(); if (canNext) onNext(); }} noValidate>
        <div className="field-group">
          <div className="fl-field fl-field--select">
            <select id="categoria" value={form.categoria} onChange={update('categoria')}
              className={form.categoria ? 'has-value' : ''}>
              <option value="" disabled> </option>
              {CATEGORIAS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <label htmlFor="categoria">Categoría del negocio</label>
          </div>

          <div className="fl-field fl-field--select">
            <select id="zona" value={form.zona} onChange={update('zona')}
              className={form.zona ? 'has-value' : ''}>
              <option value="" disabled> </option>
              {ZONAS.map(z => <option key={z.value} value={z.value}>{z.label}</option>)}
            </select>
            <label htmlFor="zona">Zona horaria</label>
          </div>

          <div className="fl-field">
            <input id="telefono" type="tel" placeholder=" "
              value={form.telefono} onChange={update('telefono')} autoComplete="tel" />
            <label htmlFor="telefono">
              Teléfono de contacto <span className="fl-optional">(opcional)</span>
            </label>
          </div>

          <div className="fl-field">
            <input id="direccion" placeholder=" "
              value={form.direccion} onChange={update('direccion')} autoComplete="street-address" />
            <label htmlFor="direccion">
              Dirección <span className="fl-optional">(opcional)</span>
            </label>
          </div>
        </div>

        <div className="step-nav">
          <button type="button" className="btn btn-ghost step-back" onClick={onBack}>
            <IcoArrowLeft /> Volver
          </button>
          <button type="submit" className="btn btn-primary auth-submit step-next" disabled={!canNext}>
            Continuar <IcoArrowRight />
          </button>
        </div>
      </form>
    </>
  );
}

/* ── Paso 3: disponibilidad ───────────────────────────────────── */
function Step3({ onBack }) {
  const [schedule, setSchedule] = React.useState(DEFAULT_SCHEDULE);
  const [submitting, setSubmitting] = React.useState(false);

  const toggleDay  = (key) => setSchedule(s => ({ ...s, [key]: { ...s[key], on: !s[key].on } }));
  const setTime    = (key, field) => (e) => setSchedule(s => ({ ...s, [key]: { ...s[key], [field]: e.target.value } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { window.location.href = 'app.html'; }, 1200);
  };

  const activeDays = DAYS.filter(d => schedule[d.key].on).length;

  return (
    <>
      <h1 className="auth-title">Tu <span className="accent">disponibilidad</span>.</h1>
      <p className="auth-sub">
        ¿Cuándo atiendes? Podés ajustar esto en cualquier momento desde tu agenda.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="schedule-grid">
          {DAYS.map(day => {
            const row = schedule[day.key];
            return (
              <div key={day.key} className={`schedule-row${row.on ? ' active' : ''}`}>
                <button
                  type="button"
                  className={`day-toggle${row.on ? ' on' : ''}`}
                  onClick={() => toggleDay(day.key)}
                  aria-pressed={row.on}
                  aria-label={`${row.on ? 'Desactivar' : 'Activar'} ${day.label}`}
                >
                  <span className="day-toggle-dot" />
                </button>
                <span className="day-label">{day.label}</span>
                <div className="day-times">
                  <input type="time" className="time-input" value={row.from} onChange={setTime(day.key, 'from')} disabled={!row.on} />
                  <span className="time-sep">→</span>
                  <input type="time" className="time-input" value={row.to} onChange={setTime(day.key, 'to')} disabled={!row.on} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="schedule-summary">
          <i data-lucide="clock" style={{ width: 14, height: 14 }} />
          {activeDays === 0
            ? 'Ningún día activo'
            : `${activeDays} día${activeDays !== 1 ? 's' : ''} de atención configurado${activeDays !== 1 ? 's' : ''}`}
        </div>

        <div className="step-nav">
          <button type="button" className="btn btn-ghost step-back" onClick={onBack}>
            <IcoArrowLeft /> Volver
          </button>
          <button
            type="submit"
            className={`btn btn-primary auth-submit step-next${submitting ? ' is-loading' : ''}`}
            disabled={submitting || activeDays === 0}
          >
            {submitting
              ? <><span className="spinner" /> Configurando…</>
              : <>Comenzar <IcoRocket /></>}
          </button>
        </div>
      </form>
    </>
  );
}

/* ── Root ─────────────────────────────────────────────────────── */
function RegisterApp() {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    name: '', business: '', email: '', password: '', terms: false,
    categoria: '', zona: 'America/Santiago', telefono: '', direccion: '',
  });
  const [touched, setTouched] = React.useState({});

  const update = (k) => (e) =>
    setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const blur = (k) => () => setTouched(t => ({ ...t, [k]: true }));

  React.useEffect(() => {
    requestAnimationFrame(() => {
      if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
    });
  });

  return (
    <div className="auth-shell">
      <main className="auth-form-col">
        <TopBar rightLabel="¿Ya tienes cuenta?" rightLinkText="Inicia sesión" rightHref="login.html" />

        <div className="auth-form-wrap">
          <RegStepper step={step} />

          {step === 1 && (
            <Step1 form={form} update={update} blur={blur} touched={touched} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <Step2 form={form} update={update} onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <Step3 onBack={() => setStep(2)} />
          )}
        </div>

        <TinyFoot />
      </main>

      <BrandPanelQuote
        quote="Pasé de un cuaderno y mil mensajes de WhatsApp a una agenda que se llena sola. AGND me devolvió mis sábados."
        author="Valentina Soto"
        role="Estudio Pétalo · Providencia"
        stats={[
          { num: '+12k', label: 'Negocios activos' },
          { num: '4.9',  label: 'Rating App Store' },
          { num: '0%',   label: 'Comisión por cita' },
        ]}
      />
    </div>
  );
}

window.RegisterApp = RegisterApp;
