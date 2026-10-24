
import React from "react";
import { MapPin, ExternalLink, ArrowUpRight } from "lucide-react";
import "./ContactMap.css";

import TeamImage from "../../assets/contact-team.jpg";

const ContactMap = () => {
  const mapLocation = "Transguard Group, Dubai, UAE";

  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Transguard%20Group%20Dubai%20UAE&z=14&output=embed";

  const openMapUrl =
    "https://www.google.com/maps/search/?api=1&query=Transguard+Group+Dubai+UAE";

  return (
    <section className="ContactMap">
      <div className="ContactMap-wrapper">
        {/* Map layer */}
        <div className="ContactMap-mapPanel">
          <iframe
            className="ContactMap-mapFrame"
            title="Transguard Group location map"
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
            aria-label="Open Transguard Group location in Google Maps"
          >
            <MapPin size={17} />
            <span>Explore Location</span>
            <ArrowUpRight size={17} />
          </a>


          <div className="ContactMap-mapCorner" />
        </div>

        {/* Image layer */}
        <div className="ContactMap-imagePanel">
          <img
            src={TeamImage}
            alt="Our professional team working together"
            className="ContactMap-teamImage"
            loading="lazy"
          />

          <div className="ContactMap-imageOverlay" />

          <div className="ContactMap-imageContent">
            <span className="ContactMap-imageEyebrow">
              <span className="ContactMap-eyebrowLine" />
              OUR LOCATION
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
              Bringing people, expertise and exceptional
              service together.
            </p>

            <a
              href={openMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ContactMap-imageLink"
            >
              Discover our location
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
