'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

export default function YouTubeEmbed({ videoId, title }) {
  const [playing, setPlaying] = useState(false)

  if (!videoId) return null

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-zinc-900 aspect-video">
      {playing ? (
        <iframe
          src={embedUrl}
          title={title || 'Exercise demonstration'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full group"
          aria-label={`Play video: ${title || 'Exercise demonstration'}`}
        >
          <Image
            src={thumbnailUrl}
            alt={title || 'Exercise demonstration'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-200">
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </div>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
              <p className="text-white text-sm font-medium">{title}</p>
            </div>
          )}
        </button>
      )}
    </div>
  )
}
