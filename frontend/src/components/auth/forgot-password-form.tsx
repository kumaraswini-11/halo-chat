import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Lock } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import type { AuthPage } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const forgotPasswordSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onNavigate?: (page: AuthPage) => void;
}

export function ForgotPasswordForm({ onNavigate }: ForgotPasswordFormProps) {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit: SubmitHandler<ForgotPasswordFormValues> = (data) => {
    console.log("Forgot Password Form Data:", data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="bg-primary/10 mx-auto mb-4 flex size-14 items-center justify-center rounded-full">
          <Lock className="text-primary size-6" />
        </div>
        <h3 className="text-xl font-semibold">Forgot your password?</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          No worries! Enter your email address and we'll send you a link to
          reset your password.
        </p>
      </div>

      <form
        onSubmit={
          form.handleSubmit(handleSubmit) as
            | React.FormEventHandler<HTMLFormElement>
            | undefined
        }
      >
        <FieldGroup className="gap-4">
          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reset-email">Email address*</FieldLabel>
                <Input
                  {...field}
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="h-10"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Sending link..."
              : "Send reset link"}
          </Button>
        </FieldGroup>
      </form>

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
