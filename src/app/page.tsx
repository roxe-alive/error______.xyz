
"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ProfileHeader } from '@/components/neubrutalism/ProfileHeader'
import { TypewriterLyrics } from '@/components/neubrutalism/TypewriterLyrics'
import { StickyNote } from '@/components/neubrutalism/StickyNote'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Share2, Terminal, Activity, Music, Disc, Mic2, CassetteTape, Radio, Volume2, Waves, Speaker } from 'lucide-react'
import { PlaceHolderImages } from '@/lib/placeholder-images'

const LYRICS = "And, oh, it's hard to see you, but I wish you were right here\nOh, it's hard to leave you when I get you everywhere\nAll this time I'm thinking we could never be a pair\nOh, no, I don't need you, but I miss you, come here\nAnd, oh, it's hard to see you, but I wish you were right here\nOh, it's hard to leave you when I get you everywhere\nAll this time, I'm thinking I'm strong enough to sink it\nOh, no, I don't need you, but I miss you, come here\nHe love me not, he loves me\nHe holds me tight then lets me go\nHe love me not, he loves me\nHe holds me tight then lets me go"

interface Note {
  id: string
  content: string
  color: 'yellow' | 'blue' | 'red' | 'white'
  rotation: number
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNoteText, setNewNoteText] = useState('')

  const album1 = PlaceHolderImages.find(img => img.id === 'album-art-1')
  const album2 = PlaceHolderImages.find(img => img.id === 'album-art-2')

  useEffect(() => {
    const saved = localStorage.getItem('static_echoes_notes')
    if (saved) {
      try {
        setNotes(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load notes", e)
      }
    } else {
      setNotes([
        { id: '1', content: 'Don\'t forget to feed the void.', color: 'yellow', rotation: -2 },
        { id: '2', content: 'Everything is fine... mostly.', color: 'blue', rotation: 3 },
        { id: '3', content: 'Listen to the static.', color: 'red', rotation: -1 },
      ])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('static_echoes_notes', JSON.stringify(notes))
  }, [notes])

  const addNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNoteText.trim()) return
    const colors: Note['color'][] = ['yellow', 'blue', 'red', 'white']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomRotation = Math.floor(Math.random() * 10) - 5 // -5 to 5 degrees
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      content: newNoteText,
      color: randomColor,
      rotation: randomRotation
    }
    setNotes([newNote, ...notes])
    setNewNoteText('')
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8 lg:p-12 selection:bg-black selection:text-[#FFFF00] relative overflow-x-hidden">
      {/* Background Decorations - The "Messy" Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 overflow-hidden">
        <Disc className="absolute top-[10%] left-[5%] w-32 h-32 rotate-12" />
        <Music className="absolute top-[40%] right-[10%] w-24 h-24 -rotate-12" />
        <Mic2 className="absolute bottom-[15%] left-[15%] w-20 h-20 rotate-45" />
        <CassetteTape className="absolute top-[60%] left-[2%] w-40 h-40 -rotate-6" />
        <Radio className="absolute bottom-[5%] right-[5%] w-36 h-36 rotate-12" />
        <Volume2 className="absolute top-[20%] right-[30%] w-16 h-16 -rotate-45" />
        <Waves className="absolute top-[10%] right-[10%] w-48 h-48 rotate-90" />
        <Speaker className="absolute bottom-[30%] left-[40%] w-24 h-24 -rotate-12" />
        
        {/* Floating Text Scraps */}
        <div className="absolute top-[15%] left-[20%] font-code text-[10px] rotate-[-20deg]">REC_LEVEL_04</div>
        <div className="absolute bottom-[20%] right-[20%] font-code text-[10px] rotate-[15deg]">BUFFER_OVERFLOW</div>
        <div className="absolute top-[70%] right-[5%] font-code text-[10px] -rotate-12">LOFI_SOUL.wav</div>
      </div>

      {/* Floating Art 1 */}
      <div className="fixed -left-10 top-1/4 -rotate-12 opacity-20 pointer-events-none z-0 hidden xl:block">
        <div className="relative">
          <div className="nb-border bg-black w-64 h-64 absolute top-4 left-4" />
          {album1 && (
            <div className="nb-border bg-white p-2 w-64 h-64 relative">
              <Image 
                src={album1.imageUrl} 
                alt="Art 1" 
                fill 
                className="object-cover grayscale"
              />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-16">
            <section className="relative rotate-[-0.5deg]">
              {/* Sticker overlay */}
              <div className="absolute -top-8 -left-8 bg-[#2563EB] text-white nb-border px-4 py-1 font-headline font-bold uppercase text-xs z-30 rotate-[-8deg] nb-shadow">
                Channel_01: Output
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="h-8 w-8 text-black" />
                <h2 className="text-3xl font-headline font-black underline decoration-4">System_Terminal</h2>
              </div>
              <div className="relative">
                 {/* Decorative Tape */}
                <div className="absolute -top-4 left-1/4 w-32 h-8 bg-black/10 nb-border-thin rotate-[-3deg] z-20 pointer-events-none" />
                <TypewriterLyrics lyrics={LYRICS} />
              </div>
            </section>

            <section className="relative rotate-[0.5deg]">
              {/* Another sticker */}
              <div className="absolute -top-6 -right-6 bg-[#FFFF00] text-black nb-border px-4 py-1 font-headline font-bold uppercase text-xs z-30 rotate-[12deg] nb-shadow">
                FRAGILE_IDEAS
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Share2 className="h-8 w-8 text-black" />
                  <h2 className="text-3xl font-headline font-black underline decoration-4">Thought Surface</h2>
                </div>
              </div>

              <div className="bg-white nb-border nb-shadow p-6 min-h-[500px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(black 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                
                <form onSubmit={addNote} className="mb-12 flex gap-2 relative z-10">
                  <Input 
                    placeholder="Capture a fleeting thought..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="nb-border bg-white rounded-none font-body h-12 text-lg focus-visible:ring-0 focus-visible:nb-shadow"
                  />
                  <Button type="submit" className="nb-border nb-shadow h-12 bg-black text-white rounded-none px-6 hover:nb-shadow-active transition-transform">
                    <Plus className="h-6 w-6" />
                  </Button>
                </form>

                <div className="flex flex-wrap gap-12 justify-center lg:justify-start relative z-10 p-4">
                  {notes.map((note) => (
                    <StickyNote 
                      key={note.id}
                      id={note.id}
                      content={note.content}
                      color={note.color}
                      onDelete={deleteNote}
                      className="transition-all hover:scale-110 hover:z-50"
                      style={{ transform: `rotate(${note.rotation}deg)` }}
                    />
                  ))}
                  {notes.length === 0 && (
                    <div className="w-full text-center py-20 font-code text-muted-foreground italic">
                      // surface_empty: waiting for input...
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-12 lg:sticky lg:top-8">
            <div className="nb-border nb-shadow p-6 bg-[#FFFF00] rotate-[2deg] relative">
               {/* Decorative Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 nb-border-thin rotate-[-1deg] z-10 pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-6 w-6" />
                <h3 className="text-xl font-headline font-bold uppercase">System Info</h3>
              </div>
              <ul className="space-y-3 font-code text-sm">
                <li className="flex justify-between border-b-2 border-black/10 pb-1">
                  <span>Status:</span>
                  <span className="font-bold">DEGRADED</span>
                </li>
                <li className="flex justify-between border-b-2 border-black/10 pb-1">
                  <span>Uptime:</span>
                  <span className="font-bold">1337 days</span>
                </li>
                <li className="flex justify-between border-b-2 border-black/10 pb-1">
                  <span>Latency:</span>
                  <span className="font-bold">42ms</span>
                </li>
                <li className="flex justify-between">
                  <span>Mood:</span>
                  <span className="font-bold">Melancholic</span>
                </li>
              </ul>
            </div>

            <div className="nb-border nb-shadow p-6 bg-white -rotate-[3deg] relative">
              <div className="absolute -top-5 -right-5 bg-[#EF4444] text-white nb-border px-2 py-0.5 text-[10px] font-bold uppercase rotate-12 nb-shadow z-20">
                New!
              </div>
              <h3 className="text-xl font-headline font-bold uppercase mb-4">Navigation</h3>
              <nav className="flex flex-col gap-4">
                <button className="text-left py-2 px-4 nb-border nb-shadow hover:nb-shadow-active transition-all font-headline font-bold uppercase text-lg bg-[#2563EB] text-white">
                  Logs
                </button>
                <button className="text-left py-2 px-4 nb-border nb-shadow hover:nb-shadow-active transition-all font-headline font-bold uppercase text-lg bg-white">
                  Archive
                </button>
                <button className="text-left py-2 px-4 nb-border nb-shadow hover:nb-shadow-active transition-all font-headline font-bold uppercase text-lg bg-[#EF4444] text-white">
                  DANGER ZONE
                </button>
              </nav>
            </div>

            <div className="nb-border nb-shadow p-6 bg-black text-white font-code text-xs leading-relaxed rotate-[1.5deg]">
              <div className="flex items-center gap-2 mb-3 text-[#FFFF00]">
                <Music className="h-3 w-3" />
                <span className="uppercase font-bold tracking-tighter">Now Playing: Static_Noise.wav</span>
              </div>
              <div className="opacity-70 space-y-1">
                <p>STATIC ECHOES v1.0.4</p>
                <p>DEVELOPED BY ERROR_____.</p>
                <p>RECOVERY KEY: [REDACTED]</p>
                <p>ALL RIGHTS RESERVED TO THE VOID.</p>
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-24 py-12 border-t-4 border-black text-center font-code uppercase tracking-tighter text-sm relative">
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-1 nb-border rotate-[-1deg]">
            END_OF_TRANSMISSION
          </div>
          © {new Date().getFullYear()} error_____.xyz — No cookies, just tears.
        </footer>
      </div>
    </div>
  )
}
