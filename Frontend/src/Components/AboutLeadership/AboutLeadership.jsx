
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import leadershipImage from "../../assets/Akash.png";
import "./AboutLeadership.css";

const AboutLeadership = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const paragraphs = [
    "HH Sheikh Ahmed bin Saeed Al Maktoum began his aviation career in 1985, when he was appointed President of the Dubai Department of Civil Aviation. In the same year, he became Chairman of the newly founded Emirates, and helmed the launch of the airline with two leased aircraft to two destinations from Dubai. Today, he leads the Emirates Group, which includes dnata.",

    "Emirates is now an award-winning global airline with an extensive international network spanning six continents. Its operations connect people, businesses and destinations around the world.",

    "dnata is one of the world's largest air services providers, offering ground handling, cargo, travel and flight catering services to customers across international markets.",

    "Sheikh Ahmed has contributed to Dubai's global stature as a leading business, tourism, trade and transport hub, helping strengthen the region's position on the world stage.",
  ];

  return (
    <section
      ref={sectionRef}
      className={`AboutLeadership ${
        isVisible ? "AboutLeadership--visible" : ""
      }`}
    >
      <div className="AboutLeadership__container">
        {/* Left content */}
        <div className="AboutLeadership__content">
          <div className="AboutLeadership__eyebrow">
            <span className="AboutLeadership__eyebrowLine" />
            <span>LEADERSHIP</span>
          </div>

          <h2 className="AboutLeadership__title">
            The Office of the{" "}
            <span>Executive Board</span>
          </h2>

          <div className="AboutLeadership__person">
            <h3 className="AboutLeadership__name">
              HH Sheikh Ahmed bin Saeed Al-Maktoum
            </h3>

            <p className="AboutLeadership__role">
              Chairman and Chief Executive Emirates Airline and Group
            </p>
          </div>

          <div className="AboutLeadership__biography">
            {paragraphs.map((paragraph, index) => (
              <p
                className="AboutLeadership__paragraph"
                key={index}
                style={{
                  "--AboutLeadership-delay": `${0.2 + index * 0.3}s`,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="AboutLeadership__signature">
            <span className="AboutLeadership__signatureLine" />

            <span className="AboutLeadership__signatureText">
              Leadership. Vision. Excellence.
            </span>

            <ArrowUpRight
              className="AboutLeadership__signatureIcon"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Right image */}
        <div className="AboutLeadership__portraitSection">
          <div className="AboutLeadership__portraitFrame">
            <img
              className="AboutLeadership__portrait"
              src={leadershipImage}
              alt="Executive leadership portrait"
              loading="lazy"
            />

            <div className="AboutLeadership__portraitOverlay" />
          </div>

          <span
            className="AboutLeadership__portraitAccent"
            aria-hidden="true"
          />

          <div className="AboutLeadership__portraitCaption">
            <span className="AboutLeadership__captionLine" />
            <span className="AboutLeadership__captionText">
              EXECUTIVE LEADERSHIP
            </span>
          </div>

          <span
            className="AboutLeadership__watermark"
            aria-hidden="true"
          >
            LEADERSHIP
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutLeadership;
