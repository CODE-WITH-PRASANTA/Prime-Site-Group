
import React, { useEffect, useMemo, useState } from "react";
import {
  Clock3,
  UserRound,
  Eye,
  Search,
  ChevronRight,
  ArrowUp,
  Copy,
  Check,
  Share2,
  CalendarDays,
  Tag,
  Camera,
  Globe,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import "./BlogDetailsMain.css";

const BlogDetailsMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Popular");
  const [activeTag, setActiveTag] = useState("Service");
  const [activeCategory, setActiveCategory] = useState("");
  const [copied, setCopied] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const categories = [
    {
      name: "Business Related",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Branding Themes",
      image:
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Company",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Design",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=85",
    },
    {
      name: "Artists",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=85",
    },
  ];

  const posts = [
    {
      id: 1,
      category: "Cleaning",
      date: "Dec 24, 2024",
      title: "Cleaning & Renovation Service By Our Experts",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=90",
      excerpt:
        "Discover how professional cleaning and renovation services create healthier, fresher, and more productive spaces.",
      author: "Admin",
      readTime: "5 Min Read",
      views: 1250,
      tags: ["Cleaner", "Service", "Paint"],
    },
    {
      id: 2,
      category: "Electronics",
      date: "Dec 22, 2024",
      title: "AC Repair By Expert Home Service Business",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=90",
      excerpt:
        "Professional maintenance helps improve efficiency, extend equipment life, and keep your space comfortable.",
      author: "Admin",
      readTime: "4 Min Read",
      views: 980,
      tags: ["Electrical", "Service", "Maintenance"],
    },
    {
      id: 3,
      category: "Interior Info",
      date: "Dec 20, 2024",
      title: "The Ultimate Guide to Hiring Interior Service Experts",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90",
      excerpt:
        "Explore smart interior solutions that combine beautiful design, comfort, and practical functionality.",
      author: "Admin",
      readTime: "6 Min Read",
      views: 1500,
      tags: ["Creative", "Design", "Interior"],
    },
    {
      id: 4,
      category: "Carpentry",
      date: "Dec 18, 2024",
      title: "Top Trends in Carpentry Services for Modern Homes",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=90",
      excerpt:
        "Learn how skilled craftsmanship and thoughtful materials can transform everyday living spaces.",
      author: "Admin",
      readTime: "7 Min Read",
      views: 760,
      tags: ["Carpentry", "Creative", "Service"],
    },
    {
      id: 5,
      category: "Construction",
      date: "Dec 16, 2024",
      title: "The Ultimate Guide to Hiring Construction Experts Online",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=90",
      excerpt:
        "Understand the essentials of choosing experienced professionals for reliable construction projects.",
      author: "Admin",
      readTime: "5 Min Read",
      views: 1100,
      tags: ["Construction", "Planning", "Service"],
    },
    {
      id: 6,
      category: "Salons & Spa",
      date: "Dec 14, 2024",
      title: "Professional Personal Care Services for Your Busy Lifestyle",
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=90",
      excerpt:
        "Discover convenient personal care services designed to make your everyday routine easier.",
      author: "Admin",
      readTime: "3 Min Read",
      views: 650,
      tags: ["Care", "Lifestyle", "Service"],
    },
  ];

  const sidebarPosts = {
    Popular: [posts[2], posts[0], posts[4]],
    Recent: [posts[0], posts[1], posts[3]],
    Trendy: [posts[4], posts[2], posts[5]],
  };

  const tags = [
    "Electrical",
    "Creative",
    "Painting",
    "Arts",
    "Plumbing",
    "Cleaning",
  ];

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        !activeCategory || post.category === activeCategory;

      const matchesTag =
        !activeTag || post.tags.includes(activeTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, activeCategory, activeTag]);

  const activePost = posts[0];

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const section = document.getElementById("BlogDetailsMain-results");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCategory = (category) => {
    setActiveCategory((current) =>
      current === category ? "" : category
    );
    setActiveTag("");
  };

  const handleTag = (tag) => {
    setActiveTag((current) => (current === tag ? "" : tag));
    setActiveCategory("");
  };

  const shareOn = (platform) => {
    const url = window.location.href;
    const title = activePost.title;
    let shareUrl = "";

    switch (platform) {
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "X":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "LinkedIn":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "WhatsApp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
        break;
      default:
        return;
    }

    window.open(
      shareUrl,
      "_blank",
      "noopener,noreferrer,width=650,height=550"
    );
  };

  const copyArticleLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
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

  return (
    <section className="BlogDetailsMain">
      <div className="BlogDetailsMain__container">
        {/* Main article */}
        <main className="BlogDetailsMain__article">
          <div className="BlogDetailsMain__articleHeader">
            <button
              type="button"
              className="BlogDetailsMain__categoryBadge"
              onClick={() => handleCategory(activePost.category)}
            >
              {activePost.category}
            </button>

            <div className="BlogDetailsMain__titleRow">
              <h1 className="BlogDetailsMain__title">
                {activePost.title}
              </h1>

              <button
                type="button"
                className={`BlogDetailsMain__bookmark ${
                  bookmarked ? "is-active" : ""
                }`}
                onClick={() => setBookmarked((value) => !value)}
                aria-label={
                  bookmarked ? "Remove bookmark" : "Bookmark article"
                }
                title={bookmarked ? "Bookmarked" : "Save article"}
              >
                <Bookmark size={21} />
              </button>
            </div>

            <div className="BlogDetailsMain__meta">
              <span>
                <Clock3 size={17} />
                January 15, 2022
              </span>

              <i />

              <span>
                <UserRound size={17} />
                By {activePost.author}
              </span>

              <i />

              <span>
                <Eye size={18} />
                {activePost.readTime}
              </span>
            </div>
          </div>

          <div className="BlogDetailsMain__heroImage">
            <img
              src={activePost.image}
              alt={activePost.title}
              fetchPriority="high"
            />

            <div className="BlogDetailsMain__imageOverlay">
              <span>
                <CalendarDays size={15} />
                Professional Service Insights
              </span>
            </div>
          </div>

          <div className="BlogDetailsMain__articleBody">
            <p className="BlogDetailsMain__intro">
              In today&apos;s fast-paced world, on-demand services have
              become an integral part of our lives, offering convenience,
              efficiency, and flexibility. In this blog post, we explore
              the latest trends, practical solutions, and innovations
              shaping the service industry.
            </p>

            <p>
              From home maintenance and professional cleaning to
              renovation and specialist support, finding the right
              service provider can make a meaningful difference. The
              right team combines experience, reliable communication,
              and attention to detail to deliver results you can trust.
            </p>

            <h2>Exploring Service Success Stories</h2>

            <p>
              Discover the expanding range of services available today,
              from everyday household maintenance to specialist
              commercial solutions. Modern service providers are using
              better tools, smarter scheduling, and customer-focused
              processes to deliver a smoother experience.
            </p>

            <div className="BlogDetailsMain__imageGrid">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=85"
                  alt="Professional cleaning team at work"
                  loading="lazy"
                />
                <figcaption>Professional cleaning solutions</figcaption>
              </figure>

              <figure>
                <img
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=85"
                  alt="Clean and organised modern office"
                  loading="lazy"
                />
                <figcaption>Better spaces, better experiences</figcaption>
              </figure>
            </div>

            <p>
              Technology also helps service providers understand
              customer needs, improve response times, and offer more
              personalised experiences. Choosing a professional team
              with a clear process can save time while maintaining
              high-quality standards.
            </p>

            <h2>Celebrating Successes in Service</h2>

            <p>
              A successful service experience begins with understanding
              the project, setting realistic expectations, and selecting
              experienced professionals. Whether you are improving your
              home or maintaining a workplace, a structured approach
              helps create lasting results.
            </p>

            <p>
              Our goal is to make it easier to discover practical
              solutions, compare available services, and connect with
              professionals who value quality, reliability, and customer
              satisfaction.
            </p>
          </div>

          {/* Article footer */}
          <div className="BlogDetailsMain__articleFooter">
            <div className="BlogDetailsMain__footerTags">
              <Tag size={19} />
              <span className="BlogDetailsMain__footerLabel">Tags:</span>

              {activePost.tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`BlogDetailsMain__footerTag ${
                    activeTag === tag ? "is-active" : ""
                  }`}
                  onClick={() => handleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="BlogDetailsMain__share">
              <span className="BlogDetailsMain__footerLabel">
                Share:
              </span>

              <button
                type="button"
                className="BlogDetailsMain__socialButton"
                onClick={() => shareOn("Facebook")}
                aria-label="Share on Facebook"
                title="Facebook"
              >
                <Globe size={16} />
              </button>

              <button
                type="button"
                className="BlogDetailsMain__socialButton"
                onClick={() => shareOn("X")}
                aria-label="Share on X"
                title="X"
              >
                <span className="BlogDetailsMain__xLogo">𝕏</span>
              </button>

              <button
                type="button"
                className="BlogDetailsMain__socialButton"
                onClick={() => shareOn("LinkedIn")}
                aria-label="Share on LinkedIn"
                title="LinkedIn"
              >
                <span className="BlogDetailsMain__linkedinLogo">in</span>
              </button>

              <button
                type="button"
                className="BlogDetailsMain__socialButton"
                onClick={() => shareOn("WhatsApp")}
                aria-label="Share on WhatsApp"
                title="WhatsApp"
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
                {copied ? <Check size={16} /> : <Copy size={15} />}
              </button>
            </div>
          </div>

          {copied && (
            <div className="BlogDetailsMain__copyNotice">
              <Check size={16} />
              Article link copied successfully
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="BlogDetailsMain__sidebar">
          {/* Search */}
          <section className="BlogDetailsMain__widget BlogDetailsMain__searchWidget">
            <form
              className="BlogDetailsMain__searchForm"
              onSubmit={handleSearch}
            >
              <input
                type="search"
                placeholder="Search articles..."
                aria-label="Search articles"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />

              <button type="submit" aria-label="Search">
                <Search size={24} />
              </button>
            </form>
          </section>

          {/* Categories */}
          <section className="BlogDetailsMain__widget">
            <div className="BlogDetailsMain__widgetHeading">
              <div>
                <span className="BlogDetailsMain__eyebrow">
                  EXPLORE
                </span>
                <h2>Categories</h2>
              </div>
              <span className="BlogDetailsMain__headingIcon">
                <Tag size={20} />
              </span>
            </div>

            <div className="BlogDetailsMain__categoryList">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.name}
                  className={`BlogDetailsMain__categoryItem ${
                    activeCategory === category.name ? "is-active" : ""
                  }`}
                  style={{ "--category-image": `url("${category.image}")` }}
                  onClick={() => handleCategory(category.name)}
                >
                  <span>{category.name}</span>
                  <ChevronRight size={20} />
                </button>
              ))}
            </div>

            {activeCategory && (
              <button
                type="button"
                className="BlogDetailsMain__clearFilter"
                onClick={() => setActiveCategory("")}
              >
                Clear category filter
              </button>
            )}
          </section>

          {/* Popular / Recent / Trendy */}
          <section className="BlogDetailsMain__widget">
            <div className="BlogDetailsMain__tabs" role="tablist">
              {["Popular", "Recent", "Trendy"].map((tab) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  key={tab}
                  className={activeTab === tab ? "is-active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="BlogDetailsMain__popularList">
              {sidebarPosts[activeTab].map((post) => (
                <button
                  type="button"
                  key={post.id}
                  className="BlogDetailsMain__popularItem"
                  onClick={() => {
                    setSearchTerm(post.title);
                    setActiveCategory("");
                    setActiveTag("");
                    document
                      .getElementById("BlogDetailsMain-results")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <img src={post.image} alt="" loading="lazy" />

                  <span className="BlogDetailsMain__popularContent">
                    <span className="BlogDetailsMain__popularDate">
                      <Clock3 size={14} />
                      {post.date}
                    </span>
                    <strong>{post.title}</strong>
                    <span className="BlogDetailsMain__popularRead">
                      {post.readTime}
                      <ChevronRight size={14} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Tag cloud */}
          <section className="BlogDetailsMain__widget">
            <div className="BlogDetailsMain__widgetHeading">
              <div>
                <span className="BlogDetailsMain__eyebrow">
                  FIND YOUR INTEREST
                </span>
                <h2>Tag Cloud</h2>
              </div>
            </div>

            <div className="BlogDetailsMain__tagCloud">
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={activeTag === tag ? "is-active" : ""}
                  onClick={() => handleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            {(activeTag || activeCategory) && (
              <button
                type="button"
                className="BlogDetailsMain__clearFilter"
                onClick={() => {
                  setActiveTag("");
                  setActiveCategory("");
                }}
              >
                Clear all filters
              </button>
            )}
          </section>

          {/* Newsletter */}
          <section className="BlogDetailsMain__newsletter">
            <span className="BlogDetailsMain__newsletterIcon">
              <Share2 size={23} />
            </span>

            <span className="BlogDetailsMain__eyebrow">
              STAY INFORMED
            </span>

            <h2>Ideas worth sharing.</h2>

            <p>
              Explore practical tips, industry insights, and ideas for
              better everyday services.
            </p>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("BlogDetailsMain-results")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore articles
              <ChevronRight size={18} />
            </button>
          </section>
        </aside>
      </div>

      {/* Search and filtered article results */}
      <section
        className="BlogDetailsMain__results"
        id="BlogDetailsMain-results"
      >
        <div className="BlogDetailsMain__resultsHeading">
          <div>
            <span className="BlogDetailsMain__eyebrow">
              DISCOVER MORE
            </span>
            <h2>
              {searchTerm
                ? "Search Results"
                : activeCategory
                  ? activeCategory
                  : activeTag
                    ? `${activeTag} Articles`
                    : "More From Our Blog"}
            </h2>
          </div>

          <span className="BlogDetailsMain__resultCount">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {(searchTerm || activeCategory || activeTag) && (
          <div className="BlogDetailsMain__filterStatus">
            <span>
              Showing filtered articles
              {searchTerm ? ` for “${searchTerm}”` : ""}
            </span>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("");
                setActiveTag("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {filteredPosts.length > 0 ? (
          <div className="BlogDetailsMain__resultsGrid">
            {filteredPosts.map((post) => (
              <article
                className="BlogDetailsMain__resultCard"
                key={post.id}
              >
                <div className="BlogDetailsMain__resultImage">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <span>{post.category}</span>
                </div>

                <div className="BlogDetailsMain__resultContent">
                  <span className="BlogDetailsMain__resultDate">
                    <CalendarDays size={15} />
                    {post.date}
                  </span>

                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm(post.title);
                      setActiveCategory("");
                      setActiveTag("");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Read article
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="BlogDetailsMain__emptyState">
            <Search size={32} />
            <h3>No articles found</h3>
            <p>
              Try another keyword or clear the filters to see all articles.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("");
                setActiveTag("");
              }}
            >
              Show all articles
            </button>
          </div>
        )}
      </section>

      {/* Floating Go To Top */}
      <button
        type="button"
        className={`BlogDetailsMain__backToTop ${
          showTopButton ? "is-visible" : ""
        }`}
        onClick={scrollToTop}
        aria-label="Go to top"
        title="Go to top"
      >
        <span className="BlogDetailsMain__topLine" />
        <ArrowUp size={18} />
        <span>Go To Top</span>
      </button>
    </section>
  );
};

export default BlogDetailsMain;
