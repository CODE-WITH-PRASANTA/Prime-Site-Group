import React, { useState, useEffect, useRef } from "react";
import "./PrimeSiteDeliveryThree.css";

const approachPillars = [
  {
    id: 1,
    title: "Algorithmic Route & Fleet Planning",
    desc: "Dynamic load-balancing and predictive traffic dispatching to maximize fleet fuel efficiency and punctuality.",
  },
  {
    id: 2,
    title: "Secure Chain of Custody",
    desc: "Strict electronic custody verification, tamper-evident seals, and real-time telemetric vehicle tracking.",
  },
  {
    id: 3,
    title: "Agile Network Infrastructure",
    desc: "Strategic micro-distribution hubs and linehaul connections ensuring high-throughput turnaround with zero delay.",
  },
];

const PrimeSiteDeliveryThree = () => {
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
      className={`PrimeSiteDeliveryThree ${
        isVisible ? "PrimeSiteDeliveryThree--visible" : ""
      }`}
      aria-label="Prime Site Delivery Operational Logistics Approach"
    >
      <div className="PrimeSiteDeliveryThree__container">
        {/* Left Side: Staggered Running Content */}
        <div className="PrimeSiteDeliveryThree__content">
          <div className="PrimeSiteDeliveryThree__eyebrowWrap">
            <span className="PrimeSiteDeliveryThree__eyebrowLine" />
            <span className="PrimeSiteDeliveryThree__eyebrow">ABOUT PRIME SITE</span>
          </div>

          <h2 className="PrimeSiteDeliveryThree__title">
            Our <span className="PrimeSiteDeliveryThree__titleAccent">Approach</span>
          </h2>

          <p className="PrimeSiteDeliveryThree__description">
            Prime Site engineers high-performance logistics frameworks tailored
            to commercial velocity. Our specialized supply chain consultants and
            fleet operations teams manage end-to-end distribution—from intelligent
            hub routing and freight clearance to reliable, guaranteed last-mile execution.
          </p>

          {/* Operational Pillars */}
          <div className="PrimeSiteDeliveryThree__pillars">
            {approachPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="PrimeSiteDeliveryThree__pillarItem"
              >
                <div className="PrimeSiteDeliveryThree__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="PrimeSiteDeliveryThree__pillarText">
                  <h4 className="PrimeSiteDeliveryThree__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="PrimeSiteDeliveryThree__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="PrimeSiteDeliveryThree__actionWrap">
            <a
              href="#consult-logistics"
              className="PrimeSiteDeliveryThree__linkPrimary"
            >
              <span>Consult Our Logistics Team</span>
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

        {/* Right Side: Angled Logistics & Fleet Media */}
        <div className="PrimeSiteDeliveryThree__media">
          <div className="PrimeSiteDeliveryThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85"
              alt="Prime Site modern transport fleet and distribution warehouse operations"
              className="PrimeSiteDeliveryThree__image"
              loading="lazy"
            />
            <div className="PrimeSiteDeliveryThree__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="PrimeSiteDeliveryThree__badge">
            <span className="PrimeSiteDeliveryThree__badgeDot" />
            <div className="PrimeSiteDeliveryThree__badgeInfo">
              <strong>End-to-End Delivery</strong>
              <span>Full Route, Cold Chain &amp; Freight Control</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrimeSiteDeliveryThree;