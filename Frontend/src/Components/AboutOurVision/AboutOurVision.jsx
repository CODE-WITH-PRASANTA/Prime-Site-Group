import React from "react";
import { ArrowUpRight } from "lucide-react";
import "./AboutOurVision.css";

const AboutOurVision = () => {
  return (
    <section className="AboutOurVision" aria-label="Prime Site Corporate Vision">
      <div className="AboutOurVision__container">
        {/* Left image section */}
        <div className="AboutOurVision__imageSection">
          <div className="AboutOurVision__imageWrap">
            <img
              className="AboutOurVision__image"
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90"
              alt="Prime Site corporate leadership and collaborative workforce"
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
              <span>ABOUT PRIME SITE</span>
            </div>

            <h2 className="AboutOurVision__title">
              Our <span>Vision</span>
            </h2>

            <p className="AboutOurVision__description">
              At Prime Site, our vision is to transform the benchmark of integrated business 
              support services, workforce logistics, and facility management across the region—empowering 
              clients with sustainable, technology-driven solutions built for tomorrow.
            </p>

            <div className="AboutOurVision__bottom">
              <span className="AboutOurVision__bottomText">
                Prime Site — Shaping a better tomorrow
              </span>

              <span className="AboutOurVision__bottomLine" />

              <a 
                href="#services" 
                className="AboutOurVision__icon" 
                aria-label="Discover Prime Site Solutions"
              >
                <ArrowUpRight strokeWidth={1.6} />
              </a>
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