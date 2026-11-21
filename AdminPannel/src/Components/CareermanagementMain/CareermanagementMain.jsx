import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./CareermanagementMain.css";

/* =========================================
   CONSTANTS
========================================= */

const JOB_TYPES = ["Full Time", "Part Time", "Contract", "Remote", "Internship"];
const STATUSES = ["Active", "Inactive", "Draft"];
const PAGE_SIZE = 5;

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&auto=format&fit=crop&q=80";

const INITIAL_JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    subtitle: "Join our innovative tech team and build engaging digital experiences.",
    location: "New York",
    salary: "$60k – $80k",
    experience: "2–5 Years",
    type: "Full Time",
    status: "Active",
    posted: "20 Nov 2025",
    time: "10:30 AM",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=85",
    department: "Technology",
    vacancies: 3,
    description:
      "We are looking for a creative Frontend Developer to build fast, accessible and responsive web experiences.",
    requirements:
      "Strong React and JavaScript skills; understanding of responsive design, REST APIs and Git.",
  },
  {
    id: 2,
    title: "Project Manager",
    subtitle: "Lead projects and deliver outstanding results with our team.",
    location: "London",
    salary: "$70k – $90k",
    experience: "5+ Years",
    type: "Full Time",
    status: "Active",
    posted: "18 Nov 2025",
    time: "02:15 PM",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&auto=format&fit=crop&q=85",
    department: "Operations",
    vacancies: 2,
    description:
      "Own project plans from discovery through delivery and coordinate cross-functional teams.",
    requirements: "Five or more years of project delivery experience and strong planning skills.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    subtitle: "Design amazing experiences that people love to use.",
    location: "Dubai",
    salary: "$50k – $70k",
    experience: "2–4 Years",
    type: "Part Time",
    status: "Active",
    posted: "15 Nov 2025",
    time: "11:20 AM",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop&q=85",
    department: "Design",
    vacancies: 1,
    description:
      "Create thoughtful user journeys, wireframes and polished interfaces for web and mobile products.",
    requirements: "A strong portfolio, Figma expertise and a user-centred approach.",
  },
  {
    id: 4,
    title: "Marketing Specialist",
    subtitle: "Grow our brand globally and connect with new audiences.",
    location: "Singapore",
    salary: "$45k – $65k",
    experience: "1–3 Years",
    type: "Full Time",
    status: "Active",
    posted: "12 Nov 2025",
    time: "04:45 PM",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&auto=format&fit=crop&q=85",
    department: "Marketing",
    vacancies: 2,
    description:
      "Plan and execute digital campaigns and analyse campaign performance across channels.",
    requirements: "Experience with digital campaigns, analytics and social media.",
  },
  {
    id: 5,
    title: "SEO Executive",
    subtitle: "Optimise and improve our online presence across search.",
    location: "India",
    salary: "$30k – $50k",
    experience: "1–2 Years",
    type: "Part Time",
    status: "Active",
    posted: "10 Nov 2025",
    time: "09:30 AM",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=85",
    department: "Marketing",
    vacancies: 1,
    description:
      "Improve organic visibility through keyword research, on-page optimisation and technical audits.",
    requirements: "Knowledge of SEO tools, Google Analytics and Search Console.",
  },
];

/* =========================================
   HELPERS
========================================= */

const makeEmptyForm = () => ({
  title: "",
  subtitle: "",
  location: "",
  salary: "",
  experience: "",
  type: "Full Time",
  status: "Active",
  department: "",
  vacancies: "1",
  image: "",
  description: "",
  requirements: "",
});

const nowDate = () =>
  new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const nowTime = () =>
  new Date()
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    .toUpperCase();

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

const validateForm = (f) => {
  const e = {};
  if (!f.title.trim()) e.title = "Job title is required.";
  else if (f.title.trim().length < 3) e.title = "Title must be at least 3 characters.";
  if (!f.location.trim()) e.location = "Location is required.";
  if (!f.salary.trim()) e.salary = "Salary range is required.";
  if (!f.description.trim()) e.description = "Job description is required.";
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
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    briefcaseSmall: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5h8v2" />
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
        <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
        <path d="M3 3v5h5" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
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
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    left: <path d="m15 18-6-6 6-6" />,
    right: <path d="m9 18 6-6-6-6" />,
    chevron: <path d="m7 10 5 5 5-5" />,
    tick: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    money: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9a2.5 2.5 0 0 0-2.5-1.5c-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2A2.5 2.5 0 0 1 9.5 15M12 6v1.5M12 16.5V18" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
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

  return <svg {...common}>{icons[name] || icons.briefcase}</svg>;
};

