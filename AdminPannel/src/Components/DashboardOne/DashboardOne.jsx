import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import "./DashboardOne.css";

/* ------------------------------------------------------------------
   Edit the numbers / trends here (or pass your own `stats` prop).
   points = sparkline values (any range, they are auto-scaled)
------------------------------------------------------------------- */
const DEFAULT_STATS = [
  {
    key: "bookings",
    title: "Total Bookings",
    value: 245,
    change: 12,
    theme: "rose",
    points: [10, 14, 12, 20, 17, 23, 21, 30, 27, 34, 38, 36, 44],
  },
  {
    key: "enquiries",
    title: "Total Enquiries",
    value: 128,
    change: 8,
    theme: "red",
    points: [12, 16, 13, 18, 22, 19, 24, 26, 23, 30, 28, 34, 38],
  },
  {
    key: "blogs",
    title: "Total Blogs",
    value: 56,
    change: 5,
    theme: "red",
    points: [8, 12, 10, 15, 13, 19, 16, 22, 20, 27, 25, 31, 34],
  },
  {
    key: "careers",
    title: "Total Careers",
    value: 37,
    change: 10,
    theme: "orange",
    points: [6, 9, 8, 14, 12, 17, 15, 21, 19, 24, 28, 27, 33],
  },
];

/* ---------------- Icons ---------------- */
const icons = {
  bookings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="16" rx="3" />
      <path d="M3 9.5h18M8 2.8v3.4M16 2.8v3.4" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  ),
  enquiries: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3.5V15H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" transform="translate(1 0)" />
      <path d="M19 9.5h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2v2.5l-3.5-2.5H12" transform="translate(-1 0)" />
      <path d="M8 9h5" />
    </svg>
  ),
  blogs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  ),
  careers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18M11 13v2h2v-2" />
    </svg>
  ),
};

const ArrowUp = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
  </svg>
);

/* ---------------- Count-up hook ----------------
   Runs from 0 to `end`, fast at first and easing out
   very softly so it stops smoothly on the final number.
------------------------------------------------------------------- */
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

const useCountUp = (end, start, duration = 2000, delay = 0) => {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(end);
      return;
    }

    let raf = 0;
    let t0 = 0;
    const timer = setTimeout(() => {
      const tick = (now) => {
        if (!t0) t0 = now;
        const p = Math.min((now - t0) / duration, 1);
        setN(Math.round(end * easeOutExpo(p)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [end, start, duration, delay]);

  return n;
};

/* ---------------- Smooth sparkline path ---------------- */
const W = 140;
const H = 56;
const PAD = 4;

const buildPaths = (points) => {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = W / (points.length - 1);

  const pts = points.map((v, i) => [
    i * step,
    H - PAD - ((v - min) / range) * (H - PAD * 2),
  ]);

  let line = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    line += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  const area = `${line} L${W},${H} L0,${H} Z`;
  return { line, area };
};

const Sparkline = ({ points, start }) => {
  const uid = useId().replace(/:/g, "");
  const { line, area } = useMemo(() => buildPaths(points), [points]);

  return (
    <svg
      className={`DashboardOne-spark ${start ? "is-on" : ""}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`DashboardOne-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--c-main)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--c-main)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`DashboardOne-stroke-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--c-main)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--c-main)" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path className="DashboardOne-spark-area" d={area} fill={`url(#DashboardOne-fill-${uid})`} />
      <path
        className="DashboardOne-spark-line"
        d={line}
        pathLength="1"
        fill="none"
        stroke={`url(#DashboardOne-stroke-${uid})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

/* ---------------- Single stat card ---------------- */
const StatCard = ({ item, index, start }) => {
  const count = useCountUp(item.value, start, 2000, index * 150);

  return (
    <article
      className={`DashboardOne-card DashboardOne-card--${item.theme} ${start ? "is-on" : ""}`}
      style={{ "--i": index }}
    >
      <div className="DashboardOne-icon">{icons[item.key]}</div>

      <div className="DashboardOne-info">
        <h3 className="DashboardOne-title">{item.title}</h3>
        <p className="DashboardOne-value" aria-label={`${item.value}`}>
          {count}
        </p>
        <span className="DashboardOne-trend">
          <ArrowUp />
          <b>+{item.change}%</b>
        </span>
      </div>

      <Sparkline points={item.points} start={start} />
    </article>
  );
};

/* ---------------- Component ---------------- */
const DashboardOne = ({ stats = DEFAULT_STATS }) => {
  const rootRef = useRef(null);
  const [start, setStart] = useState(false);

  /* start animation when the section enters the screen */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setStart(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="DashboardOne" ref={rootRef}>
      <div className="DashboardOne-grid">
        {stats.map((item, i) => (
          <StatCard key={item.key} item={item} index={i} start={start} />
        ))}
      </div>
    </section>
  );
};

export default DashboardOne;