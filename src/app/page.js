'use client'

import React, { useEffect, useState, useLayoutEffect } from "react";
import Navbar from "@/components/Navbar";
import { Heart,ArrowDown, ArrowRight, ArrowLeft } from "lucide-react";


const Home = () => {
  const [inputVal, setInputVal] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [index, setindex] = useState(1);
  const [favList, setFavList] = useState(
    JSON.parse(localStorage.getItem("favMovies")) || [],
  );
  // console.log(inputVal);
  // console.log(favList);

  // fill="#df0707"

  const getMovie = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=372e89abce180852b290b619db5b96bc&query=${inputVal}&include_adult=false&language=en-US&page=${index}`,
      );
      const data = await res.json();
      
      setMovieList(data.results);
      
    } catch (error) {
      console.error(error);
    }
  };
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setindex(1)
      getMovie();
    }, 700);
    return () => clearTimeout(timer);
  }, [inputVal]);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
     
      getMovie();
    }, 700);
    return () => clearTimeout(timer);
  }, [index]);



  useEffect(() => {
    window.localStorage.setItem("favMovies", JSON.stringify(favList));
  }, [favList]);

  const inputBharh = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("yeh chala kya");
  };




  const loveThis = async(movie) => {
    const filteredFav = favList.filter((favMovie) => {
      return movie.id === favMovie.movie_id;
    });
    if (filteredFav.length > 0) {
      console.log(movie);
      setFavList((prev) => {
        return prev.map((favM) => {
          // console.log("Fav",favM)
          // console.log(filteredFav)
          return favM.movie_id == filteredFav[0].movie_id
            ? {
                ...favM,
                is_fav: !favM.is_fav,
              }
            : favM;
        });
      });
      console.log("Getting Triggered")
       const res = await fetch('/api/favMovie',{
      method : 'POST',
      credentials : 'include',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
           movID : movie.id,
                movTitle: movie.title,
                movDesc: movie.overview,
                movRating: movie.vote_average,
                movURL: movie.poster_path,
                movAdult: movie.adult
      })
    })

    const data = await res.json()
    console.log(data)
    } else {
      setFavList((prev) => {
        return [...prev, { movie_id: movie.id, is_fav: true, movie: movie }];
      });
    }
  };



  // console.log(favList);

  return (
    <div className="bg-[#092327] min-h-dvh ">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-3 px-3 py-6">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="  text-white flex p-10 text-2xl gap-3.5 items-center justify-center flex-col"
        >
          <label htmlFor="input">Search Any Movie:</label>
          <input
            className="bg-[#00A9A5] text-white  px-6 py-2 w-[120%] text-center rounded-2xl text-[20px]  border-gray-800 "
            type="text"
            name="input"
            id="input"
            placeholder="Enter Movie Name..."
            value={inputVal}
            onChange={inputBharh}
          />
          {/* <button type='submit'>Search</button> */}
        </form>
        {movieList.length > 0 && (
          <>
            <div className="bg-[#85B79D] flex justify-center items-center gap-4 p-4 w-[80%] mb-20  flex-wrap rounded-2xl">
              {movieList.map((movie) => {
                return (
                  <div
                    key={movie.id}
                    className="bg-[#B3EFB2] flex justify-center w-75 items-center gap-2 flex-col px-2 py-4 text-center rounded-2xl hover:translate-px relative"
                  >
                    <img
                      className="h-75 w-62.5 object-contain "
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="{movie.title}"
                    />
                    <h3 className="text-xl font-semibold">{movie.title}</h3>

                    <p>Released on : {movie.release_date}</p>
                    {(() => {
                      // console.log(favList)
                      const isFavorite = favList.some(
                        (favMovie) =>
                          String(favMovie.movie_id) === String(movie.id) &&
                          favMovie.is_fav,
                      );

                      return (
                        <button
                          onClick={async() => await loveThis(movie)}
                          title="Mark As Favourite"
                          className="absolute bottom-5.5 right-3 cursor-pointer hover:translate-y-0.5"
                        >
                          <Heart
                            size={28}
                            color="#df0707"
                            strokeWidth={2.25}
                            absoluteStrokeWidth
                            fill={isFavorite ? "#df0707" : "transparent"}
                          />
                        </button>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
           {
            movieList.length == 20 && (
               <div className="bg-emerald-300 px-2 py-3 flex justify-center items-center gap-4 rounded-2xl ">
                  <button onClick={()=>{
                    index>0 ? () => {
                      setindex(index-1)
                  
                    } : null
                  }}
                  disabled={
                    index === 1 ? true : false
                  }
                      className={` hover:-translate-y-0.25`}><ArrowLeft /></button>
                  <p className="text-xl">{index}</p>
                  <button onClick={()=>{
                    setindex(index+1)
                    
                  }} className="hover:-translate-y-0.25"><ArrowRight/></button>
            </div>
            )
           }
          </>
        )}
        <div className="bg-emerald-300"></div>
      </div>
    </div>
  );
};

export default Home;
