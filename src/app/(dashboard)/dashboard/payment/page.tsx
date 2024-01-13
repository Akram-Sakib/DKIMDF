import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import React from "react";

const breadcrumbItems = [{ title: "Payments", link: "/dashboard/payment" }];
const Payment = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
    </div>
  );
};

export default Payment;
