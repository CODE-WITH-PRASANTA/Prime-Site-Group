import React, { useState, useEffect, useCallback } from "react";
import "./WorkforceSoluationTwo.css";

const SLIDE_DURATION = 2000;

const workforceServices = [
  {
    id: 1,
    tag: "WORKFORCE SOLUTIONS",
    titlePrimary: "Skilled Technical",
    titleAccent: "& Labour Supply",
    description:
      "Delivering certified technicians, skilled tradesmen, and dependable workforce solutions for large-scale construction, MEP, facilities management, and industrial projects across the UAE.",
    badgeTitle: "VERIFIED WORKFORCE",
    badgeSub: "24/7 Deployment Readiness",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb18f170f?auto=format&fit=crop&w=1600&q=85",
    alt: "Construction professionals working at an industrial site",
  },
  {
    id: 2,
    tag: "CORPORATE STAFFING",
    titlePrimary: "Executive Staffing",
    titleAccent: "& Corporate Talent",
    description:
      "Providing professional personnel, administrative experts, and corporate talent acquisition solutions to match dynamic organizational demands with exceptional accuracy.",
    badgeTitle: "ELITE PLACEMENT",
    badgeSub: "Professional Corporate Talent",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=85",
    alt: "Corporate professionals collaborating in an office",
  },
  {
    id: 3,
    tag: "HOSPITALITY SOLUTIONS",
    titlePrimary: "Hospitality &",
    titleAccent: "Facility Support",
    description:
      "Equipping hotels, resorts, and commercial properties with experienced hospitality personnel, housekeeping teams, and dedicated operational support staff.",
    badgeTitle: "HOSPITALITY EXPERTS",
    badgeSub: "Premium Guest Services",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
    alt: "Premium hotel interior representing hospitality services",
  },
  {
    id: 4,
    tag: "LOGISTICS WORKFORCE",
    titlePrimary: "Logistics &",
    titleAccent: "Warehouse Crew",
    description:
      "Supplying efficient logistics operatives, forklift operators, warehouse coordinators, and supply chain personnel to optimize fast-paced distribution operations.",
    badgeTitle: "LOGISTICS CREW",
    badgeSub: "Supply Chain & Warehousing",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85",
    alt: "Warehouse storage and logistics operations",
  },
];

const WorkforceSoluationTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = workforceServices.length;
  const currentSlide = workforceServices[activeSlide];

  const handleNext = useCallback(() => {
    setActiveSlide((previous) => (previous + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveSlide((previous) => (previous - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = window.setInterval(handleNext, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [isPaused, handleNext]);

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false);
    }
  };

  return (
    <section
      className="WorkforceSoluationTwo"
      aria-label="Workforce solutions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleBlur}
    >
      <div className="WorkforceSoluationTwo__container">
        {/* Left: Image slider */}
        <div className="WorkforceSoluationTwo__media">
          <div className="WorkforceSoluationTwo__imageClip">
            {workforceServices.map((service, index) => (
              <img
                key={service.id}
                src={service.image}
                alt={service.alt}
                className={`WorkforceSoluationTwo__image ${
                  index === activeSlide
                    ? "WorkforceSoluationTwo__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
                draggable="false"
              />
            ))}

            <div className="WorkforceSoluationTwo__imageShade" />
          </div>

          {/* Floating badge */}
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

          {/* Image navigation */}
          <div className="WorkforceSoluationTwo__nav">
            <button
              type="button"
              className="WorkforceSoluationTwo__navBtn"
              onClick={handlePrev}
              aria-label="Previous workforce service"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M19 12H5m7 7-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              className="WorkforceSoluationTwo__navBtn"
              onClick={handleNext}
              aria-label="Next workforce service"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14m-7-7 7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Slide counter */}
          <div className="WorkforceSoluationTwo__counter">
            <span>{String(activeSlide + 1).padStart(2, "0")}</span>
            <span className="WorkforceSoluationTwo__counterDivider">/</span>
            <span>{String(totalSlides).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Right: Animated service content */}
        <div
          key={`content-${activeSlide}`}
          className="WorkforceSoluationTwo__content"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="WorkforceSoluationTwo__eyebrowWrap">
            <span className="WorkforceSoluationTwo__eyebrowLine" />
            <span className="WorkforceSoluationTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="WorkforceSoluationTwo__title">
            <span className="WorkforceSoluationTwo__titlePrimary">
              {currentSlide.titlePrimary}
            </span>

            <span className="WorkforceSoluationTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="WorkforceSoluationTwo__description">
            {currentSlide.description}
          </p>

          {/* Service features */}
          <div className="WorkforceSoluationTwo__features">
            <div className="WorkforceSoluationTwo__featureItem">
              <span className="WorkforceSoluationTwo__featureDot" />
              <span>Fully Compliant & Verified Workforce Standards</span>
            </div>

            <div className="WorkforceSoluationTwo__featureItem">
              <span className="WorkforceSoluationTwo__featureDot" />
              <span>Rapid Deployment & Flexible Contract Terms</span>
            </div>

            <div className="WorkforceSoluationTwo__featureItem">
              <span className="WorkforceSoluationTwo__featureDot" />
              <span>Dedicated Account & Project Supervision</span>
            </div>
          </div>

          {/* Call to action and progress bar */}
          <div className="WorkforceSoluationTwo__actionRow">
            <a
              href="#service-enquiry"
              className="WorkforceSoluationTwo__btnPrimary"
            >
              <span>Request Consultation</span>

              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <div
              className="WorkforceSoluationTwo__progressTrack"
              role="progressbar"
              aria-label="Time until next slide"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={isPaused ? 0 : undefined}
            >
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`WorkforceSoluationTwo__progressBar ${
                  isPaused ? "is-paused" : ""
                }`}
                style={{ animationDuration: `${SLIDE_DURATION}ms` }}
              />
            </div>
          </div>

          {/* Slide indicators */}
          <div className="WorkforceSoluationTwo__indicators">
            {workforceServices.map((service, index) => (
              <button
                key={service.id}
                type="button"
                className={`WorkforceSoluationTwo__indicator ${
                  index === activeSlide
                    ? "WorkforceSoluationTwo__indicator--active"
                    : ""
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}: ${service.titlePrimary} ${service.titleAccent}`}
                aria-current={index === activeSlide ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkforceSoluationTwo;