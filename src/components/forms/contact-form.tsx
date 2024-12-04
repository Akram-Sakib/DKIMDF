"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "../ui/use-toast";

interface Values {
  [key: string]: string;
}

const ContactForm = () => {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {

    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    for (const property in values) {
      if (values[property] === "") {
        toast({
          title: "All fields are required",
          variant: "destructive",
        });
        return;
      }
    }
    let regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!regexEmail.test(values.email)) {
      toast({
        title: "Enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    emailjs
      .send(
        "service_0qurx2z",
        "template_68afoel",
        values,
        "user_o7O07d34s7XBqpunKdUtT"
      )
      .then(
        (res) => {
          toast({
            title: "Email sent successfully",
            variant: "default",
          });
        },
        (err) => {
          toast({
            title: "Failed to send email",
            variant: "destructive",
          });
        }
      );
  };

  return (
    <form className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
      <div className="mb-3 w-full space-y-2">
        <label
          className="block font-medium mb-[2px] text-gray-900"
          htmlFor="exampleInput90"
        >
          Name
        </label>
        <input
          type="text"
          className="px-2 py-2 border w-full outline-none rounded-md"
          id="exampleInput90"
          placeholder="Name"
          name="name"
          onBlur={handleChange}
        />
      </div>

      <div className="mb-3 w-full space-y-2">
        <label
          className="block font-medium mb-[2px] text-gray-900"
          htmlFor="exampleInput90"
        >
          Email
        </label>
        <input
          type="email"
          className="px-2 py-2 border w-full outline-none rounded-md"
          id="exampleInput90"
          placeholder="Enter your email address"
          name="email"
          onBlur={handleChange}
        />
      </div>

      <div className="mb-3 w-full space-y-2">
        <label
          className="block font-medium mb-[2px] text-gray-900"
          htmlFor="exampleInput90"
        >
          Message
        </label>
        <textarea
          className="px-2 py-2 border rounded-[5px] w-full outline-none"
          name="message"
          onBlur={handleChange}
          required={true}
        ></textarea>
      </div>

      <button
        type="button"
        className="mb-6 inline-block w-full rounded bg-gray-900 px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-gray-900"
        onClick={handleSubmit}
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;