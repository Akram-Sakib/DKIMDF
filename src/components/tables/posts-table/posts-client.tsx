"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Heading } from "../../ui/dashboard/heading";
import { columns } from "./columns";
import { PostsTable } from "./posts-table";

interface ProductsClientProps {
  isSuperOrGrandAdmin: boolean;
}

export const PostsClient: React.FC<ProductsClientProps> = ({
  isSuperOrGrandAdmin,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || null;

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.POSTS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/posts?page=${page}&limit=${limit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<Post[]>;
    },
  });

  const pageCount = Math.ceil((data?.meta?.total as number) / limit);
  const total = data?.meta?.total as number;
  const allData = data?.data as Post[];

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <PostsTable
        pageCount={pageCount}
        searchKey="title"
        columns={columns}
        data={allData}
        total={total}
        pageNo={page}
      />
    );
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Posts (${isLoading ? "0" : total})`}
          description="Manage Posts for your business"
        />
        {isSuperOrGrandAdmin && (
          <Button
            className="text-xs md:text-sm"
            onClick={() => router.push(`/dashboard/posts/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        )}
      </div>
      <Separator />
      {content}
    </>
  );
};
