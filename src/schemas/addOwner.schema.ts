import { z } from "zod";

export const addOwnerSchema = z.object({
  user_id: z.number().min(1, "Owner wajib dipilih"),
  store_id: z.number().min(1, "Resto/Toko wajib dipilih"),
});

export type AddOwnerFormData = z.output<typeof addOwnerSchema>;
