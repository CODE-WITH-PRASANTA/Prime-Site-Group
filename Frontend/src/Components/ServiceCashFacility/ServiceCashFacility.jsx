import React, { useState, useEffect, useRef } from "react";
import "./ServiceCashFacility.css";

const facilityServices = [
  {
    id: "scf-1",
    tag: "High Security",
    title: "Central Processing Vaults",
    description:
      "Bank-grade reinforced vaults engineered with dual-biometric access points, 24/7 continuous CCTV monitoring, seismic vibration sensors, and automated multi-tier fire suppression systems.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    id: "scf-2",
    tag: "Secured Transit",
    title: "Cash in Transit (CIT) Operations",
    description:
      "Armored ballistic transport fleets equipped with real-time GPS telemetry, satellite geo-fencing, tamper-evident cassette containment, and synchronized route dispatch systems.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
        />
      </svg>
    ),
  },
  {
    id: "scf-3",
    tag: "Express Liquidity",
    title: "Dedicated Cash Deposit Hubs",
    description:
      "Rapid bulk-counter nodes guaranteeing instantaneous ledger crediting, automated counterfeit interception, barcode-sealed deposit bag validation, and express reconciliation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: "scf-4",
    tag: "Automated Ops",
    title: "High-Speed Currency Processing",
    description:
      "High-throughput sorting technology executing multi-spectral counterfeit detection, denomination packaging, polymer and paper fitness sorting, and central bank compliance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

const facilityMetrics = [
  { value: "100%", label: "Central Bank & Audit Compliance" },
  { value: "24/7/365", label: "Biometric & Armed Vault Monitoring" },
  { value: "Zero Loss", label: "Flawless CIT Chain of Custody" },
  { value: "< 24 Hrs", label: "Guaranteed Liquidity & Clearing Window" },
];

const ServiceCashFacility = () => {
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
      className={`ServiceCashFacility ${
        isVisible ? "ServiceCashFacility--visible" : ""
      }`}
      aria-label="Prime Site Cash Management Facilities"
    >
      <div className="ServiceCashFacility__container">
        {/* Section Header */}
        <div className="ServiceCashFacility__header">
          <div className="ServiceCashFacility__eyebrowWrap">
            <span className="ServiceCashFacility__eyebrowLine" />
            <span className="ServiceCashFacility__eyebrow">
              SECURE CASH INFRASTRUCTURE
            </span>
          </div>

          <h2 className="ServiceCashFacility__title">
            Prime Site{" "}
            <span className="ServiceCashFacility__titleAccent">
              Cash Facility
            </span>
          </h2>

          <p className="ServiceCashFacility__description">
            Prime Site operates state-of-the-art cash management centers engineered
            for commercial banks, enterprise retailers, and financial institutions.
            From high-security vaults and armored logistics to automated sorting,
            we ensure complete accuracy, rapid clearing, and zero downtime.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="ServiceCashFacility__grid">
          {facilityServices.map((service) => (
            <div key={service.id} className="ServiceCashFacility__card">
              <div className="ServiceCashFacility__cardTop">
                <div className="ServiceCashFacility__iconBox">
                  {service.icon}
                </div>
                <span className="ServiceCashFacility__cardTag">
                  {service.tag}
                </span>
              </div>

              <h3 className="ServiceCashFacility__cardTitle">{service.title}</h3>
              <p className="ServiceCashFacility__cardDetail">
                {service.description}
              </p>

              <div className="ServiceCashFacility__cardFooter">
                <a
                  href="#facility-security-specs"
                  className="ServiceCashFacility__cardLink"
                >
                  <span>Security Specifications</span>
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

        {/* Performance & Metrics Strip */}
        <div className="ServiceCashFacility__statsStrip">
          {facilityMetrics.map((stat, idx) => (
            <div key={idx} className="ServiceCashFacility__statItem">
              <span className="ServiceCashFacility__statValue">
                {stat.value}
              </span>
              <span className="ServiceCashFacility__statLabel">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Action CTA Block */}
        <div className="ServiceCashFacility__actionWrap">
          <a
            href="#request-cash-consult"
            className="ServiceCashFacility__linkPrimary"
          >
            <span>Consult Prime Site Cash Logistics</span>
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

export default ServiceCashFacility;