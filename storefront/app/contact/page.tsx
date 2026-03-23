'use client'

import { Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <div className="border-b">
        <div className="container-custom py-section-sm text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">Get in Touch</p>
          <h1 className="text-h1 font-heading font-semibold">Contact Us</h1>
        </div>
      </div>

      <div className="container-custom py-section">
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div>
            <h2 className="text-h3 font-heading font-semibold mb-6">Send a Message</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="First name" className="border-b border-foreground/20 bg-transparent px-0 py-3 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors" />
                <input type="text" placeholder="Last name" className="border-b border-foreground/20 bg-transparent px-0 py-3 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors" />
              </div>
              <input type="email" placeholder="Email address" className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors" />
              <select className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 text-sm text-muted-foreground focus:border-foreground focus:outline-none transition-colors">
                <option>Select a topic</option>
                <option>Order inquiry</option>
                <option>Product question</option>
                <option>Returns & exchanges</option>
                <option>Other</option>
              </select>
              <textarea placeholder="Your message" rows={4} className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors resize-none" />
              <button type="submit" className="bg-foreground text-background px-8 py-3.5 text-sm font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 lg:pt-12">
            <div className="flex gap-4">
              <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-medium text-sm">Email</p>
                <p className="text-sm text-muted-foreground mt-1">hello@yourstore.com</p>
                <p className="text-xs text-muted-foreground mt-0.5">We respond within 24 hours</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-medium text-sm">Address</p>
                <p className="text-sm text-muted-foreground mt-1">123 Commerce Street<br />New York, NY 10001</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="h-5 w-5 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-medium text-sm">Hours</p>
                <p className="text-sm text-muted-foreground mt-1">Mon — Fri: 9am to 6pm EST<br />Sat — Sun: 10am to 4pm EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
