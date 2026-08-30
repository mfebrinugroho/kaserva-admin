import { storeService } from "@/services/store.service";
import { useQuery } from "@tanstack/react-query";

export const useStoreOperatingHours = (storeId: number) => {
  return useQuery({
    queryKey: ["store", "operating-hours", storeId],
    queryFn: () => storeService.operatingHours({ storeId }),
    select: (response) => response.data,
    enabled: !!storeId,
    staleTime: 0,
  });
};
