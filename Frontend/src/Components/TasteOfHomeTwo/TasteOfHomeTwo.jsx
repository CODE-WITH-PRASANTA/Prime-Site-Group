import React, { useState, useEffect, useCallback } from "react";
import "./TasteOfHomeTwo.css";

const tasteSlides = [
  {
    id: 1,
    label: "Authentic Homemade Food",
    badgeNumber: "01",
    badgeTitle: "Made With Love",
    badgeDescription: "Fresh meals with authentic flavors",
    eyebrow: "THE COMFORT OF HOMEMADE FOOD",
    title: "Bringing the Taste of Home to Every Meal",
    description:
      "Enjoy the warmth and comfort of homemade food prepared with care. From familiar traditional recipes to everyday favorites, we bring together fresh ingredients, authentic flavors, and the feeling of a meal made at home.",
    features: [
      "Fresh ingredients selected with care",
      "Authentic recipes inspired by home cooking",
      "Delicious meals for everyday moments",
    ],
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
  {
    id: 2,
    label: "Fresh & Flavorful",
    badgeNumber: "02",
    badgeTitle: "Fresh Every Day",
    badgeDescription: "Quality ingredients, delicious results",
    eyebrow: "FRESHNESS YOU CAN TASTE",
    title: "Fresh Ingredients. Flavors to Remember.",
    description:
      "Great food begins with great ingredients. Discover delicious meals inspired by seasonal produce, balanced flavors, and thoughtful preparation, bringing freshness and satisfaction to your everyday dining experience.",
    features: [
      "Carefully selected ingredients",
      "Flavorful meals prepared with attention",
      "A delicious variety for every appetite",
    ],
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
  {
    id: 3,
    label: "Food for Everyone",
    badgeNumber: "03",
    badgeTitle: "Gather & Enjoy",
    badgeDescription: "Good food brings people together",
    eyebrow: "SHARING MOMENTS THROUGH FOOD",
    title: "Every Meal Deserves a Little Happiness",
    description:
      "Make everyday moments special with comforting food and memorable flavors. Whether you are sharing a meal with family or enjoying a quiet lunch, discover food that brings people together around the table.",
    features: [
      "Comforting dishes for family meals",
      "A welcoming experience for every occasion",
      "Flavorful food made for sharing",
    ],
    image:
      "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=85",
    imagePosition: "center",
  },
];

const TasteOfHomeTwo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = tasteSlides[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % tasteSlides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex(
      (current) => (current - 1 + tasteSlides.length) % tasteSlides.length
    );
  }, []);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % tasteSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="taste-of-home-two"
      aria-label="Taste of Home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="taste-of-home-two__container">
        {/* LEFT IMAGE SECTION */}
        <div className="taste-of-home-two__visual">
          <div className="taste-of-home-two__image-frame">
            {tasteSlides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.label}
                className={`taste-of-home-two__image ${
                  activeIndex === index
                    ? "taste-of-home-two__image--active"
                    : ""
                }`}
                style={{ objectPosition: slide.imagePosition }}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}

            <div className="taste-of-home-two__image-overlay" />

            <div className="taste-of-home-two__image-label">
              <span className="taste-of-home-two__label-dot" />
              {activeSlide.label}
            </div>
          </div>

          <div className="taste-of-home-two__image-decoration" />

          <div
            className="taste-of-home-two__image-badge"
            key={`badge-${activeSlide.id}`}
          >
            <span className="taste-of-home-two__badge-number">
              {activeSlide.badgeNumber}
            </span>

            <span className="taste-of-home-two__badge-divider" />

            <div className="taste-of-home-two__badge-content">
              <strong>{activeSlide.badgeTitle}</strong>
              <span>{activeSlide.badgeDescription}</span>
            </div>
          </div>

          {/* IMAGE NAVIGATION */}
          <div className="taste-of-home-two__image-controls">
            <button
              type="button"
              className="taste-of-home-two__arrow"
              onClick={previousSlide}
              aria-label="Previous slide"
            >
              &#8592;
            </button>

            <div className="taste-of-home-two__slide-count">
              <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
              <span>/</span>
              <span>{String(tasteSlides.length).padStart(2, "0")}</span>
            </div>

            <button
              type="button"
              className="taste-of-home-two__arrow"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div
          className="taste-of-home-two__content"
          key={`content-${activeSlide.id}`}
        >
          <div className="taste-of-home-two__eyebrow">
            <span className="taste-of-home-two__eyebrow-line" />
            {activeSlide.eyebrow}
          </div>

          <h2 className="taste-of-home-two__title">
            {activeSlide.title}
          </h2>

          <p className="taste-of-home-two__description">
            {activeSlide.description}
          </p>

          <div className="taste-of-home-two__features">
            {activeSlide.features.map((feature, index) => (
              <div
                className="taste-of-home-two__feature"
                key={feature}
                style={{ "--feature-index": index }}
              >
                <span className="taste-of-home-two__feature-icon">
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

          <div className="taste-of-home-two__footer">
            <a href="#contact" className="taste-of-home-two__cta">
              <span>Discover Our Food</span>
              <span className="taste-of-home-two__cta-icon">
                &#8599;
              </span>
            </a>

            <div
              className="taste-of-home-two__pagination"
              aria-label="Choose a slide"
            >
              {tasteSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`taste-of-home-two__pagination-item ${
                    activeIndex === index
                      ? "taste-of-home-two__pagination-item--active"
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

          <div className="taste-of-home-two__progress-track">
            {!isPaused && (
              <div
                className="taste-of-home-two__progress-bar"
                key={activeIndex}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TasteOfHomeTwo;