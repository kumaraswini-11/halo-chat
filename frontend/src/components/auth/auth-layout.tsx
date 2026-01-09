import { CheckIcon } from "lucide-react";
import { useState, type JSX } from "react";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { OTPForm } from "@/components/auth/otp-form";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";
import { Logo } from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type AuthPage =
  | "sign_in"
  | "sign_up"
  | "verify_email"
  | "otp"
  | "forgot_password"
  | "reset_password";

const AUTH_CONFIG: Record<
  AuthPage,
  {
    title?: string;
    subtitle?: string;
    showSocial: boolean;
  }
> = {
  sign_in: {
    title: "Welcome Back",
    subtitle: "Welcome back! Select method to login:",
    showSocial: true,
  },
  sign_up: {
    title: "Create Account",
    subtitle: "Get started! Select method to sign up:",
    showSocial: true,
  },
  verify_email: { showSocial: false },
  otp: { showSocial: false },
  forgot_password: { showSocial: false },
  reset_password: { showSocial: false },
};

const FORM_MAP: Record<
  AuthPage,
  (props: { onNavigate: (page: AuthPage) => void }) => JSX.Element
> = {
  sign_in: ({ onNavigate }) => <SignInForm onNavigate={onNavigate} />,
  sign_up: ({ onNavigate }) => <SignUpForm onNavigate={onNavigate} />,
  verify_email: ({ onNavigate }) => <VerifyEmailForm onNavigate={onNavigate} />,
  otp: ({ onNavigate }) => <OTPForm onNavigate={onNavigate} />,
  forgot_password: ({ onNavigate }) => (
    <ForgotPasswordForm onNavigate={onNavigate} />
  ),
  reset_password: () => <ResetPasswordForm />,
};

const VALUE_PROPS = [
  { label: "Secure", icon: CheckIcon },
  { label: "Fast", icon: CheckIcon },
  { label: "Reliable", icon: CheckIcon },
];

function HeroSection() {
  return (
    <aside className="relative hidden flex-1 flex-col justify-center overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-black p-12 lg:flex lg:w-1/2 xl:w-7/12">
      {/* Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        aria-hidden="true"
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg">
        <Logo light />
        <h1 className="mt-10 mb-6 text-5xl leading-tight font-extrabold tracking-tight">
          Welcome back! <br />
          <span className="text-gray-400">Sign in to your account.</span>
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-gray-300">
          Thank you for registering! Please check your inbox and click the
          verification link to activate your account.
        </p>

        {/* Value Props */}
        <div className="flex flex-wrap items-center gap-4">
          {VALUE_PROPS.map((prop) => (
            <div
              key={prop.label}
              className="flex items-center gap-2 text-sm font-medium text-gray-400"
            >
              <prop.icon className="size-5 text-emerald-500" />
              <span>{prop.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Abstract Background Blurs */}
      <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
    </aside>
  );
}

export default function AuthLayout() {
  const [page, setPage] = useState<AuthPage>("sign_in");
  const config = AUTH_CONFIG[page];

  // Pass navigation handler to all forms
  const handleNavigation = (newPage: AuthPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Desktop Only */}
      <HeroSection />

      {/* Right Panel - Form */}
      <main className="flex flex-1 items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-950 dark:to-gray-900">
        <div className="w-full max-w-md">
          {/* Mobile-only Logo */}
          <div className="mb-2 flex justify-center lg:hidden">
            <Logo />
          </div>

          {/* Auth Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {config.title}
              </CardTitle>
              {config.subtitle && (
                <CardDescription>{config.subtitle}</CardDescription>
              )}
            </CardHeader>

            <CardContent>
              {config.showSocial && <SocialAuthButtons />}
              {FORM_MAP[page]({ onNavigate: handleNavigation })}
            </CardContent>
          </Card>

          {/* Terms */}
          <p className="text-muted-foreground mt-2 text-center text-xs">
            By continuing, you agree to our{" "}
            <a href="#" className="underline underline-offset-4">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
