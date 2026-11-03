import React from "react";
import "./ManPowerServiceFour.css";

const manpowerPillars = [
  {
    id: 1,
    title: "Vetted & Certified Personnel",
    description:
      "All Prime Site personnel undergo rigorous multi-tier identity checks, background screenings, and certified site-safety accreditations.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Rapid Deployment & Flexibility",
    description:
      "Scalable field resources mobilized across project locations with agile shifts, peak-demand staffing, and centralized oversight.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Regulatory & Labor Compliance",
    description:
      "100% adherence to regional statutory regulations, worker welfare standards, transparent payroll, and industrial safety norms.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "On-Site Supervision & QA",
    description:
      "Dedicated field supervisors provide continuous shift evaluation, attendance tracking, and performance quality assurance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const ManPowerServiceFour = () => {
  return (
    <section className="ManPowerServiceFour" aria-label="Prime Site Manpower Solutions">
      <div className="ManPowerServiceFour__container">
        <div className="ManPowerServiceFour__header">
          <div className="ManPowerServiceFour__eyebrowWrap">
            <span className="ManPowerServiceFour__eyebrowLine" />
            <span className="ManPowerServiceFour__eyebrow">WORKFORCE EXCELLENCE</span>
          </div>
          <h2 className="ManPowerServiceFour__title">
            Prime Site <span className="ManPowerServiceFour__titleAccent">Manpower Solutions</span>
          </h2>
          <p className="ManPowerServiceFour__subtitle">
            Reliable, screened, and operationally ready staffing for commercial,
            industrial, and logistics infrastructure across all sites.
          </p>
        </div>

        <div className="ManPowerServiceFour__grid">
          {manpowerPillars.map((pillar) => (
            <div key={pillar.id} className="ManPowerServiceFour__card">
              <div className="ManPowerServiceFour__iconBox">{pillar.icon}</div>
              <h3 className="ManPowerServiceFour__cardTitle">{pillar.title}</h3>
              <p className="ManPowerServiceFour__cardText">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="ManPowerServiceFour__footer">
          <a href="#request-workforce" className="ManPowerServiceFour__ctaButton">
            <span>Request Prime Site Workforce</span>
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

export default ManPowerServiceFour;