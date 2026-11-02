import React, { useState, useEffect } from "react";
import "./KitchenMaintenanceSolutionsMain.css";

const KitchenMaintenanceSolutionsMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`KitchenMaintenanceSolutionsMain ${isLoaded ? "KitchenMaintenanceSolutionsMain--loaded" : ""}`}
      aria-label="Commercial Kitchen Maintenance and Equipment Engineering Solutions Overview"
    >
      {/* 45% Visual Right Media (Commercial Kitchen & Engineering Background) */}
      <div className="KitchenMaintenanceSolutionsMain__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
          alt="Commercial kitchen equipment servicing, duct extraction, and preventative maintenance"
          className="KitchenMaintenanceSolutionsMain__mediaImage"
        />
        <div className="KitchenMaintenanceSolutionsMain__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="KitchenMaintenanceSolutionsMain__heroTag">
          <span className="KitchenMaintenanceSolutionsMain__heroTagDot" />
          <span className="KitchenMaintenanceSolutionsMain__heroTagTitle">COMMERCIAL KITCHEN ENGINEERING</span>
          <span className="KitchenMaintenanceSolutionsMain__heroTagDivider" />
          <span className="KitchenMaintenanceSolutionsMain__heroTagSubtitle">HACCP & MUNICIPALITY COMPLIANT</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="KitchenMaintenanceSolutionsMain__leftPanel">
        <div className="KitchenMaintenanceSolutionsMain__panelTexture" />

        <div className="KitchenMaintenanceSolutionsMain__content">
          <div className="KitchenMaintenanceSolutionsMain__eyebrowWrap">
            <span className="KitchenMaintenanceSolutionsMain__eyebrowLine" />
            <span className="KitchenMaintenanceSolutionsMain__eyebrow">EQUIPMENT & EXTRACTION CARE</span>
          </div>

          <h1 className="KitchenMaintenanceSolutionsMain__title">
            Kitchen Maintenance <span className="KitchenMaintenanceSolutionsMain__titleAccent">Solutions</span>
          </h1>

          <p className="KitchenMaintenanceSolutionsMain__lead">
            The UAE's specialized commercial kitchen maintenance partner, providing turnkey preventative 
            servicing, emergency breakdown support, and deep degreasing engineering for leading hotels, 
            cloud kitchens, restaurants, and catering facilities nationwide.
          </p>

          <p className="KitchenMaintenanceSolutionsMain__description">
            Combining certified catering equipment engineers, specialized exhaust duct degreasing teams, 
            rapid OEM spare parts sourcing, and strict compliance with Dubai Civil Defence and HACCP hygiene 
            codes to eliminate operational downtime and mitigate kitchen fire hazards.
          </p>

          {/* Service Feature Highlights */}
          <div className="KitchenMaintenanceSolutionsMain__features">
            <span className="KitchenMaintenanceSolutionsMain__featurePill">
              <span className="KitchenMaintenanceSolutionsMain__featureDot" />
              Heavy Cooking & Bakery Equipment PPM
            </span>
            <span className="KitchenMaintenanceSolutionsMain__featurePill">
              <span className="KitchenMaintenanceSolutionsMain__featureDot" />
              Exhaust Hood & Duct Deep Degreasing
            </span>
            <span className="KitchenMaintenanceSolutionsMain__featurePill">
              <span className="KitchenMaintenanceSolutionsMain__featureDot" />
              Walk-In Chillers & Freezers Maintenance
            </span>
            <span className="KitchenMaintenanceSolutionsMain__featurePill">
              <span className="KitchenMaintenanceSolutionsMain__featureDot" />
              24/7 Breakdown & Gas Safety Audits
            </span>
          </div>

          {/* Action Row */}
          <div className="KitchenMaintenanceSolutionsMain__actionRow">
            <a href="#kitchen-survey" className="KitchenMaintenanceSolutionsMain__btnPrimary">
              <span>Book Kitchen Technical Survey</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#amc-contracts" className="KitchenMaintenanceSolutionsMain__btnOutline">
              <span>Kitchen AMC Plans</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="KitchenMaintenanceSolutionsMain__watermark" aria-hidden="true">
          KITCHEN
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="KitchenMaintenanceSolutionsMain__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default KitchenMaintenanceSolutionsMain;