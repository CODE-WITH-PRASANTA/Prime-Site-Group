
import React, { useState } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaChevronDown,
  FaComments,
  FaEnvelope,
  FaPhoneAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import "./FloatingForm.css";

const FloatingForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    requirement: "",
  });

  // CONSTRUCTION SERVICE OPTIONS
  const services = [
    "Residential Construction",
    "Commercial Building Construction",
    "Industrial Construction",
    "House Construction",
    "Villa & Luxury Home Construction",
    "Apartment & Residential Complex",
    "Office & Corporate Building",
    "Interior Design & Decoration",
    "Architectural Design",
    "Structural Design & Planning",
    "Building Renovation & Remodeling",
    "Home Extension & Expansion",
    "Turnkey Construction Projects",
    "Civil Engineering Works",
    "Road & Infrastructure Construction",
    "Foundation & RCC Work",
    "Waterproofing Solutions",
    "Construction Consultation",
    "Project Management",
    "Other Construction Services",
  ];

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // OPEN POPUP
  const handleOpen = () => {
    setIsOpen(true);
    setIsSubmitted(false);
  };

  // CLOSE POPUP
  const handleClose = () => {
    setIsOpen(false);
  };

  // SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Construction Enquiry Data:", formData);

    // Connect your backend API here.

    setIsSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      requirement: "",
    });
  };

  return (
    <div className="FloatingForm-wrapper">

      {/* FLOATING ENQUIRY BUTTON */}
      <button
        type="button"
        className={`FloatingForm-trigger ${
          isOpen ? "FloatingForm-trigger-hidden" : ""
        }`}
        onClick={handleOpen}
        aria-label="Open construction enquiry form"
        aria-expanded={isOpen}
      >
        <span className="FloatingForm-trigger-icon">
          <FaComments />
        </span>

        <span className="FloatingForm-trigger-text">
          Let's Talk
        </span>

        <span className="FloatingForm-trigger-pulse"></span>
      </button>

      {/* BACKDROP */}
      <div
        className={`FloatingForm-backdrop ${
          isOpen ? "FloatingForm-backdrop-visible" : ""
        }`}
        onClick={handleClose}
        aria-hidden="true"
      ></div>

      {/* FLOATING POPUP */}
      <div
        className={`FloatingForm-popup ${
          isOpen ? "FloatingForm-popup-open" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Construction project enquiry form"
        aria-hidden={!isOpen}
      >

        {/* POPUP HEADER */}
        <div className="FloatingForm-header">

          <div className="FloatingForm-header-content">

            <span className="FloatingForm-header-label">
              LET'S BUILD YOUR DREAM PROJECT
            </span>

            <h2>
              Start Your
              <span> Construction Journey.</span>
            </h2>

            <p>
              Share your construction requirements with us.
              Our team will connect with you shortly.
            </p>

          </div>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            className="FloatingForm-close"
            onClick={handleClose}
            aria-label="Close enquiry form"
          >
            <FaTimes />
          </button>

          <div className="FloatingForm-header-decoration">
            <FaComments />
          </div>

        </div>

        {/* FORM BODY */}
        <div className="FloatingForm-body">

          {isSubmitted ? (

            /* SUCCESS MESSAGE */
            <div className="FloatingForm-success">

              <div className="FloatingForm-success-icon">
                <FaCheckCircle />
              </div>

              <h3>Thank You!</h3>

              <p>
                Your construction enquiry has been submitted
                successfully. Our team will contact you soon.
              </p>

              <button
                type="button"
                className="FloatingForm-submit"
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Enquiry
                <FaArrowRight />
              </button>

            </div>

          ) : (

            /* ENQUIRY FORM */
            <form
              className="FloatingForm-form"
              onSubmit={handleSubmit}
            >

              {/* FULL NAME */}
              <div className="FloatingForm-field">

                <label htmlFor="FloatingForm-name">
                  Full Name <span>*</span>
                </label>

                <div className="FloatingForm-input-wrap">

                  <FaUser className="FloatingForm-input-icon" />

                  <input
                    id="FloatingForm-name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />

                </div>
              </div>

              {/* EMAIL ADDRESS */}
              <div className="FloatingForm-field">

                <label htmlFor="FloatingForm-email">
                  Email Address <span>*</span>
                </label>

                <div className="FloatingForm-input-wrap">

                  <FaEnvelope className="FloatingForm-input-icon" />

                  <input
                    id="FloatingForm-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />

                </div>
              </div>

              {/* PHONE NUMBER */}
              <div className="FloatingForm-field">

                <label htmlFor="FloatingForm-phone">
                  Phone Number <span>*</span>
                </label>

                <div className="FloatingForm-input-wrap">

                  <FaPhoneAlt className="FloatingForm-input-icon" />

                  <input
                    id="FloatingForm-phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9+\-\s()]{7,18}"
                    title="Enter a valid phone number"
                    required
                  />

                </div>
              </div>

              {/* CONSTRUCTION SERVICE DROPDOWN */}
              <div className="FloatingForm-field">

                <label htmlFor="FloatingForm-service">
                  Service Interest <span>*</span>
                </label>

                <div className="FloatingForm-input-wrap FloatingForm-select-wrap">

                  <select
                    id="FloatingForm-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select construction service
                    </option>

                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}

                  </select>

                  <FaChevronDown className="FloatingForm-select-icon" />

                </div>
              </div>

              {/* PROJECT REQUIREMENTS */}
              <div className="FloatingForm-field">

                <label htmlFor="FloatingForm-requirement">
                  Your Requirements <span>*</span>
                </label>

                <textarea
                  id="FloatingForm-requirement"
                  name="requirement"
                  placeholder="Describe your project, location, plot size, budget or other requirements..."
                  value={formData.requirement}
                  onChange={handleChange}
                  rows="4"
                  required
                ></textarea>

              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="FloatingForm-submit"
              >
                Submit Enquiry
                <FaArrowRight />
              </button>

              {/* PRIVACY NOTE */}
              <p className="FloatingForm-privacy">
                Your information will only be used to contact
                you regarding your construction enquiry.
              </p>

            </form>

          )}

        </div>
      </div>
    </div>
  );
};

export default FloatingForm;
