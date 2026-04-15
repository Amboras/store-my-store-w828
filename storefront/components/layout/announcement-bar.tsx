'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-foreground text-background">
      <div className="container-custom flex items-center justify-center gap-3 py-3">
        <p className="text-[10px] tracking-[0.2em] uppercase font-body">
          Complimentary shipping across Europe on orders over €45
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-6 text-background/60 hover:text-background transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
