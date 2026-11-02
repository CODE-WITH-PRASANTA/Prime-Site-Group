
import React, { useEffect, useRef, useState } from "react";
import "./CareerTwo.css";

const CareerTwo = () => {
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
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      number: "01",
      title: "Career Growth",
      description:
        "Build your skills, take on new challenges, and grow with a forward-thinking organization.",
    },
    {
      number: "02",
      title: "Inclusive Culture",
      description:
        "Work with a diverse team that values collaboration, respect, and fresh perspectives.",
    },
    {
      number: "03",
      title: "Meaningful Work",
      description:
        "Contribute to services that help businesses operate efficiently across industries.",
    },
  ];

  const handleExploreCareers = () => {
    const opportunities = document.getElementById("career-opportunities");

    if (opportunities) {
      opportunities.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.location.hash = "career-opportunities";
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`CareerTwo ${isVisible ? "CareerTwo--visible" : ""}`}
      aria-labelledby="CareerTwo-title"
    >
      <div className="CareerTwo__container">
        {/* LEFT SIDE: IMAGE */}

        <div className="CareerTwo__visual">
          <div className="CareerTwo__imageWrapper">
            <img
              className="CareerTwo__image"
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
              alt="Prime Site professionals collaborating in a modern workplace"
              loading="lazy"
            />

            <div className="CareerTwo__imageOverlay" />

            <div className="CareerTwo__imageTop">
              <span className="CareerTwo__imageDot" />
              <span>PEOPLE. PURPOSE. PROGRESS.</span>
            </div>

            <div className="CareerTwo__imageCaption">
              <span className="CareerTwo__captionLabel">
                OUR GREATEST STRENGTH
              </span>

              <h3>
                Great people.
                <br />
                <span>Greater possibilities.</span>
              </h3>

              <p>
                Together, we create opportunities, deliver excellence, and
                build a better future.
              </p>
            </div>

            <div className="CareerTwo__imageCounter">
              <span className="CareerTwo__counterNumber">01</span>
              <span className="CareerTwo__counterLine" />
              <span className="CareerTwo__counterText">
                PEOPLE FIRST
              </span>
            </div>
          </div>

          <div className="CareerTwo__experienceCard">
            <div className="CareerTwo__experienceIcon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z" />
              </svg>
            </div>

            <div>
              <strong>Grow With Us</strong>
              <span>Your next chapter starts here.</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: CONTENT */}

        <div className="CareerTwo__content">
          <div className="CareerTwo__eyebrow">
            <span className="CareerTwo__eyebrowLine" />
            <span>CAREERS AT PRIME SITE</span>
          </div>

          <h2 id="CareerTwo-title" className="CareerTwo__title">
            Build Your
            <br />
            <span className="CareerTwo__titleHighlight">Future</span>
            <span className="CareerTwo__titleSecondLine"> With Us</span>
          </h2>

          <p className="CareerTwo__description">
            At Prime Site, we believe that great people build great
            businesses. Join a team delivering reliable manpower, security
            services, cash solutions, and integrated facility management
            across industries.
          </p>

          <p className="CareerTwo__description CareerTwo__description--secondary">
            Discover opportunities to develop your skills, work alongside
            experienced professionals, and make a meaningful contribution.
            Your talent, ambition, and ideas can help shape our future.
          </p>

          {/* CAREER BENEFITS */}

          <div className="CareerTwo__benefits">
            {benefits.map((benefit) => (
              <div className="CareerTwo__benefit" key={benefit.number}>
                <div className="CareerTwo__benefitNumber">
                  {benefit.number}
                </div>

                <div className="CareerTwo__benefitContent">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>

                <span className="CareerTwo__benefitArrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            ))}
          </div>

          {/* CAREER STATS */}

          <div className="CareerTwo__stats">
            <div className="CareerTwo__stat">
              <strong>61,000+</strong>
              <span>Workforce</span>
            </div>

            <div className="CareerTwo__statDivider" />

            <div className="CareerTwo__stat">
              <strong>Multiple</strong>
              <span>Industries</span>
            </div>

            <div className="CareerTwo__statDivider" />

            <div className="CareerTwo__stat">
              <strong>Growth</strong>
              <span>Opportunities</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}

          <div className="CareerTwo__actions">
            <button
              type="button"
              className="CareerTwo__primaryButton"
              onClick={handleExploreCareers}
            >
              <span>Explore Opportunities</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            <a
              href="#life-at-prime-site"
              className="CareerTwo__secondaryButton"
            >
              Life at Prime Site
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="CareerTwo__footerNote">
            <span className="CareerTwo__footerDot" />
            <span>BUILD YOUR CAREER. MAKE AN IMPACT.</span>
          </div>
        </div>
      </div>

      {/* DECORATIVE BACKGROUND TEXT */}

      <span className="CareerTwo__backgroundText" aria-hidden="true">
        CAREERS
      </span>
    </section>
  );
};

export default CareerTwo;