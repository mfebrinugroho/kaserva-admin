import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAccessToken } from "@/libs/token-store";
import { login } from "@/services/authApi";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: async (response) => {
      setAccessToken(response.data.access_token);

      await queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });
    },
  });
};
