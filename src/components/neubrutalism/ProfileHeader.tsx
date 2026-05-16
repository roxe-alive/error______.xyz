
"use client"

import React from 'react'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Badge } from '@/components/ui/badge'

export const ProfileHeader = () => {
  const catImage = PlaceHolderImages.find(img => img.id === 'sad-cat-dp')

  return (
    <header className="flex flex-col md:flex-row items-center gap-8 mb-16 relative">
      <div className="relative rotate-[-3deg]">
        <div className="nb-border nb-shadow-lg p-1 bg-black">
          <div className="bg-white p-1">
             {catImage?.imageUrl ? (
               <Image 
                  src={catImage.imageUrl}
                  alt="Sad Cat"
                  width={180}
                  height={180}
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                  data-ai-hint="sad cat"
               />
             ) : (
               <div className="w-[180px] h-[180px] bg-muted flex items-center justify-center font-code text-xs text-center p-4">
                 IMAGE_NOT_FOUND.ERR
               </div>
             )}
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 bg-[#EF4444] text-white nb-border px-3 py-1 font-headline font-bold uppercase text-sm -rotate-6 nb-shadow">
          Offline
        </div>
      </div>
      
      <div className="flex-1 text-center md:text-left relative">
        <h1 className="text-5xl md:text-7xl font-black mb-2 flex flex-wrap items-center justify-center md:justify-start gap-x-4">
          <span className="bg-[#FFFF00] px-4 py-1 nb-border nb-shadow rotate-[-2deg]">ERROR</span>
          <span className="text-[#2563EB] rotate-[1deg]">_____.</span>
          <span className="underline decoration-8 underline-offset-8 rotate-[-1deg]">XYZ</span>
        </h1>
        <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
          <Badge className="bg-black text-white px-4 py-2 text-md rounded-none nb-border hover:bg-black rotate-2">Digital Ghost</Badge>
          <Badge className="bg-[#2563EB] text-white px-4 py-2 text-md rounded-none nb-border hover:bg-[#2563EB] -rotate-1">Static Enthusiast</Badge>
        </div>
        <p className="mt-6 font-code text-lg max-w-xl opacity-80 italic relative">
          <span className="absolute -left-4 top-0 text-4xl text-black/10 font-black">"</span>
          The static echoes louder when you're not around. Welcome to my error page.
          <span className="absolute -right-4 bottom-0 text-4xl text-black/10 font-black">"</span>
        </p>
      </div>
    </header>
  )
}
