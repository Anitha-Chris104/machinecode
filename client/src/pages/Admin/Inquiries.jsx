import { useEffect, useState } from "react";
import InquiryDetailsModal from "../../components/Admin/InquiryDetailsModal";
import { Eye, Trash2, RefreshCw, MessageSquare } from "lucide-react";

import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "../../services/inquiryService";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getInquiries();

      setInquiries(response.data || []);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);

      setError(error.response?.data?.message || "Unable to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateInquiryStatus(id, status);

      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === id ? { ...inquiry, status } : inquiry,
        ),
      );

      setSelectedInquiry((prev) =>
        prev && prev._id === id ? { ...prev, status } : prev,
      );
    } catch (error) {
      console.error("Failed to update status:", error);

      alert(
        error.response?.data?.message || "Unable to update inquiry status.",
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inquiry?",
    );

    if (!confirmed) return;

    try {
      await deleteInquiry(id);

      setInquiries((prev) => prev.filter((inquiry) => inquiry._id !== id));
    } catch (error) {
      console.error("Failed to delete inquiry:", error);

      alert(error.response?.data?.message || "Unable to delete inquiry.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
              <MessageSquare size={24} className="text-orange-500" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                Customer Inquiries
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage customer quote requests and inquiries.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={fetchInquiries}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Total" value={inquiries.length} />

        <StatCard
          title="New"
          value={inquiries.filter((item) => item.status === "new").length}
        />

        <StatCard
          title="Contacted"
          value={inquiries.filter((item) => item.status === "contacted").length}
        />

        <StatCard
          title="Converted"
          value={inquiries.filter((item) => item.status === "converted").length}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Phone
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading inquiries...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr
                    key={inquiry._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >
                    {/* Customer */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {inquiry.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {inquiry.email}
                        </p>
                      </div>
                    </td>

                    {/* Product */}
                    <td className="px-6 py-5">
                      <p className="font-medium text-slate-700">
                        {inquiry.productName}
                      </p>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {inquiry.phone}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <select
                        value={inquiry.status}
                        onChange={(e) =>
                          handleStatusChange(inquiry._id, e.target.value)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-orange-500"
                      >
                        <option value="new">New</option>

                        <option value="contacted">Contacted</option>

                        <option value="converted">Converted</option>

                        <option value="closed">Closed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(inquiry._id)}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedInquiry && (
        <InquiryDetailsModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>

      <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
    </div>
  );
};

export default Inquiries;
