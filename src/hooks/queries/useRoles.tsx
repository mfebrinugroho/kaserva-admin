import { roleService } from "@/services/role.service";
import { useQuery } from "@tanstack/react-query";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: roleService.list,
  });
};
