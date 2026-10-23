import React, { useState, useEffect, useRef } from "react";
import "./AboutAwarness.css";

const partnerPillars = [
  {
    id: 1,
    title: "Government & Civic Alliances",
    desc: "Active joint programmes with Dubai Police and Road Transport Authority.",
  },
  {
    id: 2,
    title: "Continuous Field Training",
    desc: "Interactive workshops empowering workforce safety and well-being.",
  },
  {
    id: 3,
    title: "Community Outreach",
    desc: "Spreading public awareness across commercial and residential hubs.",
  },
];

const AboutAwarness = () => {
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
      className={`AboutAwarness ${isVisible ? "AboutAwarness--visible" : ""}`}
      aria-label="HSE Awareness and Community Partnerships"
    >
      <div className="AboutAwarness__container">
        {/* Left Side: Staggered Running Content */}
        <div className="AboutAwarness__content">
          <div className="AboutAwarness__eyebrowWrap">
            <span className="AboutAwarness__eyebrowLine" />
            <span className="AboutAwarness__eyebrow">AWARENESS[cite: 10]</span>
          </div>

          <h2 className="AboutAwarness__title">
            HSE Awareness[cite: 10]{" "}
            <span className="AboutAwarness__titleAccent">
              Community Partnerships[cite: 10]
            </span>
          </h2>

          <p className="AboutAwarness__description">
            We run regular HSE events in partnership with Dubai Police, the Road
            Transport Association and many other local and governmental
            organisations, who like us, are dedicated to ensuring a safer
            environment for our workforce and communities[cite: 10].
          </p>

          {/* Partnership Pillars */}
          <div className="AboutAwarness__pillars">
            {partnerPillars.map((pillar) => (
              <div key={pillar.id} className="AboutAwarness__pillarItem">
                <div className="AboutAwarness__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="AboutAwarness__pillarText">
                  <h4 className="AboutAwarness__pillarTitle">{pillar.title}</h4>
                  <p className="AboutAwarness__pillarDesc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="AboutAwarness__actionWrap">
            <a href="#initiatives" className="AboutAwarness__linkPrimary">
              <span>View Community Initiatives</span>
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

        {/* Right Side: Angled Training Session Visual */}
        <div className="AboutAwarness__media">
          <div className="AboutAwarness__imageClip">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2200&q=85"
              alt="HSE training session with workforce specialists"
              className="AboutAwarness__image"
              loading="lazy"
            />
            <div className="AboutAwarness__imageShade" />
          </div>

          {/* Floating Verification Badge */}
          <div className="AboutAwarness__badge">
            <span className="AboutAwarness__badgeDot" />
            <div className="AboutAwarness__badgeInfo">
              <strong>Community First</strong>
              <span>Dubai Police & RTA Alliances</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAwarness;