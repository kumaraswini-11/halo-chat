import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(32, { message: "Password must be at most 32 characters." }),
    confirmPassword: z.string().min(1, {
      message: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  // onNavigate?: (page: AuthPage) => void;
  onSubmit?: (data: ResetPasswordFormValues) => void;
}

export function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit: SubmitHandler<ResetPasswordFormValues> = (data) => {
    console.log("Reset Password Form Data:", data);
    onSubmit?.(data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-semibold">Create new password</h3>
        <p className="text-muted-foreground text-sm">
          Please enter your new password below.
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
          {/* New Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="new-password">New password*</FieldLabel>
                <Input
                  {...field}
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className="h-10"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirm-new-password">
                  Confirm new password*
                </FieldLabel>
                <Input
                  {...field}
                  id="confirm-new-password"
                  type="password"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
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
            {form.formState.isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
