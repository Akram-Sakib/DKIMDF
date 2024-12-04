import { ProductGrid } from "@/components/cards/product-card";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Samadhan Foundation | Gallery",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF).",
};

const GalleryPage = () => {
  return (
    <section className="py-20">
      <Container>
        <Image
          src={"/products/products.jpg"}
          width={1000}
          height={100}
          className="w-full h-96"
          alt="Products"
        />
        <h2 className="text-4xl text-center my-10">Our Products</h2>
        <ProductGrid />
      </Container>
    </section>
  );
};

export default GalleryPage;
