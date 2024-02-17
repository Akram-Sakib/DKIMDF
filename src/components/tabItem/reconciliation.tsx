import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import FormInput from "../formelements/form-input";
import { Button } from "../ui/button";
import FormCheckBox from "../formelements/form-checkbox";
import FormCldImage from "../formelements/form-cldImage";

const Reconciliation = ({
  handlePrevNextTabs,
}: {
  handlePrevNextTabs: (type: "prev" | "next") => void;
}) => {
  return (
    <div className="space-y-5">
      <FormCldImage name="image" label="Your Image" required />
      <FormCldImage
        name="infoVerification"
        label="Your Driving License or Passport image"
        required
      />
      {/* <FormInput
      name="image"
      label="Your Image"
      placeholder="Image"
      type="file"
      required
    /> */}
      {/* <FormInput
      name="infoVerification"
      label="Your Driving License or Passport image"
      required
      type="file"
    /> */}
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
  );
};

export default Reconciliation;
