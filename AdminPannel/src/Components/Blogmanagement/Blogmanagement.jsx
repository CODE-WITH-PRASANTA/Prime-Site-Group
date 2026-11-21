import React, { useEffect, useMemo, useState } from "react";
import "./Blogmanagement.css";

/* =========================================
   LOCAL IMAGE IMPORTS
========================================= */

import blogSmartBuilding from "../../assets/blog-smart-building.jpg";
import blogFacility from "../../assets/blog-facility.jpg";
import blogPrimeSite from "../../assets/blog-prime-site.jpg";
import blogCommercial from "../../assets/blog-commercial.jpg";
import blogSustainability from "../../assets/blog-sustainability.jpg";
import blogGreenArchitecture from "../../assets/blog-green-architecture.jpg";
import blogWorkplace from "../../assets/blog-workplace.jpg";
import blogCorporate from "../../assets/blog-corporate.jpg";
import blogUrban from "../../assets/blog-urban.jpg";
import blogTeam from "../../assets/blog-team.jpg";
import blogInterior from "../../assets/blog-interior.jpg";
import blogMaintenance from "../../assets/blog-maintenance.jpg";
import blogSmartCity from "../../assets/blog-smart-city.jpg";

/* =========================================
   BLOG CATEGORIES
========================================= */

const CATEGORIES = [
  "Architecture",
  "Facility Management",
  "About Us",
  "Commercial",
  "Sustainability",
];

/* =========================================
   INITIAL BLOG DATA
========================================= */

const INITIAL_BLOGS = [
  {
    id: 1,
    title: "Smart Building Solutions for a Better Tomorrow",
    description: "Discover how smart buildings are transforming modern infrastructure with intelligent technology and sustainable solutions.",
    category: "Architecture",
    author: "Rahul Sharma",
    location: "New York",
    status: "Published",
    date: "2025-11-20",
    time: "10:30 AM",
    image: blogSmartBuilding,
  },
  {
    id: 2,
    title: "The Future of Facility Management",
    description: "Explore the trends shaping the future of facility management and workplace operations.",
    category: "Facility Management",
    author: "Priya Gupta",
    location: "London",
    status: "Published",
    date: "2025-11-18",
    time: "02:15 PM",
    image: blogFacility,
  },
  {
    id: 3,
    title: "Why Choose Prime Site?",
    description: "Your trusted partner in delivering premium integrated business solutions.",
    category: "About Us",
    author: "Amit Verma",
    location: "Dubai",
    status: "Published",
    date: "2025-11-15",
    time: "11:20 AM",
    image: blogPrimeSite,
  },
  {
    id: 4,
    title: "Commercial Spaces Redefined",
    description: "Modern spaces for modern businesses. Discover innovative commercial environments.",
    category: "Commercial",
    author: "Neha Singh",
    location: "Singapore",
    status: "Published",
    date: "2025-11-12",
    time: "04:45 PM",
    image: blogCommercial,
  },
  {
    id: 5,
    title: "Sustainable Development for a Greener Future",
    description: "Our commitment to sustainability, green development and a better tomorrow.",
    category: "Sustainability",
    author: "Vikram Patel",
    location: "India",
    status: "Draft",
    date: "2025-11-10",
    time: "09:30 AM",
    image: blogSustainability,
  },
  {
    id: 6,
    title: "Green Architecture: Building a Better Future",
    description: "Learn how green architecture is creating environmentally responsible and energy-efficient buildings.",
    category: "Architecture",
    author: "Ananya Das",
    location: "Mumbai",
    status: "Published",
    date: "2025-11-08",
    time: "10:15 AM",
    image: blogGreenArchitecture,
  },
  {
    id: 7,
    title: "Creating the Perfect Modern Workplace",
    description: "Explore innovative workplace designs that improve employee productivity and comfort.",
    category: "Commercial",
    author: "Arjun Mehta",
    location: "Delhi",
    status: "Published",
    date: "2025-11-06",
    time: "12:30 PM",
    image: blogWorkplace,
  },
  {
    id: 8,
    title: "Corporate Excellence Through Smart Management",
    description: "Discover the importance of professional management and integrated corporate solutions.",
    category: "Facility Management",
    author: "Sneha Kapoor",
    location: "Bangalore",
    status: "Draft",
    date: "2025-11-04",
    time: "03:20 PM",
    image: blogCorporate,
  },
  {
    id: 9,
    title: "Urban Development and Modern Infrastructure",
    description: "A closer look at how modern infrastructure is shaping the cities of tomorrow.",
    category: "Architecture",
    author: "Rohit Kumar",
    location: "Pune",
    status: "Published",
    date: "2025-11-02",
    time: "11:45 AM",
    image: blogUrban,
  },
  {
    id: 10,
    title: "The Power of Team Collaboration",
    description: "How effective teamwork and collaboration create stronger business environments.",
    category: "About Us",
    author: "Pooja Sharma",
    location: "Hyderabad",
    status: "Published",
    date: "2025-10-30",
    time: "09:15 AM",
    image: blogTeam,
  },
  {
    id: 11,
    title: "Premium Interior Design for Commercial Spaces",
    description: "Transforming ordinary interiors into premium and functional commercial environments.",
    category: "Commercial",
    author: "Karan Malhotra",
    location: "Abu Dhabi",
    status: "Draft",
    date: "2025-10-28",
    time: "01:30 PM",
    image: blogInterior,
  },
  {
    id: 12,
    title: "Why Building Maintenance Matters",
    description: "Understanding the importance of regular maintenance for safe and efficient buildings.",
    category: "Facility Management",
    author: "Meera Joshi",
    location: "Chennai",
    status: "Published",
    date: "2025-10-25",
    time: "04:10 PM",
    image: blogMaintenance,
  },
  {
    id: 13,
    title: "The Rise of Smart Cities Around the World",
    description: "Discover how technology and innovation are changing the future of urban living.",
    category: "Architecture",
    author: "Aditya Roy",
    location: "Singapore",
    status: "Published",
    date: "2025-10-22",
    time: "10:45 AM",
    image: blogSmartCity,
  },
  {
    id: 14,
    title: "Sustainable Office Design and Green Solutions",
    description: "Creating healthier workplaces through energy efficiency and sustainable design.",
    category: "Sustainability",
    author: "Riya Das",
    location: "Kolkata",
    status: "Draft",
    date: "2025-10-19",
    time: "02:30 PM",
    image: blogGreenArchitecture,
  },
  {
    id: 15,
    title: "Innovative Business Spaces for Tomorrow",
    description: "Explore the latest ideas in commercial development and modern business environments.",
    category: "Commercial",
    author: "Siddharth Rao",
    location: "Bhubaneswar",
    status: "Published",
    date: "2025-10-16",
    time: "11:00 AM",
    image: blogInterior,
  },
];

