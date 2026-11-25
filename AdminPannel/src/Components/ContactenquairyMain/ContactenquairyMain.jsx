import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import API from "../../api/axios";
import "./ContactenquairyMain.css";

const TYPE_META = {
  "General Enquiry": { cls: "blue", icon: "briefcase" },
  "Construction Enquiry": { cls: "blue", icon: "calendar" },
  "Manpower Requirement": { cls: "blue", icon: "briefcase" },
  "Business Partnership": { cls: "purple", icon: "briefcase" },
  "Service Request": { cls: "red", icon: "calendar" },
  Careers: { cls: "green", icon: "briefcase" },
  Support: { cls: "purple", icon: "headset" },
  Others: { cls: "green", icon: "info" },
  "Service Booking": { cls: "red", icon: "calendar" },
};

const TYPES = Object.keys(TYPE_META);
const STATUSES = ["New", "Replied", "Pending", "Resolved", "Read"];
const PAGE_SIZE = 5;

/* Dropdown option lists */
const TYPE_FILTER_OPTIONS = [
  { value: "", label: "All Enquiry Types" },
  ...TYPES.map((t) => ({ value: t, label: t })),
];
const STATUS_FILTER_OPTIONS = [
  { value: "", label: "All Status" },
  ...STATUSES.map((s) => ({ value: s, label: s })),
];
const TYPE_FORM_OPTIONS = TYPES.map((t) => ({ value: t, label: t }));
const STATUS_FORM_OPTIONS = STATUSES.map((s) => ({ value: s, label: s }));

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  type: "General Enquiry",
  status: "New",
  message: "",
};

function Icon({ name, size = 18 }) {
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
  };

  const paths = {
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    reset: (
      <>
        <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
        <path d="M3 3v5h5" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    edit: <path d="m15 5 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15l0 5Z" />,
    trash: <path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m4 4v7m6-7v7" />,
    down: <path d="m6 9 6 6 6-6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5h8v2" />
      </>
    ),
    headset: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <rect x="3" y="14" width="4" height="6" rx="1.5" />
        <rect x="17" y="14" width="4" height="6" rx="1.5" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5m0-8h.01" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.8L7.7 9.6a16 16 0 0 0 6.7 6.7l1.3-1.3a2 2 0 0 1 1.8-.6l2.8.5a2 2 0 0 1 1.7 2Z" />
    ),
    download: (
      <>
        <path d="M12 4v11m0 0-4-4m4 4 4-4" />
        <path d="M4 19h16" />
      </>
    ),
    close: <path d="m18 6-12 12M6 6l12 12" />,
    check: <path d="m5 12 4 4L19 6" />,
    alert: (
      <>
        <path d="M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4m0 3h.01" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.info}</svg>;
}

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "?";

const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

/* Table photo, falls back to initials if the image fails */
function Avatar({ src, name }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="ce-avatar">
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        getInitials(name)
      )}
    </span>
  );
}

