"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "../../ui/modal/alert-modal";
import { Country } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/helpers/axiosInstance";
import { QueryKeys } from "@/constants/common";
import { toast } from "@/components/ui/use-toast";

interface CellActionProps {
  data: Country;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate: deleteMutation, isPending: deleteIsPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/countries/${data.id}`);
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.COUNTRIES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.COUNTRY],
      });
      toast({
        variant: "default",
        description: "Country has been deleted successfully.",
      });

      router.refresh();
      setOpen(false);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const onConfirm = async () => {
    deleteMutation();
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading || deleteIsPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/places/countries/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
