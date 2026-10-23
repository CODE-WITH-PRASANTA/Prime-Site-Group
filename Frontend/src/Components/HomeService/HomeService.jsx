
import React, { useState } from "react";
import {
  Banknote,
  ShieldCheck,
  Network,
  UserRound,
  UsersRound,
  Hotel,
  Plane,
  Video,
  Settings,
  Building2,
  Package,
  Wrench,
  Store,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  ScanLine,
  Landmark,
  FileCheck2,
} from "lucide-react";
import "./HomeService.css";

const HomeServiceItems = [
  {
    title: "Cash Services",
    icon: Banknote,
    heading: "The market leader in cash management.",
    description:
      "Transguard Cash Services delivers secure, reliable cash management and ATM services with complete end-to-end solutions for banks, financial institutions, major retailers, and corporate customers.",
    features: [
      { label: "Cash Deposit Centre", icon: Store },
      { label: "End-to-End Cash Management", icon: RefreshCw },
      { label: "Cash Management Centre", icon: Landmark },
      { label: "ICCS Cheque Scanning", icon: ScanLine },
    ],
    highlights: [
      "Secure cash collection and transportation",
      "Cash processing and reconciliation",
      "ATM replenishment and management",
      "Tailored financial logistics solutions",
    ],
  },
  {
    title: "Security Services",
    icon: ShieldCheck,
    heading: "Protection you can trust.",
    description:
      "Professional security solutions combining trained personnel, modern technology, and proactive risk management to protect people, property, and business operations.",
    features: [
      { label: "Manned Guarding", icon: ShieldCheck },
      { label: "Mobile Patrols", icon: Network },
      { label: "Event Security", icon: UsersRound },
      { label: "Risk Management", icon: CheckCircle2 },
    ],
    highlights: [
      "Professional security personnel",
      "Corporate and retail security",
      "Access control and monitoring",
      "Risk assessment and prevention",
    ],
  },
  {
    title: "Facilities Management",
    icon: Network,
    heading: "Better spaces. Better performance.",
    description:
      "Integrated facilities management that keeps workplaces, commercial buildings, and critical environments operating efficiently, safely, and sustainably.",
    features: [
      { label: "Building Maintenance", icon: Building2 },
      { label: "Technical Services", icon: Wrench },
      { label: "Cleaning Solutions", icon: Settings },
      { label: "Asset Management", icon: Landmark },
    ],
    highlights: [
      "Hard and soft facilities management",
      "Preventive and corrective maintenance",
      "Building operations support",
      "Quality and efficiency management",
    ],
  },
  {
    title: "Manpower Solutions",
    icon: UserRound,
    heading: "The right talent for every business.",
    description:
      "Flexible workforce and recruitment solutions connecting businesses with capable professionals, skilled teams, and dependable operational support.",
    features: [
      { label: "Staff Recruitment", icon: UserRound },
      { label: "Workforce Planning", icon: UsersRound },
      { label: "Payroll Support", icon: FileCheck2 },
      { label: "Staff Deployment", icon: Network },
    ],
    highlights: [
      "Permanent and temporary staffing",
      "Workforce deployment",
      "Recruitment and onboarding",
      "Scalable staffing solutions",
    ],
  },
  {
    title: "Workforce Solutions",
    icon: UsersRound,
    heading: "People power business success.",
    description:
      "Comprehensive workforce services designed to simplify staffing, improve productivity, and help businesses respond to changing operational demands.",
    features: [
      { label: "Workforce Planning", icon: UsersRound },
      { label: "Staffing Support", icon: UserRound },
      { label: "Operations Support", icon: Settings },
      { label: "Team Deployment", icon: Network },
    ],
    highlights: [
      "Flexible workforce planning",
      "Operational staffing",
      "Staff coordination",
      "Productivity-focused solutions",
    ],
  },
  {
    title: "Hospitality Solutions",
    icon: Hotel,
    heading: "Creating exceptional experiences.",
    description:
      "Hospitality professionals and guest-focused support services that help hotels, businesses, and premium destinations deliver memorable experiences.",
    features: [
      { label: "Guest Services", icon: UserRound },
      { label: "Hospitality Staffing", icon: UsersRound },
      { label: "Guest Experience", icon: Hotel },
      { label: "Event Support", icon: CheckCircle2 },
    ],
    highlights: [
      "Hospitality staffing",
      "Guest relations and support",
      "Event and venue assistance",
      "Service quality management",
    ],
  },
  {
    title: "Aviation Services",
    icon: Plane,
    heading: "Excellence at every touchpoint.",
    description:
      "Reliable aviation support services that help airlines and airport partners maintain smooth operations, excellent service standards, and efficient ground handling.",
    features: [
      { label: "Aircraft Cleaning", icon: Plane },
      { label: "Airport Support", icon: Network },
      { label: "Ground Operations", icon: Settings },
      { label: "Passenger Services", icon: UsersRound },
    ],
    highlights: [
      "Aircraft cleaning and presentation",
      "Airport operational support",
      "Ground handling assistance",
      "Passenger service solutions",
    ],
  },
  {
    title: "Systems Integration",
    icon: Video,
    heading: "Technology that works together.",
    description:
      "Integrated technology solutions connecting security, communication, and operational systems to create smarter, more connected business environments.",
    features: [
      { label: "CCTV Systems", icon: Video },
      { label: "Access Control", icon: ShieldCheck },
      { label: "Smart Integration", icon: Network },
      { label: "Technical Support", icon: Wrench },
    ],
    highlights: [
      "Integrated security systems",
      "Access control technologies",
      "Monitoring and communication",
      "System maintenance and support",
    ],
  },
  {
    title: "Managed Services",
    icon: Settings,
    heading: "Simplifying your daily operations.",
    description:
      "Dependable managed services that streamline business processes, reduce operational complexity, and allow teams to focus on their core objectives.",
    features: [
      { label: "Business Support", icon: Building2 },
      { label: "Operations", icon: Settings },
      { label: "Service Delivery", icon: CheckCircle2 },
      { label: "Process Improvement", icon: Network },
    ],
    highlights: [
      "Day-to-day operational support",
      "Service performance management",
      "Process optimization",
      "Flexible delivery models",
    ],
  },
  {
    title: "Transguard Living",
    icon: Building2,
    heading: "Comfort, care, and community.",
    description:
      "Living and accommodation solutions designed to support residents with comfortable environments, dependable facilities, and well-managed community spaces.",
    features: [
      { label: "Accommodation", icon: Building2 },
      { label: "Resident Support", icon: UsersRound },
      { label: "Facility Care", icon: Settings },
      { label: "Community Services", icon: Hotel },
    ],
    highlights: [
      "Managed accommodation",
      "Resident-focused support",
      "Facilities and upkeep",
      "Community operations",
    ],
  },
  {
    title: "Transguard Delivery",
    icon: Package,
    heading: "Every delivery. Every detail.",
    description:
      "Flexible delivery and logistics support designed to help businesses move goods efficiently while maintaining reliable service and customer satisfaction.",
    features: [
      { label: "Last-Mile Delivery", icon: Package },
      { label: "Logistics Support", icon: Network },
      { label: "Order Fulfilment", icon: CheckCircle2 },
      { label: "Business Delivery", icon: Store },
    ],
    highlights: [
      "Last-mile delivery services",
      "Business logistics support",
      "Order handling and fulfilment",
      "Reliable delivery operations",
    ],
  },
  {
    title: "Kitchen Maintenance",
    icon: Wrench,
    heading: "Keeping essential equipment performing.",
    description:
      "Professional maintenance and technical support for commercial kitchen environments, helping businesses maintain dependable equipment and smooth daily operations.",
    features: [
      { label: "Equipment Repairs", icon: Wrench },
      { label: "Preventive Care", icon: Settings },
      { label: "Technical Inspection", icon: CheckCircle2 },
      { label: "Kitchen Support", icon: Hotel },
    ],
    highlights: [
      "Commercial kitchen maintenance",
      "Preventive service schedules",
      "Equipment inspection and repair",
      "Operational reliability",
    ],
  },
];

