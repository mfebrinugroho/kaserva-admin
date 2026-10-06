import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MenuFormOutput } from "@/schemas/menu.schema";
import { menuService } from "@/services/menus.service";

interface Props {
  menuId: number;
  data: MenuFormOutput;
}

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuId, data }: Props) => menuService.update(menuId, data),

    onSuccess: async (response, variables) => {
      queryClient.setQueryData(["menu", variables.menuId], response);

      await queryClient.invalidateQueries({
        queryKey: ["menus"],
        refetchType: "all",
      });
    },
  });
};
