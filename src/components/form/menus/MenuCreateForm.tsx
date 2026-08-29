import BackButton from "@/components/button/BackButton";
import SubmitButton from "@/components/button/SubmitButton";
import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/input/Label";
import Select from "@/components/ui/input/Select";
import SelectSearch from "@/components/ui/input/SelectSearch";
import Textarea from "@/components/ui/input/Textarea";
import { useCreateMenu } from "@/hooks/mutations/useCreateMenu";
import { useMenuCategoriesOption } from "@/hooks/queries/useMenuCategoriesOption";
import { useStoresOption } from "@/hooks/queries/useStoresOption";
import { PATH } from "@/routes/path";
import {
  menuSchema,
  type MenuFormInput,
  type MenuFormOutput,
} from "@/schemas/menu.schema";
import { handleFormError } from "@/utils/handleFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const MenuCreateForm = () => {
  const navigate = useNavigate();

  const createMenu = useCreateMenu();

  const {
    register,
    control,
    watch,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<MenuFormInput, unknown, MenuFormOutput>({
    defaultValues: {
      store_id: "",
      menu_category_id: "",
      name: "",
      description: "",
      price: 0,
      image: null,
      sort_order: "",
      is_available: "",
    },
    resolver: zodResolver(menuSchema),
  });

  const selectedStoreId = watch("store_id");

  const { data: stores, isLoading: isLoadingStores } = useStoresOption();

  const { data: menuCategories, isLoading: isLoadingMenuCategories } =
    useMenuCategoriesOption({ storeId: Number(selectedStoreId) });

  const onSubmit = (data: MenuFormOutput) => {
    createMenu.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        navigate(PATH.MENUS);
      },

      onError: (error) => {
        const isValidationError = handleFormError<MenuFormInput>(
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
            <Label htmlFor="store_id">Resto/Toko</Label>
            <Controller
              name="store_id"
              control={control}
              render={({ field }) => (
                <SelectSearch
                  options={
                    stores?.data.map((store) => ({
                      value: store.id,
                      label: store.name,
                    })) ?? []
                  }
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={
                    isLoadingStores ? "Memuat data.." : "Pilih Resto/Toko Anda"
                  }
                  error={!!errors.store_id}
                  hint={errors.store_id?.message}
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="menu_category_id">Resto/Toko</Label>
            <Controller
              name="menu_category_id"
              control={control}
              render={({ field }) => (
                <SelectSearch
                  options={
                    menuCategories?.data.map((category) => ({
                      value: category.id,
                      label: category.name,
                    })) ?? []
                  }
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={
                    isLoadingMenuCategories
                      ? "Memuat data.."
                      : "Pilih Kategori menu Anda"
                  }
                  error={!!errors.menu_category_id}
                  hint={errors.menu_category_id?.message}
                />
              )}
            />
          </div>

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
            <Label htmlFor="is_available">Ketersediaan</Label>
            <Select
              placeholder="-- Pilih Ketersediaan -- "
              {...register("is_available")}
              error={!!errors.is_available}
              hint={errors.is_available?.message}
            >
              <option
                value="true"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Tersedia
              </option>
              <option
                value="false"
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                Tidak Tersedia
              </option>
            </Select>
          </div>

          <div className="flex justify-center sm:justify-end gap-4">
            <BackButton url={PATH.MENUS} />
            <SubmitButton
              disabled={!isDirty || createMenu.isPending}
              text={createMenu.isPending ? "Menyimpan..." : "Simpan"}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default MenuCreateForm;
