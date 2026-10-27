import { LoginForm } from "@/components/auth/auth-forms";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function LoginPage() {
  return (
    <AuthPageShell mode="login" configured={isSupabaseConfigured()}>
      <LoginForm />
    </AuthPageShell>
  );
}
