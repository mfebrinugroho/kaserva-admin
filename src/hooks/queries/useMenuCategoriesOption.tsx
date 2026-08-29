import { menuCategoriesService } from "@/services/menuCategories.service";
import { useQuery } from "@tanstack/react-query";

export const useMenuCategoriesOption = ({ storeId }: { storeId: number }) => {
  return useQuery({
    queryKey: ["menu-categories", "options", storeId],
    queryFn: async () => await menuCategoriesService.options(storeId),

    enabled: !!storeId,
  });
};
