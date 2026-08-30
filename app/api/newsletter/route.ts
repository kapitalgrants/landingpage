import { NextResponse } from "next/server";
import { Resend } from "resend";

// Required env vars (set these in Vercel → Project Settings → Environment Variables):
//   RESEND_API_KEY        from resend.com/api-keys
//   RESEND_AUDIENCE_ID    from resend.com/audiences

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    console.error("Missing RESEND_API_KEY or RESEND_AUDIENCE_ID env vars.");
    return NextResponse.json(
      { error: "Newsletter signup is not configured yet." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID,
      unsubscribed: false,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not subscribe right now. Try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Newsletter subscribe failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again shortly." },
      { status: 500 }
    );
  }

  // --- Mailchimp alternative ---
  // Swap the block above for this if you'd rather use Mailchimp's Marketing API.
  // Env vars: MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX (e.g. "us21"), MAILCHIMP_AUDIENCE_ID
  //
  // const res = await fetch(
  //   `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       email_address: email,
  //       status: "subscribed", // use "pending" to require double opt-in
  //     }),
  //   }
  // );
  //
  // if (!res.ok) {
  //   const data = await res.json().catch(() => ({}));
  //   // Mailchimp returns 400 with title "Member Exists" if already subscribed.
  //   // treat that as a success rather than an error.
  //   if (data?.title === "Member Exists") {
  //     return NextResponse.json({ success: true }, { status: 200 });
  //   }
  //   console.error("Mailchimp error:", data);
  //   return NextResponse.json({ error: "Could not subscribe right now." }, { status: 502 });
  // }
  //
  // return NextResponse.json({ success: true }, { status: 200 });
}
