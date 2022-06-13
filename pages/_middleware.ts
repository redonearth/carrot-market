import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.ua?.isBot) {
    return new Response('우린 Bot을 받지 않아요. Human만 환영해요.', {
      status: 403,
    });
  }
  if (!req.url.includes('/api')) {
    if (!req.url.includes('/enter') && !req.cookies['carrot-session']) {
      return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
    }
  }
}
