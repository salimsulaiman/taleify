"use client";
import Image from "next/image";
import Link from "next/link";
// components/Navbar.js
import { useState, useEffect } from "react";
import { BiSolidBookAlt } from "react-icons/bi";
import { FaBell, FaSearch } from "react-icons/fa";
import ModalSearch from "./ModalSearch";

const NavApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const searchButton = () => {
    setIsSearchClicked(true);
  };

  const closeSearch = () => {
    setIsSearchClicked(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      // Periksa apakah klik dilakukan di luar modal pencarian
      const isOutsideModal = !event.target.closest(".modal-search");

      // Periksa apakah elemen yang diklik adalah input form
      const isInputFieldClicked = event.target.tagName === "INPUT" && event.target.type === "text";

      if (isSearchClicked && isOutsideModal && !isInputFieldClicked) {
        closeSearch();
      }
    };

    // Tambahkan event listener ke elemen body atau root
    document.addEventListener("click", handleOutsideClick);

    // Cleanup: hapus event listener saat komponen di-unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSearchClicked]);

  return (
    <div className="w-full">
      <nav className={"bg-white hidden sm:block fixed right-0 left-0 z-50 shadow-md"}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-9 py-5">
          <Link href={"/user/home"} className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={"/logo.png"} className="h-12 w-auto" alt="Flowbite Logo" width={500} height={500} />
          </Link>
          <ul className="flex items-center justify-center">
            <li className="ms-7">
              <button onClick={searchButton} className="text-slate-700">
                <FaSearch className="text-xl" />
              </button>
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
              <Link href={"/user/profile"}>
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
              </Link>
            </li>
          </ul>
        </div>
        <ModalSearch show={`${isSearchClicked ? "block" : "hidden"}`} />
      </nav>
      <nav className="sm:hidden bg-white top-3 left-3 right-3 z-50 shadow fixed p-2 rounded-full border-2 border-purple-light flex items-center overflow-hidden">
        <form action="" className="relative w-full">
          <input
            type="text"
            className="w-full text-slate-400 p-2 focus:outline-none focus:border-0 text-sm"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-500 text-2xl absolute right-4 top-1/2 -translate-y-1/2" />
        </form>
      </nav>
      <nav
        className={
          "bg-white border-2 border-purple-light block sm:hidden fixed right-3 left-3 z-50 bottom-2 rounded-2xl shadow"
        }
      >
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
