import React, { useState, useEffect, useRef } from "react";
import "./AviationServicesThree.css";

const aviationFacilityPoints = [
  {
    id: 1,
    title: "Advanced Aircraft Maintenance Facilities",
    detail:
      "Comprehensive inspection, repair, and maintenance facilities designed to support aircraft safety and operational readiness.",
  },
  {
    id: 2,
    title: "24/7 Flight Operations Coordination",
    detail:
      "Dedicated operational teams coordinate flight schedules, ground activities, and essential aviation support services.",
  },
  {
    id: 3,
    title: "Modern Hangars & Ground Support",
    detail:
      "Well-equipped hangars and ground support infrastructure help maintain efficient aircraft handling and turnaround.",
  },
  {
    id: 4,
    title: "Aviation Safety & Compliance",
    detail:
      "Structured safety procedures and operational inspections support compliance with applicable aviation standards.",
  },
];

const AviationServicesThree = () => {
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
      className={`AviationServicesThree ${
        isVisible ? "AviationServicesThree--visible" : ""
      }`}
      aria-label="Aviation facilities and operational infrastructure"
    >
      <div className="AviationServicesThree__container">
        {/* Left Side: Aviation Facility Image */}

        <div className="AviationServicesThree__media">
          <div className="AviationServicesThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=85"
              alt="Commercial aircraft prepared for aviation operations"
              className="AviationServicesThree__image"
              loading="lazy"
            />

            <div className="AviationServicesThree__imageShade" />
          </div>

          {/* Floating Aviation Badge */}

          <div className="AviationServicesThree__badge">
            <span className="AviationServicesThree__badgeDot" />

            <div className="AviationServicesThree__badgeInfo">
              <strong>Aviation Excellence</strong>
              <span>Safety · Reliability · Performance</span>
            </div>
          </div>
        </div>

        {/* Right Side: Aviation Infrastructure Content */}

        <div className="AviationServicesThree__content">
          <div className="AviationServicesThree__eyebrowWrap">
            <span className="AviationServicesThree__eyebrowLine" />

            <span className="AviationServicesThree__eyebrow">
              AVIATION INFRASTRUCTURE
            </span>
          </div>

          <h2 className="AviationServicesThree__title">
            Built for{" "}
            <span className="AviationServicesThree__titleAccent">
              Aviation Excellence
            </span>
          </h2>

          <p className="AviationServicesThree__description">
            Our aviation infrastructure is designed to support safe,
            efficient, and reliable flight operations. From aircraft
            maintenance facilities to coordinated ground services, we focus
            on operational efficiency, technical precision, and dependable
            aviation support at every stage.
          </p>

          {/* Aviation Facilities Checklist */}

          <div className="AviationServicesThree__list">
            {aviationFacilityPoints.map((point) => (
              <div
                key={point.id}
                className="AviationServicesThree__item"
                style={{ "--item-index": point.id }}
              >
                <span className="AviationServicesThree__checkIcon">
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

                <div className="AviationServicesThree__itemText">
                  <h4 className="AviationServicesThree__itemTitle">
                    {point.title}
                  </h4>

                  <p className="AviationServicesThree__itemDetail">
                    {point.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Primary Action Button */}

          <div className="AviationServicesThree__actionWrap">
            <a
              href="#aviation-facilities"
              className="AviationServicesThree__linkPrimary"
            >
              <span>Explore Our Aviation Services</span>

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

export default AviationServicesThree;