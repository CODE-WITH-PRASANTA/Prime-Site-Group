import React, { useState, useEffect } from "react";
import "./TransguardDeliveryMain.css";

const TransguardDeliveryMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`TransguardDeliveryMain ${isLoaded ? "TransguardDeliveryMain--loaded" : ""}`}
      aria-label="Transguard Delivery and Last-Mile Logistics Overview"
    >
      {/* 45% Visual Right Media (Last-Mile Fleet & Delivery Background) */}
      <div className="TransguardDeliveryMain__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=90"
          alt="Transguard express delivery fleet and distribution logistics operations"
          className="TransguardDeliveryMain__mediaImage"
        />
        <div className="TransguardDeliveryMain__mediaShade" />

        {/* Floating Sector Badge */}
        <div className="TransguardDeliveryMain__heroTag">
          <span className="TransguardDeliveryMain__heroTagDot" />
          <span className="TransguardDeliveryMain__heroTagTitle">EXPRESS LAST-MILE FULFILMENT</span>
          <span className="TransguardDeliveryMain__heroTagDivider" />
          <span className="TransguardDeliveryMain__heroTagSubtitle">NATIONWIDE FLEET LOGISTICS</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="TransguardDeliveryMain__leftPanel">
        <div className="TransguardDeliveryMain__panelTexture" />

        <div className="TransguardDeliveryMain__content">
          <div className="TransguardDeliveryMain__eyebrowWrap">
            <span className="TransguardDeliveryMain__eyebrowLine" />
            <span className="TransguardDeliveryMain__eyebrow">LAST-MILE & COURIER LOGISTICS</span>
          </div>

          <h1 className="TransguardDeliveryMain__title">
            Transguard <span className="TransguardDeliveryMain__titleAccent">Delivery</span>
          </h1>

          <p className="TransguardDeliveryMain__lead">
            The UAE's high-speed delivery and courier partner, driving seamless last-mile 
            distribution, rapid parcel fulfilment, and specialized corporate dispatch 
            networks across all seven Emirates with pinpoint accuracy.
          </p>

          <p className="TransguardDeliveryMain__description">
            Combining an extensive multi-tier fleet of certified bike riders and delivery vans, 
            intelligent automated route-dispatch algorithms, real-time telemetry tracking, and 
            strict custody security to guarantee rapid turnaround times for leading e-commerce, 
            retail, and banking clients.
          </p>

          {/* Service Feature Highlights */}
          <div className="TransguardDeliveryMain__features">
            <span className="TransguardDeliveryMain__featurePill">
              <span className="TransguardDeliveryMain__featureDot" />
              Same-Day & Express Dispatch
            </span>
            <span className="TransguardDeliveryMain__featurePill">
              <span className="TransguardDeliveryMain__featureDot" />
              E-Commerce & B2B Fulfilment
            </span>
            <span className="TransguardDeliveryMain__featurePill">
              <span className="TransguardDeliveryMain__featureDot" />
              Real-Time GPS Tracking & Telematics
            </span>
            <span className="TransguardDeliveryMain__featurePill">
              <span className="TransguardDeliveryMain__featureDot" />
              Secure Document & Card Delivery
            </span>
          </div>

          {/* Action Row */}
          <div className="TransguardDeliveryMain__actionRow">
            <a href="#book-delivery" className="TransguardDeliveryMain__btnPrimary">
              <span>Request Delivery Solutions</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#partner" className="TransguardDeliveryMain__btnOutline">
              <span>Partner With Us</span>
            </a>
          </div>
        </div>

        {/* Large Background Watermark */}
        <span className="TransguardDeliveryMain__watermark" aria-hidden="true">
          DELIVERY
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="TransguardDeliveryMain__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default TransguardDeliveryMain;