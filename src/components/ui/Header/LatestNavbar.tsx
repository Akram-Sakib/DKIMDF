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
      <ul className="flex items-center justify-around gap-x-5 p-2 border-2 border-black mt-3 text-lg">
        {navbarLinks.map((link) => (
          <li key={link.name}>
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestNavbar;
