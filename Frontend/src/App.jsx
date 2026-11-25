
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import FloatingForm from "./Components/FloatingForm/FloatingForm";
import FloatingIcon from "./Components/FloatingIcon/FloatingIcon";
import Loader from "./Components/Loader/Loader";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Services from "./Pages/Services/Services";
import Contact from "./Pages/Contact/Contact";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import Faq from "./Pages/Faq/Faq";
import Blog from "./Pages/Blog/Blog";
import Career from "./Pages/Career/Career";

import SecurityServices from "./Pages/SecurityServices/SecurityServices";
import ManPowerService from "./Pages/ManPowerService/ManPowerService";
import WorkforceSoluation from "./Pages/WorkforceSoluation/WorkforceSoluation";
import FacilityManagement from "./Pages/FacilityManagement/FacilityManagement";
import AviationServices from "./Pages/AviationServices/AviationServices";
import ManagedServices from "./Pages/ManagedServices/ManagedServices";
import TasteOfHome from "./Pages/TasteOfHome/TasteOfHome";
import KitchenMaintenanceSolutions from "./Pages/KitchenMaintenanceSolutions/KitchenMaintenanceSolutions";
import PrimeSiteLiving from "./Pages/PrimeSiteLiving/PrimeSiteLiving";
import PrimeSiteDelivery from "./Pages/PrimeSiteDelivery/PrimeSiteDelivery";

// Scroll To Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

// Main App Content
const AppContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loader shows only when website initially opens or refreshes
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Initial Page Loader */}
      {loading && <Loader />}

      {/* Scroll to Top */}
      <ScrollToTop />

      {/* Navbar */}
      <Navbar />

      {/* Website Pages */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/git " element={<Services />} />
          <Route path="/services/cash-services" element={<Services />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          <Route path="/-detailsblog" element={<BlogDetails />} />

          <Route path="/faq" element={<Faq />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/services/security-services"
            element={<SecurityServices />}
          />

          <Route
            path="/services/manpower-services"
            element={<ManPowerService />}
          />

          <Route
            path="/services/workforce-solutions"
            element={<WorkforceSoluation />}
          />

          <Route
            path="/services/facilities-management"
            element={<FacilityManagement />}
          />

          <Route
            path="/services/aviation-services"
            element={<AviationServices />}
          />

          <Route
            path="/services/managed-services"
            element={<ManagedServices />}
          />

          <Route
            path="/services/taste-of-home"
            element={<TasteOfHome />}
          />

          <Route
            path="/services/prime-site-living"
            element={<PrimeSiteLiving />}
          />

          <Route
            path="/services/prime-site-delivery"
            element={<PrimeSiteDelivery />}
          />

          <Route
            path="/services/kitchen-maintenance-solutions"
            element={<KitchenMaintenanceSolutions />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Components */}
      <FloatingForm />
      <FloatingIcon />
    </>
  );
};

// Main App
const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
