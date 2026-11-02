import React, { useState, useEffect, useCallback } from "react";
import "./HomeNews.css";

// Change the brand name here and it updates everywhere in this section.
const BRAND_NAME = "Prime Site";

// Sample content - replace with your real news, dates and images.
const newsEventsData = [
  {
    id: 1,
    tag: "RECRUITMENT",
    title: `${BRAND_NAME} Hosts Skilled Workforce Recruitment Drive`,
    date: "OCTOBER 15, 2026",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    badge: "HIRING",
  },
  {
    id: 2,
    tag: "TRAINING & SAFETY",
    title: "First Responder & Workplace Safety Training for Deployed Staff",
    date: "OCTOBER 08, 2026",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    badge: "WORKSHOP",
  },
  {
    id: 3,
    tag: "CORPORATE",
    title: "Leadership Summit & Strategic Growth Initiatives",
    date: "SEPTEMBER 29, 2026",
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    badge: "EXECUTIVE",
  },
  {
    id: 4,
    tag: "PARTNERSHIPS",
    title: "Expanding Manpower Sourcing Partnerships Across Industries",
    date: "SEPTEMBER 18, 2026",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    badge: "EXPANSION",
  },
  {
    id: 5,
    tag: "EXCELLENCE AWARDS",
    title: "Annual Employee Recognition & Excellence Awards Ceremony",
    date: "SEPTEMBER 04, 2026",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    badge: "HONORS",
  },
];

const AUTOPLAY_INTERVAL = 3000; // 3 seconds per slide

const getVisibleSlides = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
};

const HomeNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides);

  // Responsive items-per-view
  useEffect(() => {
    const handleResize = () => setVisibleSlides(getVisibleSlides());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, newsEventsData.length - visibleSlides);

  // If the screen is resized, never stay on a slide that no longer exists
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay (pauses on hover / focus)
  useEffect(() => {
    if (isPaused) return undefined;

    const timer = setInterval(handleNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, handleNext, currentIndex]);

  return (
    <section
      className="HomeNews"
      aria-label={`${BRAND_NAME} news and events`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="HomeNews__container">
        {/* Header */}
        <div className="HomeNews__header">
          <div className="HomeNews__titleGroup">
            <div className="HomeNews__eyebrowWrap">
              <span className="HomeNews__eyebrowBar" />
              <span className="HomeNews__eyebrow">
                {BRAND_NAME.toUpperCase()} UPDATES
              </span>
            </div>
            <h2 className="HomeNews__heading">
              News<span className="HomeNews__ampersand"> &</span>{" "}
              <span className="HomeNews__headingAccent">Events</span>
            </h2>
            <p className="HomeNews__intro">
              The latest from {BRAND_NAME}: recruitment drives, training,
              partnerships and milestones across our workforce solutions.
            </p>
          </div>

          <div className="HomeNews__controls">
            <button
              type="button"
              className="HomeNews__navButton HomeNews__navButton--prev"
              onClick={handlePrev}
              aria-label="Previous slide"
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
              className="HomeNews__navButton HomeNews__navButton--next"
              onClick={handleNext}
              aria-label="Next slide"
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

        {/* Carousel */}
        <div className="HomeNews__carouselWindow">
          <div
            className="HomeNews__track"
            style={{
              transform: `translate3d(-${(currentIndex * 100) / visibleSlides}%, 0, 0)`,
            }}
          >
            {newsEventsData.map((item) => (
              <article key={item.id} className="HomeNews__card">
                <div className="HomeNews__cardInner">
                  <div className="HomeNews__imageWrapper">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="HomeNews__image"
                      loading="lazy"
                    />
                    <div className="HomeNews__imageShade" />
                    <span className="HomeNews__badge">{item.badge}</span>
                  </div>

                  <div className="HomeNews__cardContent">
                    <div className="HomeNews__meta">
                      <span className="HomeNews__tag">{item.tag}</span>
                      <span className="HomeNews__dot" />
                      <span className="HomeNews__date">{item.date}</span>
                    </div>

                    <h3 className="HomeNews__cardTitle">{item.title}</h3>

                    <a href="/news" className="HomeNews__readLink">
                      <span>Explore Story</span>
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Progress bar, restarts for every slide */}
        <div className="HomeNews__indicatorTrack">
          <div
            key={currentIndex}
            className={`HomeNews__indicatorFill ${isPaused ? "is-paused" : ""}`}
            style={{ animationDuration: `${AUTOPLAY_INTERVAL}ms` }}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeNews;