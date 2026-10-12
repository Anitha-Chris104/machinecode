import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No valid token provided.",
      });
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured.");

      return res.status(500).json({
        success: false,
        message: "Authentication service is not configured.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id || typeof decoded.id !== "string") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    console.error("Authentication middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed due to a server error.",
    });
  }
};

export const requireSuperAdmin = (req, res, next) => {
  if (!req.admin || req.admin.role !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Superadmin permission required.",
    });
  }

  next();
};

export default protect;
