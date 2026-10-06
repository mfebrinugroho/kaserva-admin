import { useQuery } from "@tanstack/react-query";
import { storeService } from "@/services/store.service";

export const useStore = (id: number) => {
  return useQuery({
    queryKey: ["store", id],
    queryFn: async () => await storeService.show(id),
    enabled: !!id,
    staleTime: 0,
  });
};
