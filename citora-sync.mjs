/**
 * Citora Connector V3 - Pure Dynamic Pull (Node.js)
 *
 * Copyright (c) 2024-2026 Citora (https://citora.ai). All rights reserved.
 * Licensed for use exclusively with Citora platform services.
 * Unauthorized modification, redistribution, or reverse engineering is prohibited.
 *
 * Security model:
 * - RSA public key for signature verification
 * - Environment binding (domain-locked)
 * - Access token authentication (7-day validity)
 *
 * Flow:
 * 1. Environment binding check
 * 2. Call /api/v2/brain with access token
 * 3. Verify RSA signature on response payload
 * 4. Validate host binding + expiration in payload
 * 5. Output content (no disk writes)
 */

import { readFileSync } from 'fs';
import { createServer } from 'http';
import { createHash, createVerify } from 'crypto';
import { fileURLToPath } from 'url';

const _K = [209, 30, 159, 21, 178, 90, 11, 208, 193, 236, 5, 43];
const _DH = 'b97e6568593a3fc93ad583eae1fe2f768bd637618941a96da704c2c84bfc1f45';
const _D = (bytes) => Buffer.from(bytes.map((value, index) => (value ^ _K[index % _K.length]) & 0xff)).toString('utf8');
const BOUND_DOMAIN = _D([166, 127, 229, 118, 218, 63, 121, 254, 162, 131, 104]);
const ACCESS_TOKEN = _D([227, 47, 253, 116, 134, 56, 61, 230, 248, 138, 96, 73, 178, 45, 252, 32, 133, 106, 62, 180, 160, 216, 55, 26, 179, 127, 168, 34, 128, 109, 110, 230, 249, 142, 102, 25, 183, 41, 254, 44, 215, 107, 63, 226, 160, 217, 96, 73, 230, 124, 175, 38, 138, 99, 105, 177, 240, 136, 55, 28, 229, 127, 172, 39]);
const CONNECTOR_ID = _D([178, 44, 171, 44, 139, 106, 105, 179, 246, 218, 102, 31, 178, 39, 254, 118, 129, 57, 56, 232, 242, 223, 54, 74, 180, 38, 252, 39, 211, 59, 51, 181]);
const API_ENDPOINT = _D([185, 106, 235, 101, 193, 96, 36, 255, 162, 133, 113, 68, 163, 127, 177, 116, 219, 117, 106, 160, 168, 195, 115, 25, 254, 124, 237, 116, 219, 52]);
const PUBLIC_KEY = _D([252, 51, 178, 56, 159, 24, 78, 151, 136, 162, 37, 123, 132, 92, 211, 92, 241, 122, 64, 149, 152, 193, 40, 6, 252, 51, 149, 88, 251, 19, 73, 153, 171, 173, 75, 105, 182, 117, 238, 125, 217, 51, 76, 233, 182, 220, 71, 106, 128, 91, 217, 84, 243, 21, 72, 145, 144, 212, 68, 102, 152, 87, 221, 86, 213, 17, 72, 145, 144, 169, 68, 94, 131, 77, 174, 125, 220, 43, 97, 130, 165, 128, 124, 109, 231, 83, 229, 114, 222, 32, 81, 218, 128, 191, 95, 81, 130, 42, 229, 82, 200, 47, 110, 231, 180, 181, 116, 124, 154, 46, 217, 32, 135, 51, 81, 148, 133, 165, 79, 125, 228, 120, 249, 71, 250, 20, 127, 157, 164, 139, 125, 109, 168, 110, 233, 58, 226, 105, 79, 162, 242, 135, 105, 96, 184, 105, 245, 124, 138, 14, 98, 224, 178, 130, 113, 113, 219, 53, 217, 116, 138, 55, 127, 151, 131, 195, 55, 98, 155, 83, 231, 125, 128, 29, 68, 178, 162, 156, 124, 108, 139, 107, 221, 45, 221, 52, 94, 131, 249, 182, 114, 123, 180, 79, 201, 99, 128, 113, 110, 160, 153, 218, 127, 88, 137, 44, 214, 82, 217, 8, 65, 153, 184, 169, 72, 113, 169, 125, 203, 120, 203, 80, 66, 151, 148, 148, 70, 124, 160, 102, 211, 118, 224, 49, 59, 147, 183, 153, 46, 77, 188, 79, 170, 37, 215, 19, 89, 226, 242, 141, 92, 125, 229, 105, 229, 80, 221, 27, 88, 226, 146, 135, 125, 106, 181, 70, 172, 89, 249, 45, 99, 185, 138, 180, 113, 79, 146, 110, 199, 111, 234, 46, 93, 152, 164, 175, 15, 93, 157, 87, 234, 121, 232, 27, 60, 145, 164, 131, 77, 92, 151, 107, 253, 124, 231, 32, 92, 153, 184, 142, 117, 91, 231, 88, 197, 82, 133, 13, 108, 187, 178, 186, 48, 88, 188, 84, 207, 127, 202, 34, 111, 129, 244, 159, 53, 123, 135, 40, 212, 115, 212, 35, 124, 189, 133, 134, 49, 25, 159, 103, 198, 31, 220, 13, 61, 130, 183, 187, 127, 66, 144, 100, 217, 44, 194, 51, 125, 133, 167, 160, 108, 65, 191, 86, 242, 96, 245, 40, 58, 166, 150, 149, 107, 127, 231, 73, 213, 125, 221, 108, 68, 225, 143, 162, 105, 113, 227, 103, 237, 34, 138, 110, 65, 160, 243, 163, 98, 100, 146, 102, 245, 125, 240, 63, 99, 179, 203, 136, 84, 98, 149, 95, 206, 84, 240, 80, 38, 253, 236, 193, 40, 110, 159, 90, 191, 69, 231, 24, 71, 153, 130, 204, 78, 110, 136, 51, 178, 56, 159, 119]);
const ROUTE_TOKEN = _D([178, 47, 170, 35, 211, 98, 59, 182, 246, 221, 96, 72, 180, 127, 173, 32, 131, 107, 61, 226, 243, 221, 60, 27, 181, 122, 168, 36, 138, 110, 51, 226]);
const PORT = Number(process.env.PORT || 3000);

