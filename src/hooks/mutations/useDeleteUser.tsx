import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.delete,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
