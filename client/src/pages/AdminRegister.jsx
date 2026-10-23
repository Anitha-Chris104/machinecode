import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const AdminRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      setError("Please log in as a superadmin first.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/register",
        {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message || "Admin created successfully.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Check your login and permissions.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Create Admin Account
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Only a superadmin can create new admin accounts.
        </p>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {message && (
          <p
            role="status"
            className="mb-4 rounded bg-green-100 p-3 text-sm text-green-700"
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            name="password"
            type="password"
            placeholder="Password (minimum 8 characters)"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={8}
            required
            className="w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#852E47] p-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Admin"}
          </button>
        </form>

        <Link
          to="/admin"
          className="mt-5 block text-center text-sm font-semibold text-[#852E47]"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminRegister;
