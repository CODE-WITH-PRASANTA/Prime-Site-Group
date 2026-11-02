import React, { useState, useEffect, useRef } from "react";
import "./TasteOfHomeFour.css";

const tasteOfHomePoints = [
  {
    id: 1,
    title: "Authentic Home-Style Cooking",
    detail:
      "Enjoy comforting, freshly prepared meals inspired by traditional home recipes and familiar flavors.",
  },
  {
    id: 2,
    title: "Fresh and Quality Ingredients",
    detail:
      "Carefully selected ingredients bring freshness, balanced flavors, and quality to every meal.",
  },
  {
    id: 3,
    title: "Personalized Meal Experiences",
    detail:
      "Flexible meal options designed to suit different tastes, preferences, and everyday dining needs.",
  },
  {
    id: 4,
    title: "Consistent Taste and Quality",
    detail:
      "Thoughtfully prepared dishes deliver dependable quality, satisfying portions, and a homely dining experience.",
  },
];

const TasteOfHomeFour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
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
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`TasteOfHomeFour ${
        isVisible ? "TasteOfHomeFour--visible" : ""
      }`}
      aria-label="Taste of Home Services"
    >
      <div className="TasteOfHomeFour__container">
        <div className="TasteOfHomeFour__media">
          <div className="TasteOfHomeFour__imageClip">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=2200&q=85"
              alt="Freshly prepared home-style meal with colorful ingredients"
              className="TasteOfHomeFour__image"
              loading="lazy"
            />
            <div className="TasteOfHomeFour__imageShade" />
          </div>

          <div className="TasteOfHomeFour__badge">
            <span className="TasteOfHomeFour__badgeDot" />
            <div className="TasteOfHomeFour__badgeInfo">
              <strong>Comfort in Every Bite</strong>
              <span>Freshness, Flavor & Home-Style Cooking</span>
            </div>
          </div>
        </div>

        <div className="TasteOfHomeFour__content">
          <div className="TasteOfHomeFour__eyebrowWrap">
            <span className="TasteOfHomeFour__eyebrowLine" />
            <span className="TasteOfHomeFour__eyebrow">
              TASTE OF HOME
            </span>
          </div>

          <h2 className="TasteOfHomeFour__title">
            Bringing Homemade Goodness to{" "}
            <span className="TasteOfHomeFour__titleAccent">
              Every Table
            </span>
          </h2>

          <p className="TasteOfHomeFour__description">
            Discover the warmth of home-style cooking with meals prepared
            around freshness, authentic flavors, and quality ingredients.
            From traditional favorites to everyday comfort food, our approach
            makes every meal feel familiar, satisfying, and thoughtfully
            prepared.
          </p>

          <div className="TasteOfHomeFour__list">
            {tasteOfHomePoints.map((point) => (
              <div
                key={point.id}
                className="TasteOfHomeFour__item"
              >
                <span className="TasteOfHomeFour__checkIcon">
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

                <div className="TasteOfHomeFour__itemText">
                  <h4 className="TasteOfHomeFour__itemTitle">
                    {point.title}
                  </h4>
                  <p className="TasteOfHomeFour__itemDetail">
                    {point.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="TasteOfHomeFour__actionWrap">
            <a
              href="#taste-of-home-details"
              className="TasteOfHomeFour__linkPrimary"
            >
              <span>Explore Our Food Experience</span>
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
      </div>
    </section>
  );
};

export default TasteOfHomeFour;