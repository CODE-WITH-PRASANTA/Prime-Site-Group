import React, { useState, useEffect, useCallback } from "react";
import "./TransguardLivingTwo.css";

const livingSlides = [
  {
    id: 1,
    label: "Residential Security",
    badgeNumber: "01",
    badgeTitle: "Your Safety First",
    badgeDescription: "Professional protection for residential communities",
    eyebrow: "SECURITY YOU CAN TRUST",
    title: "Creating Safer Spaces for Modern Living",
    description:
      "Feel confident in the place you call home. Our residential security solutions focus on professional guarding, access monitoring, and dependable security practices to help create a safer and more welcoming living environment.",
    features: [
      "Professional residential security personnel",
      "Controlled access and visitor monitoring",
      "Security-focused support for residential communities",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
  {
    id: 2,
    label: "Community Protection",
    badgeNumber: "02",
    badgeTitle: "Peace of Mind",
    badgeDescription: "Supporting secure and welcoming communities",
    eyebrow: "PROTECTING YOUR COMMUNITY",
    title: "A Secure Community Starts with the Right People",
    description:
      "A well-managed residential community needs attentive professionals and reliable security procedures. We focus on maintaining a welcoming atmosphere while helping residents, visitors, and property teams feel more confident every day.",
    features: [
      "Attentive security and reception support",
      "Visitor coordination and entry management",
      "Professional service for residents and guests",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
  {
    id: 3,
    label: "Professional Support",
    badgeNumber: "03",
    badgeTitle: "Reliable Service",
    badgeDescription: "Dedicated people for everyday operations",
    eyebrow: "SERVICE THAT MAKES A DIFFERENCE",
    title: "Professional Support for Better Everyday Living",
    description:
      "From welcoming visitors to supporting daily property operations, professional service makes a difference. Our approach emphasizes courteous communication, dependable assistance, and consistent standards for residential environments.",
    features: [
      "Courteous front-of-house assistance",
      "Reliable coordination with property teams",
      "Service-focused support for daily activities",
    ],
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
];

const TransguardLivingTwo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = livingSlides[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % livingSlides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex(
      (current) => (current - 1 + livingSlides.length) % livingSlides.length
    );
  }, []);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % livingSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="transguard-living-two"
      aria-label="Transguard Living services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="transguard-living-two__container">
        {/* LEFT IMAGE SECTION */}
        <div className="transguard-living-two__visual">
          <div className="transguard-living-two__image-frame">
            {livingSlides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.label}
                className={`transguard-living-two__image ${
                  activeIndex === index
                    ? "transguard-living-two__image--active"
                    : ""
                }`}
                style={{ objectPosition: slide.imagePosition }}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}

            <div className="transguard-living-two__image-overlay" />

            <div className="transguard-living-two__image-label">
              <span className="transguard-living-two__label-dot" />
              {activeSlide.label}
            </div>
          </div>

          <div className="transguard-living-two__image-decoration" />

          {/* IMAGE BADGE */}
          <div
            className="transguard-living-two__image-badge"
            key={`badge-${activeSlide.id}`}
          >
            <span className="transguard-living-two__badge-number">
              {activeSlide.badgeNumber}
            </span>

            <span className="transguard-living-two__badge-divider" />

            <div className="transguard-living-two__badge-content">
              <strong>{activeSlide.badgeTitle}</strong>
              <span>{activeSlide.badgeDescription}</span>
            </div>
          </div>

          {/* IMAGE NAVIGATION */}
          <div className="transguard-living-two__image-controls">
            <button
              type="button"
              className="transguard-living-two__arrow"
              onClick={previousSlide}
              aria-label="Previous slide"
            >
              &#8592;
            </button>

            <div className="transguard-living-two__slide-count">
              <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
              <span>/</span>
              <span>{String(livingSlides.length).padStart(2, "0")}</span>
            </div>

            <button
              type="button"
              className="transguard-living-two__arrow"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div
          className="transguard-living-two__content"
          key={`content-${activeSlide.id}`}
        >
          <div className="transguard-living-two__eyebrow">
            <span className="transguard-living-two__eyebrow-line" />
            {activeSlide.eyebrow}
          </div>

          <h2 className="transguard-living-two__title">
            {activeSlide.title}
          </h2>

          <p className="transguard-living-two__description">
            {activeSlide.description}
          </p>

          {/* FEATURES */}
          <div className="transguard-living-two__features">
            {activeSlide.features.map((feature, index) => (
              <div
                className="transguard-living-two__feature"
                key={feature}
                style={{ "--feature-index": index }}
              >
                <span className="transguard-living-two__feature-icon">
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
          <div className="transguard-living-two__footer">
            <a
              href="#contact"
              className="transguard-living-two__cta"
            >
              <span>Explore Our Services</span>

              <span className="transguard-living-two__cta-icon">
                &#8599;
              </span>
            </a>

            <div
              className="transguard-living-two__pagination"
              aria-label="Choose a slide"
            >
              {livingSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`transguard-living-two__pagination-item ${
                    activeIndex === index
                      ? "transguard-living-two__pagination-item--active"
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
          <div className="transguard-living-two__progress-track">
            {!isPaused && (
              <div
                className="transguard-living-two__progress-bar"
                key={activeIndex}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransguardLivingTwo;