import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => await userService.show(id),
    enabled: !!id,
    staleTime: 0,
  });
};
