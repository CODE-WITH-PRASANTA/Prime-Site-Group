
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

            {/* BLOG MANAGEMENT */}
            <Route path="/blog/add" element={<Blog/>} />
            <Route path="/blog" element={<Blogmanagement/>} />

            <Route path="/service-booking" element={<Service/>} />
            <Route path="/service/add" element={<Addservice/>} />
            
            <Route path="/career/add" element={<Addcareer/>} />
            <Route path="/career-management" element={<Careermanagement/>} />

            <Route path="/enquiry" element={<Contactenquairy/>} />

            <Route path="/profile" element={<Profile/>} />
            <Route path="/Settings" element={<Setting/>} />



            

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
