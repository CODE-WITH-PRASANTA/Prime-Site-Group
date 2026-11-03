import React, { useState, useEffect } from "react";
import "./ManPowerServiceMain.css";

const ManPowerServiceMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`ManPowerServiceMain ${isLoaded ? "ManPowerServiceMain--loaded" : ""}`}
      aria-label="Transguard Manpower Solutions Overview"
    >
      {/* 45% Visual Right Media (Workforce Operations Background) */}
      <div className="ManPowerServiceMain__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
          alt="Professional industrial and facility manpower deployment operations"
          className="ManPowerServiceMain__mediaImage"
        />
        <div className="ManPowerServiceMain__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="ManPowerServiceMain__heroTag">
          <span className="ManPowerServiceMain__heroTagDot" />
          <span className="ManPowerServiceMain__heroTagTitle">SKILLED & UNSKILLED WORKFORCE</span>
          <span className="ManPowerServiceMain__heroTagDivider" />
          <span className="ManPowerServiceMain__heroTagSubtitle">TALENT OUTSOURCING</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="ManPowerServiceMain__leftPanel">
        <div className="ManPowerServiceMain__panelTexture" />

        <div className="ManPowerServiceMain__content">
          <div className="ManPowerServiceMain__eyebrowWrap">
            <span className="ManPowerServiceMain__eyebrowLine" />
            <span className="ManPowerServiceMain__eyebrow">HUMAN CAPITAL SOLUTIONS</span>
          </div>

          <h1 className="ManPowerServiceMain__title">
            PRIME SITE <span className="ManPowerServiceMain__titleAccent">Manpower Services</span>
          </h1>

          <p className="ManPowerServiceMain__lead">
            The UAE's trusted partner for end-to-end workforce outsourcing, providing
            scalable blue-collar, white-collar, and specialist talent to construction,
            hospitality, aviation, logistics, and corporate sectors nationwide.
          </p>

          <p className="ManPowerServiceMain__description">
            Combining rigorous international recruitment, fully compliant MOHRE sponsorship,
            dedicated welfare accommodations, and bespoke technical training academies to 
            guarantee high-productivity human capital with zero administrative friction.
          </p>

          {/* Service Feature Highlights */}
          <div className="ManPowerServiceMain__features">
            <span className="ManPowerServiceMain__featurePill">
              <span className="ManPowerServiceMain__featureDot" />
              Blue-Collar & Technical Labor
            </span>
            <span className="ManPowerServiceMain__featurePill">
              <span className="ManPowerServiceMain__featureDot" />
              Hospitality & Event Staffing
            </span>
            <span className="ManPowerServiceMain__featurePill">
              <span className="ManPowerServiceMain__featureDot" />
              Aviation Ground Handling Support
            </span>
            <span className="ManPowerServiceMain__featurePill">
              <span className="ManPowerServiceMain__featureDot" />
              Full Payroll & Welfare Compliance
            </span>
          </div>

          {/* Action Row */}
          <div className="ManPowerServiceMain__actionRow">
            <a href="#hire-talent" className="ManPowerServiceMain__btnPrimary">
              <span>Request Workforce Audit</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#careers" className="ManPowerServiceMain__btnOutline">
              <span>Join Our Workforce</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="ManPowerServiceMain__watermark" aria-hidden="true">
          TALENT
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="ManPowerServiceMain__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default ManPowerServiceMain;