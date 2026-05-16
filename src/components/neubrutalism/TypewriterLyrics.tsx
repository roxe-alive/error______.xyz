
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
        if (Math.random() > 0.985) {
          setIsGlitching(true)
          setTimeout(() => setIsGlitching(false), 120)
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
        isGlitching && "animate-glitch brightness-125",
        className
      )}
    >
      {/* Window Header */}
      <div className="bg-white border-b-4 border-black p-3 flex items-center justify-between shrink-0">
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] nb-border-thin" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#FFFF00] nb-border-thin" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#2563EB] nb-border-thin" />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-black font-headline">
          TERMINAL_VOID: session_01
        </div>
        <div className="flex gap-1.5 opacity-20">
          <div className="w-5 h-1.5 bg-black" />
          <div className="w-5 h-1.5 bg-black" />
        </div>
      </div>

      {/* Terminal Content - Fixed height with scroll */}
      <div 
        ref={scrollRef}
        className="p-8 text-[#00FF00] text-xl leading-relaxed flex-1 font-mono overflow-y-auto custom-scrollbar scroll-smooth relative"
      >
        <div className="flex gap-3 items-start mb-6">
          <span className="text-white shrink-0 font-bold">$</span>
          <span className="text-white italic opacity-60">cat echoes.log --mode=melancholic</span>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-[#00FF00] shrink-0 opacity-40">{">>"}</span>
          <p className="whitespace-pre-wrap break-all tracking-tight">
            {displayText}
            <span className="inline-block w-3 h-7 bg-[#00FF00] ml-1 animate-pulse align-middle" />
          </p>
        </div>

        {/* Floating background code scrap */}
        <div className="absolute bottom-4 right-4 text-[10px] opacity-10 pointer-events-none uppercase">
          ERROR_CODE: 0x882199
        </div>
      </div>

      {/* Window Footer */}
      <div className="bg-black/95 p-2 px-6 border-t-2 border-[#00FF00]/15 flex items-center justify-between shrink-0">
        <div className="text-[10px] text-[#00FF00]/50 uppercase tracking-tighter">
          Bytes: {index.toString().padStart(4, '0')} / {lyrics.length}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#EF4444] rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          <span className="text-[10px] text-[#00FF00]/70 uppercase font-black tracking-widest">Live_Feed</span>
        </div>
      </div>
      
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" 
           style={{ background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 4px' }} />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}
