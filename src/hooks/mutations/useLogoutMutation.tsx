import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/services/authApi";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Gagal menghapus session di server:", error);
    },
  });
};
