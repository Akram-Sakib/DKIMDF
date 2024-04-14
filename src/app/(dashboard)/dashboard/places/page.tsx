import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { Heading } from "@/components/ui/dashboard/heading";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
const breadcrumbItems = [{ title: "Places", link: "/dashboard/places" }];

const CountriesPage = async () => {
  const session = (await getServerSession(authOptions)) as any;

  const isMember = session.role === "member";

  // if isMember, the only place they can access is Villages
  const places = [
    {
      title: "Countries",
      link: "/dashboard/places/countries",
    },
    {
      title: "Divisions",
      link: "/dashboard/places/divisions",
    },
    {
      title: "Districts",
      link: "/dashboard/places/districts",
    },
    {
      title: "Police Stations",
      link: "/dashboard/places/police-stations",
    },
    {
      title: "Post Offices",
      link: "/dashboard/places/post-offices",
    },
    {
      title: "Villages",
      link: "/dashboard/places/villages",
    },
  ].filter((place) => !isMember || place.title === "Villages");

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Heading
          title={`All Places`}
          description="Manage all places for your business"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {places.map((place, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{place.title}</CardTitle>
                <CardDescription>
                  Check your {place.title.toLowerCase()} list
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={place.link}>
                  <Button>{place.title}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default CountriesPage;
