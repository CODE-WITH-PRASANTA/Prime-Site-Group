
import React, { useEffect, useRef, useState } from "react";
import {
  Clock3,
  ArrowUpRight,
  MoveRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./Blog.css";

const Blog = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const BLOGS_PER_PAGE = 6;

  const blogs = [
    {
      id: 1,
      category: "Electronics",
      date: "Dec 24, 2024",
      title: "AC Repair By Expert Home Service Business",
      description:
        "In today's fast-paced world, on-demand services offer convenience, efficiency, and flexibility for modern homes and businesses.",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=85",
      readTime: "5 min read",
    },
    {
      id: 2,
      category: "Cleaning",
      date: "Dec 24, 2024",
      title: "Clean Beyond Expectations, Only with Servat.",
      description:
        "Discover how professional cleaning services create healthier, fresher spaces with reliable solutions tailored to your needs.",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85",
      readTime: "4 min read",
    },
    {
      id: 3,
      category: "Salons & Spa",
      date: "Dec 24, 2024",
      title: "Get Beard Shaving Service At Low Price.",
      description:
        "Explore modern grooming trends and discover how expert barbers deliver a comfortable, polished, and professional experience.",
      image:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=85",
      readTime: "6 min read",
    },
    {
      id: 4,
      category: "Interior Info",
      date: "Dec 24, 2024",
      title: "The Ultimate Guide to Hiring Interior Service Experts",
      description:
        "Transform your living space with thoughtful interior planning, quality craftsmanship, and professionals who understand your vision.",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
      readTime: "7 min read",
    },
    {
      id: 5,
      category: "Carpentry",
      date: "Dec 24, 2024",
      title: "Top Trends in Carpentry Services for 2024",
      description:
        "From custom furniture to modern woodwork, explore the craftsmanship and design ideas shaping today's interiors.",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=85",
      readTime: "5 min read",
    },
    {
      id: 6,
      category: "Construction",
      date: "Dec 24, 2024",
      title: "The Ultimate Guide to Hiring Experts Online",
      description:
        "Learn how to choose experienced professionals, compare services, and make confident decisions for your next project.",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85",
      readTime: "6 min read",
    },

    // Page 2
    {
      id: 7,
      category: "Plumbing",
      date: "Jan 08, 2025",
      title: "Essential Plumbing Tips Every Homeowner Should Know",
      description:
        "Learn practical ways to prevent leaks, maintain your plumbing system, and keep your home running smoothly.",
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1000&q=85",
      readTime: "5 min read",
    },
    {
      id: 8,
      category: "Electrical",
      date: "Jan 12, 2025",
      title: "Choosing a Reliable Electrician for Your Home",
      description:
        "Understand what to look for in a qualified professional and why safe electrical work matters in every property.",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=85",
      readTime: "4 min read",
    },
    {
      id: 9,
      category: "Home Care",
      date: "Jan 16, 2025",
      title: "Simple Home Maintenance Ideas That Save Money",
      description:
        "A practical maintenance routine can protect your property, reduce unexpected repairs, and improve everyday comfort.",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=85",
      readTime: "6 min read",
    },
    {
      id: 10,
      category: "Gardening",
      date: "Jan 20, 2025",
      title: "Create a Beautiful Garden with Professional Care",
      description:
        "Discover how the right garden planning, seasonal maintenance, and expert care can transform outdoor spaces.",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1000&q=85",
      readTime: "5 min read",
    },
    {
      id: 11,
      category: "Painting",
      date: "Jan 24, 2025",
      title: "How to Choose the Perfect Colours for Your Home",
      description:
        "Explore colour combinations, finishes, and professional painting tips to create a home that feels uniquely yours.",
      image:
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1000&q=85",
      readTime: "7 min read",
    },
    {
      id: 12,
      category: "Moving",
      date: "Jan 28, 2025",
      title: "Make Your Next Home Move Easier and Stress-Free",
      description:
        "Plan a smoother relocation with practical packing advice, organised scheduling, and dependable moving services.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      readTime: "5 min read",
    },
  ];

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;

  const currentBlogs = blogs.slice(
    startIndex,
    startIndex + BLOGS_PER_PAGE
  );

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

  const changePage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);
    setIsVisible(true);

    requestAnimationFrame(() => {
      if (sectionRef.current) {
        const top =
          sectionRef.current.getBoundingClientRect().top +
          window.scrollY -
          35;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    });
  };

  return (
    <section
      className={`Blog ${isVisible ? "Blog--visible" : ""}`}
      ref={sectionRef}
    >
      <div className="Blog__container">
        <header className="Blog__header">
          <div className="Blog__eyebrow">
            <span className="Blog__eyebrowLine" />
            <span>OUR LATEST STORIES</span>
          </div>

          <div className="Blog__headingRow">
            <div className="Blog__headingContent">
              <h2 className="Blog__title">
                Insights & <span>Inspiration</span>
              </h2>

              <p className="Blog__intro">
                Expert advice, fresh ideas, and practical tips to
                help you make better decisions for your home and
                business.
              </p>
            </div>

            <a className="Blog__viewAll" href="/blog">
              <span>Explore All Articles</span>
              <span className="Blog__viewAllIcon">
                <MoveRight size={19} />
              </span>
            </a>
          </div>
        </header>

        <div className="Blog__grid" key={currentPage}>
          {currentBlogs.map((blog, index) => (
            <article
              className="Blog__card"
              key={blog.id}
              style={{
                "--Blog-delay": `${index * 90}ms`,
              }}
            >
              <a
                className="Blog__imageLink"
                href={`/blog/${blog.id}`}
                aria-label={`Read ${blog.title}`}
              >
                <div className="Blog__imageWrapper">
                  <img
                    className="Blog__image"
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                  />

                  <span className="Blog__imageOverlay" />

                  <span className="Blog__category">
                    {blog.category}
                  </span>

                  <span className="Blog__imageArrow">
                    <ArrowUpRight size={23} />
                  </span>
                </div>
              </a>

              <div className="Blog__cardBody">
                <div className="Blog__meta">
                  <span className="Blog__date">
                    <Clock3 size={17} strokeWidth={1.6} />
                    {blog.date}
                  </span>

                  <span className="Blog__readTime">
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="Blog__cardTitle">
                  <a href={`/blog/${blog.id}`}>
                    {blog.title}
                  </a>
                </h3>

                <p className="Blog__description">
                  {blog.description}
                </p>

                <a
                  className="Blog__readMore"
                  href={`/blog/${blog.id}`}
                >
                  <span>Read Article</span>
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            className="Blog__pagination"
            aria-label="Blog pagination"
          >
            <button
              type="button"
              className="Blog__pageArrow"
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={19} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={`Blog__pageNumber ${
                  currentPage === page
                    ? "Blog__pageNumber--active"
                    : ""
                }`}
                onClick={() => changePage(page)}
                aria-label={`Go to page ${page}`}
                aria-current={
                  currentPage === page ? "page" : undefined
                }
              >
                {String(page).padStart(2, "0")}
              </button>
            ))}

            <button
              type="button"
              className="Blog__pageArrow"
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={19} />
            </button>
          </nav>
        )}

        <div className="Blog__paginationInfo">
          Showing{" "}
          <strong>{startIndex + 1}</strong>– 
          <strong>
            {Math.min(startIndex + BLOGS_PER_PAGE, blogs.length)}
          </strong>{" "}
          of <strong>{blogs.length}</strong> articles
        </div>

        <div className="Blog__bottom">
          <span className="Blog__bottomLine" />

          <p className="Blog__bottomText">
            Ideas that inspire. Knowledge that makes a difference.
          </p>

          <span className="Blog__bottomLine" />
        </div>
      </div>
    </section>
  );
};

export default Blog;
