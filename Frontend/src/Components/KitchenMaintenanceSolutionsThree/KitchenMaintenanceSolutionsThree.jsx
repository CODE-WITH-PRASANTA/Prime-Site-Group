import React, { useState, useEffect, useRef } from "react";
import "./KitchenMaintenanceSolutionsThree.css";

const kitchenMaintenancePoints = [
  {
    id: 1,
    title: "Commercial Kitchen Equipment Maintenance",
    detail:
      "Regular inspection and maintenance of ovens, cooking ranges, fryers, and other essential commercial kitchen equipment.",
  },
  {
    id: 2,
    title: "Exhaust & Ventilation System Care",
    detail:
      "Professional cleaning and maintenance of exhaust hoods, ventilation ducts, and extraction systems for improved airflow.",
  },
  {
    id: 3,
    title: "Refrigeration & Cold Storage Services",
    detail:
      "Preventive maintenance of refrigerators, freezers, and cold storage equipment to support reliable temperature control.",
  },
  {
    id: 4,
    title: "Kitchen Hygiene & Safety Inspections",
    detail:
      "Routine inspections of kitchen facilities, equipment, and safety systems to support hygienic and efficient operations.",
  },
];

const KitchenMaintenanceSolutionsThree = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`KitchenMaintenanceSolutionsThree ${
        isVisible ? "KitchenMaintenanceSolutionsThree--visible" : ""
      }`}
      aria-label="Kitchen maintenance solutions and facility management"
    >
      <div className="KitchenMaintenanceSolutionsThree__container">
        {/* Left Side: Commercial Kitchen Maintenance Image */}

        <div className="KitchenMaintenanceSolutionsThree__media">
          <div className="KitchenMaintenanceSolutionsThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2200&q=85"
              alt="Modern kitchen representing professional kitchen maintenance solutions"
              className="KitchenMaintenanceSolutionsThree__image"
              loading="lazy"
            />

            <div className="KitchenMaintenanceSolutionsThree__imageShade" />
          </div>

          {/* Floating Maintenance Badge */}

          <div className="KitchenMaintenanceSolutionsThree__badge">
            <span className="KitchenMaintenanceSolutionsThree__badgeDot" />

            <div className="KitchenMaintenanceSolutionsThree__badgeInfo">
              <strong>Kitchen Care Solutions</strong>
              <span>Reliable · Hygienic · Efficient</span>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Content */}

        <div className="KitchenMaintenanceSolutionsThree__content">
          <div className="KitchenMaintenanceSolutionsThree__eyebrowWrap">
            <span className="KitchenMaintenanceSolutionsThree__eyebrowLine" />

            <span className="KitchenMaintenanceSolutionsThree__eyebrow">
              PROFESSIONAL MAINTENANCE
            </span>
          </div>

          <h2 className="KitchenMaintenanceSolutionsThree__title">
            Keeping Kitchens
            <br />
            <span className="KitchenMaintenanceSolutionsThree__titleAccent">
              Running Smoothly
            </span>
          </h2>

          <p className="KitchenMaintenanceSolutionsThree__description">
            We deliver dependable kitchen maintenance solutions designed to
            keep commercial kitchens safe, clean, and operating efficiently.
            From cooking equipment and ventilation systems to refrigeration
            and hygiene inspections, our maintenance services help reduce
            unexpected breakdowns, improve equipment performance, and maintain
            a productive kitchen environment.
          </p>

          {/* Kitchen Maintenance Checklist */}

          <div className="KitchenMaintenanceSolutionsThree__list">
            {kitchenMaintenancePoints.map((point) => (
              <div
                key={point.id}
                className="KitchenMaintenanceSolutionsThree__item"
                style={{ "--item-index": point.id }}
              >
                <span className="KitchenMaintenanceSolutionsThree__checkIcon">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>

                <div className="KitchenMaintenanceSolutionsThree__itemText">
                  <h4 className="KitchenMaintenanceSolutionsThree__itemTitle">
                    {point.title}
                  </h4>

                  <p className="KitchenMaintenanceSolutionsThree__itemDetail">
                    {point.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Primary Action Button */}

          <div className="KitchenMaintenanceSolutionsThree__actionWrap">
            <a
              href="#kitchen-maintenance-details"
              className="KitchenMaintenanceSolutionsThree__linkPrimary"
            >
              <span>Explore Maintenance Solutions</span>

              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitchenMaintenanceSolutionsThree;