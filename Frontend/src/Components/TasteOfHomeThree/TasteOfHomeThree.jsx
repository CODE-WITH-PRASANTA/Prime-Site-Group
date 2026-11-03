import React, { useState, useEffect, useRef } from "react";
import "./TasteOfHomeThree.css";

const culinaryPillars = [
  {
    id: 1,
    title: "Heritage Recipes & Authentic Spices",
    desc: "Time-honored culinary traditions brought to life with slow-simmered marinades, small-batch spice blends, and authentic regional techniques.",
  },
  {
    id: 2,
    title: "Farm-Fresh & Sustainably Sourced",
    desc: "Direct partnerships with local growers ensuring peak-season produce, pasture-raised proteins, and zero artificial preservatives in every dish.",
  },
  {
    id: 3,
    title: "Artisanal Preparation & Warmth",
    desc: "Every plate crafted to evoke the comfort of family gatherings, backed by uncompromised hygiene benchmarks and soulful dining hospitality.",
  },
];

const TasteOfHomeThree = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`TasteOfHomeThree ${
        isVisible ? "TasteOfHomeThree--visible" : ""
      }`}
      aria-label="Artisanal Home-Style Dining and Culinary Traditions"
    >
      <div className="TasteOfHomeThree__container">
        {/* Left Side: Staggered Running Content */}
        <div className="TasteOfHomeThree__content">
          <div className="TasteOfHomeThree__eyebrowWrap">
            <span className="TasteOfHomeThree__eyebrowLine" />
            <span className="TasteOfHomeThree__eyebrow">HOMESTYLE HERITAGE</span>
          </div>

          <h2 className="TasteOfHomeThree__title">
            Our <span className="TasteOfHomeThree__titleAccent">Tradition</span>
          </h2>

          <p className="TasteOfHomeThree__description">
            We recreate the comforting warmth of home cooking through cherished generational recipes, 
            hand-picked ingredients, and unhurried culinary craft. From fragrant slow-cooked stews 
            to freshly baked pantry classics, every meal is prepared to nourish, comfort, and bring people together.
          </p>

          {/* Operational Pillars */}
          <div className="TasteOfHomeThree__pillars">
            {culinaryPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="TasteOfHomeThree__pillarItem"
              >
                <div className="TasteOfHomeThree__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="TasteOfHomeThree__pillarText">
                  <h4 className="TasteOfHomeThree__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="TasteOfHomeThree__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="TasteOfHomeThree__actionWrap">
            <a
              href="#menu"
              className="TasteOfHomeThree__linkPrimary"
            >
              <span>Explore Our Seasonal Menu</span>
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

        {/* Right Side: Artisanal Kitchen / Warm Dining Visual */}
        <div className="TasteOfHomeThree__media">
          <div className="TasteOfHomeThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2200&q=85"
              alt="Artisanal homestyle culinary spread prepared with fresh seasonal ingredients"
              className="TasteOfHomeThree__image"
              loading="lazy"
            />
            <div className="TasteOfHomeThree__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="TasteOfHomeThree__badge">
            <span className="TasteOfHomeThree__badgeDot" />
            <div className="TasteOfHomeThree__badgeInfo">
              <strong>Farm-To-Table Certified</strong>
              <span>100% Authentic Heritage Flavors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TasteOfHomeThree;