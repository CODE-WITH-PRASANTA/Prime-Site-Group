
import React from "react";
import "./ContactMain.css";

const ContactMain = () => {
  return (
    <section className="ContactMain">
      <div className="ContactMain-background" />

      <div className="ContactMain-overlay" />

      <div className="ContactMain-geometricShape" />

      <div className="ContactMain-container">
        <div className="ContactMain-content">
          <span className="ContactMain-eyebrow">
            <span className="ContactMain-eyebrowLine" />
            GET IN TOUCH
          </span>

          <h1 className="ContactMain-title">
            Contact
            <span className="ContactMain-titleAccent"> Us</span>
          </h1>

          <p className="ContactMain-description">
            Should you wish to speak to a member of our team,
            please contact us using the details below. We're
            here to help with your questions and enquiries.
          </p>

          <div className="ContactMain-divider">
            <span />
            <span />
            <span />
          </div>

          <p className="ContactMain-subtitle">
            We look forward to hearing from you.
          </p>
        </div>
      </div>

      <div className="ContactMain-bottomAccent" />
    </section>
  );
};

export default ContactMain;
