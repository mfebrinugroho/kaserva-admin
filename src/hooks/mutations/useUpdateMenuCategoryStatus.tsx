import { useMutation, useQueryClient } from "@tanstack/react-query";
import { menuCategoriesService } from "@/services/menuCategories.service";
import type { ApiPaginatedResponse } from "@/types/api";
import type { MenuCategory } from "@/types/menuCategory";

interface MenuCategoryQueryParams {
  page: number;
  limit: number;
  search: string;
}

export const useUpdateMenuCategoryStatus = (
  params: MenuCategoryQueryParams,
) => {
  const queryClient = useQueryClient();

  const queryKey = ["menu-categories", params];

  return useMutation({
    mutationFn: menuCategoriesService.updateStatus,

    onMutate: async ({ id, is_active }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousMenuCategory = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (old: ApiPaginatedResponse<MenuCategory>) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((category: MenuCategory) =>
              category.id === id ? { ...category, is_active } : category,
            ),
          };
        },
      );

      return { previousMenuCategory };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.previousMenuCategory);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
};
