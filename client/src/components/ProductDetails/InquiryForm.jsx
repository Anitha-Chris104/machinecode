import { useState } from "react";
import { Send } from "lucide-react";
import { submitInquiry } from "../../services/productService";

const InquiryForm = ({ product }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await submitInquiry({
        productId: product._id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
      });

      setSuccess(
        response.message || "Your inquiry has been submitted successfully.",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Inquiry submission failed:", error);

      setError(
        error.response?.data?.message ||
          "Unable to submit your inquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:border-orange-500 focus:outline-none"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        required
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:border-orange-500 focus:outline-none"
      />

      {/* Phone */}
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        required
        value={formData.phone}
        onChange={handleChange}
        className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:border-orange-500 focus:outline-none"
      />

      {/* Company */}
      <input
        type="text"
        name="company"
        placeholder="Company Name"
        value={formData.company}
        onChange={handleChange}
        className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:border-orange-500 focus:outline-none"
      />

      {/* Message */}
      <textarea
        rows={5}
        name="message"
        placeholder={`I am interested in ${product.name}`}
        required
        value={formData.message}
        onChange={handleChange}
        className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:border-orange-500 focus:outline-none"
      />

      {/* Success */}
      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
          {success}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={18} />

        {loading ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
};

export default InquiryForm;
