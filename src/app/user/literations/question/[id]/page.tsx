"use client";
import NavApp from "@/app/components/NavApp";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import LiterationList from "@/app/components/LiterationList";
import { ArrowLeftCircleIcon, StarIcon } from "@heroicons/react/16/solid";
import StoryList from "@/app/components/StoryList";
import { useRouter } from "next/navigation";

interface Literation {
  _id: String;
  title: String;
}

interface Story {
  _id: String;
  literation: Literation;
  subTitle: String;
}

interface QuestionDetail {
  _id: string;
  story: Story;
  question: String;
  answer: Array<string>;
  correct_answer: String;
  point: Number;
}

function Question(props: { params: { id: string } }) {
  const { params } = props;
  const idStory = params.id;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdded, setIsAdded] = useState(true);
  const route = useRouter();
  const [data, setData] = useState<QuestionDetail | null>(null);
  const [questionData, setQuestionData] = useState<QuestionDetail | null>(null);
  const [error, setError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const expanded = () => {
    setIsExpanded(!isExpanded);
  };

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerChange = (event: any) => {
    setSelectedAnswer(event.target.value);
  };

  const previous = () => {
    route.back();
  };
  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("id");
      if (id == null) {
        route.push("/user/login");
      } else {
        try {
          const response = await fetch(`http://localhost:3000/api/question/story/${idStory}`);

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const result = await response.json();

          setData(result[0]);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  const saveAnswer = async () => {
    if (selectedAnswer == data?.correct_answer[0]) {
      alert("Jawaban betul");
    } else {
      alert("Jawaban Salah");
    }
    setIsLoading(true);

    const response = await fetch("http://localhost:3000/api/question/user_answer/", {
      method: "POST",
      body: JSON.stringify({
        user: localStorage.getItem("id"),
        question: data?._id,
        userAnswer: selectedAnswer,
      }),
    });
    if (response.ok) {
      route.push("/user/home");
    } else {
      console.log("Login Failed");
    }
    setIsLoading(false);
  };
  return (
    <main className="w-full min-h-screen bg-slate-100 font-poppins">
      <NavApp />
      <section id="story" className="w-full">
        <div className="max-w-screen-xl mx-auto px-9 pb-28 md:pb-16 pt-20 md:pt-32">
          <div className="w-full bg-white h-24 rounded-xl py-5 px-7 flex flex-col items-start justify-center mb-4 relative">
            <div
              className="absolute h-8 w-8 rounded-full bg-slate-400 -left-3 top-1/2 -translate-y-1/2 flex justify-center items-center cursor-pointer overflow-hidden"
              onClick={previous}
            >
              <ArrowLeftCircleIcon className="bg-slate-400" />
            </div>
            <h4 className="text-slate-500 text-sm font-semibold mb-2 line-clamp-1">{data?.story.literation.title}</h4>
            <h1 className="text-slate-600 text-xl font-semibold line-clamp-1">{data?.story.subTitle}</h1>
          </div>
          <div className="w-full bg-white h-auto rounded-xl p-11 flex flex-col items-start justify-center mb-4">
            <h4 className="w-full text-slate-500 text-base mb-8 text-center">{data?.question}</h4>
            <div className="grid grid-cols-1 w-full sm:w-11/12 md:w-2/3 lg:w-1/2 mx-auto gap-4">
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="answerOption1"
                  name="answerOptions"
                  value="A"
                  onChange={handleAnswerChange}
                  className="hidden"
                />
                <label
                  htmlFor="answerOption1"
                  className="text-sm md:text-base text-slate-500 cursor-pointer flex w-full items-center justify-start bg-slate-100 hover:bg-slate-200 p-4 rounded-lg border-2 border-slate-200 checked:bg-purple-light focus:outline-none focus:border-purple-light"
                >
                  <span
                    className={`${
                      selectedAnswer == "A" ? "bg-white text-purple-light" : "bg-purple-light text-white"
                    } h-8 w-8 flex justify-center items-center rounded-full p-4 me-4`}
                  >
                    A
                  </span>
                  <span>{data?.answer[0]}</span>
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="answerOption2"
                  name="answerOptions"
                  value="B"
                  onChange={handleAnswerChange}
                  className="hidden"
                />
                <label
                  htmlFor="answerOption2"
                  className="text-sm md:text-base text-slate-500 cursor-pointer flex w-full items-center justify-start bg-slate-100 hover:bg-slate-200 p-4 rounded-lg border-2 border-slate-200 checked:bg-purple-light focus:outline-none focus:border-purple-light"
                >
                  <span
                    className={`${
                      selectedAnswer == "B" ? "bg-white text-purple-light" : "bg-purple-light text-white"
                    } h-8 w-8 flex justify-center items-center rounded-full p-4 me-4`}
                  >
                    B
                  </span>
                  <span>{data?.answer[1]}</span>
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="answerOption3"
                  name="answerOptions"
                  value="C"
                  onChange={handleAnswerChange}
                  className="hidden"
                />
                <label
                  htmlFor="answerOption3"
                  className="text-sm md:text-base text-slate-500 cursor-pointer flex w-full items-center justify-start bg-slate-100 hover:bg-slate-200 p-4 rounded-lg border-2 border-slate-200 checked:bg-purple-light focus:outline-none focus:border-purple-light"
                >
                  <span
                    className={`${
                      selectedAnswer == "C" ? "bg-white text-purple-light" : "bg-purple-light text-white"
                    } h-8 w-8 flex justify-center items-center rounded-full p-4 me-4`}
                  >
                    C
                  </span>
                  <span>{data?.answer[2]}</span>
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="answerOption4"
                  name="answerOptions"
                  value="D"
                  onChange={handleAnswerChange}
                  className="hidden"
                />
                <label
                  htmlFor="answerOption4"
                  className="text-sm md:text-base text-slate-500 cursor-pointer flex w-full items-center justify-start bg-slate-100 hover:bg-slate-200 p-4 rounded-lg border-2 border-slate-200 checked:bg-purple-light focus:outline-none focus:border-purple-light"
                >
                  <span
                    className={`${
                      selectedAnswer == "D" ? "bg-white text-purple-light" : "bg-purple-light text-white"
                    } h-8 w-8 flex justify-center items-center rounded-full p-4 me-4`}
                  >
                    D
                  </span>
                  <span>{data?.answer[3]}</span>
                </label>
              </div>
            </div>
            {/* {selectedAnswer && (
              <p className="mt-4 text-slate-500">
                Jawaban Anda: <strong>{selectedAnswer}</strong>
              </p>
            )} */}
          </div>
          <button
            className="w-full bg-gradient-to-r from-purple-light to-purple-dark hover:from-purple-dark hover:to-purple-semi-dark px-4 py-2 text-white rounded-xl"
            onClick={saveAnswer}
          >
            Selesai
          </button>
        </div>
      </section>
    </main>
  );
}

export default Question;
