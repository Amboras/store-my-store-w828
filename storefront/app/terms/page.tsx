import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <>
      <div className="border-b">
        <div className="container-custom py-section-sm text-center">
          <h1 className="text-h1 font-heading font-semibold">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: March 2026</p>
        </div>
      </div>

      <div className="container-custom py-section max-w-3xl">
        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Overview</h2>
            <p>This website is operated by Store. Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to Store. We offer this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
          </section>

          <section>
            <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Online Store Terms</h2>
            <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">General Conditions</h2>
            <p>We reserve the right to refuse service to anyone for any reason at any time. Your content (not including credit card information) may be transferred unencrypted and involve transmissions over various networks and changes to conform and adapt to technical requirements.</p>
          </section>

          <section>
            <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Accuracy of Information</h2>
            <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions.</p>
          </section>

          <section>
            <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Products & Pricing</h2>
            <p>Certain products may be available exclusively online through the website. These products may have limited quantities and are subject to return only according to our Return Policy. We reserve the right to limit the quantities of any products that we offer. All descriptions of products or product pricing are subject to change at any time without notice.</p>
          </section>

          <section>
            <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Contact</h2>
            <p>Questions about the Terms of Service should be sent to us at <span className="text-foreground">legal@yourstore.com</span>.</p>
          </section>
        </div>
      </div>
    </>
  )
}
