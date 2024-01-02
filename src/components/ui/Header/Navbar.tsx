import Link from "next/link";
import React from "react";

const Navbar = () => {
  const navbarLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Projects", link: "/projects" },
    { name: "Gallery", link: "/gallery" },
    { name: "News", link: "/news" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <div className="flex justify-between text-sm bg-primary text-white">
      <ul className="flex items-center justify-between basis-[65%] divide-x divide-[#ccc] p-0 [&>*]:m-0">
        {navbarLinks.map((link) => (
          <li
            key={link.name}
            className="hover:bg-secondary hover:text-white p-2 transition text-center w-full"
          >
            <Link href={link.link}>{link.name}</Link>
          </li>
        ))}
      </ul>
      <ul className="basis-[35%] [&>*]:px-4 flex items-center text-center [&>*]:m-0 text-sm">
        <li className="hover:underline cursor-pointer w-full">Bn</li>
        <li className="hover:underline cursor-pointer w-full">
          <Link href={`/dashboard`}>Dashboard</Link>
        </li>
        <li className="hover:underline cursor-pointer w-full">
          <Link href={`/registration`}>Registration</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
