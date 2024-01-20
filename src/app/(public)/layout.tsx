import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header/header";
import React from "react";

const PublicLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default PublicLayoutPage;
