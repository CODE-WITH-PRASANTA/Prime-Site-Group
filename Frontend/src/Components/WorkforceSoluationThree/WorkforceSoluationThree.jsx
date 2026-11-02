import React, { useState, useEffect, useRef } from "react";
import "./WorkforceSoluationThree.css";

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

const WorkforceSoluationThree = () => {
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
      className={`WorkforceSoluationThree ${
        isVisible ? "WorkforceSoluationThree--visible" : ""
      }`}
      aria-label="Security Deployment Strategy and Operational Approach"
    >
      <div className="WorkforceSoluationThree__container">
        {/* Left Side: Staggered Running Content */}
        <div className="WorkforceSoluationThree__content">
          <div className="WorkforceSoluationThree__eyebrowWrap">
            <span className="WorkforceSoluationThree__eyebrowLine" />
            <span className="WorkforceSoluationThree__eyebrow">OUR STRATEGY</span>
          </div>

          <h2 className="WorkforceSoluationThree__title">
            Our <span className="WorkforceSoluationThree__titleAccent">Approach</span>
          </h2>

          <p className="WorkforceSoluationThree__description">
            Our specialist security consultants and tactical command managers design bespoke, 
            multi-layered protection architectures tailored to complex commercial, governmental, 
            and event environments. We harmonize certified personnel with cutting-edge defence 
            technologies to ensure uninterrupted operational safety and strict regulatory compliance.
          </p>

          {/* Operational Pillars */}
          <div className="WorkforceSoluationThree__pillars">
            {approachPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="WorkforceSoluationThree__pillarItem"
              >
                <div className="WorkforceSoluationThree__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="WorkforceSoluationThree__pillarText">
                  <h4 className="WorkforceSoluationThree__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="WorkforceSoluationThree__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="WorkforceSoluationThree__actionWrap">
            <a
              href="#consultation"
              className="WorkforceSoluationThree__linkPrimary"
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

        {/* Right Side: Angled Logistics & Armoured Team Visual */}
        <div className="WorkforceSoluationThree__media">
          <div className="WorkforceSoluationThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85"
              alt="Armoured security personnel deploying secure ATM logistics"
              className="WorkforceSoluationThree__image"
              loading="lazy"
            />
            <div className="WorkforceSoluationThree__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="WorkforceSoluationThree__badge">
            <span className="WorkforceSoluationThree__badgeDot" />
            <div className="WorkforceSoluationThree__badgeInfo">
              <strong>Risk-Calibrated Security</strong>
              <span>Full SIRA Compliance & Tactical Guarding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkforceSoluationThree;