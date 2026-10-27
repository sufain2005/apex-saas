import { SignupForm } from "@/components/auth/auth-forms";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { getAppOrigin, isSupabaseConfigured } from "@/lib/supabase/config";

export default function SignupPage() {
  return (
    <AuthPageShell
      mode="signup"
      configured={isSupabaseConfigured() && Boolean(getAppOrigin())}
    >
      <SignupForm />
    </AuthPageShell>
  );
}
