import React, { useState, useEffect, useRef } from "react";
import "./PrimeSiteLivingThree.css";

const approachPillars = [
  {
    id: 1,
    title: "Master-Planned Community Design",
    desc: "Rigorous site viability reviews, environmental assessments, and human-centric master planning to establish enduring neighborhoods.",
  },
  {
    id: 2,
    title: "Architectural & Sustainable Build",
    desc: "Low-carbon construction frameworks, precision engineering, thermal efficiency, and native landscape integration.",
  },
  {
    id: 3,
    title: "Resident-Centric Operations",
    desc: "Dedicated concierge stewardship, lifestyle management, preventive upkeep, and secure community governance.",
  },
];

const PrimeSiteLivingThree = () => {
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
      className={`PrimeSiteLivingThree ${
        isVisible ? "PrimeSiteLivingThree--visible" : ""
      }`}
      aria-label="Prime Site Living Residential Development Approach"
    >
      <div className="PrimeSiteLivingThree__container">
        {/* Left Side: Staggered Content */}
        <div className="PrimeSiteLivingThree__content">
          <div className="PrimeSiteLivingThree__eyebrowWrap">
            <span className="PrimeSiteLivingThree__eyebrowLine" />
            <span className="PrimeSiteLivingThree__eyebrow">ABOUT PRIME SITE</span>
          </div>

          <h2 className="PrimeSiteLivingThree__title">
            Our <span className="PrimeSiteLivingThree__titleAccent">Approach</span>
          </h2>

          <p className="PrimeSiteLivingThree__description">
            Prime Site pairs forward-looking master planning with refined
            architectural craftsmanship. Our dedicated development and property
            management teams advise across every stage—from land acquisition
            and bespoke residential architecture to long-term community wellness
            and asset stewardship.
          </p>

          {/* Operational Pillars */}
          <div className="PrimeSiteLivingThree__pillars">
            {approachPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="PrimeSiteLivingThree__pillarItem"
              >
                <div className="PrimeSiteLivingThree__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="PrimeSiteLivingThree__pillarText">
                  <h4 className="PrimeSiteLivingThree__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="PrimeSiteLivingThree__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="PrimeSiteLivingThree__actionWrap">
            <a
              href="#living-consultation"
              className="PrimeSiteLivingThree__linkPrimary"
            >
              <span>Consult Our Living Advisors</span>
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

        {/* Right Side: Angled Residential Architectural Visual */}
        <div className="PrimeSiteLivingThree__media">
          <div className="PrimeSiteLivingThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
              alt="Prime Site modern luxury residence with landscaped pool terrace"
              className="PrimeSiteLivingThree__image"
              loading="lazy"
            />
            <div className="PrimeSiteLivingThree__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="PrimeSiteLivingThree__badge">
            <span className="PrimeSiteLivingThree__badgeDot" />
            <div className="PrimeSiteLivingThree__badgeInfo">
              <strong>Integrated Living</strong>
              <span>Turnkey Residential Planning &amp; Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrimeSiteLivingThree;