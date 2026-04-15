'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, LogIn } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import CartDrawer from '@/components/cart/cart-drawer'
import { useCollections } from '@/hooks/use-collections'

export default function Header() {
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: collections } = useCollections()

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) mobileMenuCloseRef.current?.focus()
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus()
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-sm border-b border-border/60'
            : 'bg-background border-b border-border/60'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-[4.5rem] items-center justify-between">

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>

            {/* Logo — centred on mobile, left on desktop */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex flex-col items-center leading-none group"
            >
              <span className="font-heading text-[1.35rem] tracking-[0.06em] font-normal text-foreground group-hover:opacity-70 transition-opacity">
                AMBORAS
              </span>
              <span className="text-[8px] tracking-[0.22em] text-muted-foreground uppercase mt-0.5 font-body">
                Botanical Soap
              </span>
            </Link>

            {/* Desktop Navigation — perfectly centred */}
            <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              <Link href="/products" className="label-xs hover:text-foreground transition-colors" prefetch={true}>
                Shop All
              </Link>
              <Link href="/products/lavender-oat-handmade-soap" className="label-xs hover:text-foreground transition-colors" prefetch={true}>
                Lavender &amp; Oat
              </Link>
              <Link href="/products/rose-shea-botanical-soap" className="label-xs hover:text-foreground transition-colors" prefetch={true}>
                Rose &amp; Shea
              </Link>
              <Link href="/products/the-botanist-gift-set-3-soaps" className="label-xs hover:text-foreground transition-colors" prefetch={true}>
                Gift Sets
              </Link>
              {collections?.slice(0, 1).map((collection: { id: string; handle: string; title: string }) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="label-xs hover:text-foreground transition-colors"
                  prefetch={true}
                >
                  {collection.title.toUpperCase()}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-0.5">
              <Link
                href="/search"
                className="p-2.5 text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="h-4.5 w-4.5" strokeWidth={1.5} style={{ width: '1.125rem', height: '1.125rem' }} />
              </Link>
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                className="p-2.5 text-foreground/70 hover:text-foreground transition-colors hidden sm:flex"
                aria-label={isLoggedIn ? 'Account' : 'Sign in'}
              >
                {isLoggedIn
                  ? <User strokeWidth={1.5} style={{ width: '1.125rem', height: '1.125rem' }} />
                  : <LogIn strokeWidth={1.5} style={{ width: '1.125rem', height: '1.125rem' }} />}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag strokeWidth={1.5} style={{ width: '1.125rem', height: '1.125rem' }} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground text-[9px] font-semibold text-background">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-72 bg-background animate-slide-in-right border-r border-border/60"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
              <span className="font-heading text-sm tracking-[0.1em]">AMBORAS</span>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="px-6 py-8 space-y-0">
              {[
                { href: '/products', label: 'Shop All' },
                { href: '/products/lavender-oat-handmade-soap', label: 'Lavender & Oat' },
                { href: '/products/rose-shea-botanical-soap', label: 'Rose & Shea' },
                { href: '/products/the-botanist-gift-set-3-soaps', label: 'Gift Sets' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-4 border-b border-border/40 label-xs text-foreground hover:text-muted-foreground transition-colors"
                  prefetch={true}
                >
                  {label.toUpperCase()}
                </Link>
              ))}
              {collections?.map((collection: { id: string; handle: string; title: string }) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-4 border-b border-border/40 label-xs text-foreground hover:text-muted-foreground transition-colors"
                  prefetch={true}
                >
                  {collection.title.toUpperCase()}
                </Link>
              ))}

              <div className="pt-8 space-y-4">
                <Link
                  href={isLoggedIn ? '/account' : '/auth/login'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block label-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isLoggedIn ? 'My Account' : 'Sign In'}
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block label-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Our Story
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
