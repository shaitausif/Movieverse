import React from 'react'
import { BookHeart } from 'lucide-react';
const Navbar = () => {
  return (
    <div className='bg-[#0B5351] flex items-center justify-between text-2xl text-white min-h-4 p-4'>
            <h1 className='text-3xl font-semibold'>Find Your Movie</h1>
            <button title='Browse Your Favourites' className='flex justify-center items-center gap-2 px-4 p-2 bg-[#78BC61] cursor-pointer rounded-4xl text-xl active:scale-95  hover:translate-x-px '><BookHeart size={28} color="#AAFCB8" strokeWidth={2.25} absoluteStrokeWidth /> Favourite</button>
    </div>
  )
}

export default Navbar