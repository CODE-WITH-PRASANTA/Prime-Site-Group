import React, { useState, useEffect, useCallback } from "react";
import "./ManagedServicesTwo.css";

const managedSlides = [
  {
    id: 1,
    category: "MANAGED SERVICES",
    title: "Reliable Managed Services for Your Business",
    description:
      "We provide comprehensive managed services that help businesses improve operational efficiency, streamline daily activities, and focus on their core objectives. Our professional teams deliver dependable support tailored to your business needs.",
    features: [
      "Professional Operational Support",
      "Efficient Service Coordination",
      "Flexible Business Solutions",
    ],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    badgeNumber: "01",
    badgeText: "Managed Solutions",
  },
  {
    id: 2,
    category: "BUSINESS OPERATIONS",
    title: "Streamline Operations with Expert Support",
    description:
      "Simplify business operations with dependable workforce coordination and professional operational assistance. We help organizations improve productivity, maintain service standards, and manage everyday responsibilities efficiently.",
    features: [
      "Streamlined Business Processes",
      "Dedicated Operational Teams",
      "Consistent Service Delivery",
    ],
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    badgeNumber: "02",
    badgeText: "Operations Support",
  },
  {
    id: 3,
    category: "WORKFORCE SOLUTIONS",
    title: "Build Stronger Teams for Better Results",
    description:
      "Support your business goals with adaptable workforce and managed service solutions. From daily operational assistance to coordinated service delivery, we help businesses create productive and well-organized working environments.",
    features: [
      "Scalable Workforce Solutions",
      "Skilled Professional Personnel",
      "Business-Focused Service Delivery",
    ],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    badgeNumber: "03",
    badgeText: "Workforce Support",
  },
];

const ManagedServicesTwo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = managedSlides[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % managedSlides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex(
      (current) =>
        (current - 1 + managedSlides.length) % managedSlides.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="managed-services-two"
      aria-label="Managed services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="managed-services-two__container">
        {/* LEFT IMAGE SECTION */}
        <div className="managed-services-two__visual">
          <div className="managed-services-two__image-frame">
            {managedSlides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.badgeText}
                className={`managed-services-two__image ${
                  index === activeIndex
                    ? "managed-services-two__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
                aria-hidden={index !== activeIndex}
              />
            ))}

            <div className="managed-services-two__image-overlay" />

            <div className="managed-services-two__image-label">
              <span className="managed-services-two__label-dot" />
              Professional Managed Services
            </div>
          </div>

          <div className="managed-services-two__image-decoration" />

          {/* IMAGE BADGE */}
          <div
            className="managed-services-two__image-badge"
            key={activeSlide.id}
          >
            <span className="managed-services-two__badge-number">
              {activeSlide.badgeNumber}
            </span>

            <div className="managed-services-two__badge-divider" />

            <div className="managed-services-two__badge-content">
              <strong>{activeSlide.badgeText}</strong>
              <span>Professional. Reliable. Efficient.</span>
            </div>
          </div>

          {/* IMAGE CONTROLS */}
          <div className="managed-services-two__image-controls">
            <button
              type="button"
              className="managed-services-two__arrow"
              onClick={previousSlide}
              aria-label="Previous managed service"
            >
              &#8592;
            </button>

            <span className="managed-services-two__slide-count">
              <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
              <span>/</span>
              {String(managedSlides.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              className="managed-services-two__arrow"
              onClick={nextSlide}
              aria-label="Next managed service"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div
          className="managed-services-two__content"
          key={activeSlide.id}
        >
          <div className="managed-services-two__eyebrow">
            <span className="managed-services-two__eyebrow-line" />
            {activeSlide.category}
          </div>

          <h2 className="managed-services-two__title">
            {activeSlide.title}
          </h2>

          <p className="managed-services-two__description">
            {activeSlide.description}
          </p>

          {/* FEATURES */}
          <div className="managed-services-two__features">
            {activeSlide.features.map((feature, index) => (
              <div
                className="managed-services-two__feature"
                key={feature}
                style={{ "--feature-index": index }}
              >
                <span className="managed-services-two__feature-icon">
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
          <div className="managed-services-two__footer">
            <a
              href="#contact"
              className="managed-services-two__cta"
            >
              <span>Explore Our Services</span>

              <span className="managed-services-two__cta-icon">
                &#8599;
              </span>
            </a>

            <div className="managed-services-two__pagination">
              {managedSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`managed-services-two__pagination-item ${
                    index === activeIndex
                      ? "managed-services-two__pagination-item--active"
                      : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show managed service ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="managed-services-two__progress-track">
            <div
              key={activeIndex}
              className="managed-services-two__progress-bar"
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

export default ManagedServicesTwo;