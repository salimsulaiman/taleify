"use client";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("http://localhost:3000/api/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);

      setEmail("");
      setPassword("");
      route.push("/user/home");
    } else {
      console.log("Login Failed");
    }
    setIsLoading(false);
  };
  return (
    <div
      className="w-full min-h-screen bg-white-100 bg-cover flex justify-center items-center font-poppins"
      style={{ backgroundImage: 'url("/buble.png")' }}
    >
      <div className="w-[907px] min-h-[470px] bg-white rounded-lg p-5 flex shadow-sm mx-4">
        <div
          className="hidden md:block w-1/2 rounded-lg me-2.5 bg-cover bg-center overflow-hidden relative"
          style={{ backgroundImage: 'url("/login.jpg")' }}
        >
          <div className="absolute bg-black p-4 text-center bg-opacity-40 bottom-0 mb-4 ms-4 me-4 rounded-lg">
            Membaca akan membantumu menemukan dirimu
          </div>
        </div>
        <div className="w-full md:w-1/2 ms-2.5 flex justify-center flex-col">
          <h1 className="text-[32px] text-purple-semi-dark font-bold mb-2">Teleify</h1>
          <h2 className="text-2xl text-slate-600 font-medium mb-3">Hello, Pengguna</h2>
          <h4 className="text-[16px] text-slate-500 mb-5">Selamat datang, silahkan login untuk melanjutkan</h4>
          <form onSubmit={login}>
            <div className="mb-4">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <EnvelopeIcon className="h-6 w-6 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="email"
                  className="w-full ps-11 px-3 py-2 border text-slate-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-light"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <LockClosedIcon className="h-6 w-6 text-slate-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full ps-11 px-3 py-2 border text-slate-600 border-gray-300 rounded-lg focus:outline-none focus:border-purple-light"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-light to-purple-dark text-white py-1.5 px-3 rounded-full hover:bg-gradient-to-l hover:from-purple-light hover:to-purple-dark focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Masuk"}
            </button>
            <h4 className="text-slate-600 mt-4 text-center">Belum punya akun?</h4>
          </form>
          <Link
            href={"/user/register"}
            className="mt-4 w-full bg-transparent text-purple-light border-2 border-purple-light py-1.5 px-3 rounded-full hover:bg-gradient-to-l hover:from-purple-light hover:to-purple-dark hover:text-white focus:outline-none focus:shadow-outline-blue text-center"
          >
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
