"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import FormCldImage from "../formelements/form-cldImage";
import FormInput from "../formelements/form-input";
import FormTextArea from "../formelements/form-textarea";
import PersistForm from "../formelements/user-form";
import BreadCrumb from "../ui/dashboard/breadcrumb";
import { Heading } from "../ui/dashboard/heading";
import { AlertModal } from "../ui/modal/alert-modal";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";

const PostSchema = z.object({ // Optional, as it might be generated on creation
  title: z.string().min(1, "Title is required"), // Title must be at least 1 character long
  description: z.string().min(3).max(3000).optional(), // Optional description
  imageUrl: z.string().url("Invalid URL format"), // Image URL must be a valid URL
  views: z.number().min(0).default(0).optional(), // Views default to 0 and must be non-negative
  createdAt: z.date().optional(), // Automatically set, not required on input
  updatedAt: z.date().optional(), // Automatically updated
  userId: z.string().uuid("Invalid User ID format"), // User ID must be a valid UUID
  categoryId: z.string().uuid("Invalid Category ID format").optional(), // Category ID must be a valid UUID
});

export const IMG_MAX_LIMIT = 3;

type ProductFormValues = z.infer<typeof PostSchema>;

interface FormProps {}

export const PostForm: React.FC<FormProps> = ({}) => {
  const { data } = useSession();
  const userId = (data as any)?.userId;

  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { data: initialData, isLoading: initialDataLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/posts/${params.id}`);
      return data.data;
    },
    queryKey: [QueryKeys.POST, params.id],
  });

  const { data: countries, isLoading: countriesLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/countries?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.COUNTRIES, params.id],
    // enabled: authorizationScope === "country",
  });

  // useEffect(() => {
  //   if (
  //     !countriesLoading &&
  //     countries?.data &&
  //     authorizationScope === "country"
  //   ) {
  //     setAuthorizationArea(countries?.data);
  //   }
  // }, []);

  const breadcrumbItems = [
    { title: "Posts", link: "/dashboard/posts" },
    {
      title: initialData ? initialData.title : "New",
      link: `/dashboard/posts/${params.id}`,
    },
  ];

  const { mutate: createMutation, isPending: createIsPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(`/users/create-admin`, data);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POST, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Post has been created successfully.",
        });
        router.push(`/dashboard/posts/`);
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
      const res = await axiosInstance.patch(`/posts/${initialData.id}`, data);
      return res;
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POST, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Post has been updated successfully.",
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
      const res = await axiosInstance.delete(`/posts/${params.id}`);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POST, params.id],
      });
      if (res.success) {
        toast({
          variant: "default",
          description: "Post has been deleted successfully.",
        });
        router.push(`/dashboard/posts/`);
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
  const title = initialData ? "Edit Post" : "Create Post";
  const description = initialData ? "Edit a Post." : "Add a new Post";
  const toastMessage = initialData ? "Post updated." : "Post Uploaded.";
  const action = initialData ? "Save changes" : "Post";

  const defaultValues = initialData
    ? initialData
    : {
        title: "",
        description: "",
        imageUrl: "",
        userId: userId,
        views: 0,
        categoryId: "",
      };

  // const form = useForm<ProductFormValues>({
  //   resolver: zodResolver(initialData ? formUpdateSchema : formSchema),
  //   defaultValues,
  // });

  const onSubmit = (data: { [x: string]: any }): void => {
    console.log("Onsubmit is hitting with - ", data);

    try {
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

      <ScrollArea>
        <PersistForm
          // {...form}
          formSchema={
            initialData
              ? (PostSchema.optional() as any)
              : (PostSchema as any)
          }
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          formId="postForm"
          className="space-y-8 w-full"
        >
          {/* <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        > */}
          {initialDataLoading ? (
            <div className="md:grid md:grid-cols-1 gap-8">
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
            <>
              <div className="md:grid md:grid-cols-1 gap-8">
                <FormCldImage
                  name={`imageUrl`}
                  label="Post Image"
                  placeholder="Upload Post Image"
                  disabled={loading}
                />
                <FormInput
                  name={`title`}
                  label="Title"
                  placeholder="Enter your post title"
                  disabled={loading}
                  required
                />
                <FormTextArea
                  name={`description`}
                  label="Description"
                  placeholder="Enter your post description"
                  disabled={loading}
                />

                {/* <FormComboBox
                  name={`${isUpdate}authorizationArea`}
                  placeholder="Select Area of Authorization"
                  label="Post Authorization Area"
                  options={
                    categoris?.map((area: any) => ({
                      value: area.id,
                      label: area.name,
                    })) || []
                  }
                  isLoading={loading || countriesLoading }
                  required
                /> */}
              </div>
            </>
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
            {action}
          </Button>
          {/* </form> */}
        </PersistForm>
      </ScrollArea>
    </>
  );
};
