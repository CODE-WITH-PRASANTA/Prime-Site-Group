import React, { useEffect, useRef, useState } from "react";
import "./CareerThree.css";
import primeCareerImage from "../../assets/primecarer.png";

const benefits = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a4 4 0 0 1 8 0v2M3 12h18" />
      </svg>
    ),
    title: "Health & Wellness",
    description: "Medical & insurance support",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <ellipse cx="8" cy="5" rx="5" ry="2" />
        <path d="M3 5v12c0 1.1 2.2 2 5 2s5-.9 5-2V5M3 9c0 1.1 2.2 2 5 2s5-.9 5-2M3 13c0 1.1 2.2 2 5 2s5-.9 5-2" />
        <ellipse cx="17" cy="4" rx="4" ry="2" />
        <path d="M13 4v12c0 1.1 1.8 2 4 2s4-.9 4-2V4M13 8c0 1.1 1.8 2 4 2s4-.9 4-2M13 12c0 1.1 1.8 2 4 2s4-.9 4-2" />
      </svg>
    ),
    title: "Attractive Pay",
    description: "Competitive salary & rewards",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 20h18M5 16l5-5 4 3 7-9" />
        <path d="M15 5h6v6" />
        <path d="M5 20v-3M10 20v-5M15 20v-7M20 20v-9" />
      </svg>
    ),
    title: "Career Growth",
    description: "Learning & advancement",
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="9" cy="7" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2" />
        <path d="M17 8h.01" />
      </svg>
    ),
    title: "Work–Life Balance",
    description: "Supportive work culture",
  },
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Job Stability",
    description: "Be part of a trusted brand",
  },
];

const reasons = [
  "Be part of a trusted and growing organization",
  "Work on diverse and impactful service projects",
  "Learn from experienced industry professionals",
  "Build a long-term and rewarding career",
];

const CareerThree = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      // small threshold + bottom margin so it also reveals on short phone screens
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`CareerThree ${isVisible ? "CareerThree--visible" : ""}`}
      aria-label="Careers at Prime Site"
    >
      <div className="CareerThree__container">
        {/* Top section */}
        <div className="CareerThree__top">
          {/* Office image */}
          <div className="CareerThree__imageColumn">
            <div className="CareerThree__imageFrame">
              <img
                src={primeCareerImage}
                alt="Prime Site corporate office building"
                className="CareerThree__image"
                loading="lazy"
                decoding="async"
              />

              <div className="CareerThree__imageOverlay" />

              <div className="CareerThree__imageBadge">
                <span className="CareerThree__badgeDot" />
                <div>
                  <strong>Prime Site</strong>
                  <span>People. Purpose. Progress.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Why work with us */}
          <div className="CareerThree__content">
            <div className="CareerThree__eyebrow">
              <span className="CareerThree__eyebrowLine" />
              <span>Why Work With Us</span>
            </div>

            <h2 className="CareerThree__heading">
              A Workplace That
              <br />
              <span>Values You</span>
            </h2>

            <p className="CareerThree__description">
              At Prime Site, our people are the foundation of everything we
              do. We deliver dependable manpower, security services, cash
              solutions, and integrated facility management. Join a team
              where your contribution matters and your professional growth
              is encouraged.
            </p>

            <ul className="CareerThree__reasons">
              {reasons.map((reason, index) => (
                <li
                  className="CareerThree__reason"
                  key={reason}
                  style={{ "--reason-index": index }}
                >
                  <span className="CareerThree__check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="m6 12 4 4 8-8" />
                    </svg>
                  </span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>

            <a href="/contact" className="CareerThree__contactLink">
              Grow With Prime Site
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            <div className="CareerThree__watermark" aria-hidden="true">
              CAREERS
            </div>
          </div>
        </div>

        {/* Employee benefits */}
        <div className="CareerThree__benefits">
          <div className="CareerThree__benefitsHeader">
            <div className="CareerThree__eyebrow CareerThree__eyebrow--center">
              <span className="CareerThree__eyebrowLine" />
              <span>Employee Benefits</span>
              <span className="CareerThree__eyebrowLine" />
            </div>

            <h3 className="CareerThree__benefitsTitle">
              More Than Just a <span>Job</span>
            </h3>

            <p className="CareerThree__benefitsSubtitle">
              Build your future with a team that values your potential.
            </p>
          </div>

          <div className="CareerThree__benefitsGrid">
            {benefits.map((benefit, index) => (
              <article
                className="CareerThree__benefitCard"
                key={benefit.id}
                style={{ "--benefit-index": index }}
              >
                <div className="CareerThree__benefitIcon">
                  {benefit.icon}
                </div>

                <h4 className="CareerThree__benefitTitle">
                  {benefit.title}
                </h4>

                <p className="CareerThree__benefitDescription">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>

          <div className="CareerThree__bottomNote">
            <span className="CareerThree__bottomDot" />
            <p>
              Your skills. Your ambitions. Your future with Prime Site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerThree;