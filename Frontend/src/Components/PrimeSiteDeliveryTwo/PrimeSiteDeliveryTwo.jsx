import React, { useState, useEffect, useCallback } from "react";
import "./PrimeSiteDeliveryTwo.css";

const SLIDE_DURATION = 5000;

const deliveryServicesData = [
  {
    id: 1,
    tag: "PRIME SITE DELIVERY",
    titlePrimary: "Express Last-Mile",
    titleAccent: "Distribution",
    description:
      "Prime Site powers rapid, precision last-mile logistics tailored for commercial enterprises and direct-to-consumer networks, backed by algorithmic route optimization and real-time shipment transparency.",
    badgeTitle: "SPEED DISPATCH",
    badgeSub: "Guaranteed Same-Day Delivery",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Dynamic Route & Traffic Optimization",
      "Signature-Verified Proof of Delivery",
      "Automated Live Customer Notifications",
    ],
  },
  {
    id: 2,
    tag: "PRIME SITE DELIVERY",
    titlePrimary: "Cold Chain &",
    titleAccent: "Perishables Cargo",
    description:
      "Engineered with temperature-controlled transit units and continuous IoT sensor logging, Prime Site ensures pharmaceuticals, groceries, and sensitive biological goods arrive strictly within regulatory thresholds.",
    badgeTitle: "CLIMATE SHIELD",
    badgeSub: "Active Temperature Logging",
    image:
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Multi-Zone Refrigerated Vehicles",
      "Real-Time Telemetric Cold Monitoring",
      "Strict HACCP & Pharma Compliance",
    ],
  },
  {
    id: 3,
    tag: "PRIME SITE DELIVERY",
    titlePrimary: "Freight & Heavy Haul",
    titleAccent: "Logistics",
    description:
      "Specialized oversized transport, pallet distribution, and industrial material transit executed across regional corridors with scheduled linehauls and bonded cargo assurance.",
    badgeTitle: "HEAVY TRANSIT",
    badgeSub: "Scheduled Linehaul Operations",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Hydraulic Liftgate & Flatbed Fleet",
      "Cross-Border Transit & Customs Clearance",
      "End-to-End Asset Protection Coverage",
    ],
  },
  {
    id: 4,
    tag: "PRIME SITE DELIVERY",
    titlePrimary: "Smart Fulfillment &",
    titleAccent: "Warehousing",
    description:
      "Prime Site bridges fulfillment hubs with automated sorting, cross-docking facilities, and connected inventory tracking to minimize handling turnaround times.",
    badgeTitle: "INTELLIGENT HUBS",
    badgeSub: "Automated Micro-Fulfillment",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Automated Sorting & SKU Tracking",
      "Micro-Fulfillment Cross-Docking",
      "Real-Time Inventory Synced APIs",
    ],
  },
];

const PrimeSiteDeliveryTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = deliveryServicesData.length;
  const currentSlide = deliveryServicesData[activeSlide];

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
      className="PrimeSiteDeliveryTwo"
      aria-label="Prime Site Logistics and Delivery Services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="PrimeSiteDeliveryTwo__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="PrimeSiteDeliveryTwo__media">
          <div className="PrimeSiteDeliveryTwo__imageClip">
            {deliveryServicesData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`PrimeSiteDeliveryTwo__image ${
                  index === activeSlide
                    ? "PrimeSiteDeliveryTwo__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="PrimeSiteDeliveryTwo__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="PrimeSiteDeliveryTwo__badge"
          >
            <span className="PrimeSiteDeliveryTwo__badgeDot" />
            <div className="PrimeSiteDeliveryTwo__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Navigation Buttons */}
          <div className="PrimeSiteDeliveryTwo__nav">
            <button
              type="button"
              className="PrimeSiteDeliveryTwo__navBtn PrimeSiteDeliveryTwo__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous delivery service"
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
              className="PrimeSiteDeliveryTwo__navBtn PrimeSiteDeliveryTwo__navBtn--next"
              onClick={handleNext}
              aria-label="Next delivery service"
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
          className="PrimeSiteDeliveryTwo__content"
        >
          <div className="PrimeSiteDeliveryTwo__eyebrowWrap">
            <span className="PrimeSiteDeliveryTwo__eyebrowLine" />
            <span className="PrimeSiteDeliveryTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="PrimeSiteDeliveryTwo__title">
            <span className="PrimeSiteDeliveryTwo__titlePrimary">
              {currentSlide.titlePrimary}{" "}
            </span>
            <span className="PrimeSiteDeliveryTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="PrimeSiteDeliveryTwo__description">
            {currentSlide.description}
          </p>

          {/* Dynamic Feature Highlights */}
          <div className="PrimeSiteDeliveryTwo__features">
            {currentSlide.features.map((feature, idx) => (
              <div key={idx} className="PrimeSiteDeliveryTwo__featureItem">
                <span className="PrimeSiteDeliveryTwo__featureDot" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="PrimeSiteDeliveryTwo__actionRow">
            <a href="#track-or-ship" className="PrimeSiteDeliveryTwo__btnPrimary">
              <span>Book Delivery Service</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* Synchronized Progress Track */}
            <div className="PrimeSiteDeliveryTwo__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`PrimeSiteDeliveryTwo__progressBar ${
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

export default PrimeSiteDeliveryTwo;