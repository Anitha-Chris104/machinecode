import { useEffect, useState } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { updateProduct } from "../../services/productService";
import { getAdminProductById } from "../../services/productService";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [existingBrochure, setExistingBrochure] = useState("");
  const [newBrochure, setNewBrochure] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    shortDescription: "",
    description: "",
    specifications: {},
    features: [],
    applications: [],
    industries: [],
    faq: [],
    images: [],
    brochure: "",
    isActive: true,
  });

  // ==========================================
  // FETCH PRODUCT
  // ==========================================

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("🔍 FETCHING PRODUCT ID:", id);

      const response = await getAdminProductById(id);

      console.log("🔍 ADMIN PRODUCT RESPONSE:", response);

      const product = response.data;

      if (!product) {
        throw new Error("Product data not found.");
      }

      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        category: product.category || "",
        shortDescription: product.shortDescription || "",
        description: product.description || "",
        specifications: product.specifications || {},
        features: product.features || [],
        applications: product.applications || [],
        industries: product.industries || [],
        faq: product.faq || [],
        isActive: product.isActive ?? true,
      });

      setExistingImages(product.images || []);
      setExistingBrochure(product.brochure || "");
    } catch (error) {
      console.error("❌ Failed to load product:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load product.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  // ==========================================
  // BASIC INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SPECIFICATIONS
  // ==========================================

  const handleSpecificationChange = (index, field, value) => {
    setFormData((prev) => {
      const entries = Object.entries(prev.specifications || {});

      if (field === "key") {
        const oldValue = entries[index]?.[1];

        entries[index] = [value, oldValue];
      } else {
        const oldKey = entries[index]?.[0];

        entries[index] = [oldKey, value];
      }

      return {
        ...prev,
        specifications: Object.fromEntries(entries),
      };
    });
  };

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...(prev.specifications || {}),
        "": "",
      },
    }));
  };

  const removeSpecification = (index) => {
    setFormData((prev) => {
      const entries = Object.entries(prev.specifications || {});

      entries.splice(index, 1);

      return {
        ...prev,
        specifications: Object.fromEntries(entries),
      };
    });
  };

  // ==========================================
  // FEATURES
  // ==========================================

  const handleFeatureChange = (index, field, value) => {
    setFormData((prev) => {
      const features = [...(prev.features || [])];

      features[index] = {
        ...features[index],
        [field]: value,
      };

      return {
        ...prev,
        features,
      };
    });
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [
        ...(prev.features || []),
        {
          icon: "",
          title: "",
          description: "",
        },
      ],
    }));
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter(
        (_, featureIndex) => featureIndex !== index,
      ),
    }));
  };

  // ==========================================
  // APPLICATIONS
  // ==========================================

  const handleApplicationChange = (index, value) => {
    setFormData((prev) => {
      const applications = [...(prev.applications || [])];

      applications[index] = value;

      return {
        ...prev,
        applications,
      };
    });
  };

  const addApplication = () => {
    setFormData((prev) => ({
      ...prev,
      applications: [...(prev.applications || []), ""],
    }));
  };

  const removeApplication = (index) => {
    setFormData((prev) => ({
      ...prev,
      applications: (prev.applications || []).filter(
        (_, applicationIndex) => applicationIndex !== index,
      ),
    }));
  };

  // ==========================================
  // INDUSTRIES
  // ==========================================

  const handleIndustryChange = (index, field, value) => {
    setFormData((prev) => {
      const industries = [...(prev.industries || [])];

      industries[index] = {
        ...industries[index],
        [field]: value,
      };

      return {
        ...prev,
        industries,
      };
    });
  };

  const addIndustry = () => {
    setFormData((prev) => ({
      ...prev,
      industries: [
        ...(prev.industries || []),
        {
          title: "",
          icon: "",
          description: "",
        },
      ],
    }));
  };

  const removeIndustry = (index) => {
    setFormData((prev) => ({
      ...prev,
      industries: (prev.industries || []).filter(
        (_, industryIndex) => industryIndex !== index,
      ),
    }));
  };

  // ==========================================
  // FAQ
  // ==========================================

  const handleFaqChange = (index, field, value) => {
    setFormData((prev) => {
      const faq = [...(prev.faq || [])];

      faq[index] = {
        ...faq[index],
        [field]: value,
      };

      return {
        ...prev,
        faq,
      };
    });
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faq: [
        ...(prev.faq || []),
        {
          question: "",
          answer: "",
        },
      ],
    }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faq: (prev.faq || []).filter((_, faqIndex) => faqIndex !== index),
    }));
  };

  const handleRemoveExistingImage = (imageUrl) => {
    setExistingImages((prev) => prev.filter((image) => image !== imageUrl));

    setRemovedImages((prev) => [...prev, imageUrl]);
  };

  const handleNewImages = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    setNewImages((prev) => [...prev, ...selectedFiles]);

    e.target.value = "";
  };

  const handleBrochureChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setNewBrochure(file);

    e.target.value = "";
  };

  // ==========================================
  // SAVE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const data = new FormData();

      // -----------------------------
      // Basic Information
      // -----------------------------
      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append("category", formData.category);
      data.append("shortDescription", formData.shortDescription);
      data.append("description", formData.description);

      // -----------------------------
      // Specifications
      // -----------------------------
      data.append(
        "specifications",
        JSON.stringify(formData.specifications || {}),
      );

      // -----------------------------
      // Features
      // -----------------------------
      data.append("features", JSON.stringify(formData.features || []));

      // -----------------------------
      // Applications
      // -----------------------------
      data.append("applications", JSON.stringify(formData.applications || []));

      // -----------------------------
      // Industries
      // -----------------------------
      data.append("industries", JSON.stringify(formData.industries || []));

      // -----------------------------
      // FAQ
      // -----------------------------
      data.append("faq", JSON.stringify(formData.faq || []));

      // -----------------------------
      // Active / Inactive
      // -----------------------------
      data.append("isActive", String(formData.isActive));

      // -----------------------------
      // Existing Images
      // -----------------------------
      data.append("existingImages", JSON.stringify(existingImages || []));

      // -----------------------------
      // New Images
      // -----------------------------
      newImages.forEach((file) => {
        data.append("images", file);
      });

      // -----------------------------
      // Brochure
      // -----------------------------
      if (newBrochure) {
        data.append("brochure", newBrochure);
      }

      // -----------------------------
      // Update
      // -----------------------------
      await updateProduct(id, data);

      setSuccess("Product updated successfully.");

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    } catch (error) {
      console.error("Failed to update product:", error);

      setError(error.response?.data?.message || "Failed to update product.");
    } finally {
      setSaving(false);
    }
  };
  // ==========================================
  // LOADING
  // ==========================================

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

  // ==========================================
  // ERROR
  // ==========================================

  if (error && !formData.name) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-600">{error}</p>

        <button
          onClick={() => navigate("/admin/products")}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          <ArrowLeft size={17} />
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-500"
          >
            <ArrowLeft size={17} />
            Back to Products
          </button>

          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
            Edit Product
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update your industrial machinery product.
          </p>
        </div>

        <button
          type="submit"
          form="edit-product-form"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <Loader2 size={19} className="animate-spin" />
          ) : (
            <Save size={19} />
          )}

          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* ========================================== */}
      {/* SUCCESS */}
      {/* ========================================== */}

      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
          {success}
        </div>
      )}

      {/* ========================================== */}
      {/* ERROR */}
      {/* ========================================== */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <form
        id="edit-product-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* ========================================== */}
        {/* BASIC INFORMATION */}
        {/* ========================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update the main product information.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Product Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Slug */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

              <p className="mt-1 text-xs text-gray-400">
                Used in the product URL.
              </p>
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Status */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Status
              </label>

              <select
                value={formData.isActive ? "active" : "inactive"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.value === "active",
                  }))
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Short Description */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Short Description
              </label>

              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={3}
                required
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Description */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={7}
                required
                className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 leading-7 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* PLACEHOLDER SECTIONS */}
        {/* ========================================== */}

        {/* ========================================== */}
        {/* SPECIFICATIONS */}
        {/* ========================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Specifications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add technical specifications for this product.
              </p>
            </div>

            <button
              type="button"
              onClick={addSpecification}
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              + Add Specification
            </button>
          </div>

          <div className="space-y-3">
            {Object.entries(formData.specifications || {}).map(
              ([key, value], index) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:grid-cols-[1fr_1.5fr_auto]"
                >
                  {/* Key */}

                  <input
                    type="text"
                    value={key}
                    onChange={(e) =>
                      handleSpecificationChange(index, "key", e.target.value)
                    }
                    placeholder="Specification"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                  {/* Value */}

                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleSpecificationChange(index, "value", e.target.value)
                    }
                    placeholder="Value"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                  {/* Remove */}

                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ),
            )}

            {Object.keys(formData.specifications || {}).length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">
                <p className="text-sm text-gray-500">
                  No specifications added yet.
                </p>

                <button
                  type="button"
                  onClick={addSpecification}
                  className="mt-3 text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  + Add your first specification
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ========================================== */}
        {/* FEATURES */}
        {/* ========================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Features</h2>

              <p className="mt-1 text-sm text-gray-500">
                Highlight the main features and benefits of this product.
              </p>
            </div>

            <button
              type="button"
              onClick={addFeature}
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              + Add Feature
            </button>
          </div>

          <div className="space-y-5">
            {formData.features?.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
              >
                {/* Feature Header */}

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-sm font-bold text-orange-600">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        Feature {index + 1}
                      </p>

                      <p className="text-xs text-gray-500">
                        Product feature information
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>

                {/* Fields */}

                <div className="grid gap-5 md:grid-cols-2">
                  {/* Icon */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Icon
                    </label>

                    <input
                      type="text"
                      value={feature.icon || ""}
                      onChange={(e) =>
                        handleFeatureChange(index, "icon", e.target.value)
                      }
                      placeholder="Example: Settings"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />

                    <p className="mt-1.5 text-xs text-gray-400">
                      Enter the icon name used by your frontend.
                    </p>
                  </div>

                  {/* Title */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Feature Title
                    </label>

                    <input
                      type="text"
                      value={feature.title || ""}
                      onChange={(e) =>
                        handleFeatureChange(index, "title", e.target.value)
                      }
                      placeholder="Example: High Efficiency"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  {/* Description */}

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Description
                    </label>

                    <textarea
                      value={feature.description || ""}
                      onChange={(e) =>
                        handleFeatureChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      rows={3}
                      placeholder="Describe this feature..."
                      className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 leading-6 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}

            {(!formData.features || formData.features.length === 0) && (
              <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  ✨
                </div>

                <p className="mt-4 font-semibold text-slate-700">
                  No features added
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Add product features to display on the product page.
                </p>

                <button
                  type="button"
                  onClick={addFeature}
                  className="mt-4 font-semibold text-orange-500 hover:text-orange-600"
                >
                  + Add your first feature
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">Features</h2>

          <p className="mt-1 text-sm text-gray-500">
            Feature editor will be added next.
          </p>
        </section>

        {/* ========================================== */}
        {/* APPLICATIONS */}
        {/* ========================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Applications</h2>

              <p className="mt-1 text-sm text-gray-500">
                Add the industries or processes where this product can be used.
              </p>
            </div>

            <button
              type="button"
              onClick={addApplication}
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              + Add Application
            </button>
          </div>

          <div className="space-y-3">
            {formData.applications?.map((application, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* Number */}

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-sm font-bold text-orange-500">
                  {index + 1}
                </div>

                {/* Input */}

                <input
                  type="text"
                  value={application || ""}
                  onChange={(e) =>
                    handleApplicationChange(index, e.target.value)
                  }
                  placeholder="Example: Food Processing"
                  className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />

                {/* Remove */}

                <button
                  type="button"
                  onClick={() => removeApplication(index)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50"
                  title="Remove application"
                >
                  ×
                </button>
              </div>
            ))}

            {/* Empty State */}

            {(!formData.applications || formData.applications.length === 0) && (
              <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  🏭
                </div>

                <p className="mt-4 font-semibold text-slate-700">
                  No applications added
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Add applications where this product is commonly used.
                </p>

                <button
                  type="button"
                  onClick={addApplication}
                  className="mt-4 font-semibold text-orange-500 hover:text-orange-600"
                >
                  + Add your first application
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ========================================== */}
        {/* INDUSTRIES */}
        {/* ========================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Header */}

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Industries</h2>

              <p className="mt-1 text-sm text-gray-500">
                Define the industries where this product can be used.
              </p>
            </div>

            <button
              type="button"
              onClick={addIndustry}
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              + Add Industry
            </button>
          </div>

          {/* Industry List */}

          <div className="space-y-5">
            {formData.industries?.map((industry, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
              >
                {/* Card Header */}

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-sm font-bold text-orange-600">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        Industry {index + 1}
                      </p>

                      <p className="text-xs text-gray-500">
                        Industry information
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeIndustry(index)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>

                {/* Fields */}

                <div className="grid gap-5 md:grid-cols-2">
                  {/* Title */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Industry Title
                    </label>

                    <input
                      type="text"
                      value={industry.title || ""}
                      onChange={(e) =>
                        handleIndustryChange(index, "title", e.target.value)
                      }
                      placeholder="Example: Food Processing"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  {/* Icon */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Icon
                    </label>

                    <input
                      type="text"
                      value={industry.icon || ""}
                      onChange={(e) =>
                        handleIndustryChange(index, "icon", e.target.value)
                      }
                      placeholder="Example: Factory"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />

                    <p className="mt-1.5 text-xs text-gray-400">
                      Enter the icon name used by your frontend.
                    </p>
                  </div>

                  {/* Description */}

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Description
                    </label>

                    <textarea
                      value={industry.description || ""}
                      onChange={(e) =>
                        handleIndustryChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      rows={3}
                      placeholder="Describe how this product is used in this industry..."
                      className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 leading-6 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}

            {(!formData.industries || formData.industries.length === 0) && (
              <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  🌎
                </div>

                <p className="mt-4 font-semibold text-slate-700">
                  No industries added
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Add the industries where this product is commonly used.
                </p>

                <button
                  type="button"
                  onClick={addIndustry}
                  className="mt-4 font-semibold text-orange-500 hover:text-orange-600"
                >
                  + Add your first industry
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Header */}

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Frequently Asked Questions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add common questions and answers about this product.
              </p>
            </div>

            <button
              type="button"
              onClick={addFaq}
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              + Add FAQ
            </button>
          </div>

          {/* FAQ List */}

          <div className="space-y-5">
            {formData.faq?.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
              >
                {/* Header */}

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-sm font-bold text-orange-600">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        FAQ {index + 1}
                      </p>

                      <p className="text-xs text-gray-500">
                        Question and answer
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>

                {/* Question */}

                <div className="mb-5">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Question
                  </label>

                  <input
                    type="text"
                    value={item.question || ""}
                    onChange={(e) =>
                      handleFaqChange(index, "question", e.target.value)
                    }
                    placeholder="Example: What is the capacity of this machine?"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* Answer */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Answer
                  </label>

                  <textarea
                    value={item.answer || ""}
                    onChange={(e) =>
                      handleFaqChange(index, "answer", e.target.value)
                    }
                    rows={4}
                    placeholder="Enter the answer..."
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 leading-6 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>
            ))}

            {/* Empty State */}

            {(!formData.faq || formData.faq.length === 0) && (
              <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  ?
                </div>

                <p className="mt-4 font-semibold text-slate-700">
                  No FAQs added
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Add frequently asked questions about this product.
                </p>

                <button
                  type="button"
                  onClick={addFaq}
                  className="mt-4 font-semibold text-orange-500 hover:text-orange-600"
                >
                  + Add your first FAQ
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ========================================== */}
        {/* EXISTING IMAGES */}
        {/* ========================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">Product Images</h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage the images currently associated with this product.
            </p>
          </div>

          {existingImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {existingImages.map((image, index) => (
                <div
                  key={image}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
                >
                  {/* Image */}

                  <div className="aspect-square">
                    <img
                      src={image}
                      alt={`${formData.name} ${index + 1}`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Image number */}

                  <div className="absolute left-2 top-2 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    Image {index + 1}
                  </div>

                  {/* Remove */}

                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(image)}
                    className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-500 opacity-0 shadow-md transition group-hover:opacity-100 hover:bg-red-50"
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                🖼️
              </div>

              <p className="mt-4 font-semibold text-slate-700">
                No existing images
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Add new images below.
              </p>
            </div>
          )}

          {/* Removed image notice */}

          {removedImages.length > 0 && (
            <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm font-medium text-yellow-800">
                {removedImages.length} image
                {removedImages.length > 1 ? "s" : ""} marked for removal.
              </p>

              <p className="mt-1 text-xs text-yellow-700">
                Changes will be applied when you save the product.
              </p>
            </div>
          )}
        </section>

        {/* ========================================== */}
        {/* ADD NEW IMAGES */}
        {/* ========================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">Add New Images</h2>

            <p className="mt-1 text-sm text-gray-500">
              Upload additional product images.
            </p>
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 px-6 py-10 text-center transition hover:border-orange-400 hover:bg-orange-50/40">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
              +
            </div>

            <p className="mt-4 font-semibold text-slate-700">
              Click to upload images
            </p>

            <p className="mt-1 text-sm text-gray-500">PNG, JPG, JPEG or WEBP</p>

            <p className="mt-2 text-xs text-gray-400">Maximum 10 new images</p>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              onChange={handleNewImages}
              className="hidden"
            />
          </label>
          {newImages.length > 0 && (
            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">New Images</h3>

                  <p className="text-sm text-gray-500">
                    {newImages.length} image
                    {newImages.length > 1 ? "s" : ""} selected
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {newImages.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
                  >
                    <div className="aspect-square">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2">
                      <p className="truncate text-xs text-white">{file.name}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setNewImages((prev) =>
                          prev.filter((_, fileIndex) => fileIndex !== index),
                        );
                      }}
                      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-md transition hover:bg-red-50"
                      title="Remove selected image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ========================================== */}
        {/* BROCHURE */}
        {/* ========================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Product Brochure
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage the brochure associated with this product.
            </p>
          </div>

          {/* Existing brochure */}

          {existingBrochure && !newBrochure && (
            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  📄
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-slate-800">
                    Current Brochure
                  </p>

                  <p className="mt-1 max-w-[400px] truncate text-sm text-gray-500">
                    Existing product brochure
                  </p>
                </div>
              </div>

              <a
                href={existingBrochure}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
              >
                View Brochure
              </a>
            </div>
          )}

          {/* New brochure preview */}

          {newBrochure && (
            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                  📄
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-slate-800">
                    New Brochure Selected
                  </p>

                  <p className="mt-1 truncate text-sm text-gray-500">
                    {newBrochure.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {(newBrochure.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNewBrochure(null)}
                className="inline-flex items-center justify-center rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          )}

          {/* Upload / Replace */}

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 px-6 py-10 text-center transition hover:border-orange-400 hover:bg-orange-50/40">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
              📄
            </div>

            <p className="mt-4 font-semibold text-slate-700">
              {existingBrochure ? "Replace brochure" : "Upload brochure"}
            </p>

            <p className="mt-1 text-sm text-gray-500">PDF files only</p>

            <p className="mt-2 text-xs text-gray-400">Select one brochure</p>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleBrochureChange}
              className="hidden"
            />
          </label>
        </section>

        {/* ========================================== */}
        {/* PRODUCT STATUS */}
        {/* ========================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Product Status
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Control whether this product is visible on the website.
              </p>
            </div>

            {/* Toggle */}

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: !prev.isActive,
                }))
              }
              className={`relative inline-flex h-7 w-14 shrink-0 items-center rounded-full transition-colors duration-200 ${
                formData.isActive ? "bg-green-500" : "bg-gray-300"
              }`}
              aria-pressed={formData.isActive}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                  formData.isActive ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Status information */}

          <div
            className={`mt-5 rounded-xl border p-4 ${
              formData.isActive
                ? "border-green-200 bg-green-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 h-2.5 w-2.5 rounded-full ${
                  formData.isActive ? "bg-green-500" : "bg-gray-400"
                }`}
              />

              <div>
                <p
                  className={`font-semibold ${
                    formData.isActive ? "text-green-700" : "text-gray-600"
                  }`}
                >
                  {formData.isActive
                    ? "Product is Active"
                    : "Product is Inactive"}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {formData.isActive
                    ? "This product is visible to customers on the website."
                    : "This product is hidden from customers on the website."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SAVE */}
        {/* ========================================== */}

        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            disabled={saving}
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              <>💾 Save Changes</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;
