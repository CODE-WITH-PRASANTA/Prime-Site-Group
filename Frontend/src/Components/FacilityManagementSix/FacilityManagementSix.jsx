import React, { useEffect, useRef, useState } from "react";
import {
  Award,
  Building2,
  Wrench,
  ShieldCheck,
  Settings,
  ClipboardCheck,
  Leaf,
  Users,
  Star,
  ArrowUpRight,
} from "lucide-react";
import "./FacilityManagementSix.css";

const FacilityManagementSix = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const services = [
    {
      id: 1,
      label: "BUILDING CARE",
      tag: "CORE",
      title: "Integrated Facility Management",
      subtitle: "One Partner for Complete Facility Care",
      description:
        "Coordinated facility management solutions help maintain buildings, streamline daily operations, and create safe, comfortable, and productive environments.",
      icon: Building2,
      category: "FACILITY OPERATIONS",
    },
    {
      id: 2,
      label: "MAINTENANCE",
      tag: "CARE",
      title: "Technical Maintenance",
      subtitle: "Reliable Performance Every Day",
      description:
        "Planned and reactive maintenance for essential building systems helps reduce unexpected downtime and keeps facilities operating efficiently.",
      icon: Wrench,
      category: "TECHNICAL SERVICES",
    },
    {
      id: 3,
      label: "SAFETY FIRST",
      tag: "SAFE",
      title: "Health & Safety Management",
      subtitle: "Protecting People and Property",
      description:
        "Structured safety checks, risk awareness, and responsible operating procedures support safer workplaces and better-managed facilities.",
      icon: ShieldCheck,
      category: "HEALTH & SAFETY",
    },
    {
      id: 4,
      label: "EFFICIENCY",
      tag: "SMART",
      title: "Building Systems Management",
      subtitle: "Smarter Systems, Better Results",
      description:
        "Monitoring and maintaining essential building systems supports operational reliability, efficient resource use, and consistent performance.",
      icon: Settings,
      category: "SYSTEMS MANAGEMENT",
    },
    {
      id: 5,
      label: "QUALITY CONTROL",
      tag: "CHECK",
      title: "Cleaning & Hygiene Services",
      subtitle: "Clean Spaces That Feel Better",
      description:
        "Professional cleaning routines and hygiene-focused practices help create welcoming, well-maintained spaces for employees, visitors, and customers.",
      icon: ClipboardCheck,
      category: "CLEANING & HYGIENE",
    },
    {
      id: 6,
      label: "SUSTAINABILITY",
      tag: "GREEN",
      title: "Sustainable Facility Solutions",
      subtitle: "Responsible Care for the Future",
      description:
        "Practical sustainability initiatives help improve resource efficiency, reduce unnecessary waste, and support more responsible facility operations.",
      icon: Leaf,
      category: "SUSTAINABLE OPERATIONS",
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
      className={`FacilityManagementSix ${
        isVisible ? "FacilityManagementSix--visible" : ""
      }`}
    >
      <div className="FacilityManagementSix__container">
        <header className="FacilityManagementSix__header">
          <div className="FacilityManagementSix__eyebrow">
            <span className="FacilityManagementSix__eyebrowLine" />
            <span>FACILITY MANAGEMENT SOLUTIONS</span>
          </div>

          <h2 className="FacilityManagementSix__title">
            Better Facilities, <span>Better Everyday Experiences</span>
          </h2>

          <p className="FacilityManagementSix__intro">
            Well-managed facilities are the foundation of successful
            organisations. From technical maintenance and cleaning to safety
            and sustainable operations, our facility management approach
            focuses on reliable performance, comfortable environments, and
            long-term value for the people who use every space.
          </p>

          <div className="FacilityManagementSix__summary">
            <div className="FacilityManagementSix__summaryItem">
              <span className="FacilityManagementSix__summaryNumber">06</span>
              <span className="FacilityManagementSix__summaryLabel">
                CORE SOLUTIONS
              </span>
            </div>

            <span className="FacilityManagementSix__summaryDivider" />

            <div className="FacilityManagementSix__summaryItem">
              <span className="FacilityManagementSix__summaryIcon">
                <Award size={19} />
              </span>
              <span className="FacilityManagementSix__summaryLabel">
                BUILT AROUND QUALITY
              </span>
            </div>
          </div>
        </header>

        <div className="FacilityManagementSix__grid">
          {services.map((item, index) => {
            const ServiceIcon = item.icon;
            const isActive = activeCard === item.id;

            return (
              <article
                className={`FacilityManagementSix__card ${
                  isActive ? "FacilityManagementSix__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--FacilityManagementSix-delay": `${index * 100}ms`,
                }}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="FacilityManagementSix__cardTop">
                  <span className="FacilityManagementSix__category">
                    {item.category}
                  </span>

                  <span className="FacilityManagementSix__year">
                    {item.tag}
                  </span>
                </div>

                <div className="FacilityManagementSix__emblem">
                  <div className="FacilityManagementSix__emblemOuter">
                    <div className="FacilityManagementSix__emblemInner">
                      <ServiceIcon
                        className="FacilityManagementSix__awardIcon"
                        strokeWidth={1.35}
                      />
                    </div>
                  </div>

                  <span className="FacilityManagementSix__emblemStar">
                    <Star size={13} fill="currentColor" />
                  </span>
                </div>

                <div className="FacilityManagementSix__cardContent">
                  <span className="FacilityManagementSix__cardKicker">
                    FACILITY EXCELLENCE ·{" "}
                    {String(item.id).padStart(2, "0")}
                  </span>

                  <h3 className="FacilityManagementSix__cardTitle">
                    {item.title}
                  </h3>

                  <p className="FacilityManagementSix__subtitle">
                    {item.subtitle}
                  </p>

                  <p className="FacilityManagementSix__description">
                    {item.description}
                  </p>
                </div>

                <div className="FacilityManagementSix__cardFooter">
                  <span className="FacilityManagementSix__footerLine" />

                  <span className="FacilityManagementSix__footerText">
                    QUALITY & CARE
                  </span>

                  <span className="FacilityManagementSix__footerArrow">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <span
                  className="FacilityManagementSix__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        <footer className="FacilityManagementSix__footer">
          <div className="FacilityManagementSix__footerDecoration">
            <span />
            <span />
            <span />
          </div>

          <p className="FacilityManagementSix__footerStatement">
            Well-maintained spaces. Reliable operations. Lasting value.
          </p>

          <span className="FacilityManagementSix__footerCaption">
            OUR EXPERTISE. YOUR ENVIRONMENT.
          </span>
        </footer>
      </div>
    </section>
  );
};

export default FacilityManagementSix;