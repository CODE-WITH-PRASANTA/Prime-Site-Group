import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import "./Navbar.css";
import logo from "../../assets/PRIME SITE LOGO.png";

const serviceItems = [
  {
    title: "Cash Services",
    path: "/services/cash-services",
  },
  {
    title: "Security Services",
    path: "/services/security-services",
    submenu: [
      {
        title: "Manned Guarding",
        path: "/services/security-services/manned-guarding",
      },
      {
        title: "Electronic Security",
        path: "/services/security-services/electronic-security",
      },
      {
        title: "Security Consulting",
        path: "/services/security-services/security-consulting",
      },
    ],
  },
  {
    title: "Manpower Services",
    path: "/services/manpower-services",
    submenu: [
      {
        title: "General Staffing",
        path: "/services/manpower-services/general-staffing",
      },
      {
        title: "Recruitment Services",
        path: "/services/manpower-services/recruitment",
      },
    ],
  },
  {
    title: "Workforce Solutions",
    path: "/services/workforce-solutions",
    submenu: [
      {
        title: "Payroll Management",
        path: "/services/workforce-solutions/payroll",
      },
      {
        title: "Workforce Outsourcing",
        path: "/services/workforce-solutions/outsourcing",
      },
    ],
  },
  {
    title: "Facilities Management",
    path: "/services/facilities-management",
  },
  {
    title: "Aviation Services",
    path: "/services/aviation-services",
  },
  {
    title: "Managed Services",
    path: "/services/managed-services",
  },
  {
    title: "Taste of Home",
    path: "/services/taste-of-home",
  },
  {
    title: "Prime Site Living",
    path: "/services/prime-site-living",
  },
  {
    title: "Prime Site Delivery",
    path: "/services/prime-site-delivery",
  },
  {
    title: "Kitchen Maintenance Solutions",
    path: "/services/kitchen-maintenance-solutions",
  },
];

