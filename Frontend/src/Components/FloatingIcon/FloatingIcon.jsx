
import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaArrowUp,
} from "react-icons/fa";

import "./FloatingIcon.css";

const FloatingIcon = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  const whatsappNumber = "9718828734";
  const callNumber = "+9718828732";

  // SHOW BACK-TO-TOP BUTTON AFTER SCROLLING
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // OPEN WHATSAPP CHAT
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello! I would like to know more about your construction services."
    );

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // OPEN PHONE DIALER
  const handleCall = () => {
    window.location.href = `tel:${callNumber}`;
  };

  // SCROLL TO TOP
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="FloatingIcon-wrapper">

      {/* WHATSAPP BUTTON */}
      <button
        type="button"
        className="FloatingIcon-button FloatingIcon-whatsapp"
        onClick={handleWhatsApp}
        aria-label="Chat with us on WhatsApp"
        title="WhatsApp"
      >
        <FaWhatsapp className="FloatingIcon-icon" />
        <span className="FloatingIcon-tooltip">
          Chat on WhatsApp
        </span>
      </button>

      {/* CALL BUTTON */}
      <a
        href={`tel:${callNumber}`}
        className="FloatingIcon-button FloatingIcon-call"
        aria-label="Call us"
        title="Call Us"
      >
        <FaPhoneAlt className="FloatingIcon-icon" />
        <span className="FloatingIcon-tooltip">
          Call Us
        </span>
      </a>

      {/* BACK TO TOP BUTTON */}
      <button
        type="button"
        className={`FloatingIcon-button FloatingIcon-top ${
          showTopButton ? "FloatingIcon-top-visible" : ""
        }`}
        onClick={handleScrollToTop}
        aria-label="Back to top"
        title="Back to Top"
        tabIndex={showTopButton ? 0 : -1}
      >
        <FaArrowUp className="FloatingIcon-icon" />
        <span className="FloatingIcon-tooltip">
          Back to Top
        </span>
      </button>

    </div>
  );
};

export default FloatingIcon;
