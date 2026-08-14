import Product from "../models/Product.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      page = 1,
      limit = 8,
      sort = "newest",
    } = req.query;

    const query = {
      isActive: true,
    };

    // Search
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          shortDescription: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Category
    if (category && category !== "All") {
      query.category = category;
    }

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "az":
        sortOption = { name: 1 };
        break;

      case "za":
        sortOption = { name: -1 };
        break;

      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,

      total,

      page: Number(page),

      totalPages: Math.ceil(total / limit),

      count: products.length,

      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// GET SINGLE PRODUCT
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//GET RELATED PRODUCTS
export const getRelatedProducts = async (req, res) => {
  try {
    const { category, slug } = req.query;

    if (!category || !slug) {
      return res.status(400).json({
        success: false,
        message: "Category and slug are required",
      });
    }

    const products = await Product.find({
      category,
      slug: { $ne: slug },
      isActive: true,
    })
      .limit(4)
      .select("name slug category shortDescription images");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Get related products error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Add product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      shortDescription,
      description,
      specifications,
      features,
      applications,
      industries,
      faq,
    } = req.body;

    // Check duplicate slug
    const existingProduct = await Product.findOne({ slug });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "A product with this slug already exists.",
      });
    }

    // Upload images
    const imageFiles = req.files?.images || [];

    const imageUrls = [];

    for (const file of imageFiles) {
      const result = await uploadToCloudinary(
        file.buffer,
        "machinecode/products",
      );
      imageUrls.push(result.secure_url);
    }

    // Upload brochure
    let brochureUrl = "";

    const brochureFile = req.files?.brochure?.[0];

    if (brochureFile) {
      const result = await uploadToCloudinary(
        brochureFile.buffer,
        "machinecode/brochures",
        "raw",
      );

      brochureUrl = result.secure_url;
    }

    const product = await Product.create({
      name,
      slug,
      category,
      shortDescription,
      description,
      specifications: specifications ? JSON.parse(specifications) : {},
      features: features ? JSON.parse(features) : [],
      applications: applications ? JSON.parse(applications) : [],
      industries: industries ? JSON.parse(industries) : [],
      faq: faq ? JSON.parse(faq) : [],
      images: imageUrls,
      brochure: brochureUrl,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add product error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE Product
// UPDATE PRODUCT
// UPDATE PRODUCT
// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      name,
      slug,
      category,
      shortDescription,
      description,
      specifications,
      features,
      applications,
      industries,
      faq,
      isActive,
      existingImages,
    } = req.body;

    // --------------------------------
    // Check duplicate slug
    // --------------------------------

    if (slug && slug !== product.slug) {
      const existingProduct = await Product.findOne({
        slug,
        _id: { $ne: req.params.id },
      });

      if (existingProduct) {
        return res.status(409).json({
          success: false,
          message: "A product with this slug already exists.",
        });
      }
    }

    // --------------------------------
    // Basic fields
    // --------------------------------

    product.name = name ?? product.name;
    product.slug = slug ?? product.slug;
    product.category = category ?? product.category;
    product.shortDescription = shortDescription ?? product.shortDescription;
    product.description = description ?? product.description;

    // --------------------------------
    // JSON fields
    // --------------------------------

    if (specifications) {
      product.specifications =
        typeof specifications === "string"
          ? JSON.parse(specifications)
          : specifications;
    }

    if (features) {
      product.features =
        typeof features === "string" ? JSON.parse(features) : features;
    }

    if (applications) {
      product.applications =
        typeof applications === "string"
          ? JSON.parse(applications)
          : applications;
    }

    if (industries) {
      product.industries =
        typeof industries === "string" ? JSON.parse(industries) : industries;
    }

    if (faq) {
      product.faq = typeof faq === "string" ? JSON.parse(faq) : faq;
    }

    // --------------------------------
    // Active / Inactive
    // --------------------------------

    if (isActive !== undefined) {
      product.isActive = isActive === true || isActive === "true";
    }

    // --------------------------------
    // Existing images
    // --------------------------------

    if (existingImages !== undefined) {
      product.images =
        typeof existingImages === "string"
          ? JSON.parse(existingImages)
          : existingImages;
    }

    // --------------------------------
    // Upload NEW images
    // --------------------------------

    const imageFiles = req.files?.images || [];

    if (imageFiles.length > 0) {
      const newImageUrls = [];

      for (const file of imageFiles) {
        const result = await uploadToCloudinary(
          file.buffer,
          "machinecode/products",
          "image",
        );

        newImageUrls.push(result.secure_url);
      }

      product.images = [...(product.images || []), ...newImageUrls];
    }

    // --------------------------------
    // Replace brochure
    // --------------------------------

    const brochureFile = req.files?.brochure?.[0];

    if (brochureFile) {
      const result = await uploadToCloudinary(
        brochureFile.buffer,
        "machinecode/brochures",
        "raw",
      );

      product.brochure = result.secure_url;
    }

    // --------------------------------
    // Save
    // --------------------------------

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET SINGLE PRODUCT FOR ADMIN
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get product by ID error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS FOR ADMIN
// GET ALL PRODUCTS FOR ADMIN
export const getAdminProducts = async (req, res) => {
  try {
    console.log("🔥🔥 GET ADMIN PRODUCTS HIT 🔥🔥");
    const {
      search = "",
      category = "",
      status = "",
      page = 1,
      limit = 20,
      sort = "newest",
    } = req.query;

    const query = {};

    // Search
    if (search.trim()) {
      query.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          slug: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          shortDescription: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // Category
    if (category && category !== "All") {
      query.category = category;
    }

    // Status
    if (status === "active") {
      query.isActive = true;
    }

    if (status === "inactive") {
      query.isActive = false;
    }

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "az":
        sortOption = { name: 1 };
        break;

      case "za":
        sortOption = { name: -1 };
        break;

      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    console.log("🔥 PRODUCTS:", products.length);

    res.status(200).json({
      success: true,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("🔥 GET ADMIN PRODUCTS ERROR:", error);

    console.error("Get admin products error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
