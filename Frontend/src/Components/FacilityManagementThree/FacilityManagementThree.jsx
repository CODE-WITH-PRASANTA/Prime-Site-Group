import React, { useState, useEffect, useRef } from "react";
import "./FacilityManagementThree.css";

const managementPillars = [
  {
    id: 1,
    title: "Preventive & Predictive Maintenance",
    desc: "Lifecycle management and telemetry-driven maintenance scheduling across critical MEP, HVAC, and power infrastructure to avoid downtime.",
  },
  {
    id: 2,
    title: "Integrated Workplace & Soft Services",
    desc: "Unifying commercial cleaning, specialized hygiene, waste diversion, and workplace experience management under unified SLA oversight.",
  },
  {
    id: 3,
    title: "Energy Efficiency & Sustainability Auditing",
    desc: "Targeted carbon reduction strategies, automated building controls (BMS), and real-time utility consumption tracking for ESG compliance.",
  },
];

const FacilityManagementThree = () => {
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
      className={`FacilityManagementThree ${
        isVisible ? "FacilityManagementThree--visible" : ""
      }`}
      aria-label="Integrated Facility Management and Building Operations"
    >
      <div className="FacilityManagementThree__container">
        {/* Left Side: Staggered Running Content */}
        <div className="FacilityManagementThree__content">
          <div className="FacilityManagementThree__eyebrowWrap">
            <span className="FacilityManagementThree__eyebrowLine" />
            <span className="FacilityManagementThree__eyebrow">OPERATIONAL EXCELLENCE</span>
          </div>

          <h2 className="FacilityManagementThree__title">
            Our <span className="FacilityManagementThree__titleAccent">Methodology</span>
          </h2>

          <p className="FacilityManagementThree__description">
            We deliver total facilities management architectures designed to optimize lifecycle performance, 
            enhance building efficiency, and cultivate productive work environments. By merging skilled 
            engineering teams with intelligent asset analytics, we protect asset value and ensure 
            uninterrupted facility uptime.
          </p>

          {/* Operational Pillars */}
          <div className="FacilityManagementThree__pillars">
            {managementPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="FacilityManagementThree__pillarItem"
              >
                <div className="FacilityManagementThree__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="FacilityManagementThree__pillarText">
                  <h4 className="FacilityManagementThree__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="FacilityManagementThree__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="FacilityManagementThree__actionWrap">
            <a
              href="#consultation"
              className="FacilityManagementThree__linkPrimary"
            >
              <span>Request Facility Operations Audit</span>
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

        {/* Right Side: Modern Facility Management Visual */}
        <div className="FacilityManagementThree__media">
          <div className="FacilityManagementThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2200&q=85"
              alt="Facility engineer inspecting central HVAC and plant room equipment"
              className="FacilityManagementThree__image"
              loading="lazy"
            />
            <div className="FacilityManagementThree__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="FacilityManagementThree__badge">
            <span className="FacilityManagementThree__badgeDot" />
            <div className="FacilityManagementThree__badgeInfo">
              <strong>Smart Building Operations</strong>
              <span>ISO 41001 Certified FM Protocols</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityManagementThree;