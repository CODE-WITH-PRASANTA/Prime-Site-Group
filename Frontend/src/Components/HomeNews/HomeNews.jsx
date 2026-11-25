import React, { useState, useEffect, useCallback } from "react";
import API from "../../api/axios";
import "./HomeNews.css";

const BRAND_NAME = "Prime Site";
const AUTOPLAY_INTERVAL = 3000; // 3 seconds per slide

// Fallback image helper
const resolveImage = (img) => {
  if (!img) {
    return "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";
  }
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) {
    return img;
  }
  const baseUrl = import.meta.env.VITE_UPLOADS_URL || "http://localhost:5000/uploads/";
  return `${baseUrl.replace(/\/+$/, "")}/${img.replace(/^\/+/, "")}`;
};

const getVisibleSlides = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
};

const HomeNews = () => {
  const [newsEventsData, setNewsEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides);

  // Fetch blogs dynamically from database
  useEffect(() => {
    let isMounted = true;
    API.get("/blogs?status=Published")
      .then((res) => {
        if (isMounted && res.data?.data) {
          const mapped = res.data.data.map((item) => ({
            id: item.id,
            slug: item.slug,
            tag: (item.category || "UPDATE").toUpperCase(),
            title: item.title,
            date: (item.date || item.formattedDate || "").toUpperCase(),
            image: resolveImage(item.image),
            badge: (item.category || "UPDATE").toUpperCase(),
          }));
          setNewsEventsData(mapped);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch News & Events blogs:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Responsive items-per-view
  useEffect(() => {
    const handleResize = () => setVisibleSlides(getVisibleSlides());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, newsEventsData.length - visibleSlides);

  // If resized or data length changes, clamp currentIndex
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
    if (isPaused || newsEventsData.length <= visibleSlides) return undefined;

    const timer = setInterval(handleNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, handleNext, currentIndex, newsEventsData.length, visibleSlides]);

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

          {newsEventsData.length > visibleSlides && (
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
          )}
        </div>

        {/* Carousel / Content */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#7a7f8c" }}>
            Loading latest news and events...
          </div>
        ) : newsEventsData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#7a7f8c" }}>
            No news or events published yet.
          </div>
        ) : (
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

                      <a
                        href={item.slug ? `/blogs/${item.slug}` : `/blogs/${item.id}`}
                        className="HomeNews__readLink"
                      >
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
        )}

        {/* Progress bar */}
        {newsEventsData.length > visibleSlides && (
          <div className="HomeNews__indicatorTrack">
            <div
              key={currentIndex}
              className={`HomeNews__indicatorFill ${isPaused ? "is-paused" : ""}`}
              style={{ animationDuration: `${AUTOPLAY_INTERVAL}ms` }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeNews;
