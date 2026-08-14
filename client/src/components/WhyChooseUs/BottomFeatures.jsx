import {
  ShieldCheck,
  Cog,
  HardHat,
  Headphones,
  Handshake,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "ISO 9001:2015",
    description: "Certified Company",
  },
  {
    icon: Cog,
    title: "Advanced Technology",
    description: "Modern machinery",
  },
  {
    icon: HardHat,
    title: "Expert Engineers",
    description: "Skilled & experienced",
  },
  {
    icon: Headphones,
    title: "24×7 Support",
    description: "Always here when you need us",
  },
  {
    icon: Handshake,
    title: "End-to-End Solutions",
    description: "From concept to commissioning",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Built for long-term reliability",
  },
];

export default function BottomFeatures() {
  return (
    <section className="m-12 ">
      <div className="rounded-[28px] border border-white/10 bg-[#0B1B2F]/70 backdrop-blur-xl overflow-hidden px-3">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="relative flex items-start gap-6 px-25 py-3"
              >
                {/* Vertical Divider */}
                {index !== features.length - 1 && (
                  <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/15" />
                )}

                <Icon
                  size={40}
                  strokeWidth={1.8}
                  className="text-orange-500 flex-shrink-0 pl-3"
                />

                <div>
                  <h3 className="text-white font-semibold text-lg leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-2 leading-4">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
