import React, { useState, useMemo, useEffect } from "react";
import {
  FaEnvelope, FaSearch, FaRedo, FaEye, FaPen, FaTrashAlt,
  FaChevronDown, FaChevronLeft, FaChevronRight, FaRegCalendarAlt,
  FaBriefcase, FaHeadset, FaInfoCircle, FaCalendarAlt, FaTimes,
  FaExclamationTriangle, FaShieldAlt, FaCheckCircle,
  FaPhoneAlt, FaClock, FaRegCommentDots, FaSave,
} from "react-icons/fa";
import "./ContactenquairyMain.css";

const INITIAL_DATA = [
  { id: 1, name: "Rahul Sharma", initials: "RS", email: "rahul@gmail.com", phone: "9876543210", type: "General Enquiry", message: "I want to know more about your services...", status: "New", date: "20 Nov 2025", time: "10:30 AM", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Priya Gupta", initials: "PG", email: "priya@gmail.com", phone: "8765432109", type: "Support", message: "Please help me with booking...", status: "Replied", date: "19 Nov 2025", time: "03:20 PM", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, name: "Amit Mehta", initials: "AM", email: "amit@gmail.com", phone: "7654321098", type: "Others", message: "Can you provide more details?...", status: "Pending", date: "18 Nov 2025", time: "11:15 AM", photo: "https://randomuser.me/api/portraits/men/46.jpg" },
  { id: 4, name: "Sneha Nayak", initials: "SN", email: "sneha@gmail.com", phone: "6543210987", type: "Career", message: "I am interested in career opportunities.", status: "Resolved", date: "17 Nov 2025", time: "04:50 PM", photo: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 5, name: "Vikram Kumar", initials: "VK", email: "vikram@gmail.com", phone: "5432109876", type: "Service Booking", message: "Need to book a service...", status: "Pending", date: "16 Nov 2025", time: "09:30 AM", photo: "https://randomuser.me/api/portraits/men/75.jpg" },
];

const TYPE_META = {
  "General Enquiry": { cls: "blue", icon: <FaBriefcase /> },
  Support: { cls: "purple", icon: <FaHeadset /> },
  Others: { cls: "green", icon: <FaInfoCircle /> },
  Career: { cls: "blue", icon: <FaBriefcase /> },
  "Service Booking": { cls: "red", icon: <FaCalendarAlt /> },
};

const STATUSES = ["New", "Replied", "Pending", "Resolved"];
const PAGE_SIZE = 5;

const getInitials = (name) =>
  name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const fallbackPhoto = (name) =>
  "https://ui-avatars.com/api/?background=c8001e&color=fff&size=150&name=" +
  encodeURIComponent(name);

/* Photo in table: falls back to initials if the image fails */
const Avatar = ({ src, name, initials }) => {
  const [failed, setFailed] = useState(false);
  return (
    <span className="ce-avatar">
      {src && !failed ? (
        <img src={src} alt={name} onError={() => setFailed(true)} referrerPolicy="no-referrer" />
      ) : (
        initials
      )}
    </span>
  );
};

/* Photo in modals: falls back to generated avatar */
const ModalPhoto = ({ src, name }) => (
  <img
    src={src || fallbackPhoto(name)}
    alt={name}
    referrerPolicy="no-referrer"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = fallbackPhoto(name);
    }}
  />
);

