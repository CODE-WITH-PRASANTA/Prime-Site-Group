import React, { useState, useEffect, useRef } from "react";
import "./SecurityServicesFour.css";

const approachPillars = [
  {
    id: 1,
    title: "Vulnerability & Threat Assessment",
    desc: "Comprehensive perimeter audits and intelligence-led risk mapping to identify security vulnerabilities before deployment.",
  },
  {
    id: 2,
    title: "Integrated System & Personnel Design",
    desc: "Seamlessly combining certified guarding personnel with AI CCTV networks, access control barriers, and SOC monitoring telemetry.",
  },
  {
    id: 3,
    title: "Continuous Audit & Incident Response",
    desc: "Rigorous SLA oversight, unannounced compliance drills, and 24/7 dedicated tactical support guaranteeing zero-compromise asset defence.",
  },
];

const SecurityServicesFour = () => {
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
      className={`SecurityServicesFour ${
        isVisible ? "SecurityServicesFour--visible" : ""
      }`}
      aria-label="Security Deployment Strategy and Operational Approach"
    >
      <div className="SecurityServicesFour__container">
        {/* Left Side: Staggered Running Content */}
        <div className="SecurityServicesFour__content">
          <div className="SecurityServicesFour__eyebrowWrap">
            <span className="SecurityServicesFour__eyebrowLine" />
            <span className="SecurityServicesFour__eyebrow">OUR STRATEGY</span>
          </div>

          <h2 className="SecurityServicesFour__title">
            Our <span className="SecurityServicesFour__titleAccent">Approach</span>
          </h2>

          <p className="SecurityServicesFour__description">
            Our specialist security consultants and tactical command managers design bespoke, 
            multi-layered protection architectures tailored to complex commercial, governmental, 
            and event environments. We harmonize certified personnel with cutting-edge defence 
            technologies to ensure uninterrupted operational safety and strict regulatory compliance.
          </p>

          {/* Operational Pillars */}
          <div className="SecurityServicesFour__pillars">
            {approachPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="SecurityServicesFour__pillarItem"
              >
                <div className="SecurityServicesFour__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="SecurityServicesFour__pillarText">
                  <h4 className="SecurityServicesFour__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="SecurityServicesFour__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="SecurityServicesFour__actionWrap">
            <a
              href="#consultation"
              className="SecurityServicesFour__linkPrimary"
            >
              <span>Consult Our Security Advisory</span>
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
        <div className="SecurityServicesFour__media">
          <div className="SecurityServicesFour__imageClip">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85"
              alt="Armoured security personnel deploying secure ATM logistics"
              className="SecurityServicesFour__image"
              loading="lazy"
            />
            <div className="SecurityServicesFour__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="SecurityServicesFour__badge">
            <span className="SecurityServicesFour__badgeDot" />
            <div className="SecurityServicesFour__badgeInfo">
              <strong>Risk-Calibrated Security</strong>
              <span>Full SIRA Compliance & Tactical Guarding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityServicesFour;