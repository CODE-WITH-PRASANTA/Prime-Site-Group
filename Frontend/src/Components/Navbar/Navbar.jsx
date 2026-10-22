import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import "./Navbar.css";
import logo from "../../assets/main-logo.png";

const serviceItems = [
  {
    title: "Cash Services",
    path: "/services/cash-services",
  },
  {
    title: "Security Services",
    path: "/services/security-services",
    submenu: [
      { title: "Manned Guarding", path: "/services/security-services/manned-guarding" },
      { title: "Electronic Security", path: "/services/security-services/electronic-security" },
      { title: "Security Consulting", path: "/services/security-services/security-consulting" },
    ],
  },
  {
    title: "Manpower Services",
    path: "/services/manpower-services",
    submenu: [
      { title: "General Staffing", path: "/services/manpower-services/general-staffing" },
      { title: "Recruitment Services", path: "/services/manpower-services/recruitment" },
    ],
  },
  {
    title: "Workforce Solutions",
    path: "/services/workforce-solutions",
    submenu: [
      { title: "Payroll Management", path: "/services/workforce-solutions/payroll" },
      { title: "Workforce Outsourcing", path: "/services/workforce-solutions/outsourcing" },
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
    title: "Transguard Living",
    path: "/services/transguard-living",
  },
  {
    title: "Transguard Delivery",
    path: "/services/transguard-delivery",
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

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setActiveSubmenu(null);
  };

  const toggleServices = () => {
    setServicesOpen((previous) => !previous);
    setActiveSubmenu(null);
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link
          to="/"
          className="navbar__logo"
          aria-label="Go to home page"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="Company Logo"
            className="navbar__logo-image"
          />
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="navbar__mobile-toggle"
          onClick={() => {
            setMobileMenuOpen((previous) => !previous);
            setServicesOpen(false);
            setActiveSubmenu(null);
          }}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          aria-controls="navbar-navigation"
        >
          {mobileMenuOpen ? <X size={27} /> : <Menu size={27} />}
        </button>

        {/* Navigation */}
        <nav
          id="navbar-navigation"
          className={`navbar__navigation ${
            mobileMenuOpen ? "navbar__navigation--open" : ""
          }`}
          aria-label="Main navigation"
        >
          <ul className="navbar__list">
            {navigationItems.slice(0, 2).map((item) => (
              <li className="navbar__item" key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? "navbar__link--active" : ""}`
                  }
                  onClick={closeMenu}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}

            {/* Services dropdown */}
            <li
              className={`navbar__item navbar__item--services ${
                servicesOpen ? "navbar__item--expanded" : ""
              }`}
              onMouseEnter={() => {
                if (window.matchMedia("(min-width: 992px)").matches) {
                  setServicesOpen(true);
                }
              }}
              onMouseLeave={() => {
                if (window.matchMedia("(min-width: 992px)").matches) {
                  setServicesOpen(false);
                  setActiveSubmenu(null);
                }
              }}
            >
              <div className="navbar__services-heading">
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `navbar__link navbar__services-link ${
                      isActive || servicesOpen
                        ? "navbar__link--active"
                        : ""
                    }`
                  }
                  onClick={closeMenu}
                >
                  Services
                </NavLink>

                <button
                  type="button"
                  className="navbar__dropdown-toggle"
                  onClick={toggleServices}
                  aria-label="Toggle services menu"
                  aria-expanded={servicesOpen}
                >
                  <ChevronDown
                    size={16}
                    className={`navbar__chevron ${
                      servicesOpen ? "navbar__chevron--open" : ""
                    }`}
                  />
                </button>
              </div>

              <div
                className={`navbar__mega-menu ${
                  servicesOpen ? "navbar__mega-menu--open" : ""
                }`}
              >
                <div className="navbar__mega-header">
                  <span className="navbar__mega-eyebrow">
                    OUR EXPERTISE
                  </span>
                  <h3 className="navbar__mega-title">
                    Services & Solutions
                  </h3>
                  <p className="navbar__mega-description">
                    Discover our services, built around your business needs.
                  </p>
                </div>

                <div className="navbar__service-grid">
                  {serviceItems.map((service) => (
                    <div
                      className={`navbar__service-item ${
                        activeSubmenu === service.title
                          ? "navbar__service-item--expanded"
                          : ""
                      }`}
                      key={service.path}
                    >
                      <div className="navbar__service-row">
                        <Link
                          to={service.path}
                          className="navbar__service-link"
                          onClick={closeMenu}
                        >
                          {service.title}
                        </Link>

                        {service.submenu && (
                          <button
                            type="button"
                            className="navbar__service-arrow"
                            aria-label={`Toggle ${service.title} submenu`}
                            aria-expanded={
                              activeSubmenu === service.title
                            }
                            onClick={() =>
                              setActiveSubmenu((previous) =>
                                previous === service.title
                                  ? null
                                  : service.title
                              )
                            }
                          >
                            <ChevronRight
                              size={17}
                              className={
                                activeSubmenu === service.title
                                  ? "navbar__submenu-chevron--open"
                                  : ""
                              }
                            />
                          </button>
                        )}
                      </div>

                      {service.submenu && (
                        <div
                          className={`navbar__nested-menu ${
                            activeSubmenu === service.title
                              ? "navbar__nested-menu--open"
                              : ""
                          }`}
                        >
                          {service.submenu.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="navbar__nested-link"
                              onClick={closeMenu}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Link
                  to="/services"
                  className="navbar__all-services"
                  onClick={closeMenu}
                >
                  Explore All Services
                  <ChevronRight size={17} />
                </Link>
              </div>
            </li>

            {navigationItems.slice(2).map((item) => (
              <li className="navbar__item" key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? "navbar__link--active" : ""}`
                  }
                  onClick={closeMenu}
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
