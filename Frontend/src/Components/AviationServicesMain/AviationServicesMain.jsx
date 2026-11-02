import React, { useState, useEffect } from "react";
import "./AviationServicesMain.css";

const AviationServicesMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`AviationServicesMain ${isLoaded ? "AviationServicesMain--loaded" : ""}`}
      aria-label="Aviation and Airport Ground Handling Services Overview"
    >
      {/* 45% Visual Right Media (Aviation & Airside Operations Background) */}
      <div className="AviationServicesMain__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
          alt="International airport airside ground logistics and tarmac handling fleet"
          className="AviationServicesMain__mediaImage"
        />
        <div className="AviationServicesMain__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="AviationServicesMain__heroTag">
          <span className="AviationServicesMain__heroTagDot" />
          <span className="AviationServicesMain__heroTagTitle">AIRSIDE & RAMP LOGISTICS</span>
          <span className="AviationServicesMain__heroTagDivider" />
          <span className="AviationServicesMain__heroTagSubtitle">PASSENGER & CARGO CARE</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="AviationServicesMain__leftPanel">
        <div className="AviationServicesMain__panelTexture" />

        <div className="AviationServicesMain__content">
          <div className="AviationServicesMain__eyebrowWrap">
            <span className="AviationServicesMain__eyebrowLine" />
            <span className="AviationServicesMain__eyebrow">AVIATION LOGISTICS & SUPPORT</span>
          </div>

          <h1 className="AviationServicesMain__title">
            Transguard <span className="AviationServicesMain__titleAccent">Aviation Services</span>
          </h1>

          <p className="AviationServicesMain__lead">
            The premier aviation support partner powering global air travel hubs, delivering
            airside ramp support, high-security passenger workflows, and cargo logistics 
            across the UAE's busiest international terminals.
          </p>

          <p className="AviationServicesMain__description">
            Combining IATA-certified ground personnel, rigorous aviation security protocols, 
            rapid turn-around ramp management, and specialized PRM passenger assistance to 
            guarantee zero-delay airfield performance and passenger satisfaction.
          </p>

          {/* Service Feature Highlights */}
          <div className="AviationServicesMain__features">
            <span className="AviationServicesMain__featurePill">
              <span className="AviationServicesMain__featureDot" />
              Airside Ramp & Baggage Handling
            </span>
            <span className="AviationServicesMain__featurePill">
              <span className="AviationServicesMain__featureDot" />
              Passenger & PRM Mobility Support
            </span>
            <span className="AviationServicesMain__featurePill">
              <span className="AviationServicesMain__featureDot" />
              Aviation Security & Profiling
            </span>
            <span className="AviationServicesMain__featurePill">
              <span className="AviationServicesMain__featureDot" />
              Aircraft Cabin Deep Grooming
            </span>
          </div>

          {/* Action Row */}
          <div className="AviationServicesMain__actionRow">
            <a href="#aviation-enquiry" className="AviationServicesMain__btnPrimary">
              <span>Request Ground Support</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#careers" className="AviationServicesMain__btnOutline">
              <span>Join Aviation Team</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="AviationServicesMain__watermark" aria-hidden="true">
          AVIATION
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="AviationServicesMain__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default AviationServicesMain;