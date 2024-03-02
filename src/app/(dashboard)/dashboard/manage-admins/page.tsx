import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { Heading } from "@/components/ui/dashboard/heading";
import Link from "next/link";
import React from "react";
const breadcrumbItems = [{ title: "Admins", link: "/dashboard/manage-admins" }];

const AdminManagementPage = () => {
  const places = [
    // {
    //   title: "Grand Admin",
    //   link: "/dashboard/manage-admins/grand-admin",
    // },
    {
      title: "Super Admins",
      link: "/dashboard/manage-admins/super-admins",
    },
    {
      title: "Admins",
      link: "/dashboard/manage-admins/admins",
    },
  ];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Heading
          title={`All Types Of Admins`}
          description="Check your all types of admins list."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {places.map((place, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{place.title}</CardTitle>
                <CardDescription>
                  Check your {place.title.toLowerCase()} list
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={place.link}>
                  <Button>{place.title}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminManagementPage;
