import React, { useState, useEffect, useRef } from "react";
import "./AviationServicesFour.css";

const aviationPoints = [
  {
    id: 1,
    title: "Aircraft Ground Support",
    detail:
      "Coordinated ground handling and operational support to help aircraft maintain efficient turnaround times.",
  },
  {
    id: 2,
    title: "Passenger Assistance Services",
    detail:
      "Professional passenger support focused on smooth check-in, boarding coordination, and a comfortable travel experience.",
  },
  {
    id: 3,
    title: "Airport Operations Management",
    detail:
      "Reliable operational coordination designed to support airport workflows, service quality, and on-time performance.",
  },
  {
    id: 4,
    title: "Safety and Quality Standards",
    detail:
      "Consistent safety procedures, trained personnel, and quality monitoring across aviation support activities.",
  },
];

const AviationServicesFour = () => {
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
      className={`AviationServicesFour ${
        isVisible ? "AviationServicesFour--visible" : ""
      }`}
      aria-label="Aviation Services"
    >
      <div className="AviationServicesFour__container">
        <div className="AviationServicesFour__media">
          <div className="AviationServicesFour__imageClip">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2200&q=85"
              alt="Commercial aircraft prepared for aviation operations"
              className="AviationServicesFour__image"
              loading="lazy"
            />
            <div className="AviationServicesFour__imageShade" />
          </div>

          <div className="AviationServicesFour__badge">
            <span className="AviationServicesFour__badgeDot" />
            <div className="AviationServicesFour__badgeInfo">
              <strong>Aviation-Ready Operations</strong>
              <span>Safety, Service & Efficiency</span>
            </div>
          </div>
        </div>

        <div className="AviationServicesFour__content">
          <div className="AviationServicesFour__eyebrowWrap">
            <span className="AviationServicesFour__eyebrowLine" />
            <span className="AviationServicesFour__eyebrow">
              AVIATION SERVICES
            </span>
          </div>

          <h2 className="AviationServicesFour__title">
            Reliable Support for{" "}
            <span className="AviationServicesFour__titleAccent">
              Aviation Operations
            </span>
          </h2>

          <p className="AviationServicesFour__description">
            We provide dependable aviation support services designed to help
            airport and airline operations run smoothly. From ground handling
            and passenger assistance to operational coordination and quality
            monitoring, our approach puts safety, efficiency, and service
            excellence first.
          </p>

          <div className="AviationServicesFour__list">
            {aviationPoints.map((point) => (
              <div
                key={point.id}
                className="AviationServicesFour__item"
              >
                <span className="AviationServicesFour__checkIcon">
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

                <div className="AviationServicesFour__itemText">
                  <h4 className="AviationServicesFour__itemTitle">
                    {point.title}
                  </h4>
                  <p className="AviationServicesFour__itemDetail">
                    {point.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="AviationServicesFour__actionWrap">
            <a
              href="#aviation-service-details"
              className="AviationServicesFour__linkPrimary"
            >
              <span>Explore Aviation Services</span>
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

export default AviationServicesFour;