
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./Pages/Dashboard/Dashboard";
import MainLayout from "./Layout/MainLayout/MainLayout";
import Login from "./Components/Login/Login";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

import Blog from "./Pages/Blog/Blog";
import Blogmanagement from "./Components/Blogmanagement/Blogmanagement";
import Service from "./Pages/Service/Service";
import Addservice from "./Components/Addservice/Addservice";
import Addcareer from "./Components/Addcareer/Addcareer";
import Careermanagement from "./Pages/Careermanagement/Careermanagement";
import Contactenquairy from "./Pages/Contactenquairy/Contactenquairy";
import Profile from "./Pages/Profile/Profile";
import Setting from "./Pages/Setting/Setting";
import CareerApplications from "./Components/CareerApplications/CareerApplications";
import AddblogMain from "./Components/AddblogMain/AddblogMain";
import BlogCategory from "./Components/BlogCategory/BlogCategory";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTE */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<MainLayout />}>

            {/* DEFAULT ROUTE */}
            <Route
              index
              element={<Navigate to="/dashboard" replace />}
            />

            {/* DASHBOARD */}
            <Route path="dashboard" element={<Dashboard />} />

            {/* BLOG */}
            <Route path="blog" element={<Blogmanagement />} />
            <Route path="blog/add" element={<AddblogMain />} />
            <Route path="blog/edit/:id" element={<AddblogMain />} />
            <Route path="blog/category" element={<BlogCategory />} />
            <Route path="blog/categories" element={<Navigate to="/blog/category" replace />} />

            {/* SERVICE */}
            <Route path="service-booking" element={<Service />} />
            <Route path="service/add" element={<Addservice />} />

            {/* CAREER */}
            <Route path="career/add" element={<Addcareer />} />
            <Route
              path="career-management"
              element={<Careermanagement />}
            />
            <Route
              path="career-applications"
              element={<CareerApplications />}
            />

            {/* ENQUIRY */}
            <Route
              path="enquiry"
              element={<Contactenquairy />}
            />
            <Route
              path="contact-enquiry"
              element={<Navigate to="/enquiry" replace />}
            />

            {/* PROFILE */}
            <Route path="profile" element={<Profile />} />

            {/* SETTINGS */}
            <Route path="settings" element={<Setting />} />

          </Route>
        </Route>

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
