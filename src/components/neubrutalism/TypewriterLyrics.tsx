
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
  const scrollRef = useRef<HTMLDivElement>(null)
  
  // Auto-scroll to bottom as text is typed to maintain terminal feel
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [displayText])

  useEffect(() => {
    if (index < lyrics.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + lyrics[index])
        setIndex((prev) => prev + 1)
        
        // Random visual glitch
        if (Math.random() > 0.98) {
          setIsGlitching(true)
          setTimeout(() => setIsGlitching(false), 100)
        }
      }, 40)
      return () => clearTimeout(timeout)
    } else {
      // Pause at the end before looping
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
        "bg-black nb-border nb-shadow-lg font-code relative overflow-hidden flex flex-col h-[450px] transition-all duration-300",
        isGlitching && "animate-glitch",
        className
      )}
    >
      {/* Window Header */}
      <div className="bg-white border-b-4 border-black p-2 flex items-center justify-between shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444] nb-border-thin" />
          <div className="w-3 h-3 rounded-full bg-[#FFFF00] nb-border-thin" />
          <div className="w-3 h-3 rounded-full bg-[#2563EB] nb-border-thin" />
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-black font-headline">
          TERMINAL_VOID: session_01
        </div>
        <div className="flex gap-1 opacity-20">
          <div className="w-4 h-1 bg-black" />
          <div className="w-4 h-1 bg-black" />
        </div>
      </div>

      {/* Terminal Content - Fixed height with scroll */}
      <div 
        ref={scrollRef}
        className="p-6 text-[#00FF00] text-lg leading-relaxed flex-1 font-mono overflow-y-auto custom-scrollbar scroll-smooth"
      >
        <div className="flex gap-2 items-start mb-4">
          <span className="text-white shrink-0">$</span>
          <span className="text-white italic opacity-70">cat echoes.log</span>
        </div>
        <div className="flex gap-2 items-start">
          <span className="text-[#00FF00] shrink-0 opacity-50">{">"}</span>
          <p className="whitespace-pre-wrap break-all">
            {displayText}
            <span className="inline-block w-2.5 h-6 bg-[#00FF00] ml-1 animate-pulse align-middle" />
          </p>
        </div>
      </div>

      {/* Window Footer */}
      <div className="bg-black/90 p-2 px-4 border-t-2 border-[#00FF00]/20 flex items-center justify-between shrink-0">
        <div className="text-[10px] text-[#00FF00]/60 uppercase tracking-tighter">
          Bytes: {index} / {lyrics.length}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-full animate-pulse" />
          <span className="text-[10px] text-[#00FF00]/60 uppercase font-bold tracking-widest">Live Stream</span>
        </div>
      </div>
      
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
           style={{ background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 4px' }} />
    </div>
  )
}
