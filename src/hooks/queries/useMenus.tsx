import { menuService } from "@/services/menus.service";
import { useQuery } from "@tanstack/react-query";

interface UserQueryParams {
  page: number;
  limit: number;
  search: string;
}

export const useMenus = (params: UserQueryParams) => {
  return useQuery({
    queryKey: ["menus", params],
    queryFn: async () => await menuService.list(params),
  });
};
