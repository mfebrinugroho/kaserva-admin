import { useMutation, useQueryClient } from "@tanstack/react-query";
import { menuService } from "@/services/menus.service";

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuService.create,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["menus"],
        refetchType: "all",
      });
    },
  });
};
