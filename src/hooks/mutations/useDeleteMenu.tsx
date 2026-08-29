import { menuService } from "@/services/menus.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuService.delete,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["menus"],
      });
    },
  });
};
