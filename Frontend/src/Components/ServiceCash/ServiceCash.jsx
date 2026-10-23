import React, { useState, useEffect } from "react";
import "./ServiceCash.css";

const ServiceCash = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`ServiceCash ${isLoaded ? "ServiceCash--loaded" : ""}`}
      aria-label="Transguard Cash Services Overview"
    >
      {/* 45% Visual Right Media (Armoured Fleet Background) */}
      <div className="ServiceCash__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
          alt="Armoured cash transit logistics vehicles and operations facility"
          className="ServiceCash__mediaImage"
        />
        <div className="ServiceCash__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="ServiceCash__heroTag">
          <span className="ServiceCash__heroTagDot" />
          <span className="ServiceCash__heroTagTitle">SECURE TRANSIT & CIT</span>
          <span className="ServiceCash__heroTagDivider" />
          <span className="ServiceCash__heroTagSubtitle">VALUABLES LOGISTICS</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="ServiceCash__leftPanel">
        <div className="ServiceCash__panelTexture" />

        <div className="ServiceCash__content">
          <div className="ServiceCash__eyebrowWrap">
            <span className="ServiceCash__eyebrowLine" />
            <span className="ServiceCash__eyebrow">CASH MANAGEMENT</span>
          </div>

          <h1 className="ServiceCash__title">
            Transguard <span className="ServiceCash__titleAccent">Cash Services[cite: 11]</span>
          </h1>

          <p className="ServiceCash__lead">
            A market leader in cash management and ATM services, Transguard Cash
            offers complete end-to-end cash management solutions to banks,
            financial institutions, major retailers as well as corporate and VIP
            customers[cite: 11].
          </p>

          <p className="ServiceCash__description">
            Combining state-of-the-art secure processing centres, cutting-edge cash
            analytics, and the region's largest high-security armoured transport
            fleet to guarantee zero-risk liquidity workflows across the UAE.
          </p>

          {/* Service Feature Highlights */}
          <div className="ServiceCash__features">
            <span className="ServiceCash__featurePill">
              <span className="ServiceCash__featureDot" />
              Cash-in-Transit (CIT)
            </span>
            <span className="ServiceCash__featurePill">
              <span className="ServiceCash__featureDot" />
              ATM Replenishment
            </span>
            <span className="ServiceCash__featurePill">
              <span className="ServiceCash__featureDot" />
              Cash Processing & Vaulting
            </span>
            <span className="ServiceCash__featurePill">
              <span className="ServiceCash__featureDot" />
              Smart Safe Deposit
            </span>
          </div>

          {/* Action Row */}
          <div className="ServiceCash__actionRow">
            <a href="#enquire" className="ServiceCash__btnPrimary">
              <span>Enquire Now[cite: 11]</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#careers" className="ServiceCash__btnOutline">
              <span>Work for Us[cite: 11]</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="ServiceCash__watermark" aria-hidden="true">
          CASH
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="ServiceCash__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default ServiceCash;