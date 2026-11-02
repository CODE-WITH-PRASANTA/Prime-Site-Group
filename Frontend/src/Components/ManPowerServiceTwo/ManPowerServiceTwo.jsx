import React, { useState, useEffect, useCallback } from "react";
import "./ManPowerServiceTwo.css";

const SLIDE_DURATION = 2000; // 2-second synchronized rotation

const manPowerServicesData = [
  {
    id: 1,
    tag: "MANPOWER SERVICES",
    titlePrimary: "Skilled Technical",
    titleAccent: "& Labour Supply",
    description:
      "Delivering certified technicians, skilled tradesmen, and dependable workforce solutions for large-scale construction, MEP, facilities management, and industrial projects across the UAE.",
    badgeTitle: "VERIFIED WORKFORCE",
    badgeSub: "24/7 Deployment Readiness",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb18f170f?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 2,
    tag: "MANPOWER SERVICES",
    titlePrimary: "Executive Staffing",
    titleAccent: "& Corporate Talent",
    description:
      "Providing top-tier professional personnel, administrative experts, and corporate talent acquisition solutions to match dynamic organizational demands with exceptional accuracy.",
    badgeTitle: "ELITE PLACEMENT",
    badgeSub: "Professional Corporate Talent",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 3,
    tag: "MANPOWER SERVICES",
    titlePrimary: "Hospitality &",
    titleAccent: "Facility Support",
    description:
      "Equipping hotels, resorts, and commercial properties with experienced front-of-house hospitality personnel, housekeeping teams, and dedicated operational support staff.",
    badgeTitle: "HOSPITALITY EXPERTS",
    badgeSub: "Premium Guest Services",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 4,
    tag: "MANPOWER SERVICES",
    titlePrimary: "Logistics &",
    titleAccent: "Warehouse Crew",
    description:
      "Supplying efficient logistics operatives, fork-lift operators, warehouse coordinators, and supply chain personnel to optimize fast-paced distribution operations.",
    badgeTitle: "LOGISTICS CREW",
    badgeSub: "Supply Chain & Warehousing",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85",
  },
];

const ManPowerServiceTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = manPowerServicesData.length;
  const currentSlide = manPowerServicesData[activeSlide];

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay every 2 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <section
      className="ManPowerServiceTwo"
      aria-label="Manpower Services Presentation"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="ManPowerServiceTwo__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="ManPowerServiceTwo__media">
          <div className="ManPowerServiceTwo__imageClip">
            {manPowerServicesData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`ManPowerServiceTwo__image ${
                  index === activeSlide
                    ? "ManPowerServiceTwo__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="ManPowerServiceTwo__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="ManPowerServiceTwo__badge"
          >
            <span className="ManPowerServiceTwo__badgeDot" />
            <div className="ManPowerServiceTwo__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Square Navigation Buttons */}
          <div className="ManPowerServiceTwo__nav">
            <button
              type="button"
              className="ManPowerServiceTwo__navBtn ManPowerServiceTwo__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous manpower service"
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
              className="ManPowerServiceTwo__navBtn ManPowerServiceTwo__navBtn--next"
              onClick={handleNext}
              aria-label="Next manpower service"
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

        {/* Right Side: Animated Staggered Content */}
        <div
          key={`content-${activeSlide}`}
          className="ManPowerServiceTwo__content"
        >
          <div className="ManPowerServiceTwo__eyebrowWrap">
            <span className="ManPowerServiceTwo__eyebrowLine" />
            <span className="ManPowerServiceTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="ManPowerServiceTwo__title">
            <span className="ManPowerServiceTwo__titlePrimary">
              {currentSlide.titlePrimary}{" "}
            </span>
            <span className="ManPowerServiceTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="ManPowerServiceTwo__description">
            {currentSlide.description}
          </p>

          {/* Feature Highlights */}
          <div className="ManPowerServiceTwo__features">
            <div className="ManPowerServiceTwo__featureItem">
              <span className="ManPowerServiceTwo__featureDot" />
              <span>Fully Compliant & Verified Workforce Standards</span>
            </div>
            <div className="ManPowerServiceTwo__featureItem">
              <span className="ManPowerServiceTwo__featureDot" />
              <span>Rapid Deployment & Flexible Contract Terms</span>
            </div>
            <div className="ManPowerServiceTwo__featureItem">
              <span className="ManPowerServiceTwo__featureDot" />
              <span>Dedicated Account & Project Supervision</span>
            </div>
          </div>

          {/* Premium Action Row */}
          <div className="ManPowerServiceTwo__actionRow">
            <a
              href="#service-enquiry"
              className="ManPowerServiceTwo__btnPrimary"
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

            {/* 2-Second Synchronized Progress Line */}
            <div className="ManPowerServiceTwo__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`ManPowerServiceTwo__progressBar ${
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

export default ManPowerServiceTwo;