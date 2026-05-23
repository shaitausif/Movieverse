"use client";
import { Signature } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "react-toastify";

const page = () => {
  const [form, setform] = useState({
    username: "",
    age: "",
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
      if (!form.username || !form.age || !form.email || !form.password) {
        toast.warn("Form khali hai, bhar de bhai/behen");
      }
      const res = await fetch("/api/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Signup ho gaya tera bhai/behen");
        localStorage.setItem('isLoggedIn',true)
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="signup w-full flex h-screen">
        <div className="left w-[50%] ">
          <img src="./images/popcorn-rm.png" alt="" />
        </div>
        <div className="right w-[50%] flex justify-center items-center ">
        <div className="bg-[#1E293B] text-[#F8FAFC] rounded-2xl px-8 py-10 flex shadow-[#1E293B] shadow-2xl">
          <div className="flex flex-col gap-8">
          <div className="flex items-center justify-center gap-6 flex-col  ">
            <h2 className="font-semibold lg:text-4xl md:text-3xl flex items-center justify-center text-[#F59E0B] ">
              Sign up <Signature />
            </h2>
            <h5 className="text-3xl text-sky-600">Please Sign-in to enjoy full experience</h5>
          </div>
            <div className="flex  items-center justify-center gap-4">
              <form
                className=" w-[120%] bg-[#0F172A] rounded-2xl  flex flex-col items-start gap-4 px-7 py-15 text-center text-2xl"
                onSubmit={handleSubmit}
                >
                <div>
                  <label className="text-[#94A3B8]" htmlFor="naam">Enter Name: </label>
                  <input className="border border-gray-500 "
                    placeholder=""
                    onChange={handleChange}
                    value={form.username}
                    type="text"
                    name="username"
                    id="naam"
                    />
                </div>
                <div>
                  <label className="text-[#94A3B8]" htmlFor="age">Enter Age: </label>
                  <input className="border border-gray-500 "
                    placeholder=""
                    onChange={handleChange}
                    value={form.age}
                    type="number"
                    name="age"
                    id="age"
                    />
                </div>
                <div>
                  <label className="text-[#94A3B8]" htmlFor="email">Enter Email:</label>
                  <input className="border border-gray-500 "
                    placeholder=""
                    onChange={handleChange}
                    value={form.email}
                    type="email"
                    name="email"
                    id="email"
                    />
                </div>
                <div>
                  <label className="text-[#94A3B8]" htmlFor="password">Enter password: </label>
                  <input className="border border-gray-500 "
                    placeholder=""
                    onChange={handleChange}
                    value={form.password}
                    type="password"
                    name="password"
                    id="password"
                    />
                </div>
                <h5 className="text-sky-600">We won't share your credentials!</h5>
                 <div className="w-full flex justify-center ">

                <button className="border rounded-2xl px-7 py-1 bg-[#10B981] text-[#0F172A]" type="submit">Sign-Up</button>
                 </div>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
