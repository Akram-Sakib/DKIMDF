"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { BLOODGROUP, QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormInput from "../formelements/form-input";
import FormSelect from "../formelements/form-select";
import BreadCrumb from "../ui/dashboard/breadcrumb";
import { Heading } from "../ui/dashboard/heading";
import { AlertModal } from "../ui/modal/alert-modal";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";
import { FormComboBox } from "../formelements/form-combobox";
import FormDatePicker from "../formelements/form-date-picker";
import PersistForm from "../formelements/user-form";
import FormCldImage from "../formelements/form-cldImage";
import { ScrollArea } from "@/components/ui/scroll-area";
import FormDateTimePickerV2 from "../formelements/form-date-picker-2";

export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  superAdmin: z.object({
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
    dateOfBirth: z.coerce.date().optional(),
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
  presentAddress: z.object({
    countryId: z.string().optional(),
    divisionId: z.string().optional(),
    districtId: z.string().optional(),
    thanaId: z.string().optional(),
    postOfficeId: z.string().optional(),
    villageId: z.string().optional(),
  }),
  permanentAddress: z.object({
    countryId: z.string().optional(),
    divisionId: z.string().optional(),
    districtId: z.string().optional(),
    thanaId: z.string().optional(),
    postOfficeId: z.string().optional(),
    villageId: z.string().optional(),
  }),
});

const formUpdateSchema = z.object({
  phoneNumber: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }).optional(),
  password: z.string().optional(),
  // superAdmin: z.object({
  imageUrl: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  authorizationScope: z.string().optional(),
  authorizationArea: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
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
  presentAddress: z.object({
    countryId: z.string().optional(),
    divisionId: z.string().optional(),
    districtId: z.string().optional(),
    thanaId: z.string().optional(),
    postOfficeId: z.string().optional(),
    villageId: z.string().optional(),
  }),
  permanentAddress: z.object({
    countryId: z.string().optional(),
    divisionId: z.string().optional(),
    districtId: z.string().optional(),
    thanaId: z.string().optional(),
    postOfficeId: z.string().optional(),
    villageId: z.string().optional(),
  }),
  // }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface FormProps {}

