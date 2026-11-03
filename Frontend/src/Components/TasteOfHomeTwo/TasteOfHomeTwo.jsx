import React, { useState, useEffect, useCallback } from "react";
import "./TasteOfHomeTwo.css";

const SLIDE_DURATION = 2000; // 2-second synchronized rotation

const tasteOfHomeData = [
  {
    id: 1,
    tag: "TASTE OF HOME",
    titlePrimary: "Homestyle Regional",
    titleAccent: "& Heritage Recipes",
    description:
      "Bringing authentic comfort food to life with slow-simmered family recipes, traditional spice blends, and warmth crafted to recreate the heartwarming nostalgia of home-cooked meals.",
    badgeTitle: "AUTHENTIC RECIPES",
    badgeSub: "Crafted with Heritage Spices",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Traditional Slow-Cooked Culinary Methods",
      "Farm-Fresh, Wholesome Ingredients Daily",
      "Time-Honored Regional Comfort Flavors",
    ],
  },
  {
    id: 2,
    tag: "TASTE OF HOME",
    titlePrimary: "Artisan Breads &",
    titleAccent: "Rustic Oven Bakes",
    description:
      "Handcrafted sourdough loaves, golden morning pastries, and wholesome hearth-baked crusts prepared fresh at dawn using stone-ground flours and natural wild yeasts.",
    badgeTitle: "HEARTH BAKED",
    badgeSub: "Freshly Baked Daily at Dawn",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Natural Fermentation & Wild Sourdough Starters",
      "No Artificial Preservatives or Fillers",
      "Crisp Crusts & Rich, Nutritious Crumb",
    ],
  },
  {
    id: 3,
    tag: "TASTE OF HOME",
    titlePrimary: "Hearty Stews &",
    titleAccent: "Soul-Warming Soups",
    description:
      "Nourishing broths, tender braised meats, and garden root vegetables simmered for hours in clay pots to deliver comforting, deep-rooted flavors perfect for every gathering.",
    badgeTitle: "SLOW SIMMERED",
    badgeSub: "12-Hour Rich Broths & Stews",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=2200&q=85",
    features: [
      "12-Hour Bone & Herb-Infused Broths",
      "Seasonal Organic Produce & Farm Greens",
      "Warm Comfort in Every Single Spoonful",
    ],
  },
  {
    id: 4,
    tag: "TASTE OF HOME",
    titlePrimary: "Handmade Sweets &",
    titleAccent: "Classic Confections",
    description:
      "Indulge in sweet memories with heritage desserts, warm fruit crumbles, and vintage confectioneries prepared just like grandma made them, right down to the pinch of sea salt.",
    badgeTitle: "SWEET TRADITIONS",
    badgeSub: "Nostalgic Handcrafted Desserts",
    image:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Pure Creamery Butter & Natural Sugars",
      "Generational Family Pastry Techniques",
      "Warm, Shareable Family-Style Treats",
    ],
  },
];

const TasteOfHomeTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = tasteOfHomeData.length;
  const currentSlide = tasteOfHomeData[activeSlide];

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay rotation
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <section
      className="TasteOfHomeTwo"
      aria-label="Taste of Home Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="TasteOfHomeTwo__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="TasteOfHomeTwo__media">
          <div className="TasteOfHomeTwo__imageClip">
            {tasteOfHomeData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`TasteOfHomeTwo__image ${
                  index === activeSlide ? "TasteOfHomeTwo__image--active" : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="TasteOfHomeTwo__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="TasteOfHomeTwo__badge"
          >
            <span className="TasteOfHomeTwo__badgeDot" />
            <div className="TasteOfHomeTwo__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Navigation Buttons */}
          <div className="TasteOfHomeTwo__nav">
            <button
              type="button"
              className="TasteOfHomeTwo__navBtn TasteOfHomeTwo__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous culinary highlight"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M19 12H5m7 7-7-7 7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="TasteOfHomeTwo__navBtn TasteOfHomeTwo__navBtn--next"
              onClick={handleNext}
              aria-label="Next culinary highlight"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M5 12h14m-7-7 7 7-7 7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side: Staggered Content */}
        <div
          key={`content-${activeSlide}`}
          className="TasteOfHomeTwo__content"
        >
          <div className="TasteOfHomeTwo__eyebrowWrap">
            <span className="TasteOfHomeTwo__eyebrowLine" />
            <span className="TasteOfHomeTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="TasteOfHomeTwo__title">
            <span className="TasteOfHomeTwo__titlePrimary">
              {currentSlide.titlePrimary}{" "}
            </span>
            <span className="TasteOfHomeTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="TasteOfHomeTwo__description">
            {currentSlide.description}
          </p>

          {/* Dynamic Feature Highlights */}
          <div className="TasteOfHomeTwo__features">
            {currentSlide.features.map((feature, idx) => (
              <div key={idx} className="TasteOfHomeTwo__featureItem">
                <span className="TasteOfHomeTwo__featureDot" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA & Synchronized Progress Bar */}
          <div className="TasteOfHomeTwo__actionRow">
            <a href="#taste-enquiry" className="TasteOfHomeTwo__btnPrimary">
              <span>Explore The Home Menu</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <div className="TasteOfHomeTwo__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`TasteOfHomeTwo__progressBar ${
                  isPaused ? "is-paused" : ""
                }`}
                style={{ animationDuration: `${SLIDE_DURATION}ms` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TasteOfHomeTwo;