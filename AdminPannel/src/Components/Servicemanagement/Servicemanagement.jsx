import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import API from "../../api/axios";
import "./Servicemanagement.css";

/* =========================================
   CONSTANTS
========================================= */

const SERVICES = [
  "Security Services",
  "Manpower Services",
  "Workforce Solutions",
  "Facilities Management",
  "Aviation Services",
  "Managed Services",
  "Cash Services",
  "Taste Of Home",
  "Prime Site Living",
  "Prime Site Delivery",
  "Kitchen Maintenance Solutions",
  "Consulting",
  "Facility Management",
  "Sustainability",
  "Commercial Spaces",
  "Green Building",
  "Other",
];

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Support",
  "Proposal",
  "Quotation",
  "Partnership",
];

const STATUSES = ["New", "In Progress", "Resolved"];

const PAGE_SIZE = 5;

const TIME_RE = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+\-\s]{7,15}$/;

const SERVICE_CLASS = {
  Consulting: "consulting",
  "Facility Management": "facility",
  Sustainability: "sustainability",
  "Commercial Spaces": "commercial",
  "Green Building": "green",
};

const SERVICE_ICON = {
  Consulting: "building",
  "Facility Management": "gear",
  Sustainability: "leaf",
  "Commercial Spaces": "building",
  "Green Building": "leaf",
};

const ENQUIRY_CLASS = {
  "General Enquiry": "general",
  Support: "support",
  Proposal: "proposal",
  Quotation: "quotation",
  Partnership: "partnership",
};

const ENQUIRY_ICON = {
  "General Enquiry": "hexagon",
  Support: "shield",
  Proposal: "star",
  Quotation: "target",
  Partnership: "users",
};

const STATUS_CLASS = {
  New: "new",
  "In Progress": "progress",
  Resolved: "resolved",
};

/* =========================================
   HELPERS
========================================= */

const todayISO = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

const makeEmptyForm = () => ({
  name: "",
  email: "",
  phone: "",
  company: "",
  service: SERVICES[0],
  enquiry: ENQUIRY_TYPES[0],
  status: STATUSES[0],
  message: "",
  date: todayISO(),
  time: "10:00 AM",
});

const formatDate = (date) => {
  if (!date) return "";
  const parsed = new Date(date + "T00:00:00");
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* "20 Nov 2025" -> { dm: "20 Nov", y: "2025" } */
const dateParts = (date) => {
  const full = formatDate(date);
  const parts = full.split(" ");
  if (parts.length !== 3) return { dm: full, y: "" };
  return { dm: `${parts[0]} ${parts[1]}`, y: parts[2] };
};

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getPageList = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, current - 1, current, current + 1]);
  const list = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  list.forEach((p, i) => {
    if (i > 0 && p - list[i - 1] > 1) out.push(`gap-${p}`);
    out.push(p);
  });
  return out;
};

const validateForm = (f, mode) => {
  const e = {};

  if (!f.name.trim()) e.name = "Full name is required.";
  else if (f.name.trim().length < 3) e.name = "Name must be at least 3 characters.";

  if (!f.email.trim()) e.email = "Email is required.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address.";

  if (!f.phone.trim()) e.phone = "Phone number is required.";
  else if (!PHONE_RE.test(f.phone.trim())) e.phone = "Enter a valid phone number.";

  if (mode === "add") {
    if (!f.company.trim()) e.company = "Company name is required.";
    if (!f.date || Number.isNaN(Date.parse(f.date))) e.date = "Choose a valid date.";
    if (!TIME_RE.test(f.time.trim())) e.time = "Use a time like 10:30 AM.";
  }

  if (!f.message.trim()) e.message = "Message is required.";

  return e;
};

/* =========================================
   ICONS
========================================= */

const Icon = ({ name, size = 18 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: "false",
  };

  const icons = {
    booking: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M16 3v4M8 3v4M3 10h18" />
        <path d="m9.5 15.5 2 2 3.5-4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    reset: (
      <>
        <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
        <path d="M3 3v5h5" />
      </>
    ),
    chevron: <path d="m7 10 5 5 5-5" />,
    tick: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    trash: <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    ),
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4" />
      </>
    ),
    gear: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </>
    ),
    leaf: (
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </>
    ),
    hexagon: (
      <>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z" />,
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    message: <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    left: <path d="m15 18-6-6 6-6" />,
    right: <path d="m9 18 6-6-6-6" />,
    warning: (
      <>
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  };

  return <svg {...common}>{icons[name]}</svg>;
};

