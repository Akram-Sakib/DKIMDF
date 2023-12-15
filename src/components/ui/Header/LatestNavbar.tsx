import Link from "next/link";
import React from "react";

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
    <div>
      <ul className="flex items-center justify-between border-b-2  text-white text-base bg-[#9E5BBA] divide-x divide-[#ccc]">
        {navbarLinks.map((link) => (
          <li
            key={link.name}
            className="hover:bg-[#62247c] p-2 hover:text-white transition w-full text-center"
          >
            <Link href={link.link}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestNavbar;
