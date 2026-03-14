import { type NextRequest, NextResponse } from "next/server";

// Passthrough: Supabase auth was causing MIDDLEWARE_INVOCATION_FAILED on Vercel Edge.
// Protect /dashboard, /admin etc. in those routes' server components or layout instead.
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
