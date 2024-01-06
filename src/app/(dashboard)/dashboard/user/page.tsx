import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { UserClient } from "@/components/ui/dashboard/user-tables/cilent";
import { users } from "@/constants/data";
import React from "react";
const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];

const UserPage = () => {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
};

export default UserPage;