const HomeService = () => {
  const [activeService, setActiveService] = useState(0);
  const service = HomeServiceItems[activeService];

  const headingParts = service.title.split(" ");
  const headingAccent = headingParts.pop();

  return (
    <section className="HomeService">
      <div className="HomeService__container">
        <div className="HomeService__grid">
          <div className="HomeService__gridHeader">
            <span className="HomeService__sectionEyebrow">
              OUR EXPERTISE
            </span>
            <span className="HomeService__gridCount">
              12 SERVICES
            </span>
          </div>

          <div className="HomeService__gridItems">
            {HomeServiceItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeService === index;

              return (
                <button
                  type="button"
                  key={item.title}
                  className={`HomeService__card ${
                    isActive ? "is-active" : ""
                  }`}
                  onClick={() => setActiveService(index)}
                  aria-pressed={isActive}
                >
                  <span className="HomeService__cardIcon">
                    <Icon strokeWidth={1.5} />
                  </span>

                  <span className="HomeService__cardTitle">
                    {item.title}
                  </span>

                  <span className="HomeService__cardUnderline" />

                  <ArrowUpRight
                    className="HomeService__cardArrow"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div className="HomeService__gridFooter">
            <span className="HomeService__gridFooterDot" />
            <span>
              Integrated solutions. Exceptional standards.
            </span>
          </div>
        </div>

        <div className="HomeService__details" key={service.title}>
          <div className="HomeService__detailsTop">
            <span className="HomeService__detailsLine" />
            <span className="HomeService__detailsEyebrow">
              OUR SERVICES
            </span>
            <span className="HomeService__detailsNumber">
              {String(activeService + 1).padStart(2, "0")} / 12
            </span>
          </div>

          <h2 className="HomeService__heading">
            {headingParts.length > 0 && (
              <>{headingParts.join(" ")} </>
            )}
            <span>{headingAccent}</span>
          </h2>

          <h3 className="HomeService__subheading">
            {service.heading}
          </h3>

          <p className="HomeService__description">
            {service.description}
          </p>

          <div className="HomeService__features">
            {service.features.map((feature) => {
              const FeatureIcon = feature.icon;

              return (
                <div
                  className="HomeService__feature"
                  key={feature.label}
                >
                  <div className="HomeService__featureIcon">
                    <FeatureIcon strokeWidth={1.5} />
                  </div>

                  <span className="HomeService__featureLabel">
                    {feature.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="HomeService__highlights">
            <span className="HomeService__highlightsTitle">
              WHAT WE DELIVER
            </span>

            <div className="HomeService__highlightsList">
              {service.highlights.map((highlight) => (
                <div
                  className="HomeService__highlight"
                  key={highlight}
                >
                  <CheckCircle2 aria-hidden="true" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            className="HomeService__readMore"
            href={`/services/${service.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "")}`}
          >
            <span>Explore Service</span>
            <span className="HomeService__readMoreIcon">
              <ArrowRight aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeService;
