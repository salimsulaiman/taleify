import { StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function LiterationList({ title, author, genre, image, rating, slug, id }: any) {
  const route = useRouter();
  const movePages = () => {
    route.push(`/user/literations/${id}`);
  };
  return (
    <div>
      <div className="min-h-[349px] w-auto border-slate-200 border-2 bg-slate-100 text-slate-700 p-3 rounded-lg">
        <div className="h-[235px] rounded-lg w-full bg-purple-light overflow-hidden relative">
          <Image
            src={image}
            alt={slug}
            width={600}
            height={800}
            className="object-cover object-center h-full w-full"
            quality={80}
          />
        </div>
        <h4
          className="text-slate-700 text-sm font-bold mt-3 overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer"
          onClick={movePages}
        >
          {title}
        </h4>
        <h4 className="text-slate-500 text-sm mt-1">{author}</h4>
        <div className="flex items-start justify-start mt-3">
          <div className="bg-purple-light-400 text-purple-dark text-xs font-bold text-center rounded-md py-2 px-4 flex-grow me-1">
            {genre}
          </div>
          <div className="bg-yellow-200 text-yellow-500 text-xs font-bold text-center rounded-md py-2 px-4 flex-grow ms-1 flex items-center justify-center">
            <StarIcon className="h-3 me-1" />
            {rating}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiterationList;
