"use client";
import NavApp from "@/app/components/NavApp";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import LiterationList from "@/app/components/LiterationList";
import { StarIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

interface Author {
  name: string;
}

interface Genre {
  name: string;
}

interface LiterationDetail {
  title: string;
  picture: string;
  desc: string;
  name: string;
  author: Author;
  genre: Genre;
  rating: number;
}

function Literation(props: { params: { id: string } }) {
  const { params } = props;
  const idLiteration = params.id;

  const route = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdded, setIsAdded] = useState(true);
  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState<LiterationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const expanded = () => {
    setIsExpanded(!isExpanded);
  };

  const openLiteration = () => {
    route.push(`/user/literations/detail/${idLiteration}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("id");
      if (id == null) {
        route.push("/user/login");
      } else {
        try {
          const response = await fetch(`http://localhost:3000/api/literation/${idLiteration}`);

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const result = await response.json();

          setDataDetail(result);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("id");
      if (id == null) {
        route.push("/user/login");
      } else {
        try {
          const response = await fetch(`http://localhost:3000/api/literation`);

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const result = await response.json();

          setData(result);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <main className="w-full min-h-screen bg-white font-poppins">
      <NavApp />
      <section id="literarion-item" className="w-full">
        <div className="max-w-screen-xl mx-auto px-9 pb-5 pt-14">
          <div className="w-full bg-slate-100 border-2 border-slate-200 min-h-[343px] mt-[193px] relative rounded-lg p-4">
            <div className="w-full md:w-11/12 grid grid-cols-2 lg:grid-cols-4 h-full gap-6 mx-auto">
              <div className="row-span-4 lg:row-span-1 col-span-4 lg:col-span-1 relative">
                <div className="absolute h-[200px] lg:h-[407px] w-full bg-purple-light bottom-0 lg:-top-28 left-1/2 -translate-x-1/2 rounded-lg overflow-hidden">
                  <Image
                    src={dataDetail?.picture ?? "/imageload.png"}
                    alt="fantasy.jpg"
                    width={1000}
                    height={600}
                    className="object-cover object-bottom h-full w-full"
                    quality={80}
                  />
                </div>
              </div>
              <div className="col-span-4 lg:col-span-3 p-0 pb-2 lg:p-4 lg:pb-0 overflow-ellipsis relative flex justify-center flex-col">
                <h1 className="text-slate-700 text-lg md:text-3xl font-semibold mb-4 line-clamp-none lg:line-clamp-1">
                  {dataDetail?.title}
                </h1>
                <h4 className="text-sm text-slate-400 mb-4">{dataDetail?.author.name}</h4>
                <h3
                  className={`text-sm md:text-base text-slate-500 ${
                    isExpanded ? "line-clamp-none" : "line-clamp-4"
                  } text-justify mb-4`}
                >
                  {dataDetail?.desc}
                </h3>
                <h4 className="text-sm text-cyan-600 mb-4 cursor-pointer" onClick={expanded}>
                  {isExpanded ? "Sembunyikan" : "Lihat Selengkapnya"}
                </h4>
                <div className="flex mb-4">
                  <div className="bg-purple-light-400 text-purple-dark text-xs font-bold text-center rounded-md py-2 px-4 me-1">
                    {dataDetail?.genre.name}
                  </div>
                  <div className="bg-yellow-200 text-yellow-500 text-xs font-bold text-center rounded-md py-2 px-4 ms-1 flex items-center justify-center">
                    <StarIcon className="h-3 me-1" />
                    {dataDetail?.rating}
                  </div>
                </div>
                <div className="flex static lg:absolute -top-10">
                  {isAdded ? (
                    <div className="flex w-full">
                      <button
                        className="bg-gradient-to-r from-purple-light to-purple-semi-dark text-white px-4 py-2 rounded-md cursor-pointer text-sm md:text-base me-4 flex-grow sm:flex-grow-0"
                        onClick={openLiteration}
                      >
                        Buka Literasi
                      </button>{" "}
                      <button className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm md:text-base me-4 flex-grow sm:flex-grow-0">
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <div className="flex w-full">
                      <button className="bg-gradient-to-r from-purple-light to-purple-semi-dark text-white px-4 py-2 rounded-md cursor-pointer text-sm md:text-base flex-grow sm:flex-grow-0">
                        Tambahkan Literasi
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="populerGenre" className="w-full">
        <div className="max-w-screen-xl mx-auto px-9 pb-5 pt-14 md:pb-14">
          <div className="w-full flex items-start md:items-center justify-between flex-col md:flex-row">
            <div className="flex items-center">
              <div className="h-12 w-[2px] bg-purple-dark rounded-lg me-2"></div>
              <div>
                <h2 className="text-base sm:text-2xl text-slate-700">Genre</h2>
                <h2 className="text-base sm:text-2xl text-slate-700 font-bold">Populer</h2>
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
            {data.map((element: any) => {
              return (
                <div key={element._id}>
                  <LiterationList
                    id={element._id}
                    title={element.title}
                    author={element.author.name}
                    genre={element.genre.name}
                    image={element.picture}
                    rating={element.rating}
                    slug={element.slug}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Literation;
