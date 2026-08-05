import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import EditStoreForm from "@/components/form/stores/EditStoreForm";
import LoadingFetchData from "@/components/ui/loading/LoadingFetchData";
import { PATH } from "@/routes/path";
import {
  editStoreSchema,
  type EditStoreFormData,
} from "@/schemas/editStore.schema";
import { storeService } from "@/services/store.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const EditStorePage = () => {
  const { id } = useParams();
  const storeId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditStoreFormData>({
    defaultValues: {
      name: "",
      description: "",
      phone: "",
      address: "",
      image: undefined,
      banner: undefined,
    },
    resolver: zodResolver(editStoreSchema),
  });

  const { data: store, isLoading } = useQuery({
    queryKey: ["store", storeId],
    queryFn: async () => storeService.show(storeId),
    staleTime: 0,
  });

  useEffect(() => {
    if (!store) return;

    reset({
      name: store.data.name,
      description: store.data.description ?? "",
      phone: store.data.phone ?? "",
      address: store.data.address ?? "",
      image: undefined,
      banner: undefined,
    });
  }, [store, reset]);

  const editStoreMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: EditStoreFormData }) =>
      storeService.update(id, data),
    onSuccess: (response, variables) => {
      // Update cache detail store
      queryClient.setQueryData(["store", variables.id], response);

      // Refresh list store
      queryClient.invalidateQueries({
        queryKey: ["stores"],
      });

      toast.success(response.message);

      navigate(PATH.STORES);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const validationErrors = error.response.data.errors;

        Object.entries(validationErrors).forEach(([field, messages]) => {
          setError(field as keyof EditStoreFormData, {
            type: "server",
            message: (messages as string[])[0],
          });
        });

        return;
      }

      toast.error("Terjadi kesalahan.");
    },
  });

  const onSubmit = (data: EditStoreFormData) => {
    editStoreMutation.mutate({
      id: storeId,
      data,
    });
  };

  if (isLoading || !store) {
    return <LoadingFetchData />;
  }

  return (
    <>
      <PageHeader title="Edit Resto/Toko" />
      <div className="space-y-6">
        <ComponentCard title="Edit Data Resto/Toko">
          <EditStoreForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            control={control}
            isPending={editStoreMutation.isPending}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default EditStorePage;