/* ------------------------------------------------
   Custom Dropdown (used everywhere)
   - menu is rendered in document.body, so it is never
     clipped by the table, modal body or overflow areas
   - selected item = light red bg + dark red text + check
   - no red glow / ring on click or focus
------------------------------------------------- */
function Dropdown({
  value,
  options,
  onChange,
  ariaLabel,
  variant = "filter", // "filter" | "form"
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const [active, setActive] = useState(-1);

  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const selectedIndex = options.findIndex((o) => o.value === value);
  const current = options[selectedIndex] || options[0];

  const place = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const width = Math.max(rect.width, 170);
    const wanted = Math.min(options.length * 50 + 16, 280);
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < wanted + 12 && rect.top > spaceBelow;

    const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
    const room = (openUp ? rect.top : spaceBelow) - 16;

    setPos({
      left,
      width,
      top: openUp ? undefined : rect.bottom + 8,
      bottom: openUp ? window.innerHeight - rect.top + 8 : undefined,
      maxHeight: Math.max(120, Math.min(280, room)),
    });
  }, [options.length]);

  const openMenu = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const closeMenu = useCallback(() => setOpen(false), []);

  const choose = (val) => {
    onChange(val);
    setOpen(false);
    btnRef.current?.focus();
  };

  /* position when opening + keep it attached on scroll / resize */
  useLayoutEffect(() => {
    if (!open) return;

    place();

    const onScroll = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) return;
      place();
    };

    window.addEventListener("resize", place);
    window.addEventListener("scroll", onScroll, true);

    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open, place]);

  /* outside click + Escape (closes only the dropdown, not the modal) */
  useEffect(() => {
    if (!open) return;

    const onDown = (e) => {
      if (btnRef.current?.contains(e.target)) return;
      if (menuRef.current?.contains(e.target)) return;
      closeMenu();
    };

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeMenu();
        btnRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey, true);

    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [open, closeMenu]);

  /* keep keyboard-active item visible */
  useEffect(() => {
    if (!open || active < 0) return;
    menuRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active, open, pos]);

  const onKeyDown = (e) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (options[active]) choose(options[active].value);
    } else if (e.key === "Tab") {
      closeMenu();
    }
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={`dd-trigger dd-${variant}${open ? " is-open" : ""}`}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        <span className="dd-value">{current?.label}</span>
        <span className="dd-chevron">
          <Icon name="down" size={16} />
        </span>
      </button>

      {open &&
        pos &&
        createPortal(
          <div
            ref={menuRef}
            className="dd-menu"
            role="listbox"
            style={{
              left: pos.left,
              width: pos.width,
              top: pos.top,
              bottom: pos.bottom,
              maxHeight: pos.maxHeight,
            }}
          >
            {options.map((o, i) => {
              const isSelected = o.value === value;

              return (
                <button
                  type="button"
                  key={o.value || "__all"}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                  className={`dd-item${isSelected ? " is-selected" : ""}${
                    i === active ? " is-active" : ""
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(o.value)}
                >
                  <span>{o.label}</span>
                  {isSelected && <Icon name="check" size={18} />}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}

/* ------------------------------------------------
   Shared modal, rendered in document.body so it is
   always centered over the blurred page
------------------------------------------------- */
function ModalShell({
  title,
  subtitle,
  size = "md",
  onClose,
  closeDisabled = false,
  children,
  footer,
}) {
  return createPortal(
    <div
      className="cm-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !closeDisabled) onClose();
      }}
    >
      <div
        className={`cm-modal cm-${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="cm-head">
          <div className="cm-head-text">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <button
            type="button"
            className="cm-close"
            onClick={onClose}
            disabled={closeDisabled}
            aria-label="Close"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="cm-body">{children}</div>

        {footer && <div className="cm-foot">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

export default function ContactenquairyMain() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState("");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  const fetchEnquiries = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/contact?all=true");
      if (res.data?.success && res.data.data) {
        setRows(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
      setToast("Failed to load enquiries from database");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleStatusToggle = async (row) => {
    const statusCycle = {
      New: "Replied",
      Replied: "Pending",
      Pending: "Resolved",
      Resolved: "New",
      Read: "Replied",
    };
    const nextStatus = statusCycle[row.status] || "New";

    try {
      await API.patch(`/contact/${row.id}/status`, { status: nextStatus });
      setToast(`Status updated to ${nextStatus}`);
      fetchEnquiries();
    } catch (err) {
      console.error("Failed to update status:", err);
      setToast("Could not update status");
    }
  };

  /* Live filtering: results update as you type */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rows.filter((r) => {
      const matchesSearch =
        !q ||
        [r.name, r.email, r.phone, r.message, r.type, r.status].some((value) =>
          String(value || "").toLowerCase().includes(q)
        );

      return (
        matchesSearch &&
        (!typeFilter || r.type === typeFilter) &&
        (!statusFilter || r.status === statusFilter)
      );
    });
  }, [rows, search, typeFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const startEntry = filtered.length ? startIndex + 1 : 0;
  const endEntry = Math.min(startIndex + PAGE_SIZE, filtered.length);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setTypeFilter("");
    setStatusFilter("");
    setPage(1);
  };

  const handleExport = () => {
    if (!filtered.length) {
      setToast("No enquiries to export");
      return;
    }

    const header = ["#", "Name", "Email", "Phone", "Type", "Message", "Status", "Date"];

    const lines = filtered.map((r, i) =>
      [i + 1, r.name, r.email, r.phone, r.type, r.message, r.status, `${r.date} ${r.time}`]
        .map(csvCell)
        .join(",")
    );

    const blob = new Blob([[header.map(csvCell).join(","), ...lines].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact-enquiries.csv";
    a.click();
    URL.revokeObjectURL(url);

    setToast("Enquiries exported successfully");
  };

  /* ---------- MODALS ---------- */
  const closeModal = () => {
    if (deleting) return;
    setModal("");
    setSelected(null);
    setErrors({});
  };

  const openView = (row) => {
    setSelected(row);
    setModal("view");
  };

  const openEdit = (row) => {
    setSelected(row);
    setForm({
      name: row.name,
      email: row.email,
      phone: row.phone,
      type: row.type,
      status: row.status,
      message: row.message,
    });
    setErrors({});
    setModal("edit");
  };

  const openDelete = (row) => {
    setSelected(row);
    setDeleting(false);
    setModal("delete");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* used by the custom dropdowns inside the edit form */
  const setFormValue = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};

    if (!form.name.trim()) next.name = "Name is required";

    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email address";

    if (!form.phone.trim()) next.phone = "Phone number is required";
    else if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number";

    if (!form.message.trim()) next.message = "Message is required";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate() || !selected) return;

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        type: form.type,
        enquiry: form.type,
        status: form.status,
        message: form.message.trim(),
      };
      const res = await API.put(`/contact/${selected.id}`, payload);
      if (res.data?.success) {
        setToast("Enquiry updated successfully");
        closeModal();
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Failed to update enquiry:", err);
      setToast(err.response?.data?.message || "Failed to update enquiry");
    }
  };

  const confirmDelete = async () => {
    if (!selected || deleting) return;

    try {
      setDeleting(true);
      const res = await API.delete(`/contact/${selected.id}`);
      if (res.data?.success) {
        setToast("Enquiry deleted successfully");
        closeModal();
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
      setToast(err.response?.data?.message || "Failed to delete enquiry");
    } finally {
      setDeleting(false);
    }
  };

  /* Escape closes the open popup */
  useEffect(() => {
    if (!modal) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, deleting]);

  /* Lock background scroll while a popup is open */
  useEffect(() => {
    if (!modal) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [modal]);

  /* Toast auto hide */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <main className="ce-page">
      <section className="ce-shell">
        {/* HEADER */}
        <header className="ce-header">
          <div className="ce-header-left">
            <div className="ce-logo">
              <Icon name="mail" size={26} />
            </div>

            <div>
              <h1 className="ce-title"> Enquiry</h1>
              <p className="ce-subtitle">Manage contact enquiries from website</p>
            </div>
          </div>

          <button type="button" className="ce-btn ce-btn-red" onClick={handleExport}>
            <Icon name="download" size={17} />
            Export Enquiries
          </button>
        </header>

        {/* FILTERS */}
        <form className="ce-filters" onSubmit={handleSearch}>
          <label className="ce-search">
            <Icon name="search" size={19} />
            <input
              type="text"
              placeholder="Search by name, email or message..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              aria-label="Search enquiries"
            />
          </label>

          <Dropdown
            variant="filter"
            ariaLabel="Filter by enquiry type"
            value={typeFilter}
            options={TYPE_FILTER_OPTIONS}
            onChange={(v) => {
              setTypeFilter(v);
              setPage(1);
            }}
          />

          <Dropdown
            variant="filter"
            ariaLabel="Filter by status"
            value={statusFilter}
            options={STATUS_FILTER_OPTIONS}
            onChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          />

          <button type="submit" className="ce-btn ce-btn-red">
            <Icon name="search" size={17} />
            Search
          </button>

          <button type="button" className="ce-btn ce-btn-reset" onClick={handleReset}>
            <Icon name="reset" size={17} />
            Reset
          </button>
        </form>

        {/* TABLE */}
        <div className="ce-table-wrap">
          <table className="ce-table">
            <thead>
              <tr>
                <th className="ce-num">#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Enquiry Type</th>
                <th>Message</th>
                <th>Status</th>
                <th>Submitted Date</th>
                <th className="ce-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {pageRows.map((r, i) => {
                const meta = TYPE_META[r.type] || TYPE_META.Others;

                return (
                  <tr key={r.id}>
                    <td className="ce-num">{startIndex + i + 1}</td>

                    <td>
                      <div className="ce-name-cell">
                        <Avatar src={r.photo} name={r.name} />
                        <span className="ce-name">{r.name}</span>
                      </div>
                    </td>

                    <td className="ce-nowrap">{r.email}</td>
                    <td className="ce-nowrap">{r.phone}</td>

                    <td>
                      <span className={`ce-type ${meta.cls}`}>
                        <Icon name={meta.icon} size={14} />
                        {r.type}
                      </span>
                    </td>

                    <td>
                      <span className="ce-msg" title={r.message}>
                        {r.message}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`ce-status ${r.status.toLowerCase()}`}
                        onClick={() => handleStatusToggle(r)}
                        style={{ cursor: "pointer" }}
                        title="Click to toggle status (New -> Replied -> Pending -> Resolved)"
                      >
                        <i className="ce-dot" />
                        {r.status}
                      </span>
                    </td>

                    <td>
                      <div className="ce-date">
                        <Icon name="calendar" size={16} />
                        <span>
                          {r.date}
                          <small>{r.time}</small>
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="ce-actions">
                        <button
                          type="button"
                          className="ce-act view"
                          title="View enquiry"
                          aria-label={`View ${r.name}`}
                          onClick={() => openView(r)}
                        >
                          <Icon name="eye" size={17} />
                        </button>

                        <button
                          type="button"
                          className="ce-act edit"
                          title="Edit enquiry"
                          aria-label={`Edit ${r.name}`}
                          onClick={() => openEdit(r)}
                        >
                          <Icon name="edit" size={17} />
                        </button>

                        <button
                          type="button"
                          className="ce-act del"
                          title="Delete enquiry"
                          aria-label={`Delete ${r.name}`}
                          onClick={() => openDelete(r)}
                        >
                          <Icon name="trash" size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {loading ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center", padding: "40px" }}>
                    <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
                      Loading enquiries from database...
                    </p>
                  </td>
                </tr>
              ) : !pageRows.length ? (
                <tr>
                  <td colSpan="9">
                    <div className="ce-empty">
                      <span>
                        <Icon name="search" size={25} />
                      </span>
                      <strong>No enquiries found</strong>
                      <p>Try changing your search or filters.</p>
                      <button type="button" onClick={handleReset}>
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <footer className="ce-footer">
          <p>
            Showing <strong>{startEntry}</strong> to <strong>{endEntry}</strong> of{" "}
            <strong>{filtered.length}</strong> entries
          </p>

          <div className="ce-pager">
            <button
              type="button"
              aria-label="Previous page"
              disabled={safePage <= 1}
              onClick={() => setPage(safePage - 1)}
            >
              <Icon name="chevron" size={17} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                type="button"
                key={n}
                className={safePage === n ? "active" : ""}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              disabled={safePage >= totalPages}
              onClick={() => setPage(safePage + 1)}
            >
              <Icon name="chevron" size={17} />
            </button>
          </div>
        </footer>
      </section>

      {/* VIEW (compact card) */}
      {modal === "view" &&
        selected &&
        createPortal(
          <div
            className="cm-overlay"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div
              className="cm-modal cm-view"
              role="dialog"
              aria-modal="true"
              aria-label="Enquiry details"
            >
              <div className="cm-view-head">
                <h2>Enquiry Details</h2>

                <button
                  type="button"
                  className="cm-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>

              <div className="cm-view-body">
                <div className="cm-profile">
                  <div className="cm-avatar">{getInitials(selected.name)}</div>

                  <h3>{selected.name}</h3>

                  <div className="cm-chips">
                    <span
                      className={`ce-type ${(TYPE_META[selected.type] || TYPE_META.Others).cls}`}
                    >
                      <Icon
                        name={(TYPE_META[selected.type] || TYPE_META.Others).icon}
                        size={13}
                      />
                      {selected.type}
                    </span>

                    <span className={`ce-status ${selected.status.toLowerCase()}`}>
                      <i className="ce-dot" />
                      {selected.status}
                    </span>
                  </div>
                </div>

                <div className="cm-rows">
                  <div className="cm-row">
                    <span className="cm-row-label">
                      <Icon name="phone" size={16} />
                      Phone
                    </span>
                    <strong>{selected.phone}</strong>
                  </div>

                  <div className="cm-row">
                    <span className="cm-row-label">
                      <Icon name="mail" size={16} />
                      Email
                    </span>
                    <strong>{selected.email}</strong>
                  </div>

                  <div className="cm-row">
                    <span className="cm-row-label">
                      <Icon name="calendar" size={16} />
                      Enquiry date
                    </span>
                    <strong>
                      {selected.date}, {selected.time}
                    </strong>
                  </div>

                  {selected.company && (
                    <div className="cm-row">
                      <span className="cm-row-label">
                        <Icon name="briefcase" size={16} />
                        Company
                      </span>
                      <strong>{selected.company}</strong>
                    </div>
                  )}

                  {selected.service && (
                    <div className="cm-row">
                      <span className="cm-row-label">
                        <Icon name="calendar" size={16} />
                        Service
                      </span>
                      <strong>{selected.service}</strong>
                    </div>
                  )}

                  <div className="cm-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                    <span className="cm-row-label">
                      <Icon name="mail" size={16} />
                      Message
                    </span>
                    <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "#334155", background: "#f8fafc", padding: "12px", borderRadius: "8px", width: "100%", whiteSpace: "pre-wrap", border: "1px solid #e2e8f0" }}>
                      {selected.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="cm-view-actions">
                <button
                  type="button"
                  className="cm-view-edit"
                  onClick={() => openEdit(selected)}
                >
                  <Icon name="edit" size={16} />
                  Edit enquiry
                </button>

                <button type="button" className="cm-view-close" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* EDIT */}
      {modal === "edit" && selected && (
        <ModalShell
          title="Edit Enquiry"
          subtitle="Update the enquiry details"
          size="md"
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="cm-btn cm-btn-light" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" form="cm-form" className="cm-btn cm-btn-red">
                Save Changes
              </button>
            </>
          }
        >
          <form id="cm-form" className="cm-form" onSubmit={handleSave} noValidate>
            <div className="cm-field">
              <label>
                Full Name <span>*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder="Enter full name"
              />
              {errors.name && <small>{errors.name}</small>}
            </div>

            <div className="cm-field">
              <label>
                Email Address <span>*</span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                placeholder="example@email.com"
              />
              {errors.email && <small>{errors.email}</small>}
            </div>

            <div className="cm-field">
              <label>
                Phone Number <span>*</span>
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                placeholder="Enter phone number"
              />
              {errors.phone && <small>{errors.phone}</small>}
            </div>

            <div className="cm-field">
              <label>Enquiry Type</label>
              <Dropdown
                variant="form"
                ariaLabel="Enquiry type"
                value={form.type}
                options={TYPE_FORM_OPTIONS}
                onChange={(v) => setFormValue("type", v)}
              />
            </div>

            <div className="cm-field cm-full">
              <label>Status</label>
              <Dropdown
                variant="form"
                ariaLabel="Status"
                value={form.status}
                options={STATUS_FORM_OPTIONS}
                onChange={(v) => setFormValue("status", v)}
              />
            </div>

            <div className="cm-field cm-full">
              <label>
                Message <span>*</span>
              </label>
              <textarea
                name="message"
                rows="3"
                value={form.message}
                onChange={handleFormChange}
                placeholder="Enter enquiry message..."
              />
              {errors.message && <small>{errors.message}</small>}
            </div>
          </form>
        </ModalShell>
      )}

      {/* DELETE */}
      {modal === "delete" && selected && (
        <ModalShell
          title="Delete Enquiry"
          size="sm"
          onClose={closeModal}
          closeDisabled={deleting}
          footer={
            <>
              <button
                type="button"
                className="cm-btn cm-btn-light"
                onClick={closeModal}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="cm-btn cm-btn-danger"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </>
          }
        >
          <div className="cm-delete">
            <div className="cm-delete-icon">
              <Icon name="alert" size={26} />
            </div>
            <h3>Delete {selected.name}?</h3>
            <p>
              This action cannot be undone. The enquiry data will be removed
              permanently.
            </p>
          </div>
        </ModalShell>
      )}

      {/* TOAST */}
      {toast && (
        <div className="ce-toast" role="status">
          <span className="ce-toast-check">
            <Icon name="check" size={13} />
          </span>
          {toast}
        </div>
      )}
    </main>
  );
}