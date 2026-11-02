import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import FloatingForm from "./Components/FloatingForm/FloatingForm";
import FloatingIcon from "./Components/FloatingIcon/FloatingIcon";

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
import TransguardLiving from "./Pages/TransguardLiving/TransguardLiving";
import TransguardDelivery from "./Pages/TransguardDelivery/TransguardDelivery";
import KitchenMaintenanceSolutions from "./Pages/KitchenMaintenanceSolutions/KitchenMaintenanceSolutions";

// Component that listens for route changes and scrolls the window to the top
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "smooth" if you prefer animated scrolling
    });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      {/* Ensures viewport resets to top on every navigation */}
      <ScrollToTop />

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/cash-services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />




          
          <Route path="/services/security-services" element={<SecurityServices/>} />
          <Route path="/services/manpower-services" element={<ManPowerService/>} />
          <Route path="/services/workforce-solutions" element={<WorkforceSoluation/>} />
          <Route path="/services/facilities-management" element={<FacilityManagement/>} />
          <Route path="/services/aviation-services" element={<AviationServices/>} />
          <Route path="/services/managed-services" element={<ManagedServices/>} />
          <Route path="/services/taste-of-home" element={<TasteOfHome/>} />
          <Route path="/services/transguard-living" element={<TransguardLiving/>} />
          <Route path="/services/transguard-delivery" element={<TransguardDelivery/>} />
          <Route path="/services/kitchen-maintenance-solutions" element={<KitchenMaintenanceSolutions/>} />
        </Routes>
      </main>

      <Footer />

      {/* GLOBAL FLOATING ENQUIRY FORM */}
      <FloatingForm />
      <FloatingIcon />
    </BrowserRouter>
  );
};

export default App;