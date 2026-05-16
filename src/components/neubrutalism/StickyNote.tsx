
"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { X, GripVertical } from 'lucide-react'

interface StickyNoteProps {
  id: string
  content: string
  color: 'yellow' | 'blue' | 'red' | 'white'
  onDelete?: (id: string) => void
  className?: string
  style?: React.CSSProperties
}

const colorMap = {
  yellow: 'bg-[#FFFF00]',
  blue: 'bg-[#2563EB] text-white',
  red: 'bg-[#EF4444] text-white',
  white: 'bg-white',
}

export const StickyNote = ({ id, content, color, onDelete, className, style }: StickyNoteProps) => {
  return (
    <div
      className={cn(
        "relative p-4 w-64 min-h-32 nb-border nb-shadow flex flex-col group transition-transform",
        colorMap[color],
        className
      )}
      style={style}
    >
      <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-current">
        <GripVertical className="h-4 w-4 opacity-30 cursor-grab active:cursor-grabbing" />
        <button 
          onClick={() => onDelete?.(id)}
          className="hover:scale-110 transition-transform p-1 hover:bg-black/10 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="font-body text-sm font-medium leading-tight">
        {content}
      </div>
      <div className="mt-auto pt-2 text-[10px] opacity-50 flex justify-end font-code uppercase">
        id: {id.slice(0, 4)}
      </div>
      {/* Decorative "Tape" element */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/10 nb-border-thin -rotate-2 pointer-events-none" />
    </div>
  )
}
