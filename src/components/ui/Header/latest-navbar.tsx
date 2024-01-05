import Link from "next/link";
import React from "react";
import Container from "../container";

const LatestNavbar = () => {
  const navbarLinks = [
    { name: "Latest News", link: "/" },
    { name: "News Headline 1", link: "/about" },
    { name: "News Headline 2", link: "/projects" },
    { name: "News Headline 3", link: "/gallery" },
    { name: "News Headline 4", link: "/news" },
    { name: "News Headline 5", link: "/contact" },
  ];

  return (
    <section className="bg-white text-black border-b-2">
      <Container>
        <ul className="flex items-center justify-between text-base divide-x divide-[#ccc]">
          {navbarLinks.map((link) => (
            <li
              key={link.name}
              className="font-bold p-2 transition w-full text-center"
            >
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default LatestNavbar;
