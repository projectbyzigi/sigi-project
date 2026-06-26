import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email sending needs Node APIs (nodemailer) — force the Node.js runtime.
export const runtime = "nodejs";

/* ------------------------------------------------------------------ */
/*  Required environment variables (set these in Vercel → Settings →   */
/*  Environment Variables, and locally in .env.local):                 */
/*                                                                      */
/*    SMTP_USER   – the Gmail address that sends the mail               */
/*                  (e.g. sigibau6@gmail.com)                           */
/*    SMTP_PASS   – a Google "App Password" (16 chars, NOT the normal   */
/*                  account password). Requires 2-Step Verification.    */
/*                                                                      */
/*  Optional (sensible defaults for Gmail):                            */
/*    SMTP_HOST   – default "smtp.gmail.com"                            */
/*    SMTP_PORT   – default "465" (SSL)                                 */
/*    CONTACT_TO  – recipient, default "sigibau6@gmail.com"             */
/* ------------------------------------------------------------------ */

const CONTACT_TO = process.env.CONTACT_TO || "sigibau6@gmail.com";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid-body" },
      { status: 400 }
    );
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const phone = String(payload.phone || "").trim();
  const projektart = String(payload.projektart || "").trim();
  const message = String(payload.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "missing-fields" },
      { status: 400 }
    );
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    // Configuration problem — make it obvious in the server logs.
    console.error(
      "[contact] SMTP_USER / SMTP_PASS are not set. Cannot send mail."
    );
    return NextResponse.json(
      { success: false, error: "not-configured" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  const subject = `Projektanfrage von ${name}${
    projektart ? ` – ${projektart}` : ""
  }`;

  const lines = [
    `Name: ${name}`,
    `E-Mail: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    projektart ? `Art des Projekts: ${projektart}` : null,
    "",
    "Nachricht:",
    message,
  ].filter((l) => l !== null);

  const html = `
    <h2>Neue Projektanfrage über die Website</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ""}
    ${
      projektart
        ? `<p><strong>Art des Projekts:</strong> ${escapeHtml(projektart)}</p>`
        : ""
    }
    <p><strong>Nachricht:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"SIGI Website" <${user}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject,
      text: lines.join("\n"),
      html,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json(
      { success: false, error: "send-failed" },
      { status: 502 }
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
