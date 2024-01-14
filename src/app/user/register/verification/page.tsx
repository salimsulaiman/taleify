"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

function Verification() {
  const [codes, setCodes] = useState(["", "", "", ""]);
  const [code, setCode] = useState();
  const inputRefs: any = useRef([...Array(4)].map(() => React.createRef()));
  const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    setCodes((prevCodes) => {
      const newCodes = [...prevCodes];
      newCodes[index] = value;
      return newCodes;
    });

    if (value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index: number, event: any) => {
    if (event.key === "Backspace" && index > 0 && !codes[index] && codes[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerif = (e: any) => {
    router.push("/user/register/verification/success");
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      inputRefs.current.forEach((ref: any, index: number) => handleKeyDown(index, event));
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [codes]);

  return (
    <div
      className="w-full min-h-screen bg-white-100 bg-cover flex justify-center items-center font-poppins"
      style={{ backgroundImage: 'url("/buble.png")' }}
    >
      <div className="w-[673px] min-h-[360px] bg-white rounded-xl p-5 flex shadow-xl mx-4 relative items-center flex-col">
        <div className="w-[104px] h-[104px] bg-purple-semi-dark absolute left-1/2 -translate-x-1/2 -top-12 rounded-full flex justify-center items-center">
          <h2 className="text-xl font-bold text-white">Taleify</h2>
        </div>
        <h4 className="text-base text-slate-500 mt-16 text-center">
          Silahkan cek email terdaftar untuk mendapatkan kode verifikasi
        </h4>
        \
        <div className="w-[254px]">
          <div className="grid grid-cols-4 gap-3">
            {codes.map((code, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={code}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-full h-[76px] px-4 text-center border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-purple-light font-bold text-lg"
              />
            ))}
          </div>
        </div>
        <h4 className="text-purple-light mt-6 cursor-pointer mb-6">Kirim Ulang</h4>
        <button
          type="button"
          onClick={handleVerif}
          className="w-full sm:w-[402px] bg-gradient-to-r from-purple-light to-purple-dark text-white py-1.5 px-3 rounded-full hover:bg-gradient-to-l hover:from-purple-light hover:to-purple-dark focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-300"
        >
          Konfirmasi
        </button>
      </div>
    </div>
  );
}

export default Verification;
