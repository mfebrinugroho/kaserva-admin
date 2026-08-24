import { storeService } from "@/services/store.service";
import type { ApiPaginatedResponse } from "@/types/api";
import type { Store } from "@/types/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface StoreQueryParams {
  page: number;
  limit: number;
  search: string;
}

export const useUpdateStoreStatus = (params: StoreQueryParams) => {
  const queryClient = useQueryClient();

  const queryKey = ["stores", params];

  return useMutation({
    mutationFn: storeService.updateStatus,

    onMutate: async ({ id, is_active }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousStores = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: ApiPaginatedResponse<Store>) => {
        if (!old) return old;

        return {
          ...old,
          data: old.data.map((store: Store) =>
            store.id === id ? { ...store, is_active } : store,
          ),
        };
      });

      return { previousStores };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.previousStores);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
};
