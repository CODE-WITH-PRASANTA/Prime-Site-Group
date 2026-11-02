import React, { useEffect, useRef, useState } from "react";
import "./TransguardDeliveryThree.css";

const transguardDeliveryPoints = [
  {
    title: "Reliable Delivery Operations",
    description:
      "Keep deliveries moving smoothly with organized operations and dependable service support.",
  },
  {
    title: "Logistics & Route Coordination",
    description:
      "Improve delivery efficiency through structured scheduling, route planning, and coordination.",
  },
  {
    title: "Professional Delivery Teams",
    description:
      "Support daily delivery operations with trained personnel focused on care, service, and punctuality.",
  },
  {
    title: "Quality & Delivery Monitoring",
    description:
      "Maintain consistent service standards with organized tracking, operational checks, and reporting.",
  },
];

const TransguardDeliveryThree = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      className={`TransguardDeliveryThree-section ${
        isVisible ? "TransguardDeliveryThree-visible" : ""
      }`}
    >
      <div className="TransguardDeliveryThree-container">
        <div className="TransguardDeliveryThree-image-column">
          <div className="TransguardDeliveryThree-image-frame">
            <img
              className="TransguardDeliveryThree-main-image"
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85"
              alt="Organized warehouse supporting delivery and logistics operations"
              loading="lazy"
            />

            <div className="TransguardDeliveryThree-image-overlay"></div>
          </div>

          <div className="TransguardDeliveryThree-floating-badge">
            <span className="TransguardDeliveryThree-badge-icon">✓</span>

            <div className="TransguardDeliveryThree-badge-content">
              <strong>Delivery You Can Trust</strong>
              <span>Reliable · Efficient · Professional</span>
            </div>
          </div>

          <div className="TransguardDeliveryThree-image-decoration"></div>
        </div>

        <div className="TransguardDeliveryThree-content">
          <span className="TransguardDeliveryThree-eyebrow">
            DELIVERY & LOGISTICS SOLUTIONS
          </span>

          <h2 className="TransguardDeliveryThree-title">
            Moving Every Delivery
            <br />
            <span>Forward With Confidence</span>
          </h2>

          <p className="TransguardDeliveryThree-description">
            Efficient delivery operations are essential to keeping businesses
            connected and customers satisfied. Our delivery support solutions
            focus on logistics coordination, organized workflows, professional
            teams, and consistent service standards. We help businesses
            streamline everyday delivery activities and build a more reliable
            distribution process.
          </p>

          <div className="TransguardDeliveryThree-features">
            {transguardDeliveryPoints.map((point, index) => (
              <div
                className="TransguardDeliveryThree-feature"
                key={point.title}
                style={{ "--feature-index": index }}
              >
                <div className="TransguardDeliveryThree-check">
                  <span>✓</span>
                </div>

                <div className="TransguardDeliveryThree-feature-content">
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="TransguardDeliveryThree-button"
            href="#transguard-delivery-details"
          >
            Explore Delivery Solutions
            <span className="TransguardDeliveryThree-button-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TransguardDeliveryThree;