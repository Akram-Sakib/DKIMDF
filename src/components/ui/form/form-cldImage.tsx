"use client";

import {
  CldImage,
  CldUploadButton,
  CldUploadWidgetResults,
} from "next-cloudinary";
import React, { ComponentProps } from "react";
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
const FormCldImage = () => {
  const [image, setImage] = React.useState("");

  return (
    <>
      {image && (
        <CldImage
          width="90"
          height="60"
          src={image}
          alt="Description of my image"
        />
      )}
      <CldUploadButton
        uploadPreset="dkidmdf"
        onUpload={(result) => {
          setImage(result?.info?.secure_url);
        }}
        options={{
          multiple: false,
          maxFiles: 1,
          maxFileSize: 1024 * 1024 * 1,
        }}
        className="bg-gray-950 text-white p-2 rounded-lg"
      />
    </>
  );
};

export default FormCldImage;
