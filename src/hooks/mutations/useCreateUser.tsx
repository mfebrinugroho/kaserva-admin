import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.create,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
        refetchType: "all",
      });
    },
  });
};
