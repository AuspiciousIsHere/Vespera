import { useQuery } from "@tanstack/react-query";
import { getUserDesigns } from "@/api/design";

export default function useGetUserDesigns(userID: string | undefined) {
  const { isPending: isGettingUserDesigns, data: designs } = useQuery({
    queryKey: ["user-designs", userID],
    queryFn: () => getUserDesigns(userID),
  });

  return { isGettingUserDesigns, designs };
}
