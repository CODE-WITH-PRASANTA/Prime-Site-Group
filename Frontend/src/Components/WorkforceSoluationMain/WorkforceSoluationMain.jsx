import React, { useState, useEffect } from "react";
import "./WorkforceSoluationMain.css";

const WorkforceSoluationMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`WorkforceSoluationMain ${isLoaded ? "WorkforceSoluationMain--loaded" : ""}`}
      aria-label="Transguard Workforce Solutions Overview"
    >
      {/* 45% Visual Right Media */}
      <div className="WorkforceSoluationMain__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
          alt="Enterprise workforce deployment and human capital operations"
          className="WorkforceSoluationMain__mediaImage"
        />
        <div className="WorkforceSoluationMain__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="WorkforceSoluationMain__heroTag">
          <span className="WorkforceSoluationMain__heroTagDot" />
          <span className="WorkforceSoluationMain__heroTagTitle">ENTERPRISE TALENT STRATEGY</span>
          <span className="WorkforceSoluationMain__heroTagDivider" />
          <span className="WorkforceSoluationMain__heroTagSubtitle">SCALABLE WORKFORCE</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="WorkforceSoluationMain__leftPanel">
        <div className="WorkforceSoluationMain__panelTexture" />

        <div className="WorkforceSoluationMain__content">
          <div className="WorkforceSoluationMain__eyebrowWrap">
            <span className="WorkforceSoluationMain__eyebrowLine" />
            <span className="WorkforceSoluationMain__eyebrow">WORKFORCE EXCELLENCE</span>
          </div>

          <h1 className="WorkforceSoluationMain__title">
            Transguard <span className="WorkforceSoluationMain__titleAccent">Workforce Solutions</span>
          </h1>

          <p className="WorkforceSoluationMain__lead">
            Delivering agile, end-to-end workforce strategies and scalable contingent staffing 
            to power tier-one enterprises, major giga-projects, and critical supply chains across the UAE.
          </p>

          <p className="WorkforceSoluationMain__description">
            From executive secondment and high-volume project resourcing to full cross-border visa compliance, 
            performance coaching, and workforce accommodation management — we deliver turnkey staffing 
            architecture designed to eliminate friction and maximize operational yield.
          </p>

          {/* Service Feature Highlights */}
          <div className="WorkforceSoluationMain__features">
            <span className="WorkforceSoluationMain__featurePill">
              <span className="WorkforceSoluationMain__featureDot" />
              Strategic Contingent Staffing
            </span>
            <span className="WorkforceSoluationMain__featurePill">
              <span className="WorkforceSoluationMain__featureDot" />
              Volume Recruitment & Onboarding
            </span>
            <span className="WorkforceSoluationMain__featurePill">
              <span className="WorkforceSoluationMain__featureDot" />
              Managed Service Provision (MSP)
            </span>
            <span className="WorkforceSoluationMain__featurePill">
              <span className="WorkforceSoluationMain__featureDot" />
              MOHRE & Visa Compliance Management
            </span>
          </div>

          {/* Action Row */}
          <div className="WorkforceSoluationMain__actionRow">
            <a href="#consult-workforce" className="WorkforceSoluationMain__btnPrimary">
              <span>Request Talent Strategy</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#careers" className="WorkforceSoluationMain__btnOutline">
              <span>Explore Open Roles</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="WorkforceSoluationMain__watermark" aria-hidden="true">
          WORKFORCE
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="WorkforceSoluationMain__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default WorkforceSoluationMain;