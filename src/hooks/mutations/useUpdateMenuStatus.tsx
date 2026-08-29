import { menuService } from "@/services/menus.service";
import type { ApiPaginatedResponse } from "@/types/api";
import type { Menu } from "@/types/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MenuQueryParams {
  page: number;
  limit: number;
  search: string;
}

export const useUpdateMenuStatus = (params: MenuQueryParams) => {
  const queryClient = useQueryClient();

  const queryKey = ["menus", params];

  return useMutation({
    mutationFn: menuService.updateStatus,

    onMutate: async ({ id, is_available }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousMenus = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: ApiPaginatedResponse<Menu>) => {
        if (!old) return old;

        return {
          ...old,
          data: old.data.map((menu: Menu) =>
            menu.id === id ? { ...menu, is_available } : menu,
          ),
        };
      });

      return { previousMenus };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.previousMenus);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
};
