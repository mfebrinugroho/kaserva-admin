import { z } from "zod";

export const createMenuSchema = z.object({
  name: z
    .string()
    .min(1, "Nama harus diisi!")
    .max(100, "Nama toko maksimal 100 karakter"),

  description: z
    .string()
    .min(1, "Deskripsi harus diisi!")
    .max(255, "Deskripsi terlalu panjang"),

  price: z.number({ error: "Harga wajib diisi" }),

  categories: z.number({
    error: "Kategori wajib dipilih",
  }),
});

export type CreateMenuFormData = z.infer<typeof createMenuSchema>;
