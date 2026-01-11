import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import type { AuthPage } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const signUpFormSchema = z
  .object({
    email: z.email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(32, { message: "Password must be at most 32 characters." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

interface SignUpFormProps extends React.ComponentProps<"div"> {
  // onSuccess?: (data: SignUpFormValues) => void;
  onNavigate?: (page: AuthPage) => void;
}

const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 12.5;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;
  return strength;
};

export function SignUpForm({
  className,
  onNavigate,
  ...props
}: SignUpFormProps) {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = useWatch({
    control: form.control,
    name: "password",
    defaultValue: "",
  });

  const strength = getPasswordStrength(passwordValue);

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    try {
      // Simulate API call
      // void new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form Data:", data);
      toast.success("Account created successfully");
      onNavigate?.("verify_email");
    } catch (error) {
      console.log("Failed to create account ::", error);
      toast.error("Failed to create account");
    }
  };

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form
        id="sign-up-form"
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
                  htmlFor="sign-up-email"
                  className="text-sm font-medium"
                >
                  Email*
                </FieldLabel>
                <Input
                  {...field}
                  id="sign-up-email"
                  type="email"
                  placeholder="email@example.com"
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
                <FieldLabel
                  htmlFor="sign-up-password"
                  className="text-sm font-medium"
                >
                  Password*
                </FieldLabel>
                <Input
                  {...field}
                  id="sign-up-password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                  required
                />

                {/* Password strength indicator */}
                {form.getValues("password")?.length > 0 && (
                  <>
                    <Progress
                      value={getPasswordStrength(form.getValues("password"))}
                      className="mt-2 h-1"
                    />
                    <p className="text-muted-foreground mt-1 text-xs">
                      Password strength:{" "}
                      {strength < 50
                        ? "Weak"
                        : strength < 75
                          ? "Medium"
                          : "Strong"}
                    </p>
                  </>
                )}

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Confirm Password Field */}
          <Controller
            name="confirmPassword"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="sign-up-confirm-password"
                  className="text-sm font-medium"
                >
                  Confirm Password*
                </FieldLabel>
                <Input
                  {...field}
                  id="sign-up-confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
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

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </FieldGroup>
      </form>
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Button
          variant="link"
          type="button"
          onClick={() => onNavigate?.("sign_in")}
          className="text-primary h-auto p-0 font-semibold"
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
