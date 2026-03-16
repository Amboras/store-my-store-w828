# Agent Mistakes and Learnings

This file tracks lessons learned by agents during store generation and implementation.

## medusa-configurator

- Always verify PostgreSQL and Redis are running before configuring backend
- Check environment variables are properly loaded before testing connections
- Medusa v2 regions should be created via Admin UI or API, not in config file
- Custom modules need proper export structure to be recognized by Medusa
- Workflow steps must be properly typed to avoid runtime errors
- CRITICAL: In Medusa v2, products and prices are separate modules that must be explicitly linked
- Always follow the 4-step pattern: Create Product → Create Price Set → Link Variant to Price Set → Link Product to Sales Channel
- If variants return `calculated_price: null`, the variant was not linked to a price set
- Initialization scripts must create infrastructure BEFORE products (Region → Sales Channel → Stock Location → Products)
- Product categories should be created with proper parent-child hierarchy for navigation
- Collections are separate from categories and should be created for curated product groups
- Always create a publishable API key for the storefront to access store APIs
- Sample products should have realistic data (proper SKUs, descriptions, metadata) for better testing
- Price amounts in Medusa are stored in smallest currency unit (paise for INR, cents for USD)
- Use `remoteLink.create()` to link entities across modules, never try to create inline relationships
- Database names should reflect the store name for easier management (e.g., medusa_gamelaptop_india)
- Environment variable examples should include India-specific payment providers (Razorpay)
- Makefile commands for db-init make store setup much easier for developers

## storefront-generator

- Always copy template first, then customize - don't generate from scratch
- Verify Medusa backend URL is correctly set in environment before testing
- Use Next.js Image component for all images to get automatic optimization
- Server components are default - only mark 'use client' when absolutely needed
- TanStack Query hooks should handle loading and error states explicitly
- Generated store directories should follow consistent naming: store-{id} or store-{slug}
- **CRITICAL: Create ALL 17 mandatory pages** - Homepage, Products (2), Collections, Cart, Checkout (2), Account (4), Static (6)
- Files modified by linters between Read and Edit - use Write for new files or re-read before editing
- Medusa SDK types can be `unknown` - use explicit casting or String() conversion
- Product prices: Use `variant.calculated_price.calculated_amount` not `variant.prices[0].amount`
- Cart hook API: Use `updateItem({ lineId, quantity })` not `updateQuantity(id, qty)`
- ProductGrid must support both fetch-based (client) and prop-based (server) rendering
- Indian market: Format prices with `toLocaleString('en-IN')` for proper ₹ formatting
- Directory creation: Quote paths with special chars like `[handle]` to avoid glob expansion
- Always verify navigation links point to created pages - no broken links allowed
- Type check must pass before declaring completion
- Footer component is mandatory - must be added to layout.tsx

## theme-customizer

- Always read current tailwind.config.ts before modifying to preserve existing config
- Apply theme consistently across all components, not just homepage
- Test responsive design after theme changes at all breakpoints
- Font imports in layout.tsx must come before usage in components
- CSS variables in globals.css should match Tailwind theme values
- Border radius changes affect both UI components and images

## General Lessons

- Always run `npm run type-check` after making changes
- Test locally before considering task complete
- Document all custom configuration in respective README files
- Keep error messages user-friendly, not technical
- Report file paths relative to project root for clarity
- When in doubt, follow existing patterns in the template

## Common Pitfalls to Avoid

- Don't skip dependency installation - it causes type errors
- Don't hardcode URLs - use environment variables
- Don't mix server and client components incorrectly
- Don't forget to restart backend after config changes
- Don't ignore TypeScript errors - they indicate real problems
- Don't generate new components when template components can be reused

---

Agents should append new learnings to their respective sections after each task.
