# Metabolismo Desbloqueado

Act as a Senior UI/UX Designer and Lead Full-Stack Engineer. Create a high-converting, single-page Sales Funnel for a digital infoproduct bundle in Spanish (Argentine Market).

---

### 1. PROJECT OVERVIEW & ARCHITECTURE

- Product Type: Digital Info-Product Bundle (6 E-books in PDF format).

- Framework: Next.js (React) + Tailwind CSS + Lucide Icons + Framer Motion (for subtle, fast animations).

- Database & Backend: Supabase (for storing user emails, purchase status, and digital file access tokens).

- Payment Integration: Mercado Pago API (Checkout Pro or Transparent Checkout for ARS) + Stripe API fallback (for international USD payments).

- Hosting / Deployment Target: Cloudflare Pages 

---

### 2. PRICING & OFFER LOGIC

- Main Product: E-book 1: "La Verdad Agridulce de Perder Peso" (Standalone value: $35.000 ARS).

- Offer Mechanics: Purchase the main E-book for $22.000 ARS (discounted from $35.000 ARS) and get 5 Bonus E-books for FREE (Total Bundle Value: $120.000 ARS -> Final Price: $22.000 ARS).

- Bonuses Included (Shown as $0 / Free):

  1. Guía de Nutrición Consciente y Matriz de Alimentos ($17.000 ARS value)

  2. Entrenamiento Eficiente en Casa sin Equipo ($17.000 ARS value)

  3. Manual de Acondicionamiento e Hipertrofia en Gimnasio ($17.000 ARS value)

  4. Optimización Cardio y Salud Cardiovascular ($17.000 ARS value)

  5. Ajustes de Estilo de Vida: Sueño, Estrés y Hormonas ($17.000 ARS value)

---

### 3. LANDING PAGE STRUCTURE & UI COMPONENTS

Design a clean, aggressive, high-converting VSL/Sales page with a dark-mode or high-contrast modern aesthetic (Dark Slate, Deep Blue `#0f172a`, Accent Crimson `#ef4444` for pain points, Vibrant Green `#22c55e` for CTAs and discounts).

1. Top Sticky Announcement Bar:

   - "🔥 OFERTA POR TIEMPO LIMITADO: 81% DE DESCUENTO HASTA HOY" + Live Countdown Timer.

2. Hero Section:

   - Pre-headline (Small, Bold, Red): "Para quienes ya intentaron de todo y siguen aumentando de peso..."

   - Main Headline (H1, Large, Bold): "Por Qué Las Dietas Tradicionales Fallan y Cómo Desbloquear Tu Metabolismo Definitivamente (Sin Dietas de Hambre ni Pastillas)"

   - Sub-headline: "Un sistema directo, sin rodeos y respaldado por la ciencia en 6 guías prácticas que te dicen la verdad incómoda y te dan herramientas que SÍ funcionan."

   - Hero Asset: High-resolution 3D Mockup container displaying the 6 E-book covers stacked together.

   - Primary CTA Button (Large, Pulse Animation): "¡SI, QUIERO MI PACK COMPLETO POR $22.000 ARS!" (Subtext: "Pago único • Acceso inmediato • Garantía de 7 días").

3. Agitation of the Problem (Pain Points Grid):

   - Headline: "¿Te sientes identificado con esto?"

   - Cards with icons: "Cuentas calorías pero la balanza no baja", "Sufres de ansiedad por comer en la noche", "Te matas en el gimnasio sin ver cambios", "Efecto rebote constante".

4. The Brutal Truth Section (Value Proposition):

   - High-contrast card introducing E-book 1: "La Verdad Agridulce de Perder Peso". Explain how false fitness myths, stress (cortisol), and ultra-processed food traps keep people stuck.

5. The Complete Bundle Break-down (Interactive Card Grid):

   - Display 6 distinct product cards featuring each E-book's cover thumbnail, page count (~20-30 pages), key chapters, and individual price slashed to $0 ARS for bonuses.

6. Value Stack & Price Anchoring Component:

   - A visual invoice-style breakdown table:

     * Main E-book: $35.000 ARS -> $22.000 ARS

     * 5 Bonus E-books: $85.000 ARS -> $0 ARS

     * Total Value: $120.000 ARS

     * OFFER PRICE TODAY: $22.000 ARS

   - Prominent Green CTA Button.

7. Social Proof & Testimonials:

   - WhatsApp-style chat screenshot cards and transformation reviews focusing on real-life adherence and mental clarity.

8. Guarantee & Security Section:

   - Badge: 7-Day Money-Back Guarantee ("Si no aprendes algo nuevo que transforme tu perspectiva, te devolvemos el 100% de tu dinero").

   - Trust Badges: SSL Secure, Mercado Pago Verified, Instant PDF Download.

9. Dynamic FAQ Accordion:

   - "Answering questions like: ¿Cómo recibo los libros?, ¿Sirve si entreno en casa?, ¿Tengo que seguir una dieta estricta?"

---

### 4. TECHNICAL BACKEND, PAYMENT & FULFILLMENT FLOW

- Mercado Pago Integration:

  - Create an API route (`/api/checkout/mercadopago`) using Mercado Pago's official Node.js SDK.

  - Pass item title: "Pack Definitivo Pérdida de Peso (6 E-books)", unit_price: 22000, currency_id: "ARS".

  - Configure `back_urls` to route to `/thank-you?session_id={id}` upon successful payment.

  - Setup Mercado Pago Webhooks (`/api/webhooks/mercadopago`) to handle asynchronous payment confirmation (`payment.created`, `payment.updated`).

- Automated Delivery System (Post-Purchase):

  - Once payment is confirmed via Webhook/API:

    1. Store customer order in Supabase (`orders` table: email, payment_id, status, created_at).

    2. Generate a secure, temporary download URL or access key.

    3. Automatically redirect the user to `/thank-you` page containing prominent "Descargar E-books en PDF" buttons.

    4. Trigger an automated transactional email via Resend / Brevo API containing the direct access links to all 6 PDF files hosted securely in Supabase Storage or AWS S3.

---

### 5. ADDITIONAL TECHNICAL REQUIREMENTS

- Mobile-First Responsive Design (90%+ of traffic will come from Instagram/Meta Ads on mobile devices).

- Ultra-Fast Performance: Optimize graphics and script delivery to achieve a sub-1.5 second page load time.

- Meta Pixel & Google Analytics Events: Inject tracking hooks for `PageView`, `InitiateCheckout`, and `Purchase` events (passing order value $22.000 ARS).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e9272d67-270c-43b5-8e2e-417cc9b0dfa4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
