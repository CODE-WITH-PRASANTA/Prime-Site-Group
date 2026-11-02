import React, { useState, useEffect, useRef } from "react";
import "./KitchenMaintenanceSolutionsFour.css";

const maintenancePillars = [
  {
    id: "kms-1",
    tag: "Exhaust & Ventilation",
    title: "Kitchen Hood & Duct Degreasing",
    description:
      "NFPA-compliant chemical foam degreasing, canopy scrubbing, exhaust fan balancing, and certified fire risk reduction for commercial cooking hoods.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
        />
      </svg>
    ),
  },
  {
    id: "kms-2",
    tag: "Commercial MEP",
    title: "Cooking Equipment & Burner Overhauls",
    description:
      "Preventive servicing for combi-ovens, industrial gas ranges, fryers, steam kettles, thermostat calibration, and gas leak telemetry inspections.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "kms-3",
    tag: "Cold Chain",
    title: "Walk-in Chillers & Cold Storage Care",
    description:
      "Compressor diagnostics, refrigerant recharge, gasket renewal, condenser descaling, and precise temperature monitoring for cold rooms.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v18m9-9H3m15.364 6.364l-12.728-12.728m12.728 0L5.636 18.364"
        />
      </svg>
    ),
  },
  {
    id: "kms-4",
    tag: "Plumbing & Drainage",
    title: "Grease Trap Pumping & Bio-Dosing",
    description:
      "Scheduled grease interceptor evacuation, eco-enzyme drainage line dosing, jet-washing solid waste interceptors, and odor neutralization.",
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
];

const maintenanceStats = [
  { value: "< 2 hrs", label: "Emergency Breakdown Response" },
  { value: "100%", label: "Municipal & Fire Safety Compliance" },
  { value: "3,500+", label: "Commercial Kitchens Serviced" },
  { value: "Zero-Downtime", label: "Off-Hour Servicing Windows" },
];

const KitchenMaintenanceSolutionsFour = () => {
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
      className={`KitchenMaintenanceSolutionsFour ${
        isVisible ? "KitchenMaintenanceSolutionsFour--visible" : ""
      }`}
      aria-label="Prime Site Commercial Kitchen Maintenance Solutions"
    >
      <div className="KitchenMaintenanceSolutionsFour__container">
        {/* Header Block */}
        <div className="KitchenMaintenanceSolutionsFour__header">
          <div className="KitchenMaintenanceSolutionsFour__eyebrowWrap">
            <span className="KitchenMaintenanceSolutionsFour__eyebrowLine" />
            <span className="KitchenMaintenanceSolutionsFour__eyebrow">
              COMMERCIAL CATERING INFRASTRUCTURE
            </span>
          </div>

          <h2 className="KitchenMaintenanceSolutionsFour__title">
            Prime Site{" "}
            <span className="KitchenMaintenanceSolutionsFour__titleAccent">
              Kitchen Maintenance
            </span>
          </h2>

          <p className="KitchenMaintenanceSolutionsFour__description">
            Prime Site delivers dedicated preventive and emergency maintenance
            solutions for hotel kitchens, central production commissary hubs,
            workforce dining facilities, and restaurant groups. We safeguard
            operational uptime, fire safety, and hygiene standards.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="KitchenMaintenanceSolutionsFour__grid">
          {maintenancePillars.map((item) => (
            <div key={item.id} className="KitchenMaintenanceSolutionsFour__card">
              <div className="KitchenMaintenanceSolutionsFour__cardTop">
                <div className="KitchenMaintenanceSolutionsFour__iconBox">
                  {item.icon}
                </div>
                <span className="KitchenMaintenanceSolutionsFour__cardTag">
                  {item.tag}
                </span>
              </div>

              <h3 className="KitchenMaintenanceSolutionsFour__cardTitle">
                {item.title}
              </h3>
              <p className="KitchenMaintenanceSolutionsFour__cardDetail">
                {item.description}
              </p>

              <div className="KitchenMaintenanceSolutionsFour__cardFooter">
                <a
                  href="#kitchen-service-scope"
                  className="KitchenMaintenanceSolutionsFour__cardLink"
                >
                  <span>Maintenance Protocols</span>
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

        {/* Operations Performance Strip */}
        <div className="KitchenMaintenanceSolutionsFour__statsStrip">
          {maintenanceStats.map((stat, idx) => (
            <div key={idx} className="KitchenMaintenanceSolutionsFour__statItem">
              <span className="KitchenMaintenanceSolutionsFour__statValue">
                {stat.value}
              </span>
              <span className="KitchenMaintenanceSolutionsFour__statLabel">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Block */}
        <div className="KitchenMaintenanceSolutionsFour__actionWrap">
          <a
            href="#request-kitchen-amc"
            className="KitchenMaintenanceSolutionsFour__linkPrimary"
          >
            <span>Request Prime Site Kitchen AMC Audit</span>
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

export default KitchenMaintenanceSolutionsFour;