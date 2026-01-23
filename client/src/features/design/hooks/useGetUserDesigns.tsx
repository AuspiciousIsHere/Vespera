import { useQuery } from "@tanstack/react-query";
import type { DesignList } from "@/types/design";
import { getUserDesigns } from "@/api/design";

const emptyDesignsResponse: DesignList = {
  status: "success",
  total: 0,
  data: [],
};

export function useGetUserDesigns(userID: string | undefined) {
  return useQuery({
    queryKey: ["user-designs", userID],
    queryFn: () => getUserDesigns(userID),
    placeholderData: emptyDesignsResponse,
  });
}
