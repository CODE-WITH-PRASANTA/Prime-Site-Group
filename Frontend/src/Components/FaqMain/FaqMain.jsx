import React from "react";
import "./FaqMain.css";

const FaqMain = () => {
  return (
    <section className="FaqMain">
      <div className="FaqMain-background" />

      <div className="FaqMain-overlay" />

      <div className="FaqMain-geometricShape" />

      <div className="FaqMain-container">
        <div className="FaqMain-content">
          <span className="FaqMain-eyebrow">
            <span className="FaqMain-eyebrowLine" />
            HELP & SUPPORT
          </span>

          <h1 className="FaqMain-title">
            Frequently
            <span className="FaqMain-titleAccent"> Asked</span>
          </h1>

          <p className="FaqMain-description">
            Explore clear answers to our most common questions regarding
            service operations, onboarding, compliance, and custom contract
            agreements across the region.
          </p>

          <div className="FaqMain-divider">
            <span />
            <span />
            <span />
          </div>

          <p className="FaqMain-subtitle">
            Everything you need to know about partnering with us.
          </p>
        </div>
      </div>

      <div className="FaqMain-bottomAccent" />
    </section>
  );
};

export default FaqMain;