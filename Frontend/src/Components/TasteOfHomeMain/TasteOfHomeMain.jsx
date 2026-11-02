import React, { useState, useEffect } from "react";
import "./TasteOfHomeMain.css";

const TasteOfHomeMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`TasteOfHome ${isLoaded ? "TasteOfHome--loaded" : ""}`}
      aria-label="Prime Site Taste of Home Industrial Catering and Dining Overview"
    >
      {/* 45% Visual Right Media (Catering & Culinary Background) */}
      <div className="TasteOfHome__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2400&q=90"
          alt="Prime Site Taste of Home industrial culinary kitchen and dining hospitality"
          className="TasteOfHome__mediaImage"
        />
        <div className="TasteOfHome__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="TasteOfHome__heroTag">
          <span className="TasteOfHome__heroTagDot" />
          <span className="TasteOfHome__heroTagTitle">CULINARY EXCELLENCE</span>
          <span className="TasteOfHome__heroTagDivider" />
          <span className="TasteOfHome__heroTagSubtitle">LARGE-SCALE CATERING</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="TasteOfHome__leftPanel">
        <div className="TasteOfHome__panelTexture" />

        <div className="TasteOfHome__content">
          <div className="TasteOfHome__eyebrowWrap">
            <span className="TasteOfHome__eyebrowLine" />
            <span className="TasteOfHome__eyebrow">FOOD & DINING SERVICES</span>
          </div>

          <h1 className="TasteOfHome__title">
            PRIME SITE <span className="TasteOfHome__titleAccent">Taste of Home</span>
          </h1>

          <p className="TasteOfHome__lead">
            Prime Site’s dedicated culinary division, Taste of Home, provides nutritious,
            authentic, and large-scale dining solutions tailored for multinational workforces,
            corporate headquarters, educational campuses, and healthcare institutions across the UAE.
          </p>

          <p className="TasteOfHome__description">
            Operating HACCP-certified commercial kitchens that prepare tens of thousands of wholesome
            meals daily, our expert chefs recreate multi-ethnic culinary traditions with rigorous food
            safety, balanced nutritional science, and sustainably sourced ingredients.
          </p>

          {/* Service Feature Highlights */}
          <div className="TasteOfHome__features">
            <span className="TasteOfHome__featurePill">
              <span className="TasteOfHome__featureDot" />
              High-Volume Bulk Catering
            </span>
            <span className="TasteOfHome__featurePill">
              <span className="TasteOfHome__featureDot" />
              Multi-Cuisine Menus
            </span>
            <span className="TasteOfHome__featurePill">
              <span className="TasteOfHome__featureDot" />
              HACCP & ISO 22000 Certified
            </span>
            <span className="TasteOfHome__featurePill">
              <span className="TasteOfHome__featureDot" />
              Corporate Cafeteria Operations
            </span>
            <span className="TasteOfHome__featurePill">
              <span className="TasteOfHome__featureDot" />
              Dietitian-Approved Menus
            </span>
          </div>

          {/* Action Row */}
          <div className="TasteOfHome__actionRow">
            <a href="#catering-enquiry" className="TasteOfHome__btnPrimary">
              <span>Request Catering Proposal</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#sample-menus" className="TasteOfHome__btnOutline">
              <span>View Sample Menus</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="TasteOfHome__watermark" aria-hidden="true">
          DINING
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="TasteOfHome__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default TasteOfHomeMain;