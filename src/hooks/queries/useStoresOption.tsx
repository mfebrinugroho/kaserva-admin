import { useQuery } from "@tanstack/react-query";
import { storeService } from "@/services/store.service";

export const useStoresOption = () => {
  return useQuery({
    queryKey: ["stores", "options"],
    queryFn: storeService.options,
  });
};
