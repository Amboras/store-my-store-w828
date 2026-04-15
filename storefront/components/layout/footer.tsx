'use client'

import Link from 'next/link'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Lavender & Oat', href: '/products/lavender-oat-handmade-soap' },
    { label: 'Rose & Shea', href: '/products/rose-shea-botanical-soap' },
    { label: 'Gift Sets', href: '/products/the-botanist-gift-set-3-soaps' },
    { label: 'Collections', href: '/collections' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks = [{ label: 'About', href: '/about' }]
  if (policies?.privacy_policy)   companyLinks.push({ label: 'Privacy Policy', href: '/privacy' })
  if (policies?.terms_of_service) companyLinks.push({ label: 'Terms of Service', href: '/terms' })
  if (policies?.refund_policy)    companyLinks.push({ label: 'Refund Policy', href: '/refund-policy' })
  if (policies?.cookie_policy)    companyLinks.push({ label: 'Cookie Policy', href: '/cookie-policy' })

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="container-custom pt-16 pb-10">

        {/* Top: brand + columns */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand statement */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <span className="font-heading text-base tracking-[0.1em] font-normal">AMBORAS</span>
            </Link>
            <p className="text-caption text-muted-foreground leading-[1.8] max-w-[22ch]">
              Handcrafted botanical soap, made in small batches for considered daily rituals.
            </p>
            <div className="divider-fine mt-6" />
            <p className="label-xs text-muted-foreground mt-4">
              Shipped across Europe
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="label-xs text-foreground mb-5">Shop</h3>
            <ul className="space-y-3.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-caption text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="label-xs text-foreground mb-5">Help</h3>
            <ul className="space-y-3.5">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-caption text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="label-xs text-foreground mb-5">Company</h3>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-caption text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.08em] text-muted-foreground">
            &copy; {new Date().getFullYear()} Amboras. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-[10px] tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors"
            >
              Manage Cookies
            </button>
            <span className="text-[10px] tracking-[0.08em] text-muted-foreground/60">
              Powered by Amboras
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}
