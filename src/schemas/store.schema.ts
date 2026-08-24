import { z } from "zod";

export const storeSchema = z.object({
  name: z
    .string()
    .min(1, "Nama harus diisi!")
    .max(100, "Nama toko maksimal 100 karakter"),

  description: z.string().max(255, "Deskripsi terlalu panjang").optional(),

  phone: z.string().max(20, "Nomor HP terlalu panjang").optional(),

  address: z.string().optional(),

  is_active: z
    .string()
    .min(1, "Status wajib dipilih")
    .transform((value) => value === "true"),
});

export type StoreFormInput = z.input<typeof storeSchema>;
export type StoreFormOutput = z.output<typeof storeSchema>;
