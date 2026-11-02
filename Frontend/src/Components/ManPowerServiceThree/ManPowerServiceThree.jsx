import React, { useState, useEffect, useRef } from "react";
import "./ManPowerServiceThree.css";

const manpowerPillars = [
  {
    id: 1,
    title: "Vetted Talent Acquisition & Screening",
    desc: "Multi-tier qualification checks, rigorous background verification, and industry-tailored trade assessments to guarantee project-ready personnel.",
  },
  {
    id: 2,
    title: "Rapid Deployment & Scalable Crewing",
    desc: "Agile mobilization networks delivering specialized industrial crews, facility operators, and technical staff matched exactly to operational volumes.",
  },
  {
    id: 3,
    title: "Statutory Compliance & On-Site Welfare",
    desc: "Complete labor regulation adherence, OSHA/HSE-certified safety protocols, and dedicated on-ground supervisors ensuring flawless operational uptime.",
  },
];

const ManPowerServiceThree = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`ManPowerServiceThree ${
        isVisible ? "ManPowerServiceThree--visible" : ""
      }`}
      aria-label="Prime Site Workforce Mobilization and Manpower Management Strategy"
    >
      <div className="ManPowerServiceThree__container">
        {/* Left Side: Staggered Content */}
        <div className="ManPowerServiceThree__content">
          <div className="ManPowerServiceThree__eyebrowWrap">
            <span className="ManPowerServiceThree__eyebrowLine" />
            <span className="ManPowerServiceThree__eyebrow">OUR STRATEGY</span>
          </div>

          <h2 className="ManPowerServiceThree__title">
            Our <span className="ManPowerServiceThree__titleAccent">Approach</span>
          </h2>

          <p className="ManPowerServiceThree__description">
            At <strong>Prime Site</strong>, our manpower management framework combines 
            data-driven recruitment with structured operational oversight. We source, 
            train, and deploy high-performing skilled, semi-skilled, and technical teams 
            tailored to construction sites, logistics hubs, and commercial operations, ensuring 
            full regulatory compliance and peak productivity.
          </p>

          {/* Operational Pillars */}
          <div className="ManPowerServiceThree__pillars">
            {manpowerPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="ManPowerServiceThree__pillarItem"
              >
                <div className="ManPowerServiceThree__pillarIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ManPowerServiceThree__pillarText">
                  <h4 className="ManPowerServiceThree__pillarTitle">
                    {pillar.title}
                  </h4>
                  <p className="ManPowerServiceThree__pillarDesc">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="ManPowerServiceThree__actionWrap">
            <a
              href="#manpower-consultation"
              className="ManPowerServiceThree__linkPrimary"
            >
              <span>Consult Prime Site Workforce Team</span>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Angled Workforce Media Visual */}
        <div className="ManPowerServiceThree__media">
          <div className="ManPowerServiceThree__imageClip">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=85"
              alt="Prime Site skilled industrial workforce and project management team on site"
              className="ManPowerServiceThree__image"
              loading="lazy"
            />
            <div className="ManPowerServiceThree__imageShade" />
          </div>

          {/* Floating Operational Badge */}
          <div className="ManPowerServiceThree__badge">
            <span className="ManPowerServiceThree__badgeDot" />
            <div className="ManPowerServiceThree__badgeInfo">
              <strong>Prime Site Workforce Network</strong>
              <span>100% Certified Personnel & Rapid Site Mobilization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManPowerServiceThree;