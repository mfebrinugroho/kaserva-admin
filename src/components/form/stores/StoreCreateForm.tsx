import BackButton from "@/components/button/BackButton";
import SubmitButton from "@/components/button/SubmitButton";
import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/input/Label";
import Select from "@/components/ui/input/Select";
import Textarea from "@/components/ui/input/Textarea";
import { useCreateStore } from "@/hooks/mutations/useCreateStore";
import { PATH } from "@/routes/path";
import {
  storeSchema,
  type StoreFormInput,
  type StoreFormOutput,
} from "@/schemas/store.schema";
import { handleFormError } from "@/utils/handleFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const StoreCreateForm = () => {
  const navigate = useNavigate();

  const createStore = useCreateStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<StoreFormInput, unknown, StoreFormOutput>({
    defaultValues: {
      name: "",
      description: "",
      phone: "",
      address: "",
      is_active: "",
    },
    resolver: zodResolver(storeSchema),
  });

  const onSubmit = (data: StoreFormOutput) => {
    createStore.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        navigate(PATH.STORES);
      },

      onError: (error) => {
        const isValidationError = handleFormError<StoreFormInput>(
          error,
          setError,
        );

        if (isValidationError) return;

        toast.error("Terjadi kesalahan.");
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Nama Resto/Toko</Label>
            <Input
              type="text"
              id="name"
              placeholder="Nama Resto/Toko"
              {...register("name")}
              error={!!errors.name}
              hint={errors.name?.message}
            />
          </div>
          <div>
            <Label htmlFor="description">Deskripsi </Label>
            <Textarea
              id="description"
              placeholder="Masukkan deskripsi toko Anda"
              {...register("description")}
              error={!!errors.description}
              hint={errors.description?.message}
            />
          </div>
          <div>
            <Label htmlFor="address">Alamat</Label>
            <Input
              type="text"
              id="address"
              placeholder="Alamat"
              {...register("address")}
              error={!!errors.address}
              hint={errors.address?.message}
            />
          </div>
          <div>
            <Label htmlFor="phone">Nomor HP</Label>
            <Input
              type="text"
              id="phone"
              placeholder="Nomor HP "
              {...register("phone")}
              error={!!errors.phone}
              hint={errors.phone?.message}
            />
          </div>
          <div>
            <Label htmlFor="is_active">Status</Label>
            <Select
              placeholder="-- Pilih Status -- "
              {...register("is_active")}
              error={!!errors.is_active}
              hint={errors.is_active?.message}
            >
              <option
                value="true"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Aktif
              </option>
              <option
                value="false"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Tidak Aktif
              </option>
            </Select>
          </div>

          <div className="flex justify-center sm:justify-end gap-4">
            <BackButton url={PATH.STORES} />
            <SubmitButton
              disabled={!isDirty || createStore.isPending}
              text={createStore.isPending ? "Menyimpan..." : "Simpan"}
            />
          </div>
        </div>
      </form>
    </>
  );
};
