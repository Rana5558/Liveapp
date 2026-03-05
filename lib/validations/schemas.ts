import { z } from "zod";

// ─── Login (Doctor & Patient) ───────────────────────────────────────────────
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});
export type LoginFormData = z.infer<typeof loginSchema>;

// ─── Doctor Register ─────────────────────────────────────────────────────────
export const doctorRegisterSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    phoneNumber: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\d{7,15}$/, "Enter a valid phone number (7–15 digits)"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
    birthDate: z
        .string()
        .min(1, "Date of birth is required"),
});
export type DoctorRegisterFormData = z.infer<typeof doctorRegisterSchema>;

// ─── Patient Register ─────────────────────────────────────────────────────────
export const patientRegisterSchema = z
    .object({
        fullName: z
            .string()
            .min(1, "Full name is required")
            .min(2, "Name must be at least 2 characters"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Enter a valid email address"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        agreedToTerms: z.boolean().refine((val) => val === true, {
            message: "You must agree to the terms & conditions",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export type PatientRegisterFormData = z.infer<typeof patientRegisterSchema>;

// ─── Feedback ────────────────────────────────────────────────────────────────
export const feedbackSchema = z.object({
    rating: z
        .number()
        .min(1, "Please select a rating")
        .max(5, "Rating must be at most 5"),
    category: z.string().min(1, "Please select a category"),
    message: z
        .string()
        .min(1, "Message is required")
        .min(10, "Message must be at least 10 characters")
        .max(500, "Message must not exceed 500 characters"),
});
export type FeedbackFormData = z.infer<typeof feedbackSchema>;

// ─── Profile ─────────────────────────────────────────────────────────────────
export const profileSchema = z.object({
    fullName: z
        .string()
        .min(1, "Full name is required")
        .min(2, "Name must be at least 2 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
});
export type ProfileFormData = z.infer<typeof profileSchema>;

export const passwordSchema = z
    .object({
        password: z
            .string()
            .min(1, "New password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export type PasswordFormData = z.infer<typeof passwordSchema>;

// ─── Invite ───────────────────────────────────────────────────────────────────
export const inviteSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
});
export type InviteFormData = z.infer<typeof inviteSchema>;
