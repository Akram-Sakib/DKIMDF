"use client";

// import { deleteImage } from "@/app/api/cloudinary/cloudinary";
import { cn } from "@/lib/utils";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { ComponentProps, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface CloudinaryImageUploadType {
  info: {
    access_mode: String;
    asset_id: String;
    batchId: String;
    bytes: Number;
    created_at: String;
    etag: String;
    folder: String;
    format: String;
    height: Number;
    id: String;
    original_filename: String;
    path: String;
    placeholder: Boolean;
    public_id: String;
    resource_type: String;
    secure_url: String;
    signature: String;
    tags: Array<any>;
    thumbnail_url: String;
    type: String;
    url: String;
    version: Number;
    version_id: String;
    width: Number;
  };
  event: String;
}
const FormCldImage = ({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  width = "90",
  height = "90",
  className,
  ...props
}: {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
  className?: string;
} & ComponentProps<"img">) => {
  const { control, setValue, getValues } = useFormContext();
  const image = getValues(name);
  // const { mutate } = useMutation({
  //   mutationFn: async (data: any) => {
  //     const res = await axiosInstance.post("cloudinary", data);
  //     return res;
  //   },
  //   onSuccess: (res: any) => {
  //     if (res.data === "ok") {
  //       toast({
  //         variant: "default",
  //         title: "Image Deleted",
  //         description: "Image has been deleted successfully.",
  //       });
  //     } else {
  //       toast({
  //         variant: "destructive",
  //         title: res.message,
  //         description: "There was a problem with your request.",
  //       });
  //     }
  //   },

  // });

  const handleDeleteImage = async () => {
    // const imgSplit = image.split("/");
    // const imageName = imgSplit[imgSplit.length - 1].split(".")[0];
    // const imageId = imgSplit[imgSplit.length - 2];
    // const publicId = imageId + "/" + imageName;
    if (image) {
      // mutate({ publicId });
      setValue(name, "");
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="space-x-4">
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <>
                {image && (
                  <div className="relative flex items-start gap-x-2">
                    <CldImage
                      width={width as any}
                      height={height as any}
                      className={cn(className)}
                      src={image}
                      alt="Description of my image" 
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="px-2 py-0"
                    >
                      <FaXmark
                        className="h-4 w-6 cursor-pointer bold"
                        onClick={handleDeleteImage}
                      />
                    </Button>
                  </div>
                )}
                {!image && (
                  <CldUploadButton
                    uploadPreset="dkidmdf"
                    onUpload={(result) => {
                      // setImage(result?.info?.secure_url);
                      // console.log(result.event);
                      console.log((result.info as any).public_id);
                      if (result.event === "success") {
                        setValue(name, (result.info as any)?.secure_url);
                      }
                    }}
                    options={{
                      multiple: false,
                      maxFiles: 1,
                      maxFileSize: 1024 * 1024 * 1,
                    }}
                    className="bg-gray-950 text-white p-2 rounded-lg"
                    
                  />
                )}
              </>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormCldImage;
