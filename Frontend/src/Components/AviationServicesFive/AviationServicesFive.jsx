import React, { useEffect, useRef, useState } from "react";
import {
  Plane,
  ShieldCheck,
  Users,
  BriefcaseBusiness,
  Headset,
  ClipboardCheck,
  ArrowUpRight,
  Star,
} from "lucide-react";
import "./AviationServicesFive.css";

const aviationServices = [
  {
    id: "01",
    category: "Airport Operations",
    year: "01",
    icon: Plane,
    kicker: "SEAMLESS OPERATIONS",
    title: "Airport Ground Handling",
    subtitle: "Reliable support on the ground.",
    description:
      "Efficient ground handling services that support smooth airport operations, aircraft turnaround, and dependable day-to-day coordination.",
    footer: "Ground Operations",
  },
  {
    id: "02",
    category: "Aviation Security",
    year: "02",
    icon: ShieldCheck,
    kicker: "SAFETY FIRST",
    title: "Aviation Security",
    subtitle: "Protection at every checkpoint.",
    description:
      "Professional security support designed to strengthen airport safety, maintain access control, and help protect passengers, staff, and facilities.",
    footer: "Security Solutions",
  },
  {
    id: "03",
    category: "Passenger Services",
    year: "03",
    icon: Users,
    kicker: "PASSENGER EXPERIENCE",
    title: "Passenger Assistance",
    subtitle: "A better journey from arrival to departure.",
    description:
      "Friendly passenger assistance for check-in guidance, terminal navigation, boarding coordination, and a more comfortable airport experience.",
    footer: "Passenger Support",
  },
  {
    id: "04",
    category: "Airport Staffing",
    year: "04",
    icon: BriefcaseBusiness,
    kicker: "SKILLED PROFESSIONALS",
    title: "Aviation Workforce",
    subtitle: "The right people for every operation.",
    description:
      "Flexible workforce solutions for aviation environments, helping teams maintain service standards and respond to changing operational needs.",
    footer: "Workforce Solutions",
  },
  {
    id: "05",
    category: "Customer Support",
    year: "05",
    icon: Headset,
    kicker: "SERVICE EXCELLENCE",
    title: "Airport Customer Care",
    subtitle: "Helpful service at every touchpoint.",
    description:
      "Customer-focused assistance that helps passengers find information, resolve service concerns, and navigate airport facilities with confidence.",
    footer: "Customer Experience",
  },
  {
    id: "06",
    category: "Quality Management",
    year: "06",
    icon: ClipboardCheck,
    kicker: "OPERATIONAL STANDARDS",
    title: "Aviation Quality Support",
    subtitle: "Consistency through careful coordination.",
    description:
      "Structured operational checks, service monitoring, and coordination support to help aviation teams maintain reliable service delivery.",
    footer: "Quality & Coordination",
  },
];

const AviationServicesFive = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

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
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`aviation-services-five ${
        isVisible ? "aviation-services-five-visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="aviation-services-five-inner">
        <div className="aviation-services-five-header">
          <div className="aviation-services-five-heading">
            <span className="aviation-services-five-eyebrow">
              <span className="aviation-services-five-eyebrow-line" />
              AVIATION SERVICES
            </span>

            <h2>
              Supporting Every
              <span> Step of Your Flight.</span>
            </h2>

            <p className="aviation-services-five-intro">
              From airport operations and security to passenger assistance and
              workforce coordination, our aviation services are designed to
              support safe, smooth, and dependable airport experiences.
            </p>
          </div>

          <div className="aviation-services-five-summary">
            <div className="aviation-services-five-summary-top">
              <span className="aviation-services-five-summary-number">
                06
              </span>

              <div className="aviation-services-five-summary-icon">
                <ShieldCheck size={25} strokeWidth={1.6} />
              </div>
            </div>

            <span className="aviation-services-five-summary-label">
              AVIATION SERVICE AREAS
            </span>

            <p>Reliable support for modern aviation environments.</p>
          </div>
        </div>

        <div className="aviation-services-five-grid">
          {aviationServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                className={`aviation-services-five-card ${
                  activeCard === service.id
                    ? "aviation-services-five-card-active"
                    : ""
                }`}
                style={{ "--aviation-card-index": index }}
                onMouseEnter={() => setActiveCard(service.id)}
                onMouseLeave={() => setActiveCard(null)}
                onFocus={() => setActiveCard(service.id)}
                onBlur={() => setActiveCard(null)}
              >
                <div className="aviation-services-five-card-top">
                  <span className="aviation-services-five-category">
                    {service.category}
                  </span>
                  <span className="aviation-services-five-card-number">
                    {service.year}
                  </span>
                </div>

                <div className="aviation-services-five-emblem">
                  <div className="aviation-services-five-emblem-icon">
                    <Icon size={29} strokeWidth={1.6} />
                  </div>

                  <Star
                    className="aviation-services-five-emblem-star"
                    size={15}
                    fill="currentColor"
                  />
                </div>

                <div className="aviation-services-five-card-content">
                  <span className="aviation-services-five-kicker">
                    {service.kicker}
                  </span>

                  <h3>{service.title}</h3>

                  <h4>{service.subtitle}</h4>

                  <p>{service.description}</p>
                </div>

                <div className="aviation-services-five-card-footer">
                  <span>{service.footer}</span>

                  <span className="aviation-services-five-arrow">
                    <ArrowUpRight size={19} strokeWidth={1.8} />
                  </span>
                </div>

                <span className="aviation-services-five-accent" />
              </article>
            );
          })}
        </div>

        <div className="aviation-services-five-bottom">
          <div className="aviation-services-five-bottom-mark">
            <span />
            <span />
            <span />
          </div>

          <div className="aviation-services-five-bottom-copy">
            <h3>Built Around Safety. Driven by Service.</h3>
            <p>
              Professional support that helps aviation operations move forward
              with confidence.
            </p>
          </div>

          <span className="aviation-services-five-bottom-caption">
            AVIATION • OPERATIONS • EXCELLENCE
          </span>
        </div>
      </div>
    </section>
  );
};

export default AviationServicesFive;