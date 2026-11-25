import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock3,
  CalendarDays,
  ArrowUpRight,
  MoveRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import API from "../../api/axios";
import "./BlogSection.css";

const BLOGS_PER_PAGE = 6;

// Fallback image helper
const resolveImage = (img) => {
  if (!img) {
    return "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85";
  }
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) {
    return img;
  }
  const baseUrl = import.meta.env.VITE_UPLOADS_URL || "http://localhost:5000/uploads/";
  return `${baseUrl.replace(/\/+$/, "")}/${img.replace(/^\/+/, "")}`;
};

const BlogSection = () => {
  const sectionRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch blogs dynamically from database
  useEffect(() => {
    let isMounted = true;
    API.get("/blogs?status=Published")
      .then((res) => {
        if (isMounted && res.data?.data) {
          setBlogs(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load published blogs:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(blogs.length / BLOGS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * BLOGS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") {
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
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const changePage = (newPage) => {
    const pageClamped = Math.max(1, Math.min(newPage, totalPages));
    setCurrentPage(pageClamped);

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className={`BlogSection ${isVisible ? "BlogSection--visible" : ""}`}
      ref={sectionRef}
      aria-label="Latest Articles"
    >
      <div className="BlogSection__container">
        {/* HEADER */}
        <header className="BlogSection__header">
          <div className="BlogSection__eyebrow">
            <span className="BlogSection__eyebrowLine" />
            <span>INSIGHTS &amp; IDEAS</span>
          </div>

          <div className="BlogSection__headingRow">
            <div className="BlogSection__headingContent">
              <h2 className="BlogSection__title">
                Latest from our <span>Blog</span>
              </h2>

              <p className="BlogSection__intro">
                Expert tips, industry trends, and practical guides to keep your
                spaces running at their best.
              </p>
            </div>

            <div className="BlogSection__btnWrap">
              <Link to="/blogs" className="BlogSection__viewAll">
                <span>View All Articles</span>
                <span className="BlogSection__viewAllIcon">
                  <MoveRight size={17} />
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* ARTICLES GRID */}
        {loading ? (
          <div className="BlogSection__loading">
            <div className="BlogSection__spinner" />
            <p>Loading latest articles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="BlogSection__empty">
            <h3>No articles published yet</h3>
            <p>Check back soon for new insights and industry updates.</p>
          </div>
        ) : (
          <div className="BlogSection__grid" key={safePage}>
            {currentBlogs.map((blog, index) => {
              const isFeatured = safePage === 1 && index === 0;
              const link = `/blogs/${blog.slug || blog.id}`;

              return (
                <article
                  className={`BlogSection__card${
                    isFeatured ? " BlogSection__card--featured" : ""
                  }`}
                  key={blog.id}
                  style={{ "--BlogSection-delay": `${index * 80}ms` }}
                >
                  <Link
                    className="BlogSection__imageLink"
                    to={link}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <span className="BlogSection__imageWrapper">
                      <img
                        className="BlogSection__image"
                        src={resolveImage(blog.image)}
                        alt={blog.title}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85";
                        }}
                      />

                      <span className="BlogSection__imageOverlay" />

                      <span className="BlogSection__badges">
                        {isFeatured && (
                          <span className="BlogSection__featuredBadge">
                            <Sparkles size={13} />
                            Featured
                          </span>
                        )}
                        <span className="BlogSection__category">
                          {blog.category}
                        </span>
                      </span>

                      <span className="BlogSection__imageArrow">
                        <ArrowUpRight size={18} />
                      </span>
                    </span>
                  </Link>

                  <div className="BlogSection__cardBody">
                    <div className="BlogSection__meta">
                      <span className="BlogSection__date">
                        <CalendarDays size={14} strokeWidth={2} />
                        {blog.date || blog.formattedDate}
                      </span>

                      <span className="BlogSection__readTime">
                        <Clock3 size={12} strokeWidth={2.2} />
                        {blog.readTime || "5 min read"}
                      </span>
                    </div>

                    <h3 className="BlogSection__cardTitle">
                      <Link to={link}>{blog.title}</Link>
                    </h3>

                    <p className="BlogSection__description">
                      {blog.shortDescription ||
                        blog.description?.replace(/<[^>]*>/g, "").slice(0, 160) + "..."}
                    </p>

                    <div className="BlogSection__footerRow">
                      <Link className="BlogSection__readMore" to={link}>
                        <span>Read Article</span>
                        <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <nav className="BlogSection__pagination" aria-label="Blog pagination">
            <button
              type="button"
              className="BlogSection__pageArrow"
              onClick={() => changePage(safePage - 1)}
              disabled={safePage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                type="button"
                key={page}
                className={`BlogSection__pageNumber ${
                  safePage === page ? "BlogSection__pageNumber--active" : ""
                }`}
                onClick={() => changePage(page)}
                aria-current={safePage === page ? "page" : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="BlogSection__pageArrow"
              onClick={() => changePage(safePage + 1)}
              disabled={safePage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