/* =========================================
   BADGES
========================================= */

const TypeBadge = ({ type }) => (
  <span className={`career-type-badge ${type.toLowerCase().replace(/\s+/g, "-")}`}>
    <Icon name="briefcaseSmall" size={14} />
    {type}
  </span>
);

const StatusBadge = ({ status }) => (
  <span className={`career-status ${status.toLowerCase()}`}>
    <i />
    {status}
  </span>
);

/* =========================================
   CUSTOM DROPDOWN  (prefix: cs-)
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
    <div className={`cs-wrap ${open ? "open" : ""}`} ref={wrapRef} onKeyDown={onKeyDown}>
      <button
        type="button"
        id={id}
        ref={triggerRef}
        className={`cs-trigger ${value ? "has-value" : ""} ${invalid ? "invalid" : ""}`}
        onClick={() => (open ? closeMenu() : openMenu())}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-label={label || placeholder}
        title={label || placeholder}
      >
        <span className="cs-trigger-text">{triggerText}</span>
        <span className="cs-chevron">
          <Icon name="chevron" size={18} />
        </span>
      </button>

      {open && pos && (
        <ul
          className="cs-menu"
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
                className={`cs-option ${isSelected ? "selected" : ""} ${
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
   POPUP ARCHITECTURE  (prefix: cr-)
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
      className="cr-overlay"
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
  const body = <div className="cr-body">{children}</div>;
  const foot = <div className="cr-foot">{footer}</div>;

  return (
    <Overlay onClose={onClose}>
      <div
        className={`cr-modal cr-modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="cr-head">
          <div className="cr-head-text">
            <h3 id={titleId}>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button
            type="button"
            className="cr-x"
            onClick={onClose}
            disabled={closeDisabled}
            title="Close"
            aria-label="Close"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {onSubmit ? (
          <form className="cr-form-wrap" onSubmit={onSubmit} noValidate>
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
  <div className={`cr-field ${full ? "full" : ""} ${error ? "has-error" : ""}`}>
    <label htmlFor={id}>
      {label}
      {required && (
        <span className="cr-req" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
    {children}
    {error && (
      <p className="cr-error" id={`${id}-err`} role="alert">
        {error}
      </p>
    )}
  </div>
);

/* =========================================
   MAIN COMPONENT
========================================= */

