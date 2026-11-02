import React, { useState, useEffect } from "react";
import "./TransguardLivingMain.css";

const TransguardLivingMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`TransguardLivingMain ${isLoaded ? "TransguardLivingMain--loaded" : ""}`}
      aria-label="Transguard Living Home Maintenance and Lifestyle Services Overview"
    >
      {/* 45% Visual Right Media (Residential Living & Home Care Background) */}
      <div className="TransguardLivingMain__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
          alt="Premium residential living maintenance, home sanitization, and care services"
          className="TransguardLivingMain__mediaImage"
        />
        <div className="TransguardLivingMain__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="TransguardLivingMain__heroTag">
          <span className="TransguardLivingMain__heroTagDot" />
          <span className="TransguardLivingMain__heroTagTitle">PREMIUM HOME MAINTENANCE</span>
          <span className="TransguardLivingMain__heroTagDivider" />
          <span className="TransguardLivingMain__heroTagSubtitle">RESIDENTIAL SERVICES</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="TransguardLivingMain__leftPanel">
        <div className="TransguardLivingMain__panelTexture" />

        <div className="TransguardLivingMain__content">
          <div className="TransguardLivingMain__eyebrowWrap">
            <span className="TransguardLivingMain__eyebrowLine" />
            <span className="TransguardLivingMain__eyebrow">HOME & LIFESTYLE CARE</span>
          </div>

          <h1 className="TransguardLivingMain__title">
            Transguard <span className="TransguardLivingMain__titleAccent">Living</span>
          </h1>

          <p className="TransguardLivingMain__lead">
            The UAE's trusted home care provider, delivering professional property maintenance, 
            deep sanitization, and personalized lifestyle assistance for villas and luxury 
            apartments across Dubai and the Emirates.
          </p>

          <p className="TransguardLivingMain__description">
            Bringing enterprise-grade facility standards directly to your residence with 
            vetted technicians, eco-friendly equipment, scheduled annual packages, and 24/7 
            emergency call-out coverage to keep your living space flawless and worry-free.
          </p>

          {/* Service Feature Highlights */}
          <div className="TransguardLivingMain__features">
            <span className="TransguardLivingMain__featurePill">
              <span className="TransguardLivingMain__featureDot" />
              Annual Maintenance Contracts (AMC)
            </span>
            <span className="TransguardLivingMain__featurePill">
              <span className="TransguardLivingMain__featureDot" />
              AC Servicing & Duct Cleaning
            </span>
            <span className="TransguardLivingMain__featurePill">
              <span className="TransguardLivingMain__featureDot" />
              Deep Cleaning & Sanitization
            </span>
            <span className="TransguardLivingMain__featurePill">
              <span className="TransguardLivingMain__featureDot" />
              Electrical, Plumbing & Handyman
            </span>
          </div>

          {/* Action Row */}
          <div className="TransguardLivingMain__actionRow">
            <a href="#book-service" className="TransguardLivingMain__btnPrimary">
              <span>Book Home Service</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#packages" className="TransguardLivingMain__btnOutline">
              <span>View AMC Packages</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="TransguardLivingMain__watermark" aria-hidden="true">
          LIVING
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="TransguardLivingMain__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default TransguardLivingMain;