import React from "react";
import DashboardStats from "../../components/Admin/DashboardStats";
import RecentInquiries from "../../components/Admin/RecentInquiries";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-800">Dashboard</h1>

      <p className="mb-8 text-gray-500">
        Welcome back. Here's an overview of your MachineCode website.
      </p>

      <DashboardStats />
      <RecentInquiries />

      {/* Other dashboard sections */}
    </div>
  );
};

export default Dashboard;
