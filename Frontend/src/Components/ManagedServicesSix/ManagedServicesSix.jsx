import React, { useEffect, useRef, useState } from "react";
import {
  Award,
  BriefcaseBusiness,
  Settings,
  Users,
  ShieldCheck,
  ClipboardCheck,
  ChartNoAxesCombined,
  Star,
  ArrowUpRight,
} from "lucide-react";
import "./ManagedServicesSix.css";

const ManagedServicesSix = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const services = [
    {
      id: 1,
      tag: "STRATEGY",
      title: "Business Process Management",
      subtitle: "Streamlined Workflows, Better Results",
      description:
        "Improve everyday operations through structured processes, coordinated workflows, and practical management solutions designed around your business objectives.",
      icon: BriefcaseBusiness,
      category: "BUSINESS OPERATIONS",
    },
    {
      id: 2,
      tag: "SUPPORT",
      title: "Professional Support Services",
      subtitle: "Reliable Support for Your Team",
      description:
        "Keep business activities moving with dependable operational support, organised service delivery, and responsive assistance for day-to-day requirements.",
      icon: Users,
      category: "OPERATIONAL SUPPORT",
    },
    {
      id: 3,
      tag: "SYSTEMS",
      title: "Technology & Systems Management",
      subtitle: "Smarter Systems, Smoother Operations",
      description:
        "Support reliable business systems through ongoing monitoring, coordinated maintenance, and practical improvements that help teams work efficiently.",
      icon: Settings,
      category: "SYSTEMS MANAGEMENT",
    },
    {
      id: 4,
      tag: "SECURITY",
      title: "Risk & Compliance Management",
      subtitle: "Responsible and Secure Operations",
      description:
        "Strengthen operational consistency through risk awareness, documented procedures, compliance support, and responsible service management.",
      icon: ShieldCheck,
      category: "RISK & COMPLIANCE",
    },
    {
      id: 5,
      tag: "QUALITY",
      title: "Quality Assurance & Reporting",
      subtitle: "Measure Performance with Confidence",
      description:
        "Use clear reporting, regular reviews, and practical performance indicators to identify improvements and maintain consistent service standards.",
      icon: ClipboardCheck,
      category: "QUALITY MANAGEMENT",
    },
    {
      id: 6,
      tag: "GROWTH",
      title: "Performance & Process Improvement",
      subtitle: "Built for Continuous Improvement",
      description:
        "Identify opportunities to improve productivity, optimise resources, and adapt operational processes as your organisation grows and evolves.",
      icon: ChartNoAxesCombined,
      category: "BUSINESS PERFORMANCE",
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
      className={`ManagedServicesSix ${
        isVisible ? "ManagedServicesSix--visible" : ""
      }`}
    >
      <div className="ManagedServicesSix__container">
        <header className="ManagedServicesSix__header">
          <div className="ManagedServicesSix__eyebrow">
            <span className="ManagedServicesSix__eyebrowLine" />
            <span>MANAGED SERVICES SOLUTIONS</span>
          </div>

          <h2 className="ManagedServicesSix__title">
            Simplifying Operations, <span>Strengthening Performance</span>
          </h2>

          <p className="ManagedServicesSix__intro">
            Successful businesses need dependable systems, efficient
            processes, and the right operational support. Our managed services
            approach helps organisations simplify daily activities, maintain
            consistent standards, manage operational risks, and focus on the
            priorities that drive long-term growth.
          </p>

          <div className="ManagedServicesSix__summary">
            <div className="ManagedServicesSix__summaryItem">
              <span className="ManagedServicesSix__summaryNumber">06</span>
              <span className="ManagedServicesSix__summaryLabel">
                SERVICE SOLUTIONS
              </span>
            </div>

            <span className="ManagedServicesSix__summaryDivider" />

            <div className="ManagedServicesSix__summaryItem">
              <span className="ManagedServicesSix__summaryIcon">
                <Award size={19} />
              </span>
              <span className="ManagedServicesSix__summaryLabel">
                BUILT AROUND PERFORMANCE
              </span>
            </div>
          </div>
        </header>

        <div className="ManagedServicesSix__grid">
          {services.map((item, index) => {
            const ServiceIcon = item.icon;
            const isActive = activeCard === item.id;

            return (
              <article
                className={`ManagedServicesSix__card ${
                  isActive ? "ManagedServicesSix__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--ManagedServicesSix-delay": `${index * 100}ms`,
                }}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="ManagedServicesSix__cardTop">
                  <span className="ManagedServicesSix__category">
                    {item.category}
                  </span>

                  <span className="ManagedServicesSix__year">
                    {item.tag}
                  </span>
                </div>

                <div className="ManagedServicesSix__emblem">
                  <div className="ManagedServicesSix__emblemOuter">
                    <div className="ManagedServicesSix__emblemInner">
                      <ServiceIcon
                        className="ManagedServicesSix__awardIcon"
                        strokeWidth={1.35}
                      />
                    </div>
                  </div>

                  <span className="ManagedServicesSix__emblemStar">
                    <Star size={13} fill="currentColor" />
                  </span>
                </div>

                <div className="ManagedServicesSix__cardContent">
                  <span className="ManagedServicesSix__cardKicker">
                    SERVICE EXCELLENCE ·{" "}
                    {String(item.id).padStart(2, "0")}
                  </span>

                  <h3 className="ManagedServicesSix__cardTitle">
                    {item.title}
                  </h3>

                  <p className="ManagedServicesSix__subtitle">
                    {item.subtitle}
                  </p>

                  <p className="ManagedServicesSix__description">
                    {item.description}
                  </p>
                </div>

                <div className="ManagedServicesSix__cardFooter">
                  <span className="ManagedServicesSix__footerLine" />

                  <span className="ManagedServicesSix__footerText">
                    TRUST & QUALITY
                  </span>

                  <span className="ManagedServicesSix__footerArrow">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <span
                  className="ManagedServicesSix__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        <footer className="ManagedServicesSix__footer">
          <div className="ManagedServicesSix__footerDecoration">
            <span />
            <span />
            <span />
          </div>

          <p className="ManagedServicesSix__footerStatement">
            Smarter processes. Dependable support. Stronger business outcomes.
          </p>

          <span className="ManagedServicesSix__footerCaption">
            OUR EXPERTISE. YOUR SUCCESS.
          </span>
        </footer>
      </div>
    </section>
  );
};

export default ManagedServicesSix;