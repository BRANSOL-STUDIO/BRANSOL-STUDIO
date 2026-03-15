import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

type Body = { email?: string; password?: string; redirect?: string; tab?: string };

/**
 * POST /api/auth/sign-in
 * Accepts: application/json OR application/x-www-form-urlencoded (form submit).
 * On success: form submit -> 302 redirect with Set-Cookie; JSON -> 200 + Set-Cookie + { success, destination }.
 */
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  let body: Body = {};
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    body = {
      email: (form.get("email") as string)?.trim(),
      password: form.get("password") as string,
      redirect: form.get("redirect") as string,
      tab: form.get("tab") as string,
    };
  } else {
    try {
      body = await request.json();
      if (body.email && typeof body.email === "string") body.email = body.email.trim();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
  }

  const email = body.email;
  const password = body.password;
  const tab = body.tab === "studio" ? "studio" : "client";
  const redirectTo = body.redirect || "/dashboard";
  const destination = tab === "studio" ? "/admin/overview" : redirectTo;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return redirectToLoginWithError(url.origin, redirectTo, tab, "Please enter a valid email address.");
  }
  if (!password || typeof password !== "string" || password.length < 6) {
    return redirectToLoginWithError(url.origin, redirectTo, tab, "Password must be at least 6 characters.");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: "Server missing Supabase env (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY)." },
      { status: 500 }
    );
  }

  const isFormSubmit =
    contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");
  // Cookie sink: Supabase will write session cookies here; we send this response (or a redirect with same cookies)
  const cookieSink = isFormSubmit
    ? NextResponse.redirect(new URL(destination, url.origin), { status: 302 })
    : NextResponse.json({ success: true, destination }, { status: 200 });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          const opts = (options || {}) as Record<string, unknown>;
          cookieSink.cookies.set(name, value, {
            path: (opts.path as string) ?? "/",
            maxAge: (opts.maxAge as number) ?? 60 * 60 * 24 * 7,
            sameSite: (opts.sameSite as "lax" | "strict" | "none") ?? "lax",
            secure: (opts.secure as boolean) ?? process.env.NODE_ENV === "production",
            httpOnly: (opts.httpOnly as boolean) ?? true,
          });
        });
      },
    },
  });

  const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const msg = error.message?.toLowerCase() ?? "";
    const errMsg =
      msg.includes("invalid login credentials") || msg.includes("invalid_credentials")
        ? "Incorrect email or password."
        : error.message;
    if (isFormSubmit) {
      return redirectToLoginWithError(url.origin, redirectTo, tab, errMsg);
    }
    return NextResponse.json({ error: errMsg }, { status: 401 });
  }

  // Super admins and admins always go to admin; tab choice only affects clients
  const userId = authData?.user?.id;
  let finalDestination = destination;
  if (userId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();
    const role = ((profile?.role as string) ?? "").toLowerCase().trim();
    if (role === "super_admin" || role === "admin") {
      finalDestination = "/admin/overview";
    }
  }

  if (isFormSubmit) {
    if (finalDestination === destination) {
      return cookieSink;
    }
    const redirectRes = NextResponse.redirect(new URL(finalDestination, url.origin), { status: 302 });
    const setCookies = cookieSink.headers.getSetCookie?.() ?? [];
    setCookies.forEach((c) => redirectRes.headers.append("Set-Cookie", c));
    return redirectRes;
  }
  if (finalDestination !== destination) {
    const jsonRes = NextResponse.json({ success: true, destination: finalDestination }, { status: 200 });
    const setCookies = cookieSink.headers.getSetCookie?.() ?? [];
    setCookies.forEach((c) => jsonRes.headers.append("Set-Cookie", c));
    return jsonRes;
  }
  return cookieSink;
}

function redirectToLoginWithError(
  origin: string,
  redirect: string,
  tab: string,
  error: string
) {
  const loginUrl = new URL("/auth/login", origin);
  loginUrl.searchParams.set("redirect", redirect);
  loginUrl.searchParams.set("tab", tab);
  loginUrl.searchParams.set("error", error);
  return NextResponse.redirect(loginUrl, { status: 302 });
}
