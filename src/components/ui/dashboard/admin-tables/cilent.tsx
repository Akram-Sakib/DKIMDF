"use client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/data-table";
// import { columns } from "./columns";
import { User } from "@/constants/data";
import { Separator } from "@/components/ui/separator";
import { Heading } from "../heading";
import { columns } from "./columns";
import { DataTable } from "../../data-table";

interface ProductsClientProps {
  data: User[];
}

export const AdminClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Admins (${data.length})`}
          description="Manage admins for your business"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/admins/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};