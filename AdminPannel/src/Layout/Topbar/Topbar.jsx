import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Topbar.css";

const AUTH_KEY = "isAdminAuthenticated";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/blog": "Blog Management",
  "/service-booking": "Service Booking",
  "/career-management": "Career Management",
  "/contact-enquiry": "Contact Enquiry",
  "/profile": "Profile",
  "/settings": "Settings",
};

const Topbar = ({ onToggle, collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const searchRef = useRef(null);
  const wrapperRef = useRef(null);

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  // Close dropdowns on outside click / Esc, and Ctrl + / to focus search
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowProfile(false);
        setShowNotifications(false);
      }
    };

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setShowProfile(false);
        setShowNotifications(false);
      }
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleLogout = () => {
    setShowProfile(false);
    setShowNotifications(false);

    // Clear both stores, otherwise "Remember me" logs you straight back in
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);

    navigate("/login", { replace: true });
  };

  return (
    <header className="admin-topbar" ref={wrapperRef}>
      <div className="topbar-left">
        <button
          className="topbar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="topbar-page-title">{currentTitle}</div>
      </div>

      <div className="topbar-center">
        <div className="topbar-search">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            ref={searchRef}
            type="search"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <kbd>Ctrl /</kbd>
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-mobile-search">
          <button
            className="topbar-icon-btn"
            aria-label="Search"
            onClick={() => searchRef.current?.focus()}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div className="topbar-dropdown-wrapper">
          <button
            className="topbar-icon-btn notification-button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            aria-label="Notifications"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>
            <span className="notification-count">3</span>
          </button>

          {showNotifications && (
            <div className="topbar-dropdown notification-dropdown">
              <h4>Notifications</h4>
              <p>You have 3 new notifications.</p>
              <div className="notification-item">
                <span>●</span>
                New property enquiry received.
              </div>
              <div className="notification-item">
                <span>●</span>
                New property listing added.
              </div>
              <div className="notification-item">
                <span>●</span>
                New lead received.
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="topbar-dropdown-wrapper">
          <button
            className="topbar-profile"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
          >
            <div className="profile-avatar">
              AU
              <span className="profile-online"></span>
            </div>

            <div className="profile-info">
              <strong>Admin User</strong>
              <span>Super Admin</span>
            </div>

            <svg className="profile-chevron" viewBox="0 0 24 24">
              <path d="m7 10 5 5 5-5" />
            </svg>
          </button>

          {showProfile && (
            <div className="topbar-dropdown profile-dropdown">
              <div className="profile-dropdown-heading">
                <strong>Admin User</strong>
                <span>Super Admin</span>
              </div>

              <button
                onClick={() => {
                  setShowProfile(false);
                  navigate("/profile");
                }}
              >
                My Profile
              </button>

              <button
                onClick={() => {
                  setShowProfile(false);
                  navigate("/settings");
                }}
              >
                Account Settings
              </button>

              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;