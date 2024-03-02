"use client";

import { useState } from "react";
import { Separator } from "../separator";
import { Heading } from "./heading";
import Stepper from "../stepper/stepper";
import PersistForm from "../../formelements/user-form";
import FormInput from "../../formelements/form-input";
import { z } from "zod";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import FormDatePicker from "../../formelements/form-date-picker";
import FormSelect from "../../formelements/form-select";
import { BLOODGROUP, GENDER, QueryKeys } from "@/constants/common";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import ProfileAddressTab from "@/components/tabItem/profile-address-tab";
import { memberSchema } from "@/schema/form-schema";
import FormCldImage from "@/components/formelements/form-cldImage";

const CreateProfileOne = () => {
  const title = "Profile";
  const description = "Create your profile";

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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

  const onSubmit = (values: { [x: string]: any }): void => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  const { data: initialData, isLoading } = useQuery({
    queryKey: [QueryKeys.PROFILE],
    queryFn: async () => {
      const res = await axiosInstance.get(`/profile/me`);
      return res.data as IGenericResponse<any>;
    },
  });

  console.log(initialData);
  

  const defaultValues = initialData ? initialData : {};

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <div>
        <div className={cn("md:ml-12 my-12")}>
          <Stepper currentStep={currentStep} label={steps} />
        </div>
        <PersistForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          formSchema={memberSchema}
          className="mt-20 md:w-1/2"
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
                <FormDatePicker name="dateOfBirth" label="Date Of Birth" />
                <FormInput
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Phone Number"
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
                  required
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
