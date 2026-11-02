import React, { useEffect, useRef, useState } from "react";
import {
  Building2,
  Wrench,
  Sparkles,
  Settings,
  ClipboardCheck,
  Headset,
  ArrowUpRight,
  Star,
  ShieldCheck,
} from "lucide-react";
import "./FacilityManagementFive.css";

const FacilityManagementFive = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const facilityServices = [
    {
      id: 1,
      year: "01",
      title: "Building Maintenance",
      subtitle: "Keeping Properties in Top Condition",
      description:
        "Maintain safe, functional properties with planned inspections, routine maintenance, and timely attention to building systems and facility requirements.",
      icon: Building2,
      category: "MAINTENANCE",
    },
    {
      id: 2,
      year: "02",
      title: "Technical Services",
      subtitle: "Reliable Support for Essential Systems",
      description:
        "Support the performance of essential facility systems through coordinated technical assistance, equipment checks, and maintenance planning.",
      icon: Wrench,
      category: "TECHNICAL",
    },
    {
      id: 3,
      year: "03",
      title: "Cleaning Services",
      subtitle: "Clean, Comfortable Workspaces",
      description:
        "Create welcoming environments with structured cleaning services designed to support hygiene, workplace comfort, and professional presentation.",
      icon: Sparkles,
      category: "CLEANING",
    },
    {
      id: 4,
      year: "04",
      title: "Facility Operations",
      subtitle: "Smooth Day-to-Day Management",
      description:
        "Coordinate daily facility activities, service schedules, and operational requirements to help buildings function efficiently and consistently.",
      icon: Settings,
      category: "OPERATIONS",
    },
    {
      id: 5,
      year: "05",
      title: "Inspection & Compliance",
      subtitle: "Standards That Matter",
      description:
        "Support facility standards through organized inspections, maintenance records, service checks, and systematic follow-up on identified issues.",
      icon: ClipboardCheck,
      category: "INSPECTION",
    },
    {
      id: 6,
      year: "06",
      title: "Facility Helpdesk",
      subtitle: "Responsive Service Coordination",
      description:
        "Help facility users get the assistance they need through clear service communication, issue tracking, and coordinated maintenance responses.",
      icon: Headset,
      category: "SUPPORT",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
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
      className={`FacilityManagementFive ${
        isVisible ? "FacilityManagementFive--visible" : ""
      }`}
    >
      <div className="FacilityManagementFive__container">
        <header className="FacilityManagementFive__header">
          <div className="FacilityManagementFive__eyebrow">
            <span className="FacilityManagementFive__eyebrowLine" />
            <span>INTEGRATED FACILITY MANAGEMENT</span>
          </div>

          <h2 className="FacilityManagementFive__title">
            Better Spaces <span>&</span>
            <br />
            Smarter Facility Management
          </h2>

          <p className="FacilityManagementFive__intro">
            Well-managed facilities create better experiences for everyone.
            Our integrated facility management solutions support building
            maintenance, cleaning, technical operations, and service
            coordination to help your properties operate smoothly every day.
          </p>

          <div className="FacilityManagementFive__summary">
            <div className="FacilityManagementFive__summaryItem">
              <span className="FacilityManagementFive__summaryNumber">
                06
              </span>
              <span className="FacilityManagementFive__summaryLabel">
                FACILITY SOLUTIONS
              </span>
            </div>

            <span className="FacilityManagementFive__summaryDivider" />

            <div className="FacilityManagementFive__summaryItem">
              <span className="FacilityManagementFive__summaryIcon">
                <ShieldCheck size={19} />
              </span>
              <span className="FacilityManagementFive__summaryLabel">
                EFFICIENT. RELIABLE. PROFESSIONAL.
              </span>
            </div>
          </div>
        </header>

        <div className="FacilityManagementFive__grid">
          {facilityServices.map((item, index) => {
            const ServiceIcon = item.icon;
            const isActive = activeService === item.id;

            return (
              <article
                className={`FacilityManagementFive__card ${
                  isActive ? "FacilityManagementFive__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--FacilityManagementFive-delay": `${index * 100}ms`,
                }}
                onMouseEnter={() => setActiveService(item.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="FacilityManagementFive__cardTop">
                  <span className="FacilityManagementFive__category">
                    {item.category}
                  </span>

                  <span className="FacilityManagementFive__year">
                    {item.year}
                  </span>
                </div>

                <div className="FacilityManagementFive__emblem">
                  <div className="FacilityManagementFive__emblemOuter">
                    <div className="FacilityManagementFive__emblemInner">
                      <ServiceIcon
                        className="FacilityManagementFive__awardIcon"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <span className="FacilityManagementFive__emblemStar">
                    <Star size={13} fill="currentColor" />
                  </span>
                </div>

                <div className="FacilityManagementFive__cardContent">
                  <span className="FacilityManagementFive__cardKicker">
                    SOLUTION · {item.year}
                  </span>

                  <h3 className="FacilityManagementFive__cardTitle">
                    {item.title}
                  </h3>

                  <p className="FacilityManagementFive__subtitle">
                    {item.subtitle}
                  </p>

                  <p className="FacilityManagementFive__description">
                    {item.description}
                  </p>
                </div>

                <div className="FacilityManagementFive__cardFooter">
                  <span className="FacilityManagementFive__footerLine" />

                  <span className="FacilityManagementFive__footerText">
                    FACILITY CARE
                  </span>

                  <span className="FacilityManagementFive__footerArrow">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <span
                  className="FacilityManagementFive__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        <footer className="FacilityManagementFive__footer">
          <div className="FacilityManagementFive__footerDecoration">
            <span />
            <span />
            <span />
          </div>

          <p className="FacilityManagementFive__footerStatement">
            Maintaining better spaces. Supporting daily operations. Creating
            lasting value.
          </p>

          <span className="FacilityManagementFive__footerCaption">
            YOUR FACILITY. OUR RESPONSIBILITY.
          </span>
        </footer>
      </div>
    </section>
  );
};

export default FacilityManagementFive;