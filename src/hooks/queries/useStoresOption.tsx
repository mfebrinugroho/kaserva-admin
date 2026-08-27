import { storeService } from "@/services/store.service";
import { useQuery } from "@tanstack/react-query";

export const useStoresOption = () => {
  return useQuery({
    queryKey: ["stores", "options"],
    queryFn: storeService.options,
  });
};