function _noopa7e7b7(value) {
  return Array.isArray(value) ? value.slice(0, 0).length : String(value || '').length - String(value || '').length;
}
const _dusta7e7b7 = _noopa7e7b7('citora');

function normalizeHost(input = '') {
  let value = String(input).trim();

  if (value.includes('://')) {
    try {
      value = new URL(value).host;
    } catch {
      return '';
    }
  }

  value = value.toLowerCase();

  if (value.startsWith('[')) {
    const bracketEnd = value.indexOf(']');
    if (bracketEnd !== -1) {
      return value.slice(1, bracketEnd);
    }
  }

  const colonCount = (value.match(/:/g) || []).length;
  if (colonCount <= 1) {
    const colonPos = value.lastIndexOf(':');
    if (colonPos !== -1) {
      const afterColon = value.slice(colonPos + 1);
      if (/^\d+$/.test(afterColon)) {
        value = value.slice(0, colonPos);
      }
    }
  }

  return value.replace(/\.+$/, '');
}

function stripWww(host) {
  return host.startsWith('www.') ? host.slice(4) : host;
}

function hostsMatch(left, right) {
  const a = stripWww(normalizeHost(left));
  const b = stripWww(normalizeHost(right));
  return a !== '' && b !== '' && a === b;
}

function getHeaderValue(req, name) {
  const value = req.headers[name];
  if (Array.isArray(value)) {
    return value[0] || '';
  }
  return value || '';
}

function getRequestHost(req) {
  const forwardedHost = getHeaderValue(req, 'x-forwarded-host');
  const host = forwardedHost || getHeaderValue(req, 'host') || BOUND_DOMAIN;
  return normalizeHost(host);
}

function ensureBoundRequest(req) {
  const rawHost = getHeaderValue(req, 'x-forwarded-host') || getHeaderValue(req, 'host');
  if (!rawHost) {
    return true;
  }
  return hostsMatch(rawHost, BOUND_DOMAIN);
}

function jsonOut(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Citora-Connector-Version': '3',
    'X-Citora-Connector-Id': CONNECTOR_ID,
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  });
  res.end(JSON.stringify(payload));
}

function textOut(res, status, content, source = 'api', alert = null) {
  const headers = {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Provider': 'connector',
    'X-Ver': '3.0',
    'X-Citora-Source': source,
    'X-Citora-Connector-Version': '3',
    'X-Citora-Connector-Id': CONNECTOR_ID,
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  };

  if (alert) {
    headers['X-Citora-Alert'] = alert;
  }

  res.writeHead(status, headers);
  res.end(content);
}

function errorOut(res, message, status = 502, alert = null) {
  textOut(res, status, `# llms.txt temporarily unavailable\n# ${message}\n`, 'error', alert);
}

