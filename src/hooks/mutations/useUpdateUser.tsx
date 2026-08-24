import type { UpdateUserFormOutput } from "@/schemas/updateUser.schema";
import { userService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  userId: number;
  data: UpdateUserFormOutput;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: Props) => userService.update(userId, data),
    onSuccess: async (response, variables) => {
      queryClient.setQueryData(["user", variables.userId], response);

      await queryClient.invalidateQueries({
        queryKey: ["users"],
        refetchType: "all",
      });
    },
  });
};
