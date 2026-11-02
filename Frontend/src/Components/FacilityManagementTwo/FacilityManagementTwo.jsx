import React, { useState, useEffect, useCallback } from "react";
import "./FacilityManagementTwo.css";

const facilitySlides = [
  {
    id: 1,
    category: "FACILITY MANAGEMENT",
    title: "Complete Facility Management Solutions",
    description:
      "We deliver dependable facility management services that help businesses maintain clean, safe, organized, and efficient working environments. Our trained teams support the smooth operation of your facilities.",
    features: [
      "Professional Facility Support Teams",
      "Clean, Safe, and Organized Spaces",
      "Reliable Day-to-Day Operations",
    ],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    badgeNumber: "01",
    badgeText: "Facility Solutions",
  },
  {
    id: 2,
    category: "HOUSEKEEPING SERVICES",
    title: "Professional Housekeeping and Maintenance",
    description:
      "Maintain a welcoming and hygienic environment with professional housekeeping and maintenance support. Our workforce helps offices, commercial buildings, and business facilities operate smoothly.",
    features: [
      "Office and Commercial Cleaning",
      "Routine Maintenance Support",
      "Hygiene and Workplace Care",
    ],
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
    badgeNumber: "02",
    badgeText: "Housekeeping",
  },
  {
    id: 3,
    category: "WORKPLACE OPERATIONS",
    title: "Smarter Support for Modern Workplaces",
    description:
      "From workplace coordination to essential facility support, we help organizations create comfortable, functional, and well-maintained spaces for employees, customers, and visitors.",
    features: [
      "Workplace Support Personnel",
      "Efficient Facility Coordination",
      "Flexible Staffing Solutions",
    ],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    badgeNumber: "03",
    badgeText: "Workplace Support",
  },
];

const FacilityManagementTwo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = facilitySlides[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % facilitySlides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex(
      (current) =>
        (current - 1 + facilitySlides.length) % facilitySlides.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="facility-management-two"
      aria-label="Facility management services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="facility-management-two__container">
        {/* LEFT IMAGE SECTION */}
        <div className="facility-management-two__visual">
          <div className="facility-management-two__image-frame">
            {facilitySlides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.badgeText}
                className={`facility-management-two__image ${
                  index === activeIndex
                    ? "facility-management-two__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
                aria-hidden={index !== activeIndex}
              />
            ))}

            <div className="facility-management-two__image-overlay" />

            <div className="facility-management-two__image-label">
              <span className="facility-management-two__label-dot" />
              Professional Facility Services
            </div>
          </div>

          <div className="facility-management-two__image-decoration" />

          <div
            className="facility-management-two__image-badge"
            key={activeSlide.id}
          >
            <span className="facility-management-two__badge-number">
              {activeSlide.badgeNumber}
            </span>

            <div className="facility-management-two__badge-divider" />

            <div className="facility-management-two__badge-content">
              <strong>{activeSlide.badgeText}</strong>
              <span>Professional. Reliable. Efficient.</span>
            </div>
          </div>

          {/* IMAGE CONTROLS */}
          <div className="facility-management-two__image-controls">
            <button
              type="button"
              className="facility-management-two__arrow"
              onClick={previousSlide}
              aria-label="Previous facility management service"
            >
              &#8592;
            </button>

            <span className="facility-management-two__slide-count">
              <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
              <span>/</span>
              {String(facilitySlides.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              className="facility-management-two__arrow"
              onClick={nextSlide}
              aria-label="Next facility management service"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div
          className="facility-management-two__content"
          key={activeSlide.id}
        >
          <div className="facility-management-two__eyebrow">
            <span className="facility-management-two__eyebrow-line" />
            {activeSlide.category}
          </div>

          <h2 className="facility-management-two__title">
            {activeSlide.title}
          </h2>

          <p className="facility-management-two__description">
            {activeSlide.description}
          </p>

          {/* FEATURES */}
          <div className="facility-management-two__features">
            {activeSlide.features.map((feature, index) => (
              <div
                className="facility-management-two__feature"
                key={feature}
                style={{ "--feature-index": index }}
              >
                <span className="facility-management-two__feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12.5L9.5 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* BUTTON AND PAGINATION */}
          <div className="facility-management-two__footer">
            <a
              href="#contact"
              className="facility-management-two__cta"
            >
              <span>Explore Our Services</span>

              <span className="facility-management-two__cta-icon">
                &#8599;
              </span>
            </a>

            <div className="facility-management-two__pagination">
              {facilitySlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`facility-management-two__pagination-item ${
                    index === activeIndex
                      ? "facility-management-two__pagination-item--active"
                      : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show facility service ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>

          {/* AUTO-SLIDE PROGRESS BAR */}
          <div className="facility-management-two__progress-track">
            <div
              key={activeIndex}
              className="facility-management-two__progress-bar"
              style={{
                animationPlayState: isPaused ? "paused" : "running",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityManagementTwo;