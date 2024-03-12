"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BLOODGROUP, QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod";
import FormCldImage from "../formelements/form-cldImage";
import { FormComboBox } from "../formelements/form-combobox";
import FormDatePicker from "../formelements/form-date-picker";
import FormInput from "../formelements/form-input";
import FormSelect from "../formelements/form-select";
import PersistForm from "../formelements/user-form";
import BreadCrumb from "../ui/dashboard/breadcrumb";
import { Heading } from "../ui/dashboard/heading";
import { AlertModal } from "../ui/modal/alert-modal";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  member: z.object({
    imageUrl: z.string().optional(),
    firstName: z
      .string()
      .min(2, { message: "First Name must be at least 2 characters." }),
    lastName: z
      .string()
      .min(2, { message: "Last Name must be at least 2 characters." }),
    authorizationScope: z
      .string()
      .min(2, { message: "Invalid authorization scope." }),
    authorizationArea: z
      .string()
      .min(2, { message: "Invalid authorization area." }),
    dateOfBirth: z.string().optional(),
    education: z.string().optional(),
    bloodGroup: z
      .enum([...BLOODGROUP.map((group) => group.value)] as [
        string,
        ...string[]
      ])
      .optional(),
    nidNumber: z.string().optional(),
    occupation: z.string().optional(),
    referenceId: z.string().optional(),
    fathersName: z.string().optional(),
    mothersName: z.string().optional(),
    spouseName: z.string().optional(),
  }),
});

const formUpdateSchema = z.object({
  phoneNumber: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }).optional(),
  password: z.string().optional(),
  imageUrl: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  authorizationScope: z.string().optional(),
  authorizationArea: z.string().optional(),
  dateOfBirth: z.string().optional(),
  education: z.string().optional(),
  bloodGroup: z
    .enum([...BLOODGROUP.map((group) => group.value)] as [string, ...string[]])
    .optional(),
  nidNumber: z.string().optional(),
  occupation: z.string().optional(),
  referenceId: z.string().optional(),
  fathersName: z.string().optional(),
  mothersName: z.string().optional(),
  spouseName: z.string().optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface FormProps {}

