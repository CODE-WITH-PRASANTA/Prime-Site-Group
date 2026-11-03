import React from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import "./ContactMap.css";

import TeamImage from "../../assets/contact-team.png";

const ContactMap = () => {
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Prime%20Site%20Dubai%20UAE&z=14&output=embed";

  const openMapUrl =
    "https://www.google.com/maps/search/?api=1&query=Prime+Site+Dubai+UAE";

  return (
    <section className="ContactMap" aria-label="Prime Site Office and Operations Location">
      <div className="ContactMap-wrapper">
        {/* Map layer */}
        <div className="ContactMap-mapPanel">
          <iframe
            className="ContactMap-mapFrame"
            title="Prime Site location map"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex="-1"
            aria-hidden="true"
          />

          <div className="ContactMap-mapTint" />

          <a
            className="ContactMap-mapOpen"
            href={openMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Prime Site location in Google Maps"
          >
            <MapPin size={17} />
            <span>Explore Prime Site Hub</span>
            <ArrowUpRight size={17} />
          </a>

          <div className="ContactMap-mapCorner" />
        </div>

        {/* Image layer */}
        <div className="ContactMap-imagePanel">
          <img
            src={TeamImage}
            alt="Prime Site specialist leadership and workforce team"
            className="ContactMap-teamImage"
            loading="lazy"
          />

          <div className="ContactMap-imageOverlay" />

          <div className="ContactMap-imageContent">
            <span className="ContactMap-imageEyebrow">
              <span className="ContactMap-eyebrowLine" />
              PRIME SITE HEADQUARTERS
            </span>

            <h2 className="ContactMap-imageTitle">
              Connecting
              <br />
              People.
              <br />
              <span>Delivering</span>
              <br />
              <span>Excellence.</span>
            </h2>

            <p className="ContactMap-imageDescription">
              Bringing dedicated personnel, specialized technical expertise, 
              and seamless business solutions together under one unified partner.
            </p>

            <a
              href={openMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ContactMap-imageLink"
            >
              Get Directions to Prime Site
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="ContactMap-imageBottomLine" />
        </div>
      </div>
    </section>
  );
};

export default ContactMap;