import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user.service";

interface UserQueryParams {
  page: number;
  limit: number;
  search: string;
}

export const useUsers = (params: UserQueryParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => await userService.list(params),
  });
};
