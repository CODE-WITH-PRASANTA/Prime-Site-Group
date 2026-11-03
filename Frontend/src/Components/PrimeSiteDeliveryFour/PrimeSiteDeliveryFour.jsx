import React, { useState, useEffect, useRef } from "react";
import "./PrimeSiteDeliveryFour.css";

const deliveryPillars = [
  {
    id: "psd-1",
    tag: "Express Routing",
    title: "Last-Mile & Urban Courier Dispatch",
    description:
      "Rapid inner-city delivery fleets engineered for time-critical documents, parcel drop-offs, and scheduled corporate routing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: "psd-2",
    tag: "Cold Chain",
    title: "Temperature-Controlled Transit",
    description:
      "Insulated, climate-monitored vehicles safeguarding pharmaceuticals, perishable foods, and temperature-sensitive biological goods.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    id: "psd-3",
    tag: "High Security",
    title: "High-Value & Secure Consignments",
    description:
      "Tamper-evident sealed freight with biometric handoffs, constant GPS telemetry, and dedicated escort vehicles for sensitive cargo.",
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
  {
    id: "psd-4",
    tag: "Smart Logistics",
    title: "B2B Freight & Micro-Fulfillment",
    description:
      "Hub-and-spoke distribution linking regional warehouses directly to retail outlets, manufacturing sites, and end-consumers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
];

const deliveryMetrics = [
  { value: "120K+", label: "Parcels Dispatched Monthly" },
  { value: "99.7%", label: "On-Time SLA Delivery Rate" },
  { value: "Live GPS", label: "Real-Time Telemetry Tracking" },
  { value: "100%", label: "Chain of Custody Verification" },
];

const PrimeSiteDeliveryFour = () => {
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
      className={`PrimeSiteDeliveryFour ${
        isVisible ? "PrimeSiteDeliveryFour--visible" : ""
      }`}
      aria-label="Prime Site Delivery & Logistics Solutions"
    >
      <div className="PrimeSiteDeliveryFour__container">
        {/* Header Block */}
        <div className="PrimeSiteDeliveryFour__header">
          <div className="PrimeSiteDeliveryFour__eyebrowWrap">
            <span className="PrimeSiteDeliveryFour__eyebrowLine" />
            <span className="PrimeSiteDeliveryFour__eyebrow">
              LAST-MILE & FREIGHT LOGISTICS
            </span>
          </div>

          <h2 className="PrimeSiteDeliveryFour__title">
            Prime Site{" "}
            <span className="PrimeSiteDeliveryFour__titleAccent">Delivery</span>
          </h2>

          <p className="PrimeSiteDeliveryFour__description">
            Prime Site Delivery connects businesses with reliable, scalable, and
            technology-driven distribution networks. From urgent intra-city parcels
            to secure enterprise supply chains, our dedicated fleet ensures your
            goods arrive securely, compliantly, and on time.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="PrimeSiteDeliveryFour__grid">
          {deliveryPillars.map((item) => (
            <div key={item.id} className="PrimeSiteDeliveryFour__card">
              <div className="PrimeSiteDeliveryFour__cardTop">
                <div className="PrimeSiteDeliveryFour__iconBox">{item.icon}</div>
                <span className="PrimeSiteDeliveryFour__cardTag">{item.tag}</span>
              </div>

              <h3 className="PrimeSiteDeliveryFour__cardTitle">{item.title}</h3>
              <p className="PrimeSiteDeliveryFour__cardDetail">{item.description}</p>

              <div className="PrimeSiteDeliveryFour__cardFooter">
                <a
                  href="#delivery-coverage"
                  className="PrimeSiteDeliveryFour__cardLink"
                >
                  <span>Routing Specifications</span>
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

        {/* Operational Stats Strip */}
        <div className="PrimeSiteDeliveryFour__statsStrip">
          {deliveryMetrics.map((stat, idx) => (
            <div key={idx} className="PrimeSiteDeliveryFour__statItem">
              <span className="PrimeSiteDeliveryFour__statValue">{stat.value}</span>
              <span className="PrimeSiteDeliveryFour__statLabel">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Block */}
        <div className="PrimeSiteDeliveryFour__actionWrap">
          <a
            href="#schedule-pickup"
            className="PrimeSiteDeliveryFour__linkPrimary"
          >
            <span>Coordinate Prime Site Delivery Fleet</span>
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

export default PrimeSiteDeliveryFour;