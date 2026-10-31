import React, { useState } from "react";
import {
  Plus,
  Minus,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Headphones,
} from "lucide-react";

import "./FaqSection.css";
import MainLogo from "../../assets/main-logo.png";

const FaqSection = () => {
  const [activeId, setActiveId] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "services", label: "Services" },
    { id: "operations", label: "Operations" },
    { id: "billing", label: "Contracts & Billing" },
  ];

  const faqs = [
    {
      id: 1,
      category: "services",
      question: "What integrated facilities management services do you offer?",
      answer:
        "We offer comprehensive hard and soft facilities management solutions across the UAE, including MEP maintenance, HVAC servicing, technical infrastructure support, commercial cleaning, security operations, and specialized pest management.",
    },
    {
      id: 2,
      category: "operations",
      question: "How quickly can security or manpower personnel be deployed?",
      answer:
        "Our standard deployment window ranges from 24 to 72 hours for routine requirements. For critical infrastructure or emergency situations, rapid response deployment teams can be organized promptly following initial operational assessment.",
    },
    {
      id: 3,
      category: "services",
      question: "Are your security personnel certified and licensed in the UAE?",
      answer:
        "Yes, all security personnel are fully certified by SIRA (Security Industry Regulatory Agency) in Dubai and PSBD / ASSD in Abu Dhabi and the Northern Emirates, undergoing rigorous continuous protocol training.",
    },
    {
      id: 4,
      category: "billing",
      question: "Can service contracts be tailored for seasonal or project-based needs?",
      answer:
        "Absolutely. While we manage long-term multi-year enterprise contracts, we provide flexible arrangements for seasonal peaks, events, shutdowns, and turn-key project mobilizations.",
    },
    {
      id: 5,
      category: "operations",
      question: "What compliance and quality safety standards do you adhere to?",
      answer:
        "We operate under international benchmarks including ISO 9001 (Quality), ISO 14001 (Environment), ISO 45001 (Health & Safety), and ISO 27001 (Information Security), with active audits conducted on every active site.",
    },
    {
      id: 6,
      category: "billing",
      question: "How do we receive a detailed proposal or service quote?",
      answer:
        "You can reach out through our contact desk or enquiry form. Our commercial solutions team schedules an initial site audit or brief review within 24 business hours to generate an itemized scope of work.",
    },
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((item) => item.category === activeCategory);

  const toggleAccordion = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="FaqSection">
      <div className="FaqSection-shell">
        <div className="FaqSection-topLine">
          <span />
          <span>HELP & FREQUENT QUESTIONS</span>
        </div>

        <div className="FaqSection-container">
          {/* LEFT: OVERVIEW & SUPPORT PANEL */}
          <aside className="FaqSection-info">
            <div className="FaqSection-watermark" aria-hidden="true">
              ?
            </div>

            <div className="FaqSection-infoInner">
              <a
                className="FaqSection-brand"
                href="/"
                aria-label="Transguard Group home"
              >
                <span className="FaqSection-logoWrap">
                  <img
                    className="FaqSection-logo"
                    src={MainLogo}
                    alt="Transguard Group logo"
                  />
                </span>

                <span className="FaqSection-brandText">
                  <span>Transguard</span>
                  <span>Group</span>
                  <span className="FaqSection-brandRule" />
                </span>
              </a>

              <div className="FaqSection-heading">
                <div className="FaqSection-eyebrow">
                  <span className="FaqSection-eyebrowLine" />
                  KNOWLEDGE BASE
                </div>

                <h2 className="FaqSection-infoTitle">
                  Clear answers to
                  <br />
                  <span>common questions.</span>
                </h2>

                <p className="FaqSection-infoDescription">
                  Find clarity on our service delivery, deployment protocols,
                  standards, and commercial partnerships across the region.
                </p>
              </div>

              {/* CATEGORY FILTER CHIPS */}
              <div className="FaqSection-categories">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`FaqSection-categoryBtn ${
                      activeCategory === cat.id
                        ? "FaqSection-categoryBtnActive"
                        : ""
                    }`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* DIRECT SUPPORT CARD */}
              <div className="FaqSection-supportCard">
                <div className="FaqSection-supportIcon">
                  <Headphones size={20} strokeWidth={1.8} />
                </div>
                <div className="FaqSection-supportContent">
                  <strong>Still have questions?</strong>
                  <span>Speak directly with our client advisory desk.</span>
                  <a href="#contact" className="FaqSection-supportLink">
                    <span>Contact team</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              <div className="FaqSection-trust">
                <span className="FaqSection-trustIcon">
                  <ShieldCheck size={21} strokeWidth={1.8} />
                </span>
                <span>
                  <strong>Verified regional excellence.</strong>
                  <small>
                    Over two decades of dependable corporate facilities and
                    security support.
                  </small>
                </span>
              </div>
            </div>
          </aside>

          {/* RIGHT: ACCORDION PANEL */}
          <div className="FaqSection-accordionPanel">
            <div className="FaqSection-accordionCard">
              <div className="FaqSection-panelHeader">
                <div className="FaqSection-panelEyebrow">
                  <span className="FaqSection-liveDot" />
                  RESOLUTIONS & POLICIES
                </div>

                <h2 className="FaqSection-panelTitle">
                  Frequently <span>asked.</span>
                </h2>

                <p className="FaqSection-panelDescription">
                  Click any question below to explore answers regarding our
                  engagement processes.
                </p>
              </div>

              <div className="FaqSection-list">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = activeId === faq.id;

                  return (
                    <div
                      key={faq.id}
                      className={`FaqSection-item ${
                        isOpen ? "FaqSection-itemOpen" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="FaqSection-trigger"
                        onClick={() => toggleAccordion(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                      >
                        <span className="FaqSection-questionWrap">
                          <span className="FaqSection-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="FaqSection-question">
                            {faq.question}
                          </span>
                        </span>

                        <span className="FaqSection-toggleIcon">
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </button>

                      <div
                        id={`faq-answer-${faq.id}`}
                        className={`FaqSection-answerWrap ${
                          isOpen ? "FaqSection-answerWrapOpen" : ""
                        }`}
                        role="region"
                      >
                        <div className="FaqSection-answer">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="FaqSection-footerPrompt">
                <div className="FaqSection-promptIcon">
                  <MessageSquare size={18} />
                </div>
                <p className="FaqSection-promptText">
                  Need a customized service package?{" "}
                  <a href="#contact">Reach out to our operations specialists</a>{" "}
                  for a comprehensive site review.
                </p>
              </div>
            </div>

            <div className="FaqSection-bottomAccent" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;