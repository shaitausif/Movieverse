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
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full flex h-screen">
        <div className="left w-[50%] bg-amber-500 "></div>
        <div className="right w-[50%] bg-emerald-400 flex justify-center items-center ">
          <div className="flex items-center justify-center gap-3 flex-col">
            <h2 className="font-semibold text-2xl flex items-center justify-center">
              Sign up <Signature />
            </h2>
            <h5>Please Sign-in to enjoy full experience</h5>
            <div className="flex items-center justify-center gap-4">
              <form
                className="bg-blue-400 w-[120%] flex flex-col gap-4 px-4 py-5 text-center"
                onSubmit={handleSubmit}
              >
                <div>
                  <label htmlFor="naam">Enter Name: </label>
                  <input
                    onChange={handleChange}
                    value={form.username}
                    type="text"
                    name="username"
                    id="naam"
                  />
                </div>
                <div>
                  <label htmlFor="age">Enter Age: </label>
                  <input
                    onChange={handleChange}
                    value={form.age}
                    type="number"
                    name="age"
                    id="age"
                  />
                </div>
                <div>
                  <label htmlFor="email">Enter Email:</label>
                  <input
                    onChange={handleChange}
                    value={form.email}
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div>
                  <label htmlFor="password">Enter password: </label>
                  <input
                    onChange={handleChange}
                    value={form.password}
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
                <h5>We won't share your credentials!</h5>

                <button type="submit">Sign-Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
