import express from "express";
import {
  createEnquiry,
  getEnquiries,
} from "../controllers/EnquiryController.js";

const router = express.Router();

router.post("/", createEnquiry);

router.get("/", getEnquiries);

export default router;
