import { storeService } from "@/services/store.service";
import { useQuery } from "@tanstack/react-query";

export const useStore = (id: number) => {
  return useQuery({
    queryKey: ["store", id],
    queryFn: async () => await storeService.show(id),
    enabled: !!id,
    staleTime: 0,
  });
};
