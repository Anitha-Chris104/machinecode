// import express from "express";

// import {
//   createInquiry,
//   getInquiries,
//   getInquiryById,
//   updateInquiryStatus,
//   deleteInquiry,
//   getRecentInquiries,
// } from "../controllers/inquiryController.js";

// const router = express.Router();

// router.post("/", createInquiry);

// router.get("/", getInquiries);

// /* IMPORTANT: specific route BEFORE dynamic :id route */
// router.get("/recent", getRecentInquiries);

// router.get("/:id", getInquiryById);

// router.patch("/:id/status", updateInquiryStatus);

// export default router;
import express from "express";

import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
  getRecentInquiries,
} from "../controllers/inquiryController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public - website inquiry form
router.post("/", createInquiry);

// Admin - get all inquiries
router.get("/", protect, authorize("superadmin", "admin"), getInquiries);

// Admin - recent inquiries
router.get(
  "/recent",
  protect,
  authorize("superadmin", "admin"),
  getRecentInquiries,
);

// Admin - get single inquiry
router.get("/:id", protect, authorize("superadmin", "admin"), getInquiryById);

// Admin - update status
router.put(
  "/:id/status",
  protect,
  authorize("superadmin", "admin"),
  updateInquiryStatus,
);

// Admin - delete
router.delete("/:id", protect, authorize("superadmin", "admin"), deleteInquiry);

export default router;
