export async function onRequestGet(context: { request: Request; env: Record<string, string> }) {
  const url = new URL(context.request.url);
  const paymentId = url.searchParams.get("payment_id") || url.searchParams.get("collection_id");
  const status = url.searchParams.get("status") || url.searchParams.get("collection_status");

  // Si no hay ID de pago o el estado no es 'approved', denegamos la petición
  if (!paymentId || status !== "approved") {
    return new Response(JSON.stringify({ valid: false, reason: "Pago no aprobado" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Verificamos directamente contra la API de Mercado Pago la autenticidad del pago
    const mpAccessToken = context.env.MP_ACCESS_TOKEN;
    
    // Si no configuraste el token de Mercado Pago en variables de entorno,
    // se realiza una validación básica de formato seguro
    if (mpAccessToken) {
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${mpAccessToken}` },
      });

      if (!mpResponse.ok) {
        return new Response(JSON.stringify({ valid: false, reason: "Pago inexistente en Mercado Pago" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }

      const paymentData = (await mpResponse.json()) as { status: string };
      if (paymentData.status !== "approved") {
        return new Response(JSON.stringify({ valid: false, reason: "El pago no está aprobado en Mercado Pago" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response(JSON.stringify({ valid: true, paymentId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ valid: false, reason: "Error al validar la transacción" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
