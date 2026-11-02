import React, { useEffect, useRef, useState } from "react";
import "./TasteOfHomeThree.css";

const tasteOfHomePoints = [
  {
    title: "Freshly Prepared Meals",
    description:
      "Enjoy carefully prepared dishes made with fresh ingredients and attention to every detail.",
  },
  {
    title: "Customized Food Menus",
    description:
      "Choose flexible menu options designed around your preferences, requirements, and occasions.",
  },
  {
    title: "Professional Catering Services",
    description:
      "Make every gathering special with dependable food preparation and organized catering support.",
  },
  {
    title: "Quality & Hygiene Standards",
    description:
      "Experience delicious food prepared with a strong focus on cleanliness, quality, and consistency.",
  },
];

const TasteOfHomeThree = () => {
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
      className={`TasteOfHomeThree-section ${
        isVisible ? "TasteOfHomeThree-visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="TasteOfHomeThree-container">
        <div className="TasteOfHomeThree-image-column">
          <div className="TasteOfHomeThree-image-frame">
            <img
              className="TasteOfHomeThree-main-image"
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2200&q=85"
              alt="Fresh food being prepared in a modern kitchen"
              loading="lazy"
            />

            <div className="TasteOfHomeThree-image-overlay"></div>
          </div>

          <div className="TasteOfHomeThree-floating-badge">
            <span className="TasteOfHomeThree-badge-icon">✦</span>
            <div className="TasteOfHomeThree-badge-content">
              <strong>Made With Care</strong>
              <span>Fresh · Delicious · Memorable</span>
            </div>
          </div>

          <div className="TasteOfHomeThree-image-decoration"></div>
        </div>

        <div className="TasteOfHomeThree-content">
          <span className="TasteOfHomeThree-eyebrow">
            A LITTLE TASTE OF HOME
          </span>

          <h2 className="TasteOfHomeThree-title">
            Bringing Fresh Flavours
            <br />
            <span>To Every Table</span>
          </h2>

          <p className="TasteOfHomeThree-description">
            Great food brings people together. Our food and catering solutions
            combine fresh ingredients, thoughtful preparation, and dependable
            service to create memorable dining experiences for homes, offices,
            celebrations, and special occasions.
          </p>

          <div className="TasteOfHomeThree-features">
            {tasteOfHomePoints.map((point, index) => (
              <div
                className="TasteOfHomeThree-feature"
                key={point.title}
                style={{ "--feature-index": index }}
              >
                <div className="TasteOfHomeThree-check">
                  <span>✓</span>
                </div>

                <div className="TasteOfHomeThree-feature-content">
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="TasteOfHomeThree-button"
            href="#taste-of-home-details"
          >
            Discover Our Food Services
            <span className="TasteOfHomeThree-button-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TasteOfHomeThree;