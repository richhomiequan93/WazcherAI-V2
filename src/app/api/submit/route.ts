import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, plan, message } = body as {
      name?: string; company?: string; email?: string; plan?: string; message?: string;
    };

    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 });
    }

    // Forward to the Cloudflare Worker / D1 endpoint in production,
    // or handle locally. Adjust SUBMIT_ENDPOINT in .env.local.
    const endpoint = process.env.SUBMIT_ENDPOINT;
    if (endpoint) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, plan, message }),
      });
      const data = await res.json() as { ok: boolean; error?: string };
      return NextResponse.json(data, { status: res.status });
    }

    // Fallback: log and acknowledge (replace with your own DB/email logic)
    console.log('[contact form]', { name, company, email, plan, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
