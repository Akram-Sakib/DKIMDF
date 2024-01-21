import * as z from "zod";

export const formSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(3)
    .max(100),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(3)
    .max(100),
  email: z.string({ required_error: "Email is required" }).email(),
  gender: z.enum(["male", "female", "transgender"], {
    required_error: "Gender is required",
  }),
  spouseName: z
    .string({ required_error: "Spouse Name is required" })
    .min(3)
    .max(100),
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(3)
    .max(100),
  dateOfBirth: z.date({ required_error: "Date of Birth is required" }),
  presentAddress: z
    .string({ required_error: "Present Address is required" })
    .min(3)
    .max(100),
  nidNumber: z
    .string({ required_error: "NID Number is required" })
    .min(3)
    .max(100),
  education: z
    .string({ required_error: "Education is required" })
    .min(3)
    .max(100),
  occupation: z
    .string({ required_error: "Occupation is required" })
    .min(3)
    .max(100),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    required_error: "Blood Group is required",
  }),
  permanentAddress: z
    .string({ required_error: "Permanent Address is required" })
    .min(3)
    .max(100),
  // Family Details
  fathersName: z
    .string({ required_error: "Father's Name is required" })
    .min(3)
    .max(100),
  mothersName: z
    .string({ required_error: "Mother's Name is required" })
    .min(3)
    .max(100),
  fathersOccupation: z
    .string({ required_error: "Father's Occupation is required" })
    .min(3)
    .max(100),
  mothersOccupation: z
    .string({ required_error: "Mother's Occupation is required" })
    .min(3)
    .max(100),
  fathersMobileNumber: z
    .string({ required_error: "Father's Mobile Number is required" })
    .min(3)
    .max(100),
  fathersNidNumber: z
    .string({ required_error: "Father's NID Number is required" })
    .min(3)
    .max(100),
  mothersNidNumber: z.string({
    required_error: "Mother's NID Number is required",
  }),
  // Address Details
  country: z.string({ required_error: "Country is required" }).min(3).max(100),
  division: z
    .string({ required_error: "Division is required" })
    .min(3)
    .max(100),
  district: z
    .string({ required_error: "District is required" })
    .min(3)
    .max(100),
  union: z.string({ required_error: "Union is required" }).min(3).max(100),
  wordNo: z.string({ required_error: "Word No is required" }).min(3).max(100),
  postOffice: z
    .string({ required_error: "Post Office is required" })
    .min(3)
    .max(100),
  postCode: z
    .string({ required_error: "Post Code is required" })
    .min(3)
    .max(100),
    village: z.string({ required_error: "Village is required" }).min(3).max(100),
  roadNo: z.string({ required_error: "Road No is required" }).min(3),
  // Image 
  image: z.string({ required_error: "Image is required" }),
  epiCard: z.string({ required_error: "EPI Card is required" }),
  termsAggrement: z.boolean({ required_error: "Terms Aggrement is required" }),
});
