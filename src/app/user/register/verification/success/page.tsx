"use client";
import { CheckIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

function Success() {
  return (
    <div
      className="w-full min-h-screen bg-white-100 bg-cover flex justify-center items-center font-poppins"
      style={{ backgroundImage: 'url("/buble.png")' }}
    >
      <div className="w-[673px] min-h-[312px] bg-purple-semi-dark rounded-xl p-5 flex shadow-2xl mx-4 relative items-center flex-col">
        <div className="w-[104px] h-[104px] bg-emerald-600 absolute left-1/2 -translate-x-1/2 -top-12 rounded-full flex justify-center items-center shadow">
          <Image src={"/checklist.png"} width={500} height={500} alt="checklist" className="w-full" />
        </div>
        <h2 className="text-2xl text-white mt-16 text-center">Berhasil Mendaftar</h2>
        <h4 className="text-base text-white mt-5 text-center">
          Terimakasih telah mendaftarkan akun anda, silahkan login untuk menikmati fitur-fitur yang kami sediakan
        </h4>
        <Link
          href={"/user/login"}
          className="text-center mt-10 w-full sm:w-[402px] bg-white hover:bg-slate-200 text-purple-semi-dark py-1.5 px-3 rounded-full focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-300"
        >
          Selesai
        </Link>
      </div>
    </div>
  );
}

export default Success;
