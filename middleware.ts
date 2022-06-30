import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { isBot } = userAgent(req);
  if (isBot) {
    return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
    // return new Response('우린 Bot을 받지 않아요. Human만 환영해요.', {
    //   status: 403,
    // });
  }
  if (!req.url.includes('/api')) {
    if (!req.url.includes('/enter') && !req.cookies.get('carrot-session')) {
      return NextResponse.redirect(
        new URL(`${req.nextUrl.origin}/enter`, req.url)
      );
    }
  }
}
