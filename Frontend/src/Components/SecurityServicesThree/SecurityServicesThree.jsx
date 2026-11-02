import React, { useState, useEffect, useRef } from "react";
import "./SecurityServicesThree.css";

const facilityPoints = [
  {
    id: 1,
    title: "Central Security Operations Centre (SOC)",
    detail: "Tier-IV rated 24/7 incident response hub with unified AI surveillance telemetry.",
  },
  {
    id: 2,
    title: "Rapid Tactical Intervention Units",
    detail: "Armoured mobile response squads strategically positioned for immediate deployment.",
  },
  {
    id: 3,
    title: "Biometric & High-Security Vaults",
    detail: "Multi-layered biometric perimeter access, vibration sensors, and ballistic shielding.",
  },
  {
    id: 4,
    title: "Dedicated K9 Training & Kennelling Facility",
    detail: "SIRA-certified training grounds for explosive, weapon, and contraband detection dogs.",
  },
];

const SecurityServicesThree = () => {
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
      className={`SecurityServicesThree ${
        isVisible ? "SecurityServicesThree--visible" : ""
      }`}
      aria-label="Security Facilities and Infrastructure"
    >
      <div className="SecurityServicesThree__container">
        {/* Left Side: Vault Facility Media with Slanted Diagonal Edge */}
        <div className="SecurityServicesThree__media">
          <div className="SecurityServicesThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2200&q=85"
              alt="High security automated operations centre and surveillance control room"
              className="SecurityServicesThree__image"
              loading="lazy"
            />
            <div className="SecurityServicesThree__imageShade" />
          </div>

          {/* Floating Security Badge */}
          <div className="SecurityServicesThree__badge">
            <span className="SecurityServicesThree__badgeDot" />
            <div className="SecurityServicesThree__badgeInfo">
              <strong>Tier-IV Security SOC</strong>
              <span>24/7 AI-Integrated Tactical Control</span>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Staggered Content */}
        <div className="SecurityServicesThree__content">
          <div className="SecurityServicesThree__eyebrowWrap">
            <span className="SecurityServicesThree__eyebrowLine" />
            <span className="SecurityServicesThree__eyebrow">INFRASTRUCTURE</span>
          </div>

          <h2 className="SecurityServicesThree__title">
            Our <span className="SecurityServicesThree__titleAccent">Facilities</span>
          </h2>

          <p className="SecurityServicesThree__description">
            We operate purpose-built security commands and critical containment infrastructure 
            designed to deliver total operational resilience. From our central intelligence 
            hubs to tactical canine stations, every facility conforms to strict regulatory 
            and international defence standards.
          </p>

          {/* Checkmark List */}
          <div className="SecurityServicesThree__list">
            {facilityPoints.map((point) => (
              <div key={point.id} className="SecurityServicesThree__item">
                <span className="SecurityServicesThree__checkIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className="SecurityServicesThree__itemText">
                  <h4 className="SecurityServicesThree__itemTitle">
                    {point.title}
                  </h4>
                  <p className="SecurityServicesThree__itemDetail">
                    {point.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="SecurityServicesThree__actionWrap">
            <a
              href="#facility-tour"
              className="SecurityServicesThree__linkPrimary"
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

export default SecurityServicesThree;