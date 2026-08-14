import { useEffect, useState } from "react";
import { Eye, Mail, MessageSquare } from "lucide-react";
import { getRecentInquiries } from "../../services/inquiryService";

const RecentInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentInquiries = async () => {
      try {
        const response = await getRecentInquiries();
        setInquiries(response.data || []);
      } catch (error) {
        console.error("Failed to load recent inquiries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentInquiries();
  }, []);

  const statusStyle = {
    new: "bg-blue-50 text-blue-600",
    contacted: "bg-yellow-50 text-yellow-600",
    converted: "bg-green-50 text-green-600",
    closed: "bg-gray-100 text-gray-600",
  };

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Recent Inquiries</h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest customer quotation requests
          </p>
        </div>

        <a
          href="/admin/inquiries"
          className="font-semibold text-orange-500 hover:text-orange-600"
        >
          View All →
        </a>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-14 text-gray-500">
          Loading inquiries...
        </div>
      )}

      {/* Empty */}
      {!loading && inquiries.length === 0 && (
        <div className="py-14 text-center">
          <MessageSquare size={42} className="mx-auto text-gray-300" />

          <p className="mt-3 text-gray-500">No inquiries yet.</p>
        </div>
      )}

      {/* Table */}
      {!loading && inquiries.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {inquiries.map((inquiry) => (
                <tr key={inquiry._id} className="transition hover:bg-gray-50">
                  {/* Customer */}
                  <td className="px-6 py-5">
                    <p className="font-semibold text-slate-800">
                      {inquiry.name}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                      <Mail size={13} />
                      {inquiry.email}
                    </p>
                  </td>

                  {/* Product */}
                  <td className="px-6 py-5">
                    <p className="max-w-[220px] truncate font-medium text-slate-700">
                      {inquiry.productName || "Product"}
                    </p>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-sm text-gray-500">
                    {inquiry.createdAt
                      ? new Date(inquiry.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        statusStyle[inquiry.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {inquiry.status || "new"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 text-right">
                    <a
                      href={`/admin/inquiries/${inquiry._id}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500"
                      title="View Inquiry"
                    >
                      <Eye size={17} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default RecentInquiries;
