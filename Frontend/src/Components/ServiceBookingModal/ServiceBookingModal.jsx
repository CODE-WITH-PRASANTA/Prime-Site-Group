import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2, Send } from "lucide-react";
import API from "../../api/axios";
import "./ServiceBookingModal.css";

const SERVICE_OPTIONS = [
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
  "Other",
];

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Proposal",
  "Quotation",
  "Support",
  "Partnership",
];

const ServiceBookingModal = ({
  isOpen,
  onClose,
  defaultService = "Security Services",
  modalTitle = "Book This Service",
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: defaultService,
    enquiry: "General Enquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({
        ...prev,
        service: defaultService || prev.service || SERVICE_OPTIONS[0],
      }));
      setErrors({});
      setServerError("");
      setSubmitted(false);
    }
  }, [isOpen, defaultService]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape" && !submitting) onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, submitting, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = "Full name is required (min 2 characters).";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim() || digits.length < 7 || digits.length > 15) {
      next.phone = "Please enter a valid phone number.";
    }
    if (!form.service.trim()) {
      next.service = "Please select a service.";
    }
    if (!form.message.trim() || form.message.trim().length < 5) {
      next.message = "Message is required (min 5 characters).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting || !validate()) return;

    try {
      setSubmitting(true);
      setServerError("");
      const res = await API.post("/service-bookings", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        service: form.service.trim(),
        enquiry: form.enquiry,
        message: form.message.trim(),
      });

      if (res.data?.success) {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: defaultService || SERVICE_OPTIONS[0],
          enquiry: "General Enquiry",
          message: "",
        });
      }
    } catch (err) {
      console.error("Service booking error:", err);
      setServerError(
        err.response?.data?.message ||
          "Unable to submit booking. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="ServiceBookingModal__backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sbm-title"
    >
      <div className="ServiceBookingModal__card">
        <div className="ServiceBookingModal__header">
          <div>
            <span className="ServiceBookingModal__badge">{form.service}</span>
            <h2 id="sbm-title" className="ServiceBookingModal__title">
              {modalTitle}
            </h2>
            <p className="ServiceBookingModal__subtitle">
              Fill in your details below and our specialist team will reach out promptly.
            </p>
          </div>
          <button
            type="button"
            className="ServiceBookingModal__close"
            onClick={onClose}
            aria-label="Close modal"
            disabled={submitting}
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="ServiceBookingModal__success">
            <div className="ServiceBookingModal__successIcon">
              <CheckCircle2 size={44} />
            </div>
            <h3>Booking Request Received!</h3>
            <p>
              Thank you for contacting Prime Site Group regarding{" "}
              <strong>{defaultService}</strong>. Our team will get back to you shortly.
            </p>
            <button
              type="button"
              className="ServiceBookingModal__btnPrimary"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ServiceBookingModal__form" noValidate>
            <div className="ServiceBookingModal__body">
              {serverError && (
                <div className="ServiceBookingModal__serverError">
                  {serverError}
                </div>
              )}

              <div className="ServiceBookingModal__grid">
                <div className="ServiceBookingModal__field">
                  <label htmlFor="sbm-name">
                    Full Name <span>*</span>
                  </label>
                  <input
                    id="sbm-name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? "has-error" : ""}
                  />
                  {errors.name && <small>{errors.name}</small>}
                </div>

                <div className="ServiceBookingModal__field">
                  <label htmlFor="sbm-email">
                    Email Address <span>*</span>
                  </label>
                  <input
                    id="sbm-email"
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? "has-error" : ""}
                  />
                  {errors.email && <small>{errors.email}</small>}
                </div>

                <div className="ServiceBookingModal__field">
                  <label htmlFor="sbm-phone">
                    Phone Number <span>*</span>
                  </label>
                  <input
                    id="sbm-phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    className={errors.phone ? "has-error" : ""}
                  />
                  {errors.phone && <small>{errors.phone}</small>}
                </div>

                <div className="ServiceBookingModal__field">
                  <label htmlFor="sbm-enquiry">Enquiry Type</label>
                  <select
                    id="sbm-enquiry"
                    name="enquiry"
                    value={form.enquiry}
                    onChange={handleChange}
                  >
                    {ENQUIRY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ServiceBookingModal__field">
                  <label htmlFor="sbm-service">
                    Service <span>*</span>
                  </label>
                  <select
                    id="sbm-service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={errors.service ? "has-error" : ""}
                  >
                    {!SERVICE_OPTIONS.includes(form.service) && form.service && (
                      <option value={form.service}>{form.service}</option>
                    )}
                    {SERVICE_OPTIONS.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                  {errors.service && <small>{errors.service}</small>}
                </div>

                <div className="ServiceBookingModal__field">
                  <label htmlFor="sbm-company">Company Name</label>
                  <input
                    id="sbm-company"
                    type="text"
                    name="company"
                    placeholder="Your company (optional)"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="ServiceBookingModal__field ServiceBookingModal__full">
                <label htmlFor="sbm-message">
                  Message <span>*</span>
                </label>
                <textarea
                  id="sbm-message"
                  name="message"
                  rows="4"
                  placeholder="Tell us about your requirements..."
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? "has-error" : ""}
                />
                {errors.message && <small>{errors.message}</small>}
              </div>
            </div>

            <div className="ServiceBookingModal__footer">
              <button
                type="button"
                className="ServiceBookingModal__btnCancel"
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ServiceBookingModal__btnPrimary"
                disabled={submitting}
              >
                <Send size={15} />
                {submitting ? "Submitting..." : "Submit Booking"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ServiceBookingModal;
