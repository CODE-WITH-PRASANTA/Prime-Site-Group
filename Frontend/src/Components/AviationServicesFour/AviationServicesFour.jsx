import React, { useState, useEffect, useRef } from "react";
import "./AviationServicesFour.css";

const aviationCapabilities = [
  {
    id: "av-1",
    code: "GHA-01",
    title: "Airside Ground Handling & Ramp Ops",
    detail:
      "Marshalling, baggage handling, aircraft towing, and precision apron coordination meeting strict turnaround-time thresholds.",
    badge: "Airside Certified",
  },
  {
    id: "av-2",
    code: "SEC-02",
    title: "Aviation Security & Screening",
    detail:
      "ICAO-compliant passenger profiling, access badge verification, baggage scanning protocols, and sterile airside perimeter guarding.",
    badge: "ICAO Compliant",
  },
  {
    id: "av-3",
    code: "CLN-03",
    title: "Aircraft Deep Cabin Grooming",
    detail:
      "Rapid-turnaround line sanitization, deep transit cleans, antimicrobial cabin misting, and certified biohazard response units.",
    badge: "Rapid Turnaround",
  },
  {
    id: "av-4",
    code: "LOG-04",
    title: "Air Cargo & ULD Logistics Support",
    detail:
      "Unit Load Device (ULD) buildup, break-bulk sorting, cold-chain tarmac transfers, and secure bonded warehouse staging.",
    badge: "Bonded Ops",
  },
];

const terminalMetrics = [
  { value: "450K+", label: "Flights Supported Annually" },
  { value: "< 25 min", label: "Average Ramp Turnaround Window" },
  { value: "100%", label: "Civil Aviation Authority Vetting" },
  { value: "24/7/365", label: "Integrated Flight Operations Center" },
];

const AviationServicesFour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`AviationServicesFour ${
        isVisible ? "AviationServicesFour--visible" : ""
      }`}
      aria-label="Prime Site Aviation Ground Support & Security"
    >
      <div className="AviationServicesFour__container">
        {/* Header Block */}
        <div className="AviationServicesFour__header">
          <div className="AviationServicesFour__eyebrowWrap">
            <span className="AviationServicesFour__eyebrowLine" />
            <span className="AviationServicesFour__eyebrow">
              CRITICAL AIRSIDE INFRASTRUCTURE
            </span>
          </div>

          <h2 className="AviationServicesFour__title">
            Prime Site{" "}
            <span className="AviationServicesFour__titleAccent">
              Aviation Services
            </span>
          </h2>

          <p className="AviationServicesFour__description">
            Prime Site delivers mission-critical aviation support across primary
            international hubs and regional aerodromes. From ramp operations and
            aircraft turnaround to sterile security screening, our trained crews
            ensure total regulatory compliance and zero-delay flight schedules.
          </p>
        </div>

        {/* Four Column Services Grid */}
        <div className="AviationServicesFour__grid">
          {aviationCapabilities.map((item) => (
            <div key={item.id} className="AviationServicesFour__card">
              <div className="AviationServicesFour__cardTop">
                <span className="AviationServicesFour__cardCode">{item.code}</span>
                <span className="AviationServicesFour__cardBadge">{item.badge}</span>
              </div>

              <h3 className="AviationServicesFour__cardTitle">{item.title}</h3>
              <p className="AviationServicesFour__cardDetail">{item.detail}</p>

              <div className="AviationServicesFour__cardFooter">
                <a
                  href="#flight-ops-inquiry"
                  className="AviationServicesFour__cardLink"
                >
                  <span>Operating Protocol</span>
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
          ))}
        </div>

        {/* Terminal Operations Stats Strip */}
        <div className="AviationServicesFour__statsStrip">
          {terminalMetrics.map((stat, idx) => (
            <div key={idx} className="AviationServicesFour__statItem">
              <span className="AviationServicesFour__statValue">{stat.value}</span>
              <span className="AviationServicesFour__statLabel">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="AviationServicesFour__actionWrap">
          <a
            href="#contact-aviation"
            className="AviationServicesFour__linkPrimary"
          >
            <span>Coordinate Flight Operations Support</span>
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
    </section>
  );
};

export default AviationServicesFour;