"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "../ui/use-toast";

interface Values {
  [key: string]: string | File | null;
}

const CVDropForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    cv: null,
  });
  const { toast } = useToast();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    setValues((prevValues) => ({
      ...prevValues,
      cv: file,
    }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    // Check if all fields are filled
    for (const property in values) {
      if (values[property] === "" || values[property] === null) {
        toast({
          title: "All fields are required",
          variant: "destructive",
        });
        return;
      }
    }

    let regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!regexEmail.test(values.email as string)) {
      toast({
        title: "Enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Ensure we have the form reference before submitting
    if (formRef.current) {
      emailjs
        .sendForm(
          "service_0qurx2z", // Update with your service ID
          "template_68afoel", // Update with your template ID
          formRef.current,    // Pass the form reference here
          "user_o7O07d34s7XBqpunKdUtT" // Update with your user ID
        )
        .then(
          (res) => {
            toast({
              title: "CV sent successfully",
              variant: "default",
            });
          },
          (err) => {
            toast({
              title: "Failed to send CV",
              variant: "destructive",
            });
          }
        );
    }
  };

  return (
    <form
      ref={formRef}
      className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6"
    >
      <div className="mb-3 w-full space-y-2">
        <label
          className="block font-medium mb-[2px] text-gray-900"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          className="px-2 py-2 border w-full outline-none rounded-md"
          id="name"
          placeholder="Your Name"
          name="name"
          value={values.name as string}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3 w-full space-y-2">
        <label
          className="block font-medium mb-[2px] text-gray-900"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          className="px-2 py-2 border w-full outline-none rounded-md"
          id="email"
          placeholder="Enter your email address"
          name="email"
          value={values.email as string}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3 w-full space-y-2">
        <label
          className="block font-medium mb-[2px] text-gray-900"
          htmlFor="cv"
        >
          Upload CV
        </label>
        <input
          type="file"
          className="px-2 py-2 border w-full outline-none rounded-md"
          id="cv"
          name="cv"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </div>

      <button
        type="button"
        className="mb-6 inline-block w-full rounded bg-gray-900 px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-gray-900"
        onClick={handleSubmit}
      >
        Send CV
      </button>
    </form>
  );
};

export default CVDropForm;
