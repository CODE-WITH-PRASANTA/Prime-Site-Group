import React, { useState, useEffect, useRef } from "react";
import "./SecurityServicesThree.css";

const approachPillars = [
  {
    id: 1,
    title: "Strategic Estate & Fleet Planning",
    desc: "Targeted site feasibility assessments and turnkey route planning to scale your ATM fleet efficiently.",
  },
  {
    id: 2,
    title: "Civil Engineering & Vault Anchoring",
    desc: "Certified physical vault installation, high-grade floor anchoring, and dedicated power redundancy systems.",
  },
  {
    id: 3,
    title: "Lifecycle Operations & Secure Logistics",
    desc: "Proactive field management, secure replenishment transit, zero-downtime rollouts, and regulatory compliance.",
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

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`SecurityServicesThree ${
        isVisible ? "SecurityServicesThree--visible" : ""
      }`}
      aria-label="Prime Site ATM Logistics and Estate Planning Approach"
    >
      <div className="SecurityServicesThree__container">
        {/* Left Side: Staggered Content */}
        <div className="SecurityServicesThree__content">
          <div className="SecurityServicesThree__eyebrowWrap">
            <span className="SecurityServicesThree__eyebrowLine" />
            <span className="SecurityServicesThree__eyebrow">
              ABOUT PRIME SITE
            </span>
          </div>

          <h2 className="SecurityServicesThree__title">
            Our <span className="SecurityServicesThree__titleAccent">Approach</span>
          </h2>

          <p className="SecurityServicesThree__description">
            Prime Site’s specialized field engineers and project managers deliver
            strategic advisory, civil engineering, and end-to-end estate planning
            for your commercial ATM infrastructure. From identifying high-yield
            install zones to heavy vault anchoring and continuous logistics,
            Prime Site guarantees high availability and bank-grade physical security.
          </p>

          {/* Operational Pillars */}
          <div className="SecurityServicesThree__pillars">
            {approachPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="SecurityServicesThree__pillarItem"
              >
                <div className="SecurityServicesThree__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="SecurityServicesThree__pillarText">
                  <h4 className="SecurityServicesThree__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="SecurityServicesThree__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="SecurityServicesThree__actionWrap">
            <a
              href="#consultation"
              className="SecurityServicesThree__linkPrimary"
            >
              <span>Consult Prime Site Team</span>
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

        {/* Right Side: Angled Logistics & Vault Deployment Visual */}
        <div className="SecurityServicesThree__media">
          <div className="SecurityServicesThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85"
              alt="Prime Site technical logistics deploying secure ATM vault infrastructure"
              className="SecurityServicesThree__image"
              loading="lazy"
            />
            <div className="SecurityServicesThree__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="SecurityServicesThree__badge">
            <span className="SecurityServicesThree__badgeDot" />
            <div className="SecurityServicesThree__badgeInfo">
              <strong>Prime Site Turnkey Delivery</strong>
              <span>Full Civil, Vault & CIT Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityServicesThree;