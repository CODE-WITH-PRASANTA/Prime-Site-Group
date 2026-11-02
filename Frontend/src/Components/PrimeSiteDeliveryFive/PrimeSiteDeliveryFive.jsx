import React, { useEffect, useRef, useState } from "react";
import {
  Truck,
  ShieldCheck,
  PackageCheck,
  Clock,
  Navigation,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import "./PrimeSiteDeliveryFive.css";

const PrimeSiteDeliveryFive = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const capabilities = [
    {
      id: 1,
      tag: "FLEET & COURIER",
      title: "Express Parcel & Document Logistics",
      description:
        "High-priority dispatch, scheduled urban routing, secure deed transport, and signed multi-point corporate deliveries executed with exact precision.",
      metric: "99.9%",
      metricLabel: "SUCCESS RATE",
      icon: Truck,
    },
    {
      id: 2,
      tag: "CHAIN OF CUSTODY",
      title: "High-Value Asset Escort",
      description:
        "Tamper-evident transport containers, geo-fenced transit monitoring, and bonded courier personnel dedicated to safeguarding sensitive legal files and luxury assets.",
      metric: "100%",
      metricLabel: "AUDIT INTEGRITY",
      icon: ShieldCheck,
    },
    {
      id: 3,
      tag: "URBAN FULFILLMENT",
      title: "Last-Mile Distribution Hubs",
      description:
        "Strategically mapped consolidation points, cross-dock logistics, and agile last-mile couriers ensuring dependable same-day arrival across metro regions.",
      metric: "<2h",
      metricLabel: "URBAN SLA",
      icon: PackageCheck,
    },
  ];

  const commitments = [
    "End-to-end telemetry and encrypted real-time parcel trajectory tracking",
    "Bonded, verified delivery professionals adhering to rigid chain-of-custody protocols",
    "Dynamic route optimization reducing dwell times and fleet carbon footprints",
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
      className={`PrimeSiteDeliveryFive ${
        isVisible ? "PrimeSiteDeliveryFive--visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="PrimeSiteDeliveryFive__container">
        {/* Section Header */}
        <header className="PrimeSiteDeliveryFive__header">
          <div className="PrimeSiteDeliveryFive__eyebrow">
            <span className="PrimeSiteDeliveryFive__eyebrowLine" />
            <span>LAST-MILE & ENTERPRISE LOGISTICS</span>
          </div>

          <div className="PrimeSiteDeliveryFive__headerRow">
            <h2 className="PrimeSiteDeliveryFive__title">
              Precision <span>Delivery</span> & Distribution Network
            </h2>

            <p className="PrimeSiteDeliveryFive__intro">
              Prime Site delivers mission-critical courier solutions, secure chain-of-custody
              transport, and agile last-mile distribution. We combine intelligent fleet routing
              with rigorous physical safeguards to ensure every high-value package reaches its
              destination on schedule.
            </p>
          </div>
        </header>

        {/* Capabilities Grid */}
        <div className="PrimeSiteDeliveryFive__grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeCard === item.id;

            return (
              <article
                className={`PrimeSiteDeliveryFive__card ${
                  isActive ? "PrimeSiteDeliveryFive__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--PrimeSiteDeliveryFive-delay": `${index * 120}ms`,
                }}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="PrimeSiteDeliveryFive__cardHeader">
                  <span className="PrimeSiteDeliveryFive__cardTag">
                    {item.tag}
                  </span>

                  <div className="PrimeSiteDeliveryFive__cardMetric">
                    <span className="PrimeSiteDeliveryFive__metricValue">
                      {item.metric}
                    </span>
                    <span className="PrimeSiteDeliveryFive__metricLabel">
                      {item.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="PrimeSiteDeliveryFive__iconBadge">
                  <div className="PrimeSiteDeliveryFive__iconBadgeOuter">
                    <div className="PrimeSiteDeliveryFive__iconBadgeInner">
                      <Icon
                        className="PrimeSiteDeliveryFive__badgeIcon"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                <div className="PrimeSiteDeliveryFive__cardBody">
                  <h3 className="PrimeSiteDeliveryFive__cardTitle">
                    {item.title}
                  </h3>
                  <p className="PrimeSiteDeliveryFive__cardDescription">
                    {item.description}
                  </p>
                </div>

                <div className="PrimeSiteDeliveryFive__cardFooter">
                  <span className="PrimeSiteDeliveryFive__footerLine" />
                  <span className="PrimeSiteDeliveryFive__footerText">
                    PRIME STANDARD
                  </span>
                  <span className="PrimeSiteDeliveryFive__footerAction">
                    <ArrowRight size={16} />
                  </span>
                </div>

                <span
                  className="PrimeSiteDeliveryFive__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="PrimeSiteDeliveryFive__banner">
          <div className="PrimeSiteDeliveryFive__bannerContent">
            <span className="PrimeSiteDeliveryFive__bannerKicker">
              <Sparkles size={14} /> DEDICATED LOGISTICS INFRASTRUCTURE
            </span>
            <h4 className="PrimeSiteDeliveryFive__bannerHeading">
              Need reliable scheduled delivery corridors or bonded courier routes?
            </h4>
            <div className="PrimeSiteDeliveryFive__bannerList">
              {commitments.map((text, i) => (
                <div key={i} className="PrimeSiteDeliveryFive__bannerItem">
                  <CheckCircle2
                    size={16}
                    className="PrimeSiteDeliveryFive__checkIcon"
                  />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="PrimeSiteDeliveryFive__bannerSide">
            <div className="PrimeSiteDeliveryFive__statPill">
              <Navigation size={18} />
              <div>
                <strong>Live Geo-Fencing</strong>
                <small>Pinpoint shipment visibility</small>
              </div>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <footer className="PrimeSiteDeliveryFive__footer">
          <div className="PrimeSiteDeliveryFive__footerDecoration">
            <span />
            <span />
            <span />
          </div>
          <p className="PrimeSiteDeliveryFive__footerStatement">
            Prompt dispatch. Guaranteed custody. Prime delivery assurance.
          </p>
          <span className="PrimeSiteDeliveryFive__footerCaption">
            PRIME SITE · SECURE COURIER & LOGISTICS SERVICES
          </span>
        </footer>
      </div>
    </section>
  );
};

export default PrimeSiteDeliveryFive;