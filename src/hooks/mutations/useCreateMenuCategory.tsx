import { useMutation, useQueryClient } from "@tanstack/react-query";
import { menuCategoriesService } from "@/services/menuCategories.service";

export const useCreateMenuCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuCategoriesService.create,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["menu-categories"],
        refetchType: "all",
      });
    },
  });
};
