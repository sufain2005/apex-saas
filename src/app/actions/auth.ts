"use server";

import { createClient } from "@/lib/supabase/server";
import { getAppOrigin, isSupabaseConfigured } from "@/lib/supabase/config";
import { redirect } from "next/navigation";

function getCredentials(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.length > 254 ||
    password.length > 128 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return { error: "Enter a valid email address and password." } as const;
  }

  return { email: email.trim().toLowerCase(), password } as const;
}

export async function signup(formData: FormData) {
  const appOrigin = getAppOrigin();
  if (!isSupabaseConfigured() || !appOrigin) {
    return {
      error:
        "Account sign-up is unavailable until Supabase and the app URL are configured. Add the values from .env.local.example to .env.local.",
    };
  }

  const credentials = getCredentials(formData);
  if ("error" in credentials) return credentials;
  if (credentials.password.length < 8) {
    return { error: "Your password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      emailRedirectTo: `${appOrigin}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    return { error: error.message || "Unable to create your account. Check your details and try again." };
  }

  if (!data.session) {
    return {
      success:
        "Account created! Please check your email inbox to confirm your address before logging in (or disable 'Confirm email' in Supabase Auth settings to log in immediately).",
    };
  }

  redirect("/dashboard");
}

export async function login(formData: FormData) {
  if (!isSupabaseConfigured()) {
    return {
      error:
        "Login is unavailable until Supabase is configured. Add the values from .env.local.example to .env.local.",
    };
  }

  const credentials = getCredentials(formData);
  if ("error" in credentials) return credentials;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
      return {
        error:
          "Please verify your email address first by clicking the link sent to your inbox, or disable email confirmation in your Supabase Auth settings.",
      };
    }
    return { error: error.message || "Email or password is incorrect." };
  }

  redirect("/dashboard");
}

export async function updatePassword(formData: FormData) {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }

  const password = formData.get("password");
  if (typeof password !== "string" || password.length < 8) {
    return { error: "New password must be at least 8 characters long." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message };
  }

  return { success: "Password successfully updated!" };
}

export async function logout() {
  if (!isSupabaseConfigured()) {
    redirect("/login?setup=required");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("Unable to log out. Please try again.");
  }
  redirect("/login");
}
