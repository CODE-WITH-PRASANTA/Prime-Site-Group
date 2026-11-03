import React, { useEffect, useRef, useState } from "react";
import {
  Users,
  UserCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  GraduationCap,
  CalendarCheck,
  Star,
  ArrowUpRight,
  Award,
} from "lucide-react";
import "./WorkforceSoluationFive.css";

const WorkforceSoluationFive = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const workforceServices = [
    {
      id: 1,
      year: "24/7",
      title: "Workforce Management",
      subtitle: "Efficient Team Coordination",
      description:
        "Streamline daily workforce operations through effective scheduling, employee coordination, attendance monitoring, and productivity management.",
      icon: Users,
      category: "MANAGEMENT",
    },
    {
      id: 2,
      year: "HR",
      title: "Recruitment & Staffing",
      subtitle: "The Right People for Every Role",
      description:
        "Connect with suitable talent through structured recruitment, candidate screening, and staffing solutions tailored to your business needs.",
      icon: UserCheck,
      category: "RECRUITMENT",
    },
    {
      id: 3,
      year: "B2B",
      title: "Contract Staffing",
      subtitle: "Flexible Workforce Solutions",
      description:
        "Build an adaptable workforce with temporary, contract, and project-based staffing support that responds to changing operational demands.",
      icon: BriefcaseBusiness,
      category: "STAFFING",
    },
    {
      id: 4,
      year: "HRMS",
      title: "Payroll & Compliance",
      subtitle: "Accurate and Reliable Administration",
      description:
        "Simplify payroll coordination, employee records, documentation, and workforce administration with organised processes and timely support.",
      icon: ClipboardCheck,
      category: "COMPLIANCE",
    },
    {
      id: 5,
      year: "SKILL",
      title: "Training & Development",
      subtitle: "Build Skills, Improve Performance",
      description:
        "Support employee growth through role-specific training, practical learning programmes, and development initiatives that strengthen team capabilities.",
      icon: GraduationCap,
      category: "DEVELOPMENT",
    },
    {
      id: 6,
      year: "PLAN",
      title: "Workforce Planning",
      subtitle: "Prepared for Business Growth",
      description:
        "Plan staffing requirements, identify skill gaps, and organise workforce resources to help your business maintain operational continuity.",
      icon: CalendarCheck,
      category: "PLANNING",
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
      className={`WorkforceSoluationFive ${
        isVisible ? "WorkforceSoluationFive--visible" : ""
      }`}
    >
      <div className="WorkforceSoluationFive__container">
        {/* Section Header */}
        <header className="WorkforceSoluationFive__header">
          <div className="WorkforceSoluationFive__eyebrow">
            <span className="WorkforceSoluationFive__eyebrowLine" />
            <span>SMART WORKFORCE &amp; STAFFING SOLUTIONS</span>
          </div>

          <h2 className="WorkforceSoluationFive__title">
            Building Strong Teams <span>&amp;</span> Empowering Business Growth
          </h2>

          <p className="WorkforceSoluationFive__intro">
            Simplify workforce operations with dependable staffing,
            recruitment, employee management, and development solutions. We
            help businesses build capable teams, improve efficiency, and
            prepare for changing workforce requirements.
          </p>

          <div className="WorkforceSoluationFive__summary">
            <div className="WorkforceSoluationFive__summaryItem">
              <span className="WorkforceSoluationFive__summaryNumber">
                06
              </span>
              <span className="WorkforceSoluationFive__summaryLabel">
                CORE SOLUTIONS
              </span>
            </div>

            <span className="WorkforceSoluationFive__summaryDivider" />

            <div className="WorkforceSoluationFive__summaryItem">
              <span className="WorkforceSoluationFive__summaryIcon">
                <Award size={19} strokeWidth={1.5} />
              </span>
              <span className="WorkforceSoluationFive__summaryLabel">
                PEOPLE-FOCUSED EXCELLENCE
              </span>
            </div>
          </div>
        </header>

        {/* Workforce Services Grid */}
        <div className="WorkforceSoluationFive__grid">
          {workforceServices.map((item, index) => {
            const ServiceIcon = item.icon;
            const isActive = activeService === item.id;

            return (
              <article
                key={item.id}
                className={`WorkforceSoluationFive__card ${
                  isActive ? "WorkforceSoluationFive__card--active" : ""
                }`}
                style={{
                  "--WorkforceSoluationFive-delay": `${index * 100}ms`,
                }}
                onMouseEnter={() => setActiveService(item.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="WorkforceSoluationFive__cardTop">
                  <span className="WorkforceSoluationFive__category">
                    {item.category}
                  </span>

                  <span className="WorkforceSoluationFive__year">
                    {item.year}
                  </span>
                </div>

                {/* Decorative Emblem */}
                <div className="WorkforceSoluationFive__emblem">
                  <div className="WorkforceSoluationFive__emblemOuter">
                    <div className="WorkforceSoluationFive__emblemInner">
                      <ServiceIcon
                        className="WorkforceSoluationFive__awardIcon"
                        strokeWidth={1.35}
                      />
                    </div>
                  </div>

                  <span className="WorkforceSoluationFive__emblemStar">
                    <Star size={13} fill="currentColor" />
                  </span>
                </div>

                {/* Card Content */}
                <div className="WorkforceSoluationFive__cardContent">
                  <span className="WorkforceSoluationFive__cardKicker">
                    WORKFORCE SOLUTION · {item.year}
                  </span>

                  <h3 className="WorkforceSoluationFive__cardTitle">
                    {item.title}
                  </h3>

                  <p className="WorkforceSoluationFive__subtitle">
                    {item.subtitle}
                  </p>

                  <p className="WorkforceSoluationFive__description">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="WorkforceSoluationFive__cardFooter">
                  <span className="WorkforceSoluationFive__footerLine" />

                  <span className="WorkforceSoluationFive__footerText">
                    PEOPLE FIRST
                  </span>

                  <span className="WorkforceSoluationFive__footerArrow">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <span
                  className="WorkforceSoluationFive__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <footer className="WorkforceSoluationFive__footer">
          <div className="WorkforceSoluationFive__footerDecoration">
            <span />
            <span />
            <span />
          </div>

          <p className="WorkforceSoluationFive__footerStatement">
            Empowering people. Strengthening teams. Supporting business success.
          </p>

          <span className="WorkforceSoluationFive__footerCaption">
            OUR PEOPLE. OUR PURPOSE. OUR COMMITMENT.
          </span>
        </footer>
      </div>
    </section>
  );
};

export default WorkforceSoluationFive;