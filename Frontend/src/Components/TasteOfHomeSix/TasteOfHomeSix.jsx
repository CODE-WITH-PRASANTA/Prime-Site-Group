import React, { useEffect, useRef, useState } from "react";
import {
  Award,
  ChefHat,
  Utensils,
  Heart,
  Star,
  BadgeCheck,
  Leaf,
  ArrowUpRight,
} from "lucide-react";
import "./TasteOfHomeSix.css";

const TasteOfHomeSix = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const recognitions = [
    {
      id: 1,
      year: "QUALITY",
      title: "Culinary Excellence",
      subtitle: "Crafted With Care and Precision",
      description:
        "Every dish begins with careful preparation, thoughtful techniques, and attention to detail, creating a consistent and satisfying dining experience.",
      icon: ChefHat,
      category: "FOOD QUALITY",
    },
    {
      id: 2,
      year: "FRESH",
      title: "Fresh Ingredients",
      subtitle: "Naturally Better Flavours",
      description:
        "Thoughtfully selected ingredients bring freshness, vibrant flavours, and balanced textures to every meal prepared for our customers.",
      icon: Leaf,
      category: "FRESHNESS",
    },
    {
      id: 3,
      year: "TASTE",
      title: "Authentic Flavours",
      subtitle: "Tradition Meets Modern Taste",
      description:
        "From comforting classics to contemporary favourites, our culinary approach celebrates familiar flavours and the joy of sharing good food.",
      icon: Utensils,
      category: "AUTHENTIC TASTE",
    },
    {
      id: 4,
      year: "CARE",
      title: "Customer Happiness",
      subtitle: "Every Meal Made Meaningful",
      description:
        "We focus on thoughtful service, enjoyable meals, and welcoming experiences that make every customer feel valued at the table.",
      icon: Heart,
      category: "CUSTOMER CARE",
    },
    {
      id: 5,
      year: "SAFETY",
      title: "Food Safety Standards",
      subtitle: "Cleanliness at Every Step",
      description:
        "Careful food handling, clean preparation areas, and responsible kitchen practices help support safe and reliable food preparation.",
      icon: BadgeCheck,
      category: "FOOD SAFETY",
    },
    {
      id: 6,
      year: "PASSION",
      title: "Memorable Dining",
      subtitle: "More Than Just a Meal",
      description:
        "We bring flavour, presentation, and hospitality together to create memorable moments around food for families, friends, and communities.",
      icon: Star,
      category: "DINING EXPERIENCE",
    },
  ];

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
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`TasteOfHomeSix ${
        isVisible ? "TasteOfHomeSix--visible" : ""
      }`}
    >
      <div className="TasteOfHomeSix__container">
        <header className="TasteOfHomeSix__header">
          <div className="TasteOfHomeSix__eyebrow">
            <span className="TasteOfHomeSix__eyebrowLine" />
            <span>OUR CULINARY PROMISE</span>
          </div>

          <h2 className="TasteOfHomeSix__title">
            A Taste of Home, <span>A Standard of Excellence</span>
          </h2>

          <p className="TasteOfHomeSix__intro">
            Great food is about more than ingredients. It is about the care
            behind every preparation, the flavours that bring people together,
            and the hospitality that makes every meal feel special. Discover
            the principles that shape our approach to food, service, and
            memorable dining experiences.
          </p>

          <div className="TasteOfHomeSix__summary">
            <div className="TasteOfHomeSix__summaryItem">
              <span className="TasteOfHomeSix__summaryNumber">06</span>
              <span className="TasteOfHomeSix__summaryLabel">
                CULINARY PILLARS
              </span>
            </div>

            <span className="TasteOfHomeSix__summaryDivider" />

            <div className="TasteOfHomeSix__summaryItem">
              <span className="TasteOfHomeSix__summaryIcon">
                <Award size={19} />
              </span>
              <span className="TasteOfHomeSix__summaryLabel">
                QUALITY IN EVERY BITE
              </span>
            </div>
          </div>
        </header>

        <div className="TasteOfHomeSix__grid">
          {recognitions.map((item, index) => {
            const CardIcon = item.icon;
            const isActive = activeCard === item.id;

            return (
              <article
                className={`TasteOfHomeSix__card ${
                  isActive ? "TasteOfHomeSix__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--TasteOfHomeSix-delay": `${index * 100}ms`,
                }}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="TasteOfHomeSix__cardTop">
                  <span className="TasteOfHomeSix__category">
                    {item.category}
                  </span>

                  <span className="TasteOfHomeSix__year">{item.year}</span>
                </div>

                <div className="TasteOfHomeSix__emblem">
                  <div className="TasteOfHomeSix__emblemOuter">
                    <div className="TasteOfHomeSix__emblemInner">
                      <CardIcon
                        className="TasteOfHomeSix__awardIcon"
                        strokeWidth={1.35}
                      />
                    </div>
                  </div>

                  <span className="TasteOfHomeSix__emblemStar">
                    <Star size={13} fill="currentColor" />
                  </span>
                </div>

                <div className="TasteOfHomeSix__cardContent">
                  <span className="TasteOfHomeSix__cardKicker">
                    THE TASTE OF HOME · {String(item.id).padStart(2, "0")}
                  </span>

                  <h3 className="TasteOfHomeSix__cardTitle">{item.title}</h3>

                  <p className="TasteOfHomeSix__subtitle">{item.subtitle}</p>

                  <p className="TasteOfHomeSix__description">
                    {item.description}
                  </p>
                </div>

                <div className="TasteOfHomeSix__cardFooter">
                  <span className="TasteOfHomeSix__footerLine" />

                  <span className="TasteOfHomeSix__footerText">
                    MADE WITH CARE
                  </span>

                  <span className="TasteOfHomeSix__footerArrow">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <span
                  className="TasteOfHomeSix__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        <footer className="TasteOfHomeSix__footer">
          <div className="TasteOfHomeSix__footerDecoration">
            <span />
            <span />
            <span />
          </div>

          <p className="TasteOfHomeSix__footerStatement">
            Fresh flavours. Thoughtful preparation. Moments worth sharing.
          </p>

          <span className="TasteOfHomeSix__footerCaption">
            OUR PASSION. YOUR EXPERIENCE.
          </span>
        </footer>
      </div>
    </section>
  );
};

export default TasteOfHomeSix;