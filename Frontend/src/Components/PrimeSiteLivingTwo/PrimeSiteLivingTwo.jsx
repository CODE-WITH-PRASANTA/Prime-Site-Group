import React, { useState, useEffect, useCallback } from "react";
import "./PrimeSiteLivingTwo.css";

const SLIDE_DURATION = 5000; // 5-second synchronized rotation

const livingServicesData = [
  {
    id: 1,
    tag: "PRIME SITE LIVING",
    titlePrimary: "Luxury Villa",
    titleAccent: "Residences",
    description:
      "Prime Site delivers architecturally refined private villas and custom-built estates crafted for modern luxury living, featuring bespoke interior detailing, smart automation, and private outdoor sanctuaries.",
    badgeTitle: "EXCLUSIVE ESTATES",
    badgeSub: "Curated Architectural Designs",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Bespoke Architectural Finishes",
      "Private Landscaped Grounds & Pools",
      "Integrated Smart Home Automation",
    ],
  },
  {
    id: 2,
    tag: "PRIME SITE LIVING",
    titlePrimary: "Skyline Penthouses &",
    titleAccent: "Apartments",
    description:
      "Elevate your urban lifestyle with Prime Site high-rise apartments and penthouses offering panoramic skyline views, bespoke concierge services, and central access to prime business and cultural districts.",
    badgeTitle: "URBAN SANCTUARY",
    badgeSub: "Panoramic Cityscapes",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2200&q=85",
    features: [
      "24/7 Dedicated Concierge & Valet",
      "Floor-to-Ceiling Acoustic Glazing",
      "Private Sky Terraces & Lounges",
    ],
  },
  {
    id: 3,
    tag: "PRIME SITE LIVING",
    titlePrimary: "Private Community",
    titleAccent: "Amenities",
    description:
      "Every Prime Site residential enclave integrates resort-style wellness hubs, Olympic-grade fitness suites, infinity pools, and secure pedestrian greenbelts designed for families and discerning residents.",
    badgeTitle: "RESORT WELLNESS",
    badgeSub: "Comprehensive Living Amenities",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Wellness Spas & Hydrotherapy Suites",
      "Gated Perimeter with 24/7 Patrols",
      "Child-Safe Play Enclaves & Parks",
    ],
  },
  {
    id: 4,
    tag: "PRIME SITE LIVING",
    titlePrimary: "Asset & Property",
    titleAccent: "Management",
    description:
      "Prime Site provides end-to-end residential stewardship, ensuring seamless tenant relations, ongoing facility preservation, and optimized rental yields through our certified in-house property advisors.",
    badgeTitle: "ASSET STEWARDSHIP",
    badgeSub: "Long-Term Value Preservation",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Dedicated Asset Management Teams",
      "Comprehensive Preventive Maintenance",
      "Transparent Owner Ledger Portals",
    ],
  },
];

const PrimeSiteLivingTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = livingServicesData.length;
  const currentSlide = livingServicesData[activeSlide];

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <section
      className="PrimeSiteLivingTwo"
      aria-label="Prime Site Living Portfolio Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="PrimeSiteLivingTwo__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="PrimeSiteLivingTwo__media">
          <div className="PrimeSiteLivingTwo__imageClip">
            {livingServicesData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`PrimeSiteLivingTwo__image ${
                  index === activeSlide
                    ? "PrimeSiteLivingTwo__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="PrimeSiteLivingTwo__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="PrimeSiteLivingTwo__badge"
          >
            <span className="PrimeSiteLivingTwo__badgeDot" />
            <div className="PrimeSiteLivingTwo__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Square Navigation Buttons */}
          <div className="PrimeSiteLivingTwo__nav">
            <button
              type="button"
              className="PrimeSiteLivingTwo__navBtn PrimeSiteLivingTwo__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous residential service"
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
              className="PrimeSiteLivingTwo__navBtn PrimeSiteLivingTwo__navBtn--next"
              onClick={handleNext}
              aria-label="Next residential service"
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
          className="PrimeSiteLivingTwo__content"
        >
          <div className="PrimeSiteLivingTwo__eyebrowWrap">
            <span className="PrimeSiteLivingTwo__eyebrowLine" />
            <span className="PrimeSiteLivingTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="PrimeSiteLivingTwo__title">
            <span className="PrimeSiteLivingTwo__titlePrimary">
              {currentSlide.titlePrimary}{" "}
            </span>
            <span className="PrimeSiteLivingTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="PrimeSiteLivingTwo__description">
            {currentSlide.description}
          </p>

          {/* Dynamic Feature Highlights */}
          <div className="PrimeSiteLivingTwo__features">
            {currentSlide.features.map((feature, idx) => (
              <div key={idx} className="PrimeSiteLivingTwo__featureItem">
                <span className="PrimeSiteLivingTwo__featureDot" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="PrimeSiteLivingTwo__actionRow">
            <a href="#explore-residences" className="PrimeSiteLivingTwo__btnPrimary">
              <span>Explore Residences</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* Synchronized Progress Track */}
            <div className="PrimeSiteLivingTwo__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`PrimeSiteLivingTwo__progressBar ${
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

export default PrimeSiteLivingTwo;