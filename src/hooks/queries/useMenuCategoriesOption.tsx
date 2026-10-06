import { useQuery } from "@tanstack/react-query";
import { menuCategoriesService } from "@/services/menuCategories.service";

export const useMenuCategoriesOption = ({ storeId }: { storeId: number }) => {
  return useQuery({
    queryKey: ["menu-categories", "options", storeId],
    queryFn: async () => await menuCategoriesService.options(storeId),

    enabled: !!storeId,
  });
};
