import React, { useState, useEffect, useCallback } from "react";
import "./KitchenMaintenanceSolutionsTwo.css";

const SLIDE_DURATION = 2000; // 2-second synchronized rotation

const kitchenMaintenanceData = [
  {
    id: 1,
    tag: "KITCHEN MAINTENANCE SOLUTIONS",
    titlePrimary: "Commercial Cooking &",
    titleAccent: "Hot Line Equipment",
    description:
      "Delivering 24/7 reactive repairs, burner calibrations, and certified preventative maintenance for commercial combi-ovens, ranges, deep fryers, and industrial steam kettles across hotel and restaurant kitchens.",
    badgeTitle: "HOT LINE EXPERTS",
    badgeSub: "Certified Commercial Gas & Electric",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2200&q=85",
    features: [
      "OEM-Certified Technicians & Genuine Spare Parts",
      "Gas Leak, Thermostat & Ignition Safety Checks",
      "Emergency Hotline for Peak Dining Hour Breakdowns",
    ],
  },
  {
    id: 2,
    tag: "KITCHEN MAINTENANCE SOLUTIONS",
    titlePrimary: "Kitchen Hood &",
    titleAccent: "Exhaust Duct Degreasing",
    description:
      "NFPA-compliant high-pressure steam degreasing and exhaust canopy scrubbing designed to mitigate commercial kitchen fire hazards and maintain municipality air hygiene certifications.",
    badgeTitle: "FIRE SAFETY & HYGIENE",
    badgeSub: "NFPA 96 & Municipality Compliant",
    image:
      "https://images.unsplash.com/photo-1590725140246-20acceedc18a?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Full Hood, Riser & Roof Exhaust Fan Degreasing",
      "Before-and-After Photographic Compliance Reports",
      "Ecology Unit & Electrostatic Precipitator (ESP) Care",
    ],
  },
  {
    id: 3,
    tag: "KITCHEN MAINTENANCE SOLUTIONS",
    titlePrimary: "Walk-in Chillers &",
    titleAccent: "Cold Line Refrigeration",
    description:
      "Precision thermodynamic upkeep for walk-in cold rooms, under-counter blast chillers, and commercial ice machines to guarantee critical HACCP temperature food safety standards.",
    badgeTitle: "COLD CHAIN & REFRIGERATION",
    badgeSub: "Zero Food Spoilage Guarantee",
    image:
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Compressor, Coil & Condenser Chemical Descaling",
      "Digital Temperature Calibration & HACCP Compliance",
      "Refrigerant Leak Detection & Door Gasket Upgrades",
    ],
  },
  {
    id: 4,
    tag: "KITCHEN MAINTENANCE SOLUTIONS",
    titlePrimary: "Commercial Dishwashing &",
    titleAccent: "Drainage Systems",
    description:
      "Comprehensive descaling and maintenance for conveyor flight dishwashers, automated chemical dispensers, grease traps, and plumbing lines to prevent kitchen floor blockages.",
    badgeTitle: "WAREWASHING & PLUMBING",
    badgeSub: "Automated Sanitization & Waste Care",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Boiler Descaling & Rinse Pressure Optimization",
      "Biological Grease Trap Dosing & Line Jetting",
      "Scheduled Sanitizer Chemical Dispenser Testing",
    ],
  },
];

const KitchenMaintenanceSolutionsTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = kitchenMaintenanceData.length;
  const currentSlide = kitchenMaintenanceData[activeSlide];

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
      className="KitchenMaintenanceSolutionsTwo"
      aria-label="Commercial Kitchen Maintenance Solutions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="KitchenMaintenanceSolutionsTwo__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="KitchenMaintenanceSolutionsTwo__media">
          <div className="KitchenMaintenanceSolutionsTwo__imageClip">
            {kitchenMaintenanceData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`KitchenMaintenanceSolutionsTwo__image ${
                  index === activeSlide
                    ? "KitchenMaintenanceSolutionsTwo__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="KitchenMaintenanceSolutionsTwo__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="KitchenMaintenanceSolutionsTwo__badge"
          >
            <span className="KitchenMaintenanceSolutionsTwo__badgeDot" />
            <div className="KitchenMaintenanceSolutionsTwo__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Navigation Buttons */}
          <div className="KitchenMaintenanceSolutionsTwo__nav">
            <button
              type="button"
              className="KitchenMaintenanceSolutionsTwo__navBtn KitchenMaintenanceSolutionsTwo__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous kitchen maintenance solution"
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
              className="KitchenMaintenanceSolutionsTwo__navBtn KitchenMaintenanceSolutionsTwo__navBtn--next"
              onClick={handleNext}
              aria-label="Next kitchen maintenance solution"
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
          className="KitchenMaintenanceSolutionsTwo__content"
        >
          <div className="KitchenMaintenanceSolutionsTwo__eyebrowWrap">
            <span className="KitchenMaintenanceSolutionsTwo__eyebrowLine" />
            <span className="KitchenMaintenanceSolutionsTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="KitchenMaintenanceSolutionsTwo__title">
            <span className="KitchenMaintenanceSolutionsTwo__titlePrimary">
              {currentSlide.titlePrimary}{" "}
            </span>
            <span className="KitchenMaintenanceSolutionsTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="KitchenMaintenanceSolutionsTwo__description">
            {currentSlide.description}
          </p>

          {/* Dynamic Feature Highlights */}
          <div className="KitchenMaintenanceSolutionsTwo__features">
            {currentSlide.features.map((feature, idx) => (
              <div
                key={idx}
                className="KitchenMaintenanceSolutionsTwo__featureItem"
              >
                <span className="KitchenMaintenanceSolutionsTwo__featureDot" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA & Synchronized Progress Bar */}
          <div className="KitchenMaintenanceSolutionsTwo__actionRow">
            <a
              href="#kitchen-maintenance-enquiry"
              className="KitchenMaintenanceSolutionsTwo__btnPrimary"
            >
              <span>Schedule Equipment Service</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <div className="KitchenMaintenanceSolutionsTwo__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`KitchenMaintenanceSolutionsTwo__progressBar ${
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

export default KitchenMaintenanceSolutionsTwo;