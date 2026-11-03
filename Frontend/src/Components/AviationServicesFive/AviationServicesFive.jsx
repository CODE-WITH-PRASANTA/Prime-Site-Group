import React, { useEffect, useRef, useState } from "react";
import {
  Plane,
  ShieldCheck,
  Luggage,
  Compass,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import "./AviationServicesFive.css";

const AviationServicesFive = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const capabilities = [
    {
      id: 1,
      tag: "GROUND OPERATIONS",
      title: "Ramp & Apron Services",
      description:
        "Comprehensive aircraft turnarounds, pushback handling, baggage coordination, and marshaling precision executed to strict international safety standards.",
      metric: "99.8%",
      metricLabel: "ON-TIME DISPATCH",
      icon: Plane,
    },
    {
      id: 2,
      tag: "SECURITY & COMPLIANCE",
      title: "Aviation Security Protocols",
      description:
        "Vetted passenger screening oversight, secure hold baggage inspections, and round-the-clock perimeter surveillance across airside zones.",
      metric: "100%",
      metricLabel: "REGULATORY COMPLIANT",
      icon: ShieldCheck,
    },
    {
      id: 3,
      tag: "PASSENGER CARE",
      title: "Terminal & Concierge Hospitality",
      description:
        "Front-of-house check-in support, VIP lounge hospitality management, special assistance services, and seamless terminal transit solutions.",
      metric: "24/7",
      metricLabel: "TERMINAL SUPPORT",
      icon: Luggage,
    },
  ];

  const commitments = [
    "Full adherence to ICAO, IATA, and regional civil aviation mandates",
    "Highly trained airside operations workforce and certified security staff",
    "Precision turnaround cycles designed to minimize ramp dwell times",
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
      className={`AviationServicesFive ${
        isVisible ? "AviationServicesFive--visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="AviationServicesFive__container">
        {/* Section Header */}
        <header className="AviationServicesFive__header">
          <div className="AviationServicesFive__eyebrow">
            <span className="AviationServicesFive__eyebrowLine" />
            <span>AIRSIDE EXCELLENCE & GROUND HANDLING</span>
          </div>

          <div className="AviationServicesFive__headerRow">
            <h2 className="AviationServicesFive__title">
              Specialised <span>Aviation</span> & Airport Logistics
            </h2>

            <p className="AviationServicesFive__intro">
              Prime Site delivers mission-critical aviation support, from secure
              apron operations and technical ground dispatch to five-star terminal
              concierge services. We provide global standard infrastructure, strict
              regulatory compliance, and zero-compromise safety.
            </p>
          </div>
        </header>

        {/* Capabilities Grid */}
        <div className="AviationServicesFive__grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeCard === item.id;

            return (
              <article
                className={`AviationServicesFive__card ${
                  isActive ? "AviationServicesFive__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--AviationServicesFive-delay": `${index * 120}ms`,
                }}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="AviationServicesFive__cardHeader">
                  <span className="AviationServicesFive__cardTag">
                    {item.tag}
                  </span>

                  <div className="AviationServicesFive__cardMetric">
                    <span className="AviationServicesFive__metricValue">
                      {item.metric}
                    </span>
                    <span className="AviationServicesFive__metricLabel">
                      {item.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="AviationServicesFive__iconBadge">
                  <div className="AviationServicesFive__iconBadgeOuter">
                    <div className="AviationServicesFive__iconBadgeInner">
                      <Icon
                        className="AviationServicesFive__badgeIcon"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                <div className="AviationServicesFive__cardBody">
                  <h3 className="AviationServicesFive__cardTitle">
                    {item.title}
                  </h3>
                  <p className="AviationServicesFive__cardDescription">
                    {item.description}
                  </p>
                </div>

                <div className="AviationServicesFive__cardFooter">
                  <span className="AviationServicesFive__footerLine" />
                  <span className="AviationServicesFive__footerText">
                    PRIME STANDARD
                  </span>
                  <span className="AviationServicesFive__footerAction">
                    <ArrowRight size={16} />
                  </span>
                </div>

                <span
                  className="AviationServicesFive__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="AviationServicesFive__banner">
          <div className="AviationServicesFive__bannerContent">
            <span className="AviationServicesFive__bannerKicker">
              <Sparkles size={14} /> CERTIFIED AIRPORT READINESS
            </span>
            <h4 className="AviationServicesFive__bannerHeading">
              Need integrated ramp, cargo, or passenger support for your fleet?
            </h4>
            <div className="AviationServicesFive__bannerList">
              {commitments.map((text, i) => (
                <div key={i} className="AviationServicesFive__bannerItem">
                  <CheckCircle2
                    size={16}
                    className="AviationServicesFive__checkIcon"
                  />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="AviationServicesFive__bannerSide">
            <div className="AviationServicesFive__statPill">
              <Compass size={18} />
              <div>
                <strong>Global Operations</strong>
                <small>Airside certified crew</small>
              </div>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <footer className="AviationServicesFive__footer">
          <div className="AviationServicesFive__footerDecoration">
            <span />
            <span />
            <span />
          </div>
          <p className="AviationServicesFive__footerStatement">
            Aviation precision. Flawless flight support. Prime operational distinction.
          </p>
          <span className="AviationServicesFive__footerCaption">
            PRIME SITE · AVIATION & AIRPORT SERVICES
          </span>
        </footer>
      </div>
    </section>
  );
};

export default AviationServicesFive;