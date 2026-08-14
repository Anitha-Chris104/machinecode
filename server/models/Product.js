import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
  {
    icon: String,
    title: String,
    description: String,
  },
  {
    _id: false,
  },
);

const industrySchema = new mongoose.Schema(
  {
    title: String,
    icon: String,
    description: String,
  },
  {
    _id: false,
  },
);

const faqSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,
  },
  {
    _id: false,
  },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    brochure: {
      type: String,
      default: "",
    },

    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    specifications: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    features: {
      type: [featureSchema],
      default: [],
    },

    applications: {
      type: [String],
      default: [],
    },

    industries: {
      type: [industrySchema],
      default: [],
    },

    faq: {
      type: [faqSchema],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
