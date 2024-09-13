import { useLocation, useNavigate } from "react-router-dom";
import LocalStorageService from "./localStorage-services";
import { useEffect } from "react";
import ROUTES_URL from "../config/routes";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const route = useLocation();
  const token = LocalStorageService.getLoggedInUserToken();
  useEffect(() => {
    if (!token || token === undefined || token === null) {
      navigate(ROUTES_URL.LOGIN);
    }
    if (
      token &&
      token !== undefined &&
      token !== null &&
      (route.pathname === "/login" || route.pathname === "/")
    ) {
      navigate(ROUTES_URL.DASHBOARD);
    }
  }, [token]);

  return children;
};

export default ProtectedRoute;
