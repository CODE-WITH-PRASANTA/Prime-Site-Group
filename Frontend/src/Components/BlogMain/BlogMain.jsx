import React from "react";
import "./BlogMain.css";

const BlogMain = () => {
  return (
    <section className="BlogMain">
      <div className="BlogMain-background" />

      <div className="BlogMain-overlay" />

      <div className="BlogMain-geometricShape" />

      <div className="BlogMain-container">
        <div className="BlogMain-content">
          <span className="BlogMain-eyebrow">
            <span className="BlogMain-eyebrowLine" />
            INSIGHTS & UPDATES
          </span>

          <h1 className="BlogMain-title">
            Latest
            <span className="BlogMain-titleAccent"> News</span>
          </h1>

          <p className="BlogMain-description">
            Discover industry perspectives, leadership viewpoints, and operational
            case studies highlighting the evolution of integrated facilities management
            and enterprise security solutions.
          </p>

          <div className="BlogMain-divider">
            <span />
            <span />
            <span />
          </div>

          <p className="BlogMain-subtitle">
            Stay informed with our newest thought leadership articles.
          </p>
        </div>
      </div>

      <div className="BlogMain-bottomAccent" />
    </section>
  );
};

export default BlogMain;