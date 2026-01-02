import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/user";

export default function useGetAllUsers(filters: Record<string, any>) {
  return useQuery({
    queryKey: ["all-users", filters],
    queryFn: () => getAllUsers(filters),
  });
}
