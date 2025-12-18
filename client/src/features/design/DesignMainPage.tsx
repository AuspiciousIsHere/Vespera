import useGetUserDesigns from "./hooks/useGetUserDesigns";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/authStore";
import type { Design } from "@/types/design";
import DesignCard from "./DesignCard";

export default function DesignMainPage() {
  const user = useAuthStore((state) => state.user);
  const { isGettingUserDesigns, designs } = useGetUserDesigns(user?._id);

  if (isGettingUserDesigns)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-4">
      {designs && designs.data.length > 0 ? designs.data.map((design: Design) => <DesignCard design={design} />) : <div></div>}
    </div>
  );
}
