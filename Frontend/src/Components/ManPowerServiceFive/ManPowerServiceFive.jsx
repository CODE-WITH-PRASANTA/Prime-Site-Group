import React, { useState, useEffect, useRef } from "react";
import "./ManPowerServiceFive.css";

const manpowerHighlights = [
  {
    id: 1,
    title: "Skilled Workforce Solutions",
    detail:
      "Providing qualified, trained, and dependable manpower tailored to your business requirements.",
  },
  {
    id: 2,
    title: "Flexible Staffing Services",
    detail:
      "Customized workforce deployment designed to support changing operational demands.",
  },
  {
    id: 3,
    title: "Reliable Workforce Management",
    detail:
      "Streamlined recruitment, workforce coordination, and ongoing support to improve productivity.",
  },
];

const ManPowerServiceFive = () => {
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

    card.style.setProperty("--ManPowerServiceFive-rx", `${rotateX}deg`);
    card.style.setProperty("--ManPowerServiceFive-ry", `${rotateY}deg`);
    card.style.setProperty("--ManPowerServiceFive-scale", "1.025");

    card.style.setProperty(
      "--ManPowerServiceFive-shine-x",
      `${(x / rect.width) * 100}%`
    );

    card.style.setProperty(
      "--ManPowerServiceFive-shine-y",
      `${(y / rect.height) * 100}%`
    );
  };

  const handleMouseLeave = () => {
    const card = mediaRef.current;
    if (!card) return;

    card.style.setProperty("--ManPowerServiceFive-rx", "0deg");
    card.style.setProperty("--ManPowerServiceFive-ry", "0deg");
    card.style.setProperty("--ManPowerServiceFive-scale", "1");
    card.style.setProperty("--ManPowerServiceFive-shine-x", "50%");
    card.style.setProperty("--ManPowerServiceFive-shine-y", "50%");
  };

  return (
    <section
      ref={sectionRef}
      className={`ManPowerServiceFive ${
        isVisible ? "ManPowerServiceFive--visible" : ""
      }`}
      aria-label="Manpower Services and Workforce Solutions"
    >
      <div className="ManPowerServiceFive__container">
        {/* Left Side: Content */}
        <div className="ManPowerServiceFive__content">
          <div className="ManPowerServiceFive__eyebrowWrap">
            <span className="ManPowerServiceFive__eyebrowLine" />
            <span className="ManPowerServiceFive__eyebrow">
              OUR EXPERTISE
            </span>
          </div>

          <h2 className="ManPowerServiceFive__title">
            <span className="ManPowerServiceFive__titlePrimary">
              Manpower{" "}
            </span>
            <span className="ManPowerServiceFive__titleAccent">
              Solutions
            </span>
          </h2>

          <p className="ManPowerServiceFive__description">
            We deliver dependable manpower solutions that help businesses
            operate efficiently and achieve their goals. From skilled workforce
            deployment to flexible staffing and workforce coordination, our
            approach focuses on quality, reliability, and your business needs.
          </p>

          {/* Workforce Capabilities */}
          <div className="ManPowerServiceFive__list">
            {manpowerHighlights.map((item) => (
              <div
                key={item.id}
                className="ManPowerServiceFive__item"
              >
                <span className="ManPowerServiceFive__checkIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>

                <div className="ManPowerServiceFive__itemText">
                  <h4 className="ManPowerServiceFive__itemTitle">
                    {item.title}
                  </h4>

                  <p className="ManPowerServiceFive__itemDetail">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="ManPowerServiceFive__actionWrap">
            <a
              href="#partner-with-us"
              className="ManPowerServiceFive__btnPrimary"
            >
              <span>Partner With Us</span>

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
          className="ManPowerServiceFive__media"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="ManPowerServiceFive__imageClip">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2200&q=85"
              alt="Professional team collaborating in a modern workplace"
              className="ManPowerServiceFive__image"
              loading="lazy"
            />

            <div className="ManPowerServiceFive__lightSweep" />
            <div className="ManPowerServiceFive__imageShade" />
          </div>

          {/* Floating Workforce Badge */}
          <div className="ManPowerServiceFive__badge">
            <span className="ManPowerServiceFive__badgeDot" />

            <div className="ManPowerServiceFive__badgeInfo">
              <strong>Workforce Excellence</strong>
              <span>Reliable Manpower Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManPowerServiceFive;