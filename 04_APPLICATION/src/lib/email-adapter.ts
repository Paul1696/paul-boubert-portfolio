export interface TransactionalEmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Sends transactional emails via Resend HTTP API when RESEND_API_KEY is configured.
 * Falls back gracefully in local staging without throwing.
 */
export async function sendTransactionalEmail(
  payload: TransactionalEmailPayload
): Promise<{ delivered: boolean; provider: "resend" | "local-simulation" }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromAddress =
    process.env.SMTP_FROM?.trim() ||
    "Les Ateliers de Paul <contact@ateliersdepaul.com>";

  if (!apiKey) {
    return { delivered: false, provider: "local-simulation" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
    });

    return {
      delivered: res.ok,
      provider: "resend",
    };
  } catch {
    return { delivered: false, provider: "resend" };
  }
}

