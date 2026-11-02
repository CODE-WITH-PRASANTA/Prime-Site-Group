import React, { useState, useEffect, useCallback } from "react";
import "./SecurityServicesTwo.css";

const SLIDE_DURATION = 2000; // 2-second synchronized rotation

const securityServicesData = [
  {
    id: 1,
    tag: "SECURITY SERVICES",
    titlePrimary: "Manned Guarding",
    titleAccent: "& Patrols",
    description:
      "Delivering SIRA-certified tactical security personnel, perimeter surveillance, and rapid incident response protocols to safeguard high-profile commercial towers, critical infrastructure, and residential communities across the UAE.",
    badgeTitle: "SIRA CERTIFIED",
    badgeSub: "24/7 Perimeter Protection",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 2,
    tag: "SECURITY SERVICES",
    titlePrimary: "Executive Protection",
    titleAccent: "& Close Security",
    description:
      "Providing discreet, intelligence-led close protection officers and secure convoy transit solutions for VIPs, corporate executives, and high-net-worth delegates with comprehensive threat mitigation strategies.",
    badgeTitle: "CLOSE PROTECTION",
    badgeSub: "Elite VIP Defence Teams",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 3,
    tag: "SECURITY SERVICES",
    titlePrimary: "Smart CCTV &",
    titleAccent: "SOC Monitoring",
    description:
      "Featuring state-of-the-art 24/7 Central Operations Control centers equipped with AI-powered video analytics, automated thermal threat detection, and remote biometric access control architecture.",
    badgeTitle: "SOC OPERATIONS",
    badgeSub: "AI-Powered Surveillance",
    image:
      "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 4,
    tag: "SECURITY SERVICES",
    titlePrimary: "K9 Explosive &",
    titleAccent: "Narcotic Detection",
    description:
      "Deploying expertly trained international K9 detection units specialized in narcotics interdiction, firearms detection, explosive sweeps, and high-density event crowd screening operations.",
    badgeTitle: "TACTICAL K9 UNIT",
    badgeSub: "Explosives & Contraband Detection",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85",
  },
];

const SecurityServicesTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = securityServicesData.length;
  const currentSlide = securityServicesData[activeSlide];

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay every 2 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <section
      className="SecurityServicesTwo"
      aria-label="Security Services Presentation"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="SecurityServicesTwo__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="SecurityServicesTwo__media">
          <div className="SecurityServicesTwo__imageClip">
            {securityServicesData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`SecurityServicesTwo__image ${
                  index === activeSlide
                    ? "SecurityServicesTwo__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="SecurityServicesTwo__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="SecurityServicesTwo__badge"
          >
            <span className="SecurityServicesTwo__badgeDot" />
            <div className="SecurityServicesTwo__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Square Navigation Buttons */}
          <div className="SecurityServicesTwo__nav">
            <button
              type="button"
              className="SecurityServicesTwo__navBtn SecurityServicesTwo__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous security service"
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
              className="SecurityServicesTwo__navBtn SecurityServicesTwo__navBtn--next"
              onClick={handleNext}
              aria-label="Next security service"
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
          className="SecurityServicesTwo__content"
        >
          <div className="SecurityServicesTwo__eyebrowWrap">
            <span className="SecurityServicesTwo__eyebrowLine" />
            <span className="SecurityServicesTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="SecurityServicesTwo__title">
            <span className="SecurityServicesTwo__titlePrimary">
              {currentSlide.titlePrimary}{" "}
            </span>
            <span className="SecurityServicesTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="SecurityServicesTwo__description">
            {currentSlide.description}
          </p>

          {/* Feature Highlights */}
          <div className="SecurityServicesTwo__features">
            <div className="SecurityServicesTwo__featureItem">
              <span className="SecurityServicesTwo__featureDot" />
              <span>SIRA-Accredited Guarding Standards</span>
            </div>
            <div className="SecurityServicesTwo__featureItem">
              <span className="SecurityServicesTwo__featureDot" />
              <span>Full Incident Containment & Crisis Management</span>
            </div>
            <div className="SecurityServicesTwo__featureItem">
              <span className="SecurityServicesTwo__featureDot" />
              <span>Centralized Real-Time Command & Control</span>
            </div>
          </div>

          {/* Premium Action Row */}
          <div className="SecurityServicesTwo__actionRow">
            <a
              href="#service-enquiry"
              className="SecurityServicesTwo__btnPrimary"
            >
              <span>Request Security Consultation</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* 2-Second Synchronized Progress Line */}
            <div className="SecurityServicesTwo__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`SecurityServicesTwo__progressBar ${
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

export default SecurityServicesTwo;