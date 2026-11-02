import React, { useEffect, useRef, useState } from "react";
import {
  Server,
  Layers,
  Cpu,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import "./ManagedServicesFive.css";

const ManagedServicesFive = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const capabilities = [
    {
      id: 1,
      tag: "INFRASTRUCTURE & CLOUD",
      title: "Enterprise Cloud & Systems",
      description:
        "High-availability server infrastructure, proactive multi-cloud workload provisioning, zero-downtime maintenance, and continuous performance tuning.",
      metric: "99.99%",
      metricLabel: "PLATFORM UPTIME",
      icon: Server,
    },
    {
      id: 2,
      tag: "DIGITAL RESILIENCE",
      title: "Cyber Defense & Risk Control",
      description:
        "Round-the-clock Security Operations Center (SOC) oversight, threat vector mitigation, compliance auditing, and unified data protection governance.",
      metric: "24/7/365",
      metricLabel: "THREAT OVERSIGHT",
      icon: ShieldCheck,
    },
    {
      id: 3,
      tag: "AUTOMATION & SCALING",
      title: "DevOps & Managed Operations",
      description:
        "Integrated CI/CD automation pipelines, database administration, distributed architecture management, and full-spectrum incident response.",
      metric: "<10m",
      metricLabel: "CRITICAL SLA",
      icon: Cpu,
    },
  ];

  const commitments = [
    "Enterprise-tier Service Level Agreements (SLAs) with proactive incident management",
    "Continuous architecture compliance aligned with ISO and industry standards",
    "Tailored dedicated operational pods built for elastic enterprise scalability",
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
      className={`ManagedServicesFive ${
        isVisible ? "ManagedServicesFive--visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="ManagedServicesFive__container">
        {/* Section Header */}
        <header className="ManagedServicesFive__header">
          <div className="ManagedServicesFive__eyebrow">
            <span className="ManagedServicesFive__eyebrowLine" />
            <span>ENTERPRISE SOLUTIONS & INFRASTRUCTURE</span>
          </div>

          <div className="ManagedServicesFive__headerRow">
            <h2 className="ManagedServicesFive__title">
              Complete <span>Managed IT</span> & Operations Services
            </h2>

            <p className="ManagedServicesFive__intro">
              Prime Site delivers fully integrated managed technical operations,
              scalable enterprise cloud administration, and round-the-clock
              infrastructure oversight. We ensure high-performance reliability,
              robust data safety, and seamless digital transformation.
            </p>
          </div>
        </header>

        {/* Capabilities Grid */}
        <div className="ManagedServicesFive__grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeCard === item.id;

            return (
              <article
                className={`ManagedServicesFive__card ${
                  isActive ? "ManagedServicesFive__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--ManagedServicesFive-delay": `${index * 120}ms`,
                }}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="ManagedServicesFive__cardHeader">
                  <span className="ManagedServicesFive__cardTag">
                    {item.tag}
                  </span>

                  <div className="ManagedServicesFive__cardMetric">
                    <span className="ManagedServicesFive__metricValue">
                      {item.metric}
                    </span>
                    <span className="ManagedServicesFive__metricLabel">
                      {item.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="ManagedServicesFive__iconBadge">
                  <div className="ManagedServicesFive__iconBadgeOuter">
                    <div className="ManagedServicesFive__iconBadgeInner">
                      <Icon
                        className="ManagedServicesFive__badgeIcon"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </div>

                <div className="ManagedServicesFive__cardBody">
                  <h3 className="ManagedServicesFive__cardTitle">
                    {item.title}
                  </h3>
                  <p className="ManagedServicesFive__cardDescription">
                    {item.description}
                  </p>
                </div>

                <div className="ManagedServicesFive__cardFooter">
                  <span className="ManagedServicesFive__footerLine" />
                  <span className="ManagedServicesFive__footerText">
                    PRIME STANDARD
                  </span>
                  <span className="ManagedServicesFive__footerAction">
                    <ArrowRight size={16} />
                  </span>
                </div>

                <span
                  className="ManagedServicesFive__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="ManagedServicesFive__banner">
          <div className="ManagedServicesFive__bannerContent">
            <span className="ManagedServicesFive__bannerKicker">
              <Sparkles size={14} /> DEDICATED TECHNICAL ALLOCATION
            </span>
            <h4 className="ManagedServicesFive__bannerHeading">
              Ready to scale your enterprise operations with managed engineering pods?
            </h4>
            <div className="ManagedServicesFive__bannerList">
              {commitments.map((text, i) => (
                <div key={i} className="ManagedServicesFive__bannerItem">
                  <CheckCircle2
                    size={16}
                    className="ManagedServicesFive__checkIcon"
                  />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ManagedServicesFive__bannerSide">
            <div className="ManagedServicesFive__statPill">
              <BarChart3 size={18} />
              <div>
                <strong>Engineered Uptime</strong>
                <small>Tier-4 standard operations</small>
              </div>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <footer className="ManagedServicesFive__footer">
          <div className="ManagedServicesFive__footerDecoration">
            <span />
            <span />
            <span />
          </div>
          <p className="ManagedServicesFive__footerStatement">
            Resilient infrastructure. Unrivaled systems uptime. Prime operational stability.
          </p>
          <span className="ManagedServicesFive__footerCaption">
            PRIME SITE · MANAGED SERVICES & ENTERPRISE COMPUTING
          </span>
        </footer>
      </div>
    </section>
  );
};

export default ManagedServicesFive;