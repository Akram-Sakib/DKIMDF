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
    <div className="flex justify-between text-sm border-b-2 border-[#8CC641] bg-[#efefef]">
      <ul className="flex items-center justify-between basis-[65%] divide-x divide-[#ccc] p-0 [&>*]:m-0">
        {navbarLinks.map((link) => (
          <li
            key={link.name}
            className="hover:bg-[#8CC641] hover:text-white p-2 transition text-center w-full"
          >
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>
      <ul className="basis-[35%] [&>*]:px-4 flex items-center text-center [&>*]:m-0 text-sm">
        <li className="hover:underline cursor-pointer w-full">Bn</li>
        <li className="hover:underline cursor-pointer w-full">Donate Now</li>
        <li className="hover:underline cursor-pointer w-full">Registration</li>
      </ul>
    </div>
  );
};

export default Navbar;