/* =========================================
   EMPTY FORM
========================================= */

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "Architecture",
  author: "",
  location: "",
  status: "Draft",
  date: new Date().toISOString().slice(0, 10),
  time: "10:00 AM",
  image: "",
};

/* =========================================
   DATE FORMATTER
========================================= */

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />
      </>
    ),
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
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
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
   CATEGORY BADGE
========================================= */

const CategoryBadge = ({ category }) => {
  const categoryStyles = {
    Architecture: "architecture",
    "Facility Management": "facility",
    "About Us": "about",
    Commercial: "commercial",
    Sustainability: "sustainability",
  };

  const categoryIcons = {
    Architecture: "▦",
    "Facility Management": "⚙",
    "About Us": "★",
    Commercial: "▦",
    Sustainability: "❧",
  };

  return (
    <span className={`blog-category ${categoryStyles[category] || "architecture"}`}>
      <span>{categoryIcons[category] || "●"}</span>
      {category}
    </span>
  );
};

/* =========================================
   STATUS BADGE
========================================= */

const StatusBadge = ({ status }) => (
  <span className={`blog-status ${status === "Published" ? "published" : "draft"}`}>
    <span className="status-dot" />
    {status}
  </span>
);

/* =========================================
   CUSTOM DROPDOWN
========================================= */

const CustomSelect = ({ value, onChange, options, placeholder }) => (
  <div className="blog-select-wrap">
    <select
      className="blog-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={placeholder}
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <span className="select-arrow">
      <Icon name="chevron" size={16} />
    </span>
  </div>
);

/* =========================================
   MAIN BLOG MANAGEMENT COMPONENT
========================================= */

