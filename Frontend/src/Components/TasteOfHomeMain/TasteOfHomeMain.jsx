import React, { useState, useEffect } from "react";
import "./TasteOfHomeMain.css";

const TasteOfHomeMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "High-Volume Bulk Catering",
    enquiryType: "Catering Proposal Request",
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
        service: "High-Volume Bulk Catering",
        enquiryType: "Catering Proposal Request",
        message: "",
      });
    }, 1800);
  };

  return (
    <>
      <section
        className={`TasteOfHome ${isLoaded ? "TasteOfHome--loaded" : ""}`}
        aria-label="Prime Site Taste of Home Industrial Catering and Dining Overview"
      >
        {/* 45% Visual Right Media (Catering & Culinary Background) */}
        <div className="TasteOfHome__mediaWrap">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2400&q=90"
            alt="Prime Site Taste of Home industrial culinary kitchen and dining hospitality"
            className="TasteOfHome__mediaImage"
          />
          <div className="TasteOfHome__mediaShade" />

          {/* Floating Sector Badge */}
          <div className="TasteOfHome__heroTag">
            <span className="TasteOfHome__heroTagDot" />
            <span className="TasteOfHome__heroTagTitle">CULINARY EXCELLENCE</span>
            <span className="TasteOfHome__heroTagDivider" />
            <span className="TasteOfHome__heroTagSubtitle">LARGE-SCALE CATERING</span>
          </div>
        </div>

        {/* 55% Angled Executive Content Panel */}
        <div className="TasteOfHome__leftPanel">
          <div className="TasteOfHome__panelTexture" />

          <div className="TasteOfHome__content">
            <div className="TasteOfHome__eyebrowWrap">
              <span className="TasteOfHome__eyebrowLine" />
              <span className="TasteOfHome__eyebrow">FOOD & DINING SERVICES</span>
            </div>

            <h1 className="TasteOfHome__title">
              PRIME SITE <span className="TasteOfHome__titleAccent">Taste of Home</span>
            </h1>

            <p className="TasteOfHome__lead">
              Prime Site’s dedicated culinary division, Taste of Home, provides nutritious,
              authentic, and large-scale dining solutions tailored for multinational workforces,
              corporate headquarters, educational campuses, and healthcare institutions across the UAE.
            </p>

            <p className="TasteOfHome__description">
              Operating HACCP-certified commercial kitchens that prepare tens of thousands of wholesome
              meals daily, our expert chefs recreate multi-ethnic culinary traditions with rigorous food
              safety, balanced nutritional science, and sustainably sourced ingredients.
            </p>

            {/* Service Feature Highlights */}
            <div className="TasteOfHome__features">
              <span className="TasteOfHome__featurePill">
                <span className="TasteOfHome__featureDot" />
                High-Volume Bulk Catering
              </span>
              <span className="TasteOfHome__featurePill">
                <span className="TasteOfHome__featureDot" />
                Multi-Cuisine Menus
              </span>
              <span className="TasteOfHome__featurePill">
                <span className="TasteOfHome__featureDot" />
                HACCP & ISO 22000 Certified
              </span>
              <span className="TasteOfHome__featurePill">
                <span className="TasteOfHome__featureDot" />
                Corporate Cafeteria Operations
              </span>
              <span className="TasteOfHome__featurePill">
                <span className="TasteOfHome__featureDot" />
                Dietitian-Approved Menus
              </span>
            </div>

            {/* Action Row */}
            <div className="TasteOfHome__actionRow">
              <button
                type="button"
                onClick={handleOpenModal}
                className="TasteOfHome__btnPrimary"
              >
                <span>Request Catering Proposal</span>
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            
            </div>
          </div>

          {/* Large Background Watermark */}
          <span className="TasteOfHome__watermark" aria-hidden="true">
            DINING
          </span>
        </div>

        {/* Red Accent Trim Strip */}
        <div className="TasteOfHome__edgeStripe" aria-hidden="true" />
      </section>

      {/* ========================================================
          CATERING PROPOSAL POPUP MODAL
      ======================================================== */}
      {isModalOpen && (
        <div
          className="TasteOfHome__modalOverlay"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="toh-modal-title"
        >
          <div
            className="TasteOfHome__modalCard"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="TasteOfHome__modalClose"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close catering proposal popup"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>

            {/* Header */}
            <div className="TasteOfHome__modalHeader">
              <div className="TasteOfHome__modalEyebrow">
                <span className="TasteOfHome__modalEyebrowDot" />
                <span>WE'RE HERE TO HELP</span>
              </div>
              <h2 id="toh-modal-title" className="TasteOfHome__modalTitle">
                Get in <span className="TasteOfHome__modalTitleAccent">touch.</span>
              </h2>
              <p className="TasteOfHome__modalSubtitle">
                Fill in your details below and share your enquiry with Prime Site. We usually
                reply within one working day.
              </p>
            </div>

            {isSubmitted ? (
              <div className="TasteOfHome__modalSuccess">
                <div className="TasteOfHome__modalSuccessIcon">✓</div>
                <h3>Catering Proposal Request Received</h3>
                <p>Thank you! Our culinary hospitality team will reach out within one working day.</p>
              </div>
            ) : (
              <form className="TasteOfHome__modalForm" onSubmit={handleSubmit}>
                <div className="TasteOfHome__modalGrid">
                  {/* Full Name */}
                  <div className="TasteOfHome__field">
                    <label htmlFor="toh-fullName">
                      Full name <span>*</span>
                    </label>
                    <input
                      id="toh-fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email Address */}
                  <div className="TasteOfHome__field">
                    <label htmlFor="toh-email">
                      Email address <span>*</span>
                    </label>
                    <input
                      id="toh-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="TasteOfHome__field">
                    <label htmlFor="toh-phone">Phone number</label>
                    <input
                      id="toh-phone"
                      name="phone"
                      type="tel"
                      placeholder="+971 00 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Company / Organization Name */}
                  <div className="TasteOfHome__field">
                    <label htmlFor="toh-company">Company / Institution name</label>
                    <input
                      id="toh-company"
                      name="company"
                      type="text"
                      placeholder="Your company or campus"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Service of Interest */}
                  <div className="TasteOfHome__field">
                    <label htmlFor="toh-service">Service of interest</label>
                    <div className="TasteOfHome__selectWrap">
                      <select
                        id="toh-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <option value="High-Volume Bulk Catering">
                          High-Volume Bulk Catering
                        </option>
                        <option value="Corporate Cafeteria Operations">
                          Corporate Cafeteria Operations
                        </option>
                        <option value="Multi-Cuisine Workforce Dining">
                          Multi-Cuisine Workforce Dining
                        </option>
                        <option value="Healthcare & Campus Nutrition">
                          Healthcare & Campus Nutrition
                        </option>
                        <option value="VIP & Executive Hospitality">
                          VIP & Executive Hospitality
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Enquiry Type */}
                  <div className="TasteOfHome__field">
                    <label htmlFor="toh-enquiryType">Enquiry type</label>
                    <div className="TasteOfHome__selectWrap">
                      <select
                        id="toh-enquiryType"
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                      >
                        <option value="Catering Proposal Request">
                          Request Catering Proposal
                        </option>
                        <option value="Daily Meal Plan Quote">Daily Meal Plan Quote</option>
                        <option value="On-Site Kitchen Setup">On-Site Kitchen Setup</option>
                        <option value="Menu Tasting & Consultation">
                          Menu Tasting & Consultation
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="TasteOfHome__field TasteOfHome__field--full">
                  <label htmlFor="toh-message">
                    Your message <span>*</span>
                  </label>
                  <textarea
                    id="toh-message"
                    name="message"
                    rows="2"
                    required
                    placeholder="Tell us about your daily headcount, cuisine preferences, or location..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Footer Row */}
                <div className="TasteOfHome__modalFooter">
                  <span className="TasteOfHome__requiredNote">
                    <span>*</span> Required fields
                  </span>

                  <button type="submit" className="TasteOfHome__submitBtn">
                    <span className="TasteOfHome__submitText">Send Enquiry</span>
                    <span className="TasteOfHome__submitIconBox">
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

export default TasteOfHomeMain;