export const MemberForm: React.FC<FormProps> = ({}) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const authorizationScope = searchParams.get("authorizationScope");
  const [authorizationArea, setAuthorizationArea] = useState([]);
  const queryClient = useQueryClient();

  const { data: initialData, isLoading: initialDataLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/members/${params.id}`);
      return data.data;
    },
    queryKey: [QueryKeys.ADMIN, params.id],
  });

  const { data: countries, isLoading: countriesLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/countries?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.COUNTRIES, params.id],
    enabled: authorizationScope === "country",
  });

  const { data: divisions, isLoading: divisionsLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/divisions?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.DIVISIONS, params.id],
    enabled: authorizationScope === "division",
  });

  const { data: districts, isLoading: districtsLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/districts?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.DISTRICTS, params.id],
    enabled: authorizationScope === "district",
  });

  const { data: thanas, isLoading: thanasLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/thana?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.THANAS, params.id],
    enabled: authorizationScope === "thana",
  });

  const { data: postOffices, isLoading: postOfficesLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/post-offices?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.POSTOFFICE, params.id],
    enabled: authorizationScope === "postOffice",
  });

  const { data: villages, isLoading: villagesLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/villages?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.VILLAGES, params.id],
    enabled: authorizationScope === "village",
  });
  // set to the authorization scope area which is enabled

  useEffect(() => {
    if (
      !countriesLoading &&
      countries?.data &&
      authorizationScope === "country"
    ) {
      setAuthorizationArea(countries?.data);
    } else if (
      !divisionsLoading &&
      divisions?.data &&
      authorizationScope === "division"
    ) {
      setAuthorizationArea(divisions?.data);
    } else if (
      !districtsLoading &&
      districts?.data &&
      authorizationScope === "district"
    ) {
      setAuthorizationArea(districts?.data);
    } else if (
      !thanasLoading &&
      thanas?.data &&
      authorizationScope === "thana"
    ) {
      setAuthorizationArea(thanas?.data);
    } else if (
      !postOfficesLoading &&
      postOffices?.data &&
      authorizationScope === "postOffice"
    ) {
      setAuthorizationArea(postOffices?.data);
    } else if (
      !villagesLoading &&
      villages?.data &&
      authorizationScope === "village"
    ) {
      setAuthorizationArea(villages?.data);
    }
  }, [
    countries,
    divisions,
    districts,
    thanas,
    postOffices,
    villages,
    authorizationScope,
    countriesLoading,
    divisionsLoading,
    districtsLoading,
    thanasLoading,
    postOfficesLoading,
    villagesLoading,
  ]);

  const breadcrumbItems = [
    { title: "Manage Members", link: "/dashboard/" },
    { title: "Members", link: "/dashboard/members" },
    {
      title: initialData
        ? initialData.firstName + " " + initialData.lastName
        : "New",
      link: `/dashboard/members/${params.id}`,
    },
  ];

  const { mutate: createMutation, isPending: createIsPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(`/users/create-member`, data);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ADMINS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ADMIN, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Member has been created successfully.",
        });
        router.push(`/dashboard/members/`);
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
        `/users/${initialData.userId}`,
        data
      );
      return res;
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ADMINS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ADMIN, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Member has been updated successfully.",
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
      const res = await axiosInstance.delete(`/members/${params.id}`);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ADMINS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ADMIN, params.id],
      });
      if (res.success) {
        toast({
          variant: "default",
          description: "Member has been deleted successfully.",
        });
        router.push(`/dashboard/members/`);
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
  const title = initialData ? "Edit Member" : "Create Member";
  const description = initialData ? "Edit a Member." : "Add a new Member";
  const toastMessage = initialData ? "Member updated." : "Member created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        // email: "",
        // phoneNumber: "",
        // password: "",
        // member: {
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        gender: "",
        imageUrl: "",
        authorizationScope: "",
        authorizationArea: "",
        dateOfBirth: "",
        education: "",
        bloodGroup: "",
        nidNumber: "",
        occupation: "",
        referenceId: "",
        spouseName: "",
        // },
      };

  // const form = useForm<ProductFormValues>({
  //   resolver: zodResolver(initialData ? formUpdateSchema : formSchema),
  //   defaultValues,
  // });

  const onSubmit = (data: { [x: string]: any }): void => {
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

  const isUpdate = initialData ? "" : "member.";
  console.log(`${isUpdate}firstName`);
  
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
      <PersistForm
        // {...form}
        formSchema={initialData ? formUpdateSchema : formSchema}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        formId="memberForm"
        className="space-y-8 w-full"
      >
        {/* <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        > */}
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
            <FormCldImage
              name={`${isUpdate}imageUrl`}
              label="Member Image"
              placeholder="Select Member Image"
              disabled={loading}
            />
            <FormInput
              name={`${isUpdate}firstName`}
              label="First Name"
              placeholder="Enter Members First Name"
              disabled={loading}
              required
            />
            <FormInput
              name={`${isUpdate}lastName`}
              label="Last Name"
              placeholder="Enter Members Last Name"
              disabled={loading}
              required
            />
            <FormInput
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter Members Phone Number"
              disabled={loading}
              required
            />
            <FormInput
              name="email"
              label="Email"
              placeholder="Enter Members Email"
              disabled={loading}
              required
            />
            {!initialData && (
              <FormInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter Members Password"
                disabled={loading}
                required
              />
            )}
            <FormSelect
              name={`${isUpdate}authorizationScope`}
              placeholder="Select Scope of Authorization"
              label="Member Authorization Scope"
              options={[
                { value: "country", label: "Country" },
                { value: "division", label: "Division" },
                { value: "district", label: "District" },
                { value: "thana", label: "Thana" },
                { value: "postOffice", label: "Post Office" },
                { value: "village", label: "Village" },
              ]}
              disabled={loading}
              required
            />
            <FormComboBox
              name={`${isUpdate}authorizationArea`}
              placeholder="Select Area of Authorization"
              label="Member Authorization Area"
              options={
                authorizationArea?.map((area: any) => ({
                  value: area.id,
                  label: area.name,
                })) || []
              }
              isLoading={loading || countriesLoading || divisionsLoading}
              required
            />
            <FormDatePicker
              name={`${isUpdate}dateOfBirth`}
              label="Date of Birth"
              placeholder="Select Date of Birth"
              // disabled={loading}
            />
            <FormInput
              name={`${isUpdate}education`}
              label="Education"
              placeholder="Enter Members Education"
              disabled={loading}
            />
            <FormSelect
              name={`${isUpdate}bloodGroup`}
              placeholder="Select Blood Group"
              label="Blood Group"
              options={BLOODGROUP}
              disabled={loading}
            />
            <FormInput
              name={`${isUpdate}nidNumber`}
              label="NID Number"
              placeholder="Enter Members NID Number"
              disabled={loading}
            />
            <FormInput
              name={`${isUpdate}occupation`}
              label="Occupation"
              placeholder="Enter Members Occupation"
              disabled={loading}
            />
            <FormInput
              name={`${isUpdate}referenceId`}
              label="Reference ID"
              placeholder="Enter Members Reference ID"
              disabled={loading}
            />
            <FormInput
              name={`${isUpdate}fathersName`}
              label="Fathers Name"
              placeholder="Enter Members Fathers Name"
              disabled={loading}
            />
            <FormInput
              name={`${isUpdate}mothersName`}
              label="Mothers Name"
              placeholder="Enter Members Mothers Name"
              disabled={loading}
            />
            <FormInput
              name={`${isUpdate}spouseName`}
              label="Spouse Name"
              placeholder="Enter Members Spouse Name"
              disabled={loading}
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
          {action}
        </Button>
        {/* </form> */}
      </PersistForm>
    </>
  );
};
