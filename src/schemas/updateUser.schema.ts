import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Nama wajib diisi")
    .max(225, "Nama maksimal 225 karakter"),

  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),

  role_id: z.string().min(1, "Role wajib diisi").pipe(z.coerce.number()),
});

export type UpdateUserFormInput = z.input<typeof updateUserSchema>;
export type UpdateUserFormOutput = z.output<typeof updateUserSchema>;
