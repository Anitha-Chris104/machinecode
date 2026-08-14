import { useEffect, useState } from "react";
import { ArrowLeft, Upload, X, Save, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { updateProduct } from "../../services/productService";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    shortDescription: "",
    description: "",
    isActive: true,
  });

  const [specifications, setSpecifications] = useState([
    {
      key: "",
      value: "",
    },
  ]);

  const [features, setFeatures] = useState([
    {
      icon: "shield",
      title: "",
      description: "",
    },
  ]);

  const [applications, setApplications] = useState([""]);

  const [industries, setIndustries] = useState([
    {
      icon: "factory",
      title: "",
      description: "",
    },
  ]);

  const [faq, setFaq] = useState([
    {
      question: "",
      answer: "",
    },
  ]);

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [existingBrochure, setExistingBrochure] = useState("");
  const [newBrochure, setNewBrochure] = useState(null);

  // --------------------------------
  // Fetch Product
  // --------------------------------

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProductById(id);

      const product = response.data;

      if (!product) {
        throw new Error("Product not found.");
      }

      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        category: product.category || "",
        shortDescription: product.shortDescription || "",
        description: product.description || "",
        isActive:
          typeof product.isActive === "boolean" ? product.isActive : true,
      });

      // Specifications
      const specificationEntries = Object.entries(
        product.specifications || {},
      ).map(([key, value]) => ({
        key,
        value: String(value ?? ""),
      }));

      setSpecifications(
        specificationEntries.length > 0
          ? specificationEntries
          : [{ key: "", value: "" }],
      );

      // Features
      setFeatures(
        product.features?.length
          ? product.features.map((feature) => ({
              icon: feature.icon || "shield",
              title: feature.title || "",
              description: feature.description || "",
            }))
          : [
              {
                icon: "shield",
                title: "",
                description: "",
              },
            ],
      );

      // Applications
      setApplications(
        product.applications?.length ? product.applications : [""],
      );

      // Industries
      setIndustries(
        product.industries?.length
          ? product.industries.map((industry) => ({
              icon: industry.icon || "factory",
              title: industry.title || "",
              description: industry.description || "",
            }))
          : [
              {
                icon: "factory",
                title: "",
                description: "",
              },
            ],
      );

      // FAQ
      setFaq(
        product.faq?.length
          ? product.faq.map((item) => ({
              question: item.question || "",
              answer: item.answer || "",
            }))
          : [
              {
                question: "",
                answer: "",
              },
            ],
      );

      // Images
      setExistingImages(product.images || []);

      // Brochure
      setExistingBrochure(product.brochure || "");
    } catch (error) {
      console.error("Failed to load product:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load product.",
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Basic Fields
  // --------------------------------

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --------------------------------
  // Specifications
  // --------------------------------

  const handleSpecificationChange = (index, field, value) => {
    setSpecifications((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addSpecification = () => {
    setSpecifications((prev) => [
      ...prev,
      {
        key: "",
        value: "",
      },
    ]);
  };

  const removeSpecification = (index) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------------------
  // Features
  // --------------------------------

  const handleFeatureChange = (index, field, value) => {
    setFeatures((prev) =>
      prev.map((feature, i) =>
        i === index
          ? {
              ...feature,
              [field]: value,
            }
          : feature,
      ),
    );
  };

  const addFeature = () => {
    setFeatures((prev) => [
      ...prev,
      {
        icon: "shield",
        title: "",
        description: "",
      },
    ]);
  };

  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------------------
  // Applications
  // --------------------------------

  const handleApplicationChange = (index, value) => {
    setApplications((prev) =>
      prev.map((item, i) => (i === index ? value : item)),
    );
  };

  const addApplication = () => {
    setApplications((prev) => [...prev, ""]);
  };

  const removeApplication = (index) => {
    setApplications((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------------------
  // Industries
  // --------------------------------

  const handleIndustryChange = (index, field, value) => {
    setIndustries((prev) =>
      prev.map((industry, i) =>
        i === index
          ? {
              ...industry,
              [field]: value,
            }
          : industry,
      ),
    );
  };

  const addIndustry = () => {
    setIndustries((prev) => [
      ...prev,
      {
        icon: "factory",
        title: "",
        description: "",
      },
    ]);
  };

  const removeIndustry = (index) => {
    setIndustries((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------------------
  // FAQ
  // --------------------------------

  const handleFaqChange = (index, field, value) => {
    setFaq((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addFaq = () => {
    setFaq((prev) => [
      ...prev,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const removeFaq = (index) => {
    setFaq((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------------------
  // Images
  // --------------------------------

  const handleImages = (e) => {
    const files = Array.from(e.target.files || []);

    setNewImages((prev) => [...prev, ...files]);

    e.target.value = "";
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------------------
  // Brochure
  // --------------------------------

  const handleBrochure = (e) => {
    const file = e.target.files?.[0] || null;

    setNewBrochure(file);
  };

  // --------------------------------
  // Submit
  // --------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const data = new FormData();

      data.append("name", formData.name.trim());
      data.append("slug", formData.slug.trim());
      data.append("category", formData.category);
      data.append("shortDescription", formData.shortDescription.trim());
      data.append("description", formData.description.trim());

      data.append("isActive", String(formData.isActive));

      // Existing images
      data.append("existingImages", JSON.stringify(existingImages));

      // New images
      newImages.forEach((image) => {
        data.append("images", image);
      });

      // New brochure
      if (newBrochure) {
        data.append("brochure", newBrochure);
      }

      // Specifications
      const specificationObject = {};

      specifications.forEach((item) => {
        const key = item.key.trim();
        const value = item.value.trim();

        if (key && value) {
          specificationObject[key] = value;
        }
      });

      data.append("specifications", JSON.stringify(specificationObject));

      // Features
      const validFeatures = features.filter(
        (feature) => feature.title.trim() && feature.description.trim(),
      );

      data.append("features", JSON.stringify(validFeatures));

      // Applications
      const validApplications = applications.filter(
        (application) => application.trim() !== "",
      );

      data.append("applications", JSON.stringify(validApplications));

      // Industries
      const validIndustries = industries.filter(
        (industry) => industry.title.trim() && industry.description.trim(),
      );

      data.append("industries", JSON.stringify(validIndustries));

      // FAQ
      const validFaq = faq.filter(
        (item) => item.question.trim() && item.answer.trim(),
      );

      data.append("faq", JSON.stringify(validFaq));

      await updateProduct(id, data);

      alert("Product updated successfully!");

      navigate("/admin/products");
    } catch (error) {
      console.error("Update product error:", error);

      setError(error.response?.data?.message || "Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 size={22} className="animate-spin" />
          Loading product...
        </div>
      </div>
    );
  }

  // --------------------------------
  // Error
  // --------------------------------

  if (error && !formData.name) {
    return (
      <div className="mx-auto max-w-4xl py-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-700">Unable to load product</h2>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <button
            onClick={() => navigate("/admin/products")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-3 font-semibold text-white hover:bg-slate-700"
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}

        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-500"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>

        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Edit Product
              </h1>

              <p className="mt-2 text-gray-500">
                Update your industrial machine information.
              </p>
            </div>

            {/* Status */}

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-5 w-5 accent-orange-500"
              />

              <span className="text-sm font-semibold text-slate-700">
                {formData.isActive ? "Active Product" : "Inactive Product"}
              </span>
            </label>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* =========================
              BASIC INFORMATION
          ========================== */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
              Basic Information
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Slug
                </label>

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                >
                  <option value="">Select Category</option>

                  <option value="Food Industry Machines">
                    Food Industry Machines
                  </option>

                  <option value="Hotel Equipment">Hotel Equipment</option>

                  <option value="Factory Equipment">Factory Equipment</option>

                  <option value="Material Handling">Material Handling</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-700">
                Short Description
              </label>

              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                required
                className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>
          </section>

          {/* =========================
              SPECIFICATIONS
          ========================== */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Technical Specifications
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update technical details.
                </p>
              </div>

              <button
                type="button"
                onClick={addSpecification}
                className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
              >
                + Add Specification
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 md:grid-cols-[1fr_1fr_auto]"
                >
                  <input
                    type="text"
                    placeholder="Specification name"
                    value={spec.key}
                    onChange={(e) =>
                      handleSpecificationChange(index, "key", e.target.value)
                    }
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  />

                  <input
                    type="text"
                    placeholder="Value"
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecificationChange(index, "value", e.target.value)
                    }
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  />

                  {specifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className="rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-500 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* =========================
              FEATURES
          ========================== */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Product Features
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update key product features.
                </p>
              </div>

              <button
                type="button"
                onClick={addFeature}
                className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
              >
                + Add Feature
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Icon
                      </label>

                      <select
                        value={feature.icon}
                        onChange={(e) =>
                          handleFeatureChange(index, "icon", e.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                      >
                        <option value="shield">Shield</option>
                        <option value="zap">Energy / Zap</option>
                        <option value="wrench">Maintenance</option>
                        <option value="trending">Productivity</option>
                        <option value="settings">Engineering</option>
                        <option value="factory">Industrial</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Feature Title
                      </label>

                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) =>
                          handleFeatureChange(index, "title", e.target.value)
                        }
                        placeholder="Reliable Performance"
                        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="text-sm font-semibold text-gray-700">
                      Description
                    </label>

                    <textarea
                      rows={3}
                      value={feature.description}
                      onChange={(e) =>
                        handleFeatureChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                    />
                  </div>

                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="mt-4 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                    >
                      Remove Feature
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* =========================
              APPLICATIONS
          ========================== */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Applications
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update machine applications.
                </p>
              </div>

              <button
                type="button"
                onClick={addApplication}
                className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
              >
                + Add Application
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {applications.map((application, index) => (
                <div key={index} className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={application}
                    onChange={(e) =>
                      handleApplicationChange(index, e.target.value)
                    }
                    placeholder="e.g. Food Processing"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                  />

                  {applications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeApplication(index)}
                      className="rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-500 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* =========================
              INDUSTRIES
          ========================== */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Recommended Industries
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update recommended industries.
                </p>
              </div>

              <button
                type="button"
                onClick={addIndustry}
                className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
              >
                + Add Industry
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Icon
                      </label>

                      <select
                        value={industry.icon}
                        onChange={(e) =>
                          handleIndustryChange(index, "icon", e.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                      >
                        <option value="factory">Factory</option>
                        <option value="building">Building</option>
                        <option value="food">Food</option>
                        <option value="hotel">Hotel</option>
                        <option value="flask">Pharmaceutical</option>
                        <option value="settings">Manufacturing</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Industry Name
                      </label>

                      <input
                        type="text"
                        value={industry.title}
                        onChange={(e) =>
                          handleIndustryChange(index, "title", e.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="text-sm font-semibold text-gray-700">
                      Description
                    </label>

                    <textarea
                      rows={3}
                      value={industry.description}
                      onChange={(e) =>
                        handleIndustryChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                    />
                  </div>

                  {industries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIndustry(index)}
                      className="mt-4 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                    >
                      Remove Industry
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* =========================
              FAQ
          ========================== */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Frequently Asked Questions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update common customer questions.
                </p>
              </div>

              <button
                type="button"
                onClick={addFaq}
                className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
              >
                + Add FAQ
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {faq.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                >
                  <label className="text-sm font-semibold text-gray-700">
                    Question
                  </label>

                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) =>
                      handleFaqChange(index, "question", e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  />

                  <label className="mt-5 block text-sm font-semibold text-gray-700">
                    Answer
                  </label>

                  <textarea
                    rows={4}
                    value={item.answer}
                    onChange={(e) =>
                      handleFaqChange(index, "answer", e.target.value)
                    }
                    className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  />

                  {faq.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="mt-4 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                    >
                      Remove FAQ
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* =========================
              EXISTING IMAGES
          ========================== */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Product Images</h2>

            <p className="mt-1 text-sm text-gray-500">
              Existing images. Remove any image you no longer want.
            </p>

            {existingImages.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {existingImages.map((image, index) => (
                  <div
                    key={image + index}
                    className="group relative overflow-hidden rounded-xl border border-gray-200"
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="h-32 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                      title="Remove image"
                    >
                      <X size={16} />
                    </button>

                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                        Main Image
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-500">
                No existing images.
              </div>
            )}

            {/* Upload */}

            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-10 transition hover:border-orange-500 hover:bg-orange-50">
              <Upload size={35} className="text-orange-500" />

              <p className="mt-3 font-semibold text-gray-700">Add new images</p>

              <p className="mt-1 text-sm text-gray-500">PNG, JPG, WEBP</p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="hidden"
              />
            </label>

            {/* New Images */}

            {newImages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-700">
                  New Images
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {newImages.map((image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="relative overflow-hidden rounded-xl border border-orange-200"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        className="h-32 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>

                      <span className="absolute bottom-2 left-2 rounded-md bg-orange-500 px-2 py-1 text-xs font-medium text-white">
                        New
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* =========================
              BROCHURE
          ========================== */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
              Product Brochure
            </h2>

            {existingBrochure ? (
              <div className="mt-5 flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Current brochure
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    A brochure is already uploaded.
                  </p>
                </div>

                <a
                  href={existingBrochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-orange-500 hover:text-orange-600"
                >
                  View Brochure
                </a>
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                No brochure uploaded.
              </p>
            )}

            <div className="mt-5">
              <label className="text-sm font-semibold text-gray-700">
                Replace Brochure
              </label>

              <input
                type="file"
                accept="application/pdf"
                onChange={handleBrochure}
                className="mt-2 block w-full rounded-xl border border-gray-300 p-3"
              />
            </div>

            {newBrochure && (
              <p className="mt-3 text-sm font-medium text-green-600">
                ✓ {newBrochure.name}
              </p>
            )}
          </section>

          {/* =========================
              ACTIONS
          ========================== */}

          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              disabled={saving}
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Updating Product...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
