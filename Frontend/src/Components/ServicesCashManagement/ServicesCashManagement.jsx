import React, { useState, useEffect, useCallback } from "react";
import "./ServicesCashManagement.css";

const SLIDE_DURATION = 2000; // 2-second synchronized rotation

const cashServicesData = [
  {
    id: 1,
    tag: "CASH SERVICES",
    titlePrimary: "ICCS Cheque",
    titleAccent: "Scanning",
    description:
      "Transguard Cash Services has devised its Cheque Processing Services on Image Cheque Clearing System (ICCS) protocol for banks, with the aim of reducing the time for the transfer and crediting of funds, as well as minimizing manual verification risk.",
    badgeTitle: "ICCS PROTOCOL",
    badgeSub: "Automated Banking Clearing",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 2,
    tag: "CASH SERVICES",
    titlePrimary: "Smart Safe",
    titleAccent: "Deposit Solutions",
    description:
      "Providing real-time cash ledger visibility directly from your retail locations with intelligent on-premise vaulting, counterfeit validation, and automated liability shift back to the financial institution.",
    badgeTitle: "INTELLIGENT VAULTING",
    badgeSub: "Real-Time Fund Crediting",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 3,
    tag: "CASH SERVICES",
    titlePrimary: "High-Volume",
    titleAccent: "Currency Processing",
    description:
      "Featuring high-speed banknote sorting, counterfeit detection, and packaging facilities in certified high-security vaults operating 24/7 to manage liquidity streams seamlessly across nationwide networks.",
    badgeTitle: "VAULT OPERATIONS",
    badgeSub: "High-Speed Authentication",
    image:
      "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=2200&q=85",
  },
  {
    id: 4,
    tag: "CASH SERVICES",
    titlePrimary: "Armoured Fleet",
    titleAccent: "Cash-in-Transit (CIT)",
    description:
      "Secured by GPS-tracked bullet-resistant vehicles, specialized security staff, and real-time electronic custody transfer protocols, ensuring zero loss and seamless asset protection throughout transit.",
    badgeTitle: "ARMORED LOGISTICS",
    badgeSub: "GPS-Monitored Transit",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85",
  },
];

const ServicesCashManagement = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = cashServicesData.length;
  const currentSlide = cashServicesData[activeSlide];

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
      className="ServicesCashManagement"
      aria-label="Cash Management Services Presentation"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="ServicesCashManagement__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="ServicesCashManagement__media">
          <div className="ServicesCashManagement__imageClip">
            {cashServicesData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`ServicesCashManagement__image ${
                  index === activeSlide
                    ? "ServicesCashManagement__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="ServicesCashManagement__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="ServicesCashManagement__badge"
          >
            <span className="ServicesCashManagement__badgeDot" />
            <div className="ServicesCashManagement__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Square Navigation Buttons */}
          <div className="ServicesCashManagement__nav">
            <button
              type="button"
              className="ServicesCashManagement__navBtn ServicesCashManagement__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous service"
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
              className="ServicesCashManagement__navBtn ServicesCashManagement__navBtn--next"
              onClick={handleNext}
              aria-label="Next service"
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
          className="ServicesCashManagement__content"
        >
          <div className="ServicesCashManagement__eyebrowWrap">
            <span className="ServicesCashManagement__eyebrowLine" />
            <span className="ServicesCashManagement__eyebrow">
              {currentSlide.tag}[cite: 12]
            </span>
          </div>

          <h2 className="ServicesCashManagement__title">
            <span className="ServicesCashManagement__titlePrimary">
              {currentSlide.titlePrimary}[cite: 12]{" "}
            </span>
            <span className="ServicesCashManagement__titleAccent">
              {currentSlide.titleAccent}[cite: 12]
            </span>
          </h2>

          <p className="ServicesCashManagement__description">
            {currentSlide.description}[cite: 12]
          </p>

          {/* Feature Highlights */}
          <div className="ServicesCashManagement__features">
            <div className="ServicesCashManagement__featureItem">
              <span className="ServicesCashManagement__featureDot" />
              <span>Reduced Liquidity Clearing Times</span>
            </div>
            <div className="ServicesCashManagement__featureItem">
              <span className="ServicesCashManagement__featureDot" />
              <span>Full Audit Integrity & Compliance</span>
            </div>
            <div className="ServicesCashManagement__featureItem">
              <span className="ServicesCashManagement__featureDot" />
              <span>Direct Core-Banking Integration</span>
            </div>
          </div>

          {/* Premium Action Row */}
          <div className="ServicesCashManagement__actionRow">
            <a
              href="#service-enquiry"
              className="ServicesCashManagement__btnPrimary"
            >
              <span>Request Service Details</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* 2-Second Synchronized Progress Line */}
            <div className="ServicesCashManagement__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`ServicesCashManagement__progressBar ${
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

export default ServicesCashManagement;