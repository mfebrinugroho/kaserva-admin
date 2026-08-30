import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeService } from "@/services/store.service";

export const useUpdateStoreOperatingHours = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeService.updateOperatingHours,

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["store", "operating-hours", variables.id],
      });

      await queryClient.invalidateQueries({
        queryKey: ["stores"],
      });
    },
  });
};
