import React, { useState, useEffect, useRef } from "react";
import "./SecurityServicesFour.css";

const securityPillars = [
  {
    id: "sec-1",
    tag: "Physical Guarding",
    title: "Static & Manned Guarding Deployments",
    description:
      "Licensed, background-verified security guards trained for access point containment, incident de-escalation, perimeter vigilance, and 24/7 post protection.",
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
    id: "sec-2",
    tag: "Surveillance Tech",
    title: "Remote CCTV & AI Video Analytics",
    description:
      "Real-time IP camera telemetry, thermal imaging, license plate recognition (ANPR), and automated motion anomaly alerts feeding direct to central command.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "sec-3",
    tag: "Access Infrastructure",
    title: "Biometric Access & Perimeter Defense",
    description:
      "Multi-factor credential readers, speed turnstile integrations, automated bollards, and visitor management systems guarding critical entryways.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004.07 9.88"
        />
      </svg>
    ),
  },
  {
    id: "sec-4",
    tag: "Emergency Ops",
    title: "Mobile Patrols & Armed Response",
    description:
      "GPS-monitored mobile patrol fleets delivering swift alarm response, unannounced premises audits, and coordinated crisis intervention.",
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
];

const securityMetrics = [
  { value: "24/7/365", label: "Central Command Center Monitoring" },
  { value: "< 8 min", label: "Average Mobile Response Time" },
  { value: "100%", label: "SIRA / PSARA Regulatory Compliance" },
  { value: "5,000+", label: "Secured Commercial & Enterprise Sites" },
];

const SecurityServicesFour = () => {
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
      className={`SecurityServicesFour ${
        isVisible ? "SecurityServicesFour--visible" : ""
      }`}
      aria-label="Prime Site Enterprise Security Services"
    >
      <div className="SecurityServicesFour__container">
        {/* Header Block */}
        <div className="SecurityServicesFour__header">
          <div className="SecurityServicesFour__eyebrowWrap">
            <span className="SecurityServicesFour__eyebrowLine" />
            <span className="SecurityServicesFour__eyebrow">
              ENTERPRISE ASSET PROTECTION
            </span>
          </div>

          <h2 className="SecurityServicesFour__title">
            Prime Site{" "}
            <span className="SecurityServicesFour__titleAccent">
              Security Services
            </span>
          </h2>

          <p className="SecurityServicesFour__description">
            Prime Site provides high-readiness physical security, intelligent video
            surveillance, and tactical response units to safeguard corporate
            headquarters, industrial campuses, infrastructure projects, and private
            residences with unwavering reliability.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="SecurityServicesFour__grid">
          {securityPillars.map((item) => (
            <div key={item.id} className="SecurityServicesFour__card">
              <div className="SecurityServicesFour__cardTop">
                <div className="SecurityServicesFour__iconBox">
                  {item.icon}
                </div>
                <span className="SecurityServicesFour__cardTag">
                  {item.tag}
                </span>
              </div>

              <h3 className="SecurityServicesFour__cardTitle">
                {item.title}
              </h3>
              <p className="SecurityServicesFour__cardDetail">
                {item.description}
              </p>

              <div className="SecurityServicesFour__cardFooter">
                <a
                  href="#security-deployment"
                  className="SecurityServicesFour__cardLink"
                >
                  <span>Operational Protocol</span>
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
        <div className="SecurityServicesFour__statsStrip">
          {securityMetrics.map((stat, idx) => (
            <div key={idx} className="SecurityServicesFour__statItem">
              <span className="SecurityServicesFour__statValue">
                {stat.value}
              </span>
              <span className="SecurityServicesFour__statLabel">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Action CTA Block */}
        <div className="SecurityServicesFour__actionWrap">
          <a
            href="#request-security-assessment"
            className="SecurityServicesFour__linkPrimary"
          >
            <span>Request Site Vulnerability Assessment</span>
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

export default SecurityServicesFour;