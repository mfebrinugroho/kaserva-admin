import type { MenuCategoryFormOutput } from "@/schemas/menuCategory.schema";
import { menuCategoriesService } from "@/services/menuCategories.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  categoryId: number;
  data: MenuCategoryFormOutput;
}

export const useUpdateMenuCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, data }: Props) =>
      menuCategoriesService.update(categoryId, data),
    onSuccess: async (response, variables) => {
      queryClient.setQueryData(
        ["menu-category", variables.categoryId],
        response,
      );

      await queryClient.invalidateQueries({
        queryKey: ["menu-categories"],
        refetchType: "all",
      });
    },
  });
};
