import React, { useState, useEffect, useRef } from "react";
import "./AviationServicesThree.css";

const aviationPillars = [
  {
    id: 1,
    title: "Airside Operations & Ramp Handling",
    desc: "Precision turnaround services, certified ground support equipment (GSE) deployment, and strict airfield safety protocol execution.",
  },
  {
    id: 2,
    title: "Aviation Security & Cargo Integrity",
    desc: "Regulated air cargo screening, sterile area access control, and comprehensive tamper-evident logistics matching ICAO and IATA benchmarks.",
  },
  {
    id: 3,
    title: "Passenger Services & Terminal Logistics",
    desc: "Seamless passenger check-in architecture, VIP concierge dispatch, mobility assistance, and responsive baggage reconcilement systems.",
  },
];

const AviationServicesThree = () => {
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
      className={`AviationServicesThree ${
        isVisible ? "AviationServicesThree--visible" : ""
      }`}
      aria-label="Aviation Ground Support and Airside Operational Services"
    >
      <div className="AviationServicesThree__container">
        {/* Left Side: Staggered Running Content */}
        <div className="AviationServicesThree__content">
          <div className="AviationServicesThree__eyebrowWrap">
            <span className="AviationServicesThree__eyebrowLine" />
            <span className="AviationServicesThree__eyebrow">AIRSIDE EXCELLENCE</span>
          </div>

          <h2 className="AviationServicesThree__title">
            Our <span className="AviationServicesThree__titleAccent">Capability</span>
          </h2>

          <p className="AviationServicesThree__description">
            We deliver high-readiness aviation ground support and specialized terminal solutions 
            calibrated for international carriers and regional air hubs. Combining licensed personnel 
            with modern airside technology, we guarantee strict turnaround times, uncompromised 
            security, and regulatory compliance across every flight operation.
          </p>

          {/* Operational Pillars */}
          <div className="AviationServicesThree__pillars">
            {aviationPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="AviationServicesThree__pillarItem"
              >
                <div className="AviationServicesThree__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="AviationServicesThree__pillarText">
                  <h4 className="AviationServicesThree__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="AviationServicesThree__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="AviationServicesThree__actionWrap">
            <a
              href="#consultation"
              className="AviationServicesThree__linkPrimary"
            >
              <span>Consult Our Aviation Advisory</span>
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

        {/* Right Side: Aviation Ground Support Visual */}
        <div className="AviationServicesThree__media">
          <div className="AviationServicesThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2200&q=85"
              alt="Commercial aircraft servicing and ground support operations on tarmac"
              className="AviationServicesThree__image"
              loading="lazy"
            />
            <div className="AviationServicesThree__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="AviationServicesThree__badge">
            <span className="AviationServicesThree__badgeDot" />
            <div className="AviationServicesThree__badgeInfo">
              <strong>IATA Compliant Ground Crew</strong>
              <span>ISAGO Certified Turnaround Protocols</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AviationServicesThree;