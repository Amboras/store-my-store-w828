'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, LogIn, Leaf } from 'lucide-react'
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
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuCloseRef.current?.focus()
    }
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
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-background/96 backdrop-blur-md border-b shadow-sm'
            : 'bg-background border-b'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-sage" strokeWidth={1.5} />
              <span className="font-heading text-2xl font-semibold tracking-tight">
                Amboras
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/products" className="text-sm tracking-wide font-medium link-underline py-1" prefetch={true}>
                Shop All
              </Link>
              <Link href="/products/lavender-oat-handmade-soap" className="text-sm tracking-wide font-medium link-underline py-1" prefetch={true}>
                Lavender & Oat
              </Link>
              <Link href="/products/rose-shea-botanical-soap" className="text-sm tracking-wide font-medium link-underline py-1" prefetch={true}>
                Rose & Shea
              </Link>
              <Link href="/products/the-botanist-gift-set-3-soaps" className="text-sm tracking-wide font-medium link-underline py-1" prefetch={true}>
                Gift Sets
              </Link>
              {collections?.slice(0, 2).map((collection: any) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="text-sm tracking-wide font-medium link-underline py-1"
                  prefetch={true}
                >
                  {collection.title}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link
                href="/search"
                className="p-2.5 hover:opacity-70 transition-opacity"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Link>
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                className="p-2.5 hover:opacity-70 transition-opacity hidden sm:block"
                aria-label={isLoggedIn ? 'Account' : 'Sign in'}
              >
                {isLoggedIn ? <User className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:opacity-70 transition-opacity"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-sage text-[10px] font-bold text-white">
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
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-background animate-slide-in-right"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-sage" strokeWidth={1.5} />
                <span className="font-heading text-xl font-semibold">Amboras</span>
              </div>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:opacity-70"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-base tracking-wide border-b border-border/50" prefetch={true}>Shop All</Link>
              <Link href="/products/lavender-oat-handmade-soap" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-base tracking-wide border-b border-border/50" prefetch={true}>Lavender & Oat</Link>
              <Link href="/products/rose-shea-botanical-soap" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-base tracking-wide border-b border-border/50" prefetch={true}>Rose & Shea</Link>
              <Link href="/products/the-botanist-gift-set-3-soaps" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-base tracking-wide border-b border-border/50" prefetch={true}>Gift Sets</Link>
              {collections?.map((collection: any) => (
                <Link key={collection.id} href={`/collections/${collection.handle}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-base tracking-wide border-b border-border/50" prefetch={true}>
                  {collection.title}
                </Link>
              ))}
              <div className="pt-4 space-y-1">
                <Link href={isLoggedIn ? '/account' : '/auth/login'} onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-muted-foreground text-sm">
                  {isLoggedIn ? 'My Account' : 'Sign In'}
                </Link>
                <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-muted-foreground text-sm">Search</Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-muted-foreground text-sm">Our Story</Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
