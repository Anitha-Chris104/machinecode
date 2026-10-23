import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const savedAdmin = localStorage.getItem("admin");
      if (savedAdmin) {
        setAdmin(JSON.parse(savedAdmin));
      }
    } catch {
      setAdmin(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login", { replace: true });
  };

  const name = admin?.name || "Admin";
  const email = admin?.email || "";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="relative flex justify-end border-b bg-white px-6 py-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Open admin profile"
        className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-gray-100"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#852E47] font-bold text-white">
          {initial}
        </div>

        <div className="hidden text-left sm:block">
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{admin?.role || "Admin"}</p>
        </div>

        <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-6 top-[calc(100%-4px)] z-50 w-72 rounded-xl border bg-white p-4 shadow-lg">
          <div className="mb-3 border-b pb-3">
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="mt-1 break-all text-sm text-gray-500">
              {email || "Email unavailable"}
            </p>
            <p className="mt-2 text-xs capitalize text-[#852E47]">
              Role: {admin?.role || "admin"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate("/admin/settings");
            }}
            className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
          >
            Account Settings
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
