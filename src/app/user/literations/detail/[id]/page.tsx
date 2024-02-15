"use client";
import NavApp from "@/app/components/NavApp";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/16/solid";
import StoryList from "@/app/components/StoryList";
import { useRouter } from "next/navigation";

interface Author {
  name: string;
}

interface Genre {
  name: string;
}

interface LiterationDetail {
  _id: string;
  title: string;
  picture: string;
  desc: string;
  name: string;
  author: Author;
  genre: Genre;
  rating: number;
}

interface StoryDetail {
  _id: string;
  literation: LiterationDetail;
  subTitle: string;
  story: string;
}

function LiterationDetail(props: { params: { id: string } }) {
  const { params } = props;
  const idLiteration = params.id;
  // console.log(idLiteration);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdded, setIsAdded] = useState(true);
  const [dataDetail, setDataDetail] = useState<LiterationDetail | null>(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const expanded = () => {
    setIsExpanded(!isExpanded);
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
          const response = await fetch(`http://localhost:3000/api/story/literation/${idLiteration}`);

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
    <main className="w-full min-h-screen bg-white font-poppins pb-16 md:pb-0">
      <NavApp />
      <section id="literarion-item" className="w-full">
        <div className="max-w-screen-xl mx-auto px-9 pb-16 pt-4 md:pt-14">
          <div className="w-full bg-slate-100 border-2 border-slate-200 min-h-[343px] mt-[193px] relative rounded-lg px-4 pt-4 pb-8">
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
                    Fiksi
                  </div>
                  <div className="bg-yellow-200 text-yellow-500 text-xs font-bold text-center rounded-md py-2 px-4 ms-1 flex items-center justify-center">
                    <StarIcon className="h-3 me-1" />
                    4.6
                  </div>
                </div>
                <div className="flex static lg:absolute -top-10">
                  {isAdded ? (
                    <div className="flex w-full">
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
              <div className="col-span-4 mt-4">
                {data.map((items: any, index: number) => {
                  return (
                    <div key={items._id}>
                      <StoryList title={items.subTitle} status={1} index={index + 1} score={10} idStory={items._id} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full mt-9">
            <div className="w-full sm:w-[130px] h-[176px] bg-slate-100 rounded-xl overflow-hidden relative">
              <Image
                src={dataDetail?.picture ?? "/imageload.png"}
                height={600}
                width={400}
                alt="fantasy.jpg"
                className="w-full h-full object-cover object-center"
                quality={80}
              />
            </div>
            <div className="ms-0 sm:ms-4 mt-4 sm:mt-0 flex flex-col items-start justify-around">
              <h4 className="text-base sm:text-xl font-bold text-slate-700 line-clamp-none sm:line-clamp-1 mb-4 sm:mb-0">
                {dataDetail?.title}
              </h4>
              <div className="flex mb-4 sm:mb-0">
                <div className="bg-purple-light-400 text-purple-dark text-xs font-bold text-center rounded-md py-2 px-4 me-1">
                  Fiksi
                </div>
                <div className="bg-yellow-200 text-yellow-500 text-xs font-bold text-center rounded-md py-2 px-4 ms-1 flex items-center justify-center">
                  <StarIcon className="h-3 me-1" />
                  4.6
                </div>
              </div>
              <h4 className="text-slate-500 text-base font-bold mb-4 sm:mb-0">Poin Literasi</h4>
              <h3 className="text-4xl text-green-700 font-bold">10</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LiterationDetail;
