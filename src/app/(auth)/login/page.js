"use client";

import "@/animation.css";
import { FingerprintPattern, KeyRound, Mail ,LogIn} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "react-toastify";

const page = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!form.email || !form.password) {
        toast.warn("Form khali hai, bhar de bhai/behen");
      }
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Login ho gaya tera bhai/behen");
        router.push("/");
      }else{
        toast.warn(data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex h-screen w-screen bg-size-[300%_300%] bg-linear-to-tr from-[#add6b4] via-[#77b959] to-teal-800 transition-all duration-1000 ease-in-out animate-gradient">
        <div className="left w-[50%]  flex justify-center items-center ">
          <div className="flex items-center justify-center gap-3 flex-col">
            <div className="flex justify-center items-center gap-2 text-3xl">
              <h2 className="font-semibold flex items-center justify-center">
                Log-in
              </h2>
              <FingerprintPattern />
            </div>
            <h5>Please Log-in to access full freedom</h5>
            <div className="flex items-center justify-center gap-4">
              <form
                className="bg-[#D7FFF1]/10 backdrop-blur-3xl w-[120%] flex justify-center items-center flex-col gap-4 px-14 py-10 rounded-4xl  text-center"
                onSubmit={handleSubmit}
              >
                <div className="flex items-center justify-center gap-2.5 flex-col">
                  <label
                    className="flex justify-center items-center gap-1 text-xl"
                    htmlFor="email"
                  >
                    Enter Email <Mail size={20} strokeWidth={2} />:
                  </label>
                  <input
                    className=" rounded-2xl outline-none focus:border focus:border-[#204b21]  transition-all duration-500  bg-[#63D471] text-center text-black px-2.5 py-2"
                    onChange={handleChange}
                    value={form.email}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email..."
                  />
                </div>
                <div className="flex items-center justify-center gap-2.5 flex-col relative">
                  <label
                    className="flex justify-center items-center gap- text-xl"
                    htmlFor="password"
                  >
                    Enter password <KeyRound size={20} strokeWidth={2} />:{" "}
                  </label>
                  <input
                    className=" rounded-2xl outline-none focus:border focus:border-[#204b21]  transition-all duration-500 bg-[#63D471] text-center text-black px-2.5 py-2"
                    onChange={handleChange}
                    value={form.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Your Password..."
                  />
                <h5 className="text-[14px] text-gray-800 absolute -bottom-7 ">We won't share your credentials!</h5>
                </div>

                <button 
                className="mt-4 flex justify-center items-center gap-1 rounded-3xl cursor-pointer active:scale-95 border-black border w-[50%] px-2 py-1 bg-[#63A46C]"
                type="submit">Log-in <LogIn size={18}/> </button>
              </form>
            </div>
          </div>
        </div>
        <div className="right w-[50%] flex justify-center items-center ">
            <div className="flex justify-center items-center">
                <img className="w-[80%] " src="./login.png" alt="log-in pic" />
            </div>
        </div>
      </div>
    </>
  );
};

export default page;
