import { z } from "zod";

export const menuSchema = z.object({
  // store_id: z.string().min(1, "Toko wajib diisi").pipe(z.coerce.number()),

  // menu_category_id: z
  //   .string()
  //   .min(1, "Kategori menu wajib diisi")
  //   .pipe(z.coerce.number()),

  store_id: z.coerce.number<string | number>().min(1, "Toko wajib diisi"),

  menu_category_id: z.coerce
    .number<string | number>()
    .min(1, "Kategori menu wajib diisi"),

  name: z
    .string()
    .min(1, "Nama harus diisi!")
    .max(100, "Nama toko maksimal 100 karakter"),

  description: z
    .string()
    .min(1, "Deskripsi harus diisi!")
    .max(255, "Deskripsi terlalu panjang"),

  price: z
    .number({
      error: "Harga wajib dipilih",
    })
    .min(1, "Harga wajib diisi"),

  image: z
    .instanceof(File)
    .refine((file) => file.size <= 1024 * 1024, {
      message: "Ukuran maksimal 1MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type,
        ),
      {
        message: "Format gambar tidak didukung",
      },
    )
    .nullable()
    .optional(),

  sort_order: z
    .string()
    .min(1, "Urutan wajib diisi")
    .regex(/^\d+$/, "Urutan harus berupa angka")
    .pipe(z.coerce.number()),

  is_available: z
    .string()
    .min(1, "Status wajib dipilih")
    .transform((value) => value === "true"),
});

export type MenuFormInput = z.input<typeof menuSchema>;
export type MenuFormOutput = z.output<typeof menuSchema>;
