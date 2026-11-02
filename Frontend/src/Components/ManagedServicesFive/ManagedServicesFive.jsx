import React from "react";
import "./ManagedServicesFive.css";

const managedServices = [
  {
    id: 1,
    number: "01",
    title: "IT Infrastructure Management",
    description:
      "Keep your business running smoothly with reliable infrastructure monitoring, maintenance, and performance optimization.",
    icon: "▦",
  },
  {
    id: 2,
    number: "02",
    title: "Cloud Services Management",
    description:
      "Simplify cloud operations with scalable solutions, efficient resource management, and secure cloud environments.",
    icon: "☁",
  },
  {
    id: 3,
    number: "03",
    title: "Security & Risk Management",
    description:
      "Protect your business with proactive security monitoring, risk assessment, and dependable data protection practices.",
    icon: "◇",
  },
  {
    id: 4,
    number: "04",
    title: "Technical Support",
    description:
      "Resolve technical issues faster with responsive support, troubleshooting, and ongoing system assistance.",
    icon: "⌘",
  },
];

const ManagedServicesFive = () => {
  return (
    <section className="ManagedServicesFive">
      <div className="ManagedServicesFive__container">
        <div className="ManagedServicesFive__hero">
          <div className="ManagedServicesFive__content">
            <span className="ManagedServicesFive__eyebrow">
              MANAGED SERVICES
            </span>

            <h2 className="ManagedServicesFive__title">
              Smarter Services.
              <br />
              <span>Stronger Business.</span>
            </h2>

            <p className="ManagedServicesFive__description">
              Focus on growing your business while we manage the technology,
              systems, and services that keep your operations moving forward.
              Our proactive approach helps improve efficiency, reliability,
              and long-term performance.
            </p>

            <div className="ManagedServicesFive__actions">
              <a
                href="#contact-us"
                className="ManagedServicesFive__button"
              >
                Explore Our Services
                <span aria-hidden="true">↗</span>
              </a>

              <div className="ManagedServicesFive__trust">
                <span className="ManagedServicesFive__trustIcon">✓</span>
                <span>Reliable support. Real results.</span>
              </div>
            </div>
          </div>

          <div className="ManagedServicesFive__visual">
            <div className="ManagedServicesFive__imageWrap">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85"
                alt="Modern professional workspace"
                className="ManagedServicesFive__image"
              />

              <div className="ManagedServicesFive__imageOverlay" />
            </div>

            <div className="ManagedServicesFive__floatingCard">
              <div className="ManagedServicesFive__status">
                <span className="ManagedServicesFive__statusDot" />
                SERVICES ACTIVE
              </div>

              <div className="ManagedServicesFive__floatingTitle">
                Your operations,
                <br />
                <span>our priority.</span>
              </div>

              <div className="ManagedServicesFive__floatingFooter">
                <span>Efficiency</span>
                <span>Reliability</span>
                <span>Security</span>
              </div>
            </div>

            <div className="ManagedServicesFive__decor ManagedServicesFive__decor--one" />
            <div className="ManagedServicesFive__decor ManagedServicesFive__decor--two" />
          </div>
        </div>

        <div className="ManagedServicesFive__bottom">
          <div className="ManagedServicesFive__sectionHeading">
            <div>
              <span className="ManagedServicesFive__eyebrow">
                WHAT WE DELIVER
              </span>

              <h3 className="ManagedServicesFive__sectionTitle">
                Services built around <span>your success.</span>
              </h3>
            </div>

            <p className="ManagedServicesFive__sectionDescription">
              Flexible, dependable solutions designed to support your
              day-to-day operations and future business goals.
            </p>
          </div>

          <div className="ManagedServicesFive__grid">
            {managedServices.map((service) => (
              <article
                className="ManagedServicesFive__card"
                key={service.id}
              >
                <div className="ManagedServicesFive__cardTop">
                  <div className="ManagedServicesFive__icon">
                    {service.icon}
                  </div>

                  <span className="ManagedServicesFive__number">
                    {service.number}
                  </span>
                </div>

                <h4 className="ManagedServicesFive__cardTitle">
                  {service.title}
                </h4>

                <p className="ManagedServicesFive__cardDescription">
                  {service.description}
                </p>

                <a
                  href="#contact-us"
                  className="ManagedServicesFive__cardLink"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn more <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="ManagedServicesFive__cta">
          <div className="ManagedServicesFive__ctaContent">
            <span className="ManagedServicesFive__ctaEyebrow">
              LET'S MOVE FORWARD
            </span>

            <h3 className="ManagedServicesFive__ctaTitle">
              Ready to simplify your operations?
            </h3>

            <p className="ManagedServicesFive__ctaDescription">
              Let's build a managed services strategy that works for your
              business.
            </p>
          </div>

          <a
            href="#contact-us"
            className="ManagedServicesFive__ctaButton"
          >
            Talk to Our Team <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ManagedServicesFive;