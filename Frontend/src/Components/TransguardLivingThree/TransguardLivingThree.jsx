import React, { useEffect, useRef, useState } from "react";
import "./TransguardLivingThree.css";

const transguardLivingPoints = [
  {
    title: "Residential Security Solutions",
    description:
      "Protect homes, residential communities, and private properties with reliable security services.",
  },
  {
    title: "Trained Security Personnel",
    description:
      "Experienced security professionals help maintain a safe, controlled, and welcoming environment.",
  },
  {
    title: "Access Control & Monitoring",
    description:
      "Support safer entry points with visitor management, access monitoring, and security checks.",
  },
  {
    title: "24/7 Safety & Support",
    description:
      "Maintain peace of mind with responsive security assistance and consistent property monitoring.",
  },
];

const TransguardLivingThree = () => {
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
      className={`TransguardLivingThree-section ${
        isVisible ? "TransguardLivingThree-visible" : ""
      }`}
    >
      <div className="TransguardLivingThree-container">
        <div className="TransguardLivingThree-image-column">
          <div className="TransguardLivingThree-image-frame">
            <img
              className="TransguardLivingThree-main-image"
              src="https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=2200&q=85"
              alt="Modern residential building with secure entry"
              loading="lazy"
            />

            <div className="TransguardLivingThree-image-overlay"></div>
          </div>

          <div className="TransguardLivingThree-floating-badge">
            <span className="TransguardLivingThree-badge-icon">✓</span>

            <div className="TransguardLivingThree-badge-content">
              <strong>Safety Comes First</strong>
              <span>Secure · Reliable · Professional</span>
            </div>
          </div>

          <div className="TransguardLivingThree-image-decoration"></div>
        </div>

        <div className="TransguardLivingThree-content">
          <span className="TransguardLivingThree-eyebrow">
            SECURITY FOR MODERN LIVING
          </span>

          <h2 className="TransguardLivingThree-title">
            Creating Safer Spaces
            <br />
            <span>For Better Living</span>
          </h2>

          <p className="TransguardLivingThree-description">
            Every home and residential community deserves to feel safe.
            Our residential security solutions focus on protecting people
            and property through professional security personnel, controlled
            access, and dependable monitoring. We help create environments
            where residents can feel comfortable and confident every day.
          </p>

          <div className="TransguardLivingThree-features">
            {transguardLivingPoints.map((point, index) => (
              <div
                className="TransguardLivingThree-feature"
                key={point.title}
                style={{ "--feature-index": index }}
              >
                <div className="TransguardLivingThree-check">
                  <span>✓</span>
                </div>

                <div className="TransguardLivingThree-feature-content">
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="TransguardLivingThree-button"
            href="#transguard-living-details"
          >
            Explore Security Solutions
            <span className="TransguardLivingThree-button-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TransguardLivingThree;