const navigationItems = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Blog", path: "/blog" },
  { title: "Career", path: "/career" },
  { title: "FAQ", path: "/faq" },
  { title: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const navbarRef = useRef(null);
  const location = useLocation();

  // Close the navigation after an actual route change.
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setActiveSubmenu(null);
  }, [location.pathname]);

  // Close menus when clicking outside the navbar.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
        setActiveSubmenu(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // Close menus when the user presses Escape.
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setActiveSubmenu(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setActiveSubmenu(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((previous) => !previous);

    // Reset dropdowns only when toggling the main mobile menu.
    setServicesOpen(false);
    setActiveSubmenu(null);
  };

  const toggleServices = () => {
    setServicesOpen((previous) => !previous);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (title) => {
    setActiveSubmenu((previous) =>
      previous === title ? null : title
    );
  };

  const handleServicesMouseEnter = () => {
    if (window.matchMedia("(min-width: 992px)").matches) {
      setServicesOpen(true);
    }
  };

  const handleServicesMouseLeave = () => {
    if (window.matchMedia("(min-width: 992px)").matches) {
      setServicesOpen(false);
      setActiveSubmenu(null);
    }
  };

  return (
    <header className="navbar" ref={navbarRef}>
      <div className="navbar__container">
        {/* Logo */}
        <Link
          to="/"
          className="navbar__logo"
          aria-label="Go to home page"
          onClick={closeMobileMenu}
        >
          <img
            src={logo}
            alt="Prime Site Logo"
            className="navbar__logo-image"
          />
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="navbar__mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label={
            mobileMenuOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="navbar-navigation"
        >
          {mobileMenuOpen ? (
            <X size={27} />
          ) : (
            <Menu size={27} />
          )}
        </button>

        {/* Navigation */}
        <nav
          id="navbar-navigation"
          className={`navbar__navigation ${
            mobileMenuOpen
              ? "navbar__navigation--open"
              : ""
          }`}
          aria-label="Main navigation"
        >
          <ul className="navbar__list">
            {/* Home and About */}
            {navigationItems.slice(0, 2).map((item) => (
              <li
                className="navbar__item"
                key={item.path}
              >
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `navbar__link ${
                      isActive
                        ? "navbar__link--active"
                        : ""
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}

            {/* Services dropdown */}
            <li
              className={`navbar__item navbar__item--services ${
                servicesOpen
                  ? "navbar__item--expanded"
                  : ""
              }`}
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <div className="navbar__services-heading">
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `navbar__link navbar__services-link ${
                      isActive
                        ? "navbar__link--active"
                        : ""
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  Services
                </NavLink>

                <button
                  type="button"
                  className="navbar__dropdown-toggle"
                  onClick={toggleServices}
                  aria-label="Toggle services menu"
                  aria-expanded={servicesOpen}
                  aria-controls="navbar-services-menu"
                >
                  <ChevronDown
                    size={17}
                    className={`navbar__chevron ${
                      servicesOpen
                        ? "navbar__chevron--open"
                        : ""
                    }`}
                  />
                </button>
              </div>

              {/* Keep this element mounted for smooth animation. */}
              <div
                id="navbar-services-menu"
                className={`navbar__mega-menu ${
                  servicesOpen
                    ? "navbar__mega-menu--open"
                    : ""
                }`}
                aria-hidden={!servicesOpen}
                inert={!servicesOpen}
              >
                <div className="navbar__mega-content">
                  {/* Menu heading */}
                  <div className="navbar__mega-header">
                    <span className="navbar__mega-eyebrow">
                      OUR EXPERTISE
                    </span>

                    <h3 className="navbar__mega-title">
                      Services &amp; Solutions
                    </h3>

                    <p className="navbar__mega-description">
                      Discover our services, built around your
                      business needs.
                    </p>
                  </div>

                  {/* Service list */}
                  <div className="navbar__service-grid">
                    {serviceItems.map((service) => {
                      const submenuIsOpen =
                        activeSubmenu === service.title;

                      return (
                        <div
                          className={`navbar__service-item ${
                            submenuIsOpen
                              ? "navbar__service-item--expanded"
                              : ""
                          }`}
                          key={service.path}
                        >
                          <div className="navbar__service-row">
                            <Link
                              to={service.path}
                              className="navbar__service-link"
                            >
                              <span>{service.title}</span>
                            </Link>

                            {service.submenu && (
                              <button
                                type="button"
                                className="navbar__service-arrow"
                                onClick={() =>
                                  toggleSubmenu(service.title)
                                }
                                aria-label={`Toggle ${service.title} submenu`}
                                aria-expanded={submenuIsOpen}
                              >
                                <ChevronRight
                                  size={17}
                                  className={
                                    submenuIsOpen
                                      ? "navbar__submenu-chevron--open"
                                      : ""
                                  }
                                />
                              </button>
                            )}
                          </div>

                          {/* Nested submenu */}
                          {service.submenu && (
                            <div
                              className={`navbar__nested-menu ${
                                submenuIsOpen
                                  ? "navbar__nested-menu--open"
                                  : ""
                              }`}
                              aria-hidden={!submenuIsOpen}
                              inert={!submenuIsOpen}
                            >
                              <div className="navbar__nested-inner">
                                {service.submenu.map(
                                  (subItem) => (
                                    <Link
                                      key={subItem.path}
                                      to={subItem.path}
                                      className="navbar__nested-link"
                                    >
                                      <span className="navbar__nested-dot" />
                                      <span>
                                        {subItem.title}
                                      </span>
                                    </Link>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* All services link */}
                  <Link
                    to="/services"
                    className="navbar__all-services"
                  >
                    <span>Explore All Services</span>
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </li>

            {/* Blog, Career, FAQ and Contact */}
            {navigationItems.slice(2).map((item) => (
              <li
                className="navbar__item"
                key={item.path}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `navbar__link ${
                      isActive
                        ? "navbar__link--active"
                        : ""
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;