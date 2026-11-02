import React, { useState, useEffect, useRef } from "react";
import "./KitchenMaintenanceSolutionsFour.css";

const kitchenMaintenancePoints = [
  {
    id: 1,
    title: "Commercial Kitchen Equipment",
    detail:
      "Professional maintenance for ovens, cooking ranges, preparation equipment, and other essential kitchen appliances.",
  },
  {
    id: 2,
    title: "Refrigeration & Cold Storage",
    detail:
      "Routine inspection and maintenance of refrigeration systems to support consistent cooling and food preservation.",
  },
  {
    id: 3,
    title: "Ventilation & Exhaust Systems",
    detail:
      "Reliable upkeep of extraction hoods and ventilation systems to improve airflow and maintain a comfortable kitchen.",
  },
  {
    id: 4,
    title: "Safety & Preventive Maintenance",
    detail:
      "Scheduled inspections and preventive maintenance designed to reduce unexpected breakdowns and support safe operations.",
  },
];

const KitchenMaintenanceSolutionsFour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

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
      className={`KitchenMaintenanceSolutionsFour ${
        isVisible ? "KitchenMaintenanceSolutionsFour--visible" : ""
      }`}
      aria-label="Commercial Kitchen Maintenance Solutions"
    >
      <div className="KitchenMaintenanceSolutionsFour__container">
        {/* Left Side: Commercial Kitchen Image */}
        <div className="KitchenMaintenanceSolutionsFour__media">
          <div className="KitchenMaintenanceSolutionsFour__imageClip">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2200&q=85"
              alt="Professional commercial kitchen with modern cooking equipment"
              className="KitchenMaintenanceSolutionsFour__image"
              loading="lazy"
            />
            <div className="KitchenMaintenanceSolutionsFour__imageShade" />
          </div>

          {/* Floating Maintenance Badge */}
          <div className="KitchenMaintenanceSolutionsFour__badge">
            <span className="KitchenMaintenanceSolutionsFour__badgeDot" />
            <div className="KitchenMaintenanceSolutionsFour__badgeInfo">
              <strong>Reliable Kitchen Maintenance</strong>
              <span>Equipment, Hygiene & Performance</span>
            </div>
          </div>
        </div>

        {/* Right Side: Kitchen Maintenance Content */}
        <div className="KitchenMaintenanceSolutionsFour__content">
          <div className="KitchenMaintenanceSolutionsFour__eyebrowWrap">
            <span className="KitchenMaintenanceSolutionsFour__eyebrowLine" />
            <span className="KitchenMaintenanceSolutionsFour__eyebrow">
              KITCHEN MAINTENANCE
            </span>
          </div>

          <h2 className="KitchenMaintenanceSolutionsFour__title">
            Keeping Commercial Kitchens{" "}
            <span className="KitchenMaintenanceSolutionsFour__titleAccent">
              Running Smoothly
            </span>
          </h2>

          <p className="KitchenMaintenanceSolutionsFour__description">
            We provide dependable kitchen maintenance solutions for
            restaurants, hotels, catering facilities, and commercial food
            operations. Our approach combines preventive maintenance, equipment
            inspections, and practical technical support to help reduce
            downtime, maintain efficient workflows, and keep essential kitchen
            systems performing reliably.
          </p>

          {/* Maintenance Checklist */}
          <div className="KitchenMaintenanceSolutionsFour__list">
            {kitchenMaintenancePoints.map((point) => (
              <div
                key={point.id}
                className="KitchenMaintenanceSolutionsFour__item"
              >
                <span className="KitchenMaintenanceSolutionsFour__checkIcon">
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

                <div className="KitchenMaintenanceSolutionsFour__itemText">
                  <h4 className="KitchenMaintenanceSolutionsFour__itemTitle">
                    {point.title}
                  </h4>
                  <p className="KitchenMaintenanceSolutionsFour__itemDetail">
                    {point.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="KitchenMaintenanceSolutionsFour__actionWrap">
            <a
              href="#kitchen-maintenance-details"
              className="KitchenMaintenanceSolutionsFour__linkPrimary"
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

export default KitchenMaintenanceSolutionsFour;