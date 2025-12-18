import useGetUserDesigns from "./hooks/useGetUserDesigns";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/authStore";
import ButtonLink from "@/ui/ButtonLink";
import DesignsContainerMap from "./DesignsContainerMap";

export default function UserDesigns() {
  const user = useAuthStore((state) => state.user);
  const { isGettingUserDesigns, designs } = useGetUserDesigns(user?._id);

  if (isGettingUserDesigns)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {designs?.total} Design{designs && designs.total > 1 && "s"}
        </h1>
        <ButtonLink to="/create-design">New</ButtonLink>
      </div>

      <DesignsContainerMap designs={designs} />
    </div>
  );
}
