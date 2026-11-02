import React, { useEffect, useRef, useState } from "react";
import {
  Award,
  Trophy,
  Medal,
  ShieldCheck,
  Star,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";
import "./WorkforceSoluationSix.css";

const WorkforceSoluationSix = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeAward, setActiveAward] = useState(null);

  const awards = [
    {
      id: 1,
      year: "2018",
      title: "Dubai Quality Award",
      subtitle: "Excellence in Quality Management",
      description:
        "Recognises organisations that demonstrate a strong commitment to continuous improvement, quality management and business excellence.",
      icon: Trophy,
      category: "QUALITY",
    },
    {
      id: 2,
      year: "2018",
      title: "Sheikh Khalifa Excellence Award",
      subtitle: "Gold Category",
      description:
        "Celebrating organisational excellence, effective leadership and sustained improvements in business performance.",
      icon: Award,
      category: "EXCELLENCE",
    },
    {
      id: 3,
      year: "2021",
      title: "Mohammed Bin Rashid Al Maktoum Business Award",
      subtitle: "Business Performance",
      description:
        "Recognises organisations demonstrating strong business practices, sustainable growth and outstanding performance.",
      icon: Medal,
      category: "BUSINESS",
    },
    {
      id: 4,
      year: "2021",
      title: "Business Innovation Award",
      subtitle: "Innovation & Transformation",
      description:
        "Celebrating innovative thinking, continuous development and initiatives that contribute to long-term business success.",
      icon: Star,
      category: "INNOVATION",
    },
    {
      id: 5,
      year: "2021",
      title: "Customer Excellence Award",
      subtitle: "Customer Experience",
      description:
        "Recognises a customer-first approach, consistent service quality and efforts to build lasting customer relationships.",
      icon: ShieldCheck,
      category: "CUSTOMER CARE",
    },
    {
      id: 6,
      year: "2022",
      title: "Dubai Quality Gold Award",
      subtitle: "Commitment to Excellence",
      description:
        "A quality-focused recognition theme representing continuous improvement, operational excellence and high standards.",
      icon: BadgeCheck,
      category: "GOLD STANDARD",
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
      className={`WorkforceSoluationSix ${
        isVisible ? "WorkforceSoluationSix--visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="WorkforceSoluationSix__container">
        {/* Section heading */}
        <header className="WorkforceSoluationSix__header">
          <div className="WorkforceSoluationSix__eyebrow">
            <span className="WorkforceSoluationSix__eyebrowLine" />
            <span>AWARDS & RECOGNITION</span>
          </div>

          <h2 className="WorkforceSoluationSix__title">
            Awards <span>&</span> Recognition
          </h2>

          <p className="WorkforceSoluationSix__intro">
            Since 2018, Transguard Cash has been recognised for its
            commitment to organisational excellence, continuous
            improvement, innovation and customer service. These
            recognitions reflect the importance of maintaining
            high standards and building lasting business relationships.
          </p>

          <div className="WorkforceSoluationSix__summary">
            <div className="WorkforceSoluationSix__summaryItem">
              <span className="WorkforceSoluationSix__summaryNumber">06</span>
              <span className="WorkforceSoluationSix__summaryLabel">
                FEATURED AWARDS
              </span>
            </div>

            <span className="WorkforceSoluationSix__summaryDivider" />

            <div className="WorkforceSoluationSix__summaryItem">
              <span className="WorkforceSoluationSix__summaryIcon">
                <Award size={19} />
              </span>
              <span className="WorkforceSoluationSix__summaryLabel">
                A COMMITMENT TO EXCELLENCE
              </span>
            </div>
          </div>
        </header>

        {/* Awards grid */}
        <div className="WorkforceSoluationSix__grid">
          {awards.map((item, index) => {
            const AwardIcon = item.icon;
            const isActive = activeAward === item.id;

            return (
              <article
                className={`WorkforceSoluationSix__card ${
                  isActive ? "WorkforceSoluationSix__card--active" : ""
                }`}
                key={item.id}
                style={{
                  "--WorkforceSoluationSix-delay": `${index * 100}ms`,
                }}
                onMouseEnter={() => setActiveAward(item.id)}
                onMouseLeave={() => setActiveAward(null)}
              >
                <div className="WorkforceSoluationSix__cardTop">
                  <span className="WorkforceSoluationSix__category">
                    {item.category}
                  </span>

                  <span className="WorkforceSoluationSix__year">
                    {item.year}
                  </span>
                </div>

                {/* Decorative award emblem */}
                <div className="WorkforceSoluationSix__emblem">
                  <div className="WorkforceSoluationSix__emblemOuter">
                    <div className="WorkforceSoluationSix__emblemInner">
                      <AwardIcon
                        className="WorkforceSoluationSix__awardIcon"
                        strokeWidth={1.35}
                      />
                    </div>
                  </div>

                  <span className="WorkforceSoluationSix__emblemStar">
                    <Star size={13} fill="currentColor" />
                  </span>
                </div>

                <div className="WorkforceSoluationSix__cardContent">
                  <span className="WorkforceSoluationSix__cardKicker">
                    RECOGNITION · {item.year}
                  </span>

                  <h3 className="WorkforceSoluationSix__cardTitle">
                    {item.title}
                  </h3>

                  <p className="WorkforceSoluationSix__subtitle">
                    {item.subtitle}
                  </p>

                  <p className="WorkforceSoluationSix__description">
                    {item.description}
                  </p>
                </div>

                <div className="WorkforceSoluationSix__cardFooter">
                  <span className="WorkforceSoluationSix__footerLine" />

                  <span className="WorkforceSoluationSix__footerText">
                    EXCELLENCE
                  </span>

                  <span className="WorkforceSoluationSix__footerArrow">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <span
                  className="WorkforceSoluationSix__cardAccent"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <footer className="WorkforceSoluationSix__footer">
          <div className="WorkforceSoluationSix__footerDecoration">
            <span />
            <span />
            <span />
          </div>

          <p className="WorkforceSoluationSix__footerStatement">
            Recognising achievement. Inspiring excellence. Building trust.
          </p>

          <span className="WorkforceSoluationSix__footerCaption">
            OUR STANDARD. OUR COMMITMENT.
          </span>
        </footer>
      </div>
    </section>
  );
};

export default WorkforceSoluationSix;