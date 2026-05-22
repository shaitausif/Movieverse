'use client'
// import Image from "next/image";
import Navbar from "@/components/Navbar";
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";


export async function fetchMovies(query) {

  const url= `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}include_adult=false&language=en-US&page=1`;


    
  console.log(process.env.NEXT_PUBLIC_TMDB_TOKEN); //data not coming from NEXT_PUBLIC_TMDB_TOKEN i think
  
  const options = {
    method:"GET",
    headers:{
      accept:"application/json",
      Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTJjMTAyZjA0NDlkZjdkYzE0Nzg0N2EzZjFkZWE0NiIsIm5iZiI6MTc1NTY0MDM5OC42NDksInN1YiI6IjY4YTRmMjRlZjMzNzI4MDQwMTNlODJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-yS-AME0jEvmY65XUYrkf7vJvtNLUV-VqCLrnGshcW8`
    }
  };

const res = await fetch(url, options);
console.log("status:", res.status);
const data = await res.json();
console.log("data:", data);

  // const data = await fetchMovies("batman");
    // console.log(data);

  return data.results;

  
}
const [query, setquery] = useState("")


export default function Home() {
  return (
        <>
        <Navbar/>
      <main >
        <section className="bg-[#0F172A] h-screen flex justify-center gap-16 items-center flex-col">
          <div className="text-white flex flex-col justify-center items-center ">
            <label>search bar</label>
            <input type="text" placeholder="Enter movie name" className="rounded border border-gray-700" onChange={(e) => setQuery(e.target.value)}/>
             <button onClick={() => fetchMovies(query)}>  ✅
              button
            </button>
          </div>
          <div className="h-80 w-96 bg-[#fefffe25]">
             <Card className="relative mx-auto w-full max-w-sm pt-0">
               <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                 <img
                      src="https://avatar.vercel.sh/shadcn1"
                     alt="Event cover"
                     className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                   />
               <CardHeader>
            
                <CardTitle>Design systems meetup</CardTitle>
                 <CardDescription>
                    A practical talk on component APIs, accessibility, and shipping
                    faster.
                  </CardDescription>
                </CardHeader>
           
               </Card>
 

          </div>
        </section>
      </main>
        

        </>
  );
}
