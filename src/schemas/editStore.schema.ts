import { z } from "zod";

export const editStoreSchema = z.object({
  name: z
    .string()
    .min(1, "Nama resto/toko tidak boleh kosong")
    .max(100, "Nama toko maksimal 100 karakter"),

  description: z.string().max(255, "Deskripsi terlalu panjang").optional(),

  phone: z.string().max(20, "Nomor HP terlalu panjang").optional(),

  address: z.string().optional(),

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

  banner: z
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
});

export type EditStoreFormData = z.infer<typeof editStoreSchema>;
