"use client";

import FormCldImage from "@/components/formelements/form-cldImage";
import ProfileAddressTab from "@/components/tabItem/profile-address-tab";
import { BLOODGROUP, GENDER, QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { cn } from "@/lib/utils";
// import { memberSchema } from "@/schema/form-schema";
import CertificatePdf from "@/components/pdf/certificate";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import FormDatePicker from "../../formelements/form-date-picker";
import FormInput from "../../formelements/form-input";
import FormSelect from "../../formelements/form-select";
import PersistForm from "../../formelements/user-form";
import { Button } from "../button";
import { Separator } from "../separator";
import Stepper from "../stepper/stepper";
import { toast } from "../use-toast";
import { Heading } from "./heading";
import { useSession } from "next-auth/react";
import {
  adminProfileSchema,
  grandAdminProfileSchema,
  memberProfileSchema,
  superAdminProfileSchema,
} from "@/schema/profile-schema";
import DateTimePickerV2 from "@/components/formelements/form-date-picker-2";

const CreateProfileOne = () => {
  const title = "Profile";
  const description = "Create your profile";

  // const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { data: sessionData, status } = useSession() as any;
  const role = sessionData?.role;

  const schema =
    (role === "grand_admin" && grandAdminProfileSchema) ||
    (role === "super_admin" && superAdminProfileSchema) ||
    (role === "admin" && adminProfileSchema) ||
    (role === "member" && memberProfileSchema);

  // console.log(status === "authenticated" && schema);

  const steps = [
    "Personal Details",
    "Family Details",
    "Person Address",
    "Reconciliations",
  ];

  const goToNextStep = () =>
    setCurrentStep((prev) => (prev === steps.length - 1 ? prev : prev + 1));
  const goToPreviousStep = () =>
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1));

  const { data: initialData, isLoading } = useQuery({
    queryKey: [QueryKeys.PROFILE],
    queryFn: async () => {
      const res = await axiosInstance.get(`/profile/me`);
      return res.data as any;
    },
  });
  

  const queryClient = useQueryClient();
  const { mutate: updateMutation, isPending: updateIsPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.patch(`/profile/me`, data);
      return res;
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROFILE],
      });

      if (res.success) {
        toast({
          variant: "default",
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
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

  const onSubmit = (values: { [x: string]: any }): void => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // setLoading(true);
    try {
      // if (initialData) {
      updateMutation(values);
      // }
    } catch (error) {
    } finally {
      // setLoading(false);
    }
  };
  // console.log(initialData);

  const defaultValues = initialData ? initialData : {};

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        <PDFDownloadLink
          document={
            <CertificatePdf
              name={`${initialData?.firstName} ${initialData?.lastName}`}
            />
          }
          fileName="dkidmf-certificate.pdf"
        >
          <Button
            className="text-xs md:text-sm"
            // onClick={() => router.push(`/dashboard/membership/list/new`)}
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        </PDFDownloadLink>
      </div>
      <Separator />
      <div>
        <div className={cn("md:ml-12 my-12")}>
          <Stepper currentStep={currentStep} label={steps} />
        </div>
        <PersistForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          // @ts-ignore
          formSchema={status === "authenticated" && schema}
          className="mt-20 lg:w-4/3"
          formId="create-profile"
        >
          {currentStep === 0 && (
            <div className="space-y-8">
              <div className={cn("grid grid-cols-2 gap-x-10 gap-y-4")}>
                <FormInput
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                  required
                />
                <FormInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  required
                />
                <FormInput
                  name="email"
                  label="Email Address"
                  placeholder="Email Address"
                  required
                />
                <FormSelect
                  name="gender"
                  label="Gender"
                  placeholder="Select Your Gender"
                  options={GENDER}
                  required
                />
                {/* <FormDatePicker name="dateOfBirth" label="Date Of Birth" /> */}
                <DateTimePickerV2 name="dateOfBirth" label="Date Of Birth"/>
                <FormInput
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Phone Number"
                  required
                />
                <FormInput
                  name="nidNumber"
                  label="NID Number"
                  placeholder="NID Number"
                  required
                />
                <FormInput
                  name="education"
                  label="Latest Education"
                  placeholder="Latest Education"
                />
                <FormSelect
                  options={BLOODGROUP}
                  name="bloodGroup"
                  label="Blood Group"
                  placeholder="Select Blood Group"
                />
                <FormInput
                  name="occupation"
                  label="Present Occupation"
                  placeholder="Present Occupation"
                />
              </div>
              <Button
                onClick={goToNextStep}
                type="button"
                className="space-x-2 w-24 mt-5 dark:text-white dark:bg-gray-900"
              >
                <span className="inline-block">Next</span>
                <FaArrowRightLong size={18} />
              </Button>
            </div>
          )}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-x-10 gap-y-4">
                <FormInput
                  name="fathersName"
                  label="Father's Name"
                  placeholder="Father Name"
                />
                <FormInput
                  name="mothersName"
                  label="Mother's Name"
                  placeholder="Mother Name"
                />
                <FormInput
                  name="spouseName"
                  label="Spouse Name"
                  placeholder="Spouse Name"
                />
              </div>
              <div className="space-x-4 flex">
                <Button
                  onClick={goToPreviousStep}
                  type="button"
                  className="space-x-2 dark:text-white dark:bg-gray-900"
                >
                  <FaArrowLeftLong size={18} />
                  <span className="inline-block"> Prev</span>{" "}
                </Button>
                <Button
                  onClick={goToNextStep}
                  type="button"
                  className="space-x-2 dark:text-white dark:bg-gray-900"
                >
                  <span className="inline-block">Next</span>{" "}
                  <FaArrowRightLong size={18} />
                </Button>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <ProfileAddressTab
              goToPreviousStep={goToPreviousStep}
              goToNextStep={goToNextStep}
            />
          )}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                <FormCldImage
                  name="imageUrl"
                  label="Your Image"
                  required
                  width="100"
                  height="100"
                  className="rounded-full"
                />
                <FormCldImage
                  name="infoVerificationPhoto"
                  label="Your Driving License or Passport image"
                  height="300"
                  width="300"
                  className="rounded-lg"
                  required
                />
              </div>
              <div className="space-x-4 flex">
                <Button
                  onClick={goToPreviousStep}
                  type="button"
                  className="space-x-2 dark:text-white dark:bg-gray-900"
                >
                  <FaArrowLeftLong size={18} />
                  <span className="inline-block"> Prev</span>{" "}
                </Button>
                <Button
                  type="submit"
                  className="dark:text-white dark:bg-gray-900"
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </PersistForm>
        {/* <section className="flex mt-10 gap-x-12">
          <button
            onClick={goToPreviousStep}
            className="bg-gray-900 text-white p-2 rounded-md"
          >
            Prev
          </button>
          <button
            onClick={goToNextStep}
            className="bg-gray-900 text-white p-2 rounded-md"
          >
            Next
          </button>
        </section> */}
      </div>
    </>
  );
};

export default CreateProfileOne;
