import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';

// Edge-safe JWT verification using Web Crypto API
async function verifyTokenEdge(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    // Decode payload
    const base64Payload = payloadB64.replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload = base64Payload.padEnd(base64Payload.length + (4 - (base64Payload.length % 4)) % 4, '=');
    const payloadStr = atob(paddedPayload);
    const payload = JSON.parse(payloadStr);

    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    // Verify signature
    const encoder = new TextEncoder();
    const keyData = encoder.encode(JWT_SECRET);
    const data = encoder.encode(`${headerB64}.${payloadB64}`);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    // Decode signature
    const base64Signature = signatureB64.replace(/-/g, '+').replace(/_/g, '/');
    const paddedSignature = base64Signature.padEnd(base64Signature.length + (4 - (base64Signature.length % 4)) % 4, '=');
    const signatureBin = Uint8Array.from(atob(paddedSignature), (c) => c.charCodeAt(0));

    const isValid = await crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      signatureBin,
      data
    );

    if (!isValid) return null;
    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(request) {
  const token = request.cookies.get('auth-token')?.value;
  const pathname = request.nextUrl.pathname;

  // Check if route is admin route
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const decoded = await verifyTokenEdge(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

