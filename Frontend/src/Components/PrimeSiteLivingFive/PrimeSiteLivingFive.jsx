import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  ShieldCheck,
  Sparkles,
  Key,
  Compass,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import "./PrimeSiteLivingFive.css";

const PrimeSiteLivingFive = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const capabilities = [
    {
      id: 1,
      tag: "PREMIER RESIDENCES",
      title: "Luxury Residential Leasing",
      description:
        "Curated high-specification penthouses, designer beachfront villas, and elite serviced apartments with private viewings and verified inventory.",
      metric: "100%",
      metricLabel: "VERIFIED ASSETS",
      icon: Home,
    },
    {
      id: 2,
      tag: "ESTATE MANAGEMENT",
      title: "Private Property Concierge",
      description:
        "Full-scope tenancy administration, private butler coordination, preventive upkeep, and dedicated key-holding security for discerning owners.",
      metric: "24/7",
      metricLabel: "DEDICATED DESK",
      icon: Key,
    },
    {
      id: 3,
      tag: "ASSET PRESERVATION",
      title: "Secure Residential Escrow",
      description:
        "Transparent lease validation, digital asset audit trails, zero-compromise deposit safety, and structured legal advisory tailored for high-net-worth clients.",
      metric: "AAA",
      metricLabel: "TRUST RATING",
      icon: ShieldCheck,
    },
  ];

  const commitments = [
    "White-glove tenancy onboarding and premium lifestyle onboarding support",
    "Continuous estate inspections, preventive upkeep, and round-the-clock safety",
    "Transparent digital contracts, escrow coordination, and certified property title checks",
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
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`PrimeSiteLivingFive ${
        isVisible ? "PrimeSiteLivingFive--visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="PrimeSiteLivingFive__container">
        {/* Section Header */}
        <header className="PrimeSiteLivingFive__header">
          <div className="PrimeSiteLivingFive__eyebrow">
            <span className="PrimeSiteLivingFive__eyebrowLine" />
            <span>PRIME RESIDENTIAL & LIFESTYLE SERVICES</span>
          </div>

          <div className="PrimeSiteLivingFive__headerRow">
            <h2 className="PrimeSiteLivingFive__title">
              Bespoke <span>Living</span> & Premium Residence Care
            </h2>

            <p className="PrimeSiteLivingFive__intro">
              Prime Site Living curates world-class residential environments for
              discerning homeowners, investors, and expatriate communities. We
              combine intuitive white-glove concierge services with end-to-end
              residential asset governance and guaranteed peace of mind.
            </p>
          </div>
        </header>

        {/* Capabilities Grid */}
        <div className="PrimeSiteLivingFive__grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeCard === item.id;

            return (
              <article
                className={`PrimeSiteLivingFive__card ${
                  isActive ? "PrimeSiteLivingFive__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--PrimeSiteLivingFive-delay": `${index * 120}ms`,
                }}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="PrimeSiteLivingFive__cardHeader">
                  <span className="PrimeSiteLivingFive__cardTag">
                    {item.tag}
                  </span>

                  <div className="PrimeSiteLivingFive__cardMetric">
                    <span className="PrimeSiteLivingFive__metricValue">
                      {item.metric}
                    </span>
                    <span className="PrimeSiteLivingFive__metricLabel">
                      {item.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="PrimeSiteLivingFive__iconBadge">
                  <div className="PrimeSiteLivingFive__iconBadgeOuter">
                    <div className="PrimeSiteLivingFive__iconBadgeInner">
                      <Icon
                        className="PrimeSiteLivingFive__badgeIcon"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                <div className="PrimeSiteLivingFive__cardBody">
                  <h3 className="PrimeSiteLivingFive__cardTitle">
                    {item.title}
                  </h3>
                  <p className="PrimeSiteLivingFive__cardDescription">
                    {item.description}
                  </p>
                </div>

                <div className="PrimeSiteLivingFive__cardFooter">
                  <span className="PrimeSiteLivingFive__footerLine" />
                  <span className="PrimeSiteLivingFive__footerText">
                    PRIME STANDARD
                  </span>
                  <span className="PrimeSiteLivingFive__footerAction">
                    <ArrowRight size={16} />
                  </span>
                </div>

                <span
                  className="PrimeSiteLivingFive__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="PrimeSiteLivingFive__banner">
          <div className="PrimeSiteLivingFive__bannerContent">
            <span className="PrimeSiteLivingFive__bannerKicker">
              <Sparkles size={14} /> EXCLUSIVE RESIDENTIAL PORTFOLIO
            </span>
            <h4 className="PrimeSiteLivingFive__bannerHeading">
              Seeking customized estate administration or private residential placement?
            </h4>
            <div className="PrimeSiteLivingFive__bannerList">
              {commitments.map((text, i) => (
                <div key={i} className="PrimeSiteLivingFive__bannerItem">
                  <CheckCircle2
                    size={16}
                    className="PrimeSiteLivingFive__checkIcon"
                  />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="PrimeSiteLivingFive__bannerSide">
            <div className="PrimeSiteLivingFive__statPill">
              <Compass size={18} />
              <div>
                <strong>Luxury Certified</strong>
                <small>Global concierge standards</small>
              </div>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <footer className="PrimeSiteLivingFive__footer">
          <div className="PrimeSiteLivingFive__footerDecoration">
            <span />
            <span />
            <span />
          </div>
          <p className="PrimeSiteLivingFive__footerStatement">
            Refined living spaces. Uncompromising security. Prime residential excellence.
          </p>
          <span className="PrimeSiteLivingFive__footerCaption">
            PRIME SITE · LUXURY RESIDENTIAL SERVICES & LIVING
          </span>
        </footer>
      </div>
    </section>
  );
};

export default PrimeSiteLivingFive;