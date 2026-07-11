import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import { CreateStoreForm } from "@/components/form/stores/CreateStoreForm";
import { PATH } from "@/routes/path";
import {
  createStoreSchema,
  type CreateStoreFormData,
  type CreateStoreFormInput,
} from "@/schemas/createStore.schema";
import { storeService } from "@/services/store.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CreateStorePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<CreateStoreFormInput, any, CreateStoreFormData>({
    defaultValues: {
      name: "",
      description: "",
      phone: "",
      address: "",
      is_active: "",
    },
    resolver: zodResolver(createStoreSchema),
  });

  const createStoreMutation = useMutation({
    mutationFn: storeService.create,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["stores"],
      });
      toast.success(response.message);
      navigate(PATH.STORES);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const validationErrors = error.response.data.errors;

        Object.entries(validationErrors).forEach(([field, messages]) => {
          setError(field as keyof CreateStoreFormData, {
            type: "server",
            message: (messages as string[])[0],
          });
        });

        return;
      }

      toast.error("Terjadi kesalahan.");
    },
  });

  const onSubmit = (data: CreateStoreFormData) => {
    createStoreMutation.mutate(data);
  };

  return (
    <>
      <PageHeader title="Tambah Resto/Toko" />
      <div className="space-y-6">
        <ComponentCard title="Tambah Data Resto/Toko">
          <CreateStoreForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            isDirty={isDirty}
            isPending={createStoreMutation.isPending}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default CreateStorePage;