/* =========================================
   BADGES
========================================= */

const ServiceBadge = ({ service }) => (
  <span className={`sv-badge service ${SERVICE_CLASS[service] || "consulting"}`}>
    <Icon name={SERVICE_ICON[service] || "building"} size={14} />
    <span className="sv-badge-text">{service}</span>
  </span>
);

const EnquiryBadge = ({ enquiry }) => (
  <span className={`sv-badge enquiry ${ENQUIRY_CLASS[enquiry] || "general"}`}>
    <Icon name={ENQUIRY_ICON[enquiry] || "hexagon"} size={13} />
    <span className="sv-badge-text">{enquiry}</span>
  </span>
);

const StatusBadge = ({ status = "New" }) => (
  <span className={`sv-badge status ${STATUS_CLASS[status] || "new"}`}>
    <span className="sv-dot" />
    <span className="sv-badge-text">{status}</span>
  </span>
);

/* =========================================
   CUSTOM DROPDOWN  (prefix: sd-)
========================================= */

const CustomSelect = ({
  id,
  value,
  onChange,
  options,
  placeholder = "Select",
  label,
  allowEmpty = true,
  invalid = false,
  describedBy,
}) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(null);

  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const listId = useId();

  const items = [
    ...(allowEmpty ? [{ value: "", label: placeholder }] : []),
    ...options.map((o) => (typeof o === "string" ? { value: o, label: o } : o)),
  ];

  const selectedIndex = Math.max(0, items.findIndex((i) => i.value === value));
  const selected = items.find((i) => i.value === value);
  const triggerText = selected ? selected.label : placeholder;

  const openMenu = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom - 16;
      const above = rect.top - 16;
      const up = below < 220 && above > below;
      setPos({
        left: rect.left,
        width: rect.width,
        maxHeight: Math.max(140, Math.min(280, up ? above : below)),
        top: up ? undefined : rect.bottom + 8,
        bottom: up ? window.innerHeight - rect.top + 8 : undefined,
      });
    }
    setActive(selectedIndex);
    setOpen(true);
  };

  const closeMenu = () => setOpen(false);

  const choose = (item) => {
    onChange(item.value);
    closeMenu();
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onView = (e) => {
      if (menuRef.current && e.target instanceof Node && menuRef.current.contains(e.target))
        return;
      closeMenu();
    };
    window.addEventListener("resize", onView);
    window.addEventListener("scroll", onView, true);
    return () => {
      window.removeEventListener("resize", onView);
      window.removeEventListener("scroll", onView, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    menuRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const onKeyDown = (e) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, items.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(items.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(items[active]);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Tab":
        closeMenu();
        break;
      default:
    }
  };

  return (
    <div className={`sd-wrap ${open ? "open" : ""}`} ref={wrapRef} onKeyDown={onKeyDown}>
      <button
        type="button"
        id={id}
        ref={triggerRef}
        className={`sd-trigger ${value ? "has-value" : ""} ${invalid ? "invalid" : ""}`}
        onClick={() => (open ? closeMenu() : openMenu())}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-label={label || placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        title={label || placeholder}
      >
        <span className="sd-trigger-text">{triggerText}</span>
        <span className="sd-chevron">
          <Icon name="chevron" size={18} />
        </span>
      </button>

      {open && pos && (
        <ul
          className="sd-menu"
          id={listId}
          role="listbox"
          ref={menuRef}
          aria-label={label || placeholder}
          style={{
            left: pos.left,
            width: pos.width,
            top: pos.top,
            bottom: pos.bottom,
            maxHeight: pos.maxHeight,
          }}
        >
          {items.map((item, index) => {
            const isSelected = item.value === value;
            return (
              <li
                key={item.value || "__all"}
                id={`${listId}-${index}`}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                className={`sd-option ${isSelected ? "selected" : ""} ${
                  index === active ? "active" : ""
                }`}
                onMouseEnter={() => setActive(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(item)}
              >
                <span>{item.label}</span>
                {isSelected && <Icon name="tick" size={18} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

/* =========================================
   POPUP ARCHITECTURE  (prefix: sm-)
========================================= */

let scrollLocks = 0;
let savedOverflow = "";

const lockScroll = () => {
  if (scrollLocks === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  scrollLocks += 1;
};

const unlockScroll = () => {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) document.body.style.overflow = savedOverflow;
};

const Overlay = ({ onClose, children }) => {
  const onCloseRef = useRef(onClose);
  const pressedOnBackdrop = useRef(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    lockScroll();
    const onKey = (e) => {
      if (e.key === "Escape" && !e.defaultPrevented) onCloseRef.current?.();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, []);

  return createPortal(
    <div
      className="sm-overlay"
      onMouseDown={(e) => {
        pressedOnBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (pressedOnBackdrop.current && e.target === e.currentTarget)
          onCloseRef.current?.();
      }}
    >
      {children}
    </div>,
    document.body
  );
};

const ModalShell = ({
  title,
  subtitle,
  onClose,
  closeDisabled = false,
  footer,
  onSubmit,
  size = "md",
  children,
}) => {
  const titleId = useId();
  const body = <div className="sm-modal-body">{children}</div>;
  const foot = <div className="sm-modal-foot">{footer}</div>;

  return (
    <Overlay onClose={onClose}>
      <div
        className={`sm-modal sm-modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="sm-modal-head">
          <div className="sm-modal-titles">
            <h3 id={titleId}>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button
            type="button"
            className="sm-x"
            onClick={onClose}
            disabled={closeDisabled}
            title="Close"
            aria-label="Close"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {onSubmit ? (
          <form className="sm-modal-form" onSubmit={onSubmit} noValidate>
            {body}
            {foot}
          </form>
        ) : (
          <>
            {body}
            {foot}
          </>
        )}
      </div>
    </Overlay>
  );
};

const Field = ({ id, label, required, error, full, children }) => (
  <div className={`sm-field ${full ? "full" : ""} ${error ? "has-error" : ""}`}>
    <label htmlFor={id}>
      {label}
      {required && (
        <span className="sm-req" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
    {children}
    {error && (
      <p className="sm-error" id={`${id}-err`} role="alert">
        {error}
      </p>
    )}
  </div>
);

/* =========================================
   MAIN COMPONENT
========================================= */

const Servicemanagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [enquiryFilter, setEnquiryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState("");
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState(makeEmptyForm);
  const [errors, setErrors] = useState({});

  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  const deleteTimer = useRef(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/service-bookings?all=true");
      if (res.data?.success && res.data.data) {
        setItems(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch service bookings:", err);
      setToast("Failed to load service bookings from database");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  /* ---------- derived ---------- */

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (serviceFilter && item.service !== serviceFilter) return false;
      if (enquiryFilter && item.enquiry !== enquiryFilter) return false;
      if (!q) return true;

      return [
        item.name,
        item.email,
        item.phone,
        item.company,
        item.service,
        item.enquiry,
        item.status,
        item.message,
        item.date,
        formatDate(item.date),
        item.time,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [items, search, serviceFilter, enquiryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const showingFrom = filtered.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + PAGE_SIZE, filtered.length);

  const hasActiveFilters = Boolean(search || serviceFilter || enquiryFilter);

  /* ---------- effects ---------- */

  useEffect(() => {
    if (currentPage !== safePage) setCurrentPage(safePage);
  }, [currentPage, safePage]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => () => clearTimeout(deleteTimer.current), []);

  /* ---------- filter handlers ---------- */

  const handleSearchChange = (v) => {
    setSearch(v);
    setCurrentPage(1);
  };

  const applySearch = () => {
    setSearch((v) => v.trim());
    setCurrentPage(1);
  };

  const handleServiceChange = (v) => {
    setServiceFilter(v);
    setCurrentPage(1);
  };

  const handleEnquiryChange = (v) => {
    setEnquiryFilter(v);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setServiceFilter("");
    setEnquiryFilter("");
    setCurrentPage(1);
  };

  const changePage = (page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  /* ---------- popup handlers ---------- */

  const updateForm = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => {
      if (!p[key]) return p;
      const next = { ...p };
      delete next[key];
      return next;
    });
  };

  const openAddModal = () => {
    setSelected(null);
    setForm(makeEmptyForm());
    setErrors({});
    setModal("add");
  };

  const openEditModal = (item) => {
    setSelected(item);
    setForm({ ...makeEmptyForm(), ...item });
    setErrors({});
    setModal("edit");
  };

  const openViewModal = (item) => {
    setSelected(item);
    setModal("view");
  };

  const openServiceModal = (item) => {
    setSelected(item);
    setModal("service");
  };

  const openDeleteModal = (item) => {
    setSelected(item);
    setModal("delete");
  };

  const closeModal = () => {
    if (deleting) return;
    setModal("");
    setSelected(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = validateForm(form, modal);
    setErrors(found);

    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      requestAnimationFrame(() => document.getElementById(`sm-f-${firstKey}`)?.focus());
      return;
    }

    const cleaned = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      service: form.service,
      enquiry: form.enquiry,
      status: form.status,
      message: form.message.trim(),
    };

    try {
      if (modal === "edit" && selected) {
        const res = await API.put(`/service-bookings/${selected.id}`, cleaned);
        if (res.data?.success) {
          setToast("Service booking updated successfully");
          fetchBookings();
        }
      } else {
        const res = await API.post("/service-bookings", cleaned);
        if (res.data?.success) {
          setCurrentPage(1);
          setToast("Service booking added successfully");
          fetchBookings();
        }
      }
      setModal("");
      setSelected(null);
      setErrors({});
    } catch (err) {
      console.error("Failed to save service booking:", err);
      setToast(err.response?.data?.message || "Failed to save service booking");
    }
  };

  const confirmDelete = async () => {
    if (!selected || deleting) return;
    const id = selected.id;
    setDeleting(true);

    try {
      const res = await API.delete(`/service-bookings/${id}`);
      if (res.data?.success) {
        setModal("");
        setSelected(null);
        setToast("Service booking deleted successfully");
        fetchBookings();
      }
    } catch (err) {
      console.error("Failed to delete service booking:", err);
      setToast(err.response?.data?.message || "Failed to delete booking");
    } finally {
      setDeleting(false);
    }
  };

  const isAdd = modal === "add";

  /* =========================================
     RENDER
  ========================================= */

  return (
    <section className="servicemanagement-page">
      {/* HEADER CARD */}

      <div className="servicemanagement-header">
        <div className="servicemanagement-heading">
          <div className="servicemanagement-heading-icon">
            <Icon name="booking" size={26} />
          </div>
          <div>
            <h2>Service Booking Management</h2>
            <p>Manage all service booking enquiries</p>
          </div>
        </div>

        <button
          type="button"
          className="servicemanagement-primary-btn"
          onClick={openAddModal}
          title="Add Service"
        >
          <Icon name="plus" size={17} />
          Add Service
        </button>
      </div>

      {/* MAIN PANEL */}

      <div className="servicemanagement-panel">
        {/* FILTER BAR */}

        <div className="servicemanagement-filter-section">
          <div className="servicemanagement-search-box">
            <Icon name="search" size={18} />
            <input
              type="text"
              placeholder="Search by name, email or company..."
              aria-label="Search enquiries"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applySearch();
                }
              }}
            />
          </div>

          <CustomSelect
            id="sm-filter-service"
            value={serviceFilter}
            onChange={handleServiceChange}
            options={SERVICES}
            placeholder="All Services"
            label="Filter by service"
          />

          <CustomSelect
            id="sm-filter-enquiry"
            value={enquiryFilter}
            onChange={handleEnquiryChange}
            options={ENQUIRY_TYPES}
            placeholder="All Enquiry Types"
            label="Filter by enquiry type"
          />

          <button
            type="button"
            className="servicemanagement-search-btn"
            onClick={applySearch}
            title="Search"
            aria-label="Search"
          >
            <Icon name="search" size={16} />
            Search
          </button>

          <button
            type="button"
            className="servicemanagement-reset-btn"
            onClick={resetFilters}
            title="Reset all filters"
            aria-label="Reset all filters"
          >
            <Icon name="reset" size={17} />
            Reset
          </button>
        </div>

        {/* TABLE */}

        <div className="servicemanagement-table-container">
          <table className="servicemanagement-table">
            <thead>
              <tr>
                <th className="number-column">#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>
                  Company
                  <br />
                  Name
                </th>
                <th>
                  Service of
                  <br />
                  Interest
                </th>
                <th>
                  Enquiry
                  <br />
                  Type
                </th>
                <th>Message</th>
                
                <th>Date</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr className="empty-row">
                  <td colSpan={11} style={{ textAlign: "center", padding: "48px 20px", color: "#64748b" }}>
                    Loading service bookings from database...
                  </td>
                </tr>
              ) : visible.length > 0 ? (
                visible.map((item, index) => {
                  const dp = dateParts(item.date);
                  return (
                    <tr key={item.id}>
                      <td className="sv-number" data-label="#">
                        {startIndex + index + 1}
                      </td>

                      <td className="sv-name" data-label="Name">
                        <span>{item.name}</span>
                      </td>

                      <td className="sv-email" data-label="Email">
                        {item.email}
                      </td>

                      <td className="sv-phone" data-label="Phone">
                        {item.phone}
                      </td>

                      <td className="sv-company" data-label="Company">
                        {item.company}
                      </td>

                      <td data-label="Service">
                        <ServiceBadge service={item.service} />
                      </td>

                      <td data-label="Enquiry Type">
                        <EnquiryBadge enquiry={item.enquiry} />
                      </td>

                      <td className="sv-message" data-label="Message">
                        <span>{item.message}</span>
                      </td>

                      

                      <td data-label="Date">
                        <div className="servicemanagement-date">
                          <Icon name="calendar" size={15} />
                          <div>
                            <span>{dp.dm}</span>
                            <span>{dp.y}</span>
                            <small>{item.time}</small>
                          </div>
                        </div>
                      </td>

                      <td className="sv-actions-cell" data-label="Actions">
                        <div className="servicemanagement-actions">
                          <button
                            type="button"
                            className="sv-action-btn view"
                            title="View enquiry"
                            aria-label={`View ${item.name}`}
                            onClick={() => openViewModal(item)}
                          >
                            <Icon name="eye" size={17} />
                          </button>

                          <button
                            type="button"
                            className="sv-action-btn edit"
                            title="Edit enquiry"
                            aria-label={`Edit ${item.name}`}
                            onClick={() => openEditModal(item)}
                          >
                            <Icon name="edit" size={17} />
                          </button>

                          <button
                            type="button"
                            className="sv-action-btn delete"
                            title="Delete enquiry"
                            aria-label={`Delete ${item.name}`}
                            onClick={() => openDeleteModal(item)}
                          >
                            <Icon name="trash" size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="empty-row">
                  <td colSpan={11}>
                    <div className="servicemanagement-empty">
                      <div className="empty-icon">
                        <Icon name="booking" size={30} />
                      </div>
                      <h3>No enquiries found</h3>
                      <p>Try changing your search or filter options.</p>
                      <button type="button" onClick={resetFilters} disabled={!hasActiveFilters}>
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER / PAGINATION */}

        <div className="servicemanagement-table-footer">
          <div className="servicemanagement-entries" aria-live="polite">
            Showing <strong>{showingFrom}</strong> to <strong>{showingTo}</strong> of{" "}
            <strong>{filtered.length}</strong> entries
          </div>

          <nav className="servicemanagement-pagination" aria-label="Pagination">
            <button
              type="button"
              className="pagination-arrow"
              disabled={safePage === 1}
              onClick={() => changePage(safePage - 1)}
              aria-label="Previous page"
              title="Previous page"
            >
              <Icon name="left" size={16} />
            </button>

            {getPageList(safePage, totalPages).map((page) =>
              typeof page === "string" ? (
                <span key={page} className="pagination-gap" aria-hidden="true">
                  …
                </span>
              ) : (
                <button
                  type="button"
                  key={page}
                  className={`pagination-number ${safePage === page ? "active" : ""}`}
                  onClick={() => changePage(page)}
                  aria-label={`Page ${page}`}
                  aria-current={safePage === page ? "page" : undefined}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              className="pagination-arrow"
              disabled={safePage === totalPages}
              onClick={() => changePage(safePage + 1)}
              aria-label="Next page"
              title="Next page"
            >
              <Icon name="right" size={16} />
            </button>
          </nav>
        </div>
      </div>

      {/* =====================================
          ADD / EDIT POPUP
      ===================================== */}

      {(modal === "add" || modal === "edit") && (
        <ModalShell
          title={isAdd ? "Add Service" : "Edit Enquiry"}
          subtitle={
            isAdd
              ? "Create a new service booking enquiry."
              : "Update the enquiry details."
          }
          onClose={closeModal}
          onSubmit={handleSubmit}
          size="md"
          footer={
            <>
              <button type="button" className="sm-btn sm-btn-ghost" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className="sm-btn sm-btn-red">
                {isAdd ? "Add Service" : "Save Changes"}
              </button>
            </>
          }
        >
          <div className="sm-grid">
            <Field id="sm-f-name" label="Full Name" required error={errors.name}>
              <input
                id="sm-f-name"
                type="text"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                placeholder="Enter full name"
                aria-label="Full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "sm-f-name-err" : undefined}
              />
            </Field>

            <Field id="sm-f-email" label="Email Address" required error={errors.email}>
              <input
                id="sm-f-email"
                type="email"
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
                placeholder="name@example.com"
                aria-label="Email address"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "sm-f-email-err" : undefined}
              />
            </Field>

            <Field id="sm-f-phone" label="Phone Number" required error={errors.phone}>
              <input
                id="sm-f-phone"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                placeholder="Enter phone number"
                aria-label="Phone number"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "sm-f-phone-err" : undefined}
              />
            </Field>

            {isAdd && (
              <Field id="sm-f-company" label="Company Name" required error={errors.company}>
                <input
                  id="sm-f-company"
                  type="text"
                  value={form.company}
                  onChange={(e) => updateForm("company", e.target.value)}
                  placeholder="Enter company name"
                  aria-label="Company name"
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={errors.company ? "sm-f-company-err" : undefined}
                />
              </Field>
            )}

            {isAdd && (
              <Field id="sm-f-service" label="Service of Interest">
                <CustomSelect
                  id="sm-f-service"
                  value={form.service}
                  onChange={(v) => updateForm("service", v)}
                  options={SERVICES}
                  allowEmpty={false}
                  label="Service of interest"
                />
              </Field>
            )}

            <Field id="sm-f-enquiry" label="Enquiry Type">
              <CustomSelect
                id="sm-f-enquiry"
                value={form.enquiry}
                onChange={(v) => updateForm("enquiry", v)}
                options={ENQUIRY_TYPES}
                allowEmpty={false}
                label="Enquiry type"
              />
            </Field>

            {isAdd && (
              <Field id="sm-f-date" label="Date" required error={errors.date}>
                <input
                  id="sm-f-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => updateForm("date", e.target.value)}
                  aria-label="Date"
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "sm-f-date-err" : undefined}
                />
              </Field>
            )}

            {isAdd && (
              <Field id="sm-f-time" label="Time" required error={errors.time}>
                <input
                  id="sm-f-time"
                  type="text"
                  value={form.time}
                  onChange={(e) => updateForm("time", e.target.value)}
                  placeholder="10:30 AM"
                  aria-label="Time"
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? "sm-f-time-err" : undefined}
                />
              </Field>
            )}

            <Field id="sm-f-status" label="Status" full>
              <CustomSelect
                id="sm-f-status"
                value={form.status}
                onChange={(v) => updateForm("status", v)}
                options={STATUSES}
                allowEmpty={false}
                label="Status"
              />
            </Field>

            <Field id="sm-f-message" label="Message" required full error={errors.message}>
              <textarea
                id="sm-f-message"
                rows={3}
                value={form.message}
                onChange={(e) => updateForm("message", e.target.value)}
                placeholder="Write the enquiry message..."
                aria-label="Message"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "sm-f-message-err" : undefined}
              />
            </Field>
          </div>
        </ModalShell>
      )}

      {/* =====================================
          VIEW POPUP (eye icon)
      ===================================== */}

      {modal === "view" && selected && (
        <Overlay onClose={closeModal}>
          <div className="sm-view" role="dialog" aria-modal="true" aria-labelledby="sm-view-title">
            <div className="sm-view-head">
              <h3 id="sm-view-title">Enquiry Details</h3>
              <button
                type="button"
                className="sm-x"
                onClick={closeModal}
                title="Close"
                aria-label="Close"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="sm-view-body">
              <div className="sm-profile">
                <div className="sm-avatar" aria-hidden="true">
                  {getInitials(selected.name)}
                </div>
                <h4>{selected.name}</h4>
                <div className="sm-chips">
                  <EnquiryBadge enquiry={selected.enquiry} />
                  <StatusBadge status={selected.status} />
                </div>
              </div>

              <div className="sm-rows">
                <div className="sm-row">
                  <span className="sm-row-label">
                    <Icon name="phone" size={17} />
                    Phone
                  </span>
                  <strong className="sm-row-value">{selected.phone}</strong>
                </div>
                <div className="sm-row">
                  <span className="sm-row-label">
                    <Icon name="mail" size={17} />
                    Email
                  </span>
                  <strong className="sm-row-value">{selected.email}</strong>
                </div>
                <div className="sm-row">
                  <span className="sm-row-label">
                    <Icon name="calendar" size={17} />
                    Enquiry date
                  </span>
                  <strong className="sm-row-value">
                    {formatDate(selected.date)}, {selected.time}
                  </strong>
                </div>
              </div>
            </div>

            <div className="sm-view-actions">
              <button
                type="button"
                className="sm-btn sm-btn-red"
                onClick={() => openEditModal(selected)}
              >
                <Icon name="edit" size={16} />
                Edit enquiry
              </button>
              <button type="button" className="sm-btn sm-btn-ghost" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </Overlay>
      )}

      {/* =====================================
          ADDED SERVICE POPUP ("View" pill)
      ===================================== */}

      {modal === "service" && selected && (
        <ModalShell
          title="Added Service"
          subtitle={`Requested by ${selected.name}`}
          onClose={closeModal}
          size="sm"
          footer={
            <button type="button" className="sm-btn sm-btn-ghost" onClick={closeModal}>
              Close
            </button>
          }
        >
          <div className="sm-service-box">
            <div className="sm-service-line">
              <span>Service</span>
              <ServiceBadge service={selected.service} />
            </div>
            <div className="sm-service-line">
              <span>Enquiry Type</span>
              <EnquiryBadge enquiry={selected.enquiry} />
            </div>
            <div className="sm-service-msg">
              <span className="sm-row-label">
                <Icon name="message" size={17} />
                Message
              </span>
              <p>{selected.message || "No message provided."}</p>
            </div>
          </div>
        </ModalShell>
      )}

      {/* =====================================
          DELETE POPUP
      ===================================== */}

      {modal === "delete" && selected && (
        <ModalShell
          title="Delete Enquiry"
          onClose={closeModal}
          closeDisabled={deleting}
          size="sm"
          footer={
            <>
              <button
                type="button"
                className="sm-btn sm-btn-ghost"
                onClick={closeModal}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="sm-btn sm-btn-red"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </>
          }
        >
          <div className="sm-del-body">
            <div className="sm-del-icon">
              <Icon name="warning" size={30} />
            </div>
            <h4>Delete enquiry from {selected.name}?</h4>
            <p>This action cannot be undone. The enquiry data will be removed permanently.</p>
          </div>
        </ModalShell>
      )}

      {/* TOAST */}

      {toast &&
        createPortal(
          <div className="sm-toast" role="status" aria-live="polite">
            <Icon name="check" size={18} />
            <span>{toast}</span>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Servicemanagement;