const Blogmanagement = () => {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [modal, setModal] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  /* DELETE ANIMATION STATES */
  const [deleteSerial, setDeleteSerial] = useState(1);
  const [delClosing, setDelClosing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [toast, setToast] = useState("");

  const authors = useMemo(() => {
    return [...new Set(blogs.map((blog) => blog.author))].sort();
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory = !categoryFilter || blog.category === categoryFilter;
      const matchesAuthor = !authorFilter || blog.author === authorFilter;

      return matchesSearch && matchesCategory && matchesAuthor;
    });
  }, [blogs, search, categoryFilter, authorFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const visibleBlogs = filteredBlogs.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const changePage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setAuthorFilter("");
    setCurrentPage(1);
  };

  const updateForm = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const openAddModal = () => {
    setSelectedBlog(null);
    setForm({
      ...EMPTY_FORM,
      date: new Date().toISOString().slice(0, 10),
    });
    setError("");
    setModal("add");
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setForm({ ...blog });
    setError("");
    setModal("edit");
  };

  const openViewModal = (blog) => {
    setSelectedBlog(blog);
    setModal("view");
  };

  const openDeleteModal = (blog, serial) => {
    setSelectedBlog(blog);
    setDeleteSerial(serial);
    setDelClosing(false);
    setModal("delete");
  };

  const closeModal = () => {
    setModal("");
    setSelectedBlog(null);
    setError("");
  };

  /* Close delete modal with animation */
  const closeDeleteModal = () => {
    if (deleting) return;
    setDelClosing(true);
    setTimeout(() => {
      closeModal();
      setDelClosing(false);
    }, 250);
  };

  /* Esc key closes delete modal */
  useEffect(() => {
    if (modal !== "delete") return;
    const onKey = (e) => e.key === "Escape" && closeDeleteModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, [modal, deleting]);

  /* Toast auto hide */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.author.trim() || !form.location.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (modal === "edit" && selectedBlog) {
      setBlogs((previous) =>
        previous.map((blog) =>
          blog.id === selectedBlog.id ? { ...form, id: blog.id } : blog
        )
      );
    } else {
      setBlogs((previous) => [{ ...form, id: Date.now() }, ...previous]);
      setCurrentPage(1);
    }

    closeModal();
  };

  /* =========================================
     CONFIRM DELETE BLOG (WITH ANIMATION)
  ========================================= */

  const confirmDelete = () => {
    if (!selectedBlog || deleting) return;

    const id = selectedBlog.id;
    setDeleting(true);

    setTimeout(() => {
      setDeleting(false);
      setDelClosing(true);

      setTimeout(() => {
        closeModal();
        setDelClosing(false);
        setRemovingId(id);

        setTimeout(() => {
          setBlogs((previous) => previous.filter((blog) => blog.id !== id));
          setRemovingId(null);
          setToast("Blog deleted successfully");
        }, 450);
      }, 250);
    }, 900);
  };

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
        >
          <Icon name="plus" size={17} />
          Add New Blog
        </button>
      </div>

      {/* FILTER SECTION */}

      <div className="blogmanagement-filter-section">
        <div className="blogmanagement-search-box">
          <Icon name="search" size={19} />

          <input
            type="text"
            placeholder="Search blogs by title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <CustomSelect
          value={categoryFilter}
          onChange={(value) => {
            setCategoryFilter(value);
            setCurrentPage(1);
          }}
          options={CATEGORIES}
          placeholder="All Categories"
        />

        <CustomSelect
          value={authorFilter}
          onChange={(value) => {
            setAuthorFilter(value);
            setCurrentPage(1);
          }}
          options={authors}
          placeholder="All Authors"
        />

        <button
          type="button"
          className="blogmanagement-search-btn"
          onClick={() => setCurrentPage(1)}
        >
          <Icon name="search" size={16} />
          Search
        </button>

        <button
          type="button"
          className="blogmanagement-reset-btn"
          onClick={resetFilters}
        >
          <Icon name="reset" size={17} />
          Reset
        </button>
      </div>

      {/* BLOG TABLE */}

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
                <tr
                  key={blog.id}
                  className={removingId === blog.id ? "bm-row-removing" : ""}
                >
                  <td className="blog-number">
                    {(safePage - 1) * pageSize + index + 1}
                  </td>

                  <td>
                    <div className="blogmanagement-table-image">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/160x100/fcecef/cd101b?text=Blog";
                        }}
                      />
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
                    <StatusBadge status={blog.status} />
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
                        title="View Blog"
                        aria-label="View Blog"
                        onClick={() => openViewModal(blog)}
                      >
                        <Icon name="eye" size={18} />
                      </button>

                      <button
                        type="button"
                        className="blog-action-btn edit"
                        title="Edit Blog"
                        aria-label="Edit Blog"
                        onClick={() => openEditModal(blog)}
                      >
                        <Icon name="edit" size={18} />
                      </button>

                      <button
                        type="button"
                        className="blog-action-btn delete"
                        title="Delete Blog"
                        aria-label="Delete Blog"
                        onClick={() =>
                          openDeleteModal(
                            blog,
                            (safePage - 1) * pageSize + index + 1
                          )
                        }
                      >
                        <Icon name="trash" size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">
                  <div className="blogmanagement-empty">
                    <div className="empty-icon">
                      <Icon name="document" size={30} />
                    </div>

                    <h3>No blogs found</h3>
                    <p>Try changing your search or filter options.</p>

                    <button type="button" onClick={resetFilters}>
                      Clear Filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* TABLE FOOTER / PAGINATION */}

      <div className="blogmanagement-table-footer">
        <div className="blogmanagement-entries">
          Showing{" "}
          <strong>
            {filteredBlogs.length === 0 ? 0 : (safePage - 1) * pageSize + 1}
          </strong>
          {" "}to{" "}
          <strong>{Math.min(safePage * pageSize, filteredBlogs.length)}</strong>
          {" "}of{" "}
          <strong>{filteredBlogs.length}</strong>
          {" "}entries
        </div>

        <div className="blogmanagement-pagination">
          <button
            type="button"
            className="pagination-arrow"
            disabled={safePage === 1}
            onClick={() => changePage(safePage - 1)}
            aria-label="Previous page"
          >
            <Icon name="left" size={17} />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                type="button"
                key={page}
                className={`pagination-number ${
                  safePage === page ? "active" : ""
                }`}
                onClick={() => changePage(page)}
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
          >
            <Icon name="right" size={17} />
          </button>
        </div>
      </div>

      {/* =====================================
          ADD / EDIT BLOG MODAL
      ===================================== */}

      {(modal === "add" || modal === "edit") && (
        <div
          className="blogmanagement-modal-overlay"
          onMouseDown={closeModal}
        >
          <div
            className="blogmanagement-modal blogmanagement-form-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="blogmanagement-modal-header">
              <div>
                <h3>{modal === "add" ? "Add New Blog" : "Edit Blog"}</h3>

                <p>
                  {modal === "add"
                    ? "Create a new blog post for your website."
                    : "Update your blog post details."}
                </p>
              </div>

              <button
                type="button"
                className="blogmanagement-modal-close"
                onClick={closeModal}
              >
                <Icon name="close" />
              </button>
            </div>

            <form className="blogmanagement-form" onSubmit={handleSubmit}>
              <div className="blog-form-group full">
                <label>
                  Blog Title <span>*</span>
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div className="blog-form-group full">
                <label>Description</label>

                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  placeholder="Write a short description..."
                />
              </div>

              <div className="blog-form-group">
                <label>Category <span>*</span></label>

                <select
                  value={form.category}
                  onChange={(e) => updateForm("category", e.target.value)}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="blog-form-group">
                <label>Author <span>*</span></label>

                <input
                  list="blogmanagement-authors"
                  value={form.author}
                  onChange={(e) => updateForm("author", e.target.value)}
                  placeholder="Enter author name"
                  required
                />

                <datalist id="blogmanagement-authors">
                  {authors.map((author) => (
                    <option key={author} value={author} />
                  ))}
                </datalist>
              </div>

              <div className="blog-form-group">
                <label>Location <span>*</span></label>

                <input
                  value={form.location}
                  onChange={(e) => updateForm("location", e.target.value)}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="blog-form-group">
                <label>Status</label>

                <select
                  value={form.status}
                  onChange={(e) => updateForm("status", e.target.value)}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div className="blog-form-group">
                <label>Published Date</label>

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => updateForm("date", e.target.value)}
                />
              </div>

              <div className="blog-form-group">
                <label>Time</label>

                <input
                  value={form.time}
                  onChange={(e) => updateForm("time", e.target.value)}
                  placeholder="10:30 AM"
                />
              </div>

              <div className="blog-form-group full">
                <label>Image URL</label>

                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => updateForm("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {error && (
                <p className="blogmanagement-form-error">{error}</p>
              )}

              <div className="blogmanagement-form-footer">
                <button
                  type="button"
                  className="blog-form-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="blog-form-submit">
                  <Icon name="plus" size={16} />
                  {modal === "add" ? "Create Blog" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================
          VIEW BLOG MODAL
      ===================================== */}

      {modal === "view" && selectedBlog && (
        <div
          className="blogmanagement-modal-overlay"
          onMouseDown={closeModal}
        >
          <div
            className="blogmanagement-modal blogmanagement-view-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="blogmanagement-modal-header">
              <div>
                <h3>Blog Details</h3>
                <p>Complete information about this blog post.</p>
              </div>

              <button
                type="button"
                className="blogmanagement-modal-close"
                onClick={closeModal}
              >
                <Icon name="close" />
              </button>
            </div>

            <img
              className="blogmanagement-view-image"
              src={selectedBlog.image}
              alt={selectedBlog.title}
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/700x300/fcecef/cd101b?text=Blog";
              }}
            />

            <div className="blogmanagement-view-content">
              <div className="blogmanagement-view-tags">
                <CategoryBadge category={selectedBlog.category} />
                <StatusBadge status={selectedBlog.status} />
              </div>

              <h2>{selectedBlog.title}</h2>

              <p>
                {selectedBlog.description || "No description available."}
              </p>

              <div className="blogmanagement-view-meta">
                <span>
                  <strong>Author:</strong> {selectedBlog.author}
                </span>

                <span>
                  <strong>Location:</strong> {selectedBlog.location}
                </span>

                <span>
                  <strong>Date:</strong> {formatDate(selectedBlog.date)}
                </span>

                <span>
                  <strong>Time:</strong> {selectedBlog.time}
                </span>
              </div>
            </div>

            <div className="blogmanagement-form-footer">
              <button
                type="button"
                className="blog-form-cancel"
                onClick={closeModal}
              >
                Close
              </button>

              <button
                type="button"
                className="blog-form-submit"
                onClick={() => openEditModal(selectedBlog)}
              >
                <Icon name="edit" size={16} />
                Edit Blog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          PREMIUM DELETE CONFIRMATION MODAL
      ===================================== */}

      {modal === "delete" && selectedBlog && (
        <div
          className={`bm-del-overlay ${delClosing ? "out" : ""}`}
          onMouseDown={closeDeleteModal}
        >
          <div
            className={`bm-del-modal ${delClosing ? "out" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-delete-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="bm-del-topbar" />
            <span className="bm-del-corner" />

            <button
              type="button"
              className="bm-del-close"
              onClick={closeDeleteModal}
              aria-label="Close"
            >
              <Icon name="close" size={16} />
            </button>

            <div className="bm-del-icon-wrap">
              <span className="bm-del-pulse p1" />
              <span className="bm-del-pulse p2" />
              <div className="bm-del-icon">
                <Icon name="trash" size={30} />
              </div>
            </div>

            <p className="bm-del-tag">DELETE CONFIRMATION</p>
            <h2 className="bm-del-title" id="blog-delete-title">
              Are you absolutely sure?
            </h2>
            <p className="bm-del-text">
              You're about to permanently delete this blog post.
              <br />
              This action cannot be undone.
            </p>

            <div className="bm-del-user">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/120x120/fcecef/cd101b?text=Blog";
                }}
              />
              <div>
                <strong>{selectedBlog.title}</strong>
                <span>By {selectedBlog.author}</span>
              </div>
              <em>#{deleteSerial}</em>
            </div>

            <div className="bm-del-warn">
              <Icon name="warning" size={18} />
              This blog and its associated details will be removed.
            </div>

            <div className="bm-del-btns">
              <button
                type="button"
                className="bm-del-keep"
                onClick={closeDeleteModal}
                disabled={deleting}
              >
                Keep Blog
              </button>

              <button
                type="button"
                className="bm-del-confirm"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <span className="bm-del-spinner" /> Deleting...
                  </>
                ) : (
                  <>
                    <Icon name="trash" size={16} /> Delete Permanently
                  </>
                )}
              </button>
            </div>

            <p className="bm-del-note">
              <Icon name="shield" size={14} />
              Please confirm before removing this record
            </p>
          </div>
        </div>
      )}

      {/* SUCCESS TOAST */}

      {toast && (
        <div className="bm-toast">
          <Icon name="check" size={18} /> {toast}
        </div>
      )}
    </section>
  );
};

export default Blogmanagement;