const ContactenquairyMain = () => {
  const [rows, setRows] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [applied, setApplied] = useState({ search: "", type: "", status: "" });
  const [page, setPage] = useState(1);

  // delete
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [closing, setClosing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  // view
  const [viewTarget, setViewTarget] = useState(null);
  const [viewClosing, setViewClosing] = useState(false);

  // edit
  const [editTarget, setEditTarget] = useState(null);
  const [editClosing, setEditClosing] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    const q = applied.search.toLowerCase();
    return rows.filter(
      (r) =>
        (!q ||
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.message.toLowerCase().includes(q)) &&
        (!applied.type || r.type === applied.type) &&
        (!applied.status || r.status === applied.status)
    );
  }, [rows, applied]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  // Esc closes whichever modal is open
  useEffect(() => {
    if (!deleteTarget && !viewTarget && !editTarget) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (deleteTarget) closeDelete();
      else if (editTarget) closeEdit();
      else closeView();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, [deleteTarget, viewTarget, editTarget, deleting]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSearch = () => {
    setApplied({ search, type: typeFilter, status: statusFilter });
    setPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setTypeFilter("");
    setStatusFilter("");
    setApplied({ search: "", type: "", status: "" });
    setPage(1);
  };

  const handleExport = () => {
    const header = ["#", "Name", "Email", "Phone", "Type", "Message", "Status", "Date"];
    const lines = filtered.map((r, i) =>
      [i + 1, r.name, r.email, r.phone, r.type, `"${r.message}"`, r.status, `${r.date} ${r.time}`].join(",")
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "contact-enquiries.csv";
    a.click();
  };

  /* ---------- VIEW ---------- */
  const openView = (row, serial) => {
    setViewTarget({ ...row, serial });
    setViewClosing(false);
  };

  const closeView = () => {
    setViewClosing(true);
    setTimeout(() => {
      setViewTarget(null);
      setViewClosing(false);
    }, 250);
  };

  const editFromView = () => {
    const row = rows.find((r) => r.id === viewTarget.id);
    setViewTarget(null);
    setViewClosing(false);
    openEdit(row);
  };

  /* ---------- EDIT ---------- */
  const openEdit = (row) => {
    setEditTarget(row);
    setForm({
      name: row.name,
      email: row.email,
      phone: row.phone,
      type: row.type,
      status: row.status,
      message: row.message,
    });
    setErrors({});
    setEditClosing(false);
  };

  const closeEdit = () => {
    setEditClosing(true);
    setTimeout(() => {
      setEditTarget(null);
      setEditClosing(false);
    }, 250);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Name is required";
    if (!form.email.trim()) er.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Enter a valid email";
    if (!form.phone.trim()) er.phone = "Phone is required";
    else if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number";
    if (!form.message.trim()) er.message = "Message is required";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setRows((prev) =>
      prev.map((r) =>
        r.id === editTarget.id
          ? { ...r, ...form, name: form.name.trim(), initials: getInitials(form.name) }
          : r
      )
    );
    closeEdit();
    setToast("Enquiry updated successfully");
  };

  /* ---------- DELETE ---------- */
  const openDelete = (row, serial) => {
    setDeleteTarget({ ...row, serial });
    setClosing(false);
  };

  const closeDelete = () => {
    if (deleting) return;
    setClosing(true);
    setTimeout(() => {
      setDeleteTarget(null);
      setClosing(false);
    }, 250);
  };

  const confirmDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      const id = deleteTarget.id;
      setDeleting(false);
      setClosing(true);
      setTimeout(() => {
        setDeleteTarget(null);
        setClosing(false);
        setRemovingId(id);
        setTimeout(() => {
          setRows((prev) => prev.filter((r) => r.id !== id));
          setRemovingId(null);
          setToast("Enquiry deleted successfully");
        }, 450);
      }, 250);
    }, 900);
  };

  return (
    <div className="ce-page">
      {/* Header */}
      <div className="ce-header">
        <div className="ce-header-left">
          <div className="ce-logo"><FaEnvelope /></div>
          <div>
            <h1 className="ce-title">Contact Enquiry</h1>
            <p className="ce-subtitle">Manage contact enquiries from website</p>
          </div>
        </div>
        <button className="ce-btn ce-btn-export" onClick={handleExport}>
          <FaTrashAlt className="ce-export-icon" /> Export Enquiries
        </button>
      </div>

      {/* Card */}
      <div className="ce-card">
        {/* Filters */}
        <div className="ce-filters">
          <div className="ce-search">
            <FaSearch className="ce-search-icon" />
            <input
              type="text"
              placeholder="Search by name, email or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <div className="ce-select">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All Enquiry Type</option>
              {Object.keys(TYPE_META).map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <FaChevronDown className="ce-select-arrow" />
          </div>

          <div className="ce-select ce-select-sm">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <FaChevronDown className="ce-select-arrow" />
          </div>

          <button className="ce-btn ce-btn-search" onClick={handleSearch}>
            <FaSearch /> Search
          </button>
          <button className="ce-btn ce-btn-reset" onClick={handleReset}>
            <FaRedo /> Reset
          </button>
        </div>

        {/* Table */}
        <div className="ce-table-wrap">
          <table className="ce-table">
            <thead>
              <tr>
                <th>#</th>
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
              {pageRows.length === 0 && (
                <tr><td colSpan="9" className="ce-empty">No enquiries found</td></tr>
              )}
              {pageRows.map((r, i) => {
                const meta = TYPE_META[r.type];
                const serial = start + i + 1;
                return (
                  <tr
                    key={r.id}
                    className={removingId === r.id ? "ce-row removing" : "ce-row"}
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <td className="ce-num">{serial}</td>
                    <td>
                      <div className="ce-name-cell">
                        <Avatar src={r.photo} name={r.name} initials={r.initials} />
                        <span className="ce-name">{r.name}</span>
                      </div>
                    </td>
                    <td className="ce-email">{r.email}</td>
                    <td className="ce-phone">{r.phone}</td>
                    <td>
                      <span className={`ce-type ${meta.cls}`}>{meta.icon}{r.type}</span>
                    </td>
                    <td className="ce-msg">{r.message}</td>
                    <td>
                      <span className={`ce-status ${r.status.toLowerCase()}`}>
                        <i className="ce-dot" />{r.status}
                      </span>
                    </td>
                    <td>
                      <div className="ce-date">
                        <FaRegCalendarAlt />
                        <span>{r.date}<br />{r.time}</span>
                      </div>
                    </td>
                    <td>
                      <div className="ce-actions">
                        <button className="ce-act view" title="View" onClick={() => openView(r, serial)}>
                          <FaEye />
                        </button>
                        <button className="ce-act edit" title="Edit" onClick={() => openEdit(r)}>
                          <FaPen />
                        </button>
                        <button className="ce-act del" title="Delete" onClick={() => openDelete(r, serial)}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="ce-footer">
          <span className="ce-showing">
            Showing {filtered.length === 0 ? 0 : start + 1} to {Math.min(start + PAGE_SIZE, filtered.length)} of {filtered.length} entries
          </span>
          <div className="ce-pager">
            <button className="ce-page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}><FaChevronLeft /></button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`ce-page-btn ${page === i + 1 ? "active" : ""}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className="ce-page-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}><FaChevronRight /></button>
          </div>
        </div>
      </div>

      {/* ================= VIEW MODAL ================= */}
      {viewTarget && (
        <div className={`ce-overlay ${viewClosing ? "out" : ""}`} onClick={closeView}>
          <div className={`ce-modal ce-view-modal ${viewClosing ? "out" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="ce-modal-topbar" />
            <span className="ce-modal-corner" />
            <button className="ce-modal-close" onClick={closeView}><FaTimes /></button>

            <div className="ce-view-head">
              <p className="ce-modal-tag">ENQUIRY DETAILS</p>
              <h2 className="ce-view-title">Contact Enquiry <em>#{viewTarget.serial}</em></h2>
            </div>

            <div className="ce-view-profile">
              <div className="ce-view-photo">
                <ModalPhoto src={viewTarget.photo} name={viewTarget.name} />
                <span className="ce-view-ring" />
              </div>
              <div className="ce-view-who">
                <strong>{viewTarget.name}</strong>
                <span>{viewTarget.email}</span>
                <div className="ce-view-tags">
                  <span className={`ce-type ${TYPE_META[viewTarget.type].cls}`}>
                    {TYPE_META[viewTarget.type].icon}{viewTarget.type}
                  </span>
                  <span className={`ce-status ${viewTarget.status.toLowerCase()}`}>
                    <i className="ce-dot" />{viewTarget.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="ce-view-message">
              <div className="ce-view-label"><FaRegCommentDots /> Message</div>
              <p>{viewTarget.message}</p>
            </div>

            <div className="ce-view-grid">
              <div className="ce-view-item">
                <span className="ce-view-ico"><FaPhoneAlt /></span>
                <div><small>Phone</small><b>{viewTarget.phone}</b></div>
              </div>
              <div className="ce-view-item">
                <span className="ce-view-ico"><FaEnvelope /></span>
                <div><small>Email</small><b>{viewTarget.email}</b></div>
              </div>
              <div className="ce-view-item">
                <span className="ce-view-ico"><FaRegCalendarAlt /></span>
                <div><small>Submitted Date</small><b>{viewTarget.date}</b></div>
              </div>
              <div className="ce-view-item">
                <span className="ce-view-ico"><FaClock /></span>
                <div><small>Submitted Time</small><b>{viewTarget.time}</b></div>
              </div>
            </div>

            <div className="ce-modal-btns ce-view-btns">
              <button className="ce-keep" onClick={closeView}>Close</button>
              <button className="ce-confirm ce-edit-go" onClick={editFromView}>
                <FaPen /> Edit Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editTarget && (
        <div className={`ce-overlay ${editClosing ? "out" : ""}`} onClick={closeEdit}>
          <div className={`ce-modal ce-edit-modal ${editClosing ? "out" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="ce-modal-topbar" />
            <span className="ce-modal-corner" />
            <button className="ce-modal-close" onClick={closeEdit}><FaTimes /></button>

            <div className="ce-view-head">
              <p className="ce-modal-tag">EDIT ENQUIRY</p>
              <h2 className="ce-view-title">Update Details</h2>
            </div>

            <form onSubmit={handleSave} noValidate>
              <div className="ce-edit-top">
                <div className="ce-edit-photo">
                  <ModalPhoto src={editTarget.photo} name={editTarget.name} />
                </div>
                <div>
                  <strong>{editTarget.name}</strong>
                  <span>{editTarget.email}</span>
                </div>
              </div>

              <div className="ce-form-grid">
                <div className="ce-field">
                  <label>Full Name <b>*</b></label>
                  <input name="name" value={form.name} onChange={handleFormChange} placeholder="Enter full name" />
                  {errors.name && <small>{errors.name}</small>}
                </div>

                <div className="ce-field">
                  <label>Email <b>*</b></label>
                  <input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="example@email.com" />
                  {errors.email && <small>{errors.email}</small>}
                </div>

                <div className="ce-field">
                  <label>Phone <b>*</b></label>
                  <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="Enter phone number" />
                  {errors.phone && <small>{errors.phone}</small>}
                </div>

                <div className="ce-field">
                  <label>Enquiry Type</label>
                  <select name="type" value={form.type} onChange={handleFormChange}>
                    {Object.keys(TYPE_META).map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="ce-field ce-full">
                  <label>Status</label>
                  <select name="status" value={form.status} onChange={handleFormChange}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="ce-field ce-full">
                  <label>Message <b>*</b></label>
                  <textarea name="message" rows="3" value={form.message} onChange={handleFormChange} placeholder="Enter message..." />
                  {errors.message && <small>{errors.message}</small>}
                </div>
              </div>

              <div className="ce-modal-btns ce-edit-btns">
                <button type="button" className="ce-keep" onClick={closeEdit}>Cancel</button>
                <button type="submit" className="ce-confirm ce-save">
                  <FaSave /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {deleteTarget && (
        <div className={`ce-overlay ${closing ? "out" : ""}`} onClick={closeDelete}>
          <div className={`ce-modal ${closing ? "out" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="ce-modal-topbar" />
            <span className="ce-modal-corner" />
            <button className="ce-modal-close" onClick={closeDelete}><FaTimes /></button>

            <div className="ce-modal-icon-wrap">
              <span className="ce-pulse p1" />
              <span className="ce-pulse p2" />
              <div className="ce-modal-icon"><FaTrashAlt /></div>
            </div>

            <p className="ce-modal-tag">DELETE CONFIRMATION</p>
            <h2 className="ce-modal-title">Are you absolutely sure?</h2>
            <p className="ce-modal-text">
              You're about to permanently delete this service enquiry.<br />
              This action cannot be undone.
            </p>

            <div className="ce-modal-user">
              <ModalPhoto src={deleteTarget.photo} name={deleteTarget.name} />
              <div>
                <strong>{deleteTarget.name}</strong>
                <span>{deleteTarget.email}</span>
              </div>
              <em>#{deleteTarget.serial}</em>
            </div>

            <div className="ce-modal-warn">
              <FaExclamationTriangle />
              This enquiry and its associated details will be removed.
            </div>

            <div className="ce-modal-btns">
              <button className="ce-keep" onClick={closeDelete} disabled={deleting}>Keep Enquiry</button>
              <button className="ce-confirm" onClick={confirmDelete} disabled={deleting}>
                {deleting ? (<><span className="ce-spinner" /> Deleting...</>) : (<><FaTrashAlt /> Delete Permanently</>)}
              </button>
            </div>

            <p className="ce-modal-note"><FaShieldAlt /> Please confirm before removing this record</p>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="ce-toast"><FaCheckCircle /> {toast}</div>
      )}
    </div>
  );
};

export default ContactenquairyMain;