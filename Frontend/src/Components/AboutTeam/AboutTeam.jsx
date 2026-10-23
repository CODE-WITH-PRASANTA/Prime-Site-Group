
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import "./AboutTeam.css";

const AboutTeam = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeLeader, setActiveLeader] = useState(0);

  const leaders = [
    {
      name: "Rabie Atieh",
      role: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=90",
      number: "01",
      description: [
        "Rabie Atieh leads Transguard Group's business solutions operations, bringing extensive experience in leadership, business transformation and regional market development.",
        "His professional background spans cash management, security, facilities management and workforce solutions, supporting the delivery of integrated services to clients across the region.",
        "His leadership focuses on operational excellence, long-term client relationships and developing innovative solutions that respond to evolving business needs.",
      ],
    },
    {
      name: "Executive Leadership",
      role: "Strategic Management",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=90",
      number: "02",
      description: [
        "Our leadership team brings together diverse professional expertise and a shared commitment to high standards of service.",
        "Through strategic planning, collaborative decision-making and continuous improvement, the team works to build trusted partnerships and deliver reliable business solutions.",
        "A strong focus on accountability, innovation and people helps guide the organisation's long-term direction.",
      ],
    },
    {
      name: "Senior Management",
      role: "Operations & Excellence",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=90",
      number: "03",
      description: [
        "Our senior management team turns business strategy into consistent, high-quality operational delivery.",
        "By combining industry knowledge with practical experience, the team supports service excellence, operational efficiency and dependable customer experiences.",
        "Every initiative is guided by a commitment to professionalism, safety, continuous development and lasting client relationships.",
      ],
    },
  ];

  const leader = leaders[activeLeader];

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
      ref={sectionRef}
      className={`AboutTeam ${
        isVisible ? "AboutTeam--visible" : ""
      }`}
    >
      <div className="AboutTeam__container">
        {/* LEFT: LEADERSHIP IMAGE GALLERY */}
        <div className="AboutTeam__gallery">
          <div className="AboutTeam__galleryHeader">
            <span className="AboutTeam__galleryLabel">
              MEET OUR LEADERS
            </span>
            <span className="AboutTeam__galleryCount">
              0{activeLeader + 1} <span>/ 0{leaders.length}</span>
            </span>
          </div>

          <div className="AboutTeam__imageGrid">
            {leaders.map((item, index) => (
              <button
                type="button"
                key={item.number}
                className={`AboutTeam__imageCard ${
                  activeLeader === index
                    ? "AboutTeam__imageCard--active"
                    : ""
                }`}
                onClick={() => setActiveLeader(index)}
                aria-label={`View ${item.name}`}
                aria-pressed={activeLeader === index}
              >
                <img
                  className="AboutTeam__image"
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />

                <span className="AboutTeam__imageShade" />

                <span className="AboutTeam__imageNumber">
                  {item.number}
                </span>

                <span className="AboutTeam__imageInfo">
                  <span className="AboutTeam__imageName">
                    {item.name}
                  </span>
                  <span className="AboutTeam__imageRole">
                    {item.role}
                  </span>
                </span>

                <span className="AboutTeam__imageArrow">
                  <ArrowUpRight size={18} />
                </span>
              </button>
            ))}
          </div>

          <div className="AboutTeam__galleryFooter">
            <span className="AboutTeam__galleryFooterLine" />
            <span>PEOPLE. PURPOSE. PERFORMANCE.</span>
          </div>
        </div>

        {/* RIGHT: EXECUTIVE PROFILE */}
        <div className="AboutTeam__content">
          <div className="AboutTeam__eyebrow">
            <span className="AboutTeam__eyebrowLine" />
            <span>TEAM</span>
          </div>

          <h2 className="AboutTeam__title">
            The Office of the{" "}
            <span>Executive Board</span>
          </h2>

          <div
            className="AboutTeam__profile"
            key={leader.number}
          >
            <div className="AboutTeam__profileHeading">
              <div>
                <h3 className="AboutTeam__name">
                  {leader.name}
                </h3>
                <p className="AboutTeam__role">
                  {leader.role}
                </p>
              </div>

              <span className="AboutTeam__profileNumber">
                {leader.number}
              </span>
            </div>

            <div className="AboutTeam__biography">
              {leader.description.map((paragraph, index) => (
                <p
                  className="AboutTeam__paragraph"
                  key={`${leader.number}-${index}`}
                  style={{
                    "--AboutTeam-delay": `${0.12 + index * 0.16}s`,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="AboutTeam__bottom">
            <div className="AboutTeam__bottomText">
              <span className="AboutTeam__bottomLine" />
              <span>Leadership built on trust and excellence.</span>
            </div>

            <div className="AboutTeam__controls">
              <button
                type="button"
                className="AboutTeam__control"
                onClick={() =>
                  setActiveLeader(
                    (activeLeader - 1 + leaders.length) %
                      leaders.length
                  )
                }
                aria-label="Previous leader"
              >
                <ChevronRight className="AboutTeam__previousIcon" />
              </button>

              <button
                type="button"
                className="AboutTeam__control AboutTeam__control--next"
                onClick={() =>
                  setActiveLeader(
                    (activeLeader + 1) % leaders.length
                  )
                }
                aria-label="Next leader"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;