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
      className={`TasteOfHomeMain ${isLoaded ? "TasteOfHomeMain--loaded" : ""}`}
      aria-label="Taste of Home Culinary and Catering Solutions Overview"
    >
      {/* 45% Visual Right Media (Culinary & Food Services Background) */}
      <div className="TasteOfHomeMain__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
          alt="Large-scale institutional catering and culinary operations"
          className="TasteOfHomeMain__mediaImage"
        />
        <div className="TasteOfHomeMain__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="TasteOfHomeMain__heroTag">
          <span className="TasteOfHomeMain__heroTagDot" />
          <span className="TasteOfHomeMain__heroTagTitle">ETHNIC & HOME-STYLE CATERING</span>
          <span className="TasteOfHomeMain__heroTagDivider" />
          <span className="TasteOfHomeMain__heroTagSubtitle">NUTRITIOUS VOLUME DINING</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="TasteOfHomeMain__leftPanel">
        <div className="TasteOfHomeMain__panelTexture" />

        <div className="TasteOfHomeMain__content">
          <div className="TasteOfHomeMain__eyebrowWrap">
            <span className="TasteOfHomeMain__eyebrowLine" />
            <span className="TasteOfHomeMain__eyebrow">AUTHENTIC CULINARY SOLUTIONS</span>
          </div>

          <h1 className="TasteOfHomeMain__title">
            Transguard <span className="TasteOfHomeMain__titleAccent">Taste of Home</span>
          </h1>

          <p className="TasteOfHomeMain__lead">
            The UAE’s dedicated high-volume ethnic catering specialist, preparing authentic, 
            nutritious, and comforting meals that recreate the warmth of home for thousands 
            of multicultural workforce teams across the nation daily.
          </p>

          <p className="TasteOfHomeMain__description">
            Operated within certified industrial central production kitchens, our HACCP-compliant 
            culinary teams blend regional spices, fresh farm produce, and balanced dietetic planning 
            to deliver wholesome culinary experiences at massive scale with unwavering hygiene standards.
          </p>

          {/* Service Feature Highlights */}
          <div className="TasteOfHomeMain__features">
            <span className="TasteOfHomeMain__featurePill">
              <span className="TasteOfHomeMain__featureDot" />
              Regional & Ethnic Menu Diversity
            </span>
            <span className="TasteOfHomeMain__featurePill">
              <span className="TasteOfHomeMain__featureDot" />
              HACCP & ISO 22000 Certified
            </span>
            <span className="TasteOfHomeMain__featurePill">
              <span className="TasteOfHomeMain__featureDot" />
              High-Volume Camp & Site Dining
            </span>
            <span className="TasteOfHomeMain__featurePill">
              <span className="TasteOfHomeMain__featureDot" />
              Dietetic & Nutritional Balance
            </span>
          </div>

          {/* Action Row */}
          <div className="TasteOfHomeMain__actionRow">
            <a href="#catering-enquiry" className="TasteOfHomeMain__btnPrimary">
              <span>Request Catering Proposal</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#menu-catalog" className="TasteOfHomeMain__btnOutline">
              <span>View Cuisine Options</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="TasteOfHomeMain__watermark" aria-hidden="true">
          HOME
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="TasteOfHomeMain__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default TasteOfHomeMain;