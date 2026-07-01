export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import type { NextRequest } from 'next/server';
import { handleConnectorRequest } from '../../../citora-sync.mjs';

async function runConnector(request: NextRequest): Promise<Response> {
  const url = new URL(request.url);
  const headers: Record<string, string> = {};
  request.headers.forEach((v, k) => { headers[k] = v; });

  const mockReq = {
    url: url.pathname + url.search,
    method: request.method,
    headers,
    socket: { remoteAddress: request.headers.get('x-forwarded-for') ?? '127.0.0.1' },
  };

  let responseStatus = 200;
  let responseHeaders: Record<string, string> = {};
  let responseBody = '';

  const mockRes = {
    writeHead(status: number, hdrs: Record<string, string>) {
      responseStatus = status;
      responseHeaders = { ...hdrs };
    },
    end(body: string) {
      responseBody = body ?? '';
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await handleConnectorRequest(mockReq as any, mockRes as any);

  return new Response(responseBody, {
    status: responseStatus,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest) {
  return runConnector(request);
}

export async function POST(request: NextRequest) {
  return runConnector(request);
}
