import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/input/Label";
import SelectSearch from "@/components/ui/input/SelectSearch";
import Textarea from "@/components/ui/input/Textarea";
import { PATH } from "@/routes/path";
import type { CreateMenuFormData } from "@/schemas/createMenus.schema";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router";

interface MenuFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CreateMenuFormData>;
  errors: FieldErrors<CreateMenuFormData>;
  isSubmitting: boolean;
  control: Control<CreateMenuFormData>;
  // isDirty: boolean;
  // isPending: boolean;
}

const CreateMenuForm = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
  control,
}: MenuFormProps) => {
  return (
    <>
      <h1 className="font-bold dark:text-white">Ini Form Tambah Menu Form</h1>
      <form onSubmit={onSubmit}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Nama Menu</Label>
            <Input
              type="text"
              id="name"
              placeholder="Nama Menu"
              {...register("name")}
              error={!!errors.name}
              hint={errors.name?.message}
            />
          </div>
          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              placeholder="Masukkan deskripsi menu Anda"
              {...register("description")}
              error={!!errors.description}
              hint={errors.description?.message}
            />
          </div>
          <div>
            <Label htmlFor="price">Harga</Label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  customInput={Input}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                  allowNegative={false}
                  placeholder="Masukkan harga menu anda"
                  id="price"
                  value={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue ?? 0);
                  }}
                  error={!!errors.price}
                  hint={errors.price?.message}
                />
              )}
            />
          </div>
          <div>
            <Label htmlFor="categories">Kategori</Label>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <SelectSearch
                  options={[
                    { value: 1, label: "Makanan" },
                    { value: 2, label: "Minuman" },
                    { value: 3, label: "Dessert" },
                    { value: 4, label: "Snack" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Pilih Kategori Anda"
                  error={!!errors.categories}
                  hint={errors.categories?.message}
                />
              )}
            />
          </div>

          <div className="flex justify-center sm:justify-end gap-4">
            <Link
              to={PATH.MENUS}
              className="w-full sm:w-30 text-center rounded-lg bg-error-500 px-4 py-3 text-sm font-medium text-white transition shadow-theme-xs hover:bg-error-600"
            >
              Kembali
            </Link>
            <button
              // disabled={!isDirty || isSubmitting || isPending}
              disabled={isSubmitting}
              type="submit"
              className="w-full sm:w-30 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white transition shadow-theme-xs hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-brand-500"
            >
              {/* {isPending ? "Menyimpan..." : "Simpan"} */}
              Simpan
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateMenuForm;
