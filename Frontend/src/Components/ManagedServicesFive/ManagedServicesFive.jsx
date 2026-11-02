import React, { useEffect, useRef, useState } from "react";
import {
  Settings,
  Users,
  ClipboardCheck,
  Workflow,
  Handshake,
  Headset,
  ArrowUpRight,
  Star,
} from "lucide-react";
import "./ManagedServicesFive.css";

const managedServices = [
  {
    id: "01",
    category: "Operations Management",
    icon: Settings,
    kicker: "STREAMLINED OPERATIONS",
    title: "Business Operations",
    subtitle: "Keep your daily operations running smoothly.",
    description:
      "Organized operational support that helps businesses coordinate daily activities, improve efficiency, and maintain consistent service delivery.",
    footer: "Operational Excellence",
  },
  {
    id: "02",
    category: "Workforce Solutions",
    icon: Users,
    kicker: "PEOPLE & PERFORMANCE",
    title: "Workforce Management",
    subtitle: "The right people, working together.",
    description:
      "Workforce coordination and staffing support designed to align team capabilities with business requirements and operational goals.",
    footer: "Workforce Coordination",
  },
  {
    id: "03",
    category: "Quality Assurance",
    icon: ClipboardCheck,
    kicker: "QUALITY YOU CAN TRUST",
    title: "Quality Management",
    subtitle: "Consistent standards across every process.",
    description:
      "Structured quality checks, performance monitoring, and process reviews that help teams maintain reliable standards and identify opportunities for improvement.",
    footer: "Quality & Compliance",
  },
  {
    id: "04",
    category: "Process Optimization",
    icon: Workflow,
    kicker: "SMARTER WORKFLOWS",
    title: "Process Improvement",
    subtitle: "Make every process work better.",
    description:
      "Practical workflow improvements that reduce unnecessary complexity, strengthen coordination, and help teams use their resources more effectively.",
    footer: "Process Optimization",
  },
  {
    id: "05",
    category: "Client Partnerships",
    icon: Handshake,
    kicker: "BUILT ON COLLABORATION",
    title: "Client Relationship Management",
    subtitle: "Partnerships built around your needs.",
    description:
      "Responsive client coordination that keeps communication clear, expectations aligned, and managed services focused on your business priorities.",
    footer: "Client Partnership",
  },
  {
    id: "06",
    category: "Service Support",
    icon: Headset,
    kicker: "SUPPORT THAT RESPONDS",
    title: "Managed Support Services",
    subtitle: "Dependable assistance when it matters.",
    description:
      "Centralized service support and issue coordination to help teams resolve day-to-day challenges and maintain continuity across operations.",
    footer: "Service & Support",
  },
];

const ManagedServicesFive = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

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
      className={`managed-services-five ${
        isVisible ? "managed-services-five-visible" : ""
      }`}
    >
      <div className="managed-services-five-inner">
        <div className="managed-services-five-header">
          <div className="managed-services-five-heading">
            <span className="managed-services-five-eyebrow">
              <span className="managed-services-five-eyebrow-line" />
              MANAGED SERVICES
            </span>

            <h2>
              Better Management.
              <span> Stronger Performance.</span>
            </h2>

            <p className="managed-services-five-intro">
              Simplify your business operations with dependable managed
              services. From workforce coordination to process improvement,
              we help your organization work smarter, stay organized, and
              focus on what matters most.
            </p>
          </div>

          <div className="managed-services-five-summary">
            <div className="managed-services-five-summary-top">
              <span className="managed-services-five-summary-number">06</span>

              <div className="managed-services-five-summary-icon">
                <Settings size={25} strokeWidth={1.6} />
              </div>
            </div>

            <span className="managed-services-five-summary-label">
              SERVICE SOLUTIONS
            </span>

            <p>
              Integrated management support for everyday business needs.
            </p>
          </div>
        </div>

        <div className="managed-services-five-grid">
          {managedServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                className={`managed-services-five-card ${
                  activeCard === service.id
                    ? "managed-services-five-card-active"
                    : ""
                }`}
                style={{ "--managed-card-index": index }}
                onMouseEnter={() => setActiveCard(service.id)}
                onMouseLeave={() => setActiveCard(null)}
                onFocus={() => setActiveCard(service.id)}
                onBlur={() => setActiveCard(null)}
              >
                <div className="managed-services-five-card-top">
                  <span className="managed-services-five-category">
                    {service.category}
                  </span>

                  <span className="managed-services-five-card-number">
                    {service.id}
                  </span>
                </div>

                <div className="managed-services-five-emblem">
                  <div className="managed-services-five-emblem-icon">
                    <Icon size={29} strokeWidth={1.6} />
                  </div>

                  <Star
                    className="managed-services-five-emblem-star"
                    size={15}
                    fill="currentColor"
                  />
                </div>

                <div className="managed-services-five-card-content">
                  <span className="managed-services-five-kicker">
                    {service.kicker}
                  </span>

                  <h3>{service.title}</h3>

                  <h4>{service.subtitle}</h4>

                  <p>{service.description}</p>
                </div>

                <div className="managed-services-five-card-footer">
                  <span>{service.footer}</span>

                  <span className="managed-services-five-arrow">
                    <ArrowUpRight size={19} strokeWidth={1.8} />
                  </span>
                </div>

                <span className="managed-services-five-accent" />
              </article>
            );
          })}
        </div>

        <div className="managed-services-five-bottom">
          <div className="managed-services-five-bottom-mark">
            <span />
            <span />
            <span />
          </div>

          <div className="managed-services-five-bottom-copy">
            <h3>We Manage the Details. You Focus on Growth.</h3>
            <p>
              Practical service solutions built around efficiency,
              accountability, and long-term business success.
            </p>
          </div>

          <span className="managed-services-five-bottom-caption">
            MANAGEMENT • EFFICIENCY • GROWTH
          </span>
        </div>
      </div>
    </section>
  );
};

export default ManagedServicesFive;