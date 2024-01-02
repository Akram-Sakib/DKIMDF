"use client";

import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useFormPersist from "react-hook-form-persist";
import { Input } from "../input";

interface UserFormProps {
  children: ReactNode;
  formSchema: z.ZodObject<any, any>;
  onSubmit: (values: { [x: string]: any }) => void;
  defaultValues: { [x: string]: any };
  className?: string;
}

const UserForm = ({
  children,
  formSchema,
  onSubmit,
  defaultValues,
  className,
}: UserFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { watch, setValue } = form;

  useFormPersist("form", {
    watch,
    setValue,
    exclude: ["password", "image", "epiCard"],
  });
  // 2. Define a submit handler.
  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
        {children}
      </form>
    </Form>
  );
};

export default UserForm;
