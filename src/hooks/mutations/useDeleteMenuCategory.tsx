import { useMutation, useQueryClient } from "@tanstack/react-query";
import { menuCategoriesService } from "@/services/menuCategories.service";

export const useDeleteMenuCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuCategoriesService.delete,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["menu-categories"],
      });
    },
  });
};
