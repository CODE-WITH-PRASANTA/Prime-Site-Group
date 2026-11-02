import React from "react";
import "./CareerMain.css";

const CareerMain = () => {
  return (
    <section className="CareerMain">
      <div className="CareerMain-background" />

      <div className="CareerMain-overlay" />

      <div className="CareerMain-geometricShape" />

      <div className="CareerMain-container">
        <div className="CareerMain-content">
          <span className="CareerMain-eyebrow">
            <span className="CareerMain-eyebrowLine" />
            JOIN OUR TEAM
          </span>

          <h1 className="CareerMain-title">
            Build Your
            <span className="CareerMain-titleAccent"> Future</span>
          </h1>

          <p className="CareerMain-description">
            Discover rewarding career opportunities across integrated facilities
            management, technical engineering, and operations. Grow your potential
            with an industry-leading workforce.
          </p>

          <div className="CareerMain-divider">
            <span />
            <span />
            <span />
          </div>

          <p className="CareerMain-subtitle">
            Explore current vacancies and start your journey with us today.
          </p>
        </div>
      </div>

      <div className="CareerMain-bottomAccent" />
    </section>
  );
};

export default CareerMain;