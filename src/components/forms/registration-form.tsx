"use client";

import FormCheckBox from "@/components/formelements/form-checkbox";
import FormCldImage from "@/components/formelements/form-cldImage";
import UserForm from "@/components/formelements/user-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formSchema } from "@/schema/form-schema";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaArrowLeftLong, FaLocationDot, FaUsers } from "react-icons/fa6";
import { GiSevenPointedStar } from "react-icons/gi";
import FamilyIntro from "../tabItem/family-intro";
import PersonIntro from "../tabItem/person-intro";
import PersonAddress from "../tabItem/person-address";
import Reconciliation from "../tabItem/reconciliation";

const RegistrationForm = () => {
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
      content: <PersonIntro handlePrevNextTabs={handlePrevNextTabs} />,
    },
    {
      id: 2,
      icon: <FaUsers size={27} />,
      label: "Family Intro",
      value: "familyIntro",
      subtitle: "ব্যক্তির পিতা মাতার পরিচিতি",
      content: <FamilyIntro handlePrevNextTabs={handlePrevNextTabs} />,
    },
    {
      id: 3,
      icon: <FaLocationDot size={27} />,
      label: "Person Address",
      value: "personAddress",
      subtitle: "ব্যক্তির বর্তমান ও স্থায়ী ঠিকানা",
      content: <PersonAddress handlePrevNextTabs={handlePrevNextTabs} />,
    },
    {
      id: 4,
      icon: <GiSevenPointedStar size={27} />,
      label: "Attestation & Reconciliation",
      value: "reconciliation",
      subtitle: "প্রত্যয়ন, সংযুক্তি ও পেমেন্ট",
      content: <Reconciliation handlePrevNextTabs={handlePrevNextTabs} />,
    },
  ];

  return (
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
  );
};

export default RegistrationForm;
{
  /* <div className="grid grid-cols-2 w-full items-center gap-5 px-5 mt-10">
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
      </div> */
}
