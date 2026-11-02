import React, { useState, useEffect } from "react";
import "./PrimeSiteDeliveryMain.css";

const PrimeSiteDeliveryMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`PrimeSiteDelivery ${isLoaded ? "PrimeSiteDelivery--loaded" : ""}`}
      aria-label="Prime Site Last-Mile and Express Delivery Services Overview"
    >
      {/* 45% Visual Right Media (Fleet Logistics Background) */}
      <div className="PrimeSiteDelivery__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2400&q=90"
          alt="Prime Site express logistics delivery fleet and fulfilment operations"
          className="PrimeSiteDelivery__mediaImage"
        />
        <div className="PrimeSiteDelivery__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="PrimeSiteDelivery__heroTag">
          <span className="PrimeSiteDelivery__heroTagDot" />
          <span className="PrimeSiteDelivery__heroTagTitle">EXPRESS DISPATCH</span>
          <span className="PrimeSiteDelivery__heroTagDivider" />
          <span className="PrimeSiteDelivery__heroTagSubtitle">LAST-MILE LOGISTICS</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="PrimeSiteDelivery__leftPanel">
        <div className="PrimeSiteDelivery__panelTexture" />

        <div className="PrimeSiteDelivery__content">
          <div className="PrimeSiteDelivery__eyebrowWrap">
            <span className="PrimeSiteDelivery__eyebrowLine" />
            <span className="PrimeSiteDelivery__eyebrow">SUPPLY CHAIN & COURIER</span>
          </div>

          <h1 className="PrimeSiteDelivery__title">
            PRIME SITE <span className="PrimeSiteDelivery__titleAccent">Delivery</span>
          </h1>

          <p className="PrimeSiteDelivery__lead">
            An industry-leading partner in end-to-end fulfilment and last-mile courier solutions,
            Prime Site Delivery connects global enterprises, e-commerce giants, and local businesses
            to customers with rapid precision across the UAE.
          </p>

          <p className="PrimeSiteDelivery__description">
            Powered by smart GPS dispatch algorithms, real-time tracking portals, temperature-controlled
            fleet solutions, and dedicated couriers to ensure reliable, zero-delay distribution around the clock.
          </p>

          {/* Service Feature Highlights */}
          <div className="PrimeSiteDelivery__features">
            <span className="PrimeSiteDelivery__featurePill">
              <span className="PrimeSiteDelivery__featureDot" />
              Same-Day On-Demand Courier
            </span>
            <span className="PrimeSiteDelivery__featurePill">
              <span className="PrimeSiteDelivery__featureDot" />
              E-Commerce Last-Mile Fulfillment
            </span>
            <span className="PrimeSiteDelivery__featurePill">
              <span className="PrimeSiteDelivery__featureDot" />
              Cold Chain & Pharma Transport
            </span>
            <span className="PrimeSiteDelivery__featurePill">
              <span className="PrimeSiteDelivery__featureDot" />
              Secure Document & Parcel Transit
            </span>
            <span className="PrimeSiteDelivery__featurePill">
              <span className="PrimeSiteDelivery__featureDot" />
              Real-Time Telematics & Tracking
            </span>
          </div>

          {/* Action Row */}
          <div className="PrimeSiteDelivery__actionRow">
            <a href="#quote" className="PrimeSiteDelivery__btnPrimary">
              <span>Get a Delivery Quote</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#track" className="PrimeSiteDelivery__btnOutline">
              <span>Track Consignment</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="PrimeSiteDelivery__watermark" aria-hidden="true">
          DELIVERY
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="PrimeSiteDelivery__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default PrimeSiteDeliveryMain;