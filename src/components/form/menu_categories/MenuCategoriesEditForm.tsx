import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/input/Label";
import Select from "@/components/ui/input/Select";
import { useUpdateMenuCategory } from "@/hooks/mutations/useUpdateMenuCategory";
import {
  type MenuCategoryFormInput,
  type MenuCategoryFormOutput,
  menuCategorySchema,
} from "@/schemas/menuCategory.schema";
import type { MenuCategory } from "@/types/menuCategory";
import { handleFormError } from "@/utils/handleFormError";

interface Props {
  onClose: () => void;
  menuCategory: MenuCategory | null;
}

const MenuCategoriesEditForm = ({ onClose, menuCategory }: Props) => {
  const categoryId = Number(menuCategory?.id);
  const updateMenuCategory = useUpdateMenuCategory();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<MenuCategoryFormInput, unknown, MenuCategoryFormOutput>({
    defaultValues: {
      store_id: undefined,
      name: "",
      sort_order: "",
      is_active: "",
    },
    resolver: zodResolver(menuCategorySchema),
  });

  useEffect(() => {
    if (!menuCategory) return;

    reset({
      store_id: menuCategory?.store_id,
      name: menuCategory?.name,
      sort_order: String(menuCategory?.sort_order),
      is_active: String(menuCategory?.is_active),
    });
  }, [menuCategory, reset]);

  const onSubmit = (data: MenuCategoryFormOutput) => {
    updateMenuCategory.mutate(
      {
        categoryId,
        data,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          onClose();
        },
        onError: (error) => {
          const isValidationError = handleFormError<MenuCategoryFormInput>(
            error,
            setError,
          );

          if (isValidationError) return;

          toast.error("Terjadi kesalahan.");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        Tambah Kategori Menu
      </h4>

      <div className="space-y-6">
        <div>
          <Label htmlFor="store_id">Resto/Toko</Label>
          <Input
            type="text"
            id="store_id"
            value={menuCategory?.store?.name}
            readOnly
          />
          <Input type="hidden" {...register("store_id")} />
        </div>

        <div>
          <Label htmlFor="name">Nama Kategori</Label>
          <Input
            type="text"
            id="name"
            placeholder="Nama Kategori"
            {...register("name")}
            error={!!errors.name}
            hint={errors.name?.message}
          />
        </div>

        <div>
          <Label htmlFor="sort_order">Urutan</Label>
          <Input
            type="text"
            id="sort_order"
            placeholder="Urutan"
            {...register("sort_order")}
            error={!!errors.sort_order}
            hint={errors.sort_order?.message}
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
          disabled={!isDirty || updateMenuCategory.isPending}
          className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 sm:w-auto hover:cursor-pointer disabled:hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updateMenuCategory.isPending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
};

export default MenuCategoriesEditForm;
