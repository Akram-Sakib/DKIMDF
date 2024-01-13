"use client"

import { useState } from "react";
import { Separator } from "../separator";
import { Heading } from "./heading";
import { Stepper,Step } from 'react-form-stepper';

const CreateProfileOne = () => {
  const title = "Profile";
  const description = "Create your profile";

  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      {/* <Stepper /> */}
      <Stepper activeStep={1}>
  <Step label="Children Step 1" />
  <Step label="Children Step 2" />
  <Step label="Children Step 3" />
</Stepper>
    </>
  );
};

export default CreateProfileOne;
