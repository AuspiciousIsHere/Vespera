import { getPopularDesigns } from "@/api/design";
import type { GetPopularDesignsResponse } from "@/types/design";
import { useQuery } from "@tanstack/react-query";

const emptyDesignsResponse: GetPopularDesignsResponse = {
  status: "success",
  resultsCount: 0,
  data: [],
};

export function useGetPopularDesigns() {
  return useQuery({
    queryKey: ["popular"],
    queryFn: getPopularDesigns,
    placeholderData: emptyDesignsResponse,
  });
}
