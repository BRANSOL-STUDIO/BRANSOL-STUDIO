import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

type Body = { email?: string; password?: string; redirect?: string; tab?: string };

/**
 * POST /api/auth/sign-in
 * Accepts: application/json OR application/x-www-form-urlencoded (form submit).
 * On success: form submit -> 302 redirect with Set-Cookie; JSON -> 200 + Set-Cookie + { success, destination }.
 * Always returns JSON or redirect — never HTML (avoids "Unexpected token '<'" when something parses the response).
 */
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const contentType = request.headers.get("content-type") || "";
  const isFormSubmit =
    contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  function jsonError(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
  }
  function redirectError(redirectTo: string, tab: string, message: string) {
    const loginUrl = new URL("/auth/login", url.origin);
    loginUrl.searchParams.set("redirect", redirectTo);
    loginUrl.searchParams.set("tab", tab);
    loginUrl.searchParams.set("error", encodeURIComponent(message));
    return NextResponse.redirect(loginUrl, { status: 302 });
  }

  try {
    let body: Body = {};
    if (isFormSubmit) {
      const form = await request.formData().catch(() => null);
      if (form) {
        body = {
          email: (form.get("email") as string)?.trim(),
          password: form.get("password") as string,
          redirect: form.get("redirect") as string,
          tab: form.get("tab") as string,
        };
      }
    } else {
      try {
        const parsed = await request.json();
        body = parsed && typeof parsed === "object" ? parsed : {};
        if (body.email && typeof body.email === "string") body.email = body.email.trim();
      } catch {
        return jsonError("Invalid JSON", 400);
      }
    }

    const email = body.email;
    const password = body.password;
    const tab = body.tab === "studio" ? "studio" : "client";
    const redirectTo = body.redirect || "/dashboard";
    const destination = tab === "studio" ? "/admin/overview" : redirectTo;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return isFormSubmit ? redirectError(redirectTo, tab, "Please enter a valid email address.") : jsonError("Please enter a valid email address.", 400);
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return isFormSubmit ? redirectError(redirectTo, tab, "Password must be at least 6 characters.") : jsonError("Password must be at least 6 characters.", 400);
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      const msg = "Server missing Supabase env (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY).";
      return isFormSubmit ? redirectError(redirectTo, tab, "Sign-in is temporarily unavailable.") : jsonError(msg, 500);
    }

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
      return isFormSubmit ? redirectError(redirectTo, tab, errMsg) : jsonError(errMsg, 401);
    }

    let finalDestination = destination;
    const userId = authData?.user?.id;
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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sign-in failed.";
    return isFormSubmit
      ? redirectError("/dashboard", "client", "Something went wrong. Try again.")
      : jsonError(message, 500);
  }
}
