import { getDesigns } from "@/api/design";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllDesigns(filters: any) {
  return useQuery({
    queryKey: ["all-designs"],
    queryFn: () => getDesigns(filters),
  });
}
