'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days within the US. Express shipping (2-3 business days) is available at checkout. International orders typically arrive within 10-14 business days.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy on all items. Products must be in original condition with tags attached. Simply initiate a return through your account or contact our support team.' },
  { q: 'Do you ship internationally?', a: 'Yes! We ship to most countries worldwide. International shipping rates and delivery times vary by destination. You\'ll see the exact cost at checkout.' },
  { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive a confirmation email with a tracking number. You can also check your order status anytime through your account dashboard.' },
  { q: 'Are your products sustainably made?', a: 'We prioritize working with artisans and manufacturers who use ethical practices and sustainable materials. All packaging is recycled and recyclable, and we offset carbon emissions from every shipment.' },
  { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. After that, we begin processing and may not be able to make changes. Contact us immediately if you need help.' },
  { q: 'Do you offer gift wrapping?', a: 'Yes, we offer complimentary gift wrapping on all orders. Simply select the gift wrap option at checkout and include a personalized message.' },
  { q: 'How do I care for my products?', a: 'Care instructions are included with every product and available on each product page. When in doubt, follow the care label attached to the item or contact us for guidance.' },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left">
        <span className="text-sm font-medium pr-4">{q}</span>
        <ChevronDown className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function FaqPage() {
  return (
    <>
      <div className="border-b">
        <div className="container-custom py-section-sm text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">Support</p>
          <h1 className="text-h1 font-heading font-semibold">Frequently Asked Questions</h1>
        </div>
      </div>
      <div className="container-custom py-section max-w-2xl">
        <div className="border-t">
          {faqs.map((faq, i) => <FaqItem key={i} {...faq} />)}
        </div>
      </div>
    </>
  )
}
