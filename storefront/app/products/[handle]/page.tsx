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
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId) headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key'] = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } },
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price: v.compare_at_price,
        manage_inventory: v.manage_inventory ?? false,
        inventory_quantity: v.inventory_quantity,
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
      {/* ── BREADCRUMB ─────────────────────────────────── */}
      <div className="border-b border-border/40">
        <div className="container-custom py-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 label-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* ── PRODUCT LAYOUT ─────────────────────────────── */}
      <div className="container-custom py-12 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24">

          {/* ── LEFT: Image Gallery ──────────────────────── */}
          <div className="space-y-3">
            {/* Primary image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
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
              <div className="grid grid-cols-4 gap-3">
                {displayImages.slice(1, 5).map((image: any, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-[3/4] overflow-hidden bg-muted"
                  >
                    <Image
                      src={image.url}
                      alt={`${product.title} ${idx + 2}`}
                      fill
                      sizes="12vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Product Info ──────────────────────── */}
          <div className="lg:sticky lg:top-24 lg:self-start">

            {/* Analytics tracker */}
            <ProductViewTracker
              productId={product.id}
              productTitle={product.title}
              variantId={product.variants?.[0]?.id || null}
              currency={product.variants?.[0]?.calculated_price?.currency_code || 'usd'}
              value={product.variants?.[0]?.calculated_price?.calculated_amount ?? null}
            />

            {/* Category / subtitle */}
            <p className="label-xs text-muted-foreground mb-4">
              {product.subtitle || 'Handmade Botanical Soap'}
            </p>

            {/* Title */}
            <h1 className="font-heading text-h1 font-normal leading-[1.12] tracking-[-0.02em] mb-6">
              {product.title}
            </h1>

            {/* Thin rule */}
            <div className="w-full h-px bg-border/60 mb-7" />

            {/* Variant selector + price + add to cart */}
            <ProductActions product={product} variantExtensions={variantExtensions} />

            {/* Trust strip — refined, Aesop-style */}
            <div className="mt-8 pt-8 border-t border-border/40">
              <div className="space-y-4">
                {[
                  { label: 'Complimentary shipping on orders over €45' },
                  { label: '30-day returns — no questions asked' },
                  { label: 'Plastic-free, zero-waste packaging' },
                  { label: 'Vegan & cruelty-free, certified organic' },
                ].map(({ label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="h-px w-4 bg-muted-foreground/40 flex-shrink-0" />
                    <p className="text-caption text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accordion */}
            <div className="mt-8">
              <ProductAccordion
                description={product.description}
                details={product.metadata as Record<string, string> | undefined}
              />
            </div>

          </div>
        </div>
      </div>

      {/* ── INGREDIENTS CALLOUT ────────────────────────── */}
      <section className="border-t border-border/40 py-16 bg-muted/20">
        <div className="container-custom text-center max-w-xl mx-auto">
          <p className="label-xs text-muted-foreground mb-3">Formulation Principle</p>
          <h2 className="font-heading text-h3 font-normal leading-relaxed text-balance">
            Every ingredient has a reason to be here. Nothing more. Nothing less.
          </h2>
          <div className="divider-fine mx-auto mt-6" />
          <div className="mt-8">
            <Link
              href="/about"
              className="label-xs text-muted-foreground hover:text-foreground transition-colors link-underline pb-0.5"
            >
              Learn About Our Process
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
