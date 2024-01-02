import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/header/header";
import React from "react";

const PublicLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="mx-auto container">
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default PublicLayoutPage;
