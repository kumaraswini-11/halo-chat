import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import type { AuthPage } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const signInFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(32, { message: "Password must be at most 32 characters." }),
  remember: z.boolean(),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

interface SignInFormProps extends React.ComponentProps<"div"> {
  // onSuccess?: (data: SignInFormValues) => void;
  onNavigate?: (page: AuthPage) => void;
}

export function SignInForm({
  className,
  onNavigate,
  ...props
}: SignInFormProps) {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit: SubmitHandler<SignInFormValues> = (data) => {
    try {
      console.log("Form Data:", data);
      toast.success("Signed in successfully", {
        description: "Welcome back! Redirecting to your account.",
      });

      // If 2FA enabled
      // onNavigate?.("otp");
    } catch (error) {
      console.error("Sign in failed:", error);
      toast.error("Sign in failed", {
        description: "Please check your email and password and try again.",
      });
    }
  };

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form
        id="sign-in-form"
        onSubmit={
          form.handleSubmit(onSubmit) as
            | React.FormEventHandler<HTMLFormElement>
            | undefined
        }
      >
        <FieldGroup className="gap-4">
          {/* Email Field */}
          <Controller
            name="email"
            control={form.control}
            rules={{ required: true }} // include validation with required or other standard HTML validation rules
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="sign-in-email"
                  className="text-sm font-medium"
                >
                  Email*
                </FieldLabel>
                <Input
                  {...field}
                  id="sign-in-email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                />
                <FieldDescription>
                  Enter the email address associated with your account.
                </FieldDescription>
                {/* errors will return when field validation fails  */}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="sign-in-password"
                    className="text-sm font-medium"
                  >
                    Password*
                  </FieldLabel>
                  <Button
                    variant="link"
                    type="button"
                    className="text-muted-foreground hover:text-primary size-auto p-0 text-xs"
                    tabIndex={-1}
                    onClick={() => onNavigate?.("forgot_password")}
                  >
                    Forgot password?
                  </Button>
                </div>
                <Input
                  {...field}
                  id="sign-in-password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Remember Me */}
          <Controller
            name="remember"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <Field orientation="horizontal" className="gap-3">
                <Checkbox
                  id="remember-me"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel
                  htmlFor="remember-me"
                  className="cursor-pointer text-sm font-normal"
                >
                  Remember Me
                </FieldLabel>
              </Field>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </FieldGroup>
      </form>
      <div className="text-center text-sm">
        <span className="text-muted-foreground">New on our platform? </span>
        <Button
          variant="link"
          type="button"
          onClick={() => onNavigate?.("sign_up")}
          className="text-primary h-auto p-0 font-semibold"
        >
          Create an account
        </Button>
      </div>
    </div>
  );
}
