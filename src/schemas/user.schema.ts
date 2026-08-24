import { z } from "zod";

export const userSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nama wajib diisi")
      .max(225, "Nama maksimal 225 karakter"),

    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),

    password: z.string().min(8, "Password minimal 8 karakter"),

    password_confirmation: z.string(),

    role_id: z.string().min(1, "Role wajib diisi").pipe(z.coerce.number()),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi password tidak sesuai",
    path: ["password_confirmation"],
  });

export type UserFormInput = z.input<typeof userSchema>;
export type UserFormOutput = z.output<typeof userSchema>;
