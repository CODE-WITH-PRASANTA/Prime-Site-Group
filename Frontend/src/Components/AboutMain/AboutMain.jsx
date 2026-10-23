import React, { useState, useEffect } from "react";
import "./AboutMain.css";

const keyHighlights = [
  { value: "2001", label: "ESTABLISHED", detail: "Over two decades of excellence" },
  { value: "61,000+", label: "WORKFORCE", detail: "Dynamic & culturally diverse team" },
  { value: "No. 1", label: "MARKET LEADER", detail: "Trusted business support provider" },
];

const coreSectors = [
  "Cash Solutions",
  "Security Services",
  "Manpower Solutions",
  "Integrated Facilities",
];

const AboutMain = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`AboutMain ${isLoaded ? "AboutMain--loaded" : ""}`}
      aria-label="About Our Organization"
    >
      {/* 45% Visual Right Media */}
      <div className="AboutMain__mediaWrap">
        <img
          src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2400&q=90"
          alt="Aviation apron logistics and commercial hub operations"
          className="AboutMain__mediaImage"
        />
        <div className="AboutMain__mediaShade" />

        {/* Floating Label Badge */}
        <div className="AboutMain__heroTag">
          <span className="AboutMain__heroTagDot" />
          <span className="AboutMain__heroTagTitle">GLOBAL HUB OPERATIONS</span>
          <span className="AboutMain__heroTagDivider" />
          <span className="AboutMain__heroTagSubtitle">PRIME GROUP</span>
        </div>
      </div>

      {/* 55% Angled Executive Content Panel */}
      <div className="AboutMain__leftPanel">
        <div className="AboutMain__panelTexture" />

        <div className="AboutMain__content">
          <div className="AboutMain__eyebrowWrap">
            <span className="AboutMain__eyebrowLine" />
            <span className="AboutMain__eyebrow">WHO WE ARE</span>
          </div>

          <h1 className="AboutMain__title">
            About <span className="AboutMain__titleAccent">Us</span>
          </h1>

          <p className="AboutMain__lead">
            Established in 2001, we have diversified significantly to become the region's
            premier partner across Cash Solutions, Security Services, Manpower, and Integrated
            Facilities Management.
          </p>

          <p className="AboutMain__description">
            Recognized as the nation's most trusted business support and outsourcing enterprise,
            our operations are powered by an agile, forward-thinking workforce numbering in excess
            of 61,000 specialists committed to world-class service standards.
          </p>

          {/* Sector Tags */}
          <div className="AboutMain__sectors">
            {coreSectors.map((sector, index) => (
              <span key={index} className="AboutMain__sectorPill">
                <span className="AboutMain__sectorDot" />
                {sector}
              </span>
            ))}
          </div>

          {/* Key Stat Cards */}
          <div className="AboutMain__statsGrid">
            {keyHighlights.map((stat, index) => (
              <div key={index} className="AboutMain__statCard">
                <span className="AboutMain__statValue">{stat.value}</span>
                <span className="AboutMain__statLabel">{stat.label}</span>
                <span className="AboutMain__statDetail">{stat.detail}</span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="AboutMain__actionRow">
            <a href="#company-overview" className="AboutMain__btnPrimary">
              <span>Explore Group Portfolio</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#governance" className="AboutMain__linkSecondary">
              <span>Corporate Governance</span>
            </a>
          </div>
        </div>

        {/* Big Watermark Year */}
        <span className="AboutMain__watermark" aria-hidden="true">
          2001
        </span>
      </div>

      {/* Red Accent Trim Strip */}
      <div className="AboutMain__edgeStripe" aria-hidden="true" />
    </section>
  );
};

export default AboutMain;