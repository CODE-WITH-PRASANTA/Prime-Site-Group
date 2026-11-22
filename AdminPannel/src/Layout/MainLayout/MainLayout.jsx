
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

import "./MainLayout.css";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  // Toggle sidebar
  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  // Close mobile sidebar
  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  // Close sidebar after navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`admin-layout ${
        collapsed ? "layout-collapsed" : ""
      }`}
    >
      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={closeMobileSidebar}
      />

      {/* MAIN AREA */}
      <div className="admin-main">

        {/* TOPBAR */}
        <Topbar
          onToggle={toggleSidebar}
          collapsed={collapsed}
        />

        {/* PAGE CONTENT */}
        <main className="admin-content">
          <div
            key={location.pathname}
            className="admin-page-content"
          >
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default MainLayout;
