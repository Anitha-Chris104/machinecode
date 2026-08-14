import express from "express";

import upload from "../middleware/upload.js";

import {
  getProducts,
  getAdminProducts,
  getProductBySlug,
  getProductById,
  getRelatedProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// ==========================================
// PUBLIC
// ==========================================

router.get("/", getProducts);

router.get("/related", getRelatedProducts);

// ==========================================
// ADMIN
// ==========================================

// Get all products for admin
router.get(
  "/admin/list",
  protect,
  authorize("superadmin", "admin"),
  getAdminProducts,
);

// Get single product for admin
router.get(
  "/admin/:id",
  protect,
  authorize("superadmin", "admin"),
  getProductById,
);

// ==========================================
// PUBLIC SINGLE PRODUCT
// ==========================================

router.get("/:slug", getProductBySlug);

// ==========================================
// ADMIN ADD
// ==========================================

router.post(
  "/",
  protect,
  authorize("superadmin", "admin"),
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "brochure", maxCount: 1 },
  ]),
  addProduct,
);

// ==========================================
// ADMIN UPDATE
// ==========================================

router.put(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "brochure", maxCount: 1 },
  ]),
  updateProduct,
);

// ==========================================
// ADMIN DELETE
// ==========================================

router.delete("/:id", protect, authorize("superadmin", "admin"), deleteProduct);

export default router;
