import React, { useState, useEffect, useRef } from "react";
import "./ServiceOurApproach.css";

const approachPillars = [
  {
    id: 1,
    title: "Strategic Estate Planning",
    desc: "Targeted site assessments and logistical support to scale ATM fleet locations efficiently.",
  },
  {
    id: 2,
    title: "Civil & Technical Installation",
    desc: "End-to-end structural engineering, physical vault anchoring, and power redundancy.",
  },
  {
    id: 3,
    title: "Lifecycle Project Management",
    desc: "Proactive field consultancy ensuring zero-downtime rollouts and strict regulatory compliance.",
  },
];

const ServiceOurApproach = () => {
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
      className={`ServiceOurApproach ${
        isVisible ? "ServiceOurApproach--visible" : ""
      }`}
      aria-label="ATM Logistics and Estate Planning Approach"
    >
      <div className="ServiceOurApproach__container">
        {/* Left Side: Staggered Running Content */}
        <div className="ServiceOurApproach__content">
          <div className="ServiceOurApproach__eyebrowWrap">
            <span className="ServiceOurApproach__eyebrowLine" />
            <span className="ServiceOurApproach__eyebrow">ABOUT[cite: 13]</span>
          </div>

          <h2 className="ServiceOurApproach__title">
            Our <span className="ServiceOurApproach__titleAccent">Approach[cite: 13]</span>
          </h2>

          <p className="ServiceOurApproach__description">
            Our experienced team of consultants and project managers provide
            advice and logistical support on estate planning for your ATM
            fleet, from advising on locations for new ATMs to undertaking civil
            and logistical work[cite: 13]. We ensure reliable deployment and maximum
            operational uptime across all retail and banking nodes.
          </p>

          {/* Operational Pillars */}
          <div className="ServiceOurApproach__pillars">
            {approachPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="ServiceOurApproach__pillarItem"
              >
                <div className="ServiceOurApproach__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ServiceOurApproach__pillarText">
                  <h4 className="ServiceOurApproach__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="ServiceOurApproach__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="ServiceOurApproach__actionWrap">
            <a
              href="#consultation"
              className="ServiceOurApproach__linkPrimary"
            >
              <span>Consult Our Project Team</span>
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

        {/* Right Side: Angled ATM Logistics & Armoured Team Visual */}
        <div className="ServiceOurApproach__media">
          <div className="ServiceOurApproach__imageClip">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85"
              alt="Armoured security personnel deploying secure ATM logistics"
              className="ServiceOurApproach__image"
              loading="lazy"
            />
            <div className="ServiceOurApproach__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="ServiceOurApproach__badge">
            <span className="ServiceOurApproach__badgeDot" />
            <div className="ServiceOurApproach__badgeInfo">
              <strong>Turnkey Deployment</strong>
              <span>Full Civil, Vault & CIT Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOurApproach;