
import React from "react";
import { ArrowUpRight } from "lucide-react";
import "./AboutOurMission.css";

const AboutOurMission = () => {
  return (
    <section className="AboutOurMission">
      <div className="AboutOurMission__container">
        {/* Left content */}
        <div className="AboutOurMission__contentSection">
          <div className="AboutOurMission__content">
            <div className="AboutOurMission__eyebrow">
              <span className="AboutOurMission__eyebrowLine" />
              <span>ABOUT</span>
            </div>

            <h2 className="AboutOurMission__title">
              Our <span>Mission</span>
            </h2>

            <p className="AboutOurMission__description">
              To be our customers' trusted partner delivering
              total business support solutions, to enable our
              customers to focus on their core business.
            </p>

            <div className="AboutOurMission__bottom">
              <span className="AboutOurMission__bottomText">
                Your trusted partner in progress
              </span>

              <span className="AboutOurMission__bottomLine" />

              <span className="AboutOurMission__icon">
                <ArrowUpRight strokeWidth={1.6} />
              </span>
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
              alt="Modern corporate office building representing business excellence"
              loading="lazy"
            />

            <div className="AboutOurMission__imageOverlay" />
          </div>

          <div className="AboutOurMission__imageCaption">
            <span className="AboutOurMission__captionLine" />
            <span>OUR PURPOSE. YOUR SUCCESS.</span>
          </div>

          <span className="AboutOurMission__imageAccent" />
        </div>
      </div>
    </section>
  );
};

export default AboutOurMission;
