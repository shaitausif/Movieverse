'use client'

import React, { useState } from 'react'
import MovieCard from '@/components/MovieCard'

const page = () => {
    
    const [localMovies,SetLocalMovies] = useState(JSON.parse(localStorage.getItem('favMovies')) || [])


  return (
    <>
    <MovieCard favList={localMovies} movieList={localMovies} isItFavourite={true} />
    
    </>
  )
}

export default page
