import React, { useState, useEffect, useRef } from "react";
import "./AboutStandards.css";

const standardsPillars = [
  {
    id: 1,
    title: "Zero Harm Philosophy",
    desc: "Targeting incident-free operations across all working sites.",
  },
  {
    id: 2,
    title: "ISO Integrated Standards",
    desc: "Rigorous ISO 45001 & ISO 14001 certification compliance.",
  },
  {
    id: 3,
    title: "Eco-Conscious Footprint",
    desc: "Proactive resource conservation and green waste protocols.",
  },
];

const AboutStandards = () => {
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
      className={`AboutStandards ${isVisible ? "AboutStandards--visible" : ""}`}
      aria-label="Health, Safety and Environment Standards"
    >
      <div className="AboutStandards__container">
        {/* Left Side: Angled Workforce & Safety Visual */}
        <div className="AboutStandards__media">
          <div className="AboutStandards__imageClip">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=85"
              alt="Construction specialist working on safety scaffold"
              className="AboutStandards__image"
              loading="lazy"
            />
            <div className="AboutStandards__imageShade" />
          </div>

          {/* Floating Safety Compliance Badge */}
          <div className="AboutStandards__badge">
            <span className="AboutStandards__badgeDot" />
            <div className="AboutStandards__badgeInfo">
              <strong>HSE Accredited</strong>
              <span>Zero-Harm Safety Protocols</span>
            </div>
          </div>
        </div>

        {/* Right Side: Staggered Executive Presentation Content */}
        <div className="AboutStandards__content">
          <div className="AboutStandards__eyebrowWrap">
            <span className="AboutStandards__eyebrowLine" />
            <span className="AboutStandards__eyebrow">STANDARDS[cite: 9]</span>
          </div>

          <h2 className="AboutStandards__title">
            Health, Safety and{" "}
            <span className="AboutStandards__titleAccent">Environment[cite: 9]</span>
          </h2>

          <p className="AboutStandards__description">
            At Transguard, embedding a strong Health, Safety and Environment
            (HSE) culture is an intrinsic part of the way we work and live and
            its proactive management forms a critical part of our business[cite: 9].
          </p>

          {/* Core Pillars */}
          <div className="AboutStandards__pillars">
            {standardsPillars.map((pillar) => (
              <div key={pillar.id} className="AboutStandards__pillarItem">
                <div className="AboutStandards__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="AboutStandards__pillarText">
                  <h4 className="AboutStandards__pillarTitle">{pillar.title}</h4>
                  <p className="AboutStandards__pillarDesc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="AboutStandards__actionWrap">
            <a href="#hse-policy" className="AboutStandards__linkPrimary">
              <span>Explore HSE Framework</span>
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

export default AboutStandards;