import React, { useState, useEffect, useRef } from "react";
import "./AboutReports.css";

const reportFiles = [
  {
    id: "2025-2026",
    title: "Annual Report 2025/2026",
    size: "18.4 MB",
    pages: "128 Pages",
    fileUrl: "#download-2025-2026",
  },
  {
    id: "2024-2025",
    title: "Annual Report 2024/2025",
    size: "16.8 MB",
    pages: "116 Pages",
    fileUrl: "#download-2024-2025",
  },
  {
    id: "2023-2024",
    title: "Annual Report 2023/2024",
    size: "15.2 MB",
    pages: "104 Pages",
    fileUrl: "#download-2023-2024",
  },
  {
    id: "2022-2023",
    title: "Annual Report 2022/2023",
    size: "14.9 MB",
    pages: "96 Pages",
    fileUrl: "#download-2022-2023",
  },
];

const AboutReports = () => {
  const [selectedReportId, setSelectedReportId] = useState("2025-2026");
  const [isVisible, setIsVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const sectionRef = useRef(null);

  const selectedReport =
    reportFiles.find((r) => r.id === selectedReportId) || reportFiles[0];

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

  const handleDownload = (e) => {
    e.preventDefault();
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 1200);
  };

  return (
    <section
      ref={sectionRef}
      className={`AboutReports ${isVisible ? "AboutReports--visible" : ""}`}
      aria-label="Annual Financial Reports"
    >
      <div className="AboutReports__container">
        {/* Left Side: Staggered Running Content */}
        <div className="AboutReports__content">
          <div className="AboutReports__eyebrowWrap">
            <span className="AboutReports__eyebrowLine" />
            <span className="AboutReports__eyebrow">REPORTS[cite: 8]</span>
          </div>

          <h2 className="AboutReports__title">
            Annual <span className="AboutReports__titleAccent">Reports[cite: 8]</span>
          </h2>

          <p className="AboutReports__description">
            Our annual reports document Transguard's incredible growth
            trajectory[cite: 8], detailing our financial milestones, corporate governance,
            and continuous investments across sustainable business operations.
          </p>

          <form className="AboutReports__form" onSubmit={handleDownload}>
            <label htmlFor="report-select" className="AboutReports__label">
              Choose your file:[cite: 8]
            </label>

            {/* Custom Interactive Select Box */}
            <div className="AboutReports__selectWrapper">
              <select
                id="report-select"
                className="AboutReports__select"
                value={selectedReportId}
                onChange={(e) => setSelectedReportId(e.target.value)}
              >
                {reportFiles.map((file) => (
                  <option key={file.id} value={file.id}>
                    {file.title}[cite: 8]
                  </option>
                ))}
              </select>

              <div className="AboutReports__selectIcon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Meta Specifications */}
            <div className="AboutReports__fileMeta">
              <span className="AboutReports__fileMetaPill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                PDF Format
              </span>
              <span className="AboutReports__fileMetaDivider" />
              <span>{selectedReport.size}</span>
              <span className="AboutReports__fileMetaDivider" />
              <span>{selectedReport.pages}</span>
            </div>

            {/* Premium Download Action Button */}
            <button
              type="submit"
              className={`AboutReports__downloadButton ${
                isDownloading ? "AboutReports__downloadButton--loading" : ""
              }`}
            >
              <span className="AboutReports__downloadText">
                {isDownloading ? "Preparing Document..." : "Download[cite: 8]"}
              </span>
              <span className="AboutReports__downloadIcon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </form>
        </div>

        {/* Right Side: Angled Skyline Visual */}
        <div className="AboutReports__media">
          <div className="AboutReports__imageClip">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=85"
              alt="Dubai skyline and Burj Khalifa reflections at golden hour"
              className="AboutReports__image"
              loading="lazy"
            />
            <div className="AboutReports__imageShade" />
          </div>

          {/* Floating Corporate Verification Badge */}
          <div className="AboutReports__badge">
            <span className="AboutReports__badgeDot" />
            <div className="AboutReports__badgeInfo">
              <strong>Audited Disclosures</strong>
              <span>IFRS & Regulatory Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutReports;