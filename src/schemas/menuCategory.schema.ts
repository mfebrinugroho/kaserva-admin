import { z } from "zod";

export const menuCategorySchema = z.object({
  store_id: z
    .number({
      error: "Resto/Toko wajib dipilih",
    })
    .min(1, "Toko wajib diisi")
    .pipe(z.coerce.number()),

  name: z
    .string()
    .min(1, "Nama wajib diisi")
    .max(225, "Nama maksimal 225 karakter"),

  sort_order: z
    .string()
    .min(1, "Urutan wajib diisi")
    .regex(/^\d+$/, "Urutan harus berupa angka")
    .pipe(z.coerce.number()),

  is_active: z
    .string()
    .min(1, "Status wajib dipilih")
    .transform((value) => value === "true"),
});

export type MenuCategoryFormInput = z.input<typeof menuCategorySchema>;
export type MenuCategoryFormOutput = z.output<typeof menuCategorySchema>;
