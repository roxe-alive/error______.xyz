
"use client"

import React from 'react'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Badge } from '@/components/ui/badge'

export const ProfileHeader = () => {
  const catImage = PlaceHolderImages.find(img => img.id === 'sad-cat-dp')

  return (
    <header className="flex flex-col md:flex-row items-center gap-10 mb-20 relative">
      <div className="relative rotate-[-5deg]">
        <div className="nb-border nb-shadow-lg p-1 bg-black">
          <div className="bg-white p-1">
             {catImage?.imageUrl ? (
               <Image 
                  src={catImage.imageUrl}
                  alt="Sad Cat"
                  width={200}
                  height={200}
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                  data-ai-hint="sad cat"
               />
             ) : (
               <div className="w-[200px] h-[200px] bg-muted flex items-center justify-center font-code text-xs text-center p-4">
                 IMAGE_NOT_FOUND.ERR
               </div>
             )}
          </div>
        </div>
        
        {/* Decorative Tape Sticker */}
        <div className="absolute -top-4 -left-4 bg-[#FFFF00] text-black nb-border px-3 py-1 font-headline font-bold uppercase text-[10px] rotate-[-15deg] nb-shadow z-20">
          SYSTEM_ADMIN
        </div>

        <div className="absolute -bottom-4 -right-4 bg-[#EF4444] text-white nb-border px-3 py-1 font-headline font-bold uppercase text-sm -rotate-6 nb-shadow z-20">
          Offline
        </div>
      </div>
      
      <div className="flex-1 text-center md:text-left relative">
        <div className="absolute -top-10 -right-4 opacity-10 pointer-events-none hidden lg:block">
          <span className="font-black text-9xl tracking-tighter">VOICE</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black mb-4 flex flex-wrap items-center justify-center md:justify-start gap-x-4">
          <span className="bg-[#FFFF00] px-4 py-1 nb-border nb-shadow rotate-[-3deg]">ERROR</span>
          <span className="text-[#2563EB] rotate-[2deg]">_____.</span>
          <span className="underline decoration-[12px] underline-offset-[16px] rotate-[-2deg]">XYZ</span>
        </h1>

        <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
          <Badge className="bg-black text-white px-5 py-2 text-md rounded-none nb-border hover:bg-black rotate-3 nb-shadow">Digital Ghost</Badge>
          <Badge className="bg-[#2563EB] text-white px-5 py-2 text-md rounded-none nb-border hover:bg-[#2563EB] -rotate-2 nb-shadow">Static Enthusiast</Badge>
        </div>

        <p className="mt-8 font-code text-xl max-w-2xl opacity-80 italic relative leading-relaxed">
          <span className="absolute -left-6 -top-2 text-6xl text-black/10 font-black">"</span>
          The static echoes louder when you're not around. Welcome to my error page. There is no one here but the noise.
          <span className="absolute -right-6 bottom-0 text-6xl text-black/10 font-black">"</span>
        </p>
      </div>
    </header>
  )
}
