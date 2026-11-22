
import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="Loader">

      <div className="Loader-background">
        <div className="Loader-glow Loader-glowOne"></div>
        <div className="Loader-glow Loader-glowTwo"></div>
      </div>

      <div className="Loader-content">

        {/* Animated Logo */}
        <div className="Loader-logoWrapper">

          <div className="Loader-ring Loader-ringOne"></div>
          <div className="Loader-ring Loader-ringTwo"></div>

          <div className="Loader-logo">
            <span className="Loader-logoP">P</span>
            <span className="Loader-logoDot"></span>
          </div>

        </div>

        {/* Brand Name */}
        <div className="Loader-brand">
          <h1>
            PRIME <span>SITE</span>
          </h1>

          <div className="Loader-brandLine">
            <span></span>
            <p>MANPOWER SOURCING SOLUTIONS</p>
            <span></span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="Loader-status">
          <span className="Loader-statusDot"></span>
          <p>PREPARING YOUR EXPERIENCE</p>
        </div>

        {/* Progress Bar */}
        <div className="Loader-progress">
          <div className="Loader-progressFill"></div>
        </div>

        {/* Bottom Text */}
        <div className="Loader-footer">
          <span>PREMIUM SERVICES</span>
          <span className="Loader-footerDivider"></span>
          <span>EXCELLENCE IN EVERY STEP</span>
        </div>

      </div>

      <div className="Loader-corner Loader-cornerTop">
        PRIME SITE
      </div>

      <div className="Loader-corner Loader-cornerBottom">
        EST. PROFESSIONAL SOLUTIONS
      </div>

    </div>
  );
};

export default Loader;
