"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import FormCheckBox from "@/components/formelements/form-checkbox";
import FormDatePicker from "@/components/formelements/form-date-picker";
import FormInput from "@/components/formelements/form-input";
import FormSelect from "@/components/formelements/form-select";
import UserForm from "@/components/formelements/user-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { formSchema } from "@/schema/form-schema";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLocationDot, FaUsers } from "react-icons/fa6";
import { GiSevenPointedStar } from "react-icons/gi";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Container from "@/components/ui/container";
import { GENDER } from "@/constants/common";

const RegistrationPage = () => {
  const onSubmit = (values: { [x: string]: any }): void => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  const defaultValues = {
    // fullName: "",
    // fathersName: "",
    // mothersName: "",
    // spouseName: "",
    // phoneNumber: "",
    // dateOfBirth: "",
    // permanentAddress: "",
    // presentAddress: "",
    // education: "",
    // occupation: "",
  };

  const [defaultTabs, setDefaultTabs] = useState<string>("personIntro");

  const handleTabs = (value: string) => {
    setDefaultTabs(value);
  };

  const handlePrevNextTabs = (type: "next" | "prev") => {
    const currentTabId = registrationTabs.find(
      (tab) => tab.value === defaultTabs
    )?.id;
    const incrementTabId = (currentTabId as number) + 1;
    const decrementTabId = (currentTabId as number) - 1;
    const activeTabId =
      (type === "next" && incrementTabId) ||
      (type === "prev" && decrementTabId);
    const nextTab = registrationTabs.find(
      (tab) => tab.id === activeTabId
    )?.value;
    setDefaultTabs(nextTab as string);
  };

  const registrationTabs = [
    {
      id: 1,
      icon: <FaUser size={27} />,
      label: "Person Intro",
      value: "personIntro",
      subtitle: "নিবন্ধনাধীন ব্যক্তির পরিচিতি",
      content: (
        <div>
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
            <FormInput
              name="referanceId"
              label="Referance ID"
              placeholder="Referance ID"
            />
          </div>
          <Button
            onClick={() => handlePrevNextTabs("next")}
            type="button"
            className="space-x-2 w-24 mt-5"
          >
            <span className="inline-block">Next</span>{" "}
            <FaArrowRightLong size={18} />
          </Button>
        </div>
      ),
    },
    {
      id: 2,
      icon: <FaUsers size={27} />,
      label: "Family Intro",
      value: "familyIntro",
      subtitle: "ব্যক্তির পিতা মাতার পরিচিতি",
      content: (
        <div className="space-y-5">
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
            name="spouseName"
            label="Spouse Name"
            placeholder="Spouse Name"
          />
          {/* <FormInput
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
          /> */}
          <div className="space-x-4 flex">
            <Button
              onClick={() => handlePrevNextTabs("prev")}
              type="button"
              className="space-x-2"
            >
              <FaArrowLeftLong size={18} />
              <span className="inline-block"> Prev</span>{" "}
            </Button>
            <Button
              onClick={() => handlePrevNextTabs("next")}
              type="button"
              className="space-x-2"
            >
              <span className="inline-block">Next</span>{" "}
              <FaArrowRightLong size={18} />
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      icon: <FaLocationDot size={27} />,
      label: "Person Address",
      value: "personAddress",
      subtitle: "ব্যক্তির বর্তমান ও স্থায়ী ঠিকানা",
      content: (
        <div className="space-y-5">
          {/* <FormInput
            name="permanentAddress"
            label="Permanent Address"
            placeholder="Permanent Address"
          />
          <FormInput
            name="presentAddress"
            label="Present Address"
            placeholder="Present Address"
          /> */}
          <FormInput name="country" label="Country" placeholder="Country" />
          <FormInput name="division" label="Division" placeholder="Division" />
          <FormInput name="district" label="District" placeholder="District" />
          <FormInput
            name="union"
            label="Municipality / Union"
            placeholder="Municipality / Union"
          />
          <FormInput name="wordNo" label="Word No" placeholder="Word No" />
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
          <FormInput name="roadNo" label="Road No" placeholder="Road No" />
          <div className="space-x-4 flex">
            <Button
              onClick={() => handlePrevNextTabs("prev")}
              type="button"
              className="space-x-2"
            >
              <FaArrowLeftLong size={18} />
              <span className="inline-block"> Prev</span>{" "}
            </Button>
            <Button
              onClick={() => handlePrevNextTabs("next")}
              type="button"
              className="space-x-2"
            >
              <span className="inline-block">Next</span>{" "}
              <FaArrowRightLong size={18} />
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      icon: <GiSevenPointedStar size={27} />,
      label: "Attestation & Reconciliation",
      value: "reconciliation",
      subtitle: "প্রত্যয়ন, সংযুক্তি ও পেমেন্ট",
      content: (
        <div className="space-y-5">
          <FormInput
            name="image"
            label="Your Image"
            placeholder="Image"
            type="file"
            required
          />
          <FormInput name="epiCard" label="EPI Card" required type="file" />
          <FormCheckBox
            name="termsAggrement"
            label="Do you agree with our terms & conditions"
            required
          />
          <div className="flex gap-x-4">
            <Button
              onClick={() => handlePrevNextTabs("prev")}
              type="button"
              className="space-x-2 w-24"
            >
              <FaArrowLeftLong size={18} />
              <span className="inline-block"> Prev</span>{" "}
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="px-5 py-5 md:py-20 min-h-screen">
      <Container>
        <h1 className="text-center my-20 text-3xl font-bold">
          Membership Registration
        </h1>
        <UserForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          formSchema={formSchema}
          className="w-full items-center gap-5 mt-10"
          formId="registration"
        >
          <Tabs
            defaultValue={defaultTabs}
            value={defaultTabs}
            className="space-y-10"
            onValueChange={handleTabs}
          >
            <TabsList>
              {registrationTabs.map((tab) => (
                <TabsTrigger value={tab.value} key={tab.id}>
                  <div className="text-black flex items-center gap-3">
                    <span className="">{tab.icon}</span>
                    <div className="text-left">
                      <h4 className="text-lg">{tab.label}</h4>
                      <p className="">{tab.subtitle}</p>
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {registrationTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.value}>
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </UserForm>
      </Container>
      {/* <div className="grid grid-cols-2 w-full items-center gap-5 px-5 mt-10">
        <div>
          <Label htmlFor="fullName" className="mb-3 inline-block">
            Full Name
          </Label>
          <Input type="text" id="fullName" placeholder="Full Name" />
        </div>
        <div>
          <Label htmlFor="fatherName" className="mb-3 inline-block">
            Fathers Name
          </Label>
          <Input type="text" id="fatherName" placeholder="Fathers Name" />
        </div>
        <div>
          <Label htmlFor="motherName" className="mb-3 inline-block">
            Mothers Name
          </Label>
          <Input type="text" id="motherName" placeholder="Mothers Name" />
        </div>
        <div>
          <Label htmlFor="spouseName" className="mb-3 inline-block">
            Spouse Name
          </Label>
          <Input type="text" id="spouseName" placeholder="Spouse Name" />
        </div>
        <div>
          <Label htmlFor="Mobile Number" className="mb-3 inline-block">
            Mobile Number
          </Label>
          <Input type="number" id="Mobile Number" placeholder="Mobile Number" />
        </div>
        <div>
          <Label htmlFor="dateOfBirth" className="mb-3 inline-block">
            Date Of Birth
          </Label>
          <Input type="date" id="dateOfBirth" placeholder="Date Of Birth" />
        </div>
        <div>
          <Label htmlFor="permanentAddress" className="mb-3 inline-block">
            Permanent Address
          </Label>
          <Input
            type="number"
            id="permanentAddress"
            placeholder="Permanent Address"
          />
        </div>
        <div>
          <Label htmlFor="presentAddress" className="mb-3 inline-block">
            Present Address
          </Label>
          <Input
            type="number"
            id="presentAddress"
            placeholder="Present Address"
          />
        </div>
        <div>
          <Label htmlFor="education" className="mb-3 inline-block">
            Education
          </Label>
          <Input type="number" id="education" placeholder="Latest Education" />
        </div>
        <div>
          <Label htmlFor="occupation" className="mb-3 inline-block">
            Present Occupation
          </Label>
          <Input
            type="number"
            id="occupation"
            placeholder="Present Occupation"
          />
        </div>
      </div> */}
    </div>
  );
};

export default RegistrationPage;
