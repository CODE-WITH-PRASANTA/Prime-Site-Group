import React, { useState, useEffect, useCallback } from "react";
import "./AviationServicesTwo.css";

const aviationSlides = [
  {
    id: 1,
    category: "AVIATION WORKFORCE",
    title: "Specialized Aviation Staffing Solutions",
    description:
      "We provide skilled aviation professionals to support airport operations, ground handling, passenger services, and other essential aviation activities.",
    features: [
      "Qualified Aviation Professionals",
      "Flexible Workforce Deployment",
      "Reliable Operational Support",
    ],
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",
    badgeNumber: "01",
    badgeText: "Aviation Staffing",
  },
  {
    id: 2,
    category: "AIRPORT OPERATIONS",
    title: "Reliable Airport Ground Handling",
    description:
      "Our workforce solutions help airports maintain smooth ground operations through dependable personnel, efficient coordination, and professional service.",
    features: [
      "Ground Handling Personnel",
      "Passenger Assistance Teams",
      "Operational Workforce Support",
    ],
    image:
      "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1200&q=85",
    badgeNumber: "02",
    badgeText: "Ground Operations",
  },
  {
    id: 3,
    category: "AVIATION PERSONNEL",
    title: "Professional Teams for Every Flight",
    description:
      "From passenger-facing roles to essential airport support functions, we help businesses build dependable teams that keep aviation services running smoothly.",
    features: [
      "Experienced Support Staff",
      "Scalable Staffing Solutions",
      "Service-Focused Professionals",
    ],
    image:
      "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=85",
    badgeNumber: "03",
    badgeText: "Professional Teams",
  },
];

const AviationServicesTwo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = aviationSlides[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % aviationSlides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex(
      (current) =>
        (current - 1 + aviationSlides.length) % aviationSlides.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide, activeIndex]);

  return (
    <section
      className="aviation-services-two"
      aria-label="Aviation workforce services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="aviation-services-two__container">
        {/* LEFT IMAGE AREA */}
        <div className="aviation-services-two__visual">
          <div className="aviation-services-two__image-frame">
            {aviationSlides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.badgeText}
                className={`aviation-services-two__image ${
                  index === activeIndex
                    ? "aviation-services-two__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
                aria-hidden={index !== activeIndex}
              />
            ))}

            <div className="aviation-services-two__image-overlay" />

            <div className="aviation-services-two__image-label">
              <span className="aviation-services-two__label-dot" />
              Aviation Workforce Solutions
            </div>
          </div>

          <div className="aviation-services-two__image-decoration" />

          <div className="aviation-services-two__image-badge">
            <span className="aviation-services-two__badge-number">
              {activeSlide.badgeNumber}
            </span>

            <div className="aviation-services-two__badge-divider" />

            <div className="aviation-services-two__badge-content">
              <strong>{activeSlide.badgeText}</strong>
              <span>Professional. Reliable. Efficient.</span>
            </div>
          </div>

          <div className="aviation-services-two__image-controls">
            <button
              type="button"
              className="aviation-services-two__arrow"
              onClick={previousSlide}
              aria-label="Previous aviation service"
            >
              &#8592;
            </button>

            <span className="aviation-services-two__slide-count">
              <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
              <span>/</span>
              {String(aviationSlides.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              className="aviation-services-two__arrow"
              onClick={nextSlide}
              aria-label="Next aviation service"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="aviation-services-two__content" key={activeSlide.id}>
          <div className="aviation-services-two__eyebrow">
            <span className="aviation-services-two__eyebrow-line" />
            {activeSlide.category}
          </div>

          <h2 className="aviation-services-two__title">
            {activeSlide.title}
          </h2>

          <p className="aviation-services-two__description">
            {activeSlide.description}
          </p>

          <div className="aviation-services-two__features">
            {activeSlide.features.map((feature, index) => (
              <div
                className="aviation-services-two__feature"
                key={feature}
                style={{ "--feature-index": index }}
              >
                <span className="aviation-services-two__feature-icon">
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

          <div className="aviation-services-two__footer">
            <a
              href="#contact"
              className="aviation-services-two__cta"
            >
              <span>Explore Our Services</span>
              <span className="aviation-services-two__cta-icon">
                &#8599;
              </span>
            </a>

            <div className="aviation-services-two__pagination">
              {aviationSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`aviation-services-two__pagination-item ${
                    index === activeIndex
                      ? "aviation-services-two__pagination-item--active"
                      : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>

          <div className="aviation-services-two__progress-track">
            <div
              className="aviation-services-two__progress-bar"
              key={`${activeIndex}-${isPaused}`}
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

export default AviationServicesTwo;