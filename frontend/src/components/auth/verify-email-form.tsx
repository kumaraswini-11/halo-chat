import { ArrowLeft, Mail } from "lucide-react";

import type { AuthPage } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";

interface VerifyEmailFormProps {
  onNavigate?: (page: AuthPage) => void;
}

export function VerifyEmailForm({ onNavigate }: VerifyEmailFormProps) {
  return (
    <div className="space-y-6 text-center">
      {/* Icon */}
      <div className="bg-primary/10 mx-auto flex size-14 items-center justify-center rounded-full">
        <Mail className="text-primary size-6" />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Check your email</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We've sent a verification link to your email address. Please click the
          link to activate your account.
        </p>
      </div>

      {/* Resend */}
      <div className="pt-2">
        <p className="text-muted-foreground mb-4 text-sm">
          Didn't receive the email?
        </p>
        <Button size="lg" variant="outline" type="button">
          Resend verification email
        </Button>
      </div>

      {/* Back to sign in */}
      <Button
        variant="ghost"
        size="lg"
        type="button"
        className="mx-auto flex items-center gap-2 p-0 text-sm"
        onClick={() => onNavigate?.("sign_in")}
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Button>
    </div>
  );
}
