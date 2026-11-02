import React, { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  LockKeyhole,
  Users,
  Eye,
  Siren,
  ClipboardCheck,
  Star,
  ArrowUpRight,
  Award,
} from "lucide-react";
import "./SecurityServicesSix.css";

const SecurityServicesSix = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 1,
      category: "PROTECTION",
      number: "01",
      title: "Security Guard Services",
      subtitle: "Professional On-Site Protection",
      description:
        "Trained security personnel help protect people, premises and assets through a visible presence, access monitoring and professional day-to-day support.",
      icon: ShieldCheck,
      tag: "GUARDED SECURITY",
    },
    {
      id: 2,
      category: "ACCESS CONTROL",
      number: "02",
      title: "Access Control Management",
      subtitle: "Controlled & Secure Entry",
      description:
        "Structured entry procedures, visitor verification and access monitoring help ensure that authorised individuals can enter designated areas safely.",
      icon: LockKeyhole,
      tag: "SECURE ACCESS",
    },
    {
      id: 3,
      category: "PEOPLE & ASSETS",
      number: "03",
      title: "Corporate Security",
      subtitle: "Protection for Business Environments",
      description:
        "Security support tailored to offices and commercial facilities, helping protect employees, visitors, business property and everyday operations.",
      icon: Users,
      tag: "CORPORATE SAFETY",
    },
    {
      id: 4,
      category: "MONITORING",
      number: "04",
      title: "Surveillance & Monitoring",
      subtitle: "Enhanced Situational Awareness",
      description:
        "Monitoring procedures and security observations help identify unusual activity, support incident reporting and improve awareness across your site.",
      icon: Eye,
      tag: "VIGILANT MONITORING",
    },
    {
      id: 5,
      category: "EMERGENCY SUPPORT",
      number: "05",
      title: "Emergency Response",
      subtitle: "Preparedness When It Matters",
      description:
        "Clear escalation procedures and coordinated security responses help teams act promptly during incidents and support the safety of people on site.",
      icon: Siren,
      tag: "RAPID RESPONSE",
    },
    {
      id: 6,
      category: "RISK MANAGEMENT",
      number: "06",
      title: "Security Audits & Reporting",
      subtitle: "Consistent Standards & Oversight",
      description:
        "Routine security reviews, documented observations and incident reports help identify vulnerabilities and support continuous service improvement.",
      icon: ClipboardCheck,
      tag: "QUALITY ASSURANCE",
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
      className={`SecurityServicesSix ${
        isVisible ? "SecurityServicesSix--visible" : ""
      }`}
    >
      <div className="SecurityServicesSix__container">
        <header className="SecurityServicesSix__header">
          <div className="SecurityServicesSix__eyebrow">
            <span className="SecurityServicesSix__eyebrowLine" />
            <span>PROFESSIONAL SECURITY SOLUTIONS</span>
          </div>

          <h2 className="SecurityServicesSix__title">
            Security Built on <span>Trust & Excellence</span>
          </h2>

          <p className="SecurityServicesSix__intro">
            Protecting people, property and business operations requires
            dependable professionals, thoughtful planning and consistent
            standards. Our security services are designed to support safer
            environments through trained personnel, structured procedures
            and a commitment to reliable service.
          </p>

          <div className="SecurityServicesSix__summary">
            <div className="SecurityServicesSix__summaryItem">
              <span className="SecurityServicesSix__summaryNumber">06</span>
              <span className="SecurityServicesSix__summaryLabel">
                SECURITY SOLUTIONS
              </span>
            </div>

            <span className="SecurityServicesSix__summaryDivider" />

            <div className="SecurityServicesSix__summaryItem">
              <span className="SecurityServicesSix__summaryIcon">
                <Award size={19} />
              </span>
              <span className="SecurityServicesSix__summaryLabel">
                PROFESSIONAL STANDARDS
              </span>
            </div>
          </div>
        </header>

        <div className="SecurityServicesSix__grid">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            const isActive = activeService === service.id;

            return (
              <article
                key={service.id}
                className={`SecurityServicesSix__card ${
                  isActive ? "SecurityServicesSix__card--active" : ""
                }`}
                style={{
                  "--SecurityServicesSix-delay": `${index * 100}ms`,
                }}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="SecurityServicesSix__cardTop">
                  <span className="SecurityServicesSix__category">
                    {service.category}
                  </span>

                  <span className="SecurityServicesSix__year">
                    {service.number}
                  </span>
                </div>

                <div className="SecurityServicesSix__emblem">
                  <div className="SecurityServicesSix__emblemOuter">
                    <div className="SecurityServicesSix__emblemInner">
                      <ServiceIcon
                        className="SecurityServicesSix__serviceIcon"
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <span className="SecurityServicesSix__emblemStar">
                    <Star size={13} fill="currentColor" />
                  </span>
                </div>

                <div className="SecurityServicesSix__cardContent">
                  <span className="SecurityServicesSix__cardKicker">
                    SECURITY SOLUTION · {service.number}
                  </span>

                  <h3 className="SecurityServicesSix__cardTitle">
                    {service.title}
                  </h3>

                  <p className="SecurityServicesSix__subtitle">
                    {service.subtitle}
                  </p>

                  <p className="SecurityServicesSix__description">
                    {service.description}
                  </p>
                </div>

                <div className="SecurityServicesSix__cardFooter">
                  <span className="SecurityServicesSix__footerLine" />

                  <span className="SecurityServicesSix__footerText">
                    {service.tag}
                  </span>

                  <span className="SecurityServicesSix__footerArrow">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <span
                  className="SecurityServicesSix__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        <footer className="SecurityServicesSix__footer">
          <div className="SecurityServicesSix__footerDecoration">
            <span />
            <span />
            <span />
          </div>

          <p className="SecurityServicesSix__footerStatement">
            Protecting what matters. Strengthening confidence. Building trust.
          </p>

          <span className="SecurityServicesSix__footerCaption">
            YOUR SAFETY. OUR RESPONSIBILITY.
          </span>
        </footer>
      </div>
    </section>
  );
};

export default SecurityServicesSix;