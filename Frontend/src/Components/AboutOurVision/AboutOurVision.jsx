
import React from "react";
import { ArrowUpRight } from "lucide-react";
import "./AboutOurVision.css";

const AboutOurVision = () => {
  return (
    <section className="AboutOurVision">
      <div className="AboutOurVision__container">
        {/* Left image section */}
        <div className="AboutOurVision__imageSection">
          <div className="AboutOurVision__imageWrap">
            <img
              className="AboutOurVision__image"
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90"
              alt="Corporate team collaborating in a professional workplace"
              loading="lazy"
            />
            <div className="AboutOurVision__imageOverlay" />
          </div>

          <div className="AboutOurVision__imageAccent" />

          <div className="AboutOurVision__imageCaption">
            <span className="AboutOurVision__captionLine" />
            <span>PEOPLE. PURPOSE. PROGRESS.</span>
          </div>
        </div>

        {/* Right content section */}
        <div className="AboutOurVision__contentSection">
          <div className="AboutOurVision__content">
            <div className="AboutOurVision__eyebrow">
              <span className="AboutOurVision__eyebrowLine" />
              <span>ABOUT</span>
            </div>

            <h2 className="AboutOurVision__title">
              Our <span>Vision</span>
            </h2>

            <p className="AboutOurVision__description">
              To change the landscape of business support services
              and the outsourcing environment in the region.
            </p>

            <div className="AboutOurVision__bottom">
              <span className="AboutOurVision__bottomText">
                Shaping a better tomorrow
              </span>

              <span className="AboutOurVision__bottomLine" />

              <span className="AboutOurVision__icon">
                <ArrowUpRight strokeWidth={1.6} />
              </span>
            </div>
          </div>

          <span
            className="AboutOurVision__watermark"
            aria-hidden="true"
          >
            VISION
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutOurVision;
