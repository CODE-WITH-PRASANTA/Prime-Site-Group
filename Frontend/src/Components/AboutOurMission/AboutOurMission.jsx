import React from "react";
import { ArrowUpRight } from "lucide-react";
import "./AboutOurMission.css";

const AboutOurMission = () => {
  return (
    <section className="AboutOurMission" aria-label="Prime Site Corporate Mission">
      <div className="AboutOurMission__container">
        {/* Left content */}
        <div className="AboutOurMission__contentSection">
          <div className="AboutOurMission__content">
            <div className="AboutOurMission__eyebrow">
              <span className="AboutOurMission__eyebrowLine" />
              <span>ABOUT PRIME SITE</span>
            </div>

            <h2 className="AboutOurMission__title">
              Our <span>Mission</span>
            </h2>

            <p className="AboutOurMission__description">
              At Prime Site, our mission is to be the premier trusted partner providing
              comprehensive business support services, security infrastructure, facility 
              engineering, and workforce logistics—empowering our clients to focus on 
              their core growth and achieve operational excellence.
            </p>

            <div className="AboutOurMission__bottom">
              <span className="AboutOurMission__bottomText">
                Prime Site — Your trusted partner in progress
              </span>

              <span className="AboutOurMission__bottomLine" />

              <a 
                href="#services" 
                className="AboutOurMission__icon" 
                aria-label="Explore Prime Site Mission & Solutions"
              >
                <ArrowUpRight strokeWidth={1.6} />
              </a>
            </div>
          </div>

          <span
            className="AboutOurMission__watermark"
            aria-hidden="true"
          >
            MISSION
          </span>
        </div>

        {/* Right image with diagonal edge */}
        <div className="AboutOurMission__imageSection">
          <div className="AboutOurMission__imageWrap">
            <img
              className="AboutOurMission__image"
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=90"
              alt="Prime Site corporate headquarters and enterprise operations excellence"
              loading="lazy"
            />

            <div className="AboutOurMission__imageOverlay" />
          </div>

          <div className="AboutOurMission__imageCaption">
            <span className="AboutOurMission__captionLine" />
            <span>PRIME SITE. OUR PURPOSE. YOUR SUCCESS.</span>
          </div>

          <span className="AboutOurMission__imageAccent" />
        </div>
      </div>
    </section>
  );
};

export default AboutOurMission;