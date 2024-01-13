import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import React from "react";

const breadcrumbItems = [{ title: "Users", link: "/dashboard/users" }];
const UsersPage = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
    </div>
  );
};

export default UsersPage;
