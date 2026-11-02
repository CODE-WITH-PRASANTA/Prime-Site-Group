import React, { useState, useEffect, useRef } from "react";
import "./ManagedServicesThree.css";

const managedServicePoints = [
  {
    id: 1,
    title: "IT Infrastructure Management",
    detail:
      "Proactive monitoring and maintenance of IT infrastructure to support stable, secure, and reliable business operations.",
  },
  {
    id: 2,
    title: "24/7 Technical Support",
    detail:
      "Dedicated technical support teams help identify issues, resolve disruptions, and maintain business continuity.",
  },
  {
    id: 3,
    title: "Cloud & Network Management",
    detail:
      "Reliable management of cloud environments, network resources, and system performance to support business growth.",
  },
  {
    id: 4,
    title: "Security & Performance Monitoring",
    detail:
      "Continuous system monitoring, routine updates, and security management help protect business infrastructure.",
  },
];

const ManagedServicesThree = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`ManagedServicesThree ${
        isVisible ? "ManagedServicesThree--visible" : ""
      }`}
      aria-label="Managed services and technology infrastructure"
    >
      <div className="ManagedServicesThree__container">
        {/* Left Side: Managed Technology Services Image */}

        <div className="ManagedServicesThree__media">
          <div className="ManagedServicesThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85"
              alt="Modern business workspace representing managed business services"
              className="ManagedServicesThree__image"
              loading="lazy"
            />

            <div className="ManagedServicesThree__imageShade" />
          </div>

          {/* Floating Managed Services Badge */}

          <div className="ManagedServicesThree__badge">
            <span className="ManagedServicesThree__badgeDot" />

            <div className="ManagedServicesThree__badgeInfo">
              <strong>Managed Services</strong>
              <span>Reliable · Secure · Efficient</span>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Content */}

        <div className="ManagedServicesThree__content">
          <div className="ManagedServicesThree__eyebrowWrap">
            <span className="ManagedServicesThree__eyebrowLine" />

            <span className="ManagedServicesThree__eyebrow">
              MANAGED SOLUTIONS
            </span>
          </div>

          <h2 className="ManagedServicesThree__title">
            Simplifying Operations,
            <br />
            <span className="ManagedServicesThree__titleAccent">
              Empowering Growth
            </span>
          </h2>

          <p className="ManagedServicesThree__description">
            We provide comprehensive managed services that help businesses
            operate more efficiently, reduce technical complexity, and
            maintain reliable systems. From IT infrastructure and cloud
            management to technical support and security monitoring, our
            solutions allow your team to focus on core business priorities
            while we help keep essential operations running smoothly.
          </p>

          {/* Managed Services Checklist */}

          <div className="ManagedServicesThree__list">
            {managedServicePoints.map((point) => (
              <div
                key={point.id}
                className="ManagedServicesThree__item"
                style={{ "--item-index": point.id }}
              >
                <span className="ManagedServicesThree__checkIcon">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>

                <div className="ManagedServicesThree__itemText">
                  <h4 className="ManagedServicesThree__itemTitle">
                    {point.title}
                  </h4>

                  <p className="ManagedServicesThree__itemDetail">
                    {point.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Primary Action Button */}

          <div className="ManagedServicesThree__actionWrap">
            <a
              href="#managed-services-details"
              className="ManagedServicesThree__linkPrimary"
            >
              <span>Explore Our Managed Services</span>

              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagedServicesThree;