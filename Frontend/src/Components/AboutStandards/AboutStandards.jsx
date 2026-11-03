import React, { useState, useEffect, useRef } from "react";
import "./AboutStandards.css";

// Change the brand name here and it updates everywhere in this section.
const BRAND_NAME = "Prime Site";

const standardsPillars = [
  {
    id: 1,
    title: "Safety First Culture",
    desc: "Every team member is briefed, trained and equipped to stay safe on site.",
  },
  {
    id: 2,
    title: "Compliance & Standards",
    desc: "We follow applicable health, safety and labour regulations on every project.",
  },
  {
    id: 3,
    title: "Responsible Operations",
    desc: "Practical steps to reduce waste and protect the environment we work in.",
  },
];

const AboutStandards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      // low threshold so tall stacked layouts on phones still reveal
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`AboutStandards ${isVisible ? "AboutStandards--visible" : ""}`}
      aria-label={`${BRAND_NAME} health, safety and environment standards`}
    >
      <div className="AboutStandards__container">
        {/* Left: angled image */}
        <div className="AboutStandards__media">
          <div className="AboutStandards__imageClip">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80"
              alt="Construction specialist working safely on site"
              className="AboutStandards__image"
              loading="lazy"
              decoding="async"
            />
            <div className="AboutStandards__imageShade" />
          </div>

          <div className="AboutStandards__badge">
            <span className="AboutStandards__badgeDot" />
            <div className="AboutStandards__badgeInfo">
              <strong>Safety First</strong>
              <span>Safe people. Safe sites.</span>
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="AboutStandards__content">
          <div className="AboutStandards__eyebrowWrap">
            <span className="AboutStandards__eyebrowLine" />
            <span className="AboutStandards__eyebrow">STANDARDS</span>
          </div>

          <h2 className="AboutStandards__title">
            Health, Safety and{" "}
            <span className="AboutStandards__titleAccent">Environment</span>
          </h2>

          <p className="AboutStandards__description">
            At {BRAND_NAME}, a strong Health, Safety and Environment (HSE)
            culture is part of the way we work. We prepare and support every
            member of our workforce to stay safe, and we manage safety
            proactively across every client site and project.
          </p>

          <div className="AboutStandards__pillars">
            {standardsPillars.map((pillar) => (
              <div key={pillar.id} className="AboutStandards__pillarItem">
                <div className="AboutStandards__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="AboutStandards__pillarText">
                  <h4 className="AboutStandards__pillarTitle">{pillar.title}</h4>
                  <p className="AboutStandards__pillarDesc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="AboutStandards__actionWrap">
            <a href="/hse-policy" className="AboutStandards__linkPrimary">
              <span>Explore Our HSE Approach</span>
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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

export default AboutStandards;