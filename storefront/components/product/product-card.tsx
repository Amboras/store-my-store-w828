import Image from 'next/image'
import Link from 'next/link'
import { ImageIcon } from 'lucide-react'

interface ProductCardProps {
  product: any
}

export default function ProductCard({ product }: ProductCardProps) {
  const variant = product.variants?.[0]
  const calculatedPrice = variant?.calculated_price

  const formattedPrice = calculatedPrice
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: calculatedPrice.currency_code?.toUpperCase() || 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format((calculatedPrice.calculated_amount || 0) / 100)
    : null

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="space-y-3">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-sm">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground/30">
              <ImageIcon className="h-10 w-10" strokeWidth={1} />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium line-clamp-1 group-hover:underline underline-offset-4 transition-all">
            {product.title}
          </h3>
          {formattedPrice && (
            <p className="text-sm text-muted-foreground">{formattedPrice}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
