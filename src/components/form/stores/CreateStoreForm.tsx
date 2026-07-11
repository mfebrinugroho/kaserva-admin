import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/input/Label";
import Select from "@/components/ui/input/Select";
import Textarea from "@/components/ui/input/Textarea";
import { PATH } from "@/routes/path";
import type { CreateStoreFormInput } from "@/schemas/createStore.schema";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Link } from "react-router";

interface StoreFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CreateStoreFormInput>;
  errors: FieldErrors<CreateStoreFormInput>;
  isSubmitting: boolean;
  isDirty: boolean;
  isPending: boolean;
}

export const CreateStoreForm = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
  isDirty,
  isPending,
}: StoreFormProps) => {
  return (
    <>
      <form onSubmit={onSubmit}>
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
            <Link
              to={PATH.STORES}
              className="w-full sm:w-30 text-center rounded-lg bg-error-500 px-4 py-3 text-sm font-medium text-white transition shadow-theme-xs hover:bg-error-600"
            >
              Kembali
            </Link>
            <button
              disabled={!isDirty || isSubmitting || isPending}
              type="submit"
              className="w-full sm:w-30 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white transition shadow-theme-xs hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-brand-500"
            >
              {isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
