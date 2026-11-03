import React, { useState, useEffect, useRef } from "react";
import "./ManagedServicesFour.css";

const managedSolutions = [
  {
    id: "ms-1",
    tier: "Tier 1",
    title: "End-to-End Business Process Outsourcing",
    description:
      "Turnkey management of corporate back-office workflows, vendor contracts, inventory audits, and multi-department service desk ecosystems.",
    features: [
      "Custom SLA governance",
      "KPI & milestone monitoring",
      "Process optimization blueprints",
    ],
  },
  {
    id: "ms-2",
    tier: "Tier 2",
    title: "Enterprise Fleet & Asset Management",
    description:
      "Centralized vehicle lifecycle tracking, fuel optimization, preventive fleet maintenance, and certified driver resource deployment.",
    features: [
      "GPS route telemetry",
      "Statutory vehicle compliance",
      "Automated dispatch scheduling",
    ],
  },
  {
    id: "ms-3",
    tier: "Tier 3",
    title: "Hospitality & Guest Operations",
    description:
      "Executive front-of-house reception, VIP event steward coordination, concierge desks, and corporate dining logistics oversight.",
    features: [
      "Bespoke guest etiquette",
      "Digital visitor logging",
      "Cross-site host coverage",
    ],
  },
  {
    id: "ms-4",
    tier: "Tier 4",
    title: "Industrial Warehousing & Supply Support",
    description:
      "Warehouse yard operations, picking/packing supervision, inventory turnover reporting, and strict health/safety site adherence.",
    features: [
      "Zero-downtime line support",
      "Forklift & MHE crew ops",
      "Real-time ledger updates",
    ],
  },
];

const ManagedServicesFour = () => {
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
      className={`ManagedServicesFour ${
        isVisible ? "ManagedServicesFour--visible" : ""
      }`}
      aria-label="Prime Site Managed Services"
    >
      <div className="ManagedServicesFour__container">
        {/* Section Header */}
        <div className="ManagedServicesFour__header">
          <div className="ManagedServicesFour__eyebrowWrap">
            <span className="ManagedServicesFour__eyebrowLine" />
            <span className="ManagedServicesFour__eyebrow">
              OPERATIONAL OUTSOURCING
            </span>
          </div>

          <h2 className="ManagedServicesFour__title">
            Prime Site{" "}
            <span className="ManagedServicesFour__titleAccent">
              Managed Services
            </span>
          </h2>

          <p className="ManagedServicesFour__description">
            Prime Site delivers fully integrated managed service models,
            assuming end-to-end accountability for non-core workflows so your
            enterprise can focus entirely on strategic growth, innovation, and
            market leadership.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="ManagedServicesFour__grid">
          {managedSolutions.map((sol) => (
            <div key={sol.id} className="ManagedServicesFour__card">
              <div className="ManagedServicesFour__cardHeader">
                <span className="ManagedServicesFour__cardTier">{sol.tier}</span>
                <span className="ManagedServicesFour__dotIndicator" />
              </div>

              <h3 className="ManagedServicesFour__cardTitle">{sol.title}</h3>
              <p className="ManagedServicesFour__cardDesc">{sol.description}</p>

              <ul className="ManagedServicesFour__featureList">
                {sol.features.map((item, idx) => (
                  <li key={idx} className="ManagedServicesFour__featureItem">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="ManagedServicesFour__cardFooter">
                <a
                  href="#managed-solution-details"
                  className="ManagedServicesFour__cardLink"
                >
                  <span>Explore Deliverables</span>
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

        {/* Action Wrap */}
        <div className="ManagedServicesFour__actionWrap">
          <a
            href="#request-sla-consult"
            className="ManagedServicesFour__linkPrimary"
          >
            <span>Design Custom SLA Framework</span>
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

export default ManagedServicesFour;