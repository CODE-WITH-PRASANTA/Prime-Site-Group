import React, { useState, useEffect, useCallback } from "react";
import "./KitchenMaintenanceSolutionsTwo.css";

const kitchenMaintenanceSlides = [
  {
    id: 1,
    category: "Equipment Care",
    badgeNumber: "01",
    badgeTitle: "Kitchen Equipment",
    badgeDescription: "Reliable performance, every day",
    eyebrow: "PROFESSIONAL EQUIPMENT MAINTENANCE",
    title: "Keep Your Kitchen Running at Its Best",
    description:
      "Keep your commercial kitchen efficient, safe, and ready for every service. Our maintenance solutions help reduce unexpected breakdowns, improve equipment performance, and support uninterrupted kitchen operations.",
    features: [
      "Routine equipment inspections",
      "Preventive maintenance planning",
      "Performance and safety checks",
    ],
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
  {
    id: 2,
    category: "Repair & Servicing",
    badgeNumber: "02",
    badgeTitle: "Expert Repairs",
    badgeDescription: "Solutions that minimise downtime",
    eyebrow: "FAST AND DEPENDABLE SUPPORT",
    title: "Expert Repairs for Essential Kitchen Equipment",
    description:
      "Equipment problems can disrupt your entire operation. Our repair-focused maintenance approach helps identify faults, address performance issues, and get essential kitchen equipment back to work as quickly as possible.",
    features: [
      "Fault identification and troubleshooting",
      "Repair and replacement coordination",
      "Post-repair performance verification",
    ],
    image:
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
  {
    id: 3,
    category: "Hygiene & Safety",
    badgeNumber: "03",
    badgeTitle: "Safe Operations",
    badgeDescription: "A cleaner, safer workspace",
    eyebrow: "KITCHEN HYGIENE AND SAFETY",
    title: "Create a Cleaner and Safer Kitchen Environment",
    description:
      "A well-maintained kitchen supports better working conditions and more consistent food preparation. Our maintenance approach focuses on equipment condition, operational checks, and practical upkeep to help maintain a professional workspace.",
    features: [
      "Kitchen condition assessments",
      "Cleaning and upkeep recommendations",
      "Maintenance scheduling and reporting",
    ],
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
];

const KitchenMaintenanceSolutionsTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = kitchenMaintenanceSlides[activeSlide];

  const goToNext = useCallback(() => {
    setActiveSlide((previous) =>
      (previous + 1) % kitchenMaintenanceSlides.length
    );
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveSlide((previous) =>
      previous === 0
        ? kitchenMaintenanceSlides.length - 1
        : previous - 1
    );
  }, []);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = setInterval(() => {
      setActiveSlide((previous) =>
        (previous + 1) % kitchenMaintenanceSlides.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="kitchen-maintenance-two"
      aria-label="Kitchen maintenance solutions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="kitchen-maintenance-two-container">
        <div className="kitchen-maintenance-two-heading">
          <span className="kitchen-maintenance-two-heading-line" />
          <span>SMART MAINTENANCE. BETTER PERFORMANCE.</span>
        </div>

        <div className="kitchen-maintenance-two-slider">
          <div className="kitchen-maintenance-two-image-column">
            <div className="kitchen-maintenance-two-image-frame">
              <img
                key={currentSlide.image}
                className="kitchen-maintenance-two-image"
                src={currentSlide.image}
                alt={currentSlide.badgeTitle}
                style={{ objectPosition: currentSlide.imagePosition }}
                loading="lazy"
              />

              <div className="kitchen-maintenance-two-image-overlay" />

              <div className="kitchen-maintenance-two-image-caption">
                <span className="kitchen-maintenance-two-caption-label">
                  OUR EXPERTISE
                </span>
                <h3>{currentSlide.badgeTitle}</h3>
                <p>{currentSlide.badgeDescription}</p>
              </div>

              <div className="kitchen-maintenance-two-image-number">
                {currentSlide.badgeNumber}
              </div>

              <div className="kitchen-maintenance-two-image-decoration" />
            </div>

            <div className="kitchen-maintenance-two-image-bottom">
              <span className="kitchen-maintenance-two-bottom-dot" />
              <span>Maintenance You Can Depend On</span>
            </div>
          </div>

          <div className="kitchen-maintenance-two-content" key={currentSlide.id}>
            <div className="kitchen-maintenance-two-category">
              <span className="kitchen-maintenance-two-category-line" />
              {currentSlide.category}
            </div>

            <p className="kitchen-maintenance-two-eyebrow">
              {currentSlide.eyebrow}
            </p>

            <h2 className="kitchen-maintenance-two-title">
              {currentSlide.title}
            </h2>

            <p className="kitchen-maintenance-two-description">
              {currentSlide.description}
            </p>

            <div className="kitchen-maintenance-two-feature-list">
              {currentSlide.features.map((feature, index) => (
                <div
                  className="kitchen-maintenance-two-feature"
                  key={feature}
                  style={{ "--feature-index": index }}
                >
                  <span className="kitchen-maintenance-two-feature-check">
                    ✓
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="kitchen-maintenance-two-content-bottom">
              <a
                href="#contact"
                className="kitchen-maintenance-two-cta"
              >
                <span>Explore Our Solutions</span>
                <span className="kitchen-maintenance-two-cta-arrow">
                  ↗
                </span>
              </a>

              <div className="kitchen-maintenance-two-controls">
                <button
                  type="button"
                  className="kitchen-maintenance-two-arrow"
                  onClick={goToPrevious}
                  aria-label="Previous slide"
                >
                  ←
                </button>

                <span className="kitchen-maintenance-two-counter">
                  <strong>
                    {String(activeSlide + 1).padStart(2, "0")}
                  </strong>
                  <span className="kitchen-maintenance-two-counter-divider">
                    /
                  </span>
                  {String(kitchenMaintenanceSlides.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  className="kitchen-maintenance-two-arrow"
                  onClick={goToNext}
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="kitchen-maintenance-two-pagination">
          <div className="kitchen-maintenance-two-dots">
            {kitchenMaintenanceSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`kitchen-maintenance-two-dot ${
                  activeSlide === index ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeSlide === index ? "true" : undefined}
              />
            ))}
          </div>

          <div className="kitchen-maintenance-two-progress-track">
            <div
              className="kitchen-maintenance-two-progress-bar"
              key={activeSlide}
            />
          </div>

          <span className="kitchen-maintenance-two-pagination-label">
            KITCHEN MAINTENANCE SOLUTIONS
          </span>
        </div>
      </div>
    </section>
  );
};

export default KitchenMaintenanceSolutionsTwo;