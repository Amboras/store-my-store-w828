import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600
import { medusaServerClient } from '@/lib/medusa-client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProductActions from '@/components/product/product-actions'
import ProductAccordion from '@/components/product/product-accordion'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import { getProductPlaceholder } from '@/lib/utils/placeholder-images'
import { type VariantExtension } from '@/components/product/product-price'

async function getProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) throw new Error('No region found')

    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getVariantExtensions(productId: string): Promise<Record<string, VariantExtension>> {
  try {
    const baseUrl        = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId        = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId)        headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key']  = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } },
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price:    v.compare_at_price,
        manage_inventory:    v.manage_inventory ?? false,
        inventory_quantity:  v.inventory_quantity,
      }
    }
    return map
  } catch {
    return {}
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.title,
    description: product.description || `Shop ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || `Shop ${product.title}`,
      ...(product.thumbnail ? { images: [{ url: product.thumbnail }] } : {}),
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) notFound()

  const variantExtensions = await getVariantExtensions(product.id)

  const allImages = [
    ...(product.thumbnail ? [{ url: product.thumbnail }] : []),
    ...(product.images || []).filter((img: any) => img.url !== product.thumbnail),
  ]
  const displayImages = allImages.length > 0
    ? allImages
    : [{ url: getProductPlaceholder(product.id) }]

  return (
    <>
      {/* ── ANALYTICS TRACKER ──────────────────────────────── */}
      <ProductViewTracker
        productId={product.id}
        productTitle={product.title}
        variantId={product.variants?.[0]?.id || null}
        currency={product.variants?.[0]?.calculated_price?.currency_code || 'usd'}
        value={product.variants?.[0]?.calculated_price?.calculated_amount ?? null}
      />

      {/* ── BREADCRUMB ─────────────────────────────────────── */}
      <div className="border-b border-border/40 bg-background">
        <div className="container-custom">
          <div className="flex items-center h-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 label-xs text-foreground/40 hover:text-foreground transition-colors duration-300"
            >
              <ArrowLeft className="h-2.5 w-2.5" strokeWidth={1.5} />
              Shop
            </Link>
            <span className="mx-3 text-border/80 text-xs">·</span>
            <span className="label-xs text-foreground/30 truncate max-w-[200px]">{product.title}</span>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ─────────────────────────────────────── */}
      <div className="container-custom py-14 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20 xl:gap-28">

          {/* ── LEFT: Gallery ─────────────────────────────── */}
          <div className="space-y-2.5">
            {/* Primary */}
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={displayImages[0].url}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Thumbnail strip */}
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2.5">
                {displayImages.slice(1, 5).map((img: any, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/5] overflow-hidden bg-muted cursor-pointer"
                  >
                    <Image
                      src={img.url}
                      alt={`${product.title} — view ${idx + 2}`}
                      fill
                      sizes="12vw"
                      className="object-cover hover:scale-[1.04] transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Info ────────────────────────────────── */}
          <div className="lg:sticky lg:top-28 lg:self-start space-y-0">

            {/* Kicker */}
            <p className="label-xs text-foreground/35 mb-5">
              {product.subtitle || 'Handmade Botanical Soap'}
            </p>

            {/* Title */}
            <h1 className="font-heading text-[2.25rem] lg:text-[2.75rem] font-normal leading-[1.08] tracking-[-0.025em] text-balance mb-7">
              {product.title}
            </h1>

            {/* Rule */}
            <div className="rule-fine mb-8" />

            {/* Variant picker + price + add-to-cart */}
            <ProductActions product={product} variantExtensions={variantExtensions} />

            {/* Trust details */}
            <div className="mt-9 pt-9 border-t border-border/40 space-y-3.5">
              {[
                'Complimentary shipping across Europe on orders over €45',
                '30-day returns — no questions asked',
                'Plastic-free, zero-waste packaging',
                'Vegan & cruelty-free, certified organic',
              ].map((line) => (
                <div key={line} className="flex items-start gap-3.5">
                  <div className="mt-[7px] h-px w-3.5 bg-foreground/20 flex-shrink-0" />
                  <p className="text-[0.8rem] text-muted-foreground leading-[1.75]">{line}</p>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="mt-9 border-t border-border/40">
              <ProductAccordion
                description={product.description}
                details={product.metadata as Record<string, string> | undefined}
              />
            </div>

          </div>
        </div>
      </div>

      {/* ── FORMULATION PHILOSOPHY ─────────────────────────── */}
      <section className="border-t border-border/40 py-20 bg-muted/15">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_2px_1fr] gap-0 items-start max-w-4xl mx-auto">

            {/* Left text */}
            <div className="text-center lg:text-right lg:pr-16 pb-10 lg:pb-0">
              <p className="label-xs text-foreground/35 mb-4">Formulation Principle</p>
              <p className="font-heading text-[1.5rem] font-normal leading-[1.35] tracking-[-0.015em] text-balance">
                Every ingredient has a reason to be here.
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-border/60 self-stretch mx-auto" />

            {/* Right text */}
            <div className="text-center lg:text-left lg:pl-16 pt-10 lg:pt-0 border-t lg:border-t-0 border-border/40">
              <p className="text-[0.875rem] text-muted-foreground leading-[1.9] mb-5">
                We believe in full transparency. Every ingredient listed on our products
                is there for a specific, proven purpose. Nothing is added for appearance
                or to cut costs.
              </p>
              <Link
                href="/about"
                className="label-xs text-foreground link-underline pb-px"
              >
                Learn About Our Process
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
