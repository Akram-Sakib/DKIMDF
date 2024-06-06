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
import SubscriptionCard from "../cards/subscription-card";
import FormInput from "../formelements/form-input";
import BreadCrumb from "../ui/dashboard/breadcrumb";
import { Heading } from "../ui/dashboard/heading";
import { AlertModal } from "../ui/modal/alert-modal";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  membershipId: z.string().nonempty({ message: "Membership is required." }),
  subscriptionFee: z.object({
    registrationFee: z
      .string()
      .min(1, { message: "Registration fee must be at least 1." })
      .optional(),
    smartCardFee: z
      .string()
      .min(1, { message: "Smart card fee must be at least 1." })
      .optional(),
    subscriptionFee: z
      .string()
      .min(1, { message: "Subscription fee must be at least 1." }),
    // totalFee: z.string().min(1, { message: "Total fee must be at least 1." }),
  }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface FormProps {}

export const SubscriptionForm: React.FC<FormProps> = ({}) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const { data: initialData, isLoading: initialDataLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/subscription/${params.id}`);
      return data.data;
    },
    queryKey: [QueryKeys.SUBSCRIPTION, params.id],
  });

  const breadcrumbItems = [
    { title: "Subscription", link: "/dashboard/subscription/" },
    { title: "List", link: "/dashboard/subscription/list" },
    {
      title: initialData ? initialData.id : "Buy Subscription",
      link: `/dashboard/list/subscription/${params.id}`,
    },
  ];

  const { mutate: createMutation, isPending: createIsPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(
        `/subscription/create-subscription`,
        data
      );
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUBSCRIPTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUBSCRIPTION, params.id],
      });

      if (res.success) {
        console.log(res.data);

        toast({
          variant: "default",
          title: toastMessage,
          description: "Subscription has been extended successfully.",
        });
        window.location.replace(res.data.paymentGatewayPageURL);
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
      const res = await axiosInstance.patch(`/subscription/${params.id}`, data);
      return res;
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUBSCRIPTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUBSCRIPTION, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Subscription has been updated successfully.",
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
      const res = await axiosInstance.delete(`/subscription/${params.id}`);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUBSCRIPTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUBSCRIPTION, params.id],
      });
      if (res.success) {
        toast({
          variant: "default",
          description: "Subscription has been deleted successfully.",
        });
        router.push(`/dashboard/subscriptions/list`);
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
  const title = initialData ? "Edit Subscription" : "Extend Your Subscription";
  const description = initialData
    ? "Edit a Subscription."
    : "Create a new Subscription.";
  const toastMessage = initialData
    ? "Subscription updated."
    : "Subscription created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        title: "",
        type: "",
        subscriptionFee: {
          registrationFee: "",
          smartCardFee: "",
          subscriptionFee: "",
          totalFee: "",
        },
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {

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

  const registrationFee =
    parseInt(form.watch("subscriptionFee.registrationFee") as any) || 0;
  const smartCardFee =
    parseInt(form.watch("subscriptionFee.smartCardFee") as any) || 0;
  const subscriptionFee =
    parseInt(form.watch("subscriptionFee.subscriptionFee")) || 0;

  const totalFee = registrationFee + smartCardFee + subscriptionFee;

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
          {initialData ? (
            <div>
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
                    {/* <FormSelect
                  name="type"
                  label="Type"
                  placeholder="Select Type"
                  options={SUBSCRIPTION_TYPE}
                  disabled={loading}
                  required
                /> */}
                  </div>
                  <div className="space-y-2">
                    <FormInput
                      name="subscriptionFee.registrationFee"
                      label="Registration Fee"
                      placeholder="Enter Registration Fee"
                      disabled={loading}
                      required
                    />
                    <FormInput
                      name="subscriptionFee.smartCardFee"
                      label="Smart Card Fee"
                      placeholder="Enter Smart Card Fee"
                      disabled={loading}
                      required
                    />
                    <FormInput
                      name="subscriptionFee.subscriptionFee"
                      label="Subscription Fee"
                      placeholder="Enter Subscription Fee"
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
            </div>
          ) : (
            <SubscriptionCard />
          )}
        </form>
      </Form>
    </>
  );
};
