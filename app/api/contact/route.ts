import { NextResponse } from 'next/server';
import { z } from 'zod';
// Basic in-memory / placeholder email handler. Replace with actual transport (e.g., Nodemailer) & secrets.

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.parse(json);
    // TODO: integrate real email sending with an API key / SMTP using environment variables.
    console.log('CONTACT_FORM', parsed);
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
