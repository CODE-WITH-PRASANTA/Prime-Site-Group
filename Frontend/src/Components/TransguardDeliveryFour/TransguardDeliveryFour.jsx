import React, { useEffect, useRef, useState } from "react";
import "./TransguardDeliveryFour.css";

const TransguardDeliveryFour = () => {
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
      title: "Reliable Delivery Operations",
      description:
        "Coordinate deliveries efficiently with organized processes designed to keep goods moving safely and on schedule.",
    },
    {
      number: "02",
      title: "Logistics & Distribution",
      description:
        "Support your supply chain with dependable distribution planning and delivery coordination tailored to your business.",
    },
    {
      number: "03",
      title: "Secure Handling of Goods",
      description:
        "Prioritize careful handling, responsible transportation, and consistent procedures throughout the delivery journey.",
    },
    {
      number: "04",
      title: "Flexible Delivery Support",
      description:
        "Adapt delivery operations to changing schedules, business demands, and customer requirements with practical support.",
    },
  ];

  return (
    <section
      className={`TransguardDeliveryFour-section ${
        isVisible ? "TransguardDeliveryFour-visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="TransguardDeliveryFour-container">
        <div className="TransguardDeliveryFour-visual">
          <div className="TransguardDeliveryFour-image-frame">
            <img
              className="TransguardDeliveryFour-image"
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85"
              alt="Organized logistics warehouse with packages ready for distribution"
              loading="lazy"
            />
            <div className="TransguardDeliveryFour-image-overlay"></div>
          </div>

          <span className="TransguardDeliveryFour-corner TransguardDeliveryFour-corner-top"></span>
          <span className="TransguardDeliveryFour-corner TransguardDeliveryFour-corner-bottom"></span>

          <div className="TransguardDeliveryFour-floating-card">
            <span className="TransguardDeliveryFour-badge-line"></span>
            <div>
              <p className="TransguardDeliveryFour-badge-title">
                Moving Business Forward
              </p>
              <p className="TransguardDeliveryFour-badge-text">
                Reliable delivery. Efficient logistics. Dependable service.
              </p>
            </div>
          </div>
        </div>

        <div className="TransguardDeliveryFour-content">
          <span className="TransguardDeliveryFour-eyebrow">
            DELIVERY & LOGISTICS
          </span>

          <h2 className="TransguardDeliveryFour-heading">
            Delivering More Than <span>Just Packages</span>
          </h2>

          <p className="TransguardDeliveryFour-description">
            Keep your business connected with dependable delivery and logistics
            support. From distribution coordination to secure goods handling,
            our service approach focuses on efficiency, reliability, and
            meeting the changing needs of your operations.
          </p>

          <div className="TransguardDeliveryFour-service-list">
            {services.map((service, index) => (
              <div
                className="TransguardDeliveryFour-service-item"
                key={service.number}
                style={{ "--item-index": index }}
              >
                <div className="TransguardDeliveryFour-check">
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

                <div className="TransguardDeliveryFour-service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="TransguardDeliveryFour-button"
            href="#transguard-delivery-details"
          >
            <span>Explore Delivery Services</span>
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

export default TransguardDeliveryFour;