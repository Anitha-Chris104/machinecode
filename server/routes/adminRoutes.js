import express from "express";
import {
  loginAdmin,
  forgotPassword,
  resetPassword,
  updateSuperAdminProfile,
  changeSuperAdminPassword,
} from "../controllers/adminController.js";

import protect, { requireSuperAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Superadmin-only routes
router.put(
  "/settings/profile",
  protect,
  requireSuperAdmin,
  updateSuperAdminProfile,
);

router.put(
  "/settings/password",
  protect,
  requireSuperAdmin,
  changeSuperAdminPassword,
);

export default router;
