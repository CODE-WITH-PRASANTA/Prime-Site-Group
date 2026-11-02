import React, { useState, useEffect, useRef } from "react";
import "./AviationServicesFive.css";

const deliveryHighlights = [
  {
    id: 1,
    title: "End-to-End Aviation Solutions",
    detail:
      "Integrated aviation services designed to support efficient and reliable operations.",
  },
  {
    id: 2,
    title: "Customer-Centric Operations",
    detail:
      "Customized aviation solutions aligned with client requirements and operational demands.",
  },
  {
    id: 3,
    title: "Continuous Service Innovation",
    detail:
      "Modern processes and innovative solutions to improve operational efficiency and service quality.",
  },
];

const AviationServicesFive = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);

  // Intersection observer for entrance animation
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

  // Interactive 3D pointer hover effect on image
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

    card.style.setProperty("--AviationServicesFive-rx", `${rotateX}deg`);
    card.style.setProperty("--AviationServicesFive-ry", `${rotateY}deg`);
    card.style.setProperty("--AviationServicesFive-scale", "1.025");

    card.style.setProperty(
      "--AviationServicesFive-shine-x",
      `${(x / rect.width) * 100}%`
    );

    card.style.setProperty(
      "--AviationServicesFive-shine-y",
      `${(y / rect.height) * 100}%`
    );
  };

  // Reset image when the pointer leaves
  const handleMouseLeave = () => {
    const card = mediaRef.current;
    if (!card) return;

    card.style.setProperty("--AviationServicesFive-rx", "0deg");
    card.style.setProperty("--AviationServicesFive-ry", "0deg");
    card.style.setProperty("--AviationServicesFive-scale", "1");
  };

  return (
    <section
      ref={sectionRef}
      className={`AviationServicesFive ${
        isVisible ? "AviationServicesFive--visible" : ""
      }`}
      aria-label="Aviation Services and Solutions"
    >
      <div className="AviationServicesFive__container">
        {/* Left Side: Staggered Content */}
        <div className="AviationServicesFive__content">
          <div className="AviationServicesFive__eyebrowWrap">
            <span className="AviationServicesFive__eyebrowLine" />
            <span className="AviationServicesFive__eyebrow">
              OUR SERVICES
            </span>
          </div>

          <h2 className="AviationServicesFive__title">
            <span className="AviationServicesFive__titlePrimary">
              What We{" "}
            </span>
            <span className="AviationServicesFive__titleAccent">
              Deliver
            </span>
          </h2>

          <p className="AviationServicesFive__description">
            We provide comprehensive aviation services focused on safety,
            efficiency, and customer satisfaction. Our team delivers reliable,
            innovative solutions designed to meet the evolving needs of the
            aviation industry.
          </p>

          {/* Aviation Service Highlights */}
          <div className="AviationServicesFive__list">
            {deliveryHighlights.map((item) => (
              <div
                key={item.id}
                className="AviationServicesFive__item"
              >
                <span className="AviationServicesFive__checkIcon">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>

                <div className="AviationServicesFive__itemText">
                  <h4 className="AviationServicesFive__itemTitle">
                    {item.title}
                  </h4>

                  <p className="AviationServicesFive__itemDetail">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTA Button */}
          <div className="AviationServicesFive__actionWrap">
            <a
              href="#partner-with-us"
              className="AviationServicesFive__btnPrimary"
            >
              <span>Explore Our Services</span>

              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Interactive 3D Image */}
        <div
          ref={mediaRef}
          className="AviationServicesFive__media"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="AviationServicesFive__imageClip">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2200&q=85"
              alt="Aircraft flying through the sky"
              className="AviationServicesFive__image"
              loading="lazy"
            />

            <div className="AviationServicesFive__lightSweep" />
            <div className="AviationServicesFive__imageShade" />
          </div>

          {/* Floating Badge */}
          <div className="AviationServicesFive__badge">
            <span className="AviationServicesFive__badgeDot" />

            <div className="AviationServicesFive__badgeInfo">
              <strong>Excellence in Aviation</strong>
              <span>Reliable Aviation Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AviationServicesFive;