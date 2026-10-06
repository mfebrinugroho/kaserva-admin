import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/authApi";

export function useMe(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    enabled: options?.enabled ?? true,
  });
}
