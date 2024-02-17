"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { MEMBERSHIP_TYPE, QueryKeys } from "@/constants/common";
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

export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Membership title must be at least 3 characters." }),
  type: z
    .string()
    .min(3, { message: "Membership type must be at least 3 characters." }),
  membershipFee: z.object({
    registrationFee: z
      .string()
      .min(1, { message: "Registration fee must be at least 1." }),
    smartCardFee: z
      .string()
      .min(1, { message: "Smart card fee must be at least 1." }),
    membershipFee: z
      .string()
      .min(1, { message: "Membership fee must be at least 1." }),
    // totalFee: z.string().min(1, { message: "Total fee must be at least 1." }),
  }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface FormProps {}

export const MembershipForm: React.FC<FormProps> = ({}) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const { data: initialData, isLoading: initialDataLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/membership/${params.id}`);
      return data.data;
    },
    queryKey: [QueryKeys.MEMBERSHIP, params.id],
  });

  // const { data: postOffices, isLoading: postOfficesLoading } = useQuery({
  //   queryFn: async () => {
  //     if (!params.id) return;
  //     const data = await axiosInstance.get(`/post-offices?limit=500`);
  //     return data.data;
  //   },
  //   queryKey: [QueryKeys.POSTOFFICE, params.id],
  // });

  const breadcrumbItems = [
    { title: "Membership", link: "/dashboard/membership/" },
    { title: "List", link: "/dashboard/membership/list" },
    {
      title: initialData ? initialData.title : "New",
      link: `/dashboard/list/membership/${params.id}`,
    },
  ];

  const { mutate: createMutation, isPending: createIsPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(
        `/membership/create-membership`,
        data
      );
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MEMBERSHIPS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MEMBERSHIP, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Membership has been created successfully.",
        });
        router.push(`/dashboard/membership/list`);
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
      const res = await axiosInstance.patch(`/membership/${params.id}`, data);
      return res;
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MEMBERSHIPS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MEMBERSHIP, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Membership has been updated successfully.",
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
      const res = await axiosInstance.delete(`/membership/${params.id}`);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MEMBERSHIPS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MEMBERSHIP, params.id],
      });
      if (res.success) {
        toast({
          variant: "default",
          description: "Membership has been deleted successfully.",
        });
        router.push(`/dashboard/memberships/list`);
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
  const title = initialData ? "Edit Membership" : "Create Membership";
  const description = initialData
    ? "Edit a Membership."
    : "Add a new Membership";
  const toastMessage = initialData
    ? "Membership updated."
    : "Membership created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        title: "",
        type: "",
        membershipFee: {
          registrationFee: "",
          smartCardFee: "",
          membershipFee: "",
          totalFee: "",
        },
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

  const registrationFee =
    parseInt(form.watch("membershipFee.registrationFee")) || 0;
  const smartCardFee = parseInt(form.watch("membershipFee.smartCardFee")) || 0;
  const membershipFee =
    parseInt(form.watch("membershipFee.membershipFee")) || 0;

  const totalFee = registrationFee + smartCardFee + membershipFee;

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
          {initialDataLoading ? (
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
              <div className="space-y-2">
                <FormInput
                  name="title"
                  label="Title"
                  placeholder="Enter Title"
                  disabled={loading}
                  required
                />
                <FormSelect
                  name="type"
                  label="Type"
                  placeholder="Select Type"
                  options={MEMBERSHIP_TYPE}
                  disabled={loading}
                  required
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  name="membershipFee.registrationFee"
                  label="Registration Fee"
                  placeholder="Enter Registration Fee"
                  disabled={loading}
                  required
                />
                <FormInput
                  name="membershipFee.smartCardFee"
                  label="Smart Card Fee"
                  placeholder="Enter Smart Card Fee"
                  disabled={loading}
                  required
                />
                <FormInput
                  name="membershipFee.membershipFee"
                  label="Membership Fee"
                  placeholder="Enter Membership Fee"
                  disabled={loading}
                  required
                />
                {/* Make this code stylish */}
                <div className="!mt-8 space-y-2">
                  <h3 className="text-lg font-semibold">Total Fee</h3>
                  <Separator />
                  <span
                    className="text-base mt-4 block"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {totalFee}
                  </span>
                </div>
              </div>
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
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
