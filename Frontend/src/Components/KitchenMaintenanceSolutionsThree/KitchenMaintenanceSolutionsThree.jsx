import React, { useState, useEffect, useRef } from "react";
import "./KitchenMaintenanceSolutionsThree.css";

const maintenancePillars = [
  {
    id: 1,
    title: "Preventive Equipment Servicing",
    desc: "Scheduled thermal calibrations, burner overhauls, refrigeration checks, and motor diagnostics to eliminate downtime.",
  },
  {
    id: 2,
    title: "Deep Extraction & Duct Degreasing",
    desc: "Certified NFPA-standard canopy scrubbing, hood degreasing, ESP filter servicing, and fire-suppression checks.",
  },
  {
    id: 3,
    title: "24/7 Rapid Emergency Response",
    desc: "Guaranteed on-site SLA dispatch with fully stocked critical spares for combi-ovens, fryers, dishwashers, and cold rooms.",
  },
];

const KitchenMaintenanceSolutionsThree = () => {
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
      className={`KitchenMaintenanceSolutionsThree ${
        isVisible ? "KitchenMaintenanceSolutionsThree--visible" : ""
      }`}
      aria-label="Prime Site Commercial Kitchen Maintenance Solutions"
    >
      <div className="KitchenMaintenanceSolutionsThree__container">
        {/* Left Side: Staggered Content */}
        <div className="KitchenMaintenanceSolutionsThree__content">
          <div className="KitchenMaintenanceSolutionsThree__eyebrowWrap">
            <span className="KitchenMaintenanceSolutionsThree__eyebrowLine" />
            <span className="KitchenMaintenanceSolutionsThree__eyebrow">
              ABOUT PRIME SITE
            </span>
          </div>

          <h2 className="KitchenMaintenanceSolutionsThree__title">
            Our{" "}
            <span className="KitchenMaintenanceSolutionsThree__titleAccent">
              Approach
            </span>
          </h2>

          <p className="KitchenMaintenanceSolutionsThree__description">
            Prime Site delivers turnkey commercial kitchen engineering and
            facility maintenance. Our certified technicians keep high-volume
            foodservice, hotel, and cloud-kitchen operations compliant, safe,
            and peak-efficient through rigorous preventive care and round-the-clock
            field support.
          </p>

          {/* Operational Pillars */}
          <div className="KitchenMaintenanceSolutionsThree__pillars">
            {maintenancePillars.map((pillar) => (
              <div
                key={pillar.id}
                className="KitchenMaintenanceSolutionsThree__pillarItem"
              >
                <div className="KitchenMaintenanceSolutionsThree__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="KitchenMaintenanceSolutionsThree__pillarText">
                  <h4 className="KitchenMaintenanceSolutionsThree__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="KitchenMaintenanceSolutionsThree__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="KitchenMaintenanceSolutionsThree__actionWrap">
            <a
              href="#book-kitchen-audit"
              className="KitchenMaintenanceSolutionsThree__linkPrimary"
            >
              <span>Schedule a Kitchen Audit</span>
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

        {/* Right Side: Angled Commercial Kitchen Visual */}
        <div className="KitchenMaintenanceSolutionsThree__media">
          <div className="KitchenMaintenanceSolutionsThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2200&q=85"
              alt="Stainless steel commercial kitchen maintained by Prime Site technicians"
              className="KitchenMaintenanceSolutionsThree__image"
              loading="lazy"
            />
            <div className="KitchenMaintenanceSolutionsThree__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="KitchenMaintenanceSolutionsThree__badge">
            <span className="KitchenMaintenanceSolutionsThree__badgeDot" />
            <div className="KitchenMaintenanceSolutionsThree__badgeInfo">
              <strong>HACCP Compliant</strong>
              <span>Full Gas, Electrical &amp; Duct Maintenance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitchenMaintenanceSolutionsThree;