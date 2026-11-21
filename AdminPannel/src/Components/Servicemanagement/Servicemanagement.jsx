import React, { useEffect, useMemo, useState } from "react";
import "./Servicemanagement.css";

const INITIAL_DATA = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    company: "ABC Pvt Ltd",
    service: "Consulting",
    enquiry: "General Enquiry",
    message: "I want to know more about your consulting services. Please share the complete details.",
    addedService: "Consulting",
    date: "2025-11-20T10:45:00",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya Gupta",
    email: "priya@domain.com",
    phone: "8765432109",
    company: "XYZ Ltd",
    service: "Facility Management",
    enquiry: "Support",
    message: "Please share details about your facility management services and available packages.",
    addedService: "Facility Management",
    date: "2025-11-19T16:20:00",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Amit Verma",
    email: "amit@abc.com",
    phone: "7654321098",
    company: "Global Tech",
    service: "Sustainability",
    enquiry: "Proposal",
    message: "We are interested in your services. Kindly send us a detailed proposal.",
    addedService: "Sustainability",
    date: "2025-11-18T11:15:00",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "neha@xyz.com",
    phone: "6543210987",
    company: "Dream Infra",
    service: "Commercial Spaces",
    enquiry: "Quotation",
    message: "Kindly share quotation for your commercial space management services.",
    addedService: "Commercial Spaces",
    date: "2025-11-17T15:30:00",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    name: "Neha Patel",
    email: "vikram@tech.com",
    phone: "5432109876",
    company: "Tech Solutions",
    service: "Green Building",
    enquiry: "Partnership",
    message: "Let's discuss partnership opportunities and explore how we can work together.",
    addedService: "Green Building",
    date: "2025-11-16T13:25:00",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const SERVICES = [
  "Consulting",
  "Facility Management",
  "Sustainability",
  "Commercial Spaces",
  "Green Building",
  "Manpower Services",
  "Security Services",
  "Housekeeping",
  "Other",
];

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Support",
  "Proposal",
  "Quotation",
  "Partnership",
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  enquiry: "General Enquiry",
  message: "",
  addedService: "",
};

