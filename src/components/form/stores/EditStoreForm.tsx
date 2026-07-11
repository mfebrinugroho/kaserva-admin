import FileInput from "@/components/ui/input/FileInput";
import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/input/Label";
import Textarea from "@/components/ui/input/Textarea";
import { PATH } from "@/routes/path";
import type { EditStoreFormData } from "@/schemas/editStore.schema";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Link } from "react-router";

interface StoreFormProps {
  // onSubmit: React.FormEventHandler<HTMLFormElement>;
  onSubmit: (e?: React.BaseSyntheticEvent) => void | Promise<void>;
  register: UseFormRegister<EditStoreFormData>;
  errors: FieldErrors<EditStoreFormData>;
  isSubmitting: boolean;
  isPending: boolean;
  control: Control<EditStoreFormData>;
}

const EditStoreForm = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
  control,
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
            <Label htmlFor="image">Image</Label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <FileInput
                  id="image"
                  error={!!errors.image}
                  hint={errors.image?.message}
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    field.onChange(file);
                  }}
                />
              )}
            />
          </div>
          <div>
            <Label htmlFor="banner">Banner</Label>
            <Controller
              name="banner"
              control={control}
              render={({ field }) => (
                <FileInput
                  id="banner"
                  error={!!errors.banner}
                  hint={errors.banner?.message}
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    field.onChange(file);
                  }}
                />
              )}
            />
          </div>

          <div className="flex justify-center sm:justify-end gap-4">
            <Link
              to={PATH.STORES}
              className="w-full sm:w-30 text-center rounded-lg bg-error-500 px-4 py-3 text-sm font-medium text-white transition shadow-theme-xs hover:bg-error-600"
            >
              Kembali
            </Link>
            <button
              disabled={isSubmitting || isPending}
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

export default EditStoreForm;
