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
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    setSubmitted(true)
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div className="grid lg:grid-cols-[1fr_1fr] min-h-[88vh]">

          {/* Left — image, full bleed */}
          <div className="relative order-2 lg:order-1 min-h-[55vw] lg:min-h-0">
            <Image
              src={HERO_PLACEHOLDER}
              alt="Amboras botanical soap — handcrafted"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-foreground/5" />
          </div>

          {/* Right — editorial text */}
          <div className="order-1 lg:order-2 flex items-end lg:items-center px-8 sm:px-14 lg:px-20 pt-20 pb-14 lg:py-0">
            <div className="max-w-md animate-fade-in-up">
              <p className="label-xs mb-6 text-muted-foreground">
                Handcrafted in Small Batches
              </p>
              <h1 className="font-heading text-display font-normal leading-[1.06] tracking-[-0.025em] text-balance mb-8">
                Soap as it<br />
                was meant<br />
                to be.
              </h1>
              <p className="text-body-lg text-muted-foreground leading-relaxed mb-10 max-w-xs">
                Pure botanicals. Cold-pressed oils. Formulated for skin that deserves nothing less.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-3.5 text-[11px] tracking-[0.14em] uppercase font-medium hover:opacity-80 transition-opacity"
                  prefetch={true}
                >
                  Explore the Range
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 border border-foreground/30 px-8 py-3.5 text-[11px] tracking-[0.14em] uppercase font-medium hover:border-foreground transition-colors"
                  prefetch={true}
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── INGREDIENT CALLOUT BAR ────────────────────────── */}
      <section className="border-y border-border/60 bg-muted/30">
        <div className="container-custom py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-center">
            {[
              'Cold-Pressed Oils',
              'Zero Palm Oil',
              'Plastic-Free Packaging',
              'Vegan & Cruelty-Free',
              'pH Balanced',
            ].map((attr) => (
              <span key={attr} className="label-xs text-muted-foreground">{attr}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS / PRODUCTS ────────────────────────── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom space-y-16">
            {[1, 2].map((i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-12 items-center animate-pulse">
                <div className="aspect-[4/5] bg-muted rounded-none" />
                <div className="space-y-4">
                  <div className="h-2 w-20 bg-muted rounded" />
                  <div className="h-10 w-64 bg-muted rounded" />
                  <div className="h-4 w-48 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ── EDITORIAL / PHILOSOPHY ────────────────────────── */}
      <section className="py-section bg-muted/20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

            <div className="space-y-7 lg:max-w-sm">
              <p className="label-xs text-muted-foreground">The Amboras Way</p>
              <div className="divider-fine" />
              <h2 className="font-heading text-h1 font-normal leading-[1.15] tracking-[-0.02em]">
                Made with restraint.<br />Used with intention.
              </h2>
              <p className="text-body text-muted-foreground leading-[1.8]">
                We source every botanical directly — lavender from Provence, rose petals
                from Bulgaria, shea from Ghana. Each bar is cured for a minimum of
                six weeks before it reaches your hands.
              </p>
              <p className="text-body text-muted-foreground leading-[1.8]">
                No fillers. No shortcuts. Just soap that is honest about what it is.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 label-xs text-foreground link-underline pb-0.5"
                prefetch={true}
              >
                Read Our Philosophy
                <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden">
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

      {/* ── INGREDIENTS FEATURE ───────────────────────────── */}
      <section className="py-section border-t border-border/40">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="label-xs text-muted-foreground mb-3">Every Ingredient, Justified</p>
            <h2 className="font-heading text-h2 font-normal">Nothing unnecessary</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
            {[
              {
                name: 'Lavender',
                origin: 'Provence, France',
                benefit: 'Calms irritation and promotes restful sleep.',
              },
              {
                name: 'Shea Butter',
                origin: 'Ghana',
                benefit: 'Deeply moisturises without clogging pores.',
              },
              {
                name: 'Oat Extract',
                origin: 'Certified Organic',
                benefit: 'Soothes sensitive and reactive skin.',
              },
              {
                name: 'Rose Petal',
                origin: 'Bulgaria',
                benefit: 'Natural astringent that refines texture.',
              },
            ].map((ing) => (
              <div key={ing.name} className="bg-background p-8 lg:p-10 space-y-3">
                <p className="font-heading text-h4 font-normal">{ing.name}</p>
                <p className="label-xs text-muted-foreground">{ing.origin}</p>
                <div className="divider-fine" />
                <p className="text-caption text-muted-foreground leading-relaxed">{ing.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────── */}
      <section className="py-section bg-foreground text-background">
        <div className="container-custom max-w-narrow mx-auto text-center">
          <p className="label-xs text-background/50 mb-4">Stay Informed</p>
          <h2 className="font-heading text-h2 font-normal text-background mb-4">
            The Amboras Letter
          </h2>
          <p className="text-caption text-background/60 leading-relaxed mb-10 max-w-xs mx-auto">
            Seasonal formulations, ingredient stories, and early access to new collections.
          </p>
          {submitted ? (
            <p className="label-xs text-background/70 tracking-widest">
              Thank you — we&apos;ll be in touch.
            </p>
          ) : (
            <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent border-b border-background/30 pb-2.5 text-caption text-background placeholder:text-background/40 focus:border-background focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="label-xs text-background border border-background/40 px-6 py-2.5 hover:bg-background hover:text-foreground transition-colors whitespace-nowrap"
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
