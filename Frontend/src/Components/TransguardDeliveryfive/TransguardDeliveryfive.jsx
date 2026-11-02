import React, { useEffect, useRef, useState } from "react";
import {
  Truck,
  PackageCheck,
  ShieldCheck,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
} from "lucide-react";
import "./TransguardDeliveryfive.css";

const TransguardDeliveryfive = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 1,
      year: "24/7",
      title: "Reliable Delivery",
      subtitle: "Dependable Transportation",
      description:
        "Professional delivery services designed to move packages and goods safely, efficiently, and on schedule.",
      icon: Truck,
      category: "DELIVERY",
    },
    {
      id: 2,
      year: "SAFE",
      title: "Secure Cargo Handling",
      subtitle: "Protection at Every Stage",
      description:
        "Careful handling and secure transportation procedures help protect shipments throughout the delivery process.",
      icon: PackageCheck,
      category: "CARGO SECURITY",
    },
    {
      id: 3,
      year: "PRO",
      title: "Logistics Management",
      subtitle: "Organized Delivery Operations",
      description:
        "Coordinated logistics planning and efficient route management support smooth and dependable delivery operations.",
      icon: ShieldCheck,
      category: "LOGISTICS",
    },
    {
      id: 4,
      year: "LIVE",
      title: "Shipment Tracking",
      subtitle: "Visibility and Control",
      description:
        "Shipment updates and coordinated communication help customers stay informed about delivery progress.",
      icon: MapPin,
      category: "TRACKING",
    },
    {
      id: 5,
      year: "FAST",
      title: "Express Delivery",
      subtitle: "Timely and Efficient Service",
      description:
        "Flexible scheduling and streamlined delivery arrangements help address urgent transportation requirements.",
      icon: Clock,
      category: "EXPRESS SERVICE",
    },
    {
      id: 6,
      year: "CARE",
      title: "Customer Support",
      subtitle: "Assistance You Can Trust",
      description:
        "Responsive customer support helps resolve delivery queries and provides a smoother service experience.",
      icon: Star,
      category: "CUSTOMER CARE",
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
      className={`TransguardDeliveryfive ${
        isVisible ? "TransguardDeliveryfive--visible" : ""
      }`}
    >
      <div className="TransguardDeliveryfive__container">
        <header className="TransguardDeliveryfive__header">
          <div className="TransguardDeliveryfive__eyebrow">
            <span className="TransguardDeliveryfive__eyebrowLine" />
            <span>PROFESSIONAL DELIVERY SOLUTIONS</span>
          </div>

          <h2 className="TransguardDeliveryfive__title">
            Reliable Delivery <span>&amp;</span> Logistics Services
          </h2>

          <p className="TransguardDeliveryfive__intro">
            Discover dependable delivery, secure cargo handling, and
            professional logistics solutions designed to keep every shipment
            moving safely and efficiently.
          </p>

          <div className="TransguardDeliveryfive__summary">
            <div className="TransguardDeliveryfive__summaryItem">
              <span className="TransguardDeliveryfive__summaryNumber">
                06
              </span>
              <span className="TransguardDeliveryfive__summaryLabel">
                CORE SERVICES
              </span>
            </div>

            <span className="TransguardDeliveryfive__summaryDivider" />

            <div className="TransguardDeliveryfive__summaryItem">
              <span className="TransguardDeliveryfive__summaryIcon">
                <ShieldCheck size={19} strokeWidth={1.5} />
              </span>
              <span className="TransguardDeliveryfive__summaryLabel">
                SAFETY &amp; RELIABILITY
              </span>
            </div>
          </div>
        </header>

        <div className="TransguardDeliveryfive__grid">
          {services.map((item, index) => {
            const ServiceIcon = item.icon;
            const isActive = activeService === item.id;

            return (
              <article
                key={item.id}
                className={`TransguardDeliveryfive__card ${
                  isActive
                    ? "TransguardDeliveryfive__card--active"
                    : ""
                }`}
                style={{
                  "--TransguardDeliveryfive-delay": `${index * 100}ms`,
                }}
                onMouseEnter={() => setActiveService(item.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="TransguardDeliveryfive__cardTop">
                  <span className="TransguardDeliveryfive__category">
                    {item.category}
                  </span>

                  <span className="TransguardDeliveryfive__year">
                    {item.year}
                  </span>
                </div>

                <div className="TransguardDeliveryfive__emblem">
                  <div className="TransguardDeliveryfive__emblemOuter">
                    <div className="TransguardDeliveryfive__emblemInner">
                      <ServiceIcon
                        className="TransguardDeliveryfive__awardIcon"
                        strokeWidth={1.35}
                      />
                    </div>
                  </div>

                  <span className="TransguardDeliveryfive__emblemStar">
                    <Star size={13} fill="currentColor" />
                  </span>
                </div>

                <div className="TransguardDeliveryfive__cardContent">
                  <span className="TransguardDeliveryfive__cardKicker">
                    SERVICE · {item.year}
                  </span>

                  <h3 className="TransguardDeliveryfive__cardTitle">
                    {item.title}
                  </h3>

                  <p className="TransguardDeliveryfive__subtitle">
                    {item.subtitle}
                  </p>

                  <p className="TransguardDeliveryfive__description">
                    {item.description}
                  </p>
                </div>

                <div className="TransguardDeliveryfive__cardFooter">
                  <span className="TransguardDeliveryfive__footerLine" />

                  <span className="TransguardDeliveryfive__footerText">
                    QUALITY SERVICE
                  </span>

                  <span className="TransguardDeliveryfive__footerArrow">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <span
                  className="TransguardDeliveryfive__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        <footer className="TransguardDeliveryfive__footer">
          <div className="TransguardDeliveryfive__footerDecoration">
            <span />
            <span />
            <span />
          </div>

          <p className="TransguardDeliveryfive__footerStatement">
            Every shipment deserves care. Every delivery deserves excellence.
          </p>

          <span className="TransguardDeliveryfive__footerCaption">
            OUR STANDARD. OUR COMMITMENT.
          </span>
        </footer>
      </div>
    </section>
  );
};

export default TransguardDeliveryfive;