import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import API, {
  AUTH_KEY,
  TOKEN_KEY,
  clearStoredAuth,
  getStoredToken,
} from "../../api/axios";

export { AUTH_KEY };

const ProtectedRoutes = () => {
  const location = useLocation();
  const token = getStoredToken();
  const [status, setStatus] = useState(token ? "checking" : "unauthenticated");

  useEffect(() => {
    const currentToken = getStoredToken();
    if (!currentToken) {
      setStatus("unauthenticated");
      return undefined;
    }

    // Keep sessionStorage synced if "Remember me" was checked previously
    if (sessionStorage.getItem(TOKEN_KEY) !== currentToken) {
      sessionStorage.setItem(TOKEN_KEY, currentToken);
      sessionStorage.setItem(AUTH_KEY, "true");
    }

    let isMounted = true;
    API.get("/auth/me")
      .then((res) => {
        if (!isMounted) return;
        if (res.data?.success) {
          setStatus("authenticated");
        } else {
          clearStoredAuth();
          setStatus("unauthenticated");
        }
      })
      .catch(() => {
        if (!isMounted) return;
        clearStoredAuth();
        setStatus("unauthenticated");
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  if (status === "unauthenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (status === "checking") {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
