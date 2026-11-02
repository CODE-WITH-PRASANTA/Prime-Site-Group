import React, { useState, useEffect } from "react";
import "./SecurityServicesMain.css";

const SecurityServicesMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`SecurityServicesMain ${isLoaded ? "SecurityServicesMain--loaded" : ""}`}
      aria-label="Transguard Security Services Overview"
    >
      {/* 45% Visual Right Media */}
      <div className="SecurityServicesMain__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
          alt="Armoured cash transit logistics vehicles and operations facility"
          className="SecurityServicesMain__mediaImage"
        />
        <div className="SecurityServicesMain__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="SecurityServicesMain__heroTag">
          <span className="SecurityServicesMain__heroTagDot" />
          <span className="SecurityServicesMain__heroTagTitle">INTEGRATED GUARDING & DEFENCE</span>
          <span className="SecurityServicesMain__heroTagDivider" />
          <span className="SecurityServicesMain__heroTagSubtitle">ELITE ASSET PROTECTION</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="SecurityServicesMain__leftPanel">
        <div className="SecurityServicesMain__panelTexture" />

        <div className="SecurityServicesMain__content">
          <div className="SecurityServicesMain__eyebrowWrap">
            <span className="SecurityServicesMain__eyebrowLine" />
            <span className="SecurityServicesMain__eyebrow">TOTAL DEFENCE & SURVEILLANCE</span>
          </div>

          <h1 className="SecurityServicesMain__title">
            Transguard <span className="SecurityServicesMain__titleAccent">Security Services</span>
          </h1>

          <p className="SecurityServicesMain__lead">
            The region's benchmark in certified physical guarding, high-threat asset protection, 
            and intelligent surveillance systems — safeguarding government, enterprise, and premier 
            infrastructure assets across the UAE 24/7/365.
          </p>

          <p className="SecurityServicesMain__description">
            Uniting SIRA-certified tactical security personnel, intelligent command-and-control operations, 
            and advanced biometric access protocols to deliver an uncompromised defensive perimeter tailored 
            to tier-one regulatory standards.
          </p>

          {/* Service Feature Highlights */}
          <div className="SecurityServicesMain__features">
            <span className="SecurityServicesMain__featurePill">
              <span className="SecurityServicesMain__featureDot" />
              Manned Guarding & Patrols
            </span>
            <span className="SecurityServicesMain__featurePill">
              <span className="SecurityServicesMain__featureDot" />
              Executive & VIP Close Protection
            </span>
            <span className="SecurityServicesMain__featurePill">
              <span className="SecurityServicesMain__featureDot" />
              CCTV & SOC Monitoring
            </span>
            <span className="SecurityServicesMain__featurePill">
              <span className="SecurityServicesMain__featureDot" />
              K9 Explosive & Drug Detection
            </span>
          </div>

          {/* Action Row */}
          <div className="SecurityServicesMain__actionRow">
            <a href="#enquire" className="SecurityServicesMain__btnPrimary">
              <span>Request Security Audit</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#careers" className="SecurityServicesMain__btnOutline">
              <span>Join Security Team</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="SecurityServicesMain__watermark" aria-hidden="true">
          SECURE
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="SecurityServicesMain__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default SecurityServicesMain;