import BreadCrumb from "@/components/ui/dashboard/breadcrumb";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const breadcrumbItems = [
  { title: "Membership", link: "/dashboard/membership" },
];

const MembershipPage = () => {
  return (
    <div className="flex-1 space-y-12 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex flex-col md:flex-row gap-12">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Membership List</CardTitle>
            <CardDescription>Check your membership list</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={"/dashboard/membership/list"}>
              <Button>List</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create New Membership</CardTitle>
            <CardDescription>
              Create new membership for your account
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={"/dashboard/membership/list/new"}>
              <Button>Create</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MembershipPage;
