import useGetUserDesigns from "./hooks/useGetUserDesigns";
import DesignsContainerMap from "./DesignsContainerMap";
import { useAuthStore } from "@/store/authStore";
import PageSpinner from "@/ui/PageSpinner";

export default function DesignMainPage() {
  const user = useAuthStore((state) => state.user);
  const { isPending: isGettingUserDesigns, data: designs } = useGetUserDesigns(user?._id);

  if (isGettingUserDesigns) return <PageSpinner />;

  return <DesignsContainerMap designs={designs} />;
}
