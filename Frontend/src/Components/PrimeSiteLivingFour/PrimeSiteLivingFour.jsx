import React, { useState, useEffect, useRef } from "react";
import "./PrimeSiteLivingFour.css";

const livingPillars = [
  {
    id: "psl-1",
    tag: "Accommodations",
    title: "Ergonomic & Modern Living Spaces",
    description:
      "Fully furnished, climate-controlled rooms engineered for rest, privacy, and community living with standardized hygiene protocols.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    id: "psl-2",
    tag: "Welfare & Health",
    title: "Comprehensive Resident Well-Being",
    description:
      "On-site primary medical clinics, licensed paramedical staff, indoor sports courts, and wellness programs designed for resident health.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    id: "psl-3",
    tag: "Campus Safety",
    title: "Round-the-Clock Biometric Security",
    description:
      "Controlled entry turnstiles, integrated CCTV networks, dedicated campus patrol units, and secure automated visitor verification desks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: "psl-4",
    tag: "Facilities",
    title: "Centralized Utility & Retail Hubs",
    description:
      "High-speed fiber connectivity, full-service laundromats, convenience superstores, and automated money remittance kiosks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
];

const livingMetrics = [
  { value: "50,000+", label: "Residents Housed across Campuses" },
  { value: "100%", label: "Statutory Housing & Labor Compliance" },
  { value: "24/7", label: "Medical & Emergency Rapid Response" },
  { value: "Zero-Trace", label: "Centralized Waste & Eco Initiatives" },
];

const PrimeSiteLivingFour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`PrimeSiteLivingFour ${
        isVisible ? "PrimeSiteLivingFour--visible" : ""
      }`}
      aria-label="Prime Site Living Communities & Accommodations"
    >
      <div className="PrimeSiteLivingFour__container">
        {/* Header Block */}
        <div className="PrimeSiteLivingFour__header">
          <div className="PrimeSiteLivingFour__eyebrowWrap">
            <span className="PrimeSiteLivingFour__eyebrowLine" />
            <span className="PrimeSiteLivingFour__eyebrow">
              STAFF ACCOMMODATION & WELFARE
            </span>
          </div>

          <h2 className="PrimeSiteLivingFour__title">
            Prime Site{" "}
            <span className="PrimeSiteLivingFour__titleAccent">Living</span>
          </h2>

          <p className="PrimeSiteLivingFour__description">
            Prime Site Living delivers premium residential communities
            specifically engineered for enterprise workforces. Built to the
            highest international welfare standards, our campuses combine
            modern accommodations with healthcare, recreation, and comprehensive
            lifestyle amenities.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="PrimeSiteLivingFour__grid">
          {livingPillars.map((item) => (
            <div key={item.id} className="PrimeSiteLivingFour__card">
              <div className="PrimeSiteLivingFour__cardTop">
                <div className="PrimeSiteLivingFour__iconBox">{item.icon}</div>
                <span className="PrimeSiteLivingFour__cardTag">{item.tag}</span>
              </div>

              <h3 className="PrimeSiteLivingFour__cardTitle">{item.title}</h3>
              <p className="PrimeSiteLivingFour__cardDetail">{item.description}</p>

              <div className="PrimeSiteLivingFour__cardFooter">
                <a
                  href="#campus-amenities"
                  className="PrimeSiteLivingFour__cardLink"
                >
                  <span>Explore Village Standards</span>
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
          ))}
        </div>

        {/* Metrics Strip */}
        <div className="PrimeSiteLivingFour__statsStrip">
          {livingMetrics.map((stat, idx) => (
            <div key={idx} className="PrimeSiteLivingFour__statItem">
              <span className="PrimeSiteLivingFour__statValue">{stat.value}</span>
              <span className="PrimeSiteLivingFour__statLabel">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Action CTA Block */}
        <div className="PrimeSiteLivingFour__actionWrap">
          <a
            href="#inquire-living"
            className="PrimeSiteLivingFour__linkPrimary"
          >
            <span>Book a Prime Site Village Inspection</span>
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
    </section>
  );
};

export default PrimeSiteLivingFour;