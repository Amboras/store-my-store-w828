'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductGrid from '@/components/product/product-grid'

interface CollectionSectionProps {
  collection: any
  alternate?: boolean
}

export default function CollectionSection({ collection, alternate }: CollectionSectionProps) {
  const description = collection.metadata?.description
  const hasDescription = typeof description === 'string' && description

  return (
    <section className={`py-section border-t border-border/40 ${alternate ? 'bg-muted/15' : ''}`}>
      <div className="container-custom">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <div>
            <p className="label-xs text-foreground/35 mb-3">Collection</p>
            <h2 className="font-heading text-[2rem] font-normal tracking-[-0.02em] leading-tight">
              {collection.title}
            </h2>
            {hasDescription && (
              <p className="text-[0.875rem] text-muted-foreground mt-3 max-w-[48ch] leading-[1.8]">
                {description}
              </p>
            )}
          </div>
          <Link
            href={`/collections/${collection.handle}`}
            className="inline-flex items-center gap-2 label-xs text-foreground link-underline pb-px whitespace-nowrap shrink-0"
            prefetch={true}
          >
            View All
            <ArrowRight className="h-2.5 w-2.5" strokeWidth={1.5} />
          </Link>
        </div>

        <ProductGrid collectionId={collection.id} limit={4} />

      </div>
    </section>
  )
}
