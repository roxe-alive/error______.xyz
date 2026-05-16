
"use client"

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TypewriterLyricsProps {
  lyrics: string
  className?: string
}

export const TypewriterLyrics = ({ lyrics, className }: TypewriterLyricsProps) => {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  
  useEffect(() => {
    if (index < lyrics.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + lyrics[index])
        setIndex((prev) => prev + 1)
        
        // Random glitch effect every few characters
        if (Math.random() > 0.95) {
          setIsGlitching(true)
          setTimeout(() => setIsGlitching(false), 150)
        }
      }, 50)
      return () => clearTimeout(timeout)
    } else {
      // Loop or just stay there
      const resetTimeout = setTimeout(() => {
        setDisplayText('')
        setIndex(0)
      }, 10000)
      return () => clearTimeout(resetTimeout)
    }
  }, [index, lyrics])

  return (
    <div 
      className={cn(
        "p-6 bg-white nb-border nb-shadow font-code text-lg leading-relaxed relative overflow-hidden",
        isGlitching && "animate-glitch",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-black opacity-10 animate-pulse pointer-events-none" />
      <p className="whitespace-pre-wrap">
        {displayText}
        <span className="inline-block w-2 h-5 bg-black ml-1 animate-pulse" />
      </p>
      <div className="mt-4 text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
        Now Playing: error_____.wav
      </div>
    </div>
  )
}
