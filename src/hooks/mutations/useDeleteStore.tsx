import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeService } from "@/services/store.service";

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
