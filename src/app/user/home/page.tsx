import NavApp from "@/app/components/NavApp";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import React from "react";

function Home() {
  return (
    <main className="w-full min-h-screen bg-white font-poppins">
      <NavApp />
      <section id="recomendation" className="w-full">
        <div className="max-w-screen-xl mx-auto px-9 pt-8 pb-8 md:px-9 md:pt-24 md:pb-14 lg:px-9 lg:pt-5 lg:pb-14">
          <div className="w-full h-[150px] md:h-[257px] bg-slate-500 rounded-lg overflow-hidden mt-0 sm:mt-20 relative">
            <Image
              src={"/fantasy.jpg"}
              alt="recomendation"
              quality={100}
              layout="fill"
              objectFit="cover"
              className="object-center sm:object-bottom"
            />
            <div className="bg-black absolute z-10 right-0 left-0 bottom-0 top-0 p-5 flex flex-col justify-center sm:justify-end items-start bg-opacity-50">
              <h2 className="text-lg sm:text-2xl">Bridges of Unitiy: Guardian of One World</h2>
              <h4 className="text-xs sm:text-base">
                Baca cerita Superhero pencipta kesatuan dan perdamaian di Taleify
              </h4>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
