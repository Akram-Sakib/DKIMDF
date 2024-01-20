import Link from "next/link";
import React from "react";
import Container from "../container";
import Marquee from "react-fast-marquee";

const NewsNavbar = () => {
  const routes = [
    { label: "News Headline 0", href: "/news/news-slug-name" },
    { label: "News Headline 1", href: "/news/news-slug-name" },
    { label: "News Headline 2", href: "/news/news-slug-name" },
    { label: "News Headline 3", href: "/news/news-slug-name" },
    { label: "News Headline 4", href: "/news/news-slug-name" },
    { label: "News Headline 5", href: "/news/news-slug-name" },
    { label: "News Headline 6", href: "/news/news-slug-name" },
    { label: "News Headline 7", href: "/news/news-slug-name" },
  ];

  return (
    <section className="bg-white text-black border-b-2">
      <Container>
        <ul className="flex items-center justify-between text-xs md:text-base divide-x divide-[#ccc]">
          <Marquee pauseOnHover>
            {routes.map((route) => (
              <li
                key={route.label}
                className="font-bold p-2 transition text-center w-32 md:w-60"
              >
                <Link href={route.href}>{route.label}</Link>
              </li>
            ))}
          </Marquee>
        </ul>
      </Container>
    </section>
  );
};

export default NewsNavbar;
