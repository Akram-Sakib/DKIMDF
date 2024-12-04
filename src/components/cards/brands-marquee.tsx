"use client";

import brandImg1 from "@/assets/images/brands/brand-2.jpg";
import brandImg2 from "@/assets/images/brands/brand-1.jpg";
import brandImg3 from "@/assets/images/brands/brand-3.jpg";
import Image from "next/image";
import Link from "next/link";
import Container from "../ui/container";
import HeadingText from "../ui/heading/heading-text";

const BrandsMarquee = () => {
  const brands = [
    {
      id: 1,
      href: "/news/news-slug-name",
      brandImg: brandImg1,
    },
    {
      id: 2,
      href: "/news/news-slug-name",
      brandImg: brandImg2,
    },
    {
      id: 3,
      href: "/news/news-slug-name",
      brandImg: brandImg3,
    },
  ];

  return (
    <section className="bg-white py-12 md:py-20">
      <Container>
        <HeadingText
          title="Our Trusted Brands"
          className="mb-12"
        />
        <ul className="flex items-center justify-evenly">
          {brands.map((brand) => (
            <li key={brand.id} className="font-bold p-2 transition text-center">
              <Link href={brand.href}>
                <Image
                  src={(brand as any).brandImg}
                  alt={"brand+" + brand.id}
                  width={150}
                  height={150}
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default BrandsMarquee;
