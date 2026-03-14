import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Public site — no auth required
  if (
    pathname === "/" ||
    pathname.startsWith("/work") ||
    pathname.startsWith("/expertise") ||
    pathname.startsWith("/platform") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/perspectives") ||
    pathname.startsWith("/begin") ||
    pathname.startsWith("/auth")
  ) {
    return response;
  }

  // Protected client platform: /dashboard, /projects, /deliverables, /files, /invoices, /subscription
  const isPlatform =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/deliverables") ||
    pathname.startsWith("/files") ||
    pathname.startsWith("/invoices") ||
    pathname.startsWith("/subscription");

  // Protected admin
  const isAdmin = pathname.startsWith("/admin");

  if (isPlatform || isAdmin) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // Role comes from JWT custom claim (set by Edge Function on signup) or from profiles table
    const role = (user as { role?: string }).role ?? "client";

    if (isAdmin) {
      const isSuperOnly =
        pathname.startsWith("/admin/billing") ||
        pathname.startsWith("/admin/team");
      if (isSuperOnly && role !== "super_admin") {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/overview";
        return NextResponse.redirect(url);
      }
      if (role !== "admin" && role !== "super_admin") {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }

    if (isPlatform && role !== "client" && role !== "admin" && role !== "super_admin") {
      // e.g. admin visiting /dashboard — allow; or redirect to admin
      if (role === "admin" || role === "super_admin") {
        // Admins can access platform too (e.g. preview)
      } else {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/overview";
        return NextResponse.redirect(url);
      }
    }
  }

  return response;
}
