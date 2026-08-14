import {
  X,
  Mail,
  Phone,
  Building2,
  Package,
  CalendarDays,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

const InquiryDetailsModal = ({ inquiry, onClose, onStatusChange }) => {
  if (!inquiry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Inquiry Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Customer quotation request
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Customer */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-500">
              Customer Information
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoItem
                icon={MessageSquare}
                label="Name"
                value={inquiry.name}
              />

              <InfoItem icon={Mail} label="Email" value={inquiry.email} />

              <InfoItem icon={Phone} label="Phone" value={inquiry.phone} />

              <InfoItem
                icon={Building2}
                label="Company"
                value={inquiry.company || "Not provided"}
              />
            </div>
          </div>

          {/* Product */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-500">
              Product Information
            </h3>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <Package size={22} className="text-orange-500" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Product</p>

                <p className="font-semibold text-slate-800">
                  {inquiry.productName || "Product"}
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-500">
              Customer Message
            </h3>

            <p className="rounded-xl bg-gray-50 p-4 leading-7 text-gray-600">
              {inquiry.message || "No message provided."}
            </p>
          </div>

          {/* Date + Status */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <CalendarDays size={20} className="text-orange-500" />

                <div>
                  <p className="text-xs text-gray-500">Submitted</p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {inquiry.createdAt
                      ? new Date(inquiry.createdAt).toLocaleString()
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <p className="text-xs text-gray-500">Inquiry Status</p>

              <select
                value={inquiry.status || "new"}
                onChange={(e) => onStatusChange(inquiry._id, e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 font-medium outline-none focus:border-orange-500"
              >
                <option value="new">New</option>

                <option value="contacted">Contacted</option>

                <option value="converted">Converted</option>

                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-6">
            <a
              href={`mailto:${inquiry.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              <Mail size={18} />
              Email Customer
            </a>

            <a
              href={`tel:${inquiry.phone}`}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-gray-50"
            >
              <Phone size={18} />
              Call
            </a>

            {inquiry.phone && (
              <a
                href={`https://wa.me/${inquiry.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-green-300 px-5 py-3 font-semibold text-green-600 transition hover:bg-green-50"
              >
                WhatsApp
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
        <Icon size={18} className="text-orange-500" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>

        <p className="mt-1 break-words font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
};

export default InquiryDetailsModal;
