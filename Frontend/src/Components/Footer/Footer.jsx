import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowUp,
} from "lucide-react";

import "./Footer.css";
import logo from "../../assets/main-logo.png";

// Social icons use inline SVG, avoiding missing Lucide exports.
const SocialIcon = ({ name }) => {
  const commonProps = {
    width: 18,
    height: 18,
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

  const quickLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Our Services", path: "/services" },
    { title: "Blog & News", path: "/blog" },
    { title: "Careers", path: "/career" },
    { title: "FAQs", path: "/faq" },
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
      <div className="footer__main">
        <div className="footer__container">
          <div className="footer__grid">
            {/* Brand Section */}
            <div className="footer__brand">
              <Link
                to="/"
                className="footer__logo-link"
                aria-label="Go to home page"
              >
                <img
                  src={logo}
                  alt="Company Logo"
                  className="footer__logo"
                />
              </Link>

              <p className="footer__description">
                Delivering reliable solutions, professional services, and
                trusted support to help businesses and communities move
                forward with confidence.
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

            {/* Quick Links */}
            <div className="footer__column">
              <h3 className="footer__heading">Quick Links</h3>
              <span className="footer__heading-line" />

              <ul className="footer__links">
                {quickLinks.map((link) => (
                  <li key={link.path} className="footer__link-item">
                    <Link to={link.path} className="footer__link">
                      <ArrowUpRight
                        size={14}
                        className="footer__link-icon"
                      />
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="footer__column footer__contact-column">
              <h3 className="footer__heading">Get In Touch</h3>
              <span className="footer__heading-line" />

              <p className="footer__contact-intro">
                Have a question or want to work with us? We'd love to hear
                from you.
              </p>

              <div className="footer__contact-list">
                <Link to="/contact" className="footer__contact-item">
                  <span className="footer__contact-icon">
                    <MapPin size={19} />
                  </span>
                  <span className="footer__contact-text">
                    <strong>Our Location</strong>
                    <span>Visit our office</span>
                  </span>
                </Link>

                <a
                  href="tel:+910000000000"
                  className="footer__contact-item"
                >
                  <span className="footer__contact-icon">
                    <Phone size={18} />
                  </span>
                  <span className="footer__contact-text">
                    <strong>Call Us</strong>
                    <span>+91 00000 00000</span>
                  </span>
                </a>

                <a
                  href="mailto:info@example.com"
                  className="footer__contact-item"
                >
                  <span className="footer__contact-icon">
                    <Mail size={19} />
                  </span>
                  <span className="footer__contact-text">
                    <strong>Email Us</strong>
                    <span>info@example.com</span>
                  </span>
                </a>
              </div>

              <Link to="/contact" className="footer__contact-button">
                Contact Our Team
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <p className="footer__copyright">
            © {currentYear} All rights reserved. | Developed By PR WEBSTOCK
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
              Terms & Conditions
            </Link>
          </div>

          <button
            type="button"
            className="footer__back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={19} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;