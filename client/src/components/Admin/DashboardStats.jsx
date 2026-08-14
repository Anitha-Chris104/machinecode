import { useEffect, useState } from "react";
import {
  Package,
  MessageSquare,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { getDashboardStats } from "../../services/dashboardService";

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: Package,
    },
    {
      title: "Total Inquiries",
      value: stats?.totalInquiries ?? 0,
      icon: MessageSquare,
    },
    {
      title: "New Inquiries",
      value: stats?.newInquiries ?? 0,
      icon: Sparkles,
    },
    {
      title: "Contacted",
      value: stats?.contactedInquiries ?? 0,
      icon: PhoneCall,
    },
    {
      title: "Converted",
      value: stats?.convertedInquiries ?? 0,
      icon: CheckCircle2,
    },
    {
      title: "Closed",
      value: stats?.closedInquiries ?? 0,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
              <Icon size={21} className="text-orange-500" />
            </div>

            <p className="mt-5 text-sm font-medium text-gray-500">
              {card.title}
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-800">
              {loading ? "..." : card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
