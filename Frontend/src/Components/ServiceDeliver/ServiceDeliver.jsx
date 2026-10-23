import React, { useState, useEffect, useRef } from "react";
import "./ServiceDeliver.css";

const deliveryHighlights = [
  {
    id: 1,
    title: "End-to-End Value Integration",
    detail: "Seamless synchronisation between client ledger accounts and physical vaults.",
  },
  {
    id: 2,
    title: "Customer-Centric Operations",
    detail: "Customized SLAs aligned with high-volume retail and banking demand cycles.",
  },
  {
    id: 3,
    title: "Continuous Process Innovation",
    detail: "Automated currency sorting and electronic audit trails reducing turnaround times.",
  },
];

const ServiceDeliver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.18 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Interactive 3D pointer hover effect on image
  const handleMouseMove = (e) => {
    const card = mediaRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // Max 6deg tilt
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.setProperty("--ServiceDeliver-rx", `${rotateX}deg`);
    card.style.setProperty("--ServiceDeliver-ry", `${rotateY}deg`);
    card.style.setProperty("--ServiceDeliver-scale", "1.025");
    card.style.setProperty("--ServiceDeliver-shine-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--ServiceDeliver-shine-y", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = mediaRef.current;
    if (!card) return;

    card.style.setProperty("--ServiceDeliver-rx", "0deg");
    card.style.setProperty("--ServiceDeliver-ry", "0deg");
    card.style.setProperty("--ServiceDeliver-scale", "1");
  };

  return (
    <section
      ref={sectionRef}
      className={`ServiceDeliver ${isVisible ? "ServiceDeliver--visible" : ""}`}
      aria-label="What We Deliver - Services and Value"
    >
      <div className="ServiceDeliver__container">
        {/* Left Side: Staggered Content with running letter animation */}
        <div className="ServiceDeliver__content">
          <div className="ServiceDeliver__eyebrowWrap">
            <span className="ServiceDeliver__eyebrowLine" />
            <span className="ServiceDeliver__eyebrow">DELIVER[cite: 15]</span>
          </div>

          <h2 className="ServiceDeliver__title">
            <span className="ServiceDeliver__titlePrimary">What We </span>
            <span className="ServiceDeliver__titleAccent">Deliver[cite: 15]</span>
          </h2>

          <p className="ServiceDeliver__description">
            We provide a fully integrated approach and our strategy is entirely
            customer focused[cite: 15]. We work continuously to deliver best services practices
            which are crucial to the success of our clients' business needs[cite: 15].
          </p>

          {/* Delivery Capability Items */}
          <div className="ServiceDeliver__list">
            {deliveryHighlights.map((item) => (
              <div key={item.id} className="ServiceDeliver__item">
                <span className="ServiceDeliver__checkIcon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className="ServiceDeliver__itemText">
                  <h4 className="ServiceDeliver__itemTitle">{item.title}</h4>
                  <p className="ServiceDeliver__itemDetail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTA Button */}
          <div className="ServiceDeliver__actionWrap">
            <a href="#partner-with-us" className="ServiceDeliver__btnPrimary">
              <span>Partner With Us</span>
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

        {/* Right Side: Interactive Hover Tilt Media with Slanted Cut */}
        <div
          ref={mediaRef}
          className="ServiceDeliver__media"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="ServiceDeliver__imageClip">
            <img
              src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=2200&q=85"
              alt="High-speed banknote sorting and automated cash processing system"
              className="ServiceDeliver__image"
              loading="lazy"
            />
            {/* Dynamic Light Sweep Follower */}
            <div className="ServiceDeliver__lightSweep" />
            <div className="ServiceDeliver__imageShade" />
          </div>

          {/* Floating Operational Excellence Badge */}
          <div className="ServiceDeliver__badge">
            <span className="ServiceDeliver__badgeDot" />
            <div className="ServiceDeliver__badgeInfo">
              <strong>99.98% Accuracy SLA</strong>
              <span>Certified Currency Processing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDeliver;