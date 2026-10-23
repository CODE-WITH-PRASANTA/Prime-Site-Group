
import React from "react";
import {
  UsersRound,
  Handshake,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import "./AboutOurValues.css";

const AboutOurValues = () => {
  const values = [
    {
      title: "Team",
      description: "Together we achieve more. Always work as one team.",
      icon: UsersRound,
    },
    {
      title: "Relate",
      description: "Relationships matter. Be open, honest and connect.",
      icon: Handshake,
    },
    {
      title: "Respect",
      description: "Value every individual and appreciate different perspectives.",
      icon: MessageCircle,
    },
  ];

  return (
    <section className="AboutOurValues">
      <div className="AboutOurValues__container">
        {/* Left image section */}
        <div className="AboutOurValues__imageSection">
          <div className="AboutOurValues__imageWrap">
            <img
              className="AboutOurValues__image"
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90"
              alt="Professional team working together in a corporate environment"
              loading="lazy"
            />
            <div className="AboutOurValues__imageOverlay" />
          </div>

          <div className="AboutOurValues__imageCaption">
            <span className="AboutOurValues__captionLine" />
            <span>ONE TEAM. SHARED VALUES.</span>
          </div>
        </div>

        {/* Right content section */}
        <div className="AboutOurValues__contentSection">
          <div className="AboutOurValues__content">
            <div className="AboutOurValues__eyebrow">
              <span className="AboutOurValues__eyebrowLine" />
              <span>ABOUT</span>
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
              <span>United by purpose. Guided by values.</span>
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