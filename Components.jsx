// Components.jsx — UI kit primitives for the AGND agenda

// Icon — renderiza un ícono Lucide como <svg> que React controla por completo.
// Evita lucide.createIcons(), que reemplaza el <i> por fuera de React y provoca
// crashes de removeChild/appendChild al desmontar (panel, modal, listas).
function lucideNode(name) {
  const pascal = String(name).split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  const L = window.lucide;
  return (L && L.icons && L.icons[pascal]) || (L && L[pascal]) || null;
}

function lucideInnerHtml(node) {
  return node.map(([tag, attrs]) => {
    const a = Object.entries(attrs || {})
      .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
      .join(' ');
    return `<${tag} ${a}></${tag}>`;
  }).join('');
}

function Icon({ name, size, className, style, strokeWidth }) {
  const node = lucideNode(name);
  if (!node) return null;
  const s = size || 24;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon${className ? ' ' + className : ''}`}
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: lucideInnerHtml(node) }}
    />
  );
}

// Modal — shell centrado reutilizable: overlay, Escape, bloqueo de scroll.
function Modal({ title, eyebrow, onClose, children, footer }) {
  React.useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            {eyebrow && <div className="modal-eyebrow">{eyebrow}</div>}
            <div className="modal-title">{title}</div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar"><Icon name="x" /></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

const Logo = ({ size = 28 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
    <MosaicTile pattern="010101111" size={size} on="#4CD5D2" off="#DEDAD2" />
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size * 0.72, color: 'var(--fg-1)', letterSpacing: '-0.025em' }}>AGND</span>
  </div>
);

const Button = ({ variant = 'primary', size = 'md', children, onClick, icon, disabled }) => {
  const base = {
    fontFamily: 'var(--font-body)', fontWeight: 600, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 120ms var(--ease-out)',
    opacity: disabled ? 0.4 : 1,
  };
  const sizes = {
    sm: { fontSize: 13, padding: '7px 14px', borderRadius: 8 },
    md: { fontSize: 14, padding: '10px 18px', borderRadius: 10 },
    lg: { fontSize: 16, padding: '14px 24px', borderRadius: 12 },
  };
  const variants = {
    primary: { background: '#222A55', color: '#FBFAF7' },
    accent:  { background: '#AA4465', color: '#fff' },
    ghost:   { background: 'transparent', color: '#222A55', border: '1.5px solid #222A55' },
    soft:    { background: '#DDFFF7', color: '#2A8F8C' },
    link:    { background: 'transparent', color: '#AA4465', padding: '10px 0' },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant] }}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, placeholder, type = 'text', error, autoFocus }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && <label style={{ fontSize: 12, fontWeight: 600, color: '#222A55' }}>{label}</label>}
    <input
      type={type}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      style={{
        fontFamily: 'var(--font-body)', fontSize: 14, color: '#1F1B25',
        background: '#FFFFFF', border: `1px solid ${error ? '#AA4465' : '#E6E1DA'}`,
        borderRadius: 10, padding: '10px 14px', outline: 'none', transition: 'all 150ms var(--ease-out)',
      }}
      onFocus={(e) => { e.target.style.borderColor = '#222A55'; e.target.style.boxShadow = '0 0 0 4px rgba(147,225,216,0.45)'; }}
      onBlur={(e) => { e.target.style.borderColor = error ? '#AA4465' : '#E6E1DA'; e.target.style.boxShadow = 'none'; }}
    />
    {error && <div style={{ fontSize: 11, color: '#AA4465' }}>{error}</div>}
  </div>
);

const Card = ({ children, tinted, dark, style }) => {
  const variants = {
    default: { background: '#fff', border: '1px solid #E6E1DA', color: '#222A55' },
    tinted:  { background: '#DDFFF7', border: '1px solid #C2EFE8', color: '#222A55' },
    dark:    { background: '#222A55', border: 'none', color: '#DDFFF7' },
  };
  const v = dark ? variants.dark : tinted ? variants.tinted : variants.default;
  return (
    <div style={{ ...v, borderRadius: 16, padding: 20, boxShadow: '0 2px 6px rgba(34, 42, 85,0.06)', ...style }}>
      {children}
    </div>
  );
};

const Badge = ({ children, color = 'mint', dot }) => {
  const colors = {
    mint:  { bg: '#DDFFF7', fg: '#2A8F8C' },
    coral: { bg: '#FFD3CE', fg: '#7A2E48' },
    bone:  { bg: '#F2EFE9', fg: '#5B4C66' },
    plum:  { bg: '#222A55', fg: '#DDFFF7' },
    rose:  { bg: '#AA4465', fg: '#fff' },
  };
  const c = colors[color] || colors.mint;
  return (
    <span style={{ background: c.bg, color: c.fg, fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.fg, opacity: 0.8 }} />}
      {children}
    </span>
  );
};

const Avatar = ({ initials, color = 'plum', size = 36 }) => {
  const colors = {
    plum:  { bg: '#222A55', fg: '#DDFFF7' },
    rose:  { bg: '#AA4465', fg: '#fff' },
    aqua:  { bg: '#93E1D8', fg: '#2A8F8C' },
    coral: { bg: '#FFA69E', fg: '#7A2E48' },
  };
  const c = colors[color] || colors.plum;
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: c.bg, color: c.fg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: size * 0.36 }}>
      {initials}
    </div>
  );
};

const Divider = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 6, maxWidth: 320, margin: '24px auto' }}>
    {['#93E1D8','#DEDAD2','#93E1D8','#93E1D8','#DEDAD2','#FFA69E','#DEDAD2','#AA4465','#DEDAD2'].map((c, i) => (
      <div key={i} style={{ aspectRatio: '1', borderRadius: '22%', background: c }} />
    ))}
  </div>
);

Object.assign(window, { Icon, Modal, Logo, Button, Input, Card, Badge, Avatar, Divider });
