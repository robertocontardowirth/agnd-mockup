// PagosSection.jsx — Sección Pagos: ver los movimientos de pago del estudio.
// Vista de solo lectura: Transacciones (listado + filtros) y Resumen (KPIs).

// ── MOCK DATA ────────────────────────────────────────────────────────────────

// Métodos de pago con su icono y etiqueta.
const PAGO_METODOS = {
  efectivo:     { label: 'Efectivo',      icon: 'banknote' },
  debito:       { label: 'Débito',        icon: 'credit-card' },
  credito:      { label: 'Crédito',       icon: 'credit-card' },
  transferencia:{ label: 'Transferencia', icon: 'arrow-down-up' },
  app:          { label: 'App / online',  icon: 'smartphone' },
};

// Estados de un pago → badge reutilizado de app.css.
const PAGO_ESTADOS = {
  pagado:      { label: 'Pagado',      badge: 'badge-confirmed' },
  pendiente:   { label: 'Pendiente',   badge: 'badge-pending' },
  reembolsado: { label: 'Reembolsado', badge: 'badge-cancelled' },
};

const MOCK_PAGOS = [
  { id: 1,  fecha: '2026-06-25', cliente: 'Valentina Rojas',  servicio: 'Corte + peinado',     metodo: 'debito',        estado: 'pagado',      monto: 28000 },
  { id: 2,  fecha: '2026-06-25', cliente: 'Jorge Salazar',    servicio: 'Corte caballero',     metodo: 'efectivo',      estado: 'pagado',      monto: 15000 },
  { id: 3,  fecha: '2026-06-24', cliente: 'Camila Fuentes',   servicio: 'Coloración completa', metodo: 'credito',       estado: 'pagado',      monto: 62000 },
  { id: 4,  fecha: '2026-06-24', cliente: 'Fernanda Muñoz',   servicio: 'Manicure',            metodo: 'app',           estado: 'pagado',      monto: 18000 },
  { id: 5,  fecha: '2026-06-24', cliente: 'Andrés Pizarro',   servicio: 'Barba + perfilado',   metodo: 'transferencia', estado: 'pendiente',   monto: 12000 },
  { id: 6,  fecha: '2026-06-23', cliente: 'Josefa Carrasco',  servicio: 'Tratamiento capilar', metodo: 'debito',        estado: 'pagado',      monto: 35000 },
  { id: 7,  fecha: '2026-06-23', cliente: 'Matías Herrera',   servicio: 'Corte + barba',       metodo: 'efectivo',      estado: 'pagado',      monto: 22000 },
  { id: 8,  fecha: '2026-06-22', cliente: 'Daniela Vega',     servicio: 'Coloración raíz',     metodo: 'credito',       estado: 'reembolsado', monto: 40000 },
  { id: 9,  fecha: '2026-06-22', cliente: 'Sebastián Núñez',  servicio: 'Corte caballero',     metodo: 'app',           estado: 'pagado',      monto: 15000 },
  { id: 10, fecha: '2026-06-21', cliente: 'Antonia Silva',    servicio: 'Peinado evento',      metodo: 'transferencia', estado: 'pagado',      monto: 45000 },
  { id: 11, fecha: '2026-06-21', cliente: 'Ignacio Rojas',    servicio: 'Corte niño',          metodo: 'efectivo',      estado: 'pagado',      monto: 10000 },
  { id: 12, fecha: '2026-06-20', cliente: 'Catalina Bravo',   servicio: 'Manicure + pedicure', metodo: 'debito',        estado: 'pendiente',   monto: 30000 },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────

// Formato de pesos chilenos: $28.000
function fmtCLP(n) {
  return '$' + Number(n || 0).toLocaleString('es-CL');
}

// 2026-06-25 → "25 jun"
const MESES_CORTO = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
function fmtFechaCorta(iso) {
  const [y, m, d] = iso.split('-');
  return `${parseInt(d, 10)} ${MESES_CORTO[parseInt(m, 10) - 1]}`;
}

// ── TRANSACCIONES ─────────────────────────────────────────────────────────────

function MetodoTag({ metodo }) {
  const m = PAGO_METODOS[metodo] || { label: metodo, icon: 'wallet' };
  return (
    <span className="pago-metodo">
      <Icon name={m.icon} />
      <span>{m.label}</span>
    </span>
  );
}

function TransaccionesView({ pagos }) {
  const [query, setQuery] = React.useState('');
  const [metodo, setMetodo] = React.useState('todos');
  const [estado, setEstado] = React.useState('todos');

  const q = query.trim().toLowerCase();
  const filtered = pagos.filter(p =>
    (!q || p.cliente.toLowerCase().includes(q) || p.servicio.toLowerCase().includes(q)) &&
    (metodo === 'todos' || p.metodo === metodo) &&
    (estado === 'todos' || p.estado === estado));

  const total = filtered
    .filter(p => p.estado === 'pagado')
    .reduce((s, p) => s + p.monto, 0);

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Transacciones</div>
          <div className="agenda-config-desc">Todos los pagos registrados en tu estudio.</div>
        </div>
        <button className="btn-sm-ghost" onClick={() => {}}>
          <Icon name="download" />Exportar
        </button>
      </div>

      <div className="mgmt-toolbar">
        <div className="mgmt-search">
          <Icon name="search" />
          <input placeholder="Buscar por cliente o servicio…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <select className="pago-filter" value={metodo} onChange={e => setMetodo(e.target.value)}>
          <option value="todos">Todos los métodos</option>
          {Object.entries(PAGO_METODOS).map(([k, m]) => <option key={k} value={k}>{m.label}</option>)}
        </select>
        <select className="pago-filter" value={estado} onChange={e => setEstado(e.target.value)}>
          <option value="todos">Todos los estados</option>
          {Object.entries(PAGO_ESTADOS).map(([k, e]) => <option key={k} value={k}>{e.label}</option>)}
        </select>
      </div>

      <div className="agenda-table">
        <div className="agenda-table-head pago-row">
          <div>Fecha</div>
          <div>Cliente</div>
          <div>Servicio</div>
          <div>Método</div>
          <div>Estado</div>
          <div className="pago-monto-col">Monto</div>
        </div>

        {filtered.length === 0 ? (
          <div className="clientes-empty"><Icon name="receipt" /><span>Sin transacciones</span></div>
        ) : filtered.map(p => {
          const est = PAGO_ESTADOS[p.estado] || { label: p.estado, badge: 'badge-regular' };
          return (
            <div key={p.id} className="agenda-table-row pago-row">
              <div className="pago-fecha">{fmtFechaCorta(p.fecha)}</div>
              <div className="entity-row-strong">{p.cliente}</div>
              <div className="pago-servicio">{p.servicio}</div>
              <div><MetodoTag metodo={p.metodo} /></div>
              <div><span className={`badge ${est.badge}`}>{est.label}</span></div>
              <div className="pago-monto-col pago-monto">{fmtCLP(p.monto)}</div>
            </div>
          );
        })}
      </div>

      {filtered.length > 0 && (
        <div className="pago-total-bar">
          <span>{filtered.length} {filtered.length === 1 ? 'transacción' : 'transacciones'}</span>
          <span className="pago-total-val">Total pagado · {fmtCLP(total)}</span>
        </div>
      )}
    </div>
  );
}

// ── RESUMEN ───────────────────────────────────────────────────────────────────

function StatCard({ icon, value, label, accent }) {
  return (
    <div className={`dash-stat-card${accent ? ' accent' : ''}`}>
      <div className="dash-stat-icon"><Icon name={icon} /></div>
      <div className="dash-stat-text">
        <div className="dash-stat-value">{value}</div>
        <div className="dash-stat-label">{label}</div>
      </div>
    </div>
  );
}

function ResumenView({ pagos }) {
  const pagados = pagos.filter(p => p.estado === 'pagado');
  const ingresos = pagados.reduce((s, p) => s + p.monto, 0);
  const pendiente = pagos.filter(p => p.estado === 'pendiente').reduce((s, p) => s + p.monto, 0);
  const ticket = pagados.length ? Math.round(ingresos / pagados.length) : 0;

  // Desglose por método (solo pagos cobrados).
  const porMetodo = Object.keys(PAGO_METODOS).map(k => ({
    k,
    label: PAGO_METODOS[k].label,
    icon: PAGO_METODOS[k].icon,
    monto: pagados.filter(p => p.metodo === k).reduce((s, p) => s + p.monto, 0),
  })).filter(m => m.monto > 0).sort((a, b) => b.monto - a.monto);

  const maxMetodo = porMetodo.reduce((m, x) => Math.max(m, x.monto), 0) || 1;

  return (
    <div className="mgmt-view">
      <div className="agenda-config-header">
        <div>
          <div className="agenda-config-title">Resumen</div>
          <div className="agenda-config-desc">Ingresos y desglose de los últimos pagos.</div>
        </div>
      </div>

      <div className="dash-stats-row">
        <StatCard icon="circle-dollar-sign" value={fmtCLP(ingresos)} label="Ingresos cobrados" accent />
        <StatCard icon="receipt" value={pagados.length} label="Pagos cobrados" />
        <StatCard icon="trending-up" value={fmtCLP(ticket)} label="Ticket promedio" />
        <StatCard icon="wallet" value={fmtCLP(pendiente)} label="Pendiente por cobrar" />
      </div>

      <div className="pago-breakdown">
        <div className="pago-breakdown-title">Ingresos por método de pago</div>
        {porMetodo.map(m => (
          <div key={m.k} className="pago-breakdown-row">
            <span className="pago-breakdown-label"><Icon name={m.icon} />{m.label}</span>
            <div className="pago-breakdown-track">
              <div className="pago-breakdown-fill" style={{ width: `${(m.monto / maxMetodo) * 100}%` }} />
            </div>
            <span className="pago-breakdown-val">{fmtCLP(m.monto)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

function PagosSection({ sub }) {
  const pagos = window.MOCK_PAGOS || MOCK_PAGOS;
  const view = sub || 'transacciones';
  if (view === 'resumen') return <ResumenView pagos={pagos} />;
  return <TransaccionesView pagos={pagos} />;
}

Object.assign(window, { PagosSection, MOCK_PAGOS, PAGO_METODOS, PAGO_ESTADOS });
