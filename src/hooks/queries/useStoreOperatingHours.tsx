import { useQuery } from "@tanstack/react-query";
import { storeService } from "@/services/store.service";

export const useStoreOperatingHours = (storeId: number) => {
  return useQuery({
    queryKey: ["store", "operating-hours", storeId],
    queryFn: () => storeService.operatingHours({ storeId }),
    select: (response) => response.data,
    enabled: !!storeId,
    staleTime: 0,
  });
};
