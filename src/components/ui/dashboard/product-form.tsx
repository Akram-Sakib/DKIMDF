"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import FileUpload from "@/components/FileUpload";
import FormInput from "../form/form-input";
import FormSelect from "../form/form-select";
import { useToast } from "../use-toast";
import { Heading } from "./heading";
// const ImgSchema = z.object({
//   fileName: z.string(),
//   name: z.string(),
//   fileSize: z.number(),
//   size: z.number(),
//   fileKey: z.string(),
//   key: z.string(),
//   fileUrl: z.string(),
//   url: z.string(),
// });
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  name: z.object({
    firstName: z
      .string()
      .min(3, { message: "First Name must be at least 3 characters" }),
    lastName: z
      .string()
      .min(3, { message: "Last Name must be at least 3 characters" }),
  }),
  role: z.string().min(1, { message: "Please select a role" }),
  // imgUrl: z
  //   .array(ImgSchema)
  //   .max(IMG_MAX_LIMIT, { message: "You can only add up to 3 images" })
  //   .min(1, { message: "At least one image must be added." }),

  price: z.coerce.number(),
  category: z.string().min(1, { message: "Please select a category" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
  categories: any;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit Admin" : "Create Admin";
  const description = initialData ? "Edit a Admin." : "Add a new Admin";
  const toastMessage = initialData ? "Admin updated." : "Admin created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        firstName: "",
        lastName: "",
        email: 0,
        imgUrl: [],
        category: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      console.log(data);
      setLoading(true);

      // if (initialData) {
      //   // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      // } else {
      //   // const res = await axios.post(`/api/products/create-product`, data);
      //   // console.log("product", res);
      // }
      // router.refresh();
      // router.push(`/dashboard/products`);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // const triggerImgUrlValidation = () => form.trigger("imgUrl");

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={field.onChange}
                    value={field.value}
                    onRemove={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormInput
              name="name.firstName"
              label="First Name"
              placeholder="Admin first name"
              disabled={loading}
              required
            />
            <FormInput
              name="name.lastName"
              label="Last Name"
              placeholder="Admin last name"
              disabled={loading}
              required
            />
            <FormInput
              name="email"
              label="Email"
              placeholder="Admin email"
              disabled={loading}
              required
            />
            <FormInput
              name="password"
              label="Password"
              placeholder="Admin password"
              disabled={loading}
              required
            />
            <FormInput
              name="phoneNumber"
              label="Phone Number"
              type="number"
              placeholder="Admin phone number"
              disabled={loading}
            />
            <FormSelect
              name="role"
              disabled={loading}
              label="Select a role"
              placeholder="Select a role"
              required
              // @ts-ignore
              options={categories}
            />
            <FormInput
              name="admin"
              label="Password"
              placeholder="Admin password"
              disabled={loading}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
