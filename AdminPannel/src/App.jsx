
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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTE */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<MainLayout />}>

            {/* Default Route */}
            <Route
              index
              element={<Navigate to="/dashboard" replace />}
            />

            {/* Dashboard */}
            <Route
              path="dashboard"
              element={<Dashboard />}
            />

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
