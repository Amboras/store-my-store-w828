'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, LogIn } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import CartDrawer from '@/components/cart/cart-drawer'
import { useCollections } from '@/hooks/use-collections'

const NAV_LINKS = [
  { href: '/products',                                  label: 'Shop All' },
  { href: '/products/lavender-oat-handmade-soap',       label: 'Lavender & Oat' },
  { href: '/products/rose-shea-botanical-soap',         label: 'Rose & Shea' },
  { href: '/products/the-botanist-gift-set-3-soaps',    label: 'Gift Sets' },
]

export default function Header() {
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const [isCartOpen, setIsCartOpen]           = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled]               = useState(false)
  const { data: collections } = useCollections()

  const mobileMenuRef      = useRef<HTMLDivElement>(null)
  const mobileCloseRef     = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) mobileCloseRef.current?.focus()
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMobileMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isMobileMenuOpen])

  const handleMobileKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable.length) return
    const first = focusable[0], last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last)  { e.preventDefault(); first.focus() }
  }, [])

  return (
    <>
      {/* ── Header ──────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-background/96 backdrop-blur-md border-b border-border/50 shadow-[0_1px_0_0_hsl(var(--border)/0.5)]'
            : 'bg-background border-b border-border/50'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden text-foreground/50 hover:text-foreground transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="h-[18px] w-[18px]" strokeWidth={1.25} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex flex-col items-center leading-none group"
            >
              <span className="font-heading text-[1.25rem] tracking-[0.12em] font-normal text-foreground group-hover:opacity-60 transition-opacity duration-400">
                AMBORAS
              </span>
              <span className="text-[7.5px] tracking-[0.3em] text-muted-foreground uppercase font-body mt-[3px]">
                Botanical Soap
              </span>
            </Link>

            {/* Desktop nav — centred absolutely */}
            <nav className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[9.5px] uppercase tracking-[0.2em] font-medium text-foreground/60 hover:text-foreground transition-colors duration-300"
                  prefetch={true}
                >
                  {label}
                </Link>
              ))}
              {collections?.slice(0, 1).map((col: { id: string; handle: string; title: string }) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.handle}`}
                  className="text-[9.5px] uppercase tracking-[0.2em] font-medium text-foreground/60 hover:text-foreground transition-colors duration-300"
                  prefetch={true}
                >
                  {col.title}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-0">
              <Link
                href="/search"
                className="p-2.5 text-foreground/50 hover:text-foreground transition-colors duration-300"
                aria-label="Search"
              >
                <Search strokeWidth={1.25} style={{ width: '17px', height: '17px' }} />
              </Link>
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                className="p-2.5 text-foreground/50 hover:text-foreground transition-colors duration-300 hidden sm:flex"
                aria-label={isLoggedIn ? 'My account' : 'Sign in'}
              >
                {isLoggedIn
                  ? <User strokeWidth={1.25} style={{ width: '17px', height: '17px' }} />
                  : <LogIn strokeWidth={1.25} style={{ width: '17px', height: '17px' }} />}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-foreground/50 hover:text-foreground transition-colors duration-300"
                aria-label="Shopping bag"
              >
                <ShoppingBag strokeWidth={1.25} style={{ width: '17px', height: '17px' }} />
                {itemCount > 0 && (
                  <span className="absolute top-[5px] right-[5px] flex h-[14px] w-[14px] items-center justify-center rounded-full bg-foreground text-[8px] font-semibold text-background">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Menu ─────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/15 backdrop-blur-[2px]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            onKeyDown={handleMobileKeyDown}
            className="absolute inset-y-0 left-0 w-[280px] bg-background animate-slide-in-right border-r border-border/50 flex flex-col"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-7 h-16 border-b border-border/40">
              <span className="font-heading text-xs tracking-[0.16em] text-foreground">AMBORAS</span>
              <button
                ref={mobileCloseRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-foreground/40 hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="h-[15px] w-[15px]" strokeWidth={1.25} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-7 pt-8 pb-6 space-y-0 overflow-y-auto">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center py-4 border-b border-border/30 text-[9.5px] tracking-[0.2em] uppercase font-medium text-foreground/70 hover:text-foreground transition-colors"
                  prefetch={true}
                >
                  {label}
                </Link>
              ))}
              {collections?.map((col: { id: string; handle: string; title: string }) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.handle}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center py-4 border-b border-border/30 text-[9.5px] tracking-[0.2em] uppercase font-medium text-foreground/70 hover:text-foreground transition-colors"
                  prefetch={true}
                >
                  {col.title}
                </Link>
              ))}
              <div className="pt-8 space-y-5">
                <Link
                  href={isLoggedIn ? '/account' : '/auth/login'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[9.5px] tracking-[0.2em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isLoggedIn ? 'My Account' : 'Sign In'}
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[9.5px] tracking-[0.2em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors"
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
