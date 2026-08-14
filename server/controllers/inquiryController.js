import Inquiry from "../models/Inquiry.js";
import Product from "../models/Product.js";

export const createInquiry = async (req, res) => {
  try {
    const { productId, name, email, phone, company, message } = req.body;

    // Validate required fields
    if (!productId || !name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // Check product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Create inquiry
    const inquiry = await Inquiry.create({
      product: product._id,
      productName: product.name,
      name,
      email,
      phone,
      company,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
      data: inquiry,
    });
  } catch (error) {
    console.error("Create inquiry error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL INQUIRIES
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("product", "name slug images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error("Get inquiries error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE INQUIRY
export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).populate(
      "product",
      "name slug images",
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error("Get inquiry error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE INQUIRY STATUS
export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["new", "contacted", "converted", "closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry status.",
      });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry status updated successfully.",
      data: inquiry,
    });
  } catch (error) {
    console.error("Update inquiry status error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE INQUIRY
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Delete inquiry error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecentInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error("Recent inquiries error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
