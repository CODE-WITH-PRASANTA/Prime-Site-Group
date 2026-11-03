import React from "react";
import {
  UsersRound,
  Handshake,
  ShieldCheck,
  Award,
  ArrowUpRight,
} from "lucide-react";
import "./AboutOurValues.css";

const AboutOurValues = () => {
  const values = [
    {
      title: "Integrity",
      description: "Transparency and uncompromising ethics guide every decision and site partnership.",
      icon: ShieldCheck,
    },
    {
      title: "Collaboration",
      description: "Together we achieve more. Fostering unity across diverse workforce disciplines.",
      icon: UsersRound,
    },
    {
      title: "Excellence",
      description: "Delivering world-class service standards, zero-compromise safety, and continuous innovation.",
      icon: Award,
    },
    {
      title: "Respect",
      description: "Valuing every individual, prioritizing employee welfare, and embracing diverse perspectives.",
      icon: Handshake,
    },
  ];

  return (
    <section className="AboutOurValues" aria-label="Prime Site Corporate Values">
      <div className="AboutOurValues__container">
        {/* Left image section */}
        <div className="AboutOurValues__imageSection">
          <div className="AboutOurValues__imageWrap">
            <img
              className="AboutOurValues__image"
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90"
              alt="Prime Site professional leadership and workforce team collaborating"
              loading="lazy"
            />
            <div className="AboutOurValues__imageOverlay" />
          </div>

          <div className="AboutOurValues__imageCaption">
            <span className="AboutOurValues__captionLine" />
            <span>PRIME SITE. ONE TEAM. SHARED VALUES.</span>
          </div>
        </div>

        {/* Right content section */}
        <div className="AboutOurValues__contentSection">
          <div className="AboutOurValues__content">
            <div className="AboutOurValues__eyebrow">
              <span className="AboutOurValues__eyebrowLine" />
              <span>ABOUT PRIME SITE</span>
            </div>

            <h2 className="AboutOurValues__title">
              Our <span>Values</span>
            </h2>

            <div className="AboutOurValues__list">
              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <article
                    className="AboutOurValues__item"
                    key={value.title}
                    style={{
                      "--AboutOurValues-delay": `${index * 120}ms`,
                    }}
                  >
                    <div className="AboutOurValues__itemIcon">
                      <Icon strokeWidth={1.6} />
                    </div>

                    <div className="AboutOurValues__itemContent">
                      <h3 className="AboutOurValues__itemTitle">
                        {value.title}
                        <span>.</span>
                      </h3>

                      <p className="AboutOurValues__itemDescription">
                        {value.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      className="AboutOurValues__itemArrow"
                      aria-hidden="true"
                    />
                  </article>
                );
              })}
            </div>

            <div className="AboutOurValues__bottom">
              <span className="AboutOurValues__bottomLine" />
              <span>Prime Site — United by purpose. Guided by values.</span>
            </div>
          </div>

          <span
            className="AboutOurValues__watermark"
            aria-hidden="true"
          >
            VALUES
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutOurValues;