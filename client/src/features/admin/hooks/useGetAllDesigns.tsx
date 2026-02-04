import { getDesigns } from "@/api/design";
import { useQuery } from "@tanstack/react-query";

export function useGetAllDesigns(filters: Record<string, any>) {
  return useQuery({
    queryKey: ["all-designs", filters],
    queryFn: () => getDesigns(filters),
  });
}
