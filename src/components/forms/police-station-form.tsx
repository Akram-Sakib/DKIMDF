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
    .min(2, { message: "Police Station name must be at least 2 characters." }),
  districtId: z.string().min(2, { message: "Please select a district" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface FormProps {}

export const PoliceStationForm: React.FC<FormProps> = ({}) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const { data: initialData, isLoading: initialDataLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/thana/${params.id}`);
      return data.data;
    },
    queryKey: [QueryKeys.THANA, params.id],
  });

  const { data: districts, isLoading: districtLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/districts?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.DISTRICTS, params.id],
  });

  const breadcrumbItems = [
    { title: "Places", link: "/dashboard/places/" },
    { title: "Police Station", link: "/dashboard/places/police-stations" },
    {
      title: initialData ? initialData.name : "New",
      link: `/dashboard/places/police-stations/${params.id}`,
    },
  ];

  const { mutate: createMutation, isPending: createIsPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(`/thana/create-thana`, data);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.THANAS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.THANA, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Police Station has been created successfully.",
        });
        router.push(`/dashboard/places/police-stations/`);
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
      const res = await axiosInstance.patch(`/thana/${params.id}`, data);
      return res;
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.THANAS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.THANA, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Police Station has been updated successfully.",
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
      const res = await axiosInstance.delete(`/thana/${params.id}`);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.THANAS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.THANA, params.id],
      });
      if (res.success) {
        toast({
          variant: "default",
          description: "Police Station has been deleted successfully.",
        });
        router.push(`/dashboard/places/police-stations/`);
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
  const title = initialData ? "Edit Police Station" : "Create Police Station";
  const description = initialData
    ? "Edit a Police Station."
    : "Add a new Police Station";
  const toastMessage = initialData
    ? "Police Station updated."
    : "Police Station created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        districtId: "",
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
          {initialDataLoading || districtLoading ? (
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
                placeholder="Enter Police Station Name"
                disabled={loading}
                required
              />
              <FormComboBox
                name="districtId"
                placeholder="Select A Police Station"
                label="Police Station"
                options={districts?.data.map((district: any) => ({
                  value: district.id,
                  label: district.name,
                }))}
                // disabled={districtLoading}
                isLoading={districtLoading}
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
