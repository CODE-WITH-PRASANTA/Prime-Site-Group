import React, { useEffect, useRef, useState } from "react";
import "./HomeResponsbility.css";

const initiativesData = [
  {
    id: 1,
    title: "Prime Welfare & Wellbeing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Local Community Outreach",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16M2 18h20M5 18v-5a7 7 0 0 1 14 0v5" />
        <path d="M12 2v4M12 6l3-2M12 6L9 4" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Skills & Vocational Learning",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Environmental Sustainability",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-9" />
        <path d="M9 13a5 5 0 0 1 6-3 5 5 0 0 1 3 4c0 3-4 6-9 8" />
        <path d="M15 13a5 5 0 0 0-6-3 5 5 0 0 0-3 4c0 3 4 6 9 8" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Sports & Workforce Culture",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Annual CSR Calendar",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
      </svg>
    ),
  },
];

const HomeResponsbility = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`HomeResponsbility ${isVisible ? "HomeResponsbility--animated" : ""}`}
      aria-label="Prime Site Corporate Social Responsibility"
    >
      <div className="HomeResponsbility__container">
        {/* Left Side: Content sliding left-to-right */}
        <div className="HomeResponsbility__content">
          <div className="HomeResponsbility__eyebrowWrapper">
            <span className="HomeResponsbility__eyebrowLine" />
            <span className="HomeResponsbility__eyebrow">PRIME SITE CSR</span>
          </div>

          <h2 className="HomeResponsbility__title">
            Corporate Social{" "}
            <span className="HomeResponsbility__titleHighlight">
              Responsibility
            </span>
          </h2>

          <p className="HomeResponsbility__description">
            At Prime Site, corporate social responsibility is integral to our 
            operational philosophy. We believe that sustainable business excellence 
            flourishes through proactive workforce welfare, community upliftment, 
            environmental stewardship, and equal opportunities across every project site.
          </p>

          <div className="HomeResponsbility__grid">
            {initiativesData.map((item) => (
              <div key={item.id} className="HomeResponsbility__card">
                <div className="HomeResponsbility__cardIconWrap">
                  {item.icon}
                </div>
                <h4 className="HomeResponsbility__cardTitle">{item.title}</h4>
              </div>
            ))}
          </div>

          <div className="HomeResponsbility__actionWrap">
            <a href="#csr-initiatives" className="HomeResponsbility__link">
              <span>Explore Prime Site CSR Impact</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Image sliding right-to-left */}
        <div className="HomeResponsbility__media">
          <div className="HomeResponsbility__imageClip">
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=85"
              alt="Prime Site community engagement, employee welfare, and social responsibility"
              className="HomeResponsbility__image"
              loading="lazy"
            />
            <div className="HomeResponsbility__imageOverlay" />
          </div>

          {/* Floating decorative badge */}
          <div className="HomeResponsbility__floatingBadge">
            <div className="HomeResponsbility__floatingBadgeDot" />
            <div className="HomeResponsbility__floatingBadgeText">
              <strong>Prime Site Initiative</strong>
              <span>Empowering Lives Across Communities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeResponsbility;