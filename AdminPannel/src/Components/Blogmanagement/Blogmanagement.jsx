import React, {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import "./Blogmanagement.css";

/* Helper to resolve uploaded images or external URLs */
const resolveImage = (src) => {
  if (!src) return FALLBACK_IMG;
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }
  const baseUrl = import.meta.env.VITE_UPLOADS_URL || "http://localhost:5000/uploads/";
  return `${baseUrl.replace(/\/+$/, "")}/${src.replace(/^\/+/, "")}`;
};

/* =========================================
   CONSTANTS
========================================= */

const STATUSES = ["Draft", "Published"];

const PAGE_SIZE = 5;

const TIME_RE = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
const IMAGE_RE = /^(https?:\/\/|\/|data:image\/|blob:)/i;

/* Offline-safe fallback image (no external request) */
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100" viewBox="0 0 160 100">' +
      '<rect width="160" height="100" fill="#fcecef"/>' +
      '<g fill="none" stroke="#cd101b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="62" y="30" width="36" height="40" rx="4"/><path d="M70 44h20M70 52h20M70 60h12"/></g></svg>'
  );

/* =========================================
   INITIAL BLOG DATA
========================================= */

const INITIAL_BLOGS = [];

/* =========================================
   HELPERS
========================================= */

/* Real current date in LOCAL time (toISOString would use UTC) */
const todayISO = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

const makeEmptyForm = () => ({
  title: "",
  description: "",
  category: "",
  author: "",
  location: "",
  status: "Draft",
  date: todayISO(),
  time: "10:00 AM",
  image: "",
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

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getPageList = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, current - 1, current, current + 1]);
  const list = [...set]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const out = [];
  list.forEach((p, i) => {
    if (i > 0 && p - list[i - 1] > 1) out.push(`gap-${p}`);
    out.push(p);
  });
  return out;
};

const validateForm = (f) => {
  const errors = {};

  if (!f.title.trim()) errors.title = "Blog title is required.";
  else if (f.title.trim().length < 5)
    errors.title = "Title must be at least 5 characters.";

  if (!f.category) errors.category = "Please choose a category.";
  if (!f.author.trim()) errors.author = "Author name is required.";
  if (!f.location.trim()) errors.location = "Location is required.";

  if (!f.date || Number.isNaN(Date.parse(f.date)))
    errors.date = "Please choose a valid date.";

  if (!TIME_RE.test(f.time.trim()))
    errors.time = "Use a time like 10:30 AM.";

  if (f.image.trim() && !IMAGE_RE.test(f.image.trim()))
    errors.image = "Enter a valid image link (https://...).";

  return errors;
};

/* =========================================
   SVG ICONS
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
    document: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
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
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
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
   SAFE IMAGE (fallback on error / empty)
========================================= */

const SafeImage = ({ src, alt, className }) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <img
      className={className}
      src={!src || failed ? FALLBACK_IMG : resolveImage(src)}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

/* =========================================
   BADGES
========================================= */

const CATEGORY_CLASS = {
  Architecture: "architecture",
  "Facility Management": "facility",
  "About Us": "about",
  Commercial: "commercial",
  Sustainability: "sustainability",
};

const CategoryBadge = ({ category }) => (
  <span
    className={`blog-category ${CATEGORY_CLASS[category] || "architecture"}`}
  >
    <span className="cat-dot" />
    {category}
  </span>
);

const StatusBadge = ({ status, onClick }) => {
  const isClickable = Boolean(onClick);
  return (
    <span
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`blog-status ${status === "Published" ? "published" : "draft"} ${
        isClickable ? "status-toggleable" : ""
      }`}
      title={isClickable ? `Click to toggle status (currently ${status})` : undefined}
    >
      <span className="status-dot" />
      {status}
    </span>
  );
};

