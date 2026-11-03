import React, { useState, useEffect, useCallback } from "react";
import "./ManagedServicesTwo.css";

const SLIDE_DURATION = 2000; // 2-second synchronized rotation

const managedServicesData = [
  {
    id: 1,
    tag: "MANAGED SERVICES",
    titlePrimary: "Enterprise Cloud &",
    titleAccent: "Infrastructure Ops",
    description:
      "Delivering proactive multi-cloud architecture management, automated Kubernetes orchestration, and round-the-clock server provisioning across AWS, Azure, and private datacenter estates.",
    badgeTitle: "CLOUD INFRASTRUCTURE",
    badgeSub: "99.99% Uptime SLA Guarantee",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Multi-Cloud Orchestration & Migration",
      "Automated Disaster Recovery & Backups",
      "Continuous Cost & Resource Optimization",
    ],
  },
  {
    id: 2,
    tag: "MANAGED SERVICES",
    titlePrimary: "24/7 Managed SOC &",
    titleAccent: "Cyber Resilience",
    description:
      "Protecting corporate assets through AI-driven threat hunting, zero-trust endpoint defenses, continuous vulnerability assessments, and rapid incident containment protocols.",
    badgeTitle: "MANAGED SOC & SEC",
    badgeSub: "Proactive Zero-Day Defense",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2200&q=85",
    features: [
      "24/7/365 SIEM & EDR Threat Monitoring",
      "Automated Incident Containment & Forensics",
      "ISO 27001 & Compliance Audit Readiness",
    ],
  },
  {
    id: 3,
    tag: "MANAGED SERVICES",
    titlePrimary: "Global IT Service Desk &",
    titleAccent: "End-User Support",
    description:
      "Empowering distributed enterprise workforces with Tier 1–3 omnichannel IT support, automated MDM provisioning, software deployment, and ITIL-aligned issue resolution.",
    badgeTitle: "ENTERPRISE DESK",
    badgeSub: "Multi-Tier ITIL Service Desk",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Omnichannel Helpdesk & Rapid First-Contact Resolution",
      "Zero-Touch Remote Device Lifecycle Management",
      "Identity Access Management (IAM) Governance",
    ],
  },
  {
    id: 4,
    tag: "MANAGED SERVICES",
    titlePrimary: "DevOps Engineering &",
    titleAccent: "Continuous Delivery",
    description:
      "Accelerating software lifecycles through robust CI/CD pipeline automation, Infrastructure as Code (IaC), microservices scaling, and comprehensive APM observability pipelines.",
    badgeTitle: "DEVOPS & SRE",
    badgeSub: "Autonomous CI/CD & Observability",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85",
    features: [
      "Infrastructure as Code (Terraform / Ansible)",
      "Automated CI/CD Deployment Pipelines",
      "Full-Stack Observability & APM Telemetry",
    ],
  },
];

const ManagedServicesTwo = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = managedServicesData.length;
  const currentSlide = managedServicesData[activeSlide];

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay rotation
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <section
      className="ManagedServicesTwo"
      aria-label="Managed Services Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="ManagedServicesTwo__container">
        {/* Left Side: Angled Image Visual with Slider */}
        <div className="ManagedServicesTwo__media">
          <div className="ManagedServicesTwo__imageClip">
            {managedServicesData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={`${item.titlePrimary} ${item.titleAccent}`}
                className={`ManagedServicesTwo__image ${
                  index === activeSlide
                    ? "ManagedServicesTwo__image--active"
                    : ""
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="ManagedServicesTwo__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="ManagedServicesTwo__badge"
          >
            <span className="ManagedServicesTwo__badgeDot" />
            <div className="ManagedServicesTwo__badgeText">
              <strong>{currentSlide.badgeTitle}</strong>
              <span>{currentSlide.badgeSub}</span>
            </div>
          </div>

          {/* Bottom Left Navigation Buttons */}
          <div className="ManagedServicesTwo__nav">
            <button
              type="button"
              className="ManagedServicesTwo__navBtn ManagedServicesTwo__navBtn--prev"
              onClick={handlePrev}
              aria-label="Previous managed service"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M19 12H5m7 7-7-7 7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="ManagedServicesTwo__navBtn ManagedServicesTwo__navBtn--next"
              onClick={handleNext}
              aria-label="Next managed service"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M5 12h14m-7-7 7 7-7 7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side: Staggered Content */}
        <div
          key={`content-${activeSlide}`}
          className="ManagedServicesTwo__content"
        >
          <div className="ManagedServicesTwo__eyebrowWrap">
            <span className="ManagedServicesTwo__eyebrowLine" />
            <span className="ManagedServicesTwo__eyebrow">
              {currentSlide.tag}
            </span>
          </div>

          <h2 className="ManagedServicesTwo__title">
            <span className="ManagedServicesTwo__titlePrimary">
              {currentSlide.titlePrimary}{" "}
            </span>
            <span className="ManagedServicesTwo__titleAccent">
              {currentSlide.titleAccent}
            </span>
          </h2>

          <p className="ManagedServicesTwo__description">
            {currentSlide.description}
          </p>

          {/* Dynamic Feature Highlights */}
          <div className="ManagedServicesTwo__features">
            {currentSlide.features.map((feature, idx) => (
              <div key={idx} className="ManagedServicesTwo__featureItem">
                <span className="ManagedServicesTwo__featureDot" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA & Synchronized Progress Bar */}
          <div className="ManagedServicesTwo__actionRow">
            <a
              href="#managed-services-enquiry"
              className="ManagedServicesTwo__btnPrimary"
            >
              <span>Consult an MSP Architect</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <div className="ManagedServicesTwo__progressTrack">
              <div
                key={`progress-${activeSlide}-${isPaused}`}
                className={`ManagedServicesTwo__progressBar ${
                  isPaused ? "is-paused" : ""
                }`}
                style={{ animationDuration: `${SLIDE_DURATION}ms` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagedServicesTwo;