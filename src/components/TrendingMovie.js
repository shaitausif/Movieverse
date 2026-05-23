'use client'

import React from "react";
import { Heart } from "lucide-react";

const TrendingMovie = ({movieList, favList, loveThis}) => {


   

  const handleTrendingClick = async (movie) => {
             try {
                 const res = await fetch("/api/trending-movie", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(movie),
              });

              const data = await res.json();
              console.log(data);
             } catch (error) {
                console.error(error)
             }
            }



  return (
    <div className="bg-[#85B79D] flex justify-center items-center gap-4 p-4 w-[80%] mb-20  flex-wrap rounded-2xl">
      {movieList.map((movie) => {
        return (
          <div
           
            key={movie.movie.id}
            className="bg-[#B3EFB2] flex justify-center w-75 items-center gap-2 flex-col px-2 py-4 text-center rounded-2xl hover:translate-px relative"
          >
            <img
             onClick={handleTrendingClick}
              className="h-75 w-62.5 object-contain "
              src={`https://image.tmdb.org/t/p/w500${movie.movie.poster_path}`}
              alt="{movie.title}"
            />
            <h3
            onClick={() => handleTrendingClick(movie)}
            className="text-xl font-semibold">
              {movie.movie.title}
            </h3>

            <p>
              Released on :{" "}
              {movie.movie.release_date}
            </p>
            {(() => {
              // console.log(favList)
              const isFavorite = favList.some(
                (favMovie) =>
                  String(favMovie.movie_id) === String(movie.movie.id) &&
                  favMovie.is_fav,
              );

              return (
                <button
                  onClick={async () => await loveThis(movie.movie)}
                  title="Mark As Favourite"
                  className="absolute z-50 bottom-5.5 right-3 cursor-pointer hover:translate-y-0.5"
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
  );
};

export default TrendingMovie;
