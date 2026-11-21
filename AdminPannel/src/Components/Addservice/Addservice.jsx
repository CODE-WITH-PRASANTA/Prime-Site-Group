
import React, { useState } from "react";
import "./Addservice.css";

const SERVICE_OPTIONS = [
  "Manpower Services",
  "Housekeeping Services",
  "Security Services",
  "Facility Management",
  "Hotel Management",
  "Kitchen Maintenance",
  "Food & Catering Services",
  "Living Solutions",
  "Other Services",
];

const ENQUIRY_OPTIONS = [
  "General Enquiry",
  "Service Booking",
  "Request a Quotation",
  "Business Partnership",
  "Technical Support",
  "Other",
];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  enquiryType: "",
  message: "",
};

const Icon = ({ name, size = 21 }) => {
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
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18M12 14v4M10 16h4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 7 9-7" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.2 10a16 16 0 0 0 6.8 6.8l1.5-1.8a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 2Z" />
    ),
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M11 21v-3h2v3" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    tag: (
      <>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3.4 13.4a2 2 0 0 1 0-2.8l7.2-7.2H20v9.2Z" />
        <circle cx="16" cy="8" r="1" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
      </>
    ),
    reset: (
      <>
        <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
        <path d="M3 3v5h5" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
  };

  return <svg {...common}>{paths[name]}</svg>;
};

const Addservice = ({ onSubmit }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setNotification(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phone = formData.phone.replace(/[\s()+-]/g, "");

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^\d{10,13}$/.test(phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }

    if (!formData.enquiryType) {
      newErrors.enquiryType = "Please select an enquiry type.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setNotification(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setNotification({
        type: "error",
        message: "Please check the highlighted fields.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      if (onSubmit) {
        await onSubmit({ ...formData });
      }

      setNotification({
        type: "success",
        message: onSubmit
          ? "Service enquiry submitted successfully!"
          : "Form validated successfully. Connect your API to save this enquiry.",
      });

      if (onSubmit) {
        setFormData(INITIAL_FORM);
        setErrors({});
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Unable to submit your enquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldError = (field) =>
    errors[field] ? (
      <span className="addservice-error">{errors[field]}</span>
    ) : null;

  return (
    <section className="addservice-page">
      <div className="addservice-card">

        {/* Header */}
        <div className="addservice-header">
          <div className="addservice-header-icon">
            <Icon name="calendar" size={27} />
          </div>

          <div className="addservice-heading-content">
            <h2>Add Service</h2>
            <p>Manage service booking enquiries</p>
          </div>
        </div>

        {/* Form */}
        <form className="addservice-form" onSubmit={handleSubmit} noValidate>

          <div className="addservice-fields-grid">

            {/* Name */}
            <div className="addservice-field">
              <label htmlFor="addservice-name">
                Name <span>*</span>
              </label>

              <div className={`addservice-input-wrapper ${errors.name ? "has-error" : ""}`}>
                <Icon name="user" />
                <input
                  id="addservice-name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
              {renderFieldError("name")}
            </div>

            {/* Email */}
            <div className="addservice-field">
              <label htmlFor="addservice-email">
                Email <span>*</span>
              </label>

              <div className={`addservice-input-wrapper ${errors.email ? "has-error" : ""}`}>
                <Icon name="mail" />
                <input
                  id="addservice-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              {renderFieldError("email")}
            </div>

            {/* Phone */}
            <div className="addservice-field">
              <label htmlFor="addservice-phone">
                Phone <span>*</span>
              </label>

              <div className={`addservice-input-wrapper ${errors.phone ? "has-error" : ""}`}>
                <Icon name="phone" />
                <input
                  id="addservice-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>
              {renderFieldError("phone")}
            </div>

            {/* Company */}
            <div className="addservice-field">
              <label htmlFor="addservice-company">
                Company Name <span className="optional">(Optional)</span>
              </label>

              <div className="addservice-input-wrapper">
                <Icon name="building" />
                <input
                  id="addservice-company"
                  type="text"
                  name="company"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                />
              </div>
            </div>

            {/* Service Dropdown */}
            <div className="addservice-field">
              <label htmlFor="addservice-service">
                Service of Interest <span>*</span>
              </label>

              <div className={`addservice-input-wrapper addservice-select-wrapper ${errors.service ? "has-error" : ""}`}>
                <Icon name="grid" />

                <select
                  id="addservice-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Service</option>
                  {SERVICE_OPTIONS.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>

                <span className="addservice-chevron">
                  <Icon name="chevron" size={19} />
                </span>
              </div>
              {renderFieldError("service")}
            </div>

            {/* Enquiry Dropdown */}
            <div className="addservice-field">
              <label htmlFor="addservice-enquiry">
                Enquiry Type <span>*</span>
              </label>

              <div className={`addservice-input-wrapper addservice-select-wrapper ${errors.enquiryType ? "has-error" : ""}`}>
                <Icon name="tag" />

                <select
                  id="addservice-enquiry"
                  name="enquiryType"
                  value={formData.enquiryType}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Enquiry Type</option>
                  {ENQUIRY_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <span className="addservice-chevron">
                  <Icon name="chevron" size={19} />
                </span>
              </div>
              {renderFieldError("enquiryType")}
            </div>

          </div>

          {/* Message */}
          <div className="addservice-field addservice-message-field">
            <label htmlFor="addservice-message">
              Your Message <span>*</span>
            </label>

            <div className={`addservice-input-wrapper addservice-textarea-wrapper ${errors.message ? "has-error" : ""}`}>
              <Icon name="message" />
              <textarea
                id="addservice-message"
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
              />
            </div>
            {renderFieldError("message")}
          </div>

          {/* Notification */}
          {notification && (
            <div
              className={`addservice-notification addservice-notification-${notification.type}`}
              role="status"
              aria-live="polite"
            >
              <span className="addservice-notification-dot" />
              {notification.message}
            </div>
          )}

          {/* Buttons */}
          <div className="addservice-actions">

            <button
              type="button"
              className="addservice-reset-btn"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              <Icon name="reset" size={22} />
              <span>Reset</span>
            </button>

            <button
              type="submit"
              className="addservice-submit-btn"
              disabled={isSubmitting}
            >
              <Icon name="send" size={23} />
              <span>{isSubmitting ? "Submitting..." : "Add Service"}</span>
            </button>

          </div>

        </form>
      </div>
    </section>
  );
};

export default Addservice;
