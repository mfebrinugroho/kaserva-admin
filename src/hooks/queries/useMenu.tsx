import { menuService } from "@/services/menus.service";
import { useQuery } from "@tanstack/react-query";

export const useMenu = (id: number) => {
  return useQuery({
    queryKey: ["menu", id],
    queryFn: async () => await menuService.show(id),
    enabled: !!id,
    staleTime: 0,
  });
};
