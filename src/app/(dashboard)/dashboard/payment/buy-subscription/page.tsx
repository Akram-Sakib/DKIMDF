import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import React from "react";
const breadcrumbItems = [
  { title: "Payment", link: "/dashboard/payment" },
  { title: "Buy Subscription", link: "/dashboard/payment/buy-subscription" },
];
const BuySubscriptionPage = () => {
  return (
    <div className="flex-1 space-y-12 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
    </div>
  );
};

export default BuySubscriptionPage;
