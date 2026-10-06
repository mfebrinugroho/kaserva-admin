import { useQuery } from "@tanstack/react-query";
import { menuService } from "@/services/menus.service";

export const useMenu = (id: number) => {
  return useQuery({
    queryKey: ["menu", id],
    queryFn: async () => await menuService.show(id),
    enabled: !!id,
    staleTime: 0,
  });
};
