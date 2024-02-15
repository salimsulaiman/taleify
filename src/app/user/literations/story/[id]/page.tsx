"use client";
import NavApp from "@/app/components/NavApp";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import LiterationList from "@/app/components/LiterationList";
import { StarIcon } from "@heroicons/react/16/solid";
import StoryList from "@/app/components/StoryList";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";

interface Literation {
  title: string;
}

interface StoryDetail {
  _id: string;
  literation: Literation;
  subTitle: string;
  story: string;
}

function Story(props: { params: { id: string } }) {
  const { params } = props;
  const idStory = params.id;

  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState<StoryDetail | null>(null);
  const [error, setError] = useState(true);
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const next = () => {
    route.push(`http://localhost:3000/user/literations/question/${idStory}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("id");
      if (id == null) {
        route.push("/user/login");
      } else {
        try {
          const response = await fetch(`http://localhost:3000/api/story/${idStory}`);

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

  const htmlString = `${data?.story}`;
  const story = parse(htmlString);
  return (
    <main className="w-full min-h-screen bg-slate-100 font-poppins">
      <NavApp />
      <section id="story" className="w-full">
        <div className="max-w-screen-xl mx-auto px-9 pb-28 md:pb-16 pt-20 md:pt-32">
          <div className="w-full bg-white h-24 rounded-xl py-5 px-7 flex flex-col items-start justify-center mb-4">
            <h4 className="text-slate-500 text-sm font-semibold mb-2 line-clamp-1">{data?.literation.title}</h4>
            <h1 className="text-slate-600 text-xl font-semibold line-clamp-1">{data?.subTitle}</h1>
          </div>
          <div className="w-full bg-white h-auto rounded-xl p-11 flex flex-col items-start justify-center mb-4 text-xs sm:text-sm md:text-base leading-loose story">
            {story}
          </div>
          <button
            onClick={next}
            className="w-full bg-gradient-to-r from-purple-light to-purple-dark hover:from-purple-dark hover:to-purple-semi-dark px-4 py-2 text-white rounded-xl"
          >
            Selesai Membaca
          </button>
        </div>
      </section>
    </main>
  );
}

export default Story;
