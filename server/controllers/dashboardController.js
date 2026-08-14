import Product from "../models/Product.js";
import Enquiry from "../models/Enquiry.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalProducts,
      activeProducts,
      totalEnquiries,
      newEnquiries,
      contactedEnquiries,
      closedEnquiries,
      recentEnquiries,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "New" }),
      Enquiry.countDocuments({ status: "Contacted" }),
      Enquiry.countDocuments({ status: "Closed" }),

      Enquiry.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email subject status createdAt"),
    ]);

    res.status(200).json({
      success: true,

      data: {
        products: {
          total: totalProducts,
          active: activeProducts,
        },

        enquiries: {
          total: totalEnquiries,
          new: newEnquiries,
          contacted: contactedEnquiries,
          closed: closedEnquiries,
        },

        recentEnquiries,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
