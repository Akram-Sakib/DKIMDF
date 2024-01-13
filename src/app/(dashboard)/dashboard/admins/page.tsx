import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { Heading } from "@/components/ui/dashboard/heading";
import { UserClient } from "@/components/ui/dashboard/user-tables/cilent";
import { users } from "@/constants/data";
import Image from "next/image";
import React from "react";
import BgPressImg from "@/assets/images/bg_press.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BlurImage from "@/components/ui/blur-image";
const breadcrumbItems = [{ title: "Admins", link: "/dashboard/admins" }];

const UserPage = () => {
  const title = "Countries";
  const description = "Select a country to see the list of Admins";

  const countries = [
    { id: 1, imgUrl: BgPressImg, name: "Bangladesh", url: "/bangladesh" },
    { id: 2, imgUrl: BgPressImg, name: "India", url: "/india" },
    { id: 3, imgUrl: BgPressImg, name: "Thailand", url: "/thailand" },
  ];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Heading title={title} description={description} />
        <section className="py-8 grid grid-cols-3 gap-x-10">
          {countries.map(({ id, imgUrl, name, url}) => (
            <Link href={`/dashboard/admins/${url}`} key={id}>
              <figure className="rounded-3xl relative group overflow-hidden">
                <picture>
                  <BlurImage
                    image={imgUrl}
                    alt="Web development"
                  />
                  {/* <Image
                    src={imgUrl}
                    alt="Web development"
                    width={500}
                    height={500}
                    className="rounded-3xl group-hover:scale-105 transition-all duration-500"
                  /> */}
                </picture>
                <figcaption className="absolute bottom-4 left-4 bg-gray-700 rounded-3xl z-10">
                  <Button variant={"outline"}>{name}</Button>
                </figcaption>
                <div className="absolute inset-0 bg-gray-700 opacity-40 rounded-3xl invisible group-hover:visible  transition-all duration-500"></div>
              </figure>
            </Link>
          ))}
        </section>
        {/* <UserClient data={users} /> */}
      </div>
    </>
  );
};

export default UserPage;
