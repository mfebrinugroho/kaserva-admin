import { storeService } from "@/services/store.service";
import { useQuery } from "@tanstack/react-query";

interface StoreQueryParams {
  page: number;
  limit: number;
  search: string;
}

export const useStores = (params: StoreQueryParams) => {
  return useQuery({
    queryKey: ["stores", params],
    queryFn: async () => await storeService.list(params),
  });
};
