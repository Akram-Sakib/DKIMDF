"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormInput from "../formelements/form-input";
import FormSelect from "../formelements/form-select";
import BreadCrumb from "../ui/dashboard/breadcrumb";
import { Heading } from "../ui/dashboard/heading";
import { AlertModal } from "../ui/modal/alert-modal";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";
import { Icons } from "../icons";
import { FormComboBox } from "../formelements/form-combobox";

export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Post Office name must be at least 2 characters." }),
  thanaId: z.string().min(2, { message: "Please select a Police Station" }),
  postCode: z.string().min(2, { message: "Please enter a post code" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface FormProps {}

export const PostOfficesForm: React.FC<FormProps> = ({}) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const { data: initialData, isLoading: initialDataLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/post-offices/${params.id}`);
      return data.data;
    },
    queryKey: [QueryKeys.POSTOFFICE, params.id],
  });

  const { data: thanas, isLoading: thanasLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/thana?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.THANAS, params.id],
  });

  const breadcrumbItems = [
    { title: "Places", link: "/dashboard/places/" },
    { title: "Post Offices", link: "/dashboard/places/post-offices" },
    {
      title: initialData ? initialData.name : "New",
      link: `/dashboard/places/post-offices/${params.id}`,
    },
  ];

  const { mutate: createMutation, isPending: createIsPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(
        `/post-offices/create-post-office`,
        data
      );
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POSTOFFICES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POSTOFFICE, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Post Office has been created successfully.",
        });
        router.push(`/dashboard/places/post-offices/`);
      } else {
        toast({
          variant: "destructive",
          title: res.message,
          description: "There was a problem with your request.",
        });
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const { mutate: updateMutation, isPending: updateIsPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.patch(`/post-offices/${params.id}`, data);
      return res;
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POSTOFFICES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POSTOFFICE, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Post Office has been updated successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: res.message,
          description: "There was a problem with your request.",
        });
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const { mutate: deleteMutation, isPending: deleteIsPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/post-offices/${params.id}`);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POSTOFFICES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POSTOFFICE, params.id],
      });
      if (res.success) {
        toast({
          variant: "default",
          description: "Post Office has been deleted successfully.",
        });
        router.push(`/dashboard/places/post-offices/`);
      } else {
        toast({
          variant: "destructive",
          title: res.message,
          description: "There was a problem with your request.",
        });
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit Post Office" : "Create Post Office";
  const description = initialData
    ? "Edit a Post Office."
    : "Add a new Post Office";
  const toastMessage = initialData
    ? "Post Office updated."
    : "Post Office created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        thanaId: "",
        postCode: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log("Submitted data: ");

    try {
      console.log(data);
      setLoading(true);
      if (initialData) {
        updateMutation(data);
      } else {
        createMutation(data);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      deleteMutation();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // const triggerImgUrlValidation = () => form.trigger("imgUrl");
  // if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={
              loading ||
              initialDataLoading ||
              createIsPending ||
              updateIsPending ||
              deleteIsPending
            }
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {initialDataLoading || thanasLoading ? (
            <div className="md:grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-full h-10" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-full h-10" />
              </div>
              {/* <Skeleton className="w-full h-10" /> */}
            </div>
          ) : (
            <div className="md:grid md:grid-cols-3 gap-8">
              <FormInput
                name="name"
                label="Name"
                placeholder="Enter Post Office Name"
                disabled={loading}
                required
              />
              <FormInput
                name="postCode"
                label="Post Code"
                placeholder="Enter Post Code"
                disabled={loading}
                required
              />
              <FormComboBox
                name="thanaId"
                placeholder="Select A Police Station"
                label="Police Station"
                options={thanas?.data.map((thana: any) => ({
                  value: thana.id,
                  label: thana.name,
                }))}
                // disabled={thanasLoading}
                isLoading={thanasLoading}
                required
              />
            </div>
          )}
          <Button
            disabled={
              initialDataLoading ||
              loading ||
              createIsPending ||
              updateIsPending ||
              deleteIsPending
            }
            className="ml-auto"
            type="submit"
          >
            {/* {(createIsPending || updateIsPending) && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
