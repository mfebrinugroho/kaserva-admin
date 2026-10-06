import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import BackButton from "@/components/button/BackButton";
import SubmitButton from "@/components/button/SubmitButton";
import FormSkeleton from "@/components/loading/FormSkeleton";
import FileInput from "@/components/ui/input/FileInput";
import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/input/Label";
import Textarea from "@/components/ui/input/Textarea";
import { useUpdateStore } from "@/hooks/mutations/useUpdateStore";
import { useStore } from "@/hooks/queries/useStore";
import { PATH } from "@/routes/path";
import {
  type UpdateStoreFormData,
  updateStoreSchema,
} from "@/schemas/updateStore.schema";
import { handleFormError } from "@/utils/handleFormError";

interface Props {
  storeId: number;
}

const StoreEditForm = ({ storeId }: Props) => {
  const navigate = useNavigate();
  const { data: store, isLoading: isLoadingStore } = useStore(storeId);

  const updateStore = useUpdateStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<UpdateStoreFormData>({
    defaultValues: {
      name: "",
      description: "",
      phone: "",
      address: "",
      image: undefined,
      banner: undefined,
    },
    resolver: zodResolver(updateStoreSchema),
  });

  useEffect(() => {
    if (!store) return;

    reset({
      name: store.data.name,
      description: store.data.description,
      phone: store.data.phone,
      address: store.data.address,
      image: undefined,
      banner: undefined,
    });
  }, [store, reset]);

  const onSubmit = (data: UpdateStoreFormData) => {
    updateStore.mutate(
      {
        storeId,
        data,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          navigate(PATH.STORES);
        },
        onError: (error) => {
          const isValidationError = handleFormError<UpdateStoreFormData>(
            error,
            setError,
          );

          if (isValidationError) return;

          toast.error("Terjadi kesalahan.");
        },
      },
    );
  };

  if (isLoadingStore || !store) {
    return <FormSkeleton />;
  }

  return (
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
          <BackButton url={PATH.STORES} />
          <SubmitButton
            disabled={!isDirty || updateStore.isPending}
            text={updateStore.isPending ? "Menyimpan..." : "Simpan"}
          />
        </div>
      </div>
    </form>
  );
};

export default StoreEditForm;
