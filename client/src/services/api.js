import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const isDevelopment = import.meta.env.DEV;
let isRedirectingToLogin = false;

// Attach the admin JWT to requests.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (isDevelopment) {
      console.debug("[API] Request:", config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Log failures and handle expired or invalid admin sessions.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const isAuthRequest =
      /\/admin\/(login|register|forgot-password|reset-password)(\/|$)/i.test(
        requestUrl,
      );

    if (isDevelopment) {
      console.error("[API] Request failed:", {
        method: error.config?.method?.toUpperCase(),
        endpoint: requestUrl,
        status: status ?? "Network error",
        message: error.message,
      });
    }

    const hasAdminToken = Boolean(localStorage.getItem("adminToken"));

    if (
      status === 401 &&
      hasAdminToken &&
      !isAuthRequest &&
      !isRedirectingToLogin
    ) {
      isRedirectingToLogin = true;
      localStorage.removeItem("adminToken");

      if (window.location.pathname !== "/admin/login") {
        window.location.replace("/admin/login");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