async function postJson(url, data) {
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return {
      code: resp.status,
      body: await resp.text(),
    };
  } catch (error) {
    return {
      code: 0,
      body: '',
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// ===== CITORA_CORE_BEGIN =====
function verifyCoreIntegrity() {
  try {
    const selfContent = readFileSync(fileURLToPath(import.meta.url), 'utf8');
    const match = selfContent.match(/\/\/ ===== CITORA_CORE_BEGIN =====([\s\S]+?)\/\/ ===== CITORA_CORE_END =====/);
    if (!match) {
      return false;
    }

    const computedHash = createHash('sha256').update(match[1].trim(), 'utf8').digest('hex');
    return computedHash === _DH;
  } catch {
    return false;
  }
}

function verifySignature(payload, signatureB64) {
  try {
    const verify = createVerify('SHA256');
    verify.update(payload, 'utf8');
    verify.end();
    return verify.verify(PUBLIC_KEY, Buffer.from(signatureB64, 'base64'));
  } catch {
    return false;
  }
}

function decodeBase64Utf8(value) {
  const normalized = String(value || '').replace(/\s+/g, '');
  if (
    normalized === '' ||
    normalized.length % 4 !== 0 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(normalized)
  ) {
    return null;
  }

  const buffer = Buffer.from(normalized, 'base64');
  if (buffer.length === 0) {
    return null;
  }

  const roundTrip = buffer.toString('base64').replace(/=+$/, '');
  const expected = normalized.replace(/=+$/, '');
  if (roundTrip !== expected) {
    return null;
  }

  return buffer.toString('utf8');
}

function validatePayload(payloadData, expectedHost) {
  if (!payloadData || typeof payloadData !== 'object') {
    return { valid: false, error: 'invalid_payload' };
  }

  if (!hostsMatch(payloadData.host || '', expectedHost)) {
    return { valid: false, error: 'host_mismatch' };
  }

  const expiresAt = Number(payloadData.expires_at || 0);
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
    return { valid: false, error: 'expired' };
  }

  return { valid: true, error: null };
}

export async function handleConnectorRequest(req, res) {
  const requestUrl = new URL(req.url || '/', `http://${getHeaderValue(req, 'host') || BOUND_DOMAIN}`);

  if (!verifyCoreIntegrity()) {
    errorOut(res, 'Connector integrity check failed. Please re-download from Citora dashboard.', 500);
    return;
  }

  if (!ensureBoundRequest(req)) {
    textOut(res, 403, 'Access denied: Domain binding failed', 'error');
    return;
  }

  if (req.method === 'GET' && ROUTE_TOKEN !== '' && requestUrl.pathname === `/${ROUTE_TOKEN}.txt`) {
    textOut(res, 200, ROUTE_TOKEN, 'api');
    return;
  }

  if (req.method === 'POST') {
    jsonOut(res, 200, {
      success: true,
      mode: 'pull',
      version: 3,
      connector_id: CONNECTOR_ID,
      configured: ACCESS_TOKEN !== '',
      time: new Date().toISOString(),
    });
    return;
  }

  const shouldServe = requestUrl.searchParams.get('serve') === 'llms' || requestUrl.pathname === '/llms.txt';

  if (!shouldServe) {
    textOut(
      res,
      200,
      [
        'Citora Connector V3 (Node.js)',
        '===========================',
        '',
        'This connector is working.',
        'Route /llms.txt to this handler or run the standalone server.',
      ].join('\n'),
      'info'
    );
    return;
  }

  if (ACCESS_TOKEN === '') {
    errorOut(res, 'Connector not configured.', 503);
    return;
  }

  const host = getRequestHost(req) || normalizeHost(BOUND_DOMAIN);
  const ua = getHeaderValue(req, 'user-agent');
  const ip = req.socket?.remoteAddress || '';

  const apiResp = await postJson(API_ENDPOINT, {
    token: ACCESS_TOKEN,
    host,
    ua,
    ip,
  });

  if (apiResp.code === 401) {
    errorOut(res, 'Access denied: Token expired or invalid', 401);
    return;
  }

  let alert = null;
  if (apiResp.code === 429) {
    alert = 'rate_limited';
  }

  if (apiResp.code !== 200) {
    errorOut(res, 'Citora API did not respond. Please try again later.', 502, alert);
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(apiResp.body);
  } catch {
    errorOut(res, 'Citora API returned invalid JSON.');
    return;
  }

  const payload = parsed?.data?.payload;
  const signature = parsed?.data?.signature;
  if (typeof payload !== 'string' || typeof signature !== 'string') {
    errorOut(res, 'Citora API returned incomplete data.');
    return;
  }

  if (!verifySignature(payload, signature)) {
    errorOut(res, 'Signature verification failed.');
    return;
  }

  let payloadData;
  try {
    payloadData = JSON.parse(payload);
  } catch {
    errorOut(res, 'Signed payload is invalid.');
    return;
  }

  const validation = validatePayload(payloadData, host);
  if (!validation.valid) {
    errorOut(res, `Payload validation failed: ${validation.error}.`);
    return;
  }

  const content = decodeBase64Utf8(payloadData.content || '');

  if (content === null || content === '') {
    errorOut(res, 'Signed payload content is empty.');
    return;
  }

  textOut(res, 200, content, 'api', alert);
}
// ===== CITORA_CORE_END =====

const isMain = import.meta.url === `file://${process.argv[1]}`;

if (isMain) {
  const server = createServer(async (req, res) => {
    const requestUrl = new URL(req.url || '/', `http://${getHeaderValue(req, 'host') || BOUND_DOMAIN}`);

    if (
      req.method === 'POST' ||
      requestUrl.pathname === `/${ROUTE_TOKEN}.txt` ||
      requestUrl.pathname === '/llms.txt' ||
      requestUrl.pathname === '/citora-sync' ||
      requestUrl.pathname === '/' ||
      requestUrl.searchParams.get('serve') === 'llms'
    ) {
      await handleConnectorRequest(req, res);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  });

  server.listen(PORT, () => {
    console.log(`Citora Connector V3 (Node.js) listening on port ${PORT}`);
    console.log(`Endpoint: http://localhost:${PORT}/llms.txt`);
  });
}
