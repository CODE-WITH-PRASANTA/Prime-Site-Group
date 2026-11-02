import React, { useEffect, useRef, useState } from "react";
import {
  UtensilsCrossed,
  ShieldCheck,
  Flame,
  Wrench,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import "./KitchenMaintenanceSolutionsSix.css";

const KitchenMaintenanceSolutionsSix = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const solutions = [
    {
      id: 1,
      tag: "COMMERCIAL EQUIPMENT",
      title: "Commercial Cooking & Range Upkeep",
      description:
        "Comprehensive preventative diagnostics and emergency repairs for heavy-duty gas burners, combi-ovens, induction surfaces, and industrial fryers.",
      metric: "99.4%",
      metricLabel: "FIRST-TIME FIX",
      icon: Flame,
    },
    {
      id: 2,
      tag: "COLD CHAIN LOGISTICS",
      title: "Walk-In Chillers & Freezers",
      description:
        "Precision calibration of temperature probes, compressor diagnostics, gasket sealing, and coolant charging to prevent costly inventory spoilages.",
      metric: "-20°C",
      metricLabel: "PRECISION HOLD",
      icon: ShieldCheck,
    },
    {
      id: 3,
      tag: "VENTILATION & SAFETY",
      title: "Exhaust Canopy & Grease Ducts",
      description:
        "High-pressure degreasing, NFPA-standard duct cleaning, makeup air calibration, and automated fire-suppression nozzle certifications.",
      metric: "100%",
      metricLabel: "NFPA AUDITED",
      icon: UtensilsCrossed,
    },
  ];

  const commitments = [
    "Certified technicians compliant with commercial food hygiene and gas safety mandates",
    "Rapid emergency breakdown dispatches with guaranteed 2-hour urban response times",
    "Preventative seasonal maintenance schedules to ensure continuous health code compliance",
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
      className={`KitchenMaintenanceSolutionsSix ${
        isVisible ? "KitchenMaintenanceSolutionsSix--visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="KitchenMaintenanceSolutionsSix__container">
        {/* Section Header */}
        <header className="KitchenMaintenanceSolutionsSix__header">
          <div className="KitchenMaintenanceSolutionsSix__eyebrow">
            <span className="KitchenMaintenanceSolutionsSix__eyebrowLine" />
            <span>COMMERCIAL ASSETS & COMPLIANCE</span>
          </div>

          <div className="KitchenMaintenanceSolutionsSix__headerRow">
            <h2 className="KitchenMaintenanceSolutionsSix__title">
              Commercial <span>Kitchen</span> Maintenance & Care
            </h2>

            <p className="KitchenMaintenanceSolutionsSix__intro">
              Prime Site delivers preventative engineering, rapid break-fix
              dispatch, and statutory hygiene compliance for high-volume commercial
              kitchens, luxury hotel culinary lines, and restaurant chains.
            </p>
          </div>
        </header>

        {/* Capabilities Grid */}
        <div className="KitchenMaintenanceSolutionsSix__grid">
          {solutions.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeCard === item.id;

            return (
              <article
                className={`KitchenMaintenanceSolutionsSix__card ${
                  isActive ? "KitchenMaintenanceSolutionsSix__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--KitchenMaintenanceSolutionsSix-delay": `${index * 120}ms`,
                }}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="KitchenMaintenanceSolutionsSix__cardHeader">
                  <span className="KitchenMaintenanceSolutionsSix__cardTag">
                    {item.tag}
                  </span>

                  <div className="KitchenMaintenanceSolutionsSix__cardMetric">
                    <span className="KitchenMaintenanceSolutionsSix__metricValue">
                      {item.metric}
                    </span>
                    <span className="KitchenMaintenanceSolutionsSix__metricLabel">
                      {item.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="KitchenMaintenanceSolutionsSix__iconBadge">
                  <div className="KitchenMaintenanceSolutionsSix__iconBadgeOuter">
                    <div className="KitchenMaintenanceSolutionsSix__iconBadgeInner">
                      <Icon
                        className="KitchenMaintenanceSolutionsSix__badgeIcon"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                <div className="KitchenMaintenanceSolutionsSix__cardBody">
                  <h3 className="KitchenMaintenanceSolutionsSix__cardTitle">
                    {item.title}
                  </h3>
                  <p className="KitchenMaintenanceSolutionsSix__cardDescription">
                    {item.description}
                  </p>
                </div>

                <div className="KitchenMaintenanceSolutionsSix__cardFooter">
                  <span className="KitchenMaintenanceSolutionsSix__footerLine" />
                  <span className="KitchenMaintenanceSolutionsSix__footerText">
                    PRIME STANDARD
                  </span>
                  <span className="KitchenMaintenanceSolutionsSix__footerAction">
                    <ArrowRight size={16} />
                  </span>
                </div>

                <span
                  className="KitchenMaintenanceSolutionsSix__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="KitchenMaintenanceSolutionsSix__banner">
          <div className="KitchenMaintenanceSolutionsSix__bannerContent">
            <span className="KitchenMaintenanceSolutionsSix__bannerKicker">
              <Sparkles size={14} /> CONTINUOUS CULINARY UPTIME
            </span>
            <h4 className="KitchenMaintenanceSolutionsSix__bannerHeading">
              Need structured preventative maintenance for your kitchen facility?
            </h4>
            <div className="KitchenMaintenanceSolutionsSix__bannerList">
              {commitments.map((text, i) => (
                <div
                  key={i}
                  className="KitchenMaintenanceSolutionsSix__bannerItem"
                >
                  <CheckCircle2
                    size={16}
                    className="KitchenMaintenanceSolutionsSix__checkIcon"
                  />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="KitchenMaintenanceSolutionsSix__bannerSide">
            <div className="KitchenMaintenanceSolutionsSix__statPill">
              <Wrench size={18} />
              <div>
                <strong>Emergency Call-Out</strong>
                <small>24/7 on-call technicians</small>
              </div>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <footer className="KitchenMaintenanceSolutionsSix__footer">
          <div className="KitchenMaintenanceSolutionsSix__footerDecoration">
            <span />
            <span />
            <span />
          </div>
          <p className="KitchenMaintenanceSolutionsSix__footerStatement">
            Hygienic reliability. Code-compliant uptime. Prime culinary support.
          </p>
          <span className="KitchenMaintenanceSolutionsSix__footerCaption">
            PRIME SITE · COMMERCIAL KITCHEN ASSET SERVICES
          </span>
        </footer>
      </div>
    </section>
  );
};

export default KitchenMaintenanceSolutionsSix;