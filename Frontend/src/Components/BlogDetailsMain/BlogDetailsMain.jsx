import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Clock3,
  UserRound,
  Eye,
  Search,
  ChevronRight,
  ArrowUp,
  ArrowUpRight,
  Copy,
  Check,
  Share2,
  CalendarDays,
  Tag,
  Globe,
  MessageCircle,
  Bookmark,
  Sparkles,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import API from "../../api/axios";
import "./BlogDetailsMain.css";

// Helper to resolve uploaded images or external URLs
const resolveImage = (img) => {
  if (!img) {
    return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=90";
  }
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) {
    return img;
  }
  const baseUrl = import.meta.env.VITE_UPLOADS_URL || "http://localhost:5000/uploads/";
  return `${baseUrl.replace(/\/+$/, "")}/${img.replace(/^\/+/, "")}`;
};

const BlogDetailsMain = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [activePost, setActivePost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [copied, setCopied] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Fetch active blog post by slug or ID
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchPost = async () => {
      try {
        let postData = null;
        if (slug) {
          const res = await API.get(`/blogs/${slug}`);
          if (res.data?.success && res.data.data) {
            postData = res.data.data;
          }
        } else {
          // If no slug provided in URL, fetch the latest published post
          const res = await API.get("/blogs?status=Published&limit=1");
          if (res.data?.success && res.data.data?.length > 0) {
            postData = res.data.data[0];
          }
        }

        if (isMounted) {
          if (postData) {
            setActivePost(postData);
          } else {
            setError("Blog article not found.");
          }
        }
      } catch (err) {
        console.error("Failed to load blog details:", err);
        if (isMounted) {
          setError(
            err.response?.data?.message || "Blog article could not be loaded."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Fetch recent posts & categories for sidebar
  useEffect(() => {
    let isMounted = true;

    API.get("/blogs?status=Published&limit=6")
      .then((res) => {
        if (isMounted && res.data?.data) {
          setRecentPosts(res.data.data);
        }
      })
      .catch(() => {});

    API.get("/blog-categories?all=true")
      .then((res) => {
        if (isMounted && res.data?.data) {
          setCategories(res.data.data.filter((c) => c.status === "Active"));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Track scroll position for reading progress bar and top button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setShowTopButton(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/blogs?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  const shareOn = (platform) => {
    const url = window.location.href;
    const title = activePost?.title || "Prime Site Blog";

    const shareUrls = {
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      X: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      WhatsApp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    };

    const shareUrl = shareUrls[platform];
    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer,width=650,height=550");
    }
  };

  const copyArticleLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy this article link:", window.location.href);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="BlogDetailsMain" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{
            width: "44px",
            height: "44px",
            border: "3px solid #f0e3df",
            borderTopColor: "#f4512a",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 20px"
          }} />
          <h2 style={{ color: "#092c49", fontSize: "20px", fontWeight: "600" }}>Loading article...</h2>
        </div>
      </div>
    );
  }

  if (error || !activePost) {
    return (
      <div className="BlogDetailsMain" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "80px 20px", maxWidth: "500px" }}>
          <h2 style={{ color: "#092c49", fontSize: "24px", marginBottom: "12px", fontWeight: "700" }}>Article Not Found</h2>
          <p style={{ color: "#718096", marginBottom: "24px", lineHeight: "1.6" }}>
            {error || "The article you are looking for may have been moved or removed."}
          </p>
          <Link
            to="/blogs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "#f4512a",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            <ArrowLeft size={16} /> Back to All Articles
          </Link>
        </div>
      </div>
    );
  }

  const tags = Array.isArray(activePost.tags)
    ? activePost.tags
    : typeof activePost.tags === "string"
      ? activePost.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

  return (
    <>
      {/* Scroll Reading Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #f58220 0%, #cd101b 100%)",
          zIndex: 99999,
          transition: "width 0.1s ease-out",
        }}
      />

      <section className="BlogDetailsMain">
        <div className="BlogDetailsMain__container">
          {/* Main article */}
          <main className="BlogDetailsMain__article">
            {/* Breadcrumb Navigation */}
            <nav style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#718096", marginBottom: "20px", flexWrap: "wrap" }}>
              <Link to="/" style={{ color: "#718096", textDecoration: "none" }}>Home</Link>
              <span>/</span>
              <Link to="/blogs" style={{ color: "#718096", textDecoration: "none" }}>Blogs</Link>
              <span>/</span>
              <span style={{ color: "#f4512a", fontWeight: "500" }}>{activePost.category}</span>
            </nav>

            <div className="BlogDetailsMain__articleHeader">
              <span className="BlogDetailsMain__categoryBadge">
                {activePost.category}
              </span>

              <div className="BlogDetailsMain__titleRow">
                <h1 className="BlogDetailsMain__title">
                  {activePost.title}
                </h1>

                <button
                  type="button"
                  className={`BlogDetailsMain__bookmark ${bookmarked ? "is-active" : ""}`}
                  onClick={() => setBookmarked((v) => !v)}
                  aria-label={bookmarked ? "Remove bookmark" : "Bookmark article"}
                  title={bookmarked ? "Saved" : "Save article"}
                >
                  <Bookmark size={21} />
                </button>
              </div>

              <div className="BlogDetailsMain__meta">
                <span>
                  <CalendarDays size={16} />
                  {activePost.date || activePost.formattedDate || "Recent"}
                </span>

                <i />

                <span>
                  <UserRound size={16} />
                  By {activePost.author || "Admin"}
                </span>

                {activePost.location && (
                  <>
                    <i />
                    <span>
                      <MapPin size={16} />
                      {activePost.location}
                    </span>
                  </>
                )}

                <i />

                <span>
                  <Clock3 size={16} />
                  {activePost.readTime || "5 min read"}
                </span>

                <i />

                <span>
                  <Eye size={17} />
                  {activePost.views || 1} views
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="BlogDetailsMain__heroImage">
              <img
                src={resolveImage(activePost.image)}
                alt={activePost.title}
                fetchPriority="high"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=90";
                }}
              />

              <div className="BlogDetailsMain__imageOverlay">
                <span>
                  <Sparkles size={15} />
                  Prime Site Insights &bull; {activePost.category}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="BlogDetailsMain__articleBody">
              {activePost.shortDescription && (
                <p className="BlogDetailsMain__intro">
                  {activePost.shortDescription}
                </p>
              )}

              {/* Dynamic HTML Content */}
              {activePost.description?.includes("<") ? (
                <div
                  className="BlogDetailsMain__richContent"
                  dangerouslySetInnerHTML={{ __html: activePost.description }}
                />
              ) : (
                activePost.description?.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              )}
            </div>

            {/* Article footer */}
            <div className="BlogDetailsMain__articleFooter">
              {tags.length > 0 && (
                <div className="BlogDetailsMain__footerTags">
                  <Tag size={18} />
                  <span className="BlogDetailsMain__footerLabel">Tags:</span>

                  {tags.map((tag) => (
                    <span key={tag} className="BlogDetailsMain__footerTag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="BlogDetailsMain__share">
                <span className="BlogDetailsMain__footerLabel">Share:</span>

                <button
                  type="button"
                  className="BlogDetailsMain__socialButton"
                  onClick={() => shareOn("Facebook")}
                  aria-label="Share on Facebook"
                  title="Share on Facebook"
                >
                  <Globe size={16} />
                </button>

                <button
                  type="button"
                  className="BlogDetailsMain__socialButton"
                  onClick={() => shareOn("X")}
                  aria-label="Share on X"
                  title="Share on X (Twitter)"
                >
                  <span className="BlogDetailsMain__xLogo">&#120143;</span>
                </button>

                <button
                  type="button"
                  className="BlogDetailsMain__socialButton"
                  onClick={() => shareOn("LinkedIn")}
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                >
                  <span className="BlogDetailsMain__linkedinLogo">in</span>
                </button>

                <button
                  type="button"
                  className="BlogDetailsMain__socialButton"
                  onClick={() => shareOn("WhatsApp")}
                  aria-label="Share on WhatsApp"
                  title="Share on WhatsApp"
                >
                  <MessageCircle size={16} />
                </button>

                <button
                  type="button"
                  className="BlogDetailsMain__socialButton BlogDetailsMain__copyButton"
                  onClick={copyArticleLink}
                  aria-label="Copy article link"
                  title="Copy link"
                >
                  {copied ? <Check size={16} color="#16a34a" /> : <Copy size={15} />}
                </button>
              </div>
            </div>

            {copied && (
              <div className="BlogDetailsMain__copyNotice">
                <Check size={16} />
                Article link copied to clipboard!
              </div>
            )}

            {/* Author Profile Box */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "24px",
              background: "#fff8f7",
              borderRadius: "12px",
              marginTop: "36px",
              border: "1px solid #f0e3df"
            }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f4512a, #092c49)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: "700",
                flexShrink: 0
              }}>
                {(activePost.author || "A").charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: "17px", color: "#092c49", fontWeight: "700" }}>
                  Published by {activePost.author || "Admin"}
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: "#718096", lineHeight: "1.5" }}>
                  Contributing author and specialist at Prime Site Group. Sharing industry insights, project updates, and practical management solutions.
                </p>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="BlogDetailsMain__sidebar">
            {/* Search */}
            <section className="BlogDetailsMain__widget BlogDetailsMain__searchWidget">
              <form className="BlogDetailsMain__searchForm" onSubmit={handleSearch}>
                <input
                  type="search"
                  placeholder="Search articles..."
                  aria-label="Search articles"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" aria-label="Search">
                  <Search size={18} />
                </button>
              </form>
            </section>

            {/* Categories */}
            {categories.length > 0 && (
              <section className="BlogDetailsMain__widget BlogDetailsMain__categoryWidget">
                <h3 className="BlogDetailsMain__widgetTitle">Categories</h3>
                <ul className="BlogDetailsMain__categoryList" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {categories.map((cat) => (
                    <li key={cat.id || cat.name} style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      <Link
                        to={`/blogs?category=${encodeURIComponent(cat.name)}`}
                        className="BlogDetailsMain__categoryItem"
                      >
                        <span>{cat.name}</span>
                        <ChevronRight size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Recent Posts */}
            <section className="BlogDetailsMain__widget BlogDetailsMain__recentWidget">
              <h3 className="BlogDetailsMain__widgetTitle">Recent Articles</h3>
              <div className="BlogDetailsMain__recentList">
                {recentPosts
                  .filter((p) => p.id !== activePost.id)
                  .slice(0, 4)
                  .map((post) => (
                    <Link
                      key={post.id}
                      to={`/blogs/${post.slug || post.id}`}
                      className="BlogDetailsMain__recentCard"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="BlogDetailsMain__recentThumb">
                        <img
                          src={resolveImage(post.image)}
                          alt={post.title}
                          loading="lazy"
                        />
                      </div>
                      <div className="BlogDetailsMain__recentBody">
                        <span className="BlogDetailsMain__recentDate">
                          <CalendarDays size={13} />
                          {post.date || post.formattedDate}
                        </span>
                        <h4 className="BlogDetailsMain__recentTitle">
                          {post.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>

            {/* Contact Support Banner */}
            <section className="BlogDetailsMain__widget" style={{
              background: "linear-gradient(135deg, #092c49 0%, #0e3b61 100%)",
              color: "#fff",
              borderRadius: "12px",
              padding: "28px 24px",
              textAlign: "center"
            }}>
              <h3 style={{ margin: "0 0 10px", fontSize: "19px", color: "#fff", fontWeight: "700" }}>
                Need Tailored Services?
              </h3>
              <p style={{ margin: "0 0 18px", fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", lineHeight: "1.5" }}>
                Contact our expert workforce and facility teams for custom enterprise solutions.
              </p>
              <Link
                to="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  background: "#f4512a",
                  color: "#fff",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                Contact Us <ArrowUpRight size={15} />
              </Link>
            </section>
          </aside>
        </div>

        {/* Scroll To Top Button */}
        {showTopButton && (
          <button
            type="button"
            className="BlogDetailsMain__scrollTop"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Back to top"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </section>
    </>
  );
};

export default BlogDetailsMain;