export default function CareermanagementMain() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState("");
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState(makeEmptyForm);
  const [errors, setErrors] = useState({});

  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  const deleteTimer = useRef(null);

  /* ---------- derived ---------- */

  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location))].sort(),
    [jobs]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((job) => {
      if (locationFilter && job.location !== locationFilter) return false;
      if (typeFilter && job.type !== typeFilter) return false;
      if (!q) return true;
      return [
        job.title,
        job.subtitle,
        job.department,
        job.location,
        job.salary,
        job.experience,
        job.type,
        job.status,
        job.posted,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [jobs, search, locationFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const showingFrom = filtered.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + PAGE_SIZE, filtered.length);

  const hasActiveFilters = Boolean(search || locationFilter || typeFilter);

  /* ---------- effects ---------- */

  useEffect(() => {
    if (currentPage !== safePage) setCurrentPage(safePage);
  }, [currentPage, safePage]);

  useEffect(() => {
    if (locationFilter && !locations.includes(locationFilter)) setLocationFilter("");
  }, [locations, locationFilter]);

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

  const handleLocationChange = (v) => {
    setLocationFilter(v);
    setCurrentPage(1);
  };

  const handleTypeChange = (v) => {
    setTypeFilter(v);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setLocationFilter("");
    setTypeFilter("");
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

  const openEditModal = (job) => {
    setSelected(job);
    setForm({ ...makeEmptyForm(), ...job, vacancies: String(job.vacancies || 1) });
    setErrors({});
    setModal("edit");
  };

  const openViewModal = (job) => {
    setSelected(job);
    setModal("view");
  };

  const openDeleteModal = (job) => {
    setSelected(job);
    setModal("delete");
  };

  const closeModal = () => {
    if (deleting) return;
    setModal("");
    setSelected(null);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = validateForm(form);
    setErrors(found);

    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      requestAnimationFrame(() => document.getElementById(`cr-f-${firstKey}`)?.focus());
      return;
    }

    const cleaned = {
      ...form,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      location: form.location.trim(),
      salary: form.salary.trim(),
      experience: form.experience.trim(),
      department: form.department.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      requirements: form.requirements.trim(),
      vacancies: Math.max(1, Number(form.vacancies) || 1),
    };

    if (modal === "edit" && selected) {
      setJobs((prev) =>
        prev.map((j) => (j.id === selected.id ? { ...j, ...cleaned, id: j.id } : j))
      );
      setToast("Career updated successfully");
    } else {
      setJobs((prev) => [
        { ...cleaned, id: Date.now(), posted: nowDate(), time: nowTime() },
        ...prev,
      ]);
      setCurrentPage(1);
      setToast("Career created successfully");
    }

    setModal("");
    setSelected(null);
    setErrors({});
  };

  const confirmDelete = () => {
    if (!selected || deleting) return;
    const id = selected.id;
    setDeleting(true);

    deleteTimer.current = setTimeout(() => {
      setJobs((prev) => prev.filter((j) => j.id !== id));
      setDeleting(false);
      setModal("");
      setSelected(null);
      setToast("Career deleted successfully");
    }, 500);
  };

  const isAdd = modal === "add";

  /* =========================================
     RENDER
  ========================================= */

  return (
    <main className="career-page">
      <section className="career-shell">
        {/* HEADER */}

        <header className="career-header">
          <div className="career-heading">
            <div className="career-heading-icon">
              <Icon name="briefcase" size={27} />
            </div>
            <div>
              <h1>Career Management</h1>
              <p>Manage job postings and career opportunities</p>
            </div>
          </div>

          <button
            type="button"
            className="career-primary-btn"
            onClick={openAddModal}
            title="Add New Career"
          >
            <Icon name="plus" size={17} />
            Add New Career
          </button>
        </header>

        {/* TOOLBAR */}

        <section className="career-toolbar">
          <div className="career-search">
            <Icon name="search" size={19} />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applySearch();
                }
              }}
              placeholder="Search by job title..."
              aria-label="Search careers"
            />
          </div>

          <CustomSelect
            id="cr-filter-location"
            value={locationFilter}
            onChange={handleLocationChange}
            options={locations}
            placeholder="All Locations"
            label="Filter by location"
          />

          <CustomSelect
            id="cr-filter-type"
            value={typeFilter}
            onChange={handleTypeChange}
            options={JOB_TYPES}
            placeholder="All Job Types"
            label="Filter by job type"
          />

          <button
            type="button"
            className="career-primary-btn career-search-btn"
            onClick={applySearch}
            title="Search"
            aria-label="Search"
          >
            <Icon name="search" size={16} />
            Search
          </button>

          <button
            type="button"
            className="career-reset-btn"
            onClick={resetFilters}
            title="Reset all filters"
            aria-label="Reset all filters"
          >
            <Icon name="reset" size={17} />
            Reset
          </button>
        </section>

        {/* TABLE */}

        <div className="career-table-wrap">
          <table className="career-table">
            <thead>
              <tr>
                <th className="career-number-col">#</th>
                <th>Job Title</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Experience</th>
                <th>Job Type</th>
                <th>Status</th>
                <th>Posted Date</th>
                <th className="career-actions-head">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visible.length > 0 ? (
                visible.map((job, index) => (
                  <tr key={job.id}>
                    <td className="career-number-col" data-label="#">
                      {startIndex + index + 1}
                    </td>

                    <td data-label="Job Title">
                      <div className="career-job-cell">
                        <img
                          className="career-job-thumb"
                          src={job.image || FALLBACK_IMG}
                          alt={job.title}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = FALLBACK_IMG;
                          }}
                        />
                        <div className="career-job-copy">
                          <strong>{job.title}</strong>
                          <span>{job.subtitle}</span>
                        </div>
                      </div>
                    </td>

                    <td data-label="Location">
                      <span className="career-location">
                        <Icon name="pin" size={17} />
                        {job.location}
                      </span>
                    </td>

                    <td data-label="Salary">
                      <span className="career-salary-wrap">
                        <strong className="career-salary">{job.salary}</strong>
                        <small className="career-per-year">/ year</small>
                      </span>
                    </td>

                    <td className="career-experience" data-label="Experience">
                      {job.experience}
                    </td>

                    <td data-label="Job Type">
                      <TypeBadge type={job.type} />
                    </td>

                    <td data-label="Status">
                      <StatusBadge status={job.status} />
                    </td>

                    <td data-label="Posted Date">
                      <span className="career-date">
                        <Icon name="calendar" size={17} />
                        <span>
                          {job.posted}
                          <small>{job.time}</small>
                        </span>
                      </span>
                    </td>

                    <td data-label="Actions">
                      <div className="career-actions">
                        <button
                          type="button"
                          className="career-icon-btn view"
                          title="View career"
                          aria-label={`View ${job.title}`}
                          onClick={() => openViewModal(job)}
                        >
                          <Icon name="eye" size={17} />
                        </button>

                        <button
                          type="button"
                          className="career-icon-btn edit"
                          title="Edit career"
                          aria-label={`Edit ${job.title}`}
                          onClick={() => openEditModal(job)}
                        >
                          <Icon name="edit" size={17} />
                        </button>

                        <button
                          type="button"
                          className="career-icon-btn delete"
                          title="Delete career"
                          aria-label={`Delete ${job.title}`}
                          onClick={() => openDeleteModal(job)}
                        >
                          <Icon name="trash" size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="career-empty-row">
                  <td colSpan={9}>
                    <div className="career-empty">
                      <span>
                        <Icon name="briefcase" size={26} />
                      </span>
                      <strong>No career postings found</strong>
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

        {/* FOOTER */}

        <footer className="career-table-footer">
          <p aria-live="polite">
            Showing <strong>{showingFrom}</strong> to <strong>{showingTo}</strong> of{" "}
            <strong>{filtered.length}</strong> entries
          </p>

          <nav className="career-pagination" aria-label="Pagination">
            <button
              type="button"
              className="career-page-arrow"
              disabled={safePage === 1}
              onClick={() => changePage(safePage - 1)}
              aria-label="Previous page"
              title="Previous page"
            >
              <Icon name="left" size={16} />
            </button>

            {getPageList(safePage, totalPages).map((page) =>
              typeof page === "string" ? (
                <span key={page} className="career-page-gap" aria-hidden="true">
                  …
                </span>
              ) : (
                <button
                  type="button"
                  key={page}
                  className={`career-page-number ${safePage === page ? "active" : ""}`}
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
              className="career-page-arrow"
              disabled={safePage === totalPages}
              onClick={() => changePage(safePage + 1)}
              aria-label="Next page"
              title="Next page"
            >
              <Icon name="right" size={16} />
            </button>
          </nav>
        </footer>
      </section>

      {/* =====================================
          ADD / EDIT POPUP
      ===================================== */}

      {(modal === "add" || modal === "edit") && (
        <ModalShell
          title={isAdd ? "Add New Career" : "Edit Career"}
          subtitle={
            isAdd
              ? "Fill in the details to publish a career opportunity."
              : "Update the career details."
          }
          onClose={closeModal}
          onSubmit={handleSubmit}
          size="md"
          footer={
            <>
              <button type="button" className="cr-btn cr-btn-ghost" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className="cr-btn cr-btn-red">
                {isAdd ? "Publish Career" : "Save Changes"}
              </button>
            </>
          }
        >
          <div className="cr-grid">
            <Field id="cr-f-title" label="Job Title" required full error={errors.title}>
              <input
                id="cr-f-title"
                type="text"
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? "cr-f-title-err" : undefined}
              />
            </Field>

            <Field id="cr-f-subtitle" label="Short Description" full>
              <input
                id="cr-f-subtitle"
                type="text"
                value={form.subtitle}
                onChange={(e) => updateForm("subtitle", e.target.value)}
                placeholder="A short introduction to this role"
              />
            </Field>

            <Field id="cr-f-location" label="Location" required error={errors.location}>
              <input
                id="cr-f-location"
                type="text"
                value={form.location}
                onChange={(e) => updateForm("location", e.target.value)}
                placeholder="e.g. New York"
                aria-invalid={Boolean(errors.location)}
                aria-describedby={errors.location ? "cr-f-location-err" : undefined}
              />
            </Field>

            <Field id="cr-f-salary" label="Salary Range" required error={errors.salary}>
              <input
                id="cr-f-salary"
                type="text"
                value={form.salary}
                onChange={(e) => updateForm("salary", e.target.value)}
                placeholder="e.g. $60k – $80k"
                aria-invalid={Boolean(errors.salary)}
                aria-describedby={errors.salary ? "cr-f-salary-err" : undefined}
              />
            </Field>

            <Field id="cr-f-experience" label="Experience">
              <input
                id="cr-f-experience"
                type="text"
                value={form.experience}
                onChange={(e) => updateForm("experience", e.target.value)}
                placeholder="e.g. 2–5 Years"
              />
            </Field>

            <Field id="cr-f-department" label="Department">
              <input
                id="cr-f-department"
                type="text"
                value={form.department}
                onChange={(e) => updateForm("department", e.target.value)}
                placeholder="e.g. Technology"
              />
            </Field>

            <Field id="cr-f-type" label="Job Type">
              <CustomSelect
                id="cr-f-type"
                value={form.type}
                onChange={(v) => updateForm("type", v)}
                options={JOB_TYPES}
                allowEmpty={false}
                label="Job type"
              />
            </Field>

            <Field id="cr-f-status" label="Status">
              <CustomSelect
                id="cr-f-status"
                value={form.status}
                onChange={(v) => updateForm("status", v)}
                options={STATUSES}
                allowEmpty={false}
                label="Status"
              />
            </Field>

            <Field id="cr-f-vacancies" label="Vacancies">
              <input
                id="cr-f-vacancies"
                type="number"
                min="1"
                value={form.vacancies}
                onChange={(e) => updateForm("vacancies", e.target.value)}
              />
            </Field>

            <Field id="cr-f-image" label="Job Image URL">
              <input
                id="cr-f-image"
                type="text"
                inputMode="url"
                value={form.image}
                onChange={(e) => updateForm("image", e.target.value)}
                placeholder="https://..."
              />
            </Field>

            <Field
              id="cr-f-description"
              label="Job Description"
              required
              full
              error={errors.description}
            >
              <textarea
                id="cr-f-description"
                rows={3}
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Describe the role and responsibilities..."
                aria-invalid={Boolean(errors.description)}
                aria-describedby={errors.description ? "cr-f-description-err" : undefined}
              />
            </Field>

            <Field id="cr-f-requirements" label="Requirements" full>
              <textarea
                id="cr-f-requirements"
                rows={3}
                value={form.requirements}
                onChange={(e) => updateForm("requirements", e.target.value)}
                placeholder="Skills, qualifications and experience..."
              />
            </Field>
          </div>
        </ModalShell>
      )}

      {/* =====================================
          VIEW POPUP
      ===================================== */}

      {modal === "view" && selected && (
        <Overlay onClose={closeModal}>
          <div className="cr-view" role="dialog" aria-modal="true" aria-labelledby="cr-view-title">
            <div className="cr-view-head">
              <h3 id="cr-view-title">Career Details</h3>
              <button
                type="button"
                className="cr-x"
                onClick={closeModal}
                title="Close"
                aria-label="Close"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="cr-view-body">
              <div className="cr-profile">
                <div className="cr-avatar" aria-hidden="true">
                  {getInitials(selected.title)}
                </div>
                <h4>{selected.title}</h4>
                <div className="cr-chips">
                  <TypeBadge type={selected.type} />
                  <StatusBadge status={selected.status} />
                </div>
              </div>

              <div className="cr-rows">
                <div className="cr-row">
                  <span className="cr-row-label">
                    <Icon name="pin" size={17} />
                    Location
                  </span>
                  <strong className="cr-row-value">{selected.location}</strong>
                </div>
                <div className="cr-row">
                  <span className="cr-row-label">
                    <Icon name="money" size={17} />
                    Salary
                  </span>
                  <strong className="cr-row-value">{selected.salary}</strong>
                </div>
                <div className="cr-row">
                  <span className="cr-row-label">
                    <Icon name="clock" size={17} />
                    Experience
                  </span>
                  <strong className="cr-row-value">{selected.experience}</strong>
                </div>
                <div className="cr-row">
                  <span className="cr-row-label">
                    <Icon name="calendar" size={17} />
                    Posted date
                  </span>
                  <strong className="cr-row-value">
                    {selected.posted}, {selected.time}
                  </strong>
                </div>
              </div>
            </div>

            <div className="cr-view-actions">
              <button
                type="button"
                className="cr-btn cr-btn-red"
                onClick={() => openEditModal(selected)}
              >
                <Icon name="edit" size={16} />
                Edit career
              </button>
              <button type="button" className="cr-btn cr-btn-ghost" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </Overlay>
      )}

      {/* =====================================
          DELETE POPUP
      ===================================== */}

      {modal === "delete" && selected && (
        <ModalShell
          title="Delete Career"
          onClose={closeModal}
          closeDisabled={deleting}
          size="sm"
          footer={
            <>
              <button
                type="button"
                className="cr-btn cr-btn-ghost"
                onClick={closeModal}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="cr-btn cr-btn-red"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </>
          }
        >
          <div className="cr-del-body">
            <div className="cr-del-icon">
              <Icon name="warning" size={30} />
            </div>
            <h4>Delete {selected.title}?</h4>
            <p>This action cannot be undone. The career data will be removed permanently.</p>
          </div>
        </ModalShell>
      )}

      {/* TOAST */}

      {toast &&
        createPortal(
          <div className="cr-toast" role="status" aria-live="polite">
            <Icon name="check" size={18} />
            <span>{toast}</span>
          </div>,
          document.body
        )}
    </main>
  );
}