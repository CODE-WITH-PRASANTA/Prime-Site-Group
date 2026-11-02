import React, { useState, useEffect, useRef } from "react";
import "./WorkforceSoluationFour.css";

const solutionMetrics = [
  {
    id: 1,
    metric: "15,000+",
    label: "Deployed Personnel",
    subtext: "Actively serving critical industrial, logistics, and corporate nodes.",
  },
  {
    id: 2,
    metric: "99.4%",
    label: "SLA Shift Adherence",
    subtext: "Guaranteed coverage managed via real-time attendance telemetry.",
  },
  {
    id: 3,
    metric: "100%",
    label: "Statutory Compliance",
    subtext: "Comprehensive labor laws, safety accreditations, and transparent payroll.",
  },
  {
    id: 4,
    metric: "24/7",
    label: "Command Center",
    subtext: "Continuous operational dispatch and emergency mobilization support.",
  },
];

const capabilities = [
  {
    id: "cap-1",
    tag: "High Volume",
    title: "End-to-End Recruitment & Onboarding",
    description:
      "Prime Site executes rigorous multi-stage candidate vetting, biometric verification, skill testing, and specialized background investigations.",
  },
  {
    id: "cap-2",
    tag: "Targeted Training",
    title: "Vocational & Health/Safety Upskilling",
    description:
      "All deployed personnel undergo certified site-safety standards, task-specific vocational training, and strict operational compliance workshops.",
  },
  {
    id: "cap-3",
    tag: "Technology-Driven",
    title: "Digital Attendance & Workforce Analytics",
    description:
      "Real-time GPS rosters, biometric punch logs, and automated shift tracking integrated into custom management dashboards.",
  },
];

const WorkforceSoluationFour = () => {
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
      className={`WorkforceSoluationFour ${
        isVisible ? "WorkforceSoluationFour--visible" : ""
      }`}
      aria-label="Prime Site Workforce Solutions"
    >
      <div className="WorkforceSoluationFour__container">
        {/* Top Header */}
        <div className="WorkforceSoluationFour__header">
          <div className="WorkforceSoluationFour__eyebrowWrap">
            <span className="WorkforceSoluationFour__eyebrowLine" />
            <span className="WorkforceSoluationFour__eyebrow">
              ENTERPRISE DEPLOYMENT
            </span>
          </div>

          <h2 className="WorkforceSoluationFour__title">
            Prime Site{" "}
            <span className="WorkforceSoluationFour__titleAccent">
              Workforce Solutions
            </span>
          </h2>

          <p className="WorkforceSoluationFour__description">
            Powering scalable operations with vetted talent, certified site
            readiness, and rigorous supervisory control. Prime Site ensures your
            frontline operates seamlessly without operational bottlenecks.
          </p>
        </div>

        {/* Metrics Bar */}
        <div className="WorkforceSoluationFour__metrics">
          {solutionMetrics.map((item) => (
            <div key={item.id} className="WorkforceSoluationFour__metricCard">
              <span className="WorkforceSoluationFour__metricValue">
                {item.metric}
              </span>
              <strong className="WorkforceSoluationFour__metricLabel">
                {item.label}
              </strong>
              <p className="WorkforceSoluationFour__metricSubtext">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Capability Cards */}
        <div className="WorkforceSoluationFour__cardsGrid">
          {capabilities.map((cap) => (
            <div key={cap.id} className="WorkforceSoluationFour__card">
              <span className="WorkforceSoluationFour__cardTag">{cap.tag}</span>
              <h3 className="WorkforceSoluationFour__cardTitle">{cap.title}</h3>
              <p className="WorkforceSoluationFour__cardDesc">
                {cap.description}
              </p>
              <div className="WorkforceSoluationFour__cardFooter">
                <a
                  href="#workforce-inquiry"
                  className="WorkforceSoluationFour__cardLink"
                >
                  <span>Learn more</span>
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

        {/* Bottom Call to Action */}
        <div className="WorkforceSoluationFour__actionWrap">
          <a
            href="#contact-workforce"
            className="WorkforceSoluationFour__linkPrimary"
          >
            <span>Consult Prime Site Workforce Specialists</span>
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

export default WorkforceSoluationFour;