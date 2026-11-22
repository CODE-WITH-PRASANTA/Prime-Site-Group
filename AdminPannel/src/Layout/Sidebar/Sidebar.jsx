import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/admin-logo.png";
import "./Sidebar.css";

const MenuIcon = ({ type }) => {
  const icons = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    blog: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </>
    ),
    service: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18M10 12v2h4v-2" />
      </>
    ),
    career: (
      <>
        <rect x="3" y="5" width="18" height="15" rx="2" />
        <path d="M8 5V3h8v2M3 11h18M10 11v2h4v-2" />
      </>
    ),
    enquiry: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="m19.4 15 .1.1 1.4 1.1-1.5 2.6-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.9h-3l-.3-1.9a8 8 0 0 1-1.7-1l-1.7.7-1.5-2.6 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.5-2.6 1.7.7a8 8 0 0 1 1.7-1l.3-1.9h3l.3 1.9a8 8 0 0 1 1.7 1l1.7-.7 1.5 2.6-1.4 1.1a7 7 0 0 1 0 2Z" />
      </>
    ),
    applications: (
  <>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5" />
    <circle cx="12" cy="13" r="2" />
    <path d="M8.5 19a3.5 3.5 0 0 1 7 0" />
  </>
),
  };

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[type]}
    </svg>
  );
};

const menuItems = [
  { title: "Dashboard", path: "/dashboard", icon: "dashboard" },
  { title: "Blog Management", path: "/blog", icon: "blog" },
  { title: "Service Booking", path: "/service-booking", icon: "service" },
  { title: "Career Management", path: "/career-management", icon: "career" },
  { title: "Career Applications", path: "/career-applications", icon: "applications" },
  { title: "Contact Enquiry", path: "/contact-enquiry", icon: "enquiry" },
];

const accountItems = [
  { title: "Profile", path: "/profile", icon: "profile" },
  { title: "Settings", path: "/settings", icon: "settings" },
];

const Sidebar = ({
  collapsed = false,
  mobileOpen = false,
  onClose = () => {},
}) => {
  const renderMenuItems = (items) =>
    items.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        end
        title={collapsed ? item.title : ""}
        onClick={onClose}
        className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
      >
        <span className="sidebar-link-icon">
          <MenuIcon type={item.icon} />
        </span>
        <span className="sidebar-link-title">{item.title}</span>
        <span className="sidebar-active-indicator" />
      </NavLink>
    ));

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside
        className={`admin-sidebar ${collapsed ? "sidebar-collapsed" : ""} ${
          mobileOpen ? "sidebar-mobile-open" : ""
        }`}
      >
        {/* BRAND */}
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <img src={logo} alt="Prime Site Logo" />
          </div>

          <div className="sidebar-brand-text">
            <h2>Prime Site</h2>
            <span>ADMINISTRATION</span>
          </div>

          <button
            className="sidebar-mobile-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="sidebar-menu">
          <div className="sidebar-section">
            <p className="sidebar-heading">MAIN MENU</p>
            <nav className="sidebar-nav">{renderMenuItems(menuItems)}</nav>
          </div>

          <div className="sidebar-section sidebar-account">
            <p className="sidebar-heading">ACCOUNT</p>
            <nav className="sidebar-nav">{renderMenuItems(accountItems)}</nav>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-content">
            <span className="sidebar-footer-dot" />
            <span>Prime Site Admin</span>
            <small>v1.0</small>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;