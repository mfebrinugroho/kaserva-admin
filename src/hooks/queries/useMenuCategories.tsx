import { useQuery } from "@tanstack/react-query";
import { menuCategoriesService } from "@/services/menuCategories.service";

interface MenuCategoryQueryParams {
  page: number;
  limit: number;
  search: string;
}

export const useMenuCategories = (params: MenuCategoryQueryParams) => {
  return useQuery({
    queryKey: ["menu-categories", params],
    queryFn: async () => await menuCategoriesService.list(params),
  });
};
