import React, { useState, useEffect, useCallback } from "react";
import "./WorkforceSoluationTwo.css";

const SLIDE_DURATION = 2000; // 2-second synchronized rotation

const workforceSolutionsData = [
  {
    id: 1,
    tag: "WORKFORCE SOLUTIONS",
    titlePrimary: "Skilled Technical",
    titleAccent: "& Engineering Talent",
    description:
      "Providing certified engineers, skilled technicians, and site specialists on demand, tailored for large-scale industrial infrastructure, construction developments, and facility systems.",
    badgeTitle: "CERTIFIED TALENT",
    badgeSub: "Ready-to-Deploy Technical Crews",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Rigorous Vetting & Skill Assessments",
      "Fast-Track Mobilization & Site Deployment",
      "Full Compliance with UAE Labor Regulations",
    ],
  },
  {
    id: 2,
    tag: "WORKFORCE SOLUTIONS",
    titlePrimary: "Blue-Collar",
    titleAccent: "& Industrial Staffing",
    description:
      "Delivering high-volume, reliable labor forces across construction, MEP, fabrication, and manufacturing facilities with comprehensive logistics, safety training, and welfare management.",
    badgeTitle: "MASS STAFFING",
    badgeSub: "Reliable Industrial Manpower",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2200&q=85",
    features: [
      "End-to-End Visa & Payroll Administration",
      "On-Site Safety (HSE) Certified Teams",
      "Scalable Surge Capacity for Tight Deadlines",
    ],
  },
  {
    id: 3,
    tag: "WORKFORCE SOLUTIONS",
    titlePrimary: "Logistics, Supply Chain",
    titleAccent: "& Warehouse Teams",
    description:
      "Staffing distribution hubs, fulfillment warehouses, and 3PL networks with licensed equipment operators, inventory specialists, and material handling crews.",
    badgeTitle: "SUPPLY CHAIN",
    badgeSub: "Material & Fleet Handling Experts",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Certified Forklift & Heavy Equipment Operators",
      "WMS & Inventory Processing Personnel",
      "Flexible Shift & Seasonal Peak Management",
    ],
  },
  {
    id: 4,
    tag: "WORKFORCE SOLUTIONS",
    titlePrimary: "Executive & Specialist",
    titleAccent: "Contract Placements",
    description:
      "Placing project directors, project managers, and specialized consultants on flexible interim or permanent contracts to steer complex enterprise transformations to completion.",
    badgeTitle: "EXECUTIVE SEARCH",
    badgeSub: "Leadership & Specialized PMs",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Dedicated Industry-Specific Headhunters",
      "Targeted Senior Leadership Acquisition",
      "Comprehensive Retention & SLA Oversight",
    ],
  },
];

const WorkforceSoluationTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = workforceSolutionsData.length;
  const currentSlide = workforceSolutionsData[activeSlide];

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
      className="WorkforceSoluationTwo"
      aria-label="Workforce Solutions Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="WorkforceSoluationTwo__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="WorkforceSoluationTwo__media">
          <div className="WorkforceSoluationTwo__imageClip">
            {workforceSolutionsData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`WorkforceSoluationTwo__image ${
                  index === activeSlide
                    ? "WorkforceSoluationTwo__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="WorkforceSoluationTwo__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="WorkforceSoluationTwo__badge"
          >
            <span className="WorkforceSoluationTwo__badgeDot" />
            <div className="WorkforceSoluationTwo__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Navigation Buttons */}
          <div className="WorkforceSoluationTwo__nav">
            <button
              type="button"
              className="WorkforceSoluationTwo__navBtn WorkforceSoluationTwo__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous workforce solution"
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
              className="WorkforceSoluationTwo__navBtn WorkforceSoluationTwo__navBtn--next"
              onClick={handleNext}
              aria-label="Next workforce solution"
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
          className="WorkforceSoluationTwo__content"
        >
          <div className="WorkforceSoluationTwo__eyebrowWrap">
            <span className="WorkforceSoluationTwo__eyebrowLine" />
            <span className="WorkforceSoluationTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="WorkforceSoluationTwo__title">
            <span className="WorkforceSoluationTwo__titlePrimary">
              {currentSlide.titlePrimary}{" "}
            </span>
            <span className="WorkforceSoluationTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="WorkforceSoluationTwo__description">
            {currentSlide.description}
          </p>

          {/* Dynamic Feature Highlights */}
          <div className="WorkforceSoluationTwo__features">
            {currentSlide.features.map((feature, idx) => (
              <div key={idx} className="WorkforceSoluationTwo__featureItem">
                <span className="WorkforceSoluationTwo__featureDot" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA & Synchronized Progress Bar */}
          <div className="WorkforceSoluationTwo__actionRow">
            <a
              href="#workforce-enquiry"
              className="WorkforceSoluationTwo__btnPrimary"
            >
              <span>Request Workforce Consultation</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <div className="WorkforceSoluationTwo__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`WorkforceSoluationTwo__progressBar ${
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

export default WorkforceSoluationTwo;