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
  { title: "Subscription", link: "/dashboard/subscription" },
];

const SubscriptionPage = () => {
  return (
    <div className="flex-1 space-y-12 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex flex-col md:flex-row gap-12">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Subscription List</CardTitle>
            <CardDescription>Check your subscription list</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={"/dashboard/subscription/list"}>
              <Button>List</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Extend Your Subscription</CardTitle>
            <CardDescription>
              Extend your subscription for more time
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={"/dashboard/subscription/list/buy-subscription"}>
              <Button>Create</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPage;
