import React, { useState, useEffect, useRef } from "react";
import "./ManagedServicesThree.css";

const managedPillars = [
  {
    id: 1,
    title: "Proactive Infrastructure & Cloud Monitoring",
    desc: "24/7/365 telemetry oversight, automated anomaly detection, and rapid resolution across multi-cloud, hybrid, and on-premises server estates.",
  },
  {
    id: 2,
    title: "Cybersecurity & Compliance Management",
    desc: "Continuous vulnerability scanning, endpoint detection and response (EDR), patch governance, and zero-trust policy enforcement.",
  },
  {
    id: 3,
    title: "Strategic IT Consulting & SLA Delivery",
    desc: "Dedicated virtual CIO guidance, lifecycle asset planning, guaranteed response SLAs, and continuous operational cost optimization.",
  },
];

const ManagedServicesThree = () => {
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
      className={`ManagedServicesThree ${
        isVisible ? "ManagedServicesThree--visible" : ""
      }`}
      aria-label="Enterprise Managed IT Services and Infrastructure Management"
    >
      <div className="ManagedServicesThree__container">
        {/* Left Side: Staggered Running Content */}
        <div className="ManagedServicesThree__content">
          <div className="ManagedServicesThree__eyebrowWrap">
            <span className="ManagedServicesThree__eyebrowLine" />
            <span className="ManagedServicesThree__eyebrow">ENTERPRISE IT EXCELLENCE</span>
          </div>

          <h2 className="ManagedServicesThree__title">
            Our <span className="ManagedServicesThree__titleAccent">Framework</span>
          </h2>

          <p className="ManagedServicesThree__description">
            We provide comprehensive managed IT and cloud operations designed to eliminate downtime,
            strengthen digital resilience, and scale with your enterprise. Our certified systems engineers
            and dedicated support specialists manage your core digital assets so your internal teams can focus on growth.
          </p>

          {/* Operational Pillars */}
          <div className="ManagedServicesThree__pillars">
            {managedPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="ManagedServicesThree__pillarItem"
              >
                <div className="ManagedServicesThree__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ManagedServicesThree__pillarText">
                  <h4 className="ManagedServicesThree__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="ManagedServicesThree__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="ManagedServicesThree__actionWrap">
            <a
              href="#consultation"
              className="ManagedServicesThree__linkPrimary"
            >
              <span>Schedule IT Infrastructure Audit</span>
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

        {/* Right Side: Data Center / Infrastructure Management Visual */}
        <div className="ManagedServicesThree__media">
          <div className="ManagedServicesThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85"
              alt="High-density data center server racks and enterprise cloud infrastructure"
              className="ManagedServicesThree__image"
              loading="lazy"
            />
            <div className="ManagedServicesThree__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="ManagedServicesThree__badge">
            <span className="ManagedServicesThree__badgeDot" />
            <div className="ManagedServicesThree__badgeInfo">
              <strong>99.99% Uptime Guarantee</strong>
              <span>SOC 2 Type II & ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagedServicesThree;