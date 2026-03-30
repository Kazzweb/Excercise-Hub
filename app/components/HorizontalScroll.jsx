'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HorizontalScroll({ children, className = '' }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative group/scroll">
      {/* Left fade + arrow */}
      <div className="hidden md:flex absolute left-0 top-0 bottom-0 items-center z-10">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
        <button
          onClick={() => scroll('left')}
          className="relative z-20 w-8 h-8 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-lg opacity-0 group-hover/scroll:opacity-100 -translate-x-4 group-hover/scroll:translate-x-0 duration-200"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className={`flex gap-4 overflow-x-auto no-scrollbar scroll-smooth ${className}`}
      >
        {children}
      </div>

      {/* Right fade + arrow */}
      <div className="hidden md:flex absolute right-0 top-0 bottom-0 items-center z-10">
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />
        <button
          onClick={() => scroll('right')}
          className="relative z-20 w-8 h-8 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-lg opacity-0 group-hover/scroll:opacity-100 translate-x-4 group-hover/scroll:translate-x-0 duration-200"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
