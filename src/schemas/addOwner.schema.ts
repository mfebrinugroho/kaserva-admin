import { z } from "zod";

export const addOwnerSchema = z.object({
  user_id: z.string().min(1, "Owner wajib dipilih").pipe(z.coerce.number()),
  store_id: z
    .string()
    .min(1, "Resto/Toko wajib dipilih")
    .pipe(z.coerce.number()),
});

export type AddOwnerFormInput = z.input<typeof addOwnerSchema>;
export type AddOwnerFormOutput = z.output<typeof addOwnerSchema>;
