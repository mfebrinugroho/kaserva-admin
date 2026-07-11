import { z } from "zod";

export const createStoreSchema = z.object({
  name: z.string().max(100, "Nama toko maksimal 100 karakter").optional(),

  description: z.string().max(255, "Deskripsi terlalu panjang").optional(),

  phone: z.string().max(20, "Nomor HP terlalu panjang").optional(),

  address: z.string().optional(),

  is_active: z
    .string()
    .min(1, "Status wajib dipilih")
    .transform((value) => value === "true"),
});

export type CreateStoreFormData = z.infer<typeof createStoreSchema>;
export type CreateStoreFormInput = z.input<typeof createStoreSchema>;
