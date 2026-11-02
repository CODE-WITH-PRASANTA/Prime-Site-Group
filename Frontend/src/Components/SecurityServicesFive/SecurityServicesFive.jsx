import React, { useEffect, useRef, useState } from "react";
import {
  Shield,
  Lock,
  UserCheck,
  Eye,
  FileCheck,
  Cpu,
  ArrowUpRight,
  Star,
  Award,
} from "lucide-react";
import "./SecurityServicesFive.css";

const SecurityServicesFive = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const securityServices = [
    {
      id: 1,
      year: "24/7",
      title: "Manned Guarding",
      subtitle: "Professional On-Site Protection",
      description:
        "Highly trained security personnel deployed for corporate campuses, industrial facilities, and residential communities ensuring absolute safety.",
      icon: UserCheck,
      category: "PROTECTION",
    },
    {
      id: 2,
      year: "HD",
      title: "Surveillance & Monitoring",
      subtitle: "Advanced CCTV & Alarm Systems",
      description:
        "State-of-the-art remote monitoring and intelligent video analytics to detect unauthorized access and prevent security incidents in real-time.",
      icon: Eye,
      category: "MONITORING",
    },
    {
      id: 3,
      year: "ISO",
      title: "Access Control Solutions",
      subtitle: "Secure Entry & Exit Management",
      description:
        "Robust biometric, RFID, and gate barrier integrations to restrict unauthorized entry and maintain accurate visitor and staff logs.",
      icon: Lock,
      category: "ACCESS CONTROL",
    },
    {
      id: 4,
      year: "AI",
      title: "Smart Security Integration",
      subtitle: "Next-Gen Tech Automation",
      description:
        "Merging physical security with cutting-edge AI software, automated threat detection, and centralized command center operations.",
      icon: Cpu,
      category: "INNOVATION",
    },
    {
      id: 5,
      year: "AUDIT",
      title: "Risk & Vulnerability Assessment",
      subtitle: "Comprehensive Security Audits",
      description:
        "Detailed evaluations of existing infrastructure to identify potential security gaps and implement proactive mitigation strategies.",
      icon: FileCheck,
      category: "CONSULTING",
    },
    {
      id: 6,
      year: "ELITE",
      title: "VIP & Executive Protection",
      subtitle: "Specialized Close Protection",
      description:
        "Discreet, highly skilled security details providing secure transit, event security, and personalized protection for high-profile individuals.",
      icon: Shield,
      category: "EXECUTIVE",
    },
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
      { threshold: 0.08 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`SecurityServicesFive ${
        isVisible ? "SecurityServicesFive--visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="SecurityServicesFive__container">
        {/* Section heading */}
        <header className="SecurityServicesFive__header">
          <div className="SecurityServicesFive__eyebrow">
            <span className="SecurityServicesFive__eyebrowLine" />
            <span>ADVANCED SECURITY SOLUTIONS</span>
          </div>

          <h2 className="SecurityServicesFive__title">
            Comprehensive Security <span>&</span> Protection Services
          </h2>

          <p className="SecurityServicesFive__intro">
            Delivering industry-leading physical security, cutting-edge surveillance,
            and tailored risk management solutions. Our elite security protocols
            ensure uncompromising safety for your assets, premises, and personnel.
          </p>

          <div className="SecurityServicesFive__summary">
            <div className="SecurityServicesFive__summaryItem">
              <span className="SecurityServicesFive__summaryNumber">06</span>
              <span className="SecurityServicesFive__summaryLabel">
                CORE SERVICES
              </span>
            </div>

            <span className="SecurityServicesFive__summaryDivider" />

            <div className="SecurityServicesFive__summaryItem">
              <span className="SecurityServicesFive__summaryIcon">
                <Shield size={19} />
              </span>
              <span className="SecurityServicesFive__summaryLabel">
                UNCOMPROMISING PROTECTION
              </span>
            </div>
          </div>
        </header>

        {/* Services grid */}
        <div className="SecurityServicesFive__grid">
          {securityServices.map((item, index) => {
            const ServiceIcon = item.icon;
            const isActive = activeService === item.id;

            return (
              <article
                className={`SecurityServicesFive__card ${
                  isActive ? "SecurityServicesFive__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--SecurityServicesFive-delay": `${index * 100}ms`,
                }}
                onMouseEnter={() => setActiveService(item.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="SecurityServicesFive__cardTop">
                  <span className="SecurityServicesFive__category">
                    {item.category}
                  </span>

                  <span className="SecurityServicesFive__year">
                    {item.year}
                  </span>
                </div>

                {/* Decorative service emblem */}
                <div className="SecurityServicesFive__emblem">
                  <div className="SecurityServicesFive__emblemOuter">
                    <div className="SecurityServicesFive__emblemInner">
                      <ServiceIcon
                        className="SecurityServicesFive__awardIcon"
                        strokeWidth={1.35}
                      />
                    </div>
                  </div>

                  <span className="SecurityServicesFive__emblemStar">
                    <Star size={13} fill="currentColor" />
                  </span>
                </div>

                <div className="SecurityServicesFive__cardContent">
                  <span className="SecurityServicesFive__cardKicker">
                    SOLUTION · {item.year}
                  </span>

                  <h3 className="SecurityServicesFive__cardTitle">
                    {item.title}
                  </h3>

                  <p className="SecurityServicesFive__subtitle">
                    {item.subtitle}
                  </p>

                  <p className="SecurityServicesFive__description">
                    {item.description}
                  </p>
                </div>

                <div className="SecurityServicesFive__cardFooter">
                  <span className="SecurityServicesFive__footerLine" />

                  <span className="SecurityServicesFive__footerText">
                    SECURE
                  </span>

                  <span className="SecurityServicesFive__footerArrow">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <span
                  className="SecurityServicesFive__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <footer className="SecurityServicesFive__footer">
          <div className="SecurityServicesFive__footerDecoration">
            <span />
            <span />
            <span />
          </div>

          <p className="SecurityServicesFive__footerStatement">
            Safeguarding assets. Empowering operations. Ensuring absolute peace of mind.
          </p>

          <span className="SecurityServicesFive__footerCaption">
            OUR STANDARD. OUR COMMITMENT.
          </span>
        </footer>
      </div>
    </section>
  );
};

export default SecurityServicesFive;