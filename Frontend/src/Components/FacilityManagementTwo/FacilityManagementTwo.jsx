import React, { useState, useEffect, useCallback } from "react";
import "./FacilityManagementTwo.css";

const SLIDE_DURATION = 2000; // 2-second synchronized rotation

const facilityManagementData = [
  {
    id: 1,
    tag: "FACILITY MANAGEMENT",
    titlePrimary: "Integrated Hard & Soft",
    titleAccent: "FM Solutions",
    description:
      "Delivering turnkey facilities lifecycle management combining proactive MEP maintenance, HVAC infrastructure optimization, and premium housekeeping for high-density commercial towers and mixed-use portfolios.",
    badgeTitle: "INTEGRATED FM",
    badgeSub: "24/7 Asset & Operations Care",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Preventive & Predictive MEP Maintenance",
      "CAFM & IoT-Driven Infrastructure Monitoring",
      "Strict Energy Efficiency & Sustainability Standards",
    ],
  },
  {
    id: 2,
    tag: "FACILITY MANAGEMENT",
    titlePrimary: "Commercial Cleaning &",
    titleAccent: "Hygiene Services",
    description:
      "Deploying BICSc-certified sanitization teams and high-level industrial cleaning crews equipped with hospital-grade disinfection technologies for corporate headquarters, malls, and healthcare spaces.",
    badgeTitle: "HYGIENE EXCELLENCE",
    badgeSub: "BICSc Certified Standards",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2200&q=85",
    features: [
      "High-Level External Facade & Rope Access",
      "Eco-Friendly Green Cleaning Formulations",
      "Tailored Daily & Deep Cleaning Regimes",
    ],
  },
  {
    id: 3,
    tag: "FACILITY MANAGEMENT",
    titlePrimary: "HVAC, Electrical &",
    titleAccent: "Plumbing (MEP)",
    description:
      "Ensuring peak operational continuity through specialized engineering diagnostics, chilled water network upkeep, power distribution checks, and compliance with statutory environmental codes.",
    badgeTitle: "ENGINEERING & MEP",
    badgeSub: "Continuous System Reliability",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Thermal Imaging & Vibration Analysis",
      "Rapid Response Breakdown Teams",
      "Comprehensive Asset Lifecycle Optimization",
    ],
  },
  {
    id: 4,
    tag: "FACILITY MANAGEMENT",
    titlePrimary: "Smart Building &",
    titleAccent: "Energy Management",
    description:
      "Empowering property owners with centralized BMS integration, real-time energy audits, and smart automation to lower carbon footprints and achieve tangible operational savings.",
    badgeTitle: "SMART BMS & ENERGY",
    badgeSub: "ESG & Carbon Reduction Focus",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Real-Time Chiller Plant Optimization",
      "Automated IAQ (Indoor Air Quality) Tracking",
      "Detailed ESG & Sustainability Reporting",
    ],
  },
];

const FacilityManagementTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = facilityManagementData.length;
  const currentSlide = facilityManagementData[activeSlide];

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay rotation
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <section
      className="FacilityManagementTwo"
      aria-label="Facility Management Solutions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="FacilityManagementTwo__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="FacilityManagementTwo__media">
          <div className="FacilityManagementTwo__imageClip">
            {facilityManagementData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`FacilityManagementTwo__image ${
                  index === activeSlide
                    ? "FacilityManagementTwo__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="FacilityManagementTwo__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="FacilityManagementTwo__badge"
          >
            <span className="FacilityManagementTwo__badgeDot" />
            <div className="FacilityManagementTwo__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Navigation Buttons */}
          <div className="FacilityManagementTwo__nav">
            <button
              type="button"
              className="FacilityManagementTwo__navBtn FacilityManagementTwo__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous facility management solution"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M19 12H5m7 7-7-7 7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="FacilityManagementTwo__navBtn FacilityManagementTwo__navBtn--next"
              onClick={handleNext}
              aria-label="Next facility management solution"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M5 12h14m-7-7 7 7-7 7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side: Staggered Content */}
        <div
          key={`content-${activeSlide}`}
          className="FacilityManagementTwo__content"
        >
          <div className="FacilityManagementTwo__eyebrowWrap">
            <span className="FacilityManagementTwo__eyebrowLine" />
            <span className="FacilityManagementTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="FacilityManagementTwo__title">
            <span className="FacilityManagementTwo__titlePrimary">
              {currentSlide.titlePrimary}{" "}
            </span>
            <span className="FacilityManagementTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="FacilityManagementTwo__description">
            {currentSlide.description}
          </p>

          {/* Dynamic Feature Highlights */}
          <div className="FacilityManagementTwo__features">
            {currentSlide.features.map((feature, idx) => (
              <div key={idx} className="FacilityManagementTwo__featureItem">
                <span className="FacilityManagementTwo__featureDot" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA & Synchronized Progress Bar */}
          <div className="FacilityManagementTwo__actionRow">
            <a
              href="#fm-enquiry"
              className="FacilityManagementTwo__btnPrimary"
            >
              <span>Request FM Proposal</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <div className="FacilityManagementTwo__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`FacilityManagementTwo__progressBar ${
                  isPaused ? "is-paused" : ""
                }`}
                style={{ animationDuration: `${SLIDE_DURATION}ms` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityManagementTwo;