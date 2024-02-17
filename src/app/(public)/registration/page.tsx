import RegistrationForm from "@/components/forms/registration-form";
import Container from "@/components/ui/container";
import React from "react";

const RegistrationPage = () => {
  return (
    <section className="px-5 py-5 md:py-20 min-h-screen">
      <Container>
        <h1 className="text-center my-20 text-3xl font-bold">
          Membership Registration
        </h1>
        <RegistrationForm />
      </Container>
    </section>
  );
};

export default RegistrationPage;
