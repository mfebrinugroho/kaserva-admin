import type { UpdateStoreFormData } from "@/schemas/updateStore.schema";
import { storeService } from "@/services/store.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  storeId: number;
  data: UpdateStoreFormData;
}

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, data }: Props) =>
      storeService.update(storeId, data),

    onSuccess: async (response, variables) => {
      queryClient.setQueryData(["store", variables.storeId], response);

      await queryClient.invalidateQueries({
        queryKey: ["stores"],
        refetchType: "all",
      });
    },
  });
};
