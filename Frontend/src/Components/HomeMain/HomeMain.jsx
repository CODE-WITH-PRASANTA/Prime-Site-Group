import React, { useEffect, useState, useCallback } from "react";
import "./HomeMain.css";

const SLIDE_DURATION = 4000; // 4 seconds per slide

const HomeMainSlides = [
  {
    id: 1,
    number: "01",
    category: "AVIATION",
    eyebrow: "EXCELLENCE IN EVERY DETAIL",
    title: "Aviation Services",
    description:
      "Raising industry standards through precision, safety, and continuous innovation.",
    // Premium high-res aviation hero image
    image:
      "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2400&q=90",
    position: "center right",
  },
  {
    id: 2,
    number: "02",
    category: "FINTECH",
    eyebrow: "SMARTER BUSINESS. BETTER FUTURE.",
    title: "ZandPay",
    description:
      "Empowering businesses with secure, seamless payment solutions built for tomorrow.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2200&q=90",
    position: "center",
  },
  {
    id: 3,
    number: "03",
    category: "LOGISTICS",
    eyebrow: "MOVING BUSINESS FORWARD",
    title: "Integrated Logistics",
    description:
      "Connecting businesses, people, and possibilities through dependable logistics solutions.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=90",
    position: "center",
  },
  {
    id: 4,
    number: "04",
    category: "INFRASTRUCTURE",
    eyebrow: "BUILDING TOMORROW TODAY",
    title: "Infrastructure",
    description:
      "Creating smarter spaces and lasting infrastructure for a connected world.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=90",
    position: "center",
  },
];

const HomeMain = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = HomeMainSlides.length;
  const currentSlide = HomeMainSlides[activeSlide];

  const nextSlide = useCallback(() => {
    setActiveSlide((current) => (current + 1) % totalSlides);
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setActiveSlide((current) => (current - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setActiveSlide((index + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="HomeMain"
      aria-label="Prime Site Group services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      {/* Sliding track moving right to left */}
      <div
        className="HomeMain__track"
        style={{
          transform: `translate3d(-${activeSlide * 100}%, 0, 0)`,
        }}
      >
        {HomeMainSlides.map((slide, index) => (
          <article
            className="HomeMain__slide"
            key={slide.id}
            aria-hidden={index !== activeSlide}
          >
            {/* Slide Background Image */}
            <div className="HomeMain__background">
              <img
                className="HomeMain__backgroundImage"
                src={slide.image}
                alt={`${slide.title} background`}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                style={{ objectPosition: slide.position }}
              />
              <div className="HomeMain__imageShade" />
            </div>

            {/* Angled White Panel */}
            <div className="HomeMain__leftPanel">
              <div className="HomeMain__panelTexture" />

              <div className="HomeMain__content">
                <span className="HomeMain__eyebrow">
                  <span className="HomeMain__eyebrowLine" />
                  {slide.eyebrow}
                </span>

                <h1 className="HomeMain__title">{slide.title}</h1>

                <p className="HomeMain__description">{slide.description}</p>

                <div className="HomeMain__contentBottom">
                  <span className="HomeMain__category">{slide.category}</span>
                  <span className="HomeMain__categoryLine" />
                  <span className="HomeMain__tagline">
                    A world of possibilities
                  </span>
                </div>
              </div>

              <span className="HomeMain__watermark" aria-hidden="true">
                {slide.number}
              </span>
            </div>

            {/* Image-side Floating Badge */}
            <div className="HomeMain__imageLabel">
              <span className="HomeMain__imageLabelDot" />
              <span>{slide.category}</span>
              <span className="HomeMain__imageLabelDivider" />
              <span>PRIME SITE GROUP</span>
            </div>
          </article>
        ))}
      </div>

      {/* Persistent Bottom Controls */}
      <div className="HomeMain__controls">
        <div className="HomeMain__slideInfo" aria-live="off">
          <span className="HomeMain__slideCurrent">{currentSlide.number}</span>
          <span className="HomeMain__slideDivider" />
          <span className="HomeMain__slideTotal">
            {String(totalSlides).padStart(2, "0")}
          </span>
        </div>

        <div className="HomeMain__progressTrack" aria-hidden="true">
          <span
            key={`${activeSlide}-${isPaused}`}
            className={`HomeMain__progressBar ${isPaused ? "is-paused" : ""}`}
            style={{ animationDuration: `${SLIDE_DURATION}ms` }}
          />
        </div>

        <div className="HomeMain__dots" aria-label="Choose a slide">
          {HomeMainSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`HomeMain__dot ${
                activeSlide === index ? "is-active" : ""
              }`}
              aria-label={`Go to ${slide.title}`}
              aria-current={activeSlide === index ? "true" : undefined}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <div className="HomeMain__arrows">
          <button
            type="button"
            className="HomeMain__arrow"
            aria-label="Previous slide"
            onClick={previousSlide}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M19 12H5m7 7-7-7 7-7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="HomeMain__arrow"
            aria-label="Next slide"
            onClick={nextSlide}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14m-7-7 7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Decorative Red Right Stripe */}
      <div className="HomeMain__edge" aria-hidden="true" />
    </section>
  );
};

export default HomeMain;