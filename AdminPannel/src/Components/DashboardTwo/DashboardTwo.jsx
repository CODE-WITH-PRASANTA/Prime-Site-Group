import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import "./DashboardTwo.css";

/* ------------------------------------------------------------------
   HOW TO ADD YOUR OWN BACKGROUND IMAGE (right card)
   1. import bg from "../../assets/building.png";
   2. <DashboardTwo bgImage={bg} onViewWebsite={() => {}} />
   Without an image, a glass-building illustration is shown.

   Chart data: edit DEFAULT_DATA below or pass a `data` prop.
------------------------------------------------------------------- */
const DEFAULT_DATA = {
  3: [
    { label: "Sep", value: 120 },
    { label: "Oct", value: 150 },
    { label: "Nov", value: 170 },
  ],
  6: [
    { label: "Jun", value: 65 },
    { label: "Jul", value: 90 },
    { label: "Aug", value: 70 },
    { label: "Sep", value: 120 },
    { label: "Oct", value: 150 },
    { label: "Nov", value: 170 },
  ],
  12: [
    { label: "Dec", value: 40 },
    { label: "Jan", value: 55 },
    { label: "Feb", value: 48 },
    { label: "Mar", value: 80 },
    { label: "Apr", value: 72 },
    { label: "May", value: 95 },
    { label: "Jun", value: 65 },
    { label: "Jul", value: 90 },
    { label: "Aug", value: 70 },
    { label: "Sep", value: 120 },
    { label: "Oct", value: 150 },
    { label: "Nov", value: 170 },
  ],
};

const RANGES = [
  { value: 3, label: "Last 3 Months" },
  { value: 6, label: "Last 6 Months" },
  { value: 12, label: "Last 12 Months" },
];

const Y_MAX = 200;
const Y_TICKS = [0, 50, 100, 150, 200];

/* ---------------- Smooth (monotone) curve ----------------
   Smooth like a real chart, but never overshoots the data.
------------------------------------------------------------------- */
const monotonePath = (pts) => {
  const n = pts.length;
  if (n === 0) return "";
  if (n === 1) return `M${pts[0].x},${pts[0].y}`;

  const dx = [];
  const d = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = pts[i + 1].x - pts[i].x;
    d[i] = (pts[i + 1].y - pts[i].y) / dx[i];
  }
  const m = new Array(n);
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) {
    m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  }
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
    } else {
      const a = m[i] / d[i];
      const b = m[i + 1] / d[i];
      const s = a * a + b * b;
      if (s > 9) {
        const t = 3 / Math.sqrt(s);
        m[i] = t * a * d[i];
        m[i + 1] = t * b * d[i];
      }
    }
  }

  let path = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    path += ` C${pts[i].x + h},${pts[i].y + m[i] * h} ${pts[i + 1].x - h},${pts[i + 1].y - m[i + 1] * h} ${pts[i + 1].x},${pts[i + 1].y}`;
  }
  return path;
};

/* ---------------- Size hook ---------------- */
const useWidth = (ref) => {
  const [w, setW] = useState(640);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setW(Math.max(el.clientWidth, 200));
    read();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(read);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, [ref]);
  return w;
};

/* ---------------- Icons ---------------- */
const BarsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3v18h18" />
    <path d="M8 17v-5M12 17V8M16 17v-8M20 17v-3" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const LogoMark = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M5 14 16 5l11 9v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M12 23V12h5a3.2 3.2 0 0 1 0 6.4h-5" fill="none" stroke="#ff9a6b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------- Dropdown ---------------- */
const Dropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listId = useId();
  const current = RANGES.find((r) => r.value === value) || RANGES[1];

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`DashboardTwo-dropdown ${open ? "is-open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="DashboardTwo-dropdown-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{current.label}</span>
        <i className="DashboardTwo-dropdown-chev">
          <ChevronIcon />
        </i>
      </button>

      <ul id={listId} className="DashboardTwo-dropdown-menu" role="listbox" aria-hidden={!open}>
        {RANGES.map((r, i) => (
          <li key={r.value} style={{ "--i": i }}>
            <button
              type="button"
              role="option"
              aria-selected={r.value === value}
              tabIndex={open ? 0 : -1}
              className={`DashboardTwo-dropdown-item ${r.value === value ? "is-active" : ""}`}
              onClick={() => {
                onChange(r.value);
                setOpen(false);
              }}
            >
              <span>{r.label}</span>
              {r.value === value && <CheckIcon />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---------------- Chart ---------------- */
const PAD = { top: 16, right: 20, bottom: 32, left: 44 };

const Chart = ({ rows }) => {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const w = useWidth(wrapRef);
  const h = w < 480 ? 210 : 260;
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState(null);

  const plotW = w - PAD.left - PAD.right;
  const plotH = h - PAD.top - PAD.bottom;
  const n = rows.length;

  const pts = useMemo(
    () =>
      rows.map((r, i) => ({
        ...r,
        x: PAD.left + (n === 1 ? plotW / 2 : (i * plotW) / (n - 1)),
        y: PAD.top + plotH - (r.value / Y_MAX) * plotH,
      })),
    [rows, n, plotW, plotH]
  );

  const line = useMemo(() => monotonePath(pts), [pts]);
  const area = useMemo(() => {
    if (!pts.length) return "";
    const base = PAD.top + plotH;
    return `${line} L${pts[n - 1].x},${base} L${pts[0].x},${base} Z`;
  }, [line, pts, n, plotH]);

  /* last point is shown by default (like the design) */
  const active = hover === null ? n - 1 : hover;
  const ap = pts[active];

  const handleMove = useCallback(
    (e) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      let best = 0;
      let dist = Infinity;
      pts.forEach((p, i) => {
        const dd = Math.abs(p.x - x);
        if (dd < dist) {
          dist = dd;
          best = i;
        }
      });
      setHover(best);
    },
    [pts]
  );

  /* keep the label from overlapping on small screens */
  const skip = n > 6 && plotW / n < 46 ? 2 : 1;

  /* tooltip stays inside the card */
  const tipX = ap ? Math.min(Math.max(ap.x, 62), w - 62) : 0;

  return (
    <div className="DashboardTwo-chart" ref={wrapRef} style={{ height: h }}>
      <svg
        ref={svgRef}
        className="DashboardTwo-svg"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label="Bookings overview chart"
        onPointerMove={handleMove}
        onPointerDown={handleMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`DashboardTwo-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d7263d" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#d7263d" stopOpacity="0.02" />
          </linearGradient>
          <clipPath id={`DashboardTwo-clip-${uid}`}>
            <rect x={PAD.left - 1} y="0" width={plotW + 2} height={h - PAD.bottom + 1} />
          </clipPath>
        </defs>

        {/* grid + y labels */}
        {Y_TICKS.map((t) => {
          const y = PAD.top + plotH - (t / Y_MAX) * plotH;
          return (
            <g key={t}>
              <line className="DashboardTwo-gridline" x1={PAD.left} x2={w - PAD.right} y1={y} y2={y} />
              <text className="DashboardTwo-ylabel" x={PAD.left - 12} y={y + 4} textAnchor="end">
                {t}
              </text>
            </g>
          );
        })}

        {/* vertical grid + x labels */}
        {pts.map((p, i) => (
          <g key={p.label + i}>
            <line className="DashboardTwo-gridline DashboardTwo-gridline--v" x1={p.x} x2={p.x} y1={PAD.top} y2={PAD.top + plotH} />
            {i % skip === 0 && (
              <text
                className={`DashboardTwo-xlabel ${i === active ? "is-active" : ""}`}
                x={p.x}
                y={h - 8}
                textAnchor="middle"
              >
                {p.label}
              </text>
            )}
          </g>
        ))}

        {/* area + line (re-draws every time the range changes) */}
        <g clipPath={`url(#DashboardTwo-clip-${uid})`}>
          <path className="DashboardTwo-area" d={area} fill={`url(#DashboardTwo-fill-${uid})`} />
        </g>
        <path className="DashboardTwo-line" d={line} pathLength="1" fill="none" />

        {/* data dots */}
        {pts.map((p, i) => (
          <circle
            key={p.label + i}
            className="DashboardTwo-dot"
            cx={p.x}
            cy={p.y}
            r="4"
            style={{ animationDelay: `${0.5 + i * 0.12}s` }}
          />
        ))}

        {/* moving marker */}
        {ap && (
          <g className="DashboardTwo-marker" style={{ transform: `translate(${ap.x}px, ${ap.y}px)` }}>
            <line
              className={`DashboardTwo-guide ${hover !== null ? "is-on" : ""}`}
              x1="0"
              x2="0"
              y1={PAD.top - ap.y}
              y2={PAD.top + plotH - ap.y}
            />
            <circle className="DashboardTwo-pulse" r="7" />
            <circle className="DashboardTwo-dot-active" r="6" />
          </g>
        )}
      </svg>

      {/* tooltip */}
      {ap && (
        <div
          className="DashboardTwo-tip"
          style={{ transform: `translate(${tipX}px, ${ap.y}px)` }}
        >
          <div className="DashboardTwo-tip-box">
            <strong>{ap.label}</strong>
            <span>
              <i />
              {ap.value} Bookings
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------- Promo card ---------------- */
const Promo = ({ bgImage, onViewWebsite }) => (
  <aside className="DashboardTwo-promo">
    <div className="DashboardTwo-promo-bg" aria-hidden="true">
      {bgImage ? (
        <img src={bgImage} alt="" className="DashboardTwo-promo-img" />
      ) : (
        <div className="DashboardTwo-promo-building" />
      )}
      <span className="DashboardTwo-promo-shade" />
      <span className="DashboardTwo-promo-shine" />
    </div>

    <div className="DashboardTwo-promo-body">
      <div className="DashboardTwo-brand">
        <LogoMark />
        <span>
          Prime <b>Site</b>
        </span>
      </div>

      <h3 className="DashboardTwo-promo-title">Manage Your Website with Ease</h3>
      <p className="DashboardTwo-promo-text">
        Powerful admin panel for better control and growth.
      </p>

      <button type="button" className="DashboardTwo-promo-btn" onClick={onViewWebsite}>
        <span>View Website</span>
        <ArrowRight />
      </button>
    </div>
  </aside>
);

/* ---------------- Component ---------------- */
const DashboardTwo = ({ data = DEFAULT_DATA, bgImage, onViewWebsite }) => {
  const [range, setRange] = useState(6);
  const rows = data[range] || DEFAULT_DATA[6];

  return (
    <section className="DashboardTwo">
      <div className="DashboardTwo-grid">
        <div className="DashboardTwo-card">
          <header className="DashboardTwo-head">
            <div className="DashboardTwo-heading">
              <span className="DashboardTwo-heading-icon">
                <BarsIcon />
              </span>
              <h2 className="DashboardTwo-heading-title">Bookings Overview</h2>
            </div>
            <Dropdown value={range} onChange={setRange} />
          </header>

          {/* key = range, so the curve draws again on every change */}
          <Chart key={range} rows={rows} />
        </div>

        <Promo bgImage={bgImage} onViewWebsite={onViewWebsite} />
      </div>
    </section>
  );
};

export default DashboardTwo;