const Icon = ({ name, size = 18 }) => {
  const paths = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    reset: <><path d="M20 7v5h-5" /><path d="M20 12a8 8 0 1 0 1 4" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    left: <path d="m15 18-6-6 6-6" />,
    right: <path d="m9 18 6-6-6-6" />,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z" /></>,
    trash: <><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6" /><path d="M10 11v5m4-5v5" /></>,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    building: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1M10 21v-3h4v3" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2Z" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    alert: <><path d="M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4m0 3h.01" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.8L7.7 9.6a16 16 0 0 0 6.7 6.7l1.3-1.3a2 2 0 0 1 1.8-.6l2.8.5a2 2 0 0 1 1.7 2Z" />,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

const serviceClass = (service) => ({
  Consulting: "consulting",
  "Facility Management": "facility",
  Sustainability: "sustainability",
  "Commercial Spaces": "commercial",
  "Green Building": "green",
  "Manpower Services": "manpower",
  "Security Services": "security",
  Housekeeping: "housekeeping",
  Other: "other",
}[service] || "other");

const enquiryClass = (type) => ({
  "General Enquiry": "general",
  Support: "support",
  Proposal: "proposal",
  Quotation: "quotation",
  Partnership: "partnership",
}[type] || "general");

const formatDate = (date) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return { day: "—", year: "", time: "" };
  }

  return {
    day: parsed.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
    year: parsed.getFullYear(),
    time: parsed.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

const Servicemanagement = () => {
  const [bookings, setBookings] = useState(INITIAL_DATA);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [enquiryFilter, setEnquiryFilter] = useState("All Enquiry Types");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

  /* DELETE STATES */
  const [deleteId, setDeleteId] = useState(null);
  const [deleteSerial, setDeleteSerial] = useState(1);
  const [delClosing, setDelClosing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const pageSize = 5;

  const filteredBookings = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return bookings.filter((item) => {
      const matchesSearch =
        !query ||
        [item.name, item.email, item.company, item.phone, item.service, item.enquiry]
          .some((value) => String(value).toLowerCase().includes(query));

      return (
        matchesSearch &&
        (serviceFilter === "All Services" || item.service === serviceFilter) &&
        (enquiryFilter === "All Enquiry Types" || item.enquiry === enquiryFilter)
      );
    });
  }, [bookings, searchTerm, serviceFilter, enquiryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const visibleBookings = filteredBookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__serviceToastTimer);
    window.__serviceToastTimer = window.setTimeout(() => setToast(""), 2800);
  };

  const closeModal = () => {
    setModalType("");
    setSelectedBooking(null);
    setErrors({});
  };

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSelectedBooking(null);
    setModalType("add");
  };

  const openEditModal = (booking) => {
    setSelectedBooking(booking);
    setForm({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      company: booking.company,
      service: booking.service,
      enquiry: booking.enquiry,
      message: booking.message,
      addedService: booking.addedService,
    });
    setErrors({});
    setModalType("edit");
  };

  const openViewModal = (booking) => {
    setSelectedBooking(booking);
    setModalType("view");
  };

  const openServiceModal = (booking) => {
    setSelectedBooking(booking);
    setModalType("service");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number";
    }

    if (!form.company.trim()) nextErrors.company = "Company is required";
    if (!form.service) nextErrors.service = "Please select a service";
    if (!form.enquiry) nextErrors.enquiry = "Please select enquiry type";
    if (!form.message.trim()) nextErrors.message = "Message is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (modalType === "add") {
      const newBooking = {
        ...form,
        id: Date.now(),
        addedService: form.addedService.trim() || form.service,
        date: new Date().toISOString(),
        image: `https://i.pravatar.cc/150?u=${encodeURIComponent(form.email)}`,
      };

      setBookings((previous) => [newBooking, ...previous]);
      setCurrentPage(1);
      showToast("New service enquiry added successfully!");
    } else {
      setBookings((previous) =>
        previous.map((item) =>
          item.id === selectedBooking.id
            ? {
                ...item,
                ...form,
                addedService: form.addedService.trim() || form.service,
              }
            : item
        )
      );
      showToast("Service enquiry updated successfully!");
    }

    closeModal();
  };

  /* =========================================
     DELETE (WITH ANIMATION)
  ========================================= */

  const openDelete = (booking, serial) => {
    setDeleteId(booking.id);
    setDeleteSerial(serial);
    setDelClosing(false);
  };

  const closeDelete = () => {
    if (deleting) return;
    setDelClosing(true);
    setTimeout(() => {
      setDeleteId(null);
      setDelClosing(false);
    }, 250);
  };

  const handleDelete = () => {
    if (deleteId === null || deleting) return;

    const id = deleteId;
    setDeleting(true);

    setTimeout(() => {
      setDeleting(false);
      setDelClosing(true);

      setTimeout(() => {
        setDeleteId(null);
        setDelClosing(false);
        setRemovingId(id);

        setTimeout(() => {
          setBookings((previous) => previous.filter((item) => item.id !== id));
          setRemovingId(null);
          setCurrentPage((p) =>
            Math.min(p, Math.max(1, Math.ceil((bookings.length - 1) / pageSize)))
          );
          showToast("Service enquiry deleted successfully!");
        }, 450);
      }, 250);
    }, 900);
  };

  /* Esc key closes delete modal */
  useEffect(() => {
    if (deleteId === null) return;
    const onKey = (e) => e.key === "Escape" && closeDelete();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, [deleteId, deleting]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchInput("");
    setSearchTerm("");
    setServiceFilter("All Services");
    setEnquiryFilter("All Enquiry Types");
    setCurrentPage(1);
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const startEntry = filteredBookings.length
    ? (currentPage - 1) * pageSize + 1
    : 0;

  const endEntry = Math.min(currentPage * pageSize, filteredBookings.length);

  const bookingToDelete = bookings.find((item) => item.id === deleteId);

  return (
    <main className="servicemanagement-page">

      {/* HEADER */}
      <section className="servicemanagement-header">
        <div className="servicemanagement-header-left">
          <div className="servicemanagement-header-icon">
            <Icon name="calendar" size={25} />
          </div>
          <div className="servicemanagement-heading">
            <h1>Service Booking Management</h1>
            <p>Manage all service booking enquiries</p>
          </div>
        </div>

        <button type="button" className="servicemanagement-add-btn" onClick={openAddModal}>
          <Icon name="plus" size={19} />
          <span>Add Service</span>
        </button>
      </section>

      {/* CONTENT */}
      <section className="servicemanagement-content">

        {/* FILTERS */}
        <form className="servicemanagement-filterbar" onSubmit={handleSearch}>
          <div className="servicemanagement-searchbox">
            <Icon name="search" size={19} />
            <input
              type="text"
              placeholder="Search by name, email or company..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search bookings"
            />
          </div>

          <div className="servicemanagement-selectbox">
            <select
              value={serviceFilter}
              onChange={(e) => {
                setServiceFilter(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by service"
            >
              <option>All Services</option>
              {SERVICES.map((service) => <option key={service}>{service}</option>)}
            </select>
            <Icon name="chevron" size={16} />
          </div>

          <div className="servicemanagement-selectbox">
            <select
              value={enquiryFilter}
              onChange={(e) => {
                setEnquiryFilter(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by enquiry type"
            >
              <option>All Enquiry Types</option>
              {ENQUIRY_TYPES.map((type) => <option key={type}>{type}</option>)}
            </select>
            <Icon name="chevron" size={16} />
          </div>

          <button type="submit" className="servicemanagement-search-btn">
            <Icon name="search" size={17} />
            Search
          </button>

          <button type="button" className="servicemanagement-reset-btn" onClick={handleReset}>
            <Icon name="reset" size={18} />
            Reset
          </button>
        </form>

        {/* TABLE */}
        <div className="servicemanagement-table-wrapper">
          <table className="servicemanagement-table">
            <thead>
              <tr>
                <th className="servicemanagement-number-col">#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company<br />Name</th>
                <th>Service of<br />Interest</th>
                <th>Enquiry<br />Type</th>
                <th>Message</th>
                <th>Added<br />Service</th>
                <th>Date</th>
                <th className="servicemanagement-actions-heading">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleBookings.map((booking, index) => {
                const date = formatDate(booking.date);
                const serial = (currentPage - 1) * pageSize + index + 1;

                return (
                  <tr
                    key={booking.id}
                    className={removingId === booking.id ? "sd-row-removing" : ""}
                  >
                    <td className="servicemanagement-number-col">{serial}</td>
                    <td className="servicemanagement-name-cell">{booking.name}</td>
                    <td className="servicemanagement-email-cell">{booking.email}</td>
                    <td className="servicemanagement-phone-cell">{booking.phone}</td>
                    <td>{booking.company}</td>

                    <td>
                      <span className={`servicemanagement-service-badge servicemanagement-service-${serviceClass(booking.service)}`}>
                        <Icon name={serviceClass(booking.service) === "facility" ? "settings" : "building"} size={14} />
                        {booking.service}
                      </span>
                    </td>

                    <td>
                      <span className={`servicemanagement-enquiry-badge servicemanagement-enquiry-${enquiryClass(booking.enquiry)}`}>
                        <span className="servicemanagement-badge-dot" />
                        {booking.enquiry}
                      </span>
                    </td>

                    <td>
                      <span className="servicemanagement-message" title={booking.message}>
                        {booking.message}
                      </span>
                    </td>

                    <td>
                      <button type="button" className="servicemanagement-view-service" onClick={() => openServiceModal(booking)}>
                        View
                      </button>
                    </td>

                    <td>
                      <div className="servicemanagement-date">
                        <Icon name="calendar" size={15} />
                        <div>
                          <strong>{date.day}</strong>
                          <strong>{date.year}</strong>
                          <small>{date.time}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="servicemanagement-actions">
                        <button type="button" className="servicemanagement-action-btn servicemanagement-eye-btn" title="View enquiry" onClick={() => openViewModal(booking)}>
                          <Icon name="eye" size={18} />
                        </button>
                        <button type="button" className="servicemanagement-action-btn servicemanagement-edit-btn" title="Edit enquiry" onClick={() => openEditModal(booking)}>
                          <Icon name="edit" size={18} />
                        </button>
                        <button type="button" className="servicemanagement-action-btn servicemanagement-delete-btn" title="Delete enquiry" onClick={() => openDelete(booking, serial)}>
                          <Icon name="trash" size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {visibleBookings.length === 0 && (
                <tr>
                  <td colSpan="11">
                    <div className="servicemanagement-empty">
                      <div className="servicemanagement-empty-icon"><Icon name="search" size={27} /></div>
                      <h3>No enquiries found</h3>
                      <p>Try changing your search term or filters to find service enquiries.</p>
                      <button type="button" onClick={handleReset}>Clear Filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="servicemanagement-pagination">
          <p>
            Showing <strong>{startEntry}</strong> to <strong>{endEntry}</strong> of{" "}
            <strong>{filteredBookings.length}</strong> entries
          </p>

          <div className="servicemanagement-pagination-controls">
            <button
              type="button"
              className="servicemanagement-page-arrow"
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <Icon name="left" size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                type="button"
                key={page}
                className={`servicemanagement-page-number ${currentPage === page ? "active" : ""}`}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="servicemanagement-page-arrow"
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <Icon name="right" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ADD / EDIT MODAL */}
      {(modalType === "add" || modalType === "edit") && (
        <div className="servicemanagement-modal-overlay" onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}>
          <div className="servicemanagement-modal servicemanagement-form-modal">
            <div className="servicemanagement-modal-header">
              <div>
                <span className="servicemanagement-modal-icon">
                  <Icon name={modalType === "add" ? "plus" : "edit"} size={21} />
                </span>
                <div>
                  <h2>{modalType === "add" ? "Add New Service" : "Edit Service Enquiry"}</h2>
                  <p>{modalType === "add" ? "Enter the details to create a new enquiry" : "Update the service enquiry details"}</p>
                </div>
              </div>
              <button type="button" className="servicemanagement-modal-close" onClick={closeModal}>
                <Icon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="servicemanagement-form-grid">
                <div className="servicemanagement-field">
                  <label>Full Name <span>*</span></label>
                  <input name="name" value={form.name} onChange={handleFormChange} placeholder="Enter full name" />
                  {errors.name && <small>{errors.name}</small>}
                </div>

                <div className="servicemanagement-field">
                  <label>Email Address <span>*</span></label>
                  <input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="example@email.com" />
                  {errors.email && <small>{errors.email}</small>}
                </div>

                <div className="servicemanagement-field">
                  <label>Phone Number <span>*</span></label>
                  <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="Enter phone number" />
                  {errors.phone && <small>{errors.phone}</small>}
                </div>

                <div className="servicemanagement-field">
                  <label>Company Name <span>*</span></label>
                  <input name="company" value={form.company} onChange={handleFormChange} placeholder="Enter company name" />
                  {errors.company && <small>{errors.company}</small>}
                </div>

                <div className="servicemanagement-field">
                  <label>Service of Interest <span>*</span></label>
                  <select name="service" value={form.service} onChange={handleFormChange}>
                    <option value="">Select Service</option>
                    {SERVICES.map((service) => <option key={service}>{service}</option>)}
                  </select>
                  {errors.service && <small>{errors.service}</small>}
                </div>

                <div className="servicemanagement-field">
                  <label>Enquiry Type <span>*</span></label>
                  <select name="enquiry" value={form.enquiry} onChange={handleFormChange}>
                    {ENQUIRY_TYPES.map((type) => <option key={type}>{type}</option>)}
                  </select>
                  {errors.enquiry && <small>{errors.enquiry}</small>}
                </div>

                <div className="servicemanagement-field servicemanagement-full-field">
                  <label>Added Service</label>
                  <input name="addedService" value={form.addedService} onChange={handleFormChange} placeholder="Optional - defaults to selected service" />
                </div>

                <div className="servicemanagement-field servicemanagement-full-field">
                  <label>Message <span>*</span></label>
                  <textarea name="message" rows="4" value={form.message} onChange={handleFormChange} placeholder="Enter enquiry message..." />
                  {errors.message && <small>{errors.message}</small>}
                </div>
              </div>

              <div className="servicemanagement-modal-footer">
                <button type="button" className="servicemanagement-cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="servicemanagement-submit-btn">
                  <Icon name={modalType === "add" ? "plus" : "edit"} size={17} />
                  {modalType === "add" ? "Add Service" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW ENQUIRY WITH CUSTOMER PHOTO */}
      {modalType === "view" && selectedBooking && (
        <div className="servicemanagement-modal-overlay" onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}>
          <div className="servicemanagement-modal servicemanagement-details-modal">
            <div className="servicemanagement-modal-header">
              <div>
                <span className="servicemanagement-modal-icon"><Icon name="eye" size={21} /></span>
                <div>
                  <h2>Enquiry Details</h2>
                  <p>Complete service booking information</p>
                </div>
              </div>
              <button type="button" className="servicemanagement-modal-close" onClick={closeModal}>
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="servicemanagement-details-body">

              {/* PREMIUM CUSTOMER PROFILE */}
              <div className="servicemanagement-customer-profile">
                <div className="servicemanagement-profile-photo-wrap">
                  <img
                    className="servicemanagement-profile-photo"
                    src={selectedBooking.image || `https://i.pravatar.cc/150?u=${encodeURIComponent(selectedBooking.email)}`}
                    alt={`${selectedBooking.name} profile`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(selectedBooking.name) + "&background=dc101b&color=fff&size=150";
                    }}
                  />
                  <span className="servicemanagement-profile-online-dot" />
                </div>

                <div className="servicemanagement-profile-info">
                  <span className="servicemanagement-profile-label">CUSTOMER PROFILE</span>
                  <h3>{selectedBooking.name}</h3>
                  <p>{selectedBooking.company}</p>
                  <div className="servicemanagement-profile-tags">
                    <span><Icon name="shield" size={12} /> Enquiry Customer</span>
                    <span className={`servicemanagement-profile-enquiry servicemanagement-enquiry-${enquiryClass(selectedBooking.enquiry)}`}>
                      {selectedBooking.enquiry}
                    </span>
                  </div>
                </div>
              </div>

              {/* CONTACT INFORMATION */}
              <div className="servicemanagement-details-section-title">
                <span className="servicemanagement-section-line" />
                Contact Information
              </div>

              <div className="servicemanagement-details-grid">
                <div>
                  <span><Icon name="mail" size={14} /> Email Address</span>
                  <strong>{selectedBooking.email}</strong>
                </div>
                <div>
                  <span><Icon name="phone" size={14} /> Phone Number</span>
                  <strong>{selectedBooking.phone}</strong>
                </div>
                <div>
                  <span><Icon name="building" size={14} /> Company</span>
                  <strong>{selectedBooking.company}</strong>
                </div>
                <div>
                  <span><Icon name="settings" size={14} /> Service of Interest</span>
                  <strong>{selectedBooking.service}</strong>
                </div>
                <div>
                  <span><Icon name="shield" size={14} /> Enquiry Type</span>
                  <strong>{selectedBooking.enquiry}</strong>
                </div>
                <div>
                  <span><Icon name="building" size={14} /> Added Service</span>
                  <strong>{selectedBooking.addedService}</strong>
                </div>
              </div>

              {/* MESSAGE */}
              <div className="servicemanagement-details-message">
                <span>Customer Message</span>
                <p>{selectedBooking.message}</p>
              </div>

              <div className="servicemanagement-details-date">
                <Icon name="calendar" size={17} />
                Submitted on {new Date(selectedBooking.date).toLocaleString("en-IN")}
              </div>
            </div>

            <div className="servicemanagement-modal-footer">
              <button type="button" className="servicemanagement-cancel-btn" onClick={closeModal}>Close</button>
              <button type="button" className="servicemanagement-submit-btn" onClick={() => openEditModal(selectedBooking)}>
                <Icon name="edit" size={17} /> Edit Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADDED SERVICE DETAILS */}
      {modalType === "service" && selectedBooking && (
        <div className="servicemanagement-modal-overlay" onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}>
          <div className="servicemanagement-modal servicemanagement-details-modal">
            <div className="servicemanagement-modal-header">
              <div>
                <span className="servicemanagement-modal-icon"><Icon name="building" size={21} /></span>
                <div>
                  <h2>Added Service Details</h2>
                  <p>Complete service information</p>
                </div>
              </div>
              <button type="button" className="servicemanagement-modal-close" onClick={closeModal}>
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="servicemanagement-details-body">
              <div className="servicemanagement-added-service-card">
                <div className="servicemanagement-added-service-icon"><Icon name="building" size={28} /></div>
                <span>ADDED SERVICE</span>
                <h3>{selectedBooking.addedService || selectedBooking.service}</h3>
                <p>This service is associated with the enquiry submitted by <strong>{selectedBooking.name}</strong>.</p>
                <div><span>Company</span><strong>{selectedBooking.company}</strong></div>
                <div><span>Service Category</span><strong>{selectedBooking.service}</strong></div>
              </div>
            </div>

            <div className="servicemanagement-modal-footer">
              <button type="button" className="servicemanagement-cancel-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* PREMIUM DELETE CONFIRMATION */}
      {deleteId !== null && bookingToDelete && (
        <div
          className={`sd-overlay ${delClosing ? "out" : ""}`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeDelete();
          }}
        >
          <div
            className={`sd-modal ${delClosing ? "out" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-delete-title"
          >
            <div className="sd-topbar" />
            <span className="sd-corner" />

            <button
              type="button"
              className="sd-close"
              onClick={closeDelete}
              aria-label="Close"
            >
              <Icon name="close" size={16} />
            </button>

            <div className="sd-icon-wrap">
              <span className="sd-pulse p1" />
              <span className="sd-pulse p2" />
              <div className="sd-icon">
                <Icon name="trash" size={30} />
              </div>
            </div>

            <p className="sd-tag">DELETE CONFIRMATION</p>
            <h2 className="sd-title" id="service-delete-title">
              Are you absolutely sure?
            </h2>
            <p className="sd-text">
              You're about to permanently delete this service enquiry.
              <br />
              This action cannot be undone.
            </p>

            <div className="sd-user">
              <img
                src={bookingToDelete.image || `https://i.pravatar.cc/150?u=${encodeURIComponent(bookingToDelete.email)}`}
                alt={bookingToDelete.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(bookingToDelete.name) +
                    "&background=dc101b&color=fff";
                }}
              />
              <div>
                <strong>{bookingToDelete.name}</strong>
                <span>{bookingToDelete.email}</span>
              </div>
              <em>#{deleteSerial}</em>
            </div>

            <div className="sd-warn">
              <Icon name="alert" size={18} />
              This enquiry and its associated details will be removed.
            </div>

            <div className="sd-btns">
              <button
                type="button"
                className="sd-keep"
                onClick={closeDelete}
                disabled={deleting}
              >
                Keep Enquiry
              </button>

              <button
                type="button"
                className="sd-confirm"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <span className="sd-spinner" /> Deleting...
                  </>
                ) : (
                  <>
                    <Icon name="trash" size={16} /> Delete Permanently
                  </>
                )}
              </button>
            </div>

            <p className="sd-note">
              <Icon name="shield" size={14} />
              Please confirm before removing this record
            </p>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="servicemanagement-toast" role="status">
          <span className="servicemanagement-toast-check"><Icon name="check" size={13} /></span>
          {toast}
        </div>
      )}
    </main>
  );
};

export default Servicemanagement;