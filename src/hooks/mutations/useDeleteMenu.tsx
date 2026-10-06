import { useMutation, useQueryClient } from "@tanstack/react-query";
import { menuService } from "@/services/menus.service";

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
