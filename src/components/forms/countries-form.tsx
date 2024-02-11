"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import config from "@/config";
import { axiosInstance } from "@/helpers/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormInput from "../formelements/form-input";
import { AlertModal } from "../ui/modal/alert-modal";
import { useToast } from "../ui/use-toast";
import { Heading } from "../ui/dashboard/heading";
import { QueryKeys } from "@/constants/common";
import BreadCrumb from "../ui/dashboard/breadcrumb";

export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter a country name" }),
  userId: z.string().min(1, { message: "Please enter a user id" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface FormProps {}

export const CountriesForm: React.FC<FormProps> = ({}) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const { data: initialData, isLoading: initialDataLoading } = useQuery({
    queryFn: async () => {
      const data = await axiosInstance.get(`/countries/${params.countryId}`);
      return data.data;
    },
    queryKey: [QueryKeys.COUNTRY],
  });

  const breadcrumbItems = [
    { title: "Places", link: "/dashboard/places/" },
    { title: "Countries", link: "/dashboard/places/countries" },
    // { title: "New", link: "/dashboard/countries/new" },
    {
      title: initialData ? initialData.name : "New",
      link: `/dashboard/places/countries/${params.countryId}`,
    },
  ];

  const { mutate: createMutation, isPending: createIsPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(`/countries/create-country`, data);
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
        title: toastMessage,
        description: "Country has been created successfully.",
      });
      router.push(`/dashboard/countries/`);
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
      const res = await axiosInstance.patch(
        `/countries/${params.countryId}`,
        data
      );
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch
      // Promise.all([
      // queryClient.invalidateQueries([QueryKeys.COUNTRIES]),
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.COUNTRIES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.COUNTRY],
      });
      // ])
      // queryClient.invalidateQueries({
      //   queryKey: [QueryKeys.COUNTRIES, QueryKeys.COUNTRY],
      // });
      toast({
        variant: "default",
        title: toastMessage,
        description: "Country has been updated successfully.",
      });
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
      const res = await axiosInstance.delete(`/countries/${params.countryId}`);
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
      router.push(`/dashboard/countries/`);
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
  const [loading, setLoading] = useState(initialDataLoading || false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit Country" : "Create Country";
  const description = initialData ? "Edit a Country." : "Add a new Country";
  const toastMessage = initialData ? "Country updated." : "Country created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        userId: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      console.log(data);
      setLoading(true);

      if (initialData) {
        updateMutation(data);
      } else {
        createMutation(data);
      }
      // router.refresh();
      // router.push(`/dashboard/countries`);
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
      // router.refresh();
      // router.push(`/${params.countryId}/countries`);
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
              loading || createIsPending || updateIsPending || deleteIsPending
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
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormInput
              name="name"
              label="Name"
              placeholder="Enter Country Name"
              disabled={loading}
              required
            />
            <FormInput
              name="userId"
              label="User Id"
              placeholder="Enter User Id"
              disabled={loading}
              required
            />
          </div>
          <Button
            disabled={
              loading || createIsPending || updateIsPending || deleteIsPending
            }
            className="ml-auto"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
