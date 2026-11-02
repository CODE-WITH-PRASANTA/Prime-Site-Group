import React, { useEffect, useRef, useState } from "react";
import "./WorkforceSoluationThree.css";

const workforceSoluationPoints = [
  {
    title: "Recruitment & Talent Acquisition",
    description:
      "Find suitable candidates through structured recruitment solutions tailored to your business requirements.",
  },
  {
    title: "Flexible Staffing Solutions",
    description:
      "Adapt to changing workloads with temporary, permanent, and contract staffing support.",
  },
  {
    title: "Workforce Planning & Management",
    description:
      "Improve team coordination, resource allocation, and workforce productivity with organized planning.",
  },
  {
    title: "Training & Professional Development",
    description:
      "Support employee growth through skills development, onboarding, and continuous improvement.",
  },
];

const WorkforceSoluationThree = () => {
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
      className={`WorkforceSoluationThree-section ${
        isVisible ? "WorkforceSoluationThree-visible" : ""
      }`}
    >
      <div className="WorkforceSoluationThree-container">
        <div className="WorkforceSoluationThree-image-column">
          <div className="WorkforceSoluationThree-image-frame">
            <img
              className="WorkforceSoluationThree-main-image"
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2200&q=85"
              alt="Professionals working together in a collaborative workplace"
              loading="lazy"
            />

            <div className="WorkforceSoluationThree-image-overlay"></div>
          </div>

          <div className="WorkforceSoluationThree-floating-badge">
            <span className="WorkforceSoluationThree-badge-icon">✓</span>

            <div className="WorkforceSoluationThree-badge-content">
              <strong>People Drive Success</strong>
              <span>Skilled · Supported · Productive</span>
            </div>
          </div>

          <div className="WorkforceSoluationThree-image-decoration"></div>
        </div>

        <div className="WorkforceSoluationThree-content">
          <span className="WorkforceSoluationThree-eyebrow">
            SMART WORKFORCE SOLUTIONS
          </span>

          <h2 className="WorkforceSoluationThree-title">
            The Right People
            <br />
            <span>For Every Opportunity</span>
          </h2>

          <p className="WorkforceSoluationThree-description">
            A successful business starts with the right people in the right
            roles. Our workforce solutions help organizations find talent,
            manage staffing requirements, and build capable teams. From
            recruitment and workforce planning to employee development, we
            help businesses create a more productive and adaptable workplace.
          </p>

          <div className="WorkforceSoluationThree-features">
            {workforceSoluationPoints.map((point, index) => (
              <div
                className="WorkforceSoluationThree-feature"
                key={point.title}
                style={{ "--feature-index": index }}
              >
                <div className="WorkforceSoluationThree-check">
                  <span>✓</span>
                </div>

                <div className="WorkforceSoluationThree-feature-content">
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="WorkforceSoluationThree-button"
            href="#workforce-solutions-details"
          >
            Explore Workforce Solutions
            <span className="WorkforceSoluationThree-button-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkforceSoluationThree;