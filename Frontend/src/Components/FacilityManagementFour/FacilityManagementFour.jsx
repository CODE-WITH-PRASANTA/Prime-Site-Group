import React, { useState, useEffect, useRef } from "react";
import "./FacilityManagementFour.css";

const facilityServices = [
  {
    id: "fm-1",
    tag: "Hard Services",
    title: "Technical & MEP Operations",
    description:
      "Comprehensive maintenance covering HVAC systems, electrical infrastructure, plumbing, fire and life safety setups, and power redundancies.",
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
    id: "fm-2",
    tag: "Soft Services",
    title: "Corporate Housekeeping & Hygiene",
    description:
      "Eco-certified sanitization, automated floor care, pest containment protocols, and sterile waste lifecycle processing for high-density workspaces.",
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
    id: "fm-3",
    tag: "Asset Protection",
    title: "Physical Security & Access Systems",
    description:
      "Trained security teams, biometric turnstile integrations, automated perimeter control, and 24/7 central monitoring desk operations.",
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
    id: "fm-4",
    tag: "Intelligence",
    title: "CAFM & Energy Optimization",
    description:
      "IoT sensor deployment for real-time asset vibration analysis, preventive maintenance cycles, and commercial energy usage reductions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
];

const FacilityManagementFour = () => {
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
      className={`FacilityManagementFour ${
        isVisible ? "FacilityManagementFour--visible" : ""
      }`}
      aria-label="Prime Site Integrated Facility Management"
    >
      <div className="FacilityManagementFour__container">
        {/* Section Header */}
        <div className="FacilityManagementFour__header">
          <div className="FacilityManagementFour__eyebrowWrap">
            <span className="FacilityManagementFour__eyebrowLine" />
            <span className="FacilityManagementFour__eyebrow">
              INTEGRATED SITE OPERATIONS
            </span>
          </div>

          <h2 className="FacilityManagementFour__title">
            Prime Site{" "}
            <span className="FacilityManagementFour__titleAccent">
              Facility Management
            </span>
          </h2>

          <p className="FacilityManagementFour__description">
            Prime Site provides full-spectrum Integrated Facility Management
            (IFM) designed to elevate asset longevity, guarantee workplace
            safety, and maintain compliance standards across corporate,
            industrial, and commercial footprints.
          </p>
        </div>

        {/* Four Column Service Grid */}
        <div className="FacilityManagementFour__grid">
          {facilityServices.map((service) => (
            <div key={service.id} className="FacilityManagementFour__card">
              <div className="FacilityManagementFour__cardTop">
                <div className="FacilityManagementFour__iconBox">
                  {service.icon}
                </div>
                <span className="FacilityManagementFour__tag">
                  {service.tag}
                </span>
              </div>

              <h3 className="FacilityManagementFour__cardTitle">
                {service.title}
              </h3>

              <p className="FacilityManagementFour__cardDesc">
                {service.description}
              </p>

              <div className="FacilityManagementFour__cardBottom">
                <a
                  href="#service-specs"
                  className="FacilityManagementFour__cardLink"
                >
                  <span>Scope details</span>
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

        {/* Section Footer Banner / Action */}
        <div className="FacilityManagementFour__footer">
          <div className="FacilityManagementFour__footerContent">
            <strong>Ready to optimize your facility portfolio?</strong>
            <span>
              Connect with Prime Site engineering teams for comprehensive site
              audits and custom service level agreements.
            </span>
          </div>
          <a
            href="#request-audit"
            className="FacilityManagementFour__primaryBtn"
          >
            <span>Request Facility Audit</span>
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

export default FacilityManagementFour;