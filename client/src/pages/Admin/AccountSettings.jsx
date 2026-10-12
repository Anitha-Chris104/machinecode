import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, LockKeyhole } from "lucide-react";
import api from "../../services/api";

const AccountSettings = () => {
  const navigate = useNavigate();

  const savedAdmin = JSON.parse(localStorage.getItem("admin") || "{}");

  const [profile, setProfile] = useState({
    name: savedAdmin.name || "",
    email: savedAdmin.email || "",
    currentPassword: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setProfileMessage("");
    setProfileError("");
    setProfileLoading(true);

    try {
      const response = await api.put("/admin/settings/profile", {
        name: profile.name,
        email: profile.email,
        currentPassword: profile.currentPassword,
      });

      const updatedAdmin = response.data.admin;

      localStorage.setItem("admin", JSON.stringify(updatedAdmin));

      setProfile((prev) => ({ ...prev, currentPassword: "" }));
      setProfileMessage(response.data.message);
    } catch (error) {
      setProfileError(
        error.response?.data?.message || "Unable to update profile.",
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (password.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await api.put("/admin/settings/password", {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      });

      setPasswordMessage(response.data.message);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");

      setTimeout(() => {
        navigate("/admin/login", { replace: true });
      }, 1200);
    } catch (error) {
      setPasswordError(
        error.response?.data?.message || "Unable to change password.",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        Account Settings
      </h1>
      <p className="mb-8 text-gray-500">
        Manage your superadmin profile and password.
      </p>

      <div className="grid max-w-5xl gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <UserRound className="text-orange-500" size={25} />
            <h2 className="text-xl font-semibold text-slate-800">
              Profile Information
            </h2>
          </div>

          {profileMessage && (
            <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {profileMessage}
            </p>
          )}
          {profileError && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {profileError}
            </p>
          )}

          <form onSubmit={updateProfile} className="space-y-4">
            <div>
              <label className="font-medium text-gray-700">Name</label>
              <input
                className={inputClass}
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">Email</label>
              <input
                className={inputClass}
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">
                Current Password
              </label>
              <input
                className={inputClass}
                type="password"
                name="currentPassword"
                value={profile.currentPassword}
                onChange={handleProfileChange}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {profileLoading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <LockKeyhole className="text-orange-500" size={25} />
            <h2 className="text-xl font-semibold text-slate-800">
              Change Password
            </h2>
          </div>

          {passwordMessage && (
            <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {passwordMessage}
            </p>
          )}
          {passwordError && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {passwordError}
            </p>
          )}

          <form onSubmit={updatePassword} className="space-y-4">
            <div>
              <label className="font-medium text-gray-700">
                Current Password
              </label>
              <input
                className={inputClass}
                type="password"
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                required
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">New Password</label>
              <input
                className={inputClass}
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                className={inputClass}
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full rounded-xl bg-[#0D244D] px-5 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {passwordLoading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AccountSettings;
