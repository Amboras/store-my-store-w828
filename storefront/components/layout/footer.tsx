'use client'

import Link from 'next/link'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'

const SHOP_LINKS = [
  { label: 'All Products',      href: '/products' },
  { label: 'Lavender & Oat',    href: '/products/lavender-oat-handmade-soap' },
  { label: 'Rose & Shea',       href: '/products/rose-shea-botanical-soap' },
  { label: 'Gift Sets',         href: '/products/the-botanist-gift-set-3-soaps' },
  { label: 'Collections',       href: '/collections' },
]

const HELP_LINKS = [
  { label: 'FAQ',               href: '/faq' },
  { label: 'Shipping & Returns',href: '/shipping' },
  { label: 'Contact Us',        href: '/contact' },
]

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks = [{ label: 'About', href: '/about' }]
  if (policies?.privacy_policy)   companyLinks.push({ label: 'Privacy Policy',   href: '/privacy' })
  if (policies?.terms_of_service) companyLinks.push({ label: 'Terms of Service', href: '/terms' })
  if (policies?.refund_policy)    companyLinks.push({ label: 'Refund Policy',     href: '/refund-policy' })
  if (policies?.cookie_policy)    companyLinks.push({ label: 'Cookie Policy',     href: '/cookie-policy' })

  return (
    <footer className="border-t border-border/50 bg-muted/10">
      <div className="container-custom pt-20 pb-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading text-[1.1rem] tracking-[0.12em] font-normal text-foreground">AMBORAS</span>
            </Link>
            <p className="text-[0.8125rem] text-muted-foreground leading-[1.85] max-w-[22ch]">
              Handcrafted botanical soap, made in small batches for considered daily rituals.
            </p>
            <div className="h-px bg-border/50 w-8 mt-7 mb-5" />
            <p className="label-xs text-foreground/35">Shipped across Europe</p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="label-xs text-foreground mb-6">Shop</h3>
            <ul className="space-y-4">
              {SHOP_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-[0.8rem] text-muted-foreground hover:text-foreground transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="label-xs text-foreground mb-6">Help</h3>
            <ul className="space-y-4">
              {HELP_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-[0.8rem] text-muted-foreground hover:text-foreground transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="label-xs text-foreground mb-6">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-[0.8rem] text-muted-foreground hover:text-foreground transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[9px] tracking-[0.1em] text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Amboras. All rights reserved.
          </p>
          <div className="flex items-center gap-7">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-[9px] tracking-[0.1em] text-muted-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              Manage Cookies
            </button>
            <span className="text-[9px] tracking-[0.1em] text-muted-foreground/35">
              Powered by Amboras
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}
