# Medir hasta dónde llegan los visitantes (PostHog)

Objetivo: saber cuántas personas entran desde Instagram, hasta qué parte de la página llegan, quién toca el botón de compra y quién termina comprando.

## Qué se va a medir

- **Visita**: cada vista de la página principal, con la campaña de origen (utm_source / utm_campaign / fbclid) guardada en la persona.
- **Profundidad de scroll**: eventos al llegar al 25%, 50%, 75% y 100% de la página (una vez por visita).
- **Secciones vistas**: evento al entrar en vista cada bloque clave (Hero, Dolores, Verdad, 6 e-books, Precio/Valor, Autor, Testimonios, Garantía, FAQ).
- **Clicks**: `cta_click` con la ubicación del botón (hero, sticky móvil, sección de precio) y `faq_open` con la pregunta abierta.
- **Checkout iniciado**: cuando se pide el link de Mercado Pago (y si falla, `checkout_error`).
- **Compra**: en /thank-you cuando el pago se verifica como aprobado, con monto y payment_id.
- **Abandono**: tiempo en página al salir, para ver dónde se cae la gente.

Con eso, en PostHog queda un embudo: visita → 50% de scroll → click CTA → checkout → compra, y se puede filtrar por campaña de Instagram.

## Panel

Todo se ve en el panel de PostHog (embudos, mapas de calor de clicks y grabaciones de sesión opcionales). No se agrega ninguna pantalla nueva a la web.

## Detalles técnicos

1. Conectar el conector de PostHog (tarjeta en el chat) para obtener el token del proyecto y la región.
2. Instalar `posthog-js` e inicializarlo una sola vez en `src/routes/__root.tsx`, solo en el navegador, con `capture_pageview` manual y `autocapture` activado (para el mapa de clicks). Sin cookies de terceros ni datos personales.
3. Extender `src/lib/tracking.ts` como capa única: seguir enviando a Meta Pixel / gtag si existen y además `posthog.capture(...)`. Nuevas funciones: `trackSectionView`, `trackScrollDepth`, `trackCtaClick`, `trackFaqOpen`, `trackCheckoutError`.
4. Nuevo hook `src/hooks/use-funnel-tracking.ts`: `IntersectionObserver` para secciones (con `once`) y listener de scroll con `passive` para los hitos de 25/50/75/100%.
5. Envolver cada sección de `src/routes/index.tsx` con un `data-section` o un componente `<TrackedSection id="...">` liviano para no tocar la lógica interna de cada bloque.
6. `CtaButton` recibe una prop `location` y dispara `trackCtaClick(location)` antes de pedir el `init_point`; `Hero`, `StickyCta` y `ValueStack` pasan su ubicación. `Faq` dispara `trackFaqOpen`.
7. En `/thank-you`, cuando `verify-payment` responde válido, se envía `purchase` con `payment_id`, monto y moneda; si no es válido, `purchase_not_verified`.
8. Los UTM y el `fbclid` de la URL se registran como propiedades de la persona en la primera visita, para atribuir todo a la campaña de IG.

Nada de esto toca el flujo de pago ni los colores: los eventos son no bloqueantes y envueltos en `try/catch` para que nunca rompan el checkout.
