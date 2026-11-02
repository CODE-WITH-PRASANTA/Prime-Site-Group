import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Send,
  CheckCircle2,
} from "lucide-react";

import "./ContactSection.css";
import MainLogo from "../../assets/main-logo.png";

/* ------------------------------------------------------------------
   EDIT YOUR REAL DETAILS HERE. Everything on the page uses these.
   The values below are placeholders - replace them with your own.
------------------------------------------------------------------- */
const BRAND_NAME = "Prime Site";
const BRAND_FIRST = "Prime";
const BRAND_LAST = "Site";

const CONTACT = {
  addressLines: ["Your Office Address", "City, State, Country"],
  // India number (placeholder - replace with your real number)
  phoneDisplay: "+91 00000 00000",
  phoneLink: "+910000000000", // digits only, used for the call link
  email: "info@yourwebsite.com",
  hours: ["Mon - Sat", "9:00 AM - 6:00 PM"],
};

const SERVICE_OPTIONS = [
  "Manpower Solutions",
  "Workforce Solutions",
  "Security Services",
  "Facilities Management",
  "Hospitality Solutions",
  "Aviation Services",
  "Systems Integration",
  "Managed Services",
  "Cash Services",
  "Other",
];

const ENQUIRY_OPTIONS = [
  "General Enquiry",
  "Manpower Requirement",
  "Business Partnership",
  "Service Request",
  "Careers",
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    enquiry: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // Connect your contact API here.
      // Example:
      // await API.post("/contact", formData);

      console.log("Contact form data:", formData);

      setStatus({
        type: "success",
        message: `Thank you! Your enquiry has been received. The ${BRAND_NAME} team will get back to you shortly.`,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        enquiry: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Unable to submit your enquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapQuery = encodeURIComponent(
    `${BRAND_NAME} ${CONTACT.addressLines.join(", ")}`
  );

  const contactItems = [
    {
      icon: MapPin,
      title: "Our Office",
      lines: CONTACT.addressLines,
      href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
      action: "View location",
    },
    {
      icon: Phone,
      title: "Call Us",
      lines: [`India: ${CONTACT.phoneDisplay}`],
      href: `tel:${CONTACT.phoneLink}`,
      action: "Call now",
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: [CONTACT.email],
      href: `mailto:${CONTACT.email}`,
      action: "Send an email",
    },
    {
      icon: Clock,
      title: "Working Hours",
      lines: CONTACT.hours,
      href: null,
      action: null,
    },
  ];

  return (
    <section className="ContactSection">
      <div className="ContactSection-shell">
        <div className="ContactSection-topLine">
          <span />
          <span>CONTACT {BRAND_NAME.toUpperCase()}</span>
        </div>

        <div className="ContactSection-container">
          {/* LEFT: COMPANY INFORMATION */}
          <aside className="ContactSection-info">
            <div className="ContactSection-watermark" aria-hidden="true">
              {BRAND_FIRST.charAt(0)}
            </div>

            <div className="ContactSection-infoInner">
              <a
                className="ContactSection-brand"
                href="/"
                aria-label={`${BRAND_NAME} home`}
              >
                <span className="ContactSection-logoWrap">
                  <img
                    className="ContactSection-logo"
                    src={MainLogo}
                    alt={`${BRAND_NAME} logo`}
                  />
                </span>

                <span className="ContactSection-brandText">
                  <span className="ContactSection-brandName">
                    {BRAND_FIRST} <span>{BRAND_LAST}</span>
                  </span>
                  <span className="ContactSection-brandRule" />
                </span>
              </a>

              <div className="ContactSection-heading">
                <div className="ContactSection-eyebrow">
                  <span className="ContactSection-eyebrowLine" />
                  GET IN TOUCH
                </div>

                <h2 className="ContactSection-infoTitle">
                  Let&apos;s start a
                  <br />
                  <span>conversation.</span>
                </h2>

                <p className="ContactSection-infoDescription">
                  Need skilled manpower, a security team or reliable facility
                  support? Tell {BRAND_NAME} what you need and our team will
                  help you find the right solution for your business.
                </p>
              </div>

              <div className="ContactSection-contactList">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const isExternal = item.href?.startsWith("https://");

                  return (
                    <div
                      className="ContactSection-contactItem"
                      key={item.title}
                    >
                      <span className="ContactSection-contactIcon">
                        <Icon size={20} strokeWidth={1.8} />
                      </span>

                      <div className="ContactSection-contactText">
                        <strong>{item.title}</strong>

                        {item.lines.map((line) => (
                          <span
                            className="ContactSection-contactLine"
                            key={line}
                          >
                            {line}
                          </span>
                        ))}

                        {item.href && (
                          <a
                            className="ContactSection-contactLink"
                            href={item.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noreferrer" : undefined}
                          >
                            {item.action}
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="ContactSection-trust">
                <span className="ContactSection-trustIcon">
                  <ShieldCheck size={22} strokeWidth={1.8} />
                </span>

                <span>
                  <strong>Professional support, every step.</strong>
                  <small>
                    From first enquiry to deployment, {BRAND_NAME} is with you.
                  </small>
                </span>
              </div>
            </div>
          </aside>

          {/* RIGHT: CONTACT FORM */}
          <div className="ContactSection-formPanel">
            <div className="ContactSection-formCard">
              <div className="ContactSection-formHeader">
                <div className="ContactSection-formEyebrow">
                  <span className="ContactSection-liveDot" />
                  WE&apos;RE HERE TO HELP
                </div>

                <h2 className="ContactSection-formTitle">
                  Get in <span>touch.</span>
                </h2>

                <p className="ContactSection-formDescription">
                  Fill in your details below and share your enquiry with{" "}
                  {BRAND_NAME}. We usually reply within one working day.
                </p>
              </div>

              <form className="ContactSection-form" onSubmit={handleSubmit}>
                <div className="ContactSection-fields">
                  <div className="ContactSection-field">
                    <label htmlFor="ContactSection-name">
                      Full name <span>*</span>
                    </label>

                    <input
                      id="ContactSection-name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="ContactSection-field">
                    <label htmlFor="ContactSection-email">
                      Email address <span>*</span>
                    </label>

                    <input
                      id="ContactSection-email"
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="ContactSection-field">
                    <label htmlFor="ContactSection-phone">Phone number</label>

                    <input
                      id="ContactSection-phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>

                  <div className="ContactSection-field">
                    <label htmlFor="ContactSection-company">
                      Company name
                    </label>

                    <input
                      id="ContactSection-company"
                      type="text"
                      name="company"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={handleChange}
                      autoComplete="organization"
                    />
                  </div>

                  <div className="ContactSection-field">
                    <label htmlFor="ContactSection-service">
                      Service of interest
                    </label>

                    <select
                      id="ContactSection-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={formData.service ? "has-value" : ""}
                    >
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="ContactSection-field">
                    <label htmlFor="ContactSection-enquiry">
                      Enquiry type
                    </label>

                    <select
                      id="ContactSection-enquiry"
                      name="enquiry"
                      value={formData.enquiry}
                      onChange={handleChange}
                      className={formData.enquiry ? "has-value" : ""}
                    >
                      <option value="">Select enquiry type</option>
                      {ENQUIRY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="ContactSection-field ContactSection-fieldFull">
                    <label htmlFor="ContactSection-message">
                      Your message <span>*</span>
                    </label>

                    <textarea
                      id="ContactSection-message"
                      name="message"
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>
                </div>

                <div className="ContactSection-submitRow">
                  <p className="ContactSection-requiredNote">
                    <span>*</span> Required fields
                  </p>

                  <button
                    type="submit"
                    className="ContactSection-submit"
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting ? "Submitting..." : "Send Enquiry"}
                    </span>

                    <span className="ContactSection-submitArrow">
                      <Send size={16} />
                    </span>
                  </button>
                </div>

                <p className="ContactSection-privacy">
                  Your details are used only to respond to your enquiry.
                </p>

                {status.message && (
                  <div
                    className={`ContactSection-status ContactSection-status--${status.type}`}
                    role="status"
                    aria-live="polite"
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 size={19} />
                    ) : (
                      <ShieldCheck size={19} />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}
              </form>
            </div>

            <div className="ContactSection-bottomAccent" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;