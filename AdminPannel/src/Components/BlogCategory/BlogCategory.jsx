import React, { useState, useEffect, useCallback, useMemo } from "react";
import API from "../../api/axios";
import "./BlogCategory.css";

const STATUS_OPTIONS = ["All", "Active", "Inactive"];

const generateSlug = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const BlogCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ total: 0, active: 0, inactive: 0 });
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    status: "Active",
  });
  const [autoSlug, setAutoSlug] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(window.__categoryToastTimer);
    window.__categoryToastTimer = window.setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        search: search.trim() || undefined,
        status: selectedStatus !== "All" ? selectedStatus : undefined,
      };

      const res = await API.get("/blog-categories", { params });
      if (res.data?.success) {
        setCategories(res.data.data || []);
        if (res.data.counts) {
          setCounts(res.data.counts);
        }
        if (res.data.pagination) {
          setTotalPages(res.data.pagination.totalPages || 1);
        }
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      showToast(
        err.response?.data?.message || "Failed to load categories. Please check backend connection.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, selectedStatus]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Handle open add modal
  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      status: "Active",
    });
    setAutoSlug(true);
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Handle open edit modal
  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || "",
      slug: cat.slug || "",
      description: cat.description || "",
      status: cat.status || "Active",
    });
    setAutoSlug(false);
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "name" && autoSlug) {
        next.slug = generateSlug(value);
      }
      return next;
    });

    if (name === "slug") {
      setAutoSlug(false);
    }

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Category name is required.";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    if (!formData.slug.trim()) {
      errors.slug = "Slug is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const payload = {
        name: formData.name.trim(),
        slug: generateSlug(formData.slug.trim() || formData.name.trim()),
        description: formData.description.trim(),
        status: formData.status,
      };

      if (editingCategory) {
        const res = await API.put(`/blog-categories/${editingCategory.id}`, payload);
        if (res.data?.success) {
          showToast("Category updated successfully!");
          setIsModalOpen(false);
          fetchCategories();
        }
      } else {
        const res = await API.post("/blog-categories", payload);
        if (res.data?.success) {
          showToast("Category created successfully!");
          setIsModalOpen(false);
          fetchCategories();
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      const msg = err.response?.data?.message || "Failed to save category. Please try again.";
      showToast(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      const res = await API.delete(`/blog-categories/${deleteTarget.id}`);
      if (res.data?.success) {
        showToast("Category deleted successfully!");
        setDeleteTarget(null);
        fetchCategories();
      }
    } catch (err) {
      console.error("Delete error:", err);
      showToast(
        err.response?.data?.message || "Failed to delete category.",
        "error"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle quick status toggle
  const handleToggleStatus = async (cat) => {
    const newStatus = cat.status === "Active" ? "Inactive" : "Active";
    try {
      const res = await API.put(`/blog-categories/${cat.id}`, { status: newStatus });
      if (res.data?.success) {
        showToast(`Category marked as ${newStatus}`);
        setCategories((prev) =>
          prev.map((item) => (item.id === cat.id ? { ...item, status: newStatus } : item))
        );
        setCounts((prev) => ({
          ...prev,
          active: newStatus === "Active" ? prev.active + 1 : prev.active - 1,
          inactive: newStatus === "Inactive" ? prev.inactive + 1 : prev.inactive - 1,
        }));
      }
    } catch (err) {
      console.error("Toggle error:", err);
      showToast(err.response?.data?.message || "Failed to update status", "error");
    }
  };

  // Sort categories client-side if needed
  const sortedCategories = useMemo(() => {
    const list = [...categories];
    if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      // newest
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list;
  }, [categories, sortBy]);

  return (
    <div className="blog-category-page">
      {/* Toast Alert */}
      {toast && (
        <div className={`category-toast ${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" ? "✓" : "⚠"}
          </span>
          <span className="toast-text">{toast.message}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToast(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="category-header">
        <div className="category-header-info">
          <div className="category-title-wrap">
            <span className="category-badge-pill">Taxonomy</span>
            <h1 className="category-page-title">Blog Categories</h1>
          </div>
          <p className="category-page-desc">
            Organize your articles and posts into dynamic blog categories saved directly to the database.
          </p>
        </div>

        <button
          type="button"
          className="category-btn category-btn-primary add-cat-btn"
          onClick={handleOpenAdd}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add New Category
        </button>
      </div>

      {/* KPI Cards */}
      <div className="category-stats-grid">
        <div className="category-stat-card">
          <div className="stat-icon-box total">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10M6 10h10" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Categories</span>
            <h3 className="stat-value">{counts.total}</h3>
          </div>
        </div>

        <div className="category-stat-card">
          <div className="stat-icon-box active">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Active Categories</span>
            <h3 className="stat-value text-success">{counts.active}</h3>
          </div>
        </div>

        <div className="category-stat-card">
          <div className="stat-icon-box inactive">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6M9 9l6 6" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Inactive Categories</span>
            <h3 className="stat-value text-muted">{counts.inactive}</h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="category-controls-card">
        <div className="search-input-wrap">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="category-search-input"
            placeholder="Search categories by name, slug or description..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          {search && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
            >
              ×
            </button>
          )}
        </div>

        <div className="category-filters-group">
          <div className="filter-select-wrap">
            <label className="filter-label">Status:</label>
            <select
              className="category-select"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
            >
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select-wrap">
            <label className="filter-label">Sort:</label>
            <select
              className="category-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
            </select>
          </div>

          <button
            type="button"
            className="refresh-btn"
            title="Refresh list"
            onClick={fetchCategories}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="category-table-card">
        {loading ? (
          <div className="category-loading-state">
            <div className="spinner" />
            <p>Loading categories from database...</p>
          </div>
        ) : sortedCategories.length === 0 ? (
          <div className="category-empty-state">
            <div className="empty-icon-wrap">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
            <h3>No categories found</h3>
            <p>
              {search || selectedStatus !== "All"
                ? "No categories matched your filter criteria. Try adjusting your search."
                : "Get started by creating your first blog category!"}
            </p>
            <button
              type="button"
              className="category-btn category-btn-primary"
              onClick={handleOpenAdd}
            >
              + Create Category
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="category-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Slug</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCategories.map((cat, idx) => (
                  <tr key={cat.id || idx}>
                    <td className="col-index">{(page - 1) * limit + idx + 1}</td>
                    <td className="col-name">
                      <div className="cat-name-block">
                        <span className="cat-icon-chip">
                          {cat.name.charAt(0).toUpperCase()}
                        </span>
                        <div className="cat-title-meta">
                          <span className="cat-title-text">{cat.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="col-slug">
                      <span className="cat-slug-badge">/{cat.slug}</span>
                    </td>
                    <td className="col-desc">
                      {cat.description ? (
                        <span className="cat-desc-text" title={cat.description}>
                          {cat.description}
                        </span>
                      ) : (
                        <span className="text-placeholder">—</span>
                      )}
                    </td>
                    <td className="col-status">
                      <button
                        type="button"
                        className={`status-pill ${cat.status.toLowerCase()}`}
                        onClick={() => handleToggleStatus(cat)}
                        title="Click to toggle status"
                      >
                        <span className="status-indicator-dot" />
                        {cat.status}
                      </button>
                    </td>
                    <td className="col-date">
                      <div className="date-block">
                        <span className="date-primary">{cat.createdAtFormatted || "—"}</span>
                        <span className="date-secondary">{cat.timeFormatted || ""}</span>
                      </div>
                    </td>
                    <td className="col-actions text-right">
                      <div className="actions-wrapper">
                        <button
                          type="button"
                          className="action-icon-btn edit-btn"
                          title="Edit Category"
                          onClick={() => handleOpenEdit(cat)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="action-icon-btn delete-btn"
                          title="Delete Category"
                          onClick={() => setDeleteTarget(cat)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="category-pagination">
            <button
              type="button"
              className="page-nav-btn"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <span className="page-indicator">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              className="page-nav-btn"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Create / Edit Category Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => !isSubmitting && setIsModalOpen(false)}>
          <div
            className="category-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-header-text">
                <h2>{editingCategory ? "Edit Category" : "Add New Category"}</h2>
                <p>
                  {editingCategory
                    ? "Update category details and taxonomy mapping."
                    : "Create a new category to group blogs dynamically."}
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => !isSubmitting && setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label className="form-label">
                  Category Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                  placeholder="e.g. Architecture, Sustainability, Facility Management"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  autoFocus
                />
                {formErrors.name && (
                  <span className="form-error-msg">{formErrors.name}</span>
                )}
              </div>

              <div className="form-group">
                <div className="label-with-hint">
                  <label className="form-label">
                    Category Slug <span className="req">*</span>
                  </label>
                  <span className="hint-pill">Auto-generated</span>
                </div>
                <div className="slug-input-wrapper">
                  <span className="slug-prefix">/blog/category/</span>
                  <input
                    type="text"
                    name="slug"
                    className={`form-control slug-input ${formErrors.slug ? "is-invalid" : ""}`}
                    placeholder="e.g. architecture"
                    value={formData.slug}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
                {formErrors.slug && (
                  <span className="form-error-msg">{formErrors.slug}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  name="description"
                  rows="3"
                  className="form-control"
                  placeholder="Short description of this category topic..."
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <div className="status-radios-row">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === "Active"}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    <span className="radio-custom active" />
                    Active (Visible to users)
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === "Inactive"}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    <span className="radio-custom inactive" />
                    Inactive (Hidden)
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="category-btn category-btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="category-btn category-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="btn-spinner" /> Saving...
                    </>
                  ) : editingCategory ? (
                    "Save Changes"
                  ) : (
                    "Create Category"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="modal-backdrop" onClick={() => !isDeleting && setDeleteTarget(null)}>
          <div
            className="category-modal-card delete-confirm-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-warning-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>
            <h3>Delete Category</h3>
            <p>
              Are you sure you want to delete category <strong>"{deleteTarget.name}"</strong>? This action cannot be undone.
            </p>
            <div className="modal-actions delete-actions">
              <button
                type="button"
                className="category-btn category-btn-secondary"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="category-btn category-btn-danger"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCategory;
