import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import "./DashboardThree.css";

/* ------------------------------------------------------------------
   Edit the demo data here, or pass your own props:
   <DashboardThree
      bookings={[...]}  activities={[...]}
      onViewAll={() => {}}  onViewBooking={(booking) => {}}
   />
   status: "confirmed" | "pending"
   activity type: "booking" | "enquiry" | "blog"
------------------------------------------------------------------- */
const DEFAULT_BOOKINGS = [
  { id: 1, name: "Rahul Sharma", service: "Consultation", date: "20 Nov 2025", status: "confirmed" },
  { id: 2, name: "Priya Sharma", service: "Career Support", date: "19 Nov 2025", status: "pending" },
  { id: 3, name: "Amit Verma", service: "Service Booking", date: "18 Nov 2025", status: "confirmed" },
];

const DEFAULT_ACTIVITIES = [
  { id: 1, type: "booking", title: "New booking received", text: "Rahul Sharma booked a service", time: "2h ago" },
  { id: 2, type: "enquiry", title: "New enquiry received", text: "From Priya Singh", time: "3h ago" },
  { id: 3, type: "blog", title: "New blog published", text: "About Career Growth", time: "5h ago" },
];

const STATUS_LABEL = { confirmed: "Confirmed", pending: "Pending" };

/* ---------------- Icons ---------------- */
const Svg = ({ children, size = 18, stroke = 1.9 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ClockIcon = ({ size }) => (
  <Svg size={size} stroke={2}>
    <circle cx="12" cy="12" r="9.2" />
    <path d="M12 7v5.2l3.4 2" />
  </Svg>
);

const EyeIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="2.8" />
  </Svg>
);

const ArrowRight = ({ size }) => (
  <Svg size={size} stroke={2.3}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

const BellIcon = ({ size }) => (
  <Svg size={size} stroke={2}>
    <path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9z" />
    <path d="M10 20a2.2 2.2 0 0 0 4 0" />
  </Svg>
);

const CalendarCheck = ({ size }) => (
  <Svg size={size}>
    <rect x="3.5" y="5" width="17" height="15" rx="3" />
    <path d="M3.5 10h17M8 3v4M16 3v4M9.5 15l2 2 3.5-3.6" />
  </Svg>
);

const MailIcon = ({ size }) => (
  <Svg size={size}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m3.8 7.5 8.2 6 8.2-6" />
  </Svg>
);

const DocIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8z" />
    <path d="M14 3v5h5M9 13h6M9 16.5h4" />
  </Svg>
);

const CheckIcon = ({ size }) => (
  <Svg size={size} stroke={2.4}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

const TrashIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 1.8h6a2 2 0 0 0 2-1.8l1-12M9 7V4.8A.8.8 0 0 1 9.8 4h4.4a.8.8 0 0 1 .8.8V7" />
  </Svg>
);

const ACTIVITY_ICON = {
  booking: <CalendarCheck size={19} />,
  enquiry: <MailIcon size={19} />,
  blog: <DocIcon size={19} />,
};

/* ---------------- Row action dropdown ---------------- */
const RowMenu = ({ booking, open, onToggle, onClose, onAction }) => {
  const rootRef = useRef(null);
  const btnRef = useRef(null);
  const menuId = useId();
  const [up, setUp] = useState(false);

  /* open upward when there is no room below */
  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setUp(window.innerHeight - r.bottom < 230);
    }
    onToggle();
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) onClose();
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        btnRef.current && btnRef.current.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onClose);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onClose);
    };
  }, [open, onClose]);

  const items = [
    { key: "view", label: "View Details", icon: <EyeIcon size={16} /> },
    { key: "confirmed", label: "Mark as Confirmed", icon: <CheckIcon size={16} />, off: booking.status === "confirmed" },
    { key: "pending", label: "Mark as Pending", icon: <ClockIcon size={16} />, off: booking.status === "pending" },
    { key: "delete", label: "Delete Booking", icon: <TrashIcon size={16} />, danger: true },
  ];

  return (
    <div
      className={`DashboardThree-menu ${open ? "is-open" : ""} ${up ? "is-up" : ""}`}
      ref={rootRef}
    >
      <button
        type="button"
        ref={btnRef}
        className="DashboardThree-eye"
        aria-label={`Actions for ${booking.name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={toggle}
      >
        <EyeIcon size={16} />
      </button>

      <ul id={menuId} className="DashboardThree-menu-list" role="menu" aria-hidden={!open}>
        {items.map((it, i) => (
          <li key={it.key} role="none" style={{ "--i": i }}>
            <button
              type="button"
              role="menuitem"
              tabIndex={open ? 0 : -1}
              disabled={it.off}
              className={`DashboardThree-menu-item ${it.danger ? "is-danger" : ""}`}
              onClick={() => onAction(it.key, booking)}
            >
              {it.icon}
              <span>{it.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---------------- Component ---------------- */
const DashboardThree = ({
  bookings: bookingsProp = DEFAULT_BOOKINGS,
  activities = DEFAULT_ACTIVITIES,
  onViewAll,
  onViewBooking,
}) => {
  const [rows, setRows] = useState(bookingsProp);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    setRows(bookingsProp);
  }, [bookingsProp]);

  const closeMenu = useCallback(() => setOpenId(null), []);

  const handleAction = (key, booking) => {
    setOpenId(null);
    if (key === "view") {
      onViewBooking && onViewBooking(booking);
    } else if (key === "delete") {
      setRows((r) => r.filter((x) => x.id !== booking.id));
    } else {
      setRows((r) => r.map((x) => (x.id === booking.id ? { ...x, status: key } : x)));
    }
  };

  return (
    <section className="DashboardThree">
      <div className="DashboardThree-grid">
        {/* ---------- Recent bookings ---------- */}
        <div className={`DashboardThree-card DashboardThree-bookings ${openId !== null ? "has-open" : ""}`}>
          <header className="DashboardThree-head">
            <div className="DashboardThree-heading">
              <span className="DashboardThree-heading-icon">
                <ClockIcon size={26} />
              </span>
              <h2 className="DashboardThree-heading-title">Recent Bookings</h2>
            </div>
            <button type="button" className="DashboardThree-viewall" onClick={onViewAll}>
              <span>View All</span>
              <ArrowRight size={15} />
            </button>
          </header>

          <table className="DashboardThree-table">
            <thead>
              <tr>
                <th className="DashboardThree-col-no">#</th>
                <th>Customer Name</th>
                <th>Service</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th className="DashboardThree-col-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b, i) => (
                <tr
                  key={b.id}
                  className={`DashboardThree-row ${openId === b.id ? "is-active" : ""}`}
                  style={{ "--i": i }}
                >
                  <td data-label="#" className="DashboardThree-col-no">{i + 1}</td>
                  <td data-label="Customer" className="DashboardThree-name">{b.name}</td>
                  <td data-label="Service">{b.service}</td>
                  <td data-label="Date" className="DashboardThree-date">{b.date}</td>
                  <td data-label="Status">
                    <span className={`DashboardThree-badge DashboardThree-badge--${b.status}`}>
                      {STATUS_LABEL[b.status]}
                    </span>
                  </td>
                  <td data-label="Action" className="DashboardThree-col-action">
                    <RowMenu
                      booking={b}
                      open={openId === b.id}
                      onToggle={() => setOpenId(openId === b.id ? null : b.id)}
                      onClose={closeMenu}
                      onAction={handleAction}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {rows.length === 0 && (
            <p className="DashboardThree-empty">No recent bookings yet.</p>
          )}
        </div>

        {/* ---------- Recent activity ---------- */}
        <aside className="DashboardThree-card DashboardThree-activity">
          <header className="DashboardThree-head DashboardThree-head--plain">
            <div className="DashboardThree-heading">
              <span className="DashboardThree-heading-icon DashboardThree-bell">
                <BellIcon size={26} />
              </span>
              <h2 className="DashboardThree-heading-title">Recent Activity</h2>
            </div>
          </header>

          <ul className="DashboardThree-list">
            {activities.map((a, i) => (
              <li key={a.id} className="DashboardThree-item" style={{ "--i": i }}>
                <span className={`DashboardThree-item-icon DashboardThree-item-icon--${a.type}`}>
                  {ACTIVITY_ICON[a.type]}
                </span>
                <div className="DashboardThree-item-body">
                  <strong>{a.title}</strong>
                  <span>{a.text}</span>
                </div>
                <time className="DashboardThree-item-time">{a.time}</time>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default DashboardThree;