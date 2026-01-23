import { getDesign } from "@/api/design";
import { useQuery } from "@tanstack/react-query";

export function useGetDesign(designID: string) {
  return useQuery({
    queryKey: ["design", designID],
    queryFn: () => getDesign(designID),
  });
}
