import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminProfile from "../../pages/Admin/AdminProfile";

const ProtectedAdminRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminProfile />
      <Outlet />
    </div>
  );
};

export default ProtectedAdminRoute;
