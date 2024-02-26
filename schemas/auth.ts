import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("Email is required").min(1),
  password: z.string().min(6, "Password with 6 or more characters required"),
});

export const RegisterFormSchema = LoginFormSchema.extend({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  confirmPassword: z
    .string()
    .min(6, "Password with 6 or more characters required"),
});
