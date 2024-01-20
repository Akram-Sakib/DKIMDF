"use client";

import { useState } from "react";
import { Separator } from "../separator";
import { Heading } from "./heading";
import Stepper from "../stepper/stepper";
import UserForm from "../form/user-form";
import FormInput from "../form/form-input";
import { z } from "zod";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import FormDatePicker from "../form/form-date-picker";
import FormSelect from "../form/form-select";
import { options } from "@/constants/data";

const formSchema = z.object({
  name: z.object({
    firstName: z
      .string({ required_error: "First Name is required" })
      .min(3)
      .max(100),
    lastName: z
      .string({ required_error: "Last Name is required" })
      .min(3)
      .max(100),
  }),
});

const CreateProfileOne = () => {
  const title = "Profile";
  const description = "Create your profile";

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["Personal Details", "Family Details", "Person Address"];

  const goToNextStep = () =>
    setCurrentStep((prev) => (prev === steps.length - 1 ? prev : prev + 1));
  const goToPreviousStep = () =>
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1));

  const onSubmit = (values: { [x: string]: any }): void => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  const defaultValues = {};

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
        <UserForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          formSchema={formSchema}
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
                  options={options}
                  required
                />
                <FormInput
                  name="spouseName"
                  label="Spouse Name"
                  placeholder="Spouse Name"
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
                <FormInput
                  name="bloodGroup"
                  label="Blood Group"
                  placeholder="Blood Group"
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
              <div className="space-y-5 grid grid-cols-2 gap-x-10 gap-y-4">
                <FormInput
                  name="fathersName"
                  label="Father Name"
                  placeholder="Father Name"
                />
                <FormInput
                  name="mothersName"
                  label="Mother Name"
                  placeholder="Mother Name"
                />
                <FormInput
                  name="fathersOccupation"
                  label="Fathers Occupation"
                  placeholder="Fathers Occupation"
                />
                <FormInput
                  name="mothersOccupation"
                  label="Mothers Occupation"
                  placeholder="Mothers Occupation"
                />
                <FormInput
                  name="fathersMobileNumber"
                  label="Fathers Mobile Number"
                  placeholder="Fathers Mobile Number"
                />
                <FormInput
                  name="fathersNidNumber"
                  label="Fathers NID Number"
                  placeholder="Fathers NID Number"
                />
                <FormInput
                  name="mothersNidNumber"
                  label="Mothers NID Number"
                  placeholder="Mothers NID Number"
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
            <div className="space-y-8">
              <div className=" grid grid-cols-2 gap-x-10 gap-y-4">
                <FormInput
                  name="country"
                  label="Country"
                  placeholder="Country"
                />
                <FormInput
                  name="division"
                  label="Division"
                  placeholder="Division"
                />
                <FormInput
                  name="district"
                  label="District"
                  placeholder="District"
                />
                <FormInput
                  name="union"
                  label="Municipality / Union"
                  placeholder="Municipality / Union"
                />
                <FormInput
                  name="wardNo"
                  label="Ward No"
                  placeholder="Ward No"
                />
                <FormInput
                  name="village"
                  label="Village / Area"
                  placeholder="Village / Area"
                />
                <FormInput
                  name="postOffice"
                  label="Post Office"
                  placeholder="Post Office"
                />
                <FormInput
                  name="postCode"
                  label="Post Code"
                  placeholder="Post Code"
                />
                <FormInput
                  name="roadNo"
                  label="Road No"
                  placeholder="Road No"
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
        </UserForm>
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
