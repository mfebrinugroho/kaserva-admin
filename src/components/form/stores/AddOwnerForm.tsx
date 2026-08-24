import Label from "@/components/ui/input/Label";
import Select from "@/components/ui/input/Select";
import {
  addOwnerSchema,
  type AddOwnerFormInput,
  type AddOwnerFormOutput,
} from "@/schemas/addOwner.schema";
import { storeService } from "@/services/store.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

const AddOwnerForm = ({ onClose }: Props) => {
  const queryClient = useQueryClient();

  const { data: owners, isLoading: isLoadingOwners } = useQuery({
    queryKey: ["owners", "options"],
    queryFn: async () => storeService.availableOwners(),
  });

  const { data: stores, isLoading: isLoadingStores } = useQuery({
    queryKey: ["stores", "options"],
    queryFn: async () => storeService.availableStores(),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<AddOwnerFormInput, unknown, AddOwnerFormOutput>({
    defaultValues: {
      user_id: "",
      store_id: "",
    },
    resolver: zodResolver(addOwnerSchema),
  });

  const addOwnerMutation = useMutation({
    mutationFn: storeService.addOwner,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["stores"],
      });

      toast.success(response.message);

      onClose();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const validationErrors = error.response.data.errors;

        Object.entries(validationErrors).forEach(([field, messages]) => {
          setError(field as keyof AddOwnerFormInput, {
            type: "server",
            message: (messages as string[])[0],
          });
        });

        return;
      }

      toast.error("Terjadi kesalahan.");
    },
  });

  const onSubmit = (data: AddOwnerFormOutput) => {
    addOwnerMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        Tambah Owner Resto/Toko
      </h4>

      <div className="space-y-6">
        <div>
          <Label htmlFor="owner">Pilih Owner</Label>
          <Select
            placeholder={
              isLoadingOwners ? "-- Memuat Data Owner --" : "-- Pilih Owner --"
            }
            id="owner"
            {...register("user_id")}
            error={!!errors.user_id}
            hint={errors.user_id?.message}
          >
            {owners?.data.map((owner) => (
              <option
                key={owner.id}
                value={owner.id}
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                {owner.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="store">Pilih Resto/Toko</Label>
          <Select
            placeholder={
              isLoadingStores
                ? "-- Memuat Data Resto/Toko --"
                : "-- Pilih Resto/Toko --"
            }
            id="store"
            {...register("store_id")}
            error={!!errors.store_id}
            hint={errors.store_id?.message}
          >
            {stores?.data.map((store) => (
              <option
                key={store.id}
                value={store.id}
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                {store.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs transition-colors hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 sm:w-auto"
        >
          Tutup
        </button>
        <button
          type="submit"
          disabled={!isDirty || addOwnerMutation.isPending}
          className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 sm:w-auto hover:cursor-pointer disabled:hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {addOwnerMutation.isPending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
};

export default AddOwnerForm;
