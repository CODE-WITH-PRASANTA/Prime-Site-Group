import React, { useState, useEffect } from "react";
import "./AviationServicesMain.css";

const AviationServicesMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "Airside Ramp & Baggage Handling",
    enquiryType: "Ground Support Request",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        service: "Airside Ramp & Baggage Handling",
        enquiryType: "Ground Support Request",
        message: "",
      });
    }, 1800);
  };

  return (
    <>
      <section
        className={`AviationServicesMain ${isLoaded ? "AviationServicesMain--loaded" : ""}`}
        aria-label="Aviation and Airport Ground Handling Services Overview"
      >
        {/* 45% Visual Right Media (Aviation & Airside Operations Background) */}
        <div className="AviationServicesMain__mediaWrap">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
            alt="International airport airside ground logistics and tarmac handling fleet"
            className="AviationServicesMain__mediaImage"
          />
          <div className="AviationServicesMain__mediaShade" />

          {/* Floating Sector Badge */}
          <div className="AviationServicesMain__heroTag">
            <span className="AviationServicesMain__heroTagDot" />
            <span className="AviationServicesMain__heroTagTitle">AIRSIDE & RAMP LOGISTICS</span>
            <span className="AviationServicesMain__heroTagDivider" />
            <span className="AviationServicesMain__heroTagSubtitle">PASSENGER & CARGO CARE</span>
          </div>
        </div>

        {/* 55% Angled Executive Content Panel */}
        <div className="AviationServicesMain__leftPanel">
          <div className="AviationServicesMain__panelTexture" />

          <div className="AviationServicesMain__content">
            <div className="AviationServicesMain__eyebrowWrap">
              <span className="AviationServicesMain__eyebrowLine" />
              <span className="AviationServicesMain__eyebrow">AVIATION LOGISTICS & SUPPORT</span>
            </div>

            <h1 className="AviationServicesMain__title">
              Prime Site <span className="AviationServicesMain__titleAccent">Aviation Services</span>
            </h1>

            <p className="AviationServicesMain__lead">
              The premier aviation support partner powering global air travel hubs, delivering
              airside ramp support, high-security passenger workflows, and cargo logistics
              across the UAE's busiest international terminals.
            </p>

            <p className="AviationServicesMain__description">
              Combining IATA-certified ground personnel, rigorous aviation security protocols,
              rapid turn-around ramp management, and specialized PRM passenger assistance to
              guarantee zero-delay airfield performance and passenger satisfaction.
            </p>

            {/* Service Feature Highlights */}
            <div className="AviationServicesMain__features">
              <span className="AviationServicesMain__featurePill">
                <span className="AviationServicesMain__featureDot" />
                Airside Ramp & Baggage Handling
              </span>
              <span className="AviationServicesMain__featurePill">
                <span className="AviationServicesMain__featureDot" />
                Passenger & PRM Mobility Support
              </span>
              <span className="AviationServicesMain__featurePill">
                <span className="AviationServicesMain__featureDot" />
                Aviation Security & Profiling
              </span>
              <span className="AviationServicesMain__featurePill">
                <span className="AviationServicesMain__featureDot" />
                Aircraft Cabin Deep Grooming
              </span>
            </div>

            {/* Action Row */}
            <div className="AviationServicesMain__actionRow">
              <button
                type="button"
                onClick={handleOpenModal}
                className="AviationServicesMain__btnPrimary"
              >
                <span>Request Ground Support</span>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <a href="#careers" className="AviationServicesMain__btnOutline">
                <span>Join Aviation Team</span>
              </a>
            </div>
          </div>

          {/* Large Background Watermark */}
          <span className="AviationServicesMain__watermark" aria-hidden="true">
            AVIATION
          </span>
        </div>

        {/* Red Accent Trim Strip */}
        <div className="AviationServicesMain__edgeStripe" aria-hidden="true" />
      </section>

      {/* ========================================================
          AVIATION GROUND SUPPORT POPUP MODAL
      ======================================================== */}
      {isModalOpen && (
        <div
          className="AviationServicesMain__modalOverlay"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="av-modal-title"
        >
          <div
            className="AviationServicesMain__modalCard"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="AviationServicesMain__modalClose"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close ground support popup"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>

            {/* Header */}
            <div className="AviationServicesMain__modalHeader">
              <div className="AviationServicesMain__modalEyebrow">
                <span className="AviationServicesMain__modalEyebrowDot" />
                <span>WE'RE HERE TO HELP</span>
              </div>
              <h2 id="av-modal-title" className="AviationServicesMain__modalTitle">
                Get in <span className="AviationServicesMain__modalTitleAccent">touch.</span>
              </h2>
              <p className="AviationServicesMain__modalSubtitle">
                Fill in your details below and share your enquiry with Prime Site. We usually
                reply within one working day.
              </p>
            </div>

            {isSubmitted ? (
              <div className="AviationServicesMain__modalSuccess">
                <div className="AviationServicesMain__modalSuccessIcon">✓</div>
                <h3>Ground Support Request Received</h3>
                <p>Thank you! Our aviation operations team will reach out within one working day.</p>
              </div>
            ) : (
              <form className="AviationServicesMain__modalForm" onSubmit={handleSubmit}>
                <div className="AviationServicesMain__modalGrid">
                  {/* Full Name */}
                  <div className="AviationServicesMain__field">
                    <label htmlFor="av-fullName">
                      Full name <span>*</span>
                    </label>
                    <input
                      id="av-fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email Address */}
                  <div className="AviationServicesMain__field">
                    <label htmlFor="av-email">
                      Email address <span>*</span>
                    </label>
                    <input
                      id="av-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="AviationServicesMain__field">
                    <label htmlFor="av-phone">Phone number</label>
                    <input
                      id="av-phone"
                      name="phone"
                      type="tel"
                      placeholder="+971 00 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Company / Airline Name */}
                  <div className="AviationServicesMain__field">
                    <label htmlFor="av-company">Airline / Company name</label>
                    <input
                      id="av-company"
                      name="company"
                      type="text"
                      placeholder="Your airline or organization"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Service of Interest */}
                  <div className="AviationServicesMain__field">
                    <label htmlFor="av-service">Service of interest</label>
                    <div className="AviationServicesMain__selectWrap">
                      <select
                        id="av-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="Airside Ramp & Baggage Handling">
                          Airside Ramp & Baggage Handling
                        </option>
                        <option value="Passenger & PRM Mobility Support">
                          Passenger & PRM Mobility Support
                        </option>
                        <option value="Aviation Security & Profiling">
                          Aviation Security & Profiling
                        </option>
                        <option value="Aircraft Cabin Deep Grooming">
                          Aircraft Cabin Deep Grooming
                        </option>
                        <option value="Cargo & Terminal Logistics">
                          Cargo & Terminal Logistics
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Enquiry Type */}
                  <div className="AviationServicesMain__field">
                    <label htmlFor="av-enquiryType">Enquiry type</label>
                    <div className="AviationServicesMain__selectWrap">
                      <select
                        id="av-enquiryType"
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                      >
                        <option value="Ground Support Request">Request Ground Support</option>
                        <option value="Airline Handling Contract">Airline Handling Contract</option>
                        <option value="Terminal Manpower Supply">Terminal Manpower Supply</option>
                        <option value="General Aviation Consultation">
                          General Aviation Consultation
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="AviationServicesMain__field AviationServicesMain__field--full">
                  <label htmlFor="av-message">
                    Your message <span>*</span>
                  </label>
                  <textarea
                    id="av-message"
                    name="message"
                    rows="2"
                    required
                    placeholder="Tell us about your airport hub, flight schedule, or ground support needs..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Footer Row */}
                <div className="AviationServicesMain__modalFooter">
                  <span className="AviationServicesMain__requiredNote">
                    <span>*</span> Required fields
                  </span>

                  <button type="submit" className="AviationServicesMain__submitBtn">
                    <span className="AviationServicesMain__submitText">Send Enquiry</span>
                    <span className="AviationServicesMain__submitIconBox">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path
                          d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AviationServicesMain;