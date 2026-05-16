
"use client"

import React from 'react'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Badge } from '@/components/ui/badge'

export const ProfileHeader = () => {
  const catImage = PlaceHolderImages.find(img => img.id === 'sad-cat-dp')

  return (
    <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
      <div className="relative">
        <div className="nb-border nb-shadow-lg p-1 bg-black">
          <div className="bg-white p-1">
             <Image 
                src={catImage?.imageUrl || ''}
                alt="Sad Cat"
                width={180}
                height={180}
                className="grayscale hover:grayscale-0 transition-all duration-500"
                data-ai-hint="sad cat"
             />
          </div>
        </div>
        <div className="absolute -bottom-4 -right-4 bg-[#EF4444] text-white nb-border px-3 py-1 font-headline font-bold uppercase text-sm -rotate-6">
          Offline
        </div>
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-6xl md:text-8xl font-black mb-2 flex flex-wrap items-center gap-x-4">
          <span className="bg-[#FFFF00] px-4 py-1 nb-border nb-shadow">ERROR</span>
          <span className="text-[#2563EB]">_____.</span>
          <span className="underline decoration-8 underline-offset-8">XYZ</span>
        </h1>
        <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
          <Badge className="bg-black text-white px-4 py-2 text-md rounded-none nb-border hover:bg-black">Digital Ghost</Badge>
          <Badge className="bg-[#2563EB] text-white px-4 py-2 text-md rounded-none nb-border hover:bg-[#2563EB]">Static Enthusiast</Badge>
          <Badge className="bg-white text-black px-4 py-2 text-md rounded-none nb-border hover:bg-white">Sad Cat Owner</Badge>
        </div>
        <p className="mt-6 font-code text-lg max-w-xl opacity-80 italic">
          "The static echoes louder when you're not around. Welcome to my error page."
        </p>
      </div>
    </header>
  )
}
