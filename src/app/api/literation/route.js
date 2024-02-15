import connectMongoDB from "../../../../libs/mongodb";
import Literation from "../../../../models/literation";
import Author from "../../../../models/author";
import Genre from "../../../../models/genre";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, picture, author, genre, rating, desc } = await request.json();
  function stringToSlug(str) {
    // Remove leading and trailing whitespaces
    str = str.trim().toLowerCase();

    // Replace spaces with dashes
    str = str.replace(/\s+/g, "-");

    // Replace special characters with their equivalent
    str = str.replace(/[^\w-]/g, "");

    return str;
  }
  await connectMongoDB();
  await Literation.create({
    title,
    slug: stringToSlug(title),
    picture,
    author,
    genre,
    rating,
    desc,
  });
  return NextResponse.json({ message: "Literation Created" }, { status: 200 });
}

export async function GET() {
  await connectMongoDB();
  const literation = await Literation.find({}).populate("author").populate("genre");
  return NextResponse.json(literation, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  console.log(id);
  await connectMongoDB();
  await Genre.findByIdAndDelete(id);
  return NextResponse.json({ message: "Genre deleted" }, { status: 200 });
}
