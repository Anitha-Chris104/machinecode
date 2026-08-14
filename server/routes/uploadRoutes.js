import express from "express";
import upload from "../middleware/upload.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import uploadBrochure from "../utils/uploadBrochure.js";

const router = express.Router();

router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    res.json({
      success: true,
      image: result.secure_url,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

router.post("/brochure", upload.single("brochure"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a brochure PDF.",
      });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed.",
      });
    }

    const result = await uploadBrochure(req.file.buffer);

    res.status(201).json({
      success: true,
      message: "Brochure uploaded successfully",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Brochure upload error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
