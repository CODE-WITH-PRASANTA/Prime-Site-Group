import React, { useState, useEffect } from "react";
import "./PrimeSiteLivingMain.css";

const PrimeSiteLivingMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`PrimeSiteLiving ${isLoaded ? "PrimeSiteLiving--loaded" : ""}`}
      aria-label="Prime Site Living and Accommodations Overview"
    >
      {/* 45% Visual Right Media (Living Facilities Background) */}
      <div className="PrimeSiteLiving__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=90"
          alt="Modern Prime Site executive and staff living accommodations community"
          className="PrimeSiteLiving__mediaImage"
        />
        <div className="PrimeSiteLiving__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="PrimeSiteLiving__heroTag">
          <span className="PrimeSiteLiving__heroTagDot" />
          <span className="PrimeSiteLiving__heroTagTitle">MODERN COMMUNITIES</span>
          <span className="PrimeSiteLiving__heroTagDivider" />
          <span className="PrimeSiteLiving__heroTagSubtitle">PREMIUM RESIDENCES</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="PrimeSiteLiving__leftPanel">
        <div className="PrimeSiteLiving__panelTexture" />

        <div className="PrimeSiteLiving__content">
          <div className="PrimeSiteLiving__eyebrowWrap">
            <span className="PrimeSiteLiving__eyebrowLine" />
            <span className="PrimeSiteLiving__eyebrow">ACCOMMODATION & HOSPITALITY</span>
          </div>

          <h1 className="PrimeSiteLiving__title">
            PRIME SITE <span className="PrimeSiteLiving__titleAccent">Living</span>
          </h1>

          <p className="PrimeSiteLiving__lead">
            Setting benchmark standards in staff accommodation and residential management,
            Prime Site Living delivers purpose-built, high-comfort living spaces for large
            workforces, healthcare teams, and corporate hospitality personnel.
          </p>

          <p className="PrimeSiteLiving__description">
            We deliver self-contained, fully managed residential complexes equipped with 
            recreational facilities, high-capacity catering, 24/7 security, healthcare 
            clinics, and wellness amenities designed to foster resident well-being and productivity.
          </p>

          {/* Service Feature Highlights */}
          <div className="PrimeSiteLiving__features">
            <span className="PrimeSiteLiving__featurePill">
              <span className="PrimeSiteLiving__featureDot" />
              Turnkey Facility Management
            </span>
            <span className="PrimeSiteLiving__featurePill">
              <span className="PrimeSiteLiving__featureDot" />
              Nutritional Catering & Dining
            </span>
            <span className="PrimeSiteLiving__featurePill">
              <span className="PrimeSiteLiving__featureDot" />
              24/7 Health & Wellness Clinics
            </span>
            <span className="PrimeSiteLiving__featurePill">
              <span className="PrimeSiteLiving__featureDot" />
              Smart Laundry & Housekeeping
            </span>
            <span className="PrimeSiteLiving__featurePill">
              <span className="PrimeSiteLiving__featureDot" />
              Sports & Leisure Hubs
            </span>
          </div>

          {/* Action Row */}
          <div className="PrimeSiteLiving__actionRow">
            <a href="#enquire" className="PrimeSiteLiving__btnPrimary">
              <span>Book a Consultation</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#view-locations" className="PrimeSiteLiving__btnOutline">
              <span>Explore Facilities</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="PrimeSiteLiving__watermark" aria-hidden="true">
          LIVING
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="PrimeSiteLiving__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default PrimeSiteLivingMain;