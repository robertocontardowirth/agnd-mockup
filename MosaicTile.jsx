// MosaicTile.jsx — render any 3x3 binary pattern as the AGND mosaic
// pattern: 9-character string of '1' (filled) and '0' (empty), e.g. "010101101" for "A"
function MosaicTile({ pattern = "010101101", size = 64, on = "#4CD5D2", off = "#DEDAD2", bg = "transparent", style = {} }) {
  const cells = pattern.split('');
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: size * 0.04,
      width: size, height: size, padding: size * 0.05,
      background: bg, borderRadius: '22%', boxSizing: 'border-box', ...style,
    }}>
      {cells.map((c, i) => (
        <div key={i} style={{ background: c === '1' ? on : off, borderRadius: '26%' }} />
      ))}
    </div>
  );
}

// Letter patterns for the AGND alphabet
MosaicTile.PATTERNS = {
  A: "010101111",
  G: "111100111",
  N: "101111101",
  D: "110101110",
};

window.MosaicTile = MosaicTile;
