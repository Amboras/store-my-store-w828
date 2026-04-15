import Image from 'next/image'
import Link from 'next/link'
import { getProductImage } from '@/lib/utils/placeholder-images'
import ProductPrice, { isProductSoldOut, type VariantExtension } from './product-price'

interface ProductCardProps {
  product: any
  variantExtensions?: Record<string, VariantExtension>
}

export default function ProductCard({ product, variantExtensions }: ProductCardProps) {
  const variant        = product.variants?.[0]
  const calculatedPrice = variant?.calculated_price
  const currency       = calculatedPrice?.currency_code || 'usd'
  const currentAmount  = calculatedPrice?.calculated_amount
  const ext            = variant?.id ? variantExtensions?.[variant.id] : null
  const soldOut        = isProductSoldOut(product.variants || [], variantExtensions)

  return (
    <Link href={`/products/${product.handle}`} className="group block" prefetch={true}>

      {/* ── Image ── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-5">
        <Image
          src={getProductImage(product.thumbnail, product.id)}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] ${soldOut ? 'opacity-40' : ''}`}
        />
        {soldOut && (
          <div className="absolute bottom-5 left-0 right-0 flex justify-center">
            <span className="label-xs bg-background/90 px-4 py-1.5 text-muted-foreground">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* ── Text ── */}
      <div className="space-y-1.5">
        <p className="label-xs text-foreground/35">
          {product.subtitle || 'Handmade Soap'}
        </p>
        <h3 className={`font-heading text-[1.0625rem] font-normal tracking-[-0.01em] leading-snug group-hover:opacity-50 transition-opacity duration-400 ${soldOut ? 'text-muted-foreground' : ''}`}>
          {product.title}
        </h3>
        <ProductPrice
          amount={currentAmount}
          currency={currency}
          compareAtPrice={ext?.compare_at_price}
          soldOut={soldOut}
          size="card"
        />
      </div>

    </Link>
  )
}
