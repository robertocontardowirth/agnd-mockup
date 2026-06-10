// HeroVisual.jsx — composición principal del hero
// Booking card flotante sobre constelación mosaic animada

function HeroVisual() {
  // Patrón mosaic de fondo: tiles iluminándose en secuencia
  // 7 cols × 9 rows = 63 cells; algunas "encendidas" formando constelación
  const ROWS = 9, COLS = 7;
  const TOTAL = ROWS * COLS;
  // Cells con clase 'on' (aqua), 'rose' o 'coral'
  const onCells = new Set([3, 9, 10, 16, 22, 25, 31, 38, 44, 51, 55, 60]);
  const roseCells = new Set([13, 27, 47]);
  const coralCells = new Set([5, 33, 58]);

  return (
    <div className="hero-visual">
      {/* Fondo: constelación mosaic */}
      <div className="hero-mosaic-bg">
        {Array.from({ length: TOTAL }).map((_, i) => {
          const cls = onCells.has(i)
            ? 'cell on'
            : roseCells.has(i)
              ? 'cell rose'
              : coralCells.has(i)
                ? 'cell coral'
                : 'cell';
          const style = onCells.has(i) || roseCells.has(i) || coralCells.has(i)
            ? { animationDelay: `${(i * 173) % 4000}ms` }
            : {};
          return <div key={i} className={cls} style={style} />;
        })}
      </div>

      {/* Booking card flotante */}
      <div style={{
        position: 'absolute',
        right: '4%', top: '6%',
        width: '78%', maxWidth: 460,
        zIndex: 2,
        transform: 'rotate(-2deg)',
      }}>
        <BookingCardMock />
      </div>

      {/* Etiqueta flotante "tu marca" */}
      <div style={{
        position: 'absolute',
        left: '0%', bottom: '8%',
        background: 'var(--agnd-plum-500)',
        color: 'var(--agnd-mint-100)',
        padding: '12px 18px',
        borderRadius: 14,
        fontSize: 13,
        fontWeight: 500,
        boxShadow: 'var(--shadow-md)',
        transform: 'rotate(3deg)',
        zIndex: 3,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: 22,
          background: 'var(--agnd-aqua-300)',
        }} />
        agendamiento.tumarca.cl
      </div>

      {/* Etiqueta flotante "confirmado" */}
      <div style={{
        position: 'absolute',
        right: '-2%', bottom: '14%',
        background: 'var(--agnd-coral-400)',
        color: 'var(--agnd-rose-700)',
        padding: '10px 16px',
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 600,
        boxShadow: 'var(--shadow-md)',
        transform: 'rotate(-4deg)',
        zIndex: 3,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.04em',
      }}>
        ✓ confirmado · martes 14:30
      </div>
    </div>
  );
}

function BookingCardMock() {
  const days = [
    'L', 'M', 'M', 'J', 'V', 'S', 'D'
  ];
  // Calendar grid: 35 cells, primer día martes (offset 1)
  const calCells = [];
  for (let i = 0; i < 35; i++) {
    const dayNum = i - 0; // primero del mes en posición 0
    if (dayNum < 0 || dayNum > 30) {
      calCells.push({ muted: true, n: '' });
    } else {
      const available = [3, 4, 8, 9, 10, 14, 15, 17, 21, 22, 23, 28, 29].includes(dayNum);
      const selected = dayNum === 14;
      calCells.push({ muted: false, n: dayNum + 1, available, selected });
    }
  }

  return (
    <div className="booking-card">
      <div className="booking-header">
        <div className="booking-avatar">CV</div>
        <div>
          <div className="booking-name">Camila Valdés</div>
          <div className="booking-role">Estudio de fotografía</div>
        </div>
      </div>

      <div className="booking-title">Sesión retrato — 45 min</div>
      <div className="booking-duration">
        <span><i data-lucide="clock" style={{ width: 14, height: 14 }} /> 45 min</span>
        <span><i data-lucide="map-pin" style={{ width: 14, height: 14 }} /> Providencia</span>
      </div>

      <div className="booking-calendar">
        <div className="cal-month">
          <strong>Octubre 2026</strong>
          <span style={{ display: 'flex', gap: 6 }}>
            <span style={{
              width: 22, height: 22, borderRadius: 6,
              background: 'rgba(34,42,85,0.06)',
              display: 'grid', placeItems: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--fg-2)',
            }}>‹</span>
            <span style={{
              width: 22, height: 22, borderRadius: 6,
              background: 'rgba(34,42,85,0.06)',
              display: 'grid', placeItems: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--fg-2)',
            }}>›</span>
          </span>
        </div>
        <div className="cal-grid">
          {days.map((d, i) => <div key={'d'+i} className="cal-dow">{d}</div>)}
          {calCells.map((c, i) => (
            <div
              key={i}
              className={[
                'cal-day',
                c.muted ? 'muted' : '',
                c.available && !c.selected ? 'available' : '',
                c.selected ? 'selected' : '',
              ].filter(Boolean).join(' ')}
            >{c.n}</div>
          ))}
        </div>
        <div className="booking-slots">
          <div className="slot">12:00</div>
          <div className="slot active">14:30</div>
          <div className="slot">17:00</div>
        </div>
      </div>
    </div>
  );
}

window.HeroVisual = HeroVisual;
window.BookingCardMock = BookingCardMock;
