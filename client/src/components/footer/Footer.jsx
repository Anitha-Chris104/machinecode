import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ChevronUp } from "lucide-react";

import { footerLinks } from "../../data/footerData";

const Footer = () => {
  const scrollTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return (
    <footer className="relative overflow-hidden bg-[#07162D] text-white">
      {/* Blueprint Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}
      <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-[#C2441C]/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top */}

        <div className="grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}

          <div>
            <h2 className="text-3xl font-bold">
              Machine
              <span className="text-[#C2441C]">Code</span>
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              Delivering innovative industrial machinery for food processing,
              hotels, manufacturing, and commercial industries with precision
              engineering.
            </p>

            {/* Social */}

            <div className="mt-8 flex gap-4">
              {footerLinks.social.map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={index}
                    href={item.url}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-[#C2441C]"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h4 className="text-xl font-semibold">Quick Links</h4>

            <ul className="mt-6 space-y-4">
              {footerLinks.quickLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.path}
                    className="text-gray-400 transition hover:text-[#C2441C]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}

          <div>
            <h4 className="text-xl font-semibold">Products</h4>

            <ul className="mt-6 space-y-4">
              {footerLinks.products.map((item) => (
                <li key={item} className="text-gray-400">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h4 className="text-xl font-semibold">Contact</h4>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <MapPin className="text-[#C2441C]" size={20} />
                <p className="text-gray-400">Chennai, Tamil Nadu, India</p>
              </div>

              <div className="flex gap-3">
                <Phone className="text-[#C2441C]" size={20} />
                <p className="text-gray-400">+91 98765 43210</p>
              </div>

              <div className="flex gap-3">
                <Mail className="text-[#C2441C]" size={20} />
                <p className="text-gray-400">info@machinecode.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Strip */}

        <div className="flex flex-wrap items-center justify-center gap-8 border-y border-white/10 py-6 text-sm text-gray-400">
          <span>🏆 ISO 9001 Certified</span>

          <span>⚙️ 15+ Years Experience</span>

          <span>🏭 500+ Installations</span>

          <span>🇮🇳 Proudly Made in India</span>
        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-6 py-8 text-sm text-gray-400 md:flex-row">
          <p>© {new Date().getFullYear()} Machine Code. All Rights Reserved.</p>

          <button
            onClick={scrollTop}
            className="group flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 transition hover:bg-[#C2441C]"
          >
            Back To Top
            <ChevronUp
              size={18}
              className="transition group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
