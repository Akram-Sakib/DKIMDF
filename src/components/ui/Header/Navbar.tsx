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
    <div className="mt-3 flex justify-between text-sm">
      <ul className="flex items-center justify-around gap-x-5 p-2 border-2 border-black basis-[70%]">
        {navbarLinks.map((link) => (
          <li key={link.name}>
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>
      <ul className="basis-[30%] [&>*]:border-2 [&>*]:border-black [&>*]:p-2 [&>*]:px-4 flex items-center text-center justify-end gap-x-5">
        <li>Bn</li>
        <li>Donate Now</li>
        <li>Registration</li>
      </ul>
    </div>
  );
};

export default Navbar;
