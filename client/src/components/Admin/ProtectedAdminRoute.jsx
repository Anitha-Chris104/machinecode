import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem("adminToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
