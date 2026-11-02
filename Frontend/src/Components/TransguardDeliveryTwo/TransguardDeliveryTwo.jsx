import React, { useState, useEffect, useCallback } from "react";
import "./TransguardDeliveryTwo.css";

const deliverySlides = [
  {
    id: 1,
    label: "Delivery Operations",
    badgeNumber: "01",
    badgeTitle: "Reliable Delivery",
    badgeDescription: "Coordinated support for daily operations",
    eyebrow: "DELIVERY SERVICES YOU CAN TRUST",
    title: "Delivering Reliability at Every Step",
    description:
      "Efficient delivery operations depend on coordination, accountability, and reliable support. Our delivery solutions are designed to help businesses manage everyday distribution activities while maintaining consistent service standards and a smooth customer experience.",
    features: [
      "Organized delivery operations and coordination",
      "Dependable support for daily distribution activities",
      "Service-focused delivery management",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
  {
    id: 2,
    label: "Logistics Coordination",
    badgeNumber: "02",
    badgeTitle: "Smarter Logistics",
    badgeDescription: "Better coordination from start to finish",
    eyebrow: "STREAMLINED LOGISTICS SUPPORT",
    title: "Making Every Delivery Journey More Efficient",
    description:
      "Well-coordinated logistics help businesses keep their operations moving. From organizing delivery activities to supporting communication between teams, our approach emphasizes efficiency, dependable processes, and attention to operational details.",
    features: [
      "Structured logistics and delivery coordination",
      "Support for smooth movement of goods",
      "Clear communication across delivery teams",
    ],
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
  {
    id: 3,
    label: "Professional Delivery Support",
    badgeNumber: "03",
    badgeTitle: "Service Excellence",
    badgeDescription: "Supporting businesses and customers",
    eyebrow: "A COMMITMENT TO BETTER SERVICE",
    title: "Professional Support for Every Delivery",
    description:
      "A dependable delivery experience takes more than moving goods from one place to another. It requires professional people, organized processes, and a commitment to service. We focus on supporting delivery activities that help businesses serve their customers effectively.",
    features: [
      "Professional support for delivery operations",
      "Organized handling and operational coordination",
      "A customer-focused approach to service delivery",
    ],
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
];

const TransguardDeliveryTwo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = deliverySlides[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % deliverySlides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex(
      (current) =>
        (current - 1 + deliverySlides.length) % deliverySlides.length
    );
  }, []);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % deliverySlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="transguard-delivery-two"
      aria-label="Delivery services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="transguard-delivery-two__container">
        {/* LEFT IMAGE SECTION */}
        <div className="transguard-delivery-two__visual">
          <div className="transguard-delivery-two__image-frame">
            {deliverySlides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.label}
                className={`transguard-delivery-two__image ${
                  activeIndex === index
                    ? "transguard-delivery-two__image--active"
                    : ""
                }`}
                style={{ objectPosition: slide.imagePosition }}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}

            <div className="transguard-delivery-two__image-overlay" />

            <div className="transguard-delivery-two__image-label">
              <span className="transguard-delivery-two__label-dot" />
              {activeSlide.label}
            </div>
          </div>

          <div className="transguard-delivery-two__image-decoration" />

          {/* IMAGE BADGE */}
          <div
            className="transguard-delivery-two__image-badge"
            key={`badge-${activeSlide.id}`}
          >
            <span className="transguard-delivery-two__badge-number">
              {activeSlide.badgeNumber}
            </span>

            <span className="transguard-delivery-two__badge-divider" />

            <div className="transguard-delivery-two__badge-content">
              <strong>{activeSlide.badgeTitle}</strong>
              <span>{activeSlide.badgeDescription}</span>
            </div>
          </div>

          {/* IMAGE NAVIGATION */}
          <div className="transguard-delivery-two__image-controls">
            <button
              type="button"
              className="transguard-delivery-two__arrow"
              onClick={previousSlide}
              aria-label="Previous slide"
            >
              &#8592;
            </button>

            <div className="transguard-delivery-two__slide-count">
              <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
              <span>/</span>
              <span>{String(deliverySlides.length).padStart(2, "0")}</span>
            </div>

            <button
              type="button"
              className="transguard-delivery-two__arrow"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div
          className="transguard-delivery-two__content"
          key={`content-${activeSlide.id}`}
        >
          <div className="transguard-delivery-two__eyebrow">
            <span className="transguard-delivery-two__eyebrow-line" />
            {activeSlide.eyebrow}
          </div>

          <h2 className="transguard-delivery-two__title">
            {activeSlide.title}
          </h2>

          <p className="transguard-delivery-two__description">
            {activeSlide.description}
          </p>

          {/* FEATURES */}
          <div className="transguard-delivery-two__features">
            {activeSlide.features.map((feature, index) => (
              <div
                className="transguard-delivery-two__feature"
                key={feature}
                style={{ "--feature-index": index }}
              >
                <span className="transguard-delivery-two__feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12.5L9.5 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA AND PAGINATION */}
          <div className="transguard-delivery-two__footer">
            <a
              href="#contact"
              className="transguard-delivery-two__cta"
            >
              <span>Explore Our Services</span>

              <span className="transguard-delivery-two__cta-icon">
                &#8599;
              </span>
            </a>

            <div
              className="transguard-delivery-two__pagination"
              aria-label="Choose a slide"
            >
              {deliverySlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`transguard-delivery-two__pagination-item ${
                    activeIndex === index
                      ? "transguard-delivery-two__pagination-item--active"
                      : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="transguard-delivery-two__progress-track">
            {!isPaused && (
              <div
                className="transguard-delivery-two__progress-bar"
                key={activeIndex}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransguardDeliveryTwo;