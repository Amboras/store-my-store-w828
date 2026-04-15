'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { HERO_PLACEHOLDER, LIFESTYLE_PLACEHOLDER } from '@/lib/utils/placeholder-images'

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <>
      {/* ─────────────────── HERO ──────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div className="grid lg:grid-cols-2 min-h-[92vh]">

          {/* Left — full-bleed image */}
          <div className="relative order-2 lg:order-1 min-h-[60vw] lg:min-h-0 animate-scale-in">
            <Image
              src={HERO_PLACEHOLDER}
              alt="Amboras botanical soap — handcrafted in small batches"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/[0.04] to-transparent" />
          </div>

          {/* Right — editorial copy */}
          <div className="order-1 lg:order-2 flex items-end lg:items-center px-8 sm:px-14 lg:px-20 xl:px-28 pt-20 pb-14 lg:py-0">
            <div className="max-w-[380px] animate-fade-in-up">

              <p className="label-xs mb-8 text-foreground/40">
                Handcrafted · Cold-Pressed · European Botanicals
              </p>

              <h1 className="font-heading font-normal leading-[1.04] tracking-[-0.03em] text-balance mb-8"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
                Soap as it<br />
                was meant<br />
                to be.
              </h1>

              <p className="text-[0.9375rem] leading-[1.85] text-muted-foreground mb-11 max-w-[28ch]">
                Pure botanicals. Cold-pressed oils. Formulated for skin that deserves nothing less.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2.5 bg-foreground text-background px-9 py-4 text-[9.5px] tracking-[0.2em] uppercase font-medium hover:opacity-75 transition-opacity duration-400"
                  prefetch={true}
                >
                  Explore the Range
                  <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-9 py-4 text-[9.5px] tracking-[0.2em] uppercase font-medium border border-foreground/20 hover:border-foreground/60 transition-colors duration-400"
                  prefetch={true}
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────── ATTRIBUTES STRIP ──────────────────── */}
      <section className="border-y border-border/50 bg-muted/25">
        <div className="container-custom py-5">
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2.5 text-center">
            {[
              'Cold-Pressed Oils',
              'Zero Palm Oil',
              'Plastic-Free Packaging',
              'Vegan & Cruelty-Free',
              'pH Balanced',
            ].map((attr) => (
              <li key={attr} className="label-xs">{attr}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ──────────────── COLLECTIONS ───────────────────────── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom space-y-20">
            {[1, 2].map((i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-16 items-center animate-pulse">
                <div className="aspect-[4/5] bg-muted" />
                <div className="space-y-5">
                  <div className="h-2 w-16 bg-muted rounded" />
                  <div className="h-9 w-60 bg-muted rounded" />
                  <div className="h-3 w-40 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((col: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, idx: number) => (
            <CollectionSection key={col.id} collection={col} alternate={idx % 2 === 1} />
          ))}
        </>
      ) : null}

      {/* ──────────────── PHILOSOPHY ────────────────────────── */}
      <section className="py-section border-t border-border/40 bg-muted/15">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">

            <div className="space-y-7 lg:max-w-[360px]">
              <p className="label-xs text-foreground/40">The Amboras Way</p>
              <div className="divider-fine" />
              <h2 className="font-heading text-[2rem] font-normal leading-[1.2] tracking-[-0.02em] text-balance">
                Made with restraint.<br />
                Used with intention.
              </h2>
              <p className="text-[0.9rem] text-muted-foreground leading-[1.9]">
                We source every botanical directly — lavender from Provence, rose petals
                from Bulgaria, shea from Ghana. Each bar is cured for a minimum of
                six weeks before it reaches your hands.
              </p>
              <p className="text-[0.9rem] text-muted-foreground leading-[1.9]">
                No fillers. No shortcuts. Just soap that is honest about what it is.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 label-xs text-foreground link-underline pb-px"
                prefetch={true}
              >
                Read Our Philosophy
                <ArrowRight className="h-2.5 w-2.5" strokeWidth={1.5} />
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden animate-fade-in">
              <Image
                src={LIFESTYLE_PLACEHOLDER}
                alt="Amboras — crafted with intention"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────── INGREDIENTS ───────────────────────── */}
      <section className="py-section border-t border-border/40">
        <div className="container-custom">

          <div className="text-center mb-16">
            <p className="label-xs text-foreground/40 mb-3">Every Ingredient, Justified</p>
            <h2 className="font-heading text-[2rem] font-normal tracking-[-0.015em]">
              Nothing unnecessary
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
            {[
              { name: 'Lavender',    origin: 'Provence, France',   benefit: 'Calms irritation and promotes restful, restorative sleep.' },
              { name: 'Shea Butter', origin: 'Ghana',              benefit: 'Deeply moisturises without congesting pores.' },
              { name: 'Oat Extract', origin: 'Certified Organic',  benefit: 'Soothes sensitive and reactive skin types.' },
              { name: 'Rose Petal',  origin: 'Bulgaria',           benefit: 'Natural astringent that gently refines texture.' },
            ].map((ing) => (
              <div key={ing.name} className="bg-background px-9 py-11 space-y-4 group hover:bg-muted/30 transition-colors duration-500">
                <p className="font-heading text-[1.25rem] font-normal">{ing.name}</p>
                <p className="label-xs text-foreground/35">{ing.origin}</p>
                <div className="h-px bg-border/60 w-6" />
                <p className="text-[0.8125rem] text-muted-foreground leading-[1.8]">{ing.benefit}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ──────────────── NEWSLETTER ────────────────────────── */}
      <section className="py-section bg-foreground text-background border-t border-border/20">
        <div className="container-custom max-w-narrow mx-auto text-center">

          <p className="label-xs text-background/35 mb-5">Stay Informed</p>
          <h2 className="font-heading text-[2.25rem] font-normal text-background mb-4 tracking-[-0.02em]">
            The Amboras Letter
          </h2>
          <p className="text-[0.8125rem] text-background/50 leading-[1.85] mb-12 max-w-[28ch] mx-auto">
            Seasonal formulations, ingredient stories, and early access to new collections.
          </p>

          {submitted ? (
            <p className="label-xs text-background/50 tracking-[0.22em]">
              Thank you — we&apos;ll be in touch.
            </p>
          ) : (
            <form className="flex flex-col sm:flex-row gap-0 max-w-[400px] mx-auto" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent border-b border-background/20 py-3 px-1 text-[0.8125rem] text-background placeholder:text-background/30 focus:border-background/60 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="sm:ml-6 mt-5 sm:mt-0 label-xs text-background border border-background/25 px-8 py-3 hover:bg-background hover:text-foreground transition-all duration-400 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

        </div>
      </section>
    </>
  )
}
