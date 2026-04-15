'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  if (!isVisible) return null

  return (
    <div className="relative bg-foreground text-background py-2.5">
      <div className="container-custom flex items-center justify-center">
        <p className="text-[9px] tracking-[0.26em] uppercase font-body text-background/80">
          Complimentary shipping across Europe on orders over&nbsp;€45
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-background/40 hover:text-background/80 transition-colors duration-300"
        aria-label="Dismiss"
      >
        <X className="h-2.5 w-2.5" strokeWidth={1.5} />
      </button>
    </div>
  )
}
