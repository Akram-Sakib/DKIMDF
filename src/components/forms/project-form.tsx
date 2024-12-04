"use client";

import { ProjectValidation } from "@/app/api/v1/projects/project.validation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FormCldImage from "../formelements/form-cldImage";
import FormInput from "../formelements/form-input";
import FormTextArea from "../formelements/form-textarea";
import PersistForm from "../formelements/user-form";
import BreadCrumb from "../ui/dashboard/breadcrumb";
import { Heading } from "../ui/dashboard/heading";
import { AlertModal } from "../ui/modal/alert-modal";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

export const IMG_MAX_LIMIT = 3;

interface FormProps {}

export const ProjectForm: React.FC<FormProps> = ({}) => {
  const { data } = useSession();
  const userId = (data as any)?.userId;

  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { data: initialData, isLoading: initialDataLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/projects/${params.id}`);
      return data.data;
    },
    queryKey: [QueryKeys.PROJECT, params.id],
  });

  const breadcrumbItems = [
    { title: "Projects", link: "/dashboard/projects" },
    {
      title: initialData ? initialData.title : "New",
      link: `/dashboard/projects/${params.id}`,
    },
  ];

  const { mutate: createMutation, isPending: createIsPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(`/projects/create-project`, data);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROJECTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROJECT, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Project has been created successfully.",
        });
        router.push(`/dashboard/projects/`);
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
      const res = await axiosInstance.patch(
        `/projects/${initialData.id}`,
        data
      );
      return res;
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROJECTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROJECT, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Project has been updated successfully.",
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
      const res = await axiosInstance.delete(`/projects/${params.id}`);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROJECTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROJECT, params.id],
      });
      if (res.success) {
        toast({
          variant: "default",
          description: "Project has been deleted successfully.",
        });
        router.push(`/dashboard/projects/`);
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
  const title = initialData ? "Edit Project" : "Create Project";
  const description = initialData ? "Edit a Project." : "Add a new Project";
  const toastMessage = initialData ? "Project updated." : "Project Uploaded.";
  const action = initialData ? "Save changes" : "Create";

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

  const onSubmit = (data: { [x: string]: any }): void => {
    console.log("Hitted", data);

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
          formSchema={
            initialData
              ? (ProjectValidation.ProjectSchemaUpdate as any)
              : (ProjectValidation.ProjectSchema as any)
          }
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          formId="projectForm"
          className="space-y-8 w-full"
        >
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
                  label="Project Image"
                  placeholder="Upload Project Image"
                  disabled={loading}
                />
                <FormInput
                  name={`title`}
                  label="Title"
                  placeholder="Enter your project title"
                  disabled={loading}
                  required
                />
                <FormTextArea
                  name={`description`}
                  label="Description"
                  placeholder="Enter your project description"
                  disabled={loading}
                />

                {/* <FormComboBox
                  name={`${isUpdate}authorizationArea`}
                  placeholder="Select Area of Authorization"
                  label="Project Authorization Area"
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
