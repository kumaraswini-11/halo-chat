import { ArrowLeft, Shield } from "lucide-react";
import { useState } from "react";

import type { AuthPage } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPFormProps {
  onResend?: () => void;
  onNavigate?: (page: AuthPage) => void;
  onSubmit?: (code: string) => void;
}

export function OTPForm({ onResend, onNavigate, onSubmit }: OTPFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    console.log("OTP Form Data:", value);
    onSubmit?.(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="bg-primary/10 mx-auto mb-4 flex size-14 items-center justify-center rounded-full">
          <Shield className="text-primary size-6" />
        </div>
        <h3 className="text-xl font-semibold">Enter verification code</h3>
        <p className="text-muted-foreground text-sm">
          We've sent a 6-digit code to your email address.
        </p>
      </div>

      {/* OTP */}
      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={setValue}
          inputMode="numeric"
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, index) => (
              <InputOTPSlot key={index} index={index} className="h-10" />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        size="lg"
        className="w-full"
        disabled={value.length !== 6}
      >
        Verify code
      </Button>

      {/* Resend */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          Didn't receive the code?
        </p>
        <Button
          variant="link"
          size="lg"
          type="button"
          className="text-sm"
          onClick={onResend}
        >
          Resend code
        </Button>
      </div>

      {/* Back */}
      <Button
        variant="ghost"
        size="lg"
        type="button"
        onClick={() => onNavigate?.("sign_in")}
        className="mx-auto flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Button>
    </div>
  );
}
