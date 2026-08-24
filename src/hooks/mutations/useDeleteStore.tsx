import { storeService } from "@/services/store.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeService.delete,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["stores"],
      });
    },
  });
};
