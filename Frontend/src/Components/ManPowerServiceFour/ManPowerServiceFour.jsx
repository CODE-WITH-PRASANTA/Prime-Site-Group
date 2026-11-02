import React, { useEffect, useRef, useState } from "react";
import "./ManPowerServiceFour.css";

const ManPowerServiceFour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
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
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      number: "01",
      title: "Skilled Workforce",
      description:
        "Access qualified and experienced professionals suited to your business needs, operational goals, and industry requirements.",
    },
    {
      number: "02",
      title: "Flexible Staffing",
      description:
        "Scale your workforce with flexible staffing solutions for temporary projects, seasonal demand, and long-term assignments.",
    },
    {
      number: "03",
      title: "Recruitment & Selection",
      description:
        "Find suitable candidates through a structured recruitment process focused on skills, experience, and role requirements.",
    },
    {
      number: "04",
      title: "Workforce Management",
      description:
        "Keep daily operations running smoothly with reliable workforce coordination, attendance support, and ongoing assistance.",
    },
  ];

  return (
    <section
      className={`ManPowerServiceFour-section ${
        isVisible ? "ManPowerServiceFour-visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="ManPowerServiceFour-container">
        <div className="ManPowerServiceFour-visual">
          <div className="ManPowerServiceFour-image-frame">
            <img
              className="ManPowerServiceFour-image"
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2200&q=85"
              alt="Professional team collaborating in a workplace"
              loading="lazy"
            />
            <div className="ManPowerServiceFour-image-overlay"></div>
          </div>

          <span className="ManPowerServiceFour-corner ManPowerServiceFour-corner-top"></span>
          <span className="ManPowerServiceFour-corner ManPowerServiceFour-corner-bottom"></span>

          <div className="ManPowerServiceFour-floating-card">
            <span className="ManPowerServiceFour-badge-line"></span>
            <div>
              <p className="ManPowerServiceFour-badge-title">
                People. Performance. Progress.
              </p>
              <p className="ManPowerServiceFour-badge-text">
                Workforce solutions built around your business.
              </p>
            </div>
          </div>
        </div>

        <div className="ManPowerServiceFour-content">
          <span className="ManPowerServiceFour-eyebrow">
            MANPOWER SERVICES
          </span>

          <h2 className="ManPowerServiceFour-heading">
            The Right People for <span>Stronger Business</span>
          </h2>

          <p className="ManPowerServiceFour-description">
            Build a dependable team with manpower solutions designed around
            your business requirements. From sourcing skilled professionals
            to managing workforce needs, we help you find the right people to
            support productivity, consistency, and long-term growth.
          </p>

          <div className="ManPowerServiceFour-service-list">
            {services.map((service, index) => (
              <div
                className="ManPowerServiceFour-service-item"
                key={service.number}
                style={{ "--item-index": index }}
              >
                <div className="ManPowerServiceFour-check">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M5 12.5 9.5 17 19 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="ManPowerServiceFour-service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="ManPowerServiceFour-button"
            href="#manpower-services-details"
          >
            <span>Explore Manpower Services</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M4.5 12h14m-6-6 6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ManPowerServiceFour;