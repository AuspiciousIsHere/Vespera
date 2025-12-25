import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/user";

export default function useGetAllUsers() {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });
}
