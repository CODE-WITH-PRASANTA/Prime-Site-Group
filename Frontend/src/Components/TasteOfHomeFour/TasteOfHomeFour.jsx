import React, { useState, useEffect, useRef } from "react";
import "./TasteOfHomeFour.css";

const culinaryPillars = [
  {
    id: "toh-1",
    label: "Authentic Recipes",
    title: "Regional Heritage & Homestyle Menus",
    description:
      "Prepared using time-honored recipes, wholesome spices, and authentic culinary techniques that bring comfort and genuine homestyle flavors to every plate.",
    tag: "Traditional Taste",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    id: "toh-2",
    label: "Quality Sourcing",
    title: "Farm-Fresh, Vetted Ingredients",
    description:
      "Daily procurement of premium produce, unadulterated cold-pressed oils, and grain varieties with 100% farm-to-table traceability.",
    tag: "100% Natural",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    id: "toh-3",
    label: "Safety First",
    title: "HACCP & ISO-Certified Kitchens",
    description:
      "Strict temperature-controlled prep lines, sterile food handling gear, clean cooking stations, and rigorous periodic microbiological testing.",
    tag: "Safety Standard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: "toh-4",
    label: "Scalable Delivery",
    title: "Industrial & Institutional Catering",
    description:
      "Precision batch cooking, insulated heat-lock transport, and punctual on-site service tailored for large workforces and campus communities.",
    tag: "High Volume",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

const cateringStats = [
  { value: "40,000+", label: "Wholesome Meals Served Daily" },
  { value: "99.8%", label: "On-Time Service SLA" },
  { value: "Zero", label: "Synthetic Additives or Preservatives" },
  { value: "100%", label: "Nutritional Compliance & Audit Pass" },
];

const TasteOfHomeFour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`TasteOfHomeFour ${
        isVisible ? "TasteOfHomeFour--visible" : ""
      }`}
      aria-label="Prime Site Taste of Home Catering Services"
    >
      <div className="TasteOfHomeFour__container">
        {/* Header Block */}
        <div className="TasteOfHomeFour__header">
          <div className="TasteOfHomeFour__eyebrowWrap">
            <span className="TasteOfHomeFour__eyebrowLine" />
            <span className="TasteOfHomeFour__eyebrow">
              NUTRITION & CULINARY EXCELLENCE
            </span>
          </div>

          <h2 className="TasteOfHomeFour__title">
            Prime Site{" "}
            <span className="TasteOfHomeFour__titleAccent">Taste of Home</span>
          </h2>

          <p className="TasteOfHomeFour__description">
            Prime Site delivers balanced, nutritious, and authentic homestyle meals
            for enterprise workforces, corporate dining halls, and residential
            campuses. We blend hygienic central production with true culinary care.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="TasteOfHomeFour__grid">
          {culinaryPillars.map((item) => (
            <div key={item.id} className="TasteOfHomeFour__card">
              <div className="TasteOfHomeFour__cardTop">
                <div className="TasteOfHomeFour__iconBox">{item.icon}</div>
                <span className="TasteOfHomeFour__cardTag">{item.tag}</span>
              </div>

              <span className="TasteOfHomeFour__cardLabel">{item.label}</span>
              <h3 className="TasteOfHomeFour__cardTitle">{item.title}</h3>
              <p className="TasteOfHomeFour__cardDetail">{item.description}</p>

              <div className="TasteOfHomeFour__cardFooter">
                <a
                  href="#menu-planning"
                  className="TasteOfHomeFour__cardLink"
                >
                  <span>Explore Menu Plans</span>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Operational Performance Bar */}
        <div className="TasteOfHomeFour__statsStrip">
          {cateringStats.map((stat, idx) => (
            <div key={idx} className="TasteOfHomeFour__statItem">
              <span className="TasteOfHomeFour__statValue">{stat.value}</span>
              <span className="TasteOfHomeFour__statLabel">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="TasteOfHomeFour__actionWrap">
          <a
            href="#request-catering"
            className="TasteOfHomeFour__linkPrimary"
          >
            <span>Design Your Workforce Meal Plan</span>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TasteOfHomeFour;