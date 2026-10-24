
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Printer,
  ArrowUpRight,
  ShieldCheck,
  Send,
  CheckCircle2,
} from "lucide-react";

import "./ContactSection.css";
import MainLogo from "../../assets/main-logo.png";

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
        message:
          "Your form is ready. Connect your backend API to submit this enquiry.",
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

  const contactItems = [
    {
      icon: MapPin,
      title: "Headquarters",
      lines: [
        "Transguard Group Headquarters",
        "P.O. Box 22630",
      ],
      href: "https://www.google.com/maps/search/?api=1&query=Transguard+Group+Dubai",
      action: "View location",
    },
    {
      icon: Phone,
      title: "Telephone",
      lines: ["+971 (0) 4 703 0500"],
      href: "tel:+97147030500",
      action: "Call us",
    },
    {
      icon: Phone,
      title: "AE Toll Free",
      lines: ["800 1800"],
      href: "tel:8001800",
      action: "Call toll free",
    },
    {
      icon: Printer,
      title: "Fax",
      lines: ["+971 4 299 5664"],
      href: null,
      action: null,
    },
  ];

  return (
    <section className="ContactSection">
      <div className="ContactSection-shell">
        <div className="ContactSection-topLine">
          <span />
          <span>CONTACT OUR TEAM</span>
        </div>

        <div className="ContactSection-container">
          {/* LEFT: COMPANY INFORMATION */}
          <aside className="ContactSection-info">
            <div className="ContactSection-watermark" aria-hidden="true">
              T
            </div>

            <div className="ContactSection-infoInner">
              <a
                className="ContactSection-brand"
                href="/"
                aria-label="Transguard Group home"
              >
                <span className="ContactSection-logoWrap">
                  <img
                    className="ContactSection-logo"
                    src={MainLogo}
                    alt="Transguard Group logo"
                  />
                </span>

                <span className="ContactSection-brandText">
                  <span>Transguard</span>
                  <span>Group</span>
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
                  Have a question or need assistance? Our team is ready to
                  help you find the right solution for your business.
                </p>
              </div>

              <div className="ContactSection-contactList">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      className="ContactSection-contactItem"
                      key={item.title}
                    >
                      <span className="ContactSection-contactIcon">
                        <Icon size={18} strokeWidth={1.7} />
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
                            target={
                              item.href.startsWith("https://")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              item.href.startsWith("https://")
                                ? "noreferrer"
                                : undefined
                            }
                          >
                            {item.action}
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="ContactSection-trust">
                <span className="ContactSection-trustIcon">
                  <ShieldCheck size={19} strokeWidth={1.7} />
                </span>

                <span>
                  <strong>Professional support, every step.</strong>
                  <small>
                    Tell us what you need and we&apos;ll help you move forward.
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
                  Fill in your details below and share your enquiry with us.
                </p>
              </div>

              <form
                className="ContactSection-form"
                onSubmit={handleSubmit}
              >
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
                    <label htmlFor="ContactSection-phone">
                      Phone number
                    </label>

                    <input
                      id="ContactSection-phone"
                      type="tel"
                      name="phone"
                      placeholder="+971 ..."
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
                    >
                      <option value="">Select a service</option>
                      <option value="Security">Security</option>
                      <option value="Facilities Management">
                        Facilities Management
                      </option>
                      <option value="Manpower Supply">
                        Manpower Supply
                      </option>
                      <option value="Cash Services">Cash Services</option>
                      <option value="Other">Other</option>
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
                    >
                      <option value="">Select enquiry type</option>
                      <option value="General Enquiry">General enquiry</option>
                      <option value="Business Partnership">
                        Business partnership
                      </option>
                      <option value="Service Request">Service request</option>
                      <option value="Careers">Careers</option>
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
                      rows={3}
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
                      <Send size={15} />
                    </span>
                  </button>
                </div>

                <p className="ContactSection-privacy">
                  Your details are provided to help us respond to your enquiry.
                </p>

                {status.message && (
                  <div
                    className="ContactSection-status"
                    role="status"
                    aria-live="polite"
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 size={17} />
                    ) : (
                      <ShieldCheck size={17} />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}
              </form>
            </div>

            <div
              className="ContactSection-bottomAccent"
              aria-hidden="true"
            >
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
