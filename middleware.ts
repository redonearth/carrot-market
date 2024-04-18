import { NextConfig } from "next";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

type Routes = Record<string, boolean>;

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
};

export async function middleware(request: NextRequest) {
  const { id } = await getSession();
  const found = publicOnlyUrls[request.nextUrl.pathname];

  if (!id) {
    if (!found) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (found) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config: NextConfig = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
