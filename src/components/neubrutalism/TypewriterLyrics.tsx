
"use client"

import React, { useState, useEffect } from 'react'
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
        
        if (Math.random() > 0.98) {
          setIsGlitching(true)
          setTimeout(() => setIsGlitching(false), 100)
        }
      }, 40)
      return () => clearTimeout(timeout)
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayText('')
        setIndex(0)
      }, 15000)
      return () => clearTimeout(resetTimeout)
    }
  }, [index, lyrics])

  return (
    <div 
      className={cn(
        "bg-black nb-border nb-shadow-lg font-code relative overflow-hidden flex flex-col min-h-[300px]",
        isGlitching && "animate-glitch",
        className
      )}
    >
      <div className="bg-white border-b-4 border-black p-2 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444] nb-border-thin" />
          <div className="w-3 h-3 rounded-full bg-[#FFFF00] nb-border-thin" />
          <div className="w-3 h-3 rounded-full bg-[#2563EB] nb-border-thin" />
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-black">
          root@error-void:~
        </div>
        <div className="flex gap-1">
          <div className="w-4 h-1 bg-black/20" />
          <div className="w-4 h-1 bg-black/20" />
        </div>
      </div>

      <div className="p-6 text-[#00FF00] text-lg leading-relaxed flex-1 font-mono">
        <div className="flex gap-2 items-start">
          <span className="text-white shrink-0">$</span>
          <p className="whitespace-pre-wrap">
            {displayText}
            <span className="inline-block w-2.5 h-6 bg-[#00FF00] ml-1 animate-pulse align-middle" />
          </p>
        </div>
      </div>

      <div className="bg-black/80 p-2 px-4 border-t-2 border-[#00FF00]/20 flex items-center justify-between">
        <div className="text-[10px] text-[#00FF00]/60 uppercase tracking-tighter">
          Bytes: {index} / {lyrics.length}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-full animate-ping" />
          <span className="text-[10px] text-[#00FF00]/60 uppercase font-bold">Encrypted Stream</span>
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ background: 'linear-gradient(transparent 50%, rgba(255,255,255,0.5) 50%)', backgroundSize: '100% 4px' }} />
    </div>
  )
}
