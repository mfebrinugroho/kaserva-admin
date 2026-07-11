import { z } from "zod";

export const editStoreSchema = z.object({
  name: z
    .string()
    .min(1, "Nama resto/toko tidak boleh kosong")
    .max(100, "Nama toko maksimal 100 karakter"),

  description: z
    .string()
    .min(10, "Deskripsi terlalu pendek")
    .max(255, "Deskripsi terlalu panjang"),

  phone: z
    .string()
    .min(10, "Nomor HP minimal 10 digit")
    .max(20, "Nomor HP terlalu panjang"),

  address: z.string().min(5, "Alamat terlalu pendek"),

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
