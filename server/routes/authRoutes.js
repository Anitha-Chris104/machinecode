import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only an authenticated superadmin can create another admin
router.post("/register", protect, authorize("superadmin"), registerAdmin);

// Admin login remains public
router.post("/login", loginAdmin);

export default router;
