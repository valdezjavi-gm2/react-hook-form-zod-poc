import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(5, "Street must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format (e.g. 12345 or 12345-6789)"),
});

export const userSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string()
    .email("Invalid email format"),
  age: z.number()
    .min(18, "Must be at least 18 years old")
    .max(120, "Invalid age"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  address: addressSchema,
  hobbies: z.array(z.string().min(1, "Hobby cannot be empty"))
    .min(1, "Add at least one hobby")
    .max(5, "Maximum 5 hobbies allowed"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type UserFormData = z.infer<typeof userSchema>;
