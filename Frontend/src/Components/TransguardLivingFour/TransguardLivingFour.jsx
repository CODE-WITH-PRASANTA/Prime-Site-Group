import React, { useEffect, useRef, useState } from "react";
import "./TransguardLivingFour.css";

const TransguardLivingFour = () => {
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
      title: "Residential Security",
      description:
        "Support safer residential environments through attentive security practices and professional on-site assistance.",
    },
    {
      number: "02",
      title: "Access Control & Visitor Support",
      description:
        "Help manage entry points and visitor movement with organized procedures that support residents and property teams.",
    },
    {
      number: "03",
      title: "Community Assistance",
      description:
        "Deliver courteous, responsive assistance to residents and visitors while helping everyday community activities run smoothly.",
    },
    {
      number: "04",
      title: "Property Safety & Coordination",
      description:
        "Coordinate routine observations and report concerns promptly to help maintain a secure, well-managed living environment.",
    },
  ];

  return (
    <section
      className={`TransguardLivingFour-section ${
        isVisible ? "TransguardLivingFour-visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="TransguardLivingFour-container">
        <div className="TransguardLivingFour-visual">
          <div className="TransguardLivingFour-image-frame">
            <img
              className="TransguardLivingFour-image"
              src="https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=2200&q=85"
              alt="Modern residential property with a secure and welcoming entrance"
              loading="lazy"
            />
            <div className="TransguardLivingFour-image-overlay"></div>
          </div>

          <span className="TransguardLivingFour-corner TransguardLivingFour-corner-top"></span>
          <span className="TransguardLivingFour-corner TransguardLivingFour-corner-bottom"></span>

          <div className="TransguardLivingFour-floating-card">
            <span className="TransguardLivingFour-badge-line"></span>
            <div>
              <p className="TransguardLivingFour-badge-title">
                Safer Spaces, Better Living
              </p>
              <p className="TransguardLivingFour-badge-text">
                Professional support for secure and welcoming communities.
              </p>
            </div>
          </div>
        </div>

        <div className="TransguardLivingFour-content">
          <span className="TransguardLivingFour-eyebrow">
            TRANSGUARD LIVING
          </span>

          <h2 className="TransguardLivingFour-heading">
            Creating Safer <span>Places to Live</span>
          </h2>

          <p className="TransguardLivingFour-description">
            A comfortable community starts with reliable support and
            responsible property management. Our residential services focus on
            security, visitor assistance, and everyday coordination to help
            residents feel welcome while supporting the smooth operation of
            residential properties.
          </p>

          <div className="TransguardLivingFour-service-list">
            {services.map((service, index) => (
              <div
                className="TransguardLivingFour-service-item"
                key={service.number}
                style={{ "--item-index": index }}
              >
                <div className="TransguardLivingFour-check">
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

                <div className="TransguardLivingFour-service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="TransguardLivingFour-button"
            href="#transguard-living-details"
          >
            <span>Explore Residential Services</span>
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

export default TransguardLivingFour;