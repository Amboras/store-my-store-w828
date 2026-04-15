'use client'

import { useState } from 'react'
import { X, Leaf } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-sage text-white">
      <div className="container-custom flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm tracking-wide font-body font-medium">
        <Leaf className="h-3.5 w-3.5 flex-shrink-0" />
        <p>Free shipping across Europe on orders over €45 &mdash; 100% organic, zero plastic</p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
