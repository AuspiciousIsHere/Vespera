import { getUserTags } from "@/api/tag";
import type { GetUserTagsResponse } from "@/types/tag";
import { useQuery } from "@tanstack/react-query";

const placeholderTagData: GetUserTagsResponse = {
  status: "",
  data: [],
};

export function useGetUserTags(userID: string) {
  return useQuery({
    queryKey: ["user-tags", userID],
    queryFn: () => getUserTags(userID),
    placeholderData: placeholderTagData,
  });
}
