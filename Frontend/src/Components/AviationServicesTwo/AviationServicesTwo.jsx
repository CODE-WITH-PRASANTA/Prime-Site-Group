import React, { useState, useEffect, useCallback } from "react";
import "./AviationServicesTwo.css";

const SLIDE_DURATION = 2000; // 2-second synchronized rotation

const aviationServicesData = [
  {
    id: 1,
    tag: "AVIATION SERVICES",
    titlePrimary: "Comprehensive Ground",
    titleAccent: "& Ramp Handling",
    description:
      "Providing certified apron handling, precision pushback, baggage logistics, and rapid turnaround coordination under strict IATA safety regulations for commercial and private carriers.",
    badgeTitle: "RAMP & APRON",
    badgeSub: "IATA Certified Ground Operations",
    image:
      "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Precision Aircraft Marshalling & Pushback",
      "Fast-Track Turnaround & Baggage Handling",
      "Full ISAGO & IATA Safety Protocol Compliance",
    ],
  },
  {
    id: 2,
    tag: "AVIATION SERVICES",
    titlePrimary: "Commercial MRO &",
    titleAccent: "Line Maintenance",
    description:
      "Delivering round-the-clock line maintenance, structural avionics diagnostics, and scheduled inspections to ensure uncompromising airworthiness and maximum fleet uptime.",
    badgeTitle: "MRO EXCELLENCE",
    badgeSub: "FAA & EASA Certified Technicians",
    image:
      "https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f6?auto=format&fit=crop&w=2200&q=85",
    features: [
      "24/7 Line Maintenance & Emergency AOG Support",
      "Avionics, Hydraulics & Powerplant Diagnostics",
      "Certified Component Overhaul & Airframe Repair",
    ],
  },
  {
    id: 3,
    tag: "AVIATION SERVICES",
    titlePrimary: "Executive VIP Charter &",
    titleAccent: "FBO Concierge",
    description:
      "Curating seamless business aviation experiences with exclusive private jet charters, VIP lounge hospitality, fast-track customs clearance, and discreet airside transit.",
    badgeTitle: "PRIVATE AVIATION",
    badgeSub: "Bespoke VIP & FBO Handling",
    image:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Dedicated Fixed-Base Operator (FBO) Lounges",
      "Direct Ramp Chauffeur & VIP Boarding",
      "Custom Flight Planning & Overflight Clearances",
    ],
  },
  {
    id: 4,
    tag: "AVIATION SERVICES",
    titlePrimary: "Air Cargo Logistics &",
    titleAccent: "Dangerous Goods Handling",
    description:
      "Managing high-velocity air freight operations, temperature-controlled pharma transit, and certified hazmat consignments with end-to-end customs bonded tracking.",
    badgeTitle: "CARGO LOGISTICS",
    badgeSub: "Cold Chain & High-Security Freight",
    image:
      "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=2200&q=85",
    features: [
      "GDP-Compliant Temperature-Controlled Storage",
      "Certified Dangerous Goods (DGR) Operations",
      "ULD Buildup, Breakdown & Express Ramp Transfer",
    ],
  },
];

const AviationServicesTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = aviationServicesData.length;
  const currentSlide = aviationServicesData[activeSlide];

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
      className="AviationServicesTwo"
      aria-label="Aviation Services Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="AviationServicesTwo__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="AviationServicesTwo__media">
          <div className="AviationServicesTwo__imageClip">
            {aviationServicesData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`AviationServicesTwo__image ${
                  index === activeSlide
                    ? "AviationServicesTwo__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="AviationServicesTwo__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="AviationServicesTwo__badge"
          >
            <span className="AviationServicesTwo__badgeDot" />
            <div className="AviationServicesTwo__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Navigation Buttons */}
          <div className="AviationServicesTwo__nav">
            <button
              type="button"
              className="AviationServicesTwo__navBtn AviationServicesTwo__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous aviation service"
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
              className="AviationServicesTwo__navBtn AviationServicesTwo__navBtn--next"
              onClick={handleNext}
              aria-label="Next aviation service"
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

        {/* Right Side: Staggered Content */}
        <div
          key={`content-${activeSlide}`}
          className="AviationServicesTwo__content"
        >
          <div className="AviationServicesTwo__eyebrowWrap">
            <span className="AviationServicesTwo__eyebrowLine" />
            <span className="AviationServicesTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="AviationServicesTwo__title">
            <span className="AviationServicesTwo__titlePrimary">
              {currentSlide.titlePrimary}{" "}
            </span>
            <span className="AviationServicesTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="AviationServicesTwo__description">
            {currentSlide.description}
          </p>

          {/* Dynamic Feature Highlights */}
          <div className="AviationServicesTwo__features">
            {currentSlide.features.map((feature, idx) => (
              <div key={idx} className="AviationServicesTwo__featureItem">
                <span className="AviationServicesTwo__featureDot" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA & Synchronized Progress Bar */}
          <div className="AviationServicesTwo__actionRow">
            <a
              href="#aviation-enquiry"
              className="AviationServicesTwo__btnPrimary"
            >
              <span>Request Aviation Services</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <div className="AviationServicesTwo__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`AviationServicesTwo__progressBar ${
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

export default AviationServicesTwo;