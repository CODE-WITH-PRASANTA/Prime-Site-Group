import React, { useState, useEffect } from "react";
import "./FacilityManagementMain.css";

const FacilityManagementMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`FacilityManagementMain ${isLoaded ? "FacilityManagementMain--loaded" : ""}`}
      aria-label="Integrated Facility Management Services Overview"
    >
      {/* 45% Visual Right Media (Facilities Operations Background) */}
      <div className="FacilityManagementMain__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
          alt="Modern corporate tower asset operations and facility engineering"
          className="FacilityManagementMain__mediaImage"
        />
        <div className="FacilityManagementMain__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="FacilityManagementMain__heroTag">
          <span className="FacilityManagementMain__heroTagDot" />
          <span className="FacilityManagementMain__heroTagTitle">INTEGRATED FM & ASSET CARE</span>
          <span className="FacilityManagementMain__heroTagDivider" />
          <span className="FacilityManagementMain__heroTagSubtitle">SMART BUILDING OPS</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="FacilityManagementMain__leftPanel">
        <div className="FacilityManagementMain__panelTexture" />

        <div className="FacilityManagementMain__content">
          <div className="FacilityManagementMain__eyebrowWrap">
            <span className="FacilityManagementMain__eyebrowLine" />
            <span className="FacilityManagementMain__eyebrow">INTEGRATED FM SOLUTIONS</span>
          </div>

          <h1 className="FacilityManagementMain__title">
            Prime Site <span className="FacilityManagementMain__titleAccent">Facility Management</span>
          </h1>

          <p className="FacilityManagementMain__lead">
            An industry leader in total facility management, delivering optimized building 
            performance, lifecycle asset care, and sustainable workplace environments to 
            premier real estate portfolios, commercial towers, and industrial estates across the UAE.
          </p>

          <p className="FacilityManagementMain__description">
            Uniting computer-aided facility management (CAFM) intelligence, predictive IoT 
            energy monitoring, and certified technical engineering squads to ensure uninterrupted 
            uptime, regulatory compliance, and pristine environmental hygiene.
          </p>

          {/* Service Feature Highlights */}
          <div className="FacilityManagementMain__features">
            <span className="FacilityManagementMain__featurePill">
              <span className="FacilityManagementMain__featureDot" />
              Hard FM & MEP Engineering
            </span>
            <span className="FacilityManagementMain__featurePill">
              <span className="FacilityManagementMain__featureDot" />
              Soft Services & Hygiene Care
            </span>
            <span className="FacilityManagementMain__featurePill">
              <span className="FacilityManagementMain__featureDot" />
              CAFM & IoT Energy Auditing
            </span>
            <span className="FacilityManagementMain__featurePill">
              <span className="FacilityManagementMain__featureDot" />
              HVAC & Critical Infrastructure
            </span>
          </div>

          {/* Action Row */}
          <div className="FacilityManagementMain__actionRow">
            <a href="#facility-audit" className="FacilityManagementMain__btnPrimary">
              <span>Book Facility Survey</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#careers" className="FacilityManagementMain__btnOutline">
              <span>Explore FM Careers</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="FacilityManagementMain__watermark" aria-hidden="true">
          FACILITY
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="FacilityManagementMain__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default FacilityManagementMain;