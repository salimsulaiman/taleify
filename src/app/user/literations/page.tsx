"use client";
import NavApp from "@/app/components/NavApp";
import Image from "next/image";
import React from "react";
import LiterationList from "@/app/components/LiterationList";

function Literations() {
  return (
    <main className="w-full min-h-screen bg-white font-poppins pb-8 md:pb-0">
      <NavApp />
      <section id="populerGenre" className="w-full">
        <div className="max-w-screen-xl mx-auto px-9 pb-24 pt-24 sm:pt-28 md:pb-14 md:pt-32">
          <div className="w-full flex items-start md:items-center justify-between flex-col md:flex-row">
            <div className="flex items-center">
              <div className="h-12 w-[2px] bg-purple-dark rounded-lg me-2"></div>
              <div>
                <h2 className="text-base sm:text-2xl text-slate-700">Kumpulan</h2>
                <h2 className="text-base sm:text-2xl text-slate-700 font-bold">Literasi</h2>
              </div>
            </div>
            <ul className="hidden md:flex text-slate-500 text-base">
              <li className="ms-5">Semua</li>
              <li className="ms-5">Fiksi</li>
              <li className="ms-5">Sejarah</li>
              <li className="ms-5">Akademis</li>
              <li className="ms-5">Romantis</li>
              <li className="ms-5">Horror</li>
            </ul>
            <select
              defaultValue={"Semua"}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 block md:hidden mt-6"
            >
              <option value={"Semua"}>-- Genre --</option>
              <option value="Semua">Semua</option>
              <option value="Fiksi">Fiksi</option>
              <option value="Sejarah">Sejarah</option>
              <option value="Akademis">Akademis</option>
              <option value="Romantis">Romantis</option>
              <option value="Horror">Horror</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 md:mt-11">
            <LiterationList
              title={"Bridges of Unity: Guardian of One World"}
              author={"Salim Sulaiman"}
              genre={"Fiksi"}
              image={"/fantasy.jpg"}
            />
            <LiterationList
              title={"Atlantis Kota Yang Hilang"}
              author={"Salim Sulaiman"}
              genre={"Sejarah"}
              image={"/atlantis.png"}
            />
            <LiterationList
              title={"Raja Naga dan Pahlawan yang Terlupakan"}
              author={"Salim Sulaiman"}
              genre={"Fiksi"}
              image={"/pahlawan-naga.jpg"}
            />
            <LiterationList
              title={"Perjalanan Seorang Pelajar"}
              author={"Salim Sulaiman"}
              genre={"Akademis"}
              image={"/ilmu.jpg"}
            />
            <LiterationList
              title={"Aurora Penghias Langit"}
              author={"Salim Sulaiman"}
              genre={"Romantis"}
              image={"/aurora.jpg"}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Literations;