export const SuperAdminForm: React.FC<FormProps> = ({}) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [authorizationArea, setAuthorizationArea] = useState([]);
  const queryClient = useQueryClient();

  const { data: initialData, isLoading: initialDataLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/super-admins/${params.id}`);
      return data.data;
    },
    queryKey: [QueryKeys.ADMIN, params.id],
  });

  const authorizationScope =
    searchParams.get("authorizationScope") || initialData?.authorizationScope;

  const { data: countries, isLoading: countriesLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/countries?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.COUNTRIES, params.id],
    // enabled: authorizationScope === "country",
  });

  const { data: divisions, isLoading: divisionsLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/divisions?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.DIVISIONS, params.id],
    // enabled: authorizationScope === "division",
  });

  const { data: districts, isLoading: districtsLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/districts?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.DISTRICTS, params.id],
    // enabled: authorizationScope === "district",
  });

  const { data: thanas, isLoading: thanasLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/thana?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.THANAS, params.id],
    // enabled: authorizationScope === "thana",
  });

  const { data: postOffices, isLoading: postOfficesLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/post-offices?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.POSTOFFICE, params.id],
    // enabled: authorizationScope === "postOffice",
  });

  const { data: villages, isLoading: villagesLoading } = useQuery({
    queryFn: async () => {
      if (!params.id) return;
      const data = await axiosInstance.get(`/villages?limit=500`);
      return data.data;
    },
    queryKey: [QueryKeys.VILLAGES, params.id],
    // enabled: authorizationScope === "village",
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
    { title: "Manage Admins", link: "/dashboard/manage-admins/" },
    { title: "Super Admins", link: "/dashboard/manage-admins/super-admins" },
    {
      title: initialData
        ? initialData.firstName + " " + initialData.lastName
        : "New",
      link: `/dashboard/manage-admins/super-admins/${params.id}`,
    },
  ];

  const { mutate: createMutation, isPending: createIsPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post(`/users/create-super-admin`, data);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUPERADMINS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUPERADMIN, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Super Admin has been created successfully.",
        });
        router.push(`/dashboard/manage-admins/super-admins/`);
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
        `/super-admins/${initialData.id}`,
        data
      );
      return res;
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUPERADMINS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUPERADMIN, params.id],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: toastMessage,
          description: "Super Admin has been updated successfully.",
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
      const res = await axiosInstance.delete(`/super-admins/${params.id}`);
      return res;
    },
    onSuccess: (res: any) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUPERADMINS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SUPERADMIN, params.id],
      });
      if (res.success) {
        toast({
          variant: "default",
          description: "Super Admin has been deleted successfully.",
        });
        router.push(`/dashboard/manage-admins/super-admins/`);
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
  const title = initialData ? "Edit Super Admin" : "Create Super Admin";
  const description = initialData
    ? "Edit a Super Admin."
    : "Add a new Super Admin";
  const toastMessage = initialData
    ? "Super Admin updated."
    : "Super Admin created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        // email: "",
        // phoneNumber: "",
        // password: "",
        // superAdmin: {
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

  const isUpdate = initialData ? "" : "superAdmin.";

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
      <ScrollArea>
        <PersistForm
          // {...form}
          formSchema={initialData ? formUpdateSchema : formSchema}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          formId="superAdminForm"
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
            <>
              <div className="md:grid md:grid-cols-3 gap-8 space-y-4 md:space-y-2">
                <FormCldImage
                  name={`${isUpdate}imageUrl`}
                  label="Super Admin Image"
                  placeholder="Select Super Admin Image"
                  disabled={loading}
                />
                <FormInput
                  name={`${isUpdate}firstName`}
                  label="First Name"
                  placeholder="Enter Super Admins First Name"
                  disabled={loading}
                  required
                />
                <FormInput
                  name={`${isUpdate}lastName`}
                  label="Last Name"
                  placeholder="Enter Super Admins Last Name"
                  disabled={loading}
                  required
                />
                <FormInput
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter Super Admins Phone Number"
                  disabled={loading}
                  required
                />
                <FormInput
                  name="email"
                  label="Email"
                  placeholder="Enter Super Admins Email"
                  disabled={loading}
                  required
                />
                {!initialData && (
                  <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter Super Admins Password"
                    disabled={loading}
                    required
                  />
                )}
                <FormSelect
                  name={`${isUpdate}authorizationScope`}
                  placeholder="Select Scope of Authorization"
                  label="Super Admin Authorization Scope"
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
                  label="Super Admin Authorization Area"
                  options={
                    authorizationArea?.map((area: any) => ({
                      value: area.id,
                      label: area.name,
                    })) || []
                  }
                  isLoading={loading || countriesLoading || divisionsLoading}
                  required
                />
                <FormDateTimePickerV2
                  name={`${isUpdate}dateOfBirth`}
                  label="Date of Birth"
                  placeholder="Select Date of Birth"
                  // disabled={loading}
                />
                <FormInput
                  name={`${isUpdate}education`}
                  label="Education"
                  placeholder="Enter Super Admins Education"
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
                  placeholder="Enter Super Admins NID Number"
                  disabled={loading}
                />
                <FormInput
                  name={`${isUpdate}occupation`}
                  label="Occupation"
                  placeholder="Enter Super Admins Occupation"
                  disabled={loading}
                />
                <FormInput
                  name={`${isUpdate}referenceId`}
                  label="Reference ID"
                  placeholder="Enter Super Admins Reference ID"
                  disabled={loading}
                />
                <FormInput
                  name={`${isUpdate}fathersName`}
                  label="Fathers Name"
                  placeholder="Enter Super Admins Fathers Name"
                  disabled={loading}
                />
                <FormInput
                  name={`${isUpdate}mothersName`}
                  label="Mothers Name"
                  placeholder="Enter Super Admins Mothers Name"
                  disabled={loading}
                />
                <FormInput
                  name={`${isUpdate}spouseName`}
                  label="Spouse Name"
                  placeholder="Enter Super Admins Spouse Name"
                  disabled={loading}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-10">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Present Address
                  </h2>
                  <Separator className="mb-4" />
                  <FormSelect
                    name="presentAddress.countryId"
                    label="Country"
                    options={countries?.data.map((country: any) => ({
                      label: country.name,
                      value: country.id,
                    }))}
                    loading={countriesLoading}
                    disabled={countriesLoading || !countries?.data.length}
                    placeholder="Select Country"
                    required={true}
                  />
                  <FormSelect
                    name="presentAddress.divisionId"
                    label="Division"
                    options={divisions?.data.map((division: any) => ({
                      label: division.name,
                      value: division.id,
                    }))}
                    loading={divisionsLoading}
                    disabled={divisionsLoading || !divisions?.data.length}
                    placeholder="Select Division"
                    required={true}
                  />
                  <FormSelect
                    name="presentAddress.districtId"
                    label="District"
                    options={districts?.data.map((district: any) => ({
                      label: district.name,
                      value: district.id,
                    }))}
                    loading={districtsLoading}
                    disabled={districtsLoading || !districts?.data.length}
                    placeholder="Select District"
                    required={true}
                  />
                  <FormSelect
                    name="presentAddress.thanaId"
                    label="Thana"
                    options={thanas?.data.map((thana: any) => ({
                      label: thana.name,
                      value: thana.id,
                    }))}
                    loading={thanasLoading}
                    disabled={thanasLoading || !thanas?.data.length}
                    placeholder="Select Thana"
                    required={true}
                  />
                  <FormSelect
                    name="presentAddress.postOfficeId"
                    label="Post Office"
                    options={postOffices?.data.map((postOffice: any) => ({
                      label: postOffice.name,
                      value: postOffice.id,
                    }))}
                    loading={postOfficesLoading}
                    disabled={postOfficesLoading || !postOffices?.data.length}
                    placeholder="Select Post Office"
                    required={true}
                  />
                  <FormSelect
                    name="presentAddress.villageId"
                    label="Village"
                    options={villages?.data.map((village: any) => ({
                      label: village.name,
                      value: village.id,
                    }))}
                    loading={villagesLoading}
                    disabled={villagesLoading || !villages?.data.length}
                    placeholder="Select Village"
                    required={true}
                  />
                </div>
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Permanent Address
                  </h2>
                  <Separator className="mb-4" />
                  <FormSelect
                    name="permanentAddress.countryId"
                    label="Country"
                    options={countries?.data.map((country: any) => ({
                      label: country.name,
                      value: country.id,
                    }))}
                    loading={countriesLoading}
                    disabled={countriesLoading || !countries?.data.length}
                    placeholder="Select Country"
                    required={true}
                  />
                  <FormSelect
                    name="permanentAddress.divisionId"
                    label="Division"
                    options={divisions?.data.map((division: any) => ({
                      label: division.name,
                      value: division.id,
                    }))}
                    loading={divisionsLoading}
                    disabled={divisionsLoading || !divisions?.data.length}
                    placeholder="Select Division"
                    required={true}
                  />
                  <FormSelect
                    name="permanentAddress.districtId"
                    label="District"
                    options={districts?.data.map((district: any) => ({
                      label: district.name,
                      value: district.id,
                    }))}
                    loading={districtsLoading}
                    disabled={districtsLoading || !districts?.data.length}
                    placeholder="Select District"
                    required={true}
                  />
                  <FormSelect
                    name="permanentAddress.thanaId"
                    label="Thana"
                    options={thanas?.data.map((thana: any) => ({
                      label: thana.name,
                      value: thana.id,
                    }))}
                    loading={thanasLoading}
                    disabled={thanasLoading || !thanas?.data.length}
                    placeholder="Select Thana"
                    required={true}
                  />
                  <FormSelect
                    name="permanentAddress.postOfficeId"
                    label="Post Office"
                    options={postOffices?.data.map((postOffice: any) => ({
                      label: postOffice.name,
                      value: postOffice.id,
                    }))}
                    loading={postOfficesLoading}
                    disabled={postOfficesLoading || !postOffices?.data.length}
                    placeholder="Select Post Office"
                    required={true}
                  />
                  <FormSelect
                    name="permanentAddress.villageId"
                    label="Village"
                    options={villages?.data.map((village: any) => ({
                      label: village.name,
                      value: village.id,
                    }))}
                    loading={villagesLoading}
                    disabled={villagesLoading || !villages?.data.length}
                    placeholder="Select Village"
                    required={true}
                  />
                </div>
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
