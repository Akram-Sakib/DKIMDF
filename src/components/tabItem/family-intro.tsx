import React from "react";
import { Button } from "../ui/button";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import FormInput from "../formelements/form-input";

const FamilyIntro = ({
  handlePrevNextTabs,
}: {
  handlePrevNextTabs: (type: "prev" | "next") => void;
}) => {
  return (
    <div className="space-y-5">
      <FormInput
        name="member.fathersName"
        label="Father Name"
        placeholder="Father Name"
      />
      <FormInput
        name="member.mothersName"
        label="Mother Name"
        placeholder="Mother Name"
      />
      <FormInput
        name="member.spouseName"
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
  );
};

export default FamilyIntro;
