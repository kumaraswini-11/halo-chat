"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail, Search, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { InputFieldComponent } from "@/components/shared/input-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Zod schema for validation
const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export const InputFieldExamples = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    toast.success("Form submitted", {
      description: (
        <pre className="mt-2 bg-neutral-950 text-white p-4 rounded-md">
          {JSON.stringify(values, null, 2)}
        </pre>
      ),
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const ReactHookExample = (
    <div className="pt-6 border-t">
      <h3 className="text-lg font-semibold">With React Hook Form + Zod</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputFieldComponent
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    leftIcon={<Mail className="size-4" />}
                    error={form.formState.errors.email?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputFieldComponent
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    leftIcon={<Lock className="size-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-muted-foreground hover:text-foreground transition"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    }
                    error={form.formState.errors.password?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Input Fields</h2>

      {/* 1. Basic input */}
      <InputFieldComponent placeholder="Enter text" />

      {/* 2. With label */}
      <InputFieldComponent label="Username" placeholder="Your username" />

      {/* 3. With label inline */}
      <InputFieldComponent
        label="Username"
        wrapperClassName="flex items-center gap-4"
        placeholder="Your username"
      />

      {/* 4. With left icon */}
      <InputFieldComponent
        label="Email"
        placeholder="you@example.com"
        autoComplete="email"
        leftIcon={<Mail className="size-4" />}
      />

      {/* 5. With right icon */}
      <InputFieldComponent
        label="Password"
        placeholder="********"
        type="password"
        rightIcon={<Lock className="size-4" />}
      />

      {/* 6. Password with toggle */}
      <InputFieldComponent
        label="Password"
        placeholder="Enter password"
        type={showPassword ? "text" : "password"}
        leftIcon={<Lock className="size-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground transition"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
      />

      {/* 7. With description */}
      <InputFieldComponent
        label="Username"
        placeholder="Your handle"
        description="3–16 characters, no spaces."
      />

      {/* 8. With error */}
      <InputFieldComponent
        label="Email"
        placeholder="you@example.com"
        error="Invalid email address"
      />

      {/* 9. Required field */}
      <InputFieldComponent label="Full name" placeholder="John Doe" required />

      {/* 10. Disabled */}
      <InputFieldComponent label="Disabled input" placeholder="Can't type here" disabled />

      {/* 11. Loading */}
      <InputFieldComponent label="Loading state" placeholder="Waiting..." loading />

      {/* 12. Full combo */}
      <InputFieldComponent
        label="Username"
        placeholder="Your handle"
        leftIcon={<User className="size-4" />}
        rightIcon={<Loader2 className="size-4 animate-spin" />}
        description="Only letters, numbers, and underscores."
        error=""
        required
      />

      {/* 13. Custom styled */}
      <InputFieldComponent
        label="Custom styled"
        placeholder="Custom input"
        className="bg-yellow-500/50 border-blue-500"
        labelClassName="text-sm font-semibold text-primary"
        description="Styled using className props"
        descriptionClassName="italic"
      />

      {/* 14. Search input */}
      <InputFieldComponent
        placeholder="Search..."
        type="search"
        leftIcon={<Search strokeWidth={2.5} className="size-4" />}
        value={searchValue}
        onChange={handleOnChange}
      />

      {/* 15. React Hook Form Example */}
      {ReactHookExample}
    </section>
  );
};
