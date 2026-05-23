'use client'

import React from 'react'
import { BookHeart } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))
  const router = useRouter()

  const handleLogout = async(e) => {
    try {
      
      const res = await fetch('/api/logout',{
        method : 'PUT',
        credentials : 'include',
        headers : {
          'Content-Type' : "application/json"
        },
      })
      const data = await res.json()
      if(data.success){
        toast.info(data.message)
        localStorage.setItem('isLoggedIn',false)
        router.push('/login')
        
      }else{
        toast.warn(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  
    
       
  

  return (
    <div className='bg-[#0B5351] flex items-center justify-between text-2xl text-white min-h-4 p-4'>
            <h1 className='text-3xl font-semibold'>Find Your Movie</h1>
            <button onClick={() => {
              router.push('/favourite-movies')
            }}
            
            title='Browse Your Favourites' className='flex justify-center items-center gap-2 px-4 p-2 bg-[#78BC61] cursor-pointer rounded-4xl text-xl active:scale-95  hover:translate-x-px '><BookHeart size={28} color="#AAFCB8" strokeWidth={2.25} absoluteStrokeWidth /> Favourite</button>
            {
              isLoggedIn ? (
                <Button onClick={(e) => handleLogout(e)}>Logout</Button>
              ) : (
                <Button onClick={(e) => {
                  router.push('/login')
                }}>Login</Button>
              )
            }
    </div>
  )
}

export default Navbar