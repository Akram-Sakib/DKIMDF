import { BLOODGROUP, GENDER } from "@/constants/common";
import { cn } from "@/lib/utils";
import { FaArrowRightLong } from "react-icons/fa6";
import FormDatePicker from "../formelements/form-date-picker";
import FormInput from "../formelements/form-input";
import FormSelect from "../formelements/form-select";
import { Button } from "../ui/button";

const PersonIntro = ({
  handlePrevNextTabs,
}: {
  handlePrevNextTabs: (type: "prev" | "next") => void;
}) => {
  return (
    <div>
      <div className={cn("grid grid-cols-2 gap-x-10 gap-y-4")}>
        <FormInput
          name="member.firstName"
          label="First Name"
          placeholder="First Name"
          required
        />
        <FormInput
          name="member.lastName"
          label="Last Name"
          placeholder="Last Name"
          required
        />
        <FormInput
          name="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
        />
        <FormInput
          name="email"
          label="Email Address"
          placeholder="Email Address"
          required
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          required
        />
        <FormSelect
          name="member.gender"
          label="Gender"
          placeholder="Select Your Gender"
          options={GENDER}
          required
        />
        <FormDatePicker name="member.dateOfBirth" label="Date Of Birth" />

        <FormInput
          name="member.nidNumber"
          label="NID Number"
          placeholder="NID Number"
          required
        />
        <FormInput
          name="member.education"
          label="Latest Education"
          placeholder="Latest Education"
        />
        {/* <FormInput
              name="bloodGroup"
              label="Blood Group"
              placeholder="Blood Group"
            /> */}
        <FormSelect
          options={BLOODGROUP}
          name="member.bloodGroup"
          label="Blood Group"
          placeholder="Select Blood Group"
          required
        />
        <FormInput
          name="member.occupation"
          label="Present Occupation"
          placeholder="Present Occupation"
        />
        <FormInput
          name="member.referanceId"
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
  );
};

export default PersonIntro;
