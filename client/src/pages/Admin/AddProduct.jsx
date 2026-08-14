import { useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { addProduct } from "../../services/productService";

const AddProduct = () => {
  const navigate = useNavigate();
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

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    shortDescription: "",
    description: "",
  });
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

  const [applications, setApplications] = useState([""]);

  const [images, setImages] = useState([]);
  const [brochure, setBrochure] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append("category", formData.category);
      data.append("shortDescription", formData.shortDescription);
      data.append("description", formData.description);

      // Images
      images.forEach((image) => {
        data.append("images", image);
      });

      // Brochure
      if (brochure) {
        data.append("brochure", brochure);
      }

      // Default structured data
      const specificationObject = {};

      specifications.forEach((item) => {
        if (item.key.trim() && item.value.trim()) {
          specificationObject[item.key.trim()] = item.value.trim();
        }
      });

      data.append("specifications", JSON.stringify(specificationObject));

      const validFeatures = features.filter(
        (feature) => feature.title.trim() && feature.description.trim(),
      );

      data.append("features", JSON.stringify(validFeatures));

      const validApplications = applications.filter(
        (application) => application.trim() !== "",
      );

      data.append("applications", JSON.stringify(validApplications));

      const validIndustries = industries.filter(
        (industry) => industry.title.trim() && industry.description.trim(),
      );

      data.append("industries", JSON.stringify(validIndustries));

      const validFaq = faq.filter(
        (item) => item.question.trim() && item.answer.trim(),
      );

      data.append("faq", JSON.stringify(validFaq));

      await addProduct(data);

      alert("Product added successfully!");

      navigate("/admin/products");
    } catch (error) {
      console.error("Add product error:", error);

      alert(error.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Header */}

      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => navigate("/admin/products")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-500"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Add Product</h1>

          <p className="mt-2 text-gray-500">
            Add a new industrial machine to your catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}

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
                  placeholder="Industrial Mixer"
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
                  placeholder="industrial-mixer"
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
                placeholder="Heavy-duty industrial mixing machine"
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
                placeholder="Describe the machine..."
                required
                className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>
          </section>

          {/* Specifications */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Technical Specifications
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add technical details for this machine.
                </p>
              </div>

              <button
                type="button"
                onClick={addSpecification}
                className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600"
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
                  {/* Specification Name */}

                  <input
                    type="text"
                    placeholder="Specification name"
                    value={spec.key}
                    onChange={(e) =>
                      handleSpecificationChange(index, "key", e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  />

                  {/* Specification Value */}

                  <input
                    type="text"
                    placeholder="Value e.g. 500 kg/hr"
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecificationChange(index, "value", e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                  />

                  {/* Remove */}

                  {specifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className="rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Product Features */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Product Features
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add the key benefits and features of this machine.
                </p>
              </div>

              <button
                type="button"
                onClick={addFeature}
                className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600"
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
                    {/* Icon */}

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

                    {/* Title */}

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

                  {/* Description */}

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
                      placeholder="Engineered for consistent and dependable industrial operation."
                      className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Remove */}

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

          {/* Applications */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Applications
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add the industries or applications where this machine is used.
                </p>
              </div>

              <button
                type="button"
                onClick={addApplication}
                className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600"
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
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
                  />

                  {applications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeApplication(index)}
                      className="rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Industries */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Recommended Industries
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add the industries where this machine is suitable.
                </p>
              </div>

              <button
                type="button"
                onClick={addIndustry}
                className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600"
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
                    {/* Icon */}

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

                    {/* Title */}

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
                        placeholder="Food Processing"
                        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Description */}

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
                      placeholder="Suitable for food processing and production environments."
                      className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Remove */}

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

          {/* FAQ */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Frequently Asked Questions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add common questions and answers about this machine.
                </p>
              </div>

              <button
                type="button"
                onClick={addFaq}
                className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600"
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
                  {/* Question */}

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Question
                    </label>

                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) =>
                        handleFaqChange(index, "question", e.target.value)
                      }
                      placeholder="What is the capacity of this machine?"
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500"
                    />
                  </div>

                  {/* Answer */}

                  <div className="mt-5">
                    <label className="text-sm font-semibold text-gray-700">
                      Answer
                    </label>

                    <textarea
                      rows={4}
                      value={item.answer}
                      onChange={(e) =>
                        handleFaqChange(index, "answer", e.target.value)
                      }
                      placeholder="This machine has a production capacity of..."
                      className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500"
                    />
                  </div>

                  {/* Remove */}

                  {faq.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="mt-4 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      Remove FAQ
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Images */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Product Images</h2>

            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-10 transition hover:border-orange-500 hover:bg-orange-50">
              <Upload size={35} className="text-orange-500" />

              <p className="mt-3 font-semibold text-gray-700">
                Click to upload images
              </p>

              <p className="mt-1 text-sm text-gray-500">PNG, JPG, WEBP</p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="hidden"
              />
            </label>

            {images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl border"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="h-32 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Brochure */}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
              Product Brochure
            </h2>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setBrochure(e.target.files?.[0] || null)}
              className="mt-5 block w-full rounded-xl border border-gray-300 p-3"
            />

            {brochure && (
              <p className="mt-3 text-sm text-green-600">✓ {brochure.name}</p>
            )}
          </section>

          {/* Submit */}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
