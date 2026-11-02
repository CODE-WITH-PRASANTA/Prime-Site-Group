import React, { useState, useEffect, useRef } from "react";
import "./KitchenMaintenanceSolutionsFive.css";

const kitchenHighlights = [
  {
    id: 1,
    title: "Preventive Kitchen Maintenance",
    detail:
      "Regular inspection and preventive maintenance to keep commercial kitchen equipment operating efficiently.",
  },
  {
    id: 2,
    title: "Equipment Repair & Servicing",
    detail:
      "Reliable maintenance and repair solutions for kitchen appliances, cooking equipment, and essential systems.",
  },
  {
    id: 3,
    title: "Hygiene & Operational Safety",
    detail:
      "Professional maintenance practices that support kitchen cleanliness, workplace safety, and uninterrupted operations.",
  },
];

const KitchenMaintenanceSolutionsFive = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);

  // Scroll-triggered entrance animation
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
      { threshold: 0.18 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Interactive 3D image hover effect
  const handleMouseMove = (e) => {
    const card = mediaRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.setProperty(
      "--KitchenMaintenanceSolutionsFive-rx",
      `${rotateX}deg`
    );

    card.style.setProperty(
      "--KitchenMaintenanceSolutionsFive-ry",
      `${rotateY}deg`
    );

    card.style.setProperty(
      "--KitchenMaintenanceSolutionsFive-scale",
      "1.025"
    );

    card.style.setProperty(
      "--KitchenMaintenanceSolutionsFive-shine-x",
      `${(x / rect.width) * 100}%`
    );

    card.style.setProperty(
      "--KitchenMaintenanceSolutionsFive-shine-y",
      `${(y / rect.height) * 100}%`
    );
  };

  const handleMouseLeave = () => {
    const card = mediaRef.current;
    if (!card) return;

    card.style.setProperty(
      "--KitchenMaintenanceSolutionsFive-rx",
      "0deg"
    );

    card.style.setProperty(
      "--KitchenMaintenanceSolutionsFive-ry",
      "0deg"
    );

    card.style.setProperty(
      "--KitchenMaintenanceSolutionsFive-scale",
      "1"
    );

    card.style.setProperty(
      "--KitchenMaintenanceSolutionsFive-shine-x",
      "50%"
    );

    card.style.setProperty(
      "--KitchenMaintenanceSolutionsFive-shine-y",
      "50%"
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`KitchenMaintenanceSolutionsFive ${
        isVisible ? "KitchenMaintenanceSolutionsFive--visible" : ""
      }`}
      aria-label="Kitchen Maintenance Solutions and Services"
    >
      <div className="KitchenMaintenanceSolutionsFive__container">
        {/* Left Side: Content */}

        <div className="KitchenMaintenanceSolutionsFive__content">
          <div className="KitchenMaintenanceSolutionsFive__eyebrowWrap">
            <span className="KitchenMaintenanceSolutionsFive__eyebrowLine" />

            <span className="KitchenMaintenanceSolutionsFive__eyebrow">
              OUR EXPERTISE
            </span>
          </div>

          <h2 className="KitchenMaintenanceSolutionsFive__title">
            <span className="KitchenMaintenanceSolutionsFive__titlePrimary">
              Kitchen{" "}
            </span>

            <span className="KitchenMaintenanceSolutionsFive__titleAccent">
              Maintenance
            </span>
          </h2>

          <p className="KitchenMaintenanceSolutionsFive__description">
            We provide dependable kitchen maintenance solutions designed
            to keep commercial kitchens safe, clean, and running smoothly.
            From preventive servicing to equipment repairs, our approach
            focuses on operational efficiency, reliable performance, and
            long-term equipment care.
          </p>

          {/* Kitchen Maintenance Highlights */}

          <div className="KitchenMaintenanceSolutionsFive__list">
            {kitchenHighlights.map((item) => (
              <div
                key={item.id}
                className="KitchenMaintenanceSolutionsFive__item"
              >
                <span className="KitchenMaintenanceSolutionsFive__checkIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>

                <div className="KitchenMaintenanceSolutionsFive__itemText">
                  <h4 className="KitchenMaintenanceSolutionsFive__itemTitle">
                    {item.title}
                  </h4>

                  <p className="KitchenMaintenanceSolutionsFive__itemDetail">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}

          <div className="KitchenMaintenanceSolutionsFive__actionWrap">
            <a
              href="#partner-with-us"
              className="KitchenMaintenanceSolutionsFive__btnPrimary"
            >
              <span>Get In Touch</span>

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

        {/* Right Side: Interactive Image */}

        <div
          ref={mediaRef}
          className="KitchenMaintenanceSolutionsFive__media"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="KitchenMaintenanceSolutionsFive__imageClip">
            <img
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2200&q=85"
              alt="Modern kitchen workspace with professional kitchen equipment"
              className="KitchenMaintenanceSolutionsFive__image"
              loading="lazy"
            />

            <div className="KitchenMaintenanceSolutionsFive__lightSweep" />

            <div className="KitchenMaintenanceSolutionsFive__imageShade" />
          </div>

          {/* Floating Badge */}

          <div className="KitchenMaintenanceSolutionsFive__badge">
            <span className="KitchenMaintenanceSolutionsFive__badgeDot" />

            <div className="KitchenMaintenanceSolutionsFive__badgeInfo">
              <strong>Reliable Maintenance</strong>
              <span>Professional Kitchen Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitchenMaintenanceSolutionsFive;