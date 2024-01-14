"use client";
import Image from "next/image";
import Link from "next/link";
// components/Navbar.js
import { useState, useEffect } from "react";
import { BiSolidBookAlt } from "react-icons/bi";
import { FaBell, FaSearch } from "react-icons/fa";

const NavApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <nav className={"bg-white hidden sm:block fixed right-0 left-0 z-50"}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-9 py-5">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={"/logo.png"} className="h-12 w-auto" alt="Flowbite Logo" width={500} height={500} />
          </a>
          <ul className="flex items-center justify-center">
            <li className="ms-7">
              <Link href={"/"} className="text-slate-700">
                <FaSearch className="text-xl" />
              </Link>
            </li>
            <li className="ms-7">
              <Link href={"/"} className="text-slate-700">
                <FaBell className="text-xl" />
              </Link>
            </li>
            <li className="ms-7">
              <Link href={"/"} className="text-slate-700">
                <BiSolidBookAlt className="text-xl" />
              </Link>
            </li>
            <li className="ms-7">
              <div className="w-8 h-8 rounded-full bg-purple-semi-dark overflow-hidden flex justify-center items-center relative">
                <Image
                  src="/happy.jpg"
                  alt="profile.jpg"
                  quality={100}
                  width={500}
                  height={500}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <nav className={"bg-white block sm:hidden fixed right-0 left-0 z-50 bottom-0"}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto px-9 py-5">
          <div className="w-full flex items-center justify-evenly">
            <Link href={"/"} className="text-slate-700">
              <FaBell className="text-xl" />
            </Link>
            <Link href={"/"} className="text-slate-700">
              <BiSolidBookAlt className="text-xl" />
            </Link>
            <div className="w-8 h-8 rounded-full bg-purple-semi-dark overflow-hidden flex justify-center items-center relative">
              <Image
                src="/happy.jpg"
                alt="profile.jpg"
                quality={100}
                width={500}
                height={500}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavApp;
