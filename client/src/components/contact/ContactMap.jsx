import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { motion } from "framer-motion";

const officeDetails = [
  {
    icon: MapPin,
    title: "Head Office",
    value: "No. XX, SIDCO Industrial Estate, Chennai, Tamil Nadu - 600001",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@yourcompany.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon - Sat | 9:00 AM - 6:00 PM",
  },
];

const ContactMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Map Card */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-gray-200">
        {/* Floating Badge */}
        <div className="absolute left-6 top-6 z-10 rounded-full bg-white px-5 py-3 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#852E47] to-[#C2441C]">
              <MapPin className="text-white" size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">Our Location</p>

              <h4 className="font-semibold text-[#0D244D]">Head Office</h4>
            </div>
          </div>
        </div>

        <iframe
          title="Company Location"
          src="YOUR_GOOGLE_MAP_EMBED_URL"
          loading="lazy"
          className="w-full h-[380px] border-0"
        />
      </div>

      {/* Office Card */}
      <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-[#0D244D]">Visit Our Office</h3>

        <p className="mt-3 text-gray-600 leading-7">
          We'd love to meet you. Visit our manufacturing facility or corporate
          office to discuss your industrial machinery requirements.
        </p>

        <div className="mt-8 space-y-6">
          {officeDetails.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#852E47] to-[#C2441C] text-white shadow-lg">
                  <Icon size={20} />
                </div>

                <div>
                  <h5 className="font-semibold text-[#0D244D]">{item.title}</h5>

                  <p className="mt-1 text-gray-600">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#852E47] to-[#C2441C] px-6 py-3 text-white font-medium transition hover:-translate-y-1 hover:shadow-xl"
          >
            <Navigation size={18} />
            Get Directions
          </a>

          <a
            href="tel:+919876543210"
            className="rounded-xl border border-[#852E47] px-6 py-3 font-medium text-[#852E47] transition hover:bg-[#852E47] hover:text-white"
          >
            Call Now
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactMap;
