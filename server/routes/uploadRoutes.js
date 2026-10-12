import express from "express";
import upload from "../middleware/upload.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import uploadBrochure from "../utils/uploadBrochure.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin image upload
router.post(
  "/",
  protect,
  authorize("superadmin", "admin"),
  upload.array("images", 5),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No images uploaded.",
        });
      }

      const results = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer)),
      );

      const images = results.map((result) => result.secure_url);

      res.status(201).json({
        success: true,
        images,
        image: images[0],
      });
    } catch (error) {
      console.error("Upload Error:", error);

      res.status(500).json({
        success: false,
        message: "Image upload failed.",
      });
    }
  },
);

// Admin brochure upload
router.post(
  "/brochure",
  protect,
  authorize("superadmin", "admin"),
  upload.single("brochure"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a brochure PDF.",
        });
      }

      if (
        req.file.mimetype !== "application/pdf" ||
        !req.file.originalname.toLowerCase().endsWith(".pdf")
      ) {
        return res.status(400).json({
          success: false,
          message: "Only PDF files are allowed.",
        });
      }

      const result = await uploadBrochure(req.file.buffer);

      res.status(201).json({
        success: true,
        message: "Brochure uploaded successfully.",
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (error) {
      console.error("Brochure upload error:", error);

      res.status(500).json({
        success: false,
        message: "Brochure upload failed.",
      });
    }
  },
);

export default router;
