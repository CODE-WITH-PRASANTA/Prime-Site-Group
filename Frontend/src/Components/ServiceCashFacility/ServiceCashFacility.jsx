import React, { useState, useEffect, useRef } from "react";
import "./ServiceCashFacility.css";

const facilityPoints = [
  {
    id: 1,
    title: "State-of-the-art Cash Centre",
    detail: "High-grade biometric vaults and 24/7 CCTV biometric surveillance.",
  },
  {
    id: 2,
    title: "Cash in Transit (CIT) Operations",
    detail: "Direct connection with heavily fortified armored carrier fleets.",
  },
  {
    id: 3,
    title: "Dedicated Cash Deposit Centres",
    detail: "Express batch processing nodes ensuring immediate ledger liquidity.",
  },
  {
    id: 4,
    title: "Automated Currency Processing",
    detail: "High-speed authentication, counterfeit interception, and sorting.",
  },
];

const ServiceCashFacility = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`ServiceCashFacility ${
        isVisible ? "ServiceCashFacility--visible" : ""
      }`}
      aria-label="Cash Management Facilities"
    >
      <div className="ServiceCashFacility__container">
        {/* Left Side: Vault Facility Media with Slanted Diagonal Edge */}
        <div className="ServiceCashFacility__media">
          <div className="ServiceCashFacility__imageClip">
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2200&q=85"
              alt="High security automated cash centre and sorting vault room"
              className="ServiceCashFacility__image"
              loading="lazy"
            />
            <div className="ServiceCashFacility__imageShade" />
          </div>

          {/* Floating Security Badge */}
          <div className="ServiceCashFacility__badge">
            <span className="ServiceCashFacility__badgeDot" />
            <div className="ServiceCashFacility__badgeInfo">
              <strong>Bank-Grade Vaults</strong>
              <span>Biometric & Armored Fortification</span>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Staggered Content */}
        <div className="ServiceCashFacility__content">
          <div className="ServiceCashFacility__eyebrowWrap">
            <span className="ServiceCashFacility__eyebrowLine" />
            <span className="ServiceCashFacility__eyebrow">FACILITIES[cite: 14]</span>
          </div>

          <h2 className="ServiceCashFacility__title">
            Our <span className="ServiceCashFacility__titleAccent">Facilities[cite: 14]</span>
          </h2>

          <p className="ServiceCashFacility__description">
            We offer a diverse range of cash services, including Cash in
            Transit, Cash Deposit Centres and Cash Processing[cite: 14]. Our operations
            are housed within custom-built, ultra-secure processing facilities
            engineered for absolute accuracy and zero operational downtime.
          </p>

          {/* Checkmark List */}
          <div className="ServiceCashFacility__list">
            {facilityPoints.map((point) => (
              <div key={point.id} className="ServiceCashFacility__item">
                <span className="ServiceCashFacility__checkIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className="ServiceCashFacility__itemText">
                  <h4 className="ServiceCashFacility__itemTitle">
                    {point.title} {point.id === 1 && "[cite: 14]"}
                  </h4>
                  <p className="ServiceCashFacility__itemDetail">
                    {point.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="ServiceCashFacility__actionWrap">
            <a
              href="#facility-tour"
              className="ServiceCashFacility__linkPrimary"
            >
              <span>Explore Security Specifications</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCashFacility;