import DashboardHeader from "@/components/ui/dashboard/dashboard-header";
import Sidebar from "@/components/ui/dashboard/sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF) Dashboard Page.",
};

const AdminDashboardPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardHeader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="w-1/6 hidden md:block" />
        <main className="flex-1 pt-16 overflow-x-hidden overflow-y-auto ">
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminDashboardPage;
