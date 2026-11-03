import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Building2,
  HardHat,
  CheckCircle2,
} from "lucide-react";

import "./Footer.css";
import logo from "../../assets/PRIME SITE LOGO.png";

const SocialIcon = ({ name }) => {
  const commonProps = {
    width: 19,
    height: 19,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };

  switch (name) {
    case "Facebook":
      return (
        <svg {...commonProps}>
          <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
        </svg>
      );

    case "Instagram":
      return (
        <svg {...commonProps}>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="17.5" cy="6.8" r="1.2" />
        </svg>
      );

    case "LinkedIn":
      return (
        <svg {...commonProps}>
          <path d="M6.5 8.5H3.2V21h3.3V8.5ZM4.85 3a1.95 1.95 0 1 0 0 3.9 1.95 1.95 0 0 0 0-3.9ZM21 13.8c0-3.75-2-5.5-4.65-5.5a4 4 0 0 0-3.6 1.95V8.5H9.5V21h3.3v-6.2c0-1.65.32-3.25 2.36-3.25 2.02 0 2.05 1.9 2.05 3.35V21H21v-7.2Z" />
        </svg>
      );

    case "Twitter":
      return (
        <svg {...commonProps}>
          <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.4L5.4 22H2.2l7.3-8.4L1.7 2h6.5l4.5 6.9L18.9 2Zm-1.1 18h1.7L7.2 3.9H5.4L17.8 20Z" />
        </svg>
      );

    default:
      return null;
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Contact information
  const phoneNumber = "+9718828732";
  const whatsappNumber = "9718828734";

  const officeAddress =
    "Dar Al Salam Building, Liwa Street, 1st Floor, Office #3, Corniche Road East, Al Danah, Zone 1, Abu Dhabi, United Arab Emirates";

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    officeAddress
  )}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello PrimeSite Facilities Group LLC, I would like to know more about your construction services."
  )}`;

  const quickLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Our Services", path: "/services/cash-services" },
    { title: "Blog & News", path: "/blog" },
    { title: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", url: "https://www.facebook.com/" },
    { name: "Instagram", url: "https://www.instagram.com/" },
    { name: "LinkedIn", url: "https://www.linkedin.com/" },
    { name: "Twitter", url: "https://x.com/" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      {/* Decorative background */}
      <div
        className="footer__background-decoration footer__background-decoration--one"
        aria-hidden="true"
      />

      <div
        className="footer__background-decoration footer__background-decoration--two"
        aria-hidden="true"
      />

      {/* Call-to-action section */}
      <section className="footer__cta">
        <div className="footer__cta-container">
          <div className="footer__cta-icon">
            <HardHat size={28} strokeWidth={1.7} />
          </div>

          <div className="footer__cta-content">
            <span className="footer__eyebrow">
              LET&apos;S BUILD SOMETHING GREAT
            </span>

            <h2>Planning Your Next Construction Project?</h2>

            <p>
              Talk to our team about your project requirements and
              construction needs.
            </p>
          </div>

          <Link to="/contact" className="footer__cta-button">
            <span>Discuss Your Project</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      {/* Main footer */}
      <div className="footer__main">
        <div className="footer__container">
          <div className="footer__grid">
            {/* Brand column */}
            <div className="footer__brand">
              <Link
                to="/"
                className="footer__logo-link"
                aria-label="PrimeSite home page"
              >
                <img
                  src={logo}
                  alt="PrimeSite Facilities Group LLC"
                  className="footer__logo"
                />
              </Link>

              <h3 className="footer__brand-name">
                PrimeSite Facilities Group LLC
              </h3>

              <p className="footer__description">
                Building with purpose. Delivering with confidence.
                PrimeSite Facilities Group LLC is committed to professional
                construction solutions, dependable service and lasting value.
              </p>

              <div className="footer__socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <SocialIcon name={social.name} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links column */}
            <div className="footer__column footer__quick-column">
              <h3 className="footer__heading">Quick Links</h3>

              <span className="footer__heading-line" />

              <ul className="footer__links">
                {quickLinks.map((link) => (
                  <li key={link.path} className="footer__link-item">
                    <Link to={link.path} className="footer__link">
                      <ArrowUpRight
                        size={15}
                        className="footer__link-icon"
                        aria-hidden="true"
                      />

                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="footer__trust-note">
                <Building2 size={21} />

                <span>Construction &amp; Facilities Solutions</span>
              </div>
            </div>

            {/* Contact column */}
            <div className="footer__column footer__contact-column">
              <h3 className="footer__heading">Get In Touch</h3>

              <span className="footer__heading-line" />

              <p className="footer__contact-intro">
                Have a project in mind? Connect with our team. We would be
                happy to hear from you.
              </p>

              <div className="footer__contact-list">
                {/* Primary phone */}
                <a
                  href={`tel:${phoneNumber}`}
                  className="footer__contact-item"
                >
                  <span className="footer__contact-icon">
                    <Phone size={20} />
                  </span>

                  <span className="footer__contact-text">
                    <strong>Primary Mobile</strong>
                    <span>+971 8828732</span>
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__contact-item"
                >
                  <span className="footer__contact-icon footer__contact-icon--whatsapp">
                    <MessageCircle size={21} />
                  </span>

                  <span className="footer__contact-text">
                    <strong>WhatsApp</strong>
                    <span>+971 8828734</span>
                  </span>
                </a>

                {/* Office address */}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__contact-item footer__contact-item--address"
                >
                  <span className="footer__contact-icon">
                    <MapPin size={21} />
                  </span>

                  <span className="footer__contact-text">
                    <strong>Office Address</strong>

                    <span>{officeAddress}</span>

                    <small className="footer__map-label">
                      View on Google Maps
                      <ArrowUpRight size={14} />
                    </small>
                  </span>
                </a>
              </div>

              <Link to="/contact" className="footer__contact-button">
                <span>Contact Our Team</span>

                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <p className="footer__copyright">
            &copy; {currentYear} PrimeSite Facilities Group LLC.
            All Rights Reserved.
          </p>

          <div className="footer__legal-links">
            <Link to="/privacy-policy" className="footer__legal-link">
              Privacy Policy
            </Link>

            <span className="footer__legal-divider" />

            <Link
              to="/terms-and-conditions"
              className="footer__legal-link"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        <div className="footer__developer">
          <span>Designed &amp; Developed by</span>{" "}
          <strong>PR WEBSTOCK</strong>
          <CheckCircle2 size={13} aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;