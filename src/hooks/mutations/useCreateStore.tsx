import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeService } from "@/services/store.service";

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeService.create,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["stores"],
        refetchType: "all",
      });
    },
  });
};
