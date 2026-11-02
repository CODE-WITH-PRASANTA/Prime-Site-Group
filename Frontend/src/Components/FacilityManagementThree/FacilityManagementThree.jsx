import React, { useState, useEffect, useRef } from "react";
import "./FacilityManagementThree.css";

const facilityManagementPoints = [
  {
    id: 1,
    title: "Integrated Building Maintenance",
    detail:
      "Proactive maintenance programs help keep commercial buildings, equipment, and essential infrastructure operating efficiently.",
  },
  {
    id: 2,
    title: "HVAC & Electrical System Management",
    detail:
      "Coordinated maintenance and monitoring support reliable heating, ventilation, air conditioning, and electrical systems.",
  },
  {
    id: 3,
    title: "Professional Cleaning & Hygiene",
    detail:
      "Structured cleaning schedules and hygiene management help maintain safe, clean, and welcoming work environments.",
  },
  {
    id: 4,
    title: "Safety & Operational Compliance",
    detail:
      "Routine inspections, safety procedures, and maintenance documentation support dependable facility operations.",
  },
];

const FacilityManagementThree = () => {
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
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`FacilityManagementThree ${
        isVisible ? "FacilityManagementThree--visible" : ""
      }`}
      aria-label="Facility management and building maintenance solutions"
    >
      <div className="FacilityManagementThree__container">
        {/* Left Side: Modern Facility Image */}

        <div className="FacilityManagementThree__media">
          <div className="FacilityManagementThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85"
              alt="Modern commercial building representing professional facility management"
              className="FacilityManagementThree__image"
              loading="lazy"
            />

            <div className="FacilityManagementThree__imageShade" />
          </div>

          {/* Floating Facility Management Badge */}

          <div className="FacilityManagementThree__badge">
            <span className="FacilityManagementThree__badgeDot" />

            <div className="FacilityManagementThree__badgeInfo">
              <strong>Facility Excellence</strong>
              <span>Maintenance · Safety · Efficiency</span>
            </div>
          </div>
        </div>

        {/* Right Side: Facility Management Content */}

        <div className="FacilityManagementThree__content">
          <div className="FacilityManagementThree__eyebrowWrap">
            <span className="FacilityManagementThree__eyebrowLine" />

            <span className="FacilityManagementThree__eyebrow">
              FACILITY MANAGEMENT
            </span>
          </div>

          <h2 className="FacilityManagementThree__title">
            Smarter Spaces,
            <br />
            <span className="FacilityManagementThree__titleAccent">
              Better Performance
            </span>
          </h2>

          <p className="FacilityManagementThree__description">
            We deliver integrated facility management solutions that keep
            buildings safe, efficient, and ready for everyday operations.
            From technical maintenance and building systems to professional
            cleaning and safety management, our approach helps businesses
            maintain comfortable environments while improving operational
            reliability and long-term asset performance.
          </p>

          {/* Facility Management Checklist */}

          <div className="FacilityManagementThree__list">
            {facilityManagementPoints.map((point) => (
              <div
                key={point.id}
                className="FacilityManagementThree__item"
                style={{ "--item-index": point.id }}
              >
                <span className="FacilityManagementThree__checkIcon">
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

                <div className="FacilityManagementThree__itemText">
                  <h4 className="FacilityManagementThree__itemTitle">
                    {point.title}
                  </h4>

                  <p className="FacilityManagementThree__itemDetail">
                    {point.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Primary Action Button */}

          <div className="FacilityManagementThree__actionWrap">
            <a
              href="#facility-management-services"
              className="FacilityManagementThree__linkPrimary"
            >
              <span>Explore Our Facility Solutions</span>

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

export default FacilityManagementThree;