'use client'

import React, { useEffect, useState, useLayoutEffect } from "react";
import Navbar from "@/components/Navbar";
import { ArrowRight, ArrowLeft } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import TrendingMovie from "@/components/TrendingMovie";


const Home = () => {
  const [inputVal, setInputVal] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [index, setindex] = useState(1);
  const [trendingMovies, settrendingMovies] = useState([])
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

  useLayoutEffect(() => {
    console.log("main chala")
    async function fetchData(){
      const res = await fetch('/api/trending-movie',{
      method : 'GET',
      credentials : 'include',
    })
    const data = await res.json()
    settrendingMovies(data.movies)
    console.log(data)
    }
    
    fetchData()
  },[])


  const loveThis = async(movie) => {
    console.log("Love This",movie)
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
        <TrendingMovie 
        favList={favList}
        movieList={trendingMovies}
        loveThis={loveThis}
        />
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
            <MovieCard loveThis={loveThis}  movieList={movieList} favList={favList} />
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