/* =========================================
   PREMIUM CUSTOM DROPDOWN  (prefix: cs-)
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

  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.value === value)
  );
  const selected = items.find((item) => item.value === value);
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

  /* Close on outside click / touch */
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

  /* Close on resize / outside scroll (menu is positioned with fixed) */
  useEffect(() => {
    if (!open) return undefined;
    const onChangeView = (e) => {
      if (menuRef.current && e.target instanceof Node && menuRef.current.contains(e.target))
        return;
      closeMenu();
    };
    window.addEventListener("resize", onChangeView);
    window.addEventListener("scroll", onChangeView, true);
    return () => {
      window.removeEventListener("resize", onChangeView);
      window.removeEventListener("scroll", onChangeView, true);
    };
  }, [open]);

  /* Keep the active row visible */
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
        /* preventDefault tells the popup behind NOT to close */
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
    <div
      className={`cs-wrap ${open ? "open" : ""}`}
      ref={wrapRef}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        id={id}
        ref={triggerRef}
        className={`cs-trigger ${value ? "has-value" : ""} ${
          invalid ? "invalid" : ""
        }`}
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
   POPUP ARCHITECTURE  (prefix: bm-)
   Overlay  -> portal + scroll lock + Escape + outside click
   ModalShell -> reusable shell for add / edit / delete
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
      className="bm-overlay"
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

  const body = <div className="bm-modal-body">{children}</div>;
  const foot = <div className="bm-modal-foot">{footer}</div>;

  return (
    <Overlay onClose={onClose}>
      <div
        className={`bm-modal bm-modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="bm-modal-head">
          <div className="bm-modal-titles">
            <h3 id={titleId}>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <button
            type="button"
            className="bm-x"
            onClick={onClose}
            disabled={closeDisabled}
            title="Close"
            aria-label="Close"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {onSubmit ? (
          <form className="bm-modal-form" onSubmit={onSubmit} noValidate>
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

/* Form field wrapper: label + red * + error text */
const Field = ({ id, label, required, error, full, children }) => (
  <div className={`bm-field ${full ? "full" : ""} ${error ? "has-error" : ""}`}>
    <label htmlFor={id}>
      {label}
      {required && (
        <span className="bm-req" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
    {children}
    {error && (
      <p className="bm-error" id={`${id}-err`} role="alert">
        {error}
      </p>
    )}
  </div>
);

/* =========================================
   MAIN COMPONENT
========================================= */

const Blogmanagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [form, setForm] = useState(makeEmptyForm);
  const [errors, setErrors] = useState({});

  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  const navigate = useNavigate();

  const handleToggleStatus = async (blog) => {
    const newStatus = blog.status === "Published" ? "Draft" : "Published";
    try {
      const res = await API.put(`/blogs/${blog.id}`, { status: newStatus });
      if (res.data?.success) {
        setBlogs((prev) =>
          prev.map((item) => (item.id === blog.id ? { ...item, status: newStatus } : item))
        );
        setToast(`Status toggled to ${newStatus}`);
      }
    } catch (err) {
      setToast(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleEditBlog = (blog) => {
    navigate(`/blog/add?id=${blog.id}`, { state: { blog } });
  };

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/blogs?all=true");
      if (res.data?.success) {
        setBlogs(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    API.get("/blog-categories?all=true")
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          const names = res.data.data
            .filter((c) => c.status === "Active")
            .map((c) => c.name);
          if (names.length > 0) setCategoriesList(names);
        }
      })
      .catch(() => {});
  }, []);

  /* ---------- derived data ---------- */

  const authors = useMemo(
    () => [...new Set(blogs.map((blog) => blog.author))].sort(),
    [blogs]
  );

  /* LIVE search across every useful field */
  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory =
        !categoryFilter || blog.category === categoryFilter;
      const matchesAuthor = !authorFilter || blog.author === authorFilter;

      if (!matchesCategory || !matchesAuthor) return false;
      if (!query) return true;

      const haystack = [
        blog.title,
        blog.description,
        blog.category,
        blog.author,
        blog.location,
        blog.status,
        blog.date,
        formatDate(blog.date),
        blog.time,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [blogs, search, categoryFilter, authorFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;

  const visibleBlogs = filteredBlogs.slice(startIndex, startIndex + PAGE_SIZE);

  const showingFrom = filteredBlogs.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + PAGE_SIZE, filteredBlogs.length);

  const hasActiveFilters = Boolean(search || categoryFilter || authorFilter);

  /* ---------- effects ---------- */

  /* Clamp the page if it goes out of range */
  useEffect(() => {
    if (currentPage !== safePage) setCurrentPage(safePage);
  }, [currentPage, safePage]);

  /* Drop an author filter whose author no longer exists */
  useEffect(() => {
    if (authorFilter && !authors.includes(authorFilter)) setAuthorFilter("");
  }, [authors, authorFilter]);

  /* Toast auto hide */
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  /* Clear pending timers on unmount */
  useEffect(() => () => clearTimeout(deleteTimer.current), []);

  /* ---------- filter handlers (all reset to page 1) ---------- */

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const applySearch = () => {
    setSearch((value) => value.trim());
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleAuthorChange = (value) => {
    setAuthorFilter(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setAuthorFilter("");
    setCurrentPage(1);
  };

  const changePage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  /* ---------- popup handlers ---------- */

  const updateForm = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const openAddModal = () => {
    setSelectedBlog(null);
    setForm(makeEmptyForm());
    setErrors({});
    setModal("add");
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setForm({ ...makeEmptyForm(), ...blog });
    setErrors({});
    setModal("edit");
  };

  const openViewModal = (blog) => {
    setSelectedBlog(blog);
    setModal("view");
  };

  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setModal("delete");
  };

  const closeModal = () => {
    if (deleting) return;
    setModal("");
    setSelectedBlog(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = validateForm(form);
    setErrors(found);

    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      requestAnimationFrame(() =>
        document.getElementById(`bm-f-${firstKey}`)?.focus()
      );
      return;
    }

    /* Trim values on save */
    const cleaned = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      author: form.author.trim(),
      location: form.location.trim(),
      time: form.time.trim().toUpperCase(),
      image: form.image.trim(),
    };

    try {
      if (modal === "edit" && selectedBlog) {
        const res = await API.put(`/blogs/${selectedBlog.id}`, cleaned);
        if (res.data?.success) {
          setToast("Blog updated successfully");
          fetchBlogs();
        }
      } else {
        const res = await API.post("/blogs", cleaned);
        if (res.data?.success) {
          setToast("Blog created successfully");
          setCurrentPage(1);
          fetchBlogs();
        }
      }
    } catch (err) {
      setToast(err.response?.data?.message || "Failed to save blog");
    }

    setModal("");
    setSelectedBlog(null);
    setErrors({});
  };

  const confirmDelete = async () => {
    if (!selectedBlog || deleting) return;

    const id = selectedBlog.id;
    setDeleting(true);

    try {
      const res = await API.delete(`/blogs/${id}`);
      if (res.data?.success) {
        setToast("Blog deleted successfully");
        fetchBlogs();
      }
    } catch (err) {
      setToast(err.response?.data?.message || "Failed to delete blog");
    } finally {
      setDeleting(false);
      setModal("");
      setSelectedBlog(null);
    }
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <section className="blogmanagement-page">
      {/* HEADER */}

      <div className="blogmanagement-header">
        <div className="blogmanagement-heading">
          <div className="blogmanagement-heading-icon">
            <Icon name="document" size={29} />
          </div>

          <div>
            <h2>Blog Management</h2>
            <p>Manage your blog posts and articles</p>
          </div>
        </div>

        <button
          type="button"
          className="blogmanagement-primary-btn"
          onClick={openAddModal}
          title="Add New Blog"
        >
          <Icon name="plus" size={17} />
          Add New Blog
        </button>
      </div>

      {/* FILTER BAR */}

      <div className="blogmanagement-filter-section">
        <div className="blogmanagement-search-box">
          <Icon name="search" size={19} />

          <input
            type="text"
            placeholder="Search title, author, location, status..."
            aria-label="Search blogs"
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
          id="bm-filter-category"
          value={categoryFilter}
          onChange={handleCategoryChange}
          options={categoriesList}
          placeholder="All Categories"
          label="Filter by category"
        />

        <CustomSelect
          id="bm-filter-author"
          value={authorFilter}
          onChange={handleAuthorChange}
          options={authors}
          placeholder="All Authors"
          label="Filter by author"
        />

        <button
          type="button"
          className="blogmanagement-search-btn"
          onClick={applySearch}
          title="Search"
          aria-label="Search"
        >
          <Icon name="search" size={16} />
          Search
        </button>

        <button
          type="button"
          className="blogmanagement-reset-btn"
          onClick={resetFilters}
          title="Reset all filters"
          aria-label="Reset all filters"
        >
          <Icon name="reset" size={17} />
          Reset
        </button>
      </div>

      {/* TABLE */}

      <div className="blogmanagement-table-container">
        <table className="blogmanagement-table">
          <thead>
            <tr>
              <th className="number-column">#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Location</th>
              <th>Status</th>
              <th>Published Date</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleBlogs.length > 0 ? (
              visibleBlogs.map((blog, index) => (
                <tr key={blog.id}>
                  <td className="blog-number">{startIndex + index + 1}</td>

                  <td>
                    <div className="blogmanagement-table-image">
                      <SafeImage src={blog.image} alt={blog.title} />
                    </div>
                  </td>

                  <td className="blogmanagement-title-cell">
                    <strong>{blog.title}</strong>
                    <span>{blog.description}</span>
                  </td>

                  <td>
                    <CategoryBadge category={blog.category} />
                  </td>

                  <td>
                    <span className="blogmanagement-author">{blog.author}</span>
                  </td>

                  <td>
                    <div className="blogmanagement-location">
                      <Icon name="pin" size={17} />
                      <span>{blog.location}</span>
                    </div>
                  </td>

                  <td>
                    <StatusBadge
                      status={blog.status}
                      onClick={() => handleToggleStatus(blog)}
                    />
                  </td>

                  <td>
                    <div className="blogmanagement-date">
                      <Icon name="calendar" size={17} />
                      <div>
                        <span>{formatDate(blog.date)}</span>
                        <small>{blog.time}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="blogmanagement-actions">
                      <button
                        type="button"
                        className="blog-action-btn view"
                        title="View blog"
                        aria-label={`View ${blog.title}`}
                        onClick={() => openViewModal(blog)}
                      >
                        <Icon name="eye" size={18} />
                      </button>

                      <button
                        type="button"
                        className="blog-action-btn edit"
                        title="Edit blog"
                        aria-label={`Edit ${blog.title}`}
                        onClick={() => handleEditBlog(blog)}
                      >
                        <Icon name="edit" size={18} />
                      </button>

                      <button
                        type="button"
                        className="blog-action-btn delete"
                        title="Delete blog"
                        aria-label={`Delete ${blog.title}`}
                        onClick={() => openDeleteModal(blog)}
                      >
                        <Icon name="trash" size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan={9}>
                  <div className="blogmanagement-empty">
                    <div className="empty-icon">
                      <Icon name="document" size={30} />
                    </div>

                    <h3>No blogs found</h3>
                    <p>Try changing your search or filter options.</p>

                    <button
                      type="button"
                      onClick={resetFilters}
                      disabled={!hasActiveFilters}
                    >
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

      <div className="blogmanagement-table-footer">
        <div className="blogmanagement-entries" aria-live="polite">
          Showing <strong>{showingFrom}</strong> to{" "}
          <strong>{showingTo}</strong> of{" "}
          <strong>{filteredBlogs.length}</strong> entries
        </div>

        <nav className="blogmanagement-pagination" aria-label="Pagination">
          <button
            type="button"
            className="pagination-arrow"
            disabled={safePage === 1}
            onClick={() => changePage(safePage - 1)}
            aria-label="Previous page"
            title="Previous page"
          >
            <Icon name="left" size={17} />
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
                className={`pagination-number ${
                  safePage === page ? "active" : ""
                }`}
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
            <Icon name="right" size={17} />
          </button>
        </nav>
      </div>

      {/* =====================================
          ADD / EDIT POPUP
      ===================================== */}

      {(modal === "add" || modal === "edit") && (
        <ModalShell
          title={modal === "add" ? "Add New Blog" : "Edit Blog"}
          subtitle={
            modal === "add"
              ? "Create a new blog post for your website."
              : "Update your blog post details."
          }
          onClose={closeModal}
          onSubmit={handleSubmit}
          size="md"
          footer={
            <>
              <button
                type="button"
                className="bm-btn bm-btn-ghost"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit" className="bm-btn bm-btn-red">
                {modal === "add" ? "Create Blog" : "Save Changes"}
              </button>
            </>
          }
        >
          <div className="bm-grid">
            <Field
              id="bm-f-title"
              label="Blog Title"
              required
              full
              error={errors.title}
            >
              <input
                id="bm-f-title"
                type="text"
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="Enter blog title"
                aria-label="Blog title"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? "bm-f-title-err" : undefined}
              />
            </Field>

            <Field id="bm-f-description" label="Description" full>
              <textarea
                id="bm-f-description"
                rows={3}
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Write a short description..."
                aria-label="Description"
              />
            </Field>

            <Field
              id="bm-f-category"
              label="Category"
              required
              error={errors.category}
            >
              <CustomSelect
                id="bm-f-category"
                value={form.category}
                onChange={(v) => updateForm("category", v)}
                options={categoriesList}
                allowEmpty={false}
                label="Category"
                invalid={Boolean(errors.category)}
              />
            </Field>

            <Field
              id="bm-f-author"
              label="Author"
              required
              error={errors.author}
            >
              <input
                id="bm-f-author"
                type="text"
                list="bm-authors-list"
                value={form.author}
                onChange={(e) => updateForm("author", e.target.value)}
                placeholder="Enter author name"
                aria-label="Author"
                aria-invalid={Boolean(errors.author)}
                aria-describedby={errors.author ? "bm-f-author-err" : undefined}
              />
              <datalist id="bm-authors-list">
                {authors.map((author) => (
                  <option key={author} value={author} />
                ))}
              </datalist>
            </Field>

            <Field
              id="bm-f-location"
              label="Location"
              required
              error={errors.location}
            >
              <input
                id="bm-f-location"
                type="text"
                value={form.location}
                onChange={(e) => updateForm("location", e.target.value)}
                placeholder="Enter location"
                aria-label="Location"
                aria-invalid={Boolean(errors.location)}
                aria-describedby={
                  errors.location ? "bm-f-location-err" : undefined
                }
              />
            </Field>

            <Field id="bm-f-status" label="Status">
              <CustomSelect
                id="bm-f-status"
                value={form.status}
                onChange={(v) => updateForm("status", v)}
                options={STATUSES}
                allowEmpty={false}
                label="Status"
              />
            </Field>

            <Field
              id="bm-f-date"
              label="Published Date"
              required
              error={errors.date}
            >
              <input
                id="bm-f-date"
                type="date"
                value={form.date}
                onChange={(e) => updateForm("date", e.target.value)}
                placeholder="Select date"
                aria-label="Published date"
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? "bm-f-date-err" : undefined}
              />
            </Field>

            <Field
              id="bm-f-time"
              label="Time"
              required
              error={errors.time}
            >
              <input
                id="bm-f-time"
                type="text"
                value={form.time}
                onChange={(e) => updateForm("time", e.target.value)}
                placeholder="10:30 AM"
                aria-label="Time"
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? "bm-f-time-err" : undefined}
              />
            </Field>

            <Field
              id="bm-f-image"
              label="Image URL"
              full
              error={errors.image}
            >
              <input
                id="bm-f-image"
                type="text"
                inputMode="url"
                value={form.image}
                onChange={(e) => updateForm("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
                aria-label="Image URL"
                aria-invalid={Boolean(errors.image)}
                aria-describedby={errors.image ? "bm-f-image-err" : undefined}
              />
            </Field>
          </div>
        </ModalShell>
      )}

      {/* =====================================
          VIEW POPUP  (compact card)
      ===================================== */}

      {modal === "view" && selectedBlog && (
        <Overlay onClose={closeModal}>
          <div
            className="bm-view"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bm-view-title"
          >
            <div className="bm-modal-head">
              <div className="bm-modal-titles">
                <h3 id="bm-view-title">Blog Details</h3>
              </div>

              <button
                type="button"
                className="bm-x"
                onClick={closeModal}
                title="Close"
                aria-label="Close"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="bm-view-body">
              <div className="bm-profile">
                <div className="bm-avatar" aria-hidden="true">
                  {getInitials(selectedBlog.author)}
                </div>

                <h4>{selectedBlog.author}</h4>

                <div className="bm-chips">
                  <CategoryBadge category={selectedBlog.category} />
                  <StatusBadge status={selectedBlog.status} />
                </div>
              </div>

              <div className="bm-rows">
                <div className="bm-row">
                  <span className="bm-row-label">
                    <Icon name="document" size={17} />
                    Title
                  </span>
                  <strong className="bm-row-value">{selectedBlog.title}</strong>
                </div>

                <div className="bm-row">
                  <span className="bm-row-label">
                    <Icon name="pin" size={17} />
                    Location
                  </span>
                  <strong className="bm-row-value">
                    {selectedBlog.location}
                  </strong>
                </div>

                <div className="bm-row">
                  <span className="bm-row-label">
                    <Icon name="calendar" size={17} />
                    Date
                  </span>
                  <strong className="bm-row-value">
                    {formatDate(selectedBlog.date)}, {selectedBlog.time}
                  </strong>
                </div>
              </div>
            </div>

            <div className="bm-view-actions">
              <button
                type="button"
                className="bm-btn bm-btn-red"
                onClick={() => {
                  closeModal();
                  handleEditBlog(selectedBlog);
                }}
              >
                <Icon name="edit" size={16} />
                Edit Blog
              </button>

              <button
                type="button"
                className="bm-btn bm-btn-ghost"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </Overlay>
      )}

      {/* =====================================
          DELETE POPUP
      ===================================== */}

      {modal === "delete" && selectedBlog && (
        <ModalShell
          title="Delete Blog"
          onClose={closeModal}
          closeDisabled={deleting}
          size="sm"
          footer={
            <>
              <button
                type="button"
                className="bm-btn bm-btn-ghost"
                onClick={closeModal}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bm-btn bm-btn-red"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </>
          }
        >
          <div className="bm-del-body">
            <div className="bm-del-icon">
              <Icon name="warning" size={30} />
            </div>

            <h4>Delete {selectedBlog.title}?</h4>

            <p>
              This action cannot be undone. The blog data will be removed
              permanently.
            </p>
          </div>
        </ModalShell>
      )}

      {/* SUCCESS TOAST (portal, so it is never clipped) */}

      {toast &&
        createPortal(
          <div className="bm-toast" role="status" aria-live="polite">
            <Icon name="check" size={18} />
            <span>{toast}</span>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Blogmanagement;