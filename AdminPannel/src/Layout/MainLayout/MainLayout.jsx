
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

import "./MainLayout.css";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/about": "About",
  "/blog": "Blog Management",
  "/cold-lead": "Cold Lead",
  "/enquiry": "Enquiry",
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  const currentTitle =
    pageTitles[location.pathname] || "Dashboard";

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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
    <div className={`admin-layout ${collapsed ? "layout-collapsed" : ""}`}>

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={closeMobileSidebar}
      />

      <div className="admin-main">

        <Topbar
          onToggle={toggleSidebar}
          collapsed={collapsed}
        />
      
      
      </div>
    </div>
  );
};

export default MainLayout;
