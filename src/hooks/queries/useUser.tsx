import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => await userService.show(id),
    enabled: !!id,
    staleTime: 0,
  });
};
