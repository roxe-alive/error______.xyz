
"use client"

import React, { useState, useEffect } from 'react'
import { ProfileHeader } from '@/components/neubrutalism/ProfileHeader'
import { TypewriterLyrics } from '@/components/neubrutalism/TypewriterLyrics'
import { StickyNote } from '@/components/neubrutalism/StickyNote'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Share2, Terminal, Activity } from 'lucide-react'

const LYRICS = "And, oh, it's hard to see you, but I wish you were right here\nOh, it's hard to leave you when I get you everywhere\nAll this time I'm thinking we could never be a pair\nOh, no, I don't need you, but I miss you, come here\nAnd, oh, it's hard to see you, but I wish you were right here\nOh, it's hard to leave you when I get you everywhere\nAll this time, I'm thinking I'm strong enough to sink it\nOh, no, I don't need you, but I miss you, come here\nHe love me not, he loves me\nHe holds me tight then lets me go\nHe love me not, he loves me\nHe holds me tight then lets me go"

interface Note {
  id: string
  content: string
  color: 'yellow' | 'blue' | 'red' | 'white'
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNoteText, setNewNoteText] = useState('')

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
        { id: '1', content: 'Don\'t forget to feed the void.', color: 'yellow' },
        { id: '2', content: 'Everything is fine... mostly.', color: 'blue' },
        { id: '3', content: 'Listen to the static.', color: 'red' },
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
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      content: newNoteText,
      color: randomColor
    }
    setNotes([newNote, ...notes])
    setNewNoteText('')
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 lg:p-12 selection:bg-black selection:text-[#FFFF00]">
      <div className="max-w-7xl mx-auto">
        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="h-8 w-8 text-black" />
                <h2 className="text-3xl font-headline font-black underline decoration-4">System_Terminal</h2>
              </div>
              <TypewriterLyrics lyrics={LYRICS} />
            </section>

            <section className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Share2 className="h-8 w-8 text-black" />
                  <h2 className="text-3xl font-headline font-black underline decoration-4">Thought Surface</h2>
                </div>
              </div>

              <div className="bg-[#f0f0f0] nb-border nb-shadow p-6 min-h-[400px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(black 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                
                <form onSubmit={addNote} className="mb-8 flex gap-2 relative z-10">
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

                <div className="flex flex-wrap gap-6 relative z-10">
                  {notes.map((note) => (
                    <StickyNote 
                      key={note.id}
                      id={note.id}
                      content={note.content}
                      color={note.color}
                      onDelete={deleteNote}
                    />
                  ))}
                  {notes.length === 0 && (
                    <div className="w-full text-center py-20 font-code text-muted-foreground">
                      The surface is empty. Say something?
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-8">
            <div className="nb-border nb-shadow p-6 bg-[#FFFF00]">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-6 w-6" />
                <h3 className="text-xl font-headline font-bold uppercase">System Info</h3>
              </div>
              <ul className="space-y-2 font-code text-sm">
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

            <div className="nb-border nb-shadow p-6 bg-white">
              <h3 className="text-xl font-headline font-bold uppercase mb-4">Navigation</h3>
              <nav className="flex flex-col gap-3">
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

            <div className="nb-border nb-shadow p-6 bg-black text-white font-code text-xs leading-relaxed">
              <p>
                STATIC ECHOES v1.0.4<br/>
                DEVELOPED BY ERROR_____.<br/>
                RECOVERY KEY: [REDACTED]<br/>
                ALL RIGHTS RESERVED TO THE VOID.
              </p>
            </div>
          </aside>
        </div>

        <footer className="mt-20 py-8 border-t-4 border-black text-center font-code uppercase tracking-tighter text-sm">
          © {new Date().getFullYear()} error_____.xyz — No cookies, just tears.
        </footer>
      </div>
    </div>
  )
}
