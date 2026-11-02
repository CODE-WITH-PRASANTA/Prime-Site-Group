import React, { useState, useEffect, useRef } from "react";
import "./FacilityManagementFour.css";

const facilityManagementPoints = [
  {
    id: 1,
    title: "Building Maintenance & Repairs",
    detail:
      "Proactive maintenance and timely repairs to keep buildings, equipment, and essential systems operating efficiently.",
  },
  {
    id: 2,
    title: "HVAC & Electrical Management",
    detail:
      "Reliable heating, ventilation, air conditioning, and electrical system maintenance for comfortable, functional spaces.",
  },
  {
    id: 3,
    title: "Cleaning & Hygiene Services",
    detail:
      "Professional cleaning and hygiene solutions that maintain safe, clean, and welcoming environments.",
  },
  {
    id: 4,
    title: "Safety & Facility Inspections",
    detail:
      "Routine inspections and coordinated safety procedures to identify issues early and support operational compliance.",
  },
];

const FacilityManagementFour = () => {
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
      className={`FacilityManagementFour ${
        isVisible ? "FacilityManagementFour--visible" : ""
      }`}
      aria-label="Facility Management Services"
    >
      <div className="FacilityManagementFour__container">
        {/* Left Side: Facility Image */}
        <div className="FacilityManagementFour__media">
          <div className="FacilityManagementFour__imageClip">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85"
              alt="Modern commercial building maintained for efficient facility operations"
              className="FacilityManagementFour__image"
              loading="lazy"
            />
            <div className="FacilityManagementFour__imageShade" />
          </div>

          {/* Floating Facility Badge */}
          <div className="FacilityManagementFour__badge">
            <span className="FacilityManagementFour__badgeDot" />
            <div className="FacilityManagementFour__badgeInfo">
              <strong>Complete Facility Care</strong>
              <span>Maintenance, Safety & Efficiency</span>
            </div>
          </div>
        </div>

        {/* Right Side: Facility Management Content */}
        <div className="FacilityManagementFour__content">
          <div className="FacilityManagementFour__eyebrowWrap">
            <span className="FacilityManagementFour__eyebrowLine" />
            <span className="FacilityManagementFour__eyebrow">
              FACILITY MANAGEMENT
            </span>
          </div>

          <h2 className="FacilityManagementFour__title">
            Smarter Solutions for{" "}
            <span className="FacilityManagementFour__titleAccent">
              Better Facilities
            </span>
          </h2>

          <p className="FacilityManagementFour__description">
            We deliver integrated facility management solutions that help
            businesses maintain safe, clean, comfortable, and efficient
            environments. From planned maintenance and building systems to
            cleaning and safety inspections, our services focus on protecting
            your facilities and supporting smooth day-to-day operations.
          </p>

          {/* Facility Services Checklist */}
          <div className="FacilityManagementFour__list">
            {facilityManagementPoints.map((point) => (
              <div
                key={point.id}
                className="FacilityManagementFour__item"
              >
                <span className="FacilityManagementFour__checkIcon">
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

                <div className="FacilityManagementFour__itemText">
                  <h4 className="FacilityManagementFour__itemTitle">
                    {point.title}
                  </h4>
                  <p className="FacilityManagementFour__itemDetail">
                    {point.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="FacilityManagementFour__actionWrap">
            <a
              href="#facility-management-details"
              className="FacilityManagementFour__linkPrimary"
            >
              <span>Explore Our Facility Services</span>
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

export default FacilityManagementFour;