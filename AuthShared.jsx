// AuthShared.jsx — shared bits for auth pages (brand panel, mosaic bg, footer)

const lucide = (name, size = 16, color = 'currentColor') => (
  <i data-lucide={name} style={{ width: size, height: size, color }}></i>
);

// Generates a random-ish but stable mosaic bg pattern
function MosaicBackdrop({ seed = 7 }) {
  // 8 cols × 10 rows
  const cells = [];
  let s = seed;
  const rng = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < 80; i++) {
    const r = rng();
    let cls = 'cell';
    if (r < 0.42) cls += ' empty';
    else if (r < 0.78) cls += ' dim';
    else if (r < 0.93) cls += '';
    else cls += ' coral';
    cells.push(<div key={i} className={cls} />);
  }
  return <div className="brand-mosaic-bg">{cells}</div>;
}

// Logo wordmark for the auth top bar
const AuthBrand = () => (
  <a href="AGND Landing.html" className="brand-link" aria-label="AGND home">
    <Logo size={32} />
  </a>
);

// Right-side brand panel — quote variant (used in Register & Login)
function BrandPanelQuote({ quote, author, role, stats }) {
  return (
    <aside className="auth-brand-col">
      <MosaicBackdrop seed={11} />
      <div className="brand-noise" />
      <div className="brand-content">
        <div className="brand-quote">
          <span className="quote-mark">“</span>
          <p className="quote-text">{quote}</p>
          <div className="quote-author">
            <Avatar initials={author.split(' ').map(w => w[0]).slice(0,2).join('')} color="aqua" size={40} />
            <div>
              <div className="author-name">{author}</div>
              <div className="author-meta">{role}</div>
            </div>
          </div>
        </div>

        {stats && (
          <div className="brand-stats">
            {stats.map((s, i) => (
              <div className="brand-stat" key={i}>
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

// Right-side brand panel — mosaic showcase (used in Recovery)
function BrandPanelMosaic() {
  // Curated grid of mosaic tiles — lettering A-G-N-D + decorative
  const tiles = [
    { p: "010101111", on: "#4CD5D2" },           // A
    { p: "111100111", on: "#93E1D8" },           // G
    { p: "101111101", on: "#FFA69E" },           // N
    { p: "110101110", on: "#4CD5D2" },           // D
    { p: "011110110", on: "rgba(221,255,247,0.85)" },
    { p: "101010101", on: "#FFA69E" },
    { p: "111010111", on: "#93E1D8" },
    { p: "010111010", on: "#4CD5D2" },
    { p: "110011001", on: "rgba(221,255,247,0.85)" },
  ];
  return (
    <aside className="auth-brand-col">
      <MosaicBackdrop seed={31} />
      <div className="brand-noise" />
      <div className="brand-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MosaicTile pattern="010101111" size={32} on="#4CD5D2" off="rgba(221,255,247,0.18)" />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', color: '#DDFFF7' }}>AGND</span>
        </div>

        <div className="brand-showcase">
          <div className="brand-showcase-grid">
            {tiles.map((t, i) => (
              <MosaicTile key={i} pattern={t.p} size={92} on={t.on} off="rgba(221,255,247,0.10)" />
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, lineHeight: 1.3, color: '#DDFFF7', maxWidth: 380, margin: 0, letterSpacing: '-0.015em' }}>
            Tu agenda vuelve a ser tuya. Te ayudamos a recuperarla.
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(221,255,247,0.55)', textTransform: 'uppercase', marginTop: 14 }}>
            AGND · Soporte 24/7
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ rightLabel, rightLinkText, rightHref }) {
  return (
    <div className="auth-topbar">
      <AuthBrand />
      <div className="top-cta">
        {rightLabel} <a href={rightHref}>{rightLinkText}</a>
      </div>
    </div>
  );
}

function TinyFoot() {
  return (
    <div className="auth-tiny-foot">
      <span>© 2026 AGND.CL</span>
      <div style={{ display: 'flex', gap: 18 }}>
        <a href="AGND Terminos.html" target="_blank">Términos</a>
        <a href="AGND Privacidad.html" target="_blank">Privacidad</a>
        <a href="#">Soporte</a>
      </div>
    </div>
  );
}

function GoogleButton({ children = 'Continuar con Google' }) {
  return (
    <button className="social-btn" type="button" onClick={(e) => e.preventDefault()}>
      <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.79 2.71v2.26h2.9c1.7-1.56 2.69-3.87 2.69-6.61z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z"/>
        <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.16.29-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z"/>
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z"/>
      </svg>
      {children}
    </button>
  );
}

function PasswordField({ id, label, value, onChange, placeholder, showStrength, autoComplete = 'current-password', labelAside, floatLabel }) {
  const [visible, setVisible] = React.useState(false);
  const score = React.useMemo(() => {
    if (!value) return 0;
    let s = 0;
    if (value.length >= 8) s++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) s++;
    if (/\d/.test(value) || /[^A-Za-z0-9]/.test(value)) s++;
    return s;
  }, [value]);
  const labels = ['', 'Débil', 'Bien', 'Fuerte'];

  if (floatLabel) {
    return (
      <div className="fl-field fl-field--password">
        <div className="field-password">
          <input
            id={id}
            type={visible ? 'text' : 'password'}
            className="field-input"
            placeholder=" "
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
          />
          <button type="button" className="pw-toggle" onClick={() => setVisible(v => !v)} aria-label={visible ? 'Ocultar' : 'Mostrar'}>
            <i data-lucide={visible ? 'eye-off' : 'eye'} style={{ width: 16, height: 16 }}></i>
          </button>
        </div>
        <label htmlFor={id}>{label}</label>
        {showStrength && value && (
          <>
            <div className="pw-strength">
              <div className={`seg ${score >= 1 ? `on-${score}` : ''}`} />
              <div className={`seg ${score >= 2 ? `on-${score}` : ''}`} />
              <div className={`seg ${score >= 3 ? `on-${score}` : ''}`} />
            </div>
            <div className="pw-strength-label">
              Seguridad: <span className={`lvl-${score}`}>{labels[score]}</span>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        <span>{label}</span>
        {labelAside && <span className="label-aside">{labelAside}</span>}
      </label>
      <div className="field-password">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className="field-input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <button type="button" className="pw-toggle" onClick={() => setVisible(v => !v)} aria-label={visible ? 'Ocultar' : 'Mostrar'}>
          <i data-lucide={visible ? 'eye-off' : 'eye'} style={{ width: 16, height: 16 }}></i>
        </button>
      </div>
      {showStrength && value && (
        <>
          <div className="pw-strength">
            <div className={`seg ${score >= 1 ? `on-${score}` : ''}`} />
            <div className={`seg ${score >= 2 ? `on-${score}` : ''}`} />
            <div className={`seg ${score >= 3 ? `on-${score}` : ''}`} />
          </div>
          <div className="pw-strength-label">
            Seguridad: <span className={`lvl-${score}`}>{labels[score]}</span>
          </div>
        </>
      )}
    </div>
  );
}

Object.assign(window, {
  AuthBrand, BrandPanelQuote, BrandPanelMosaic,
  TopBar, TinyFoot, GoogleButton, PasswordField, MosaicBackdrop, lucide
});
