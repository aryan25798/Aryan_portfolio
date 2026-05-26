import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const gmailUser = process.env.GMAIL_EMAIL;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { user: gmailUser, pass: gmailPass },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${gmailUser}>`,
        replyTo: email,
        to: gmailUser,
        subject: `New Portfolio Message from ${safeName}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#7C3AED;">New Contact Message</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${safeName}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${safeEmail}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${safeMessage}</td></tr>
            </table>
          </div>
        `,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({
      success: true,
      message: "Gmail not configured. Message received locally.",
    });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please email directly at aryan25798@gmail.com" },
      { status: 500 }
    );
  }
}
