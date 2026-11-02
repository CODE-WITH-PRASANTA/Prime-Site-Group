import React, { useEffect, useRef, useState } from "react";
import {
  Award,
  Trophy,
  Medal,
  ShieldCheck,
  Star,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";
import "./ServicesAwards.css";

const ServicesAwards = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeAward, setActiveAward] = useState(null);

  const awards = [
    {
      id: 1,
      year: "2020",
      title: "Global Real Estate Excellence",
      subtitle: "Best Digital Property Platform",
      description:
        "Recognising Prime Site for transforming property discovery through cutting-edge digital search, high-fidelity listings, and verified inventory.",
      icon: Trophy,
      category: "INNOVATION",
    },
    {
      id: 2,
      year: "2021",
      title: "National Property Quality Award",
      subtitle: "Gold Standard in Advisory",
      description:
        "Honouring Prime Site's outstanding market transparency, rigorous due-diligence protocols, and customer-first property advisory practices.",
      icon: Award,
      category: "EXCELLENCE",
    },
    {
      id: 3,
      year: "2022",
      title: "Sustainable Architecture & Living",
      subtitle: "Eco-Friendly Community Partner",
      description:
        "Celebrating Prime Site's commitment to promoting green certifications, energy-efficient residences, and sustainable commercial developments.",
      icon: Medal,
      category: "SUSTAINABILITY",
    },
    {
      id: 4,
      year: "2023",
      title: "Commercial Asset Leadership",
      subtitle: "Portfolio Management Distinction",
      description:
        "Recognising Prime Site for high-yield portfolio strategies, seamless commercial transactions, and premier corporate tenant management.",
      icon: Star,
      category: "COMMERCIAL",
    },
    {
      id: 5,
      year: "2024",
      title: "Client Trust & Security Award",
      subtitle: "Customer Experience & Escrow Safety",
      description:
        "Commending Prime Site for zero-compromise transaction integrity, seamless digital escrow integration, and dedicated client advisory.",
      icon: ShieldCheck,
      category: "TRUST & SAFETY",
    },
    {
      id: 6,
      year: "2025",
      title: "Luxury Development Benchmark",
      subtitle: "Premier Prime Residences",
      description:
        "Awarded to Prime Site for curating the most prestigious residential developments, high-net-worth services, and landmark architectural investments.",
      icon: BadgeCheck,
      category: "GOLD STANDARD",
    },
  ];

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
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`ServicesAwards ${
        isVisible ? "ServicesAwards--visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="ServicesAwards__container">
        {/* Section heading */}
        <header className="ServicesAwards__header">
          <div className="ServicesAwards__eyebrow">
            <span className="ServicesAwards__eyebrowLine" />
            <span>HONOURS & INDUSTRY RECOGNITION</span>
          </div>

          <h2 className="ServicesAwards__title">
            Awards <span>&</span> Recognition
          </h2>

          <p className="ServicesAwards__intro">
            Since inception, Prime Site has been recognised across international
            and regional platforms for redefining property advisory, commercial
            management, digital innovation, and client satisfaction. These honours
            reaffirm our promise of providing secure, high-value real estate
            solutions and building enduring relationships.
          </p>

          <div className="ServicesAwards__summary">
            <div className="ServicesAwards__summaryItem">
              <span className="ServicesAwards__summaryNumber">06</span>
              <span className="ServicesAwards__summaryLabel">
                ACCREDITED ACCOLADES
              </span>
            </div>

            <span className="ServicesAwards__summaryDivider" />

            <div className="ServicesAwards__summaryItem">
              <span className="ServicesAwards__summaryIcon">
                <Award size={19} />
              </span>
              <span className="ServicesAwards__summaryLabel">
                BENCHMARK OF PRIME EXCELLENCE
              </span>
            </div>
          </div>
        </header>

        {/* Awards grid */}
        <div className="ServicesAwards__grid">
          {awards.map((item, index) => {
            const AwardIcon = item.icon;
            const isActive = activeAward === item.id;

            return (
              <article
                className={`ServicesAwards__card ${
                  isActive ? "ServicesAwards__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--ServicesAwards-delay": `${index * 100}ms`,
                }}
                onMouseEnter={() => setActiveAward(item.id)}
                onMouseLeave={() => setActiveAward(null)}
              >
                <div className="ServicesAwards__cardTop">
                  <span className="ServicesAwards__category">
                    {item.category}
                  </span>

                  <span className="ServicesAwards__year">
                    {item.year}
                  </span>
                </div>

                {/* Decorative award emblem */}
                <div className="ServicesAwards__emblem">
                  <div className="ServicesAwards__emblemOuter">
                    <div className="ServicesAwards__emblemInner">
                      <AwardIcon
                        className="ServicesAwards__awardIcon"
                        strokeWidth={1.35}
                      />
                    </div>
                  </div>

                  <span className="ServicesAwards__emblemStar">
                    <Star size={13} fill="currentColor" />
                  </span>
                </div>

                <div className="ServicesAwards__cardContent">
                  <span className="ServicesAwards__cardKicker">
                    PRIME SITE · {item.year}
                  </span>

                  <h3 className="ServicesAwards__cardTitle">
                    {item.title}
                  </h3>

                  <p className="ServicesAwards__subtitle">
                    {item.subtitle}
                  </p>

                  <p className="ServicesAwards__description">
                    {item.description}
                  </p>
                </div>

                <div className="ServicesAwards__cardFooter">
                  <span className="ServicesAwards__footerLine" />

                  <span className="ServicesAwards__footerText">
                    DISTINCTION
                  </span>

                  <span className="ServicesAwards__footerArrow">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <span
                  className="ServicesAwards__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <footer className="ServicesAwards__footer">
          <div className="ServicesAwards__footerDecoration">
            <span />
            <span />
            <span />
          </div>

          <p className="ServicesAwards__footerStatement">
            Celebrating achievement. Inspiring distinction. Delivering prime value.
          </p>

          <span className="ServicesAwards__footerCaption">
            PRIME SITE · BUILT ON TRUST & INTEGRITY
          </span>
        </footer>
      </div>
    </section>
  );
};

export default ServicesAwards;