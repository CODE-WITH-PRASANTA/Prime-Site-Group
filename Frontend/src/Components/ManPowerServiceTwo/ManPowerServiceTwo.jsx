import React, { useState, useEffect, useCallback } from "react";
import "./ManPowerServiceTwo.css";

const SLIDE_DURATION = 2000; // 2-second synchronized rotation

const manPowerServicesData = [
  {
    id: 1,
    tag: "MANPOWER SOLUTIONS",
    titlePrimary: "Skilled Technical",
    titleAccent: "& Industrial Staff",
    description:
      "Providing certified electromechanical technicians, heavy machinery operators, licensed welders, and skilled industrial personnel vetted to satisfy rigorous infrastructure and industrial compliance frameworks.",
    badgeTitle: "MOL & ISO COMPLIANT",
    badgeSub: "Certified Industrial Staff",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 2,
    tag: "MANPOWER SOLUTIONS",
    titlePrimary: "Engineering &",
    titleAccent: "Site Supervision",
    description:
      "Deploying experienced civil engineers, MEP site supervisors, HSE project officers, and technical project leads to manage large-scale commercial developments and complex industrial turnarounds.",
    badgeTitle: "PROJECT OVERSIGHT",
    badgeSub: "Licensed Site Engineers",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 3,
    tag: "MANPOWER SOLUTIONS",
    titlePrimary: "Hospitality &",
    titleAccent: "Front-of-House Staff",
    description:
      "Supplying bilingual front-desk executives, premium concierge specialists, banquet service crews, and multi-lingual corporate support staff to luxury hotel chains and corporate headquarters.",
    badgeTitle: "PREMIUM HOSPITALITY",
    badgeSub: "Vetted Service Crews",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 4,
    tag: "MANPOWER SOLUTIONS",
    titlePrimary: "Logistics &",
    titleAccent: "Supply Chain Crews",
    description:
      "Mobilizing on-demand warehouse managers, certified forklift drivers, pick-pack operatives, and end-to-end distribution support teams for high-throughput fulfillment centers and 3PL networks.",
    badgeTitle: "SUPPLY CHAIN TEAMS",
    badgeSub: "High-Volume Mobilization",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85",
  },
];

const ManPowerServiceTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = manPowerServicesData.length;
  const currentSlide = manPowerServicesData[activeSlide];

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay rotation
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <section
      className="ManPowerServiceTwo"
      aria-label="Manpower Solutions Presentation"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="ManPowerServiceTwo__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="ManPowerServiceTwo__media">
          <div className="ManPowerServiceTwo__imageClip">
            {manPowerServicesData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`ManPowerServiceTwo__image ${
                  index === activeSlide
                    ? "ManPowerServiceTwo__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="ManPowerServiceTwo__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="ManPowerServiceTwo__badge"
          >
            <span className="ManPowerServiceTwo__badgeDot" />
            <div className="ManPowerServiceTwo__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Navigation Buttons */}
          <div className="ManPowerServiceTwo__nav">
            <button
              type="button"
              className="ManPowerServiceTwo__navBtn ManPowerServiceTwo__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous manpower service"
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
              className="ManPowerServiceTwo__navBtn ManPowerServiceTwo__navBtn--next"
              onClick={handleNext}
              aria-label="Next manpower service"
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

        {/* Right Side: Animated Staggered Content */}
        <div
          key={`content-${activeSlide}`}
          className="ManPowerServiceTwo__content"
        >
          <div className="ManPowerServiceTwo__eyebrowWrap">
            <span className="ManPowerServiceTwo__eyebrowLine" />
            <span className="ManPowerServiceTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="ManPowerServiceTwo__title">
            <span className="ManPowerServiceTwo__titlePrimary">
              {currentSlide.titlePrimary}{" "}
            </span>
            <span className="ManPowerServiceTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="ManPowerServiceTwo__description">
            {currentSlide.description}
          </p>

          {/* Feature Highlights */}
          <div className="ManPowerServiceTwo__features">
            <div className="ManPowerServiceTwo__featureItem">
              <span className="ManPowerServiceTwo__featureDot" />
              <span>Full Ministry of Labour (MOL) & Visa Compliance</span>
            </div>
            <div className="ManPowerServiceTwo__featureItem">
              <span className="ManPowerServiceTwo__featureDot" />
              <span>Rapid Multi-Tier Deployment & Shift Management</span>
            </div>
            <div className="ManPowerServiceTwo__featureItem">
              <span className="ManPowerServiceTwo__featureDot" />
              <span>Comprehensive Health, Safety & Onboarding Protocols</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="ManPowerServiceTwo__actionRow">
            <a
              href="#manpower-enquiry"
              className="ManPowerServiceTwo__btnPrimary"
            >
              <span>Request Workforce Proposal</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* Synchronized Progress Line */}
            <div className="ManPowerServiceTwo__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`ManPowerServiceTwo__progressBar ${
                  isPaused ? "is-paused" : ""
                }`}
                style={{ animationDuration: `${SLIDE_DURATION}ms` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManPowerServiceTwo;