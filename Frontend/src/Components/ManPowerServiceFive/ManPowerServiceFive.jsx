import React, { useEffect, useRef, useState } from "react";
import {
  Users,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import "./ManPowerServiceFive.css";

const ManPowerServiceFive = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const capabilities = [
    {
      id: 1,
      tag: "FACILITY DEPLOYMENT",
      title: "On-Site Facility Staffing",
      description:
        "Trained concierge, building administrators, and operational supervisors placed directly across commercial and premium residential towers.",
      metric: "24/7",
      metricLabel: "COVERAGE",
      icon: Users,
    },
    {
      id: 2,
      tag: "PREMISES CONTROL",
      title: "Asset & Perimeter Security",
      description:
        "Vetted, certified estate guards and surveillance monitoring specialists dedicated to high-compliance access management and safety.",
      metric: "100%",
      metricLabel: "VETTED CREW",
      icon: ShieldCheck,
    },
    {
      id: 3,
      tag: "INFRASTRUCTURE",
      title: "Technical Engineering Support",
      description:
        "Licensed HVAC technicians, electricians, and maintenance crew providing rapid preventive upkeep to preserve property asset valuation.",
      metric: "15m",
      metricLabel: "SLA DISPATCH",
      icon: Building2,
    },
  ];

  const commitments = [
    "Rigorous due-diligence and background-verified workforce",
    "Tailored team deployment aligned to property portfolio scale",
    "Continuous site compliance, safety protocols, and auditing",
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
      className={`ManPowerServiceFive ${
        isVisible ? "ManPowerServiceFive--visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="ManPowerServiceFive__container">
        {/* Section Header */}
        <header className="ManPowerServiceFive__header">
          <div className="ManPowerServiceFive__eyebrow">
            <span className="ManPowerServiceFive__eyebrowLine" />
            <span>OPERATIONAL EXCELLENCE & WORKFORCE</span>
          </div>

          <div className="ManPowerServiceFive__headerRow">
            <h2 className="ManPowerServiceFive__title">
              Professional <span>Manpower</span> & Facility Operations
            </h2>

            <p className="ManPowerServiceFive__intro">
              Prime Site delivers fully managed, compliance-ready workforce
              solutions tailored for luxury high-rises, commercial developments,
              and managed estates. We ensure total property security, seamless
              day-to-day operations, and sustained investor asset value.
            </p>
          </div>
        </header>

        {/* Capabilities Grid */}
        <div className="ManPowerServiceFive__grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeCard === item.id;

            return (
              <article
                className={`ManPowerServiceFive__card ${
                  isActive ? "ManPowerServiceFive__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--ManPowerServiceFive-delay": `${index * 120}ms`,
                }}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="ManPowerServiceFive__cardHeader">
                  <span className="ManPowerServiceFive__cardTag">
                    {item.tag}
                  </span>

                  <div className="ManPowerServiceFive__cardMetric">
                    <span className="ManPowerServiceFive__metricValue">
                      {item.metric}
                    </span>
                    <span className="ManPowerServiceFive__metricLabel">
                      {item.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="ManPowerServiceFive__iconBadge">
                  <div className="ManPowerServiceFive__iconBadgeOuter">
                    <div className="ManPowerServiceFive__iconBadgeInner">
                      <Icon
                        className="ManPowerServiceFive__badgeIcon"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                <div className="ManPowerServiceFive__cardBody">
                  <h3 className="ManPowerServiceFive__cardTitle">
                    {item.title}
                  </h3>
                  <p className="ManPowerServiceFive__cardDescription">
                    {item.description}
                  </p>
                </div>

                <div className="ManPowerServiceFive__cardFooter">
                  <span className="ManPowerServiceFive__footerLine" />
                  <span className="ManPowerServiceFive__footerText">
                    PRIME STANDARD
                  </span>
                  <span className="ManPowerServiceFive__footerAction">
                    <ArrowRight size={16} />
                  </span>
                </div>

                <span
                  className="ManPowerServiceFive__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="ManPowerServiceFive__banner">
          <div className="ManPowerServiceFive__bannerContent">
            <span className="ManPowerServiceFive__bannerKicker">
              <Sparkles size={14} /> DEDICATED SITE ALLOCATION
            </span>
            <h4 className="ManPowerServiceFive__bannerHeading">
              Need on-demand team deployment for your development?
            </h4>
            <div className="ManPowerServiceFive__bannerList">
              {commitments.map((text, i) => (
                <div key={i} className="ManPowerServiceFive__bannerItem">
                  <CheckCircle2
                    size={16}
                    className="ManPowerServiceFive__checkIcon"
                  />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ManPowerServiceFive__bannerSide">
            <div className="ManPowerServiceFive__statPill">
              <Clock size={18} />
              <div>
                <strong>Rapid Turnaround</strong>
                <small>Deploy within 48-72 hours</small>
              </div>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <footer className="ManPowerServiceFive__footer">
          <div className="ManPowerServiceFive__footerDecoration">
            <span />
            <span />
            <span />
          </div>
          <p className="ManPowerServiceFive__footerStatement">
            Precision manpower. Uncompromised asset integrity. Prime service standards.
          </p>
          <span className="ManPowerServiceFive__footerCaption">
            PRIME SITE · FACILITY & MANPOWER EXCELLENCE
          </span>
        </footer>
      </div>
    </section>
  );
};

export default ManPowerServiceFive;