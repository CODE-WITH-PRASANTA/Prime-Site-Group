import React, { useState, useEffect } from "react";
import "./ManagedServicesMain.css";

const ManagedServicesMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`ManagedServicesMain ${isLoaded ? "ManagedServicesMain--loaded" : ""}`}
      aria-label="Enterprise Managed Services and Outsourcing Solutions Overview"
    >
      {/* 45% Visual Right Media (Enterprise Operations Background) */}
      <div className="ManagedServicesMain__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
          alt="Enterprise managed services operations center and infrastructure control"
          className="ManagedServicesMain__mediaImage"
        />
        <div className="ManagedServicesMain__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="ManagedServicesMain__heroTag">
          <span className="ManagedServicesMain__heroTagDot" />
          <span className="ManagedServicesMain__heroTagTitle">TURNKEY MSP & BPO</span>
          <span className="ManagedServicesMain__heroTagDivider" />
          <span className="ManagedServicesMain__heroTagSubtitle">BUSINESS PROCESS OUTSOURCING</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="ManagedServicesMain__leftPanel">
        <div className="ManagedServicesMain__panelTexture" />

        <div className="ManagedServicesMain__content">
          <div className="ManagedServicesMain__eyebrowWrap">
            <span className="ManagedServicesMain__eyebrowLine" />
            <span className="ManagedServicesMain__eyebrow">ENTERPRISE MANAGED SOLUTIONS</span>
          </div>

          <h1 className="ManagedServicesMain__title">
            Prime Site <span className="ManagedServicesMain__titleAccent">Managed Services</span>
          </h1>

          <p className="ManagedServicesMain__lead">
            The region's trusted managed service partner, empowering leading enterprises 
            with turnkey business process outsourcing, mission-critical operational management, 
            and automated workflow optimization across the UAE.
          </p>

          <p className="ManagedServicesMain__description">
            Combining dedicated on-site process managers, SLA-guaranteed operational delivery, 
            enterprise digital workflows, and integrated staffing governance to streamline corporate 
            functions, curtail operational overhead, and allow core business acceleration.
          </p>

          {/* Service Feature Highlights */}
          <div className="ManagedServicesMain__features">
            <span className="ManagedServicesMain__featurePill">
              <span className="ManagedServicesMain__featureDot" />
              Business Process Outsourcing (BPO)
            </span>
            <span className="ManagedServicesMain__featurePill">
              <span className="ManagedServicesMain__featureDot" />
              Mailroom & Logistics Management
            </span>
            <span className="ManagedServicesMain__featurePill">
              <span className="ManagedServicesMain__featureDot" />
              Contact Center & Helpdesk Operations
            </span>
            <span className="ManagedServicesMain__featurePill">
              <span className="ManagedServicesMain__featureDot" />
              Document Digitization & Archiving
            </span>
          </div>

          {/* Action Row */}
          <div className="ManagedServicesMain__actionRow">
            <a href="#managed-audit" className="ManagedServicesMain__btnPrimary">
              <span>Request Managed Solution</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#careers" className="ManagedServicesMain__btnOutline">
              <span>Explore MSP Careers</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="ManagedServicesMain__watermark" aria-hidden="true">
          MANAGED
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="ManagedServicesMain__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default ManagedServicesMain;