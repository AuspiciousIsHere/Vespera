import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DesignCard from "@/features/design/DesignCard";

import { UpdateUserProfileForm } from "./UpdateUserProfileForm";
import UserCardInfo from "./UserCardInfo";
import useGetUserDesigns from "../design/hooks/useGetUserDesigns";
import { useAuthStore } from "@/store/authStore";
import { Spinner } from "@/components/ui/spinner";
import DesignsContainerMap from "../design/DesignsContainerMap";

export default function UserProfile() {
  const user = useAuthStore((state) => state.user);
  const { isGettingUserDesigns, designs } = useGetUserDesigns(user?._id);
  const userProfileTabs = [
    { label: "Designs", value: "designs" },
    { label: "Edit Profile", value: "edit-profile" },
    { label: "Earnings", value: "earnings" },
  ];

  if (isGettingUserDesigns)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      {/* PROFILE CARD */}
      <UserCardInfo />

      {/* Tabs */}
      <Tabs defaultValue="designs">
        <TabsList className="w-full">
          {userProfileTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-10">
          {/* User Desgins */}
          <TabsContent value="designs" className="flex items-center justify-center w-full h-full">
            {/* ART GALLERY GRID */}
            {/* <div className="grid grid-cols-4 items-start w-full gap-6">
              {designs && designs?.total > 0 ? (
                designs?.data.map((design) => <DesignCard key={design._id} design={design} />)
              ) : (
                <p className="col-span-full text-center text-muted-foreground">This user hasn't created any design yet.</p>
              )}
            </div> */}
            <DesignsContainerMap designs={designs} />
          </TabsContent>

          {/* User Profile */}
          <TabsContent value="edit-profile" className="flex items-center justify-center w-full h-full">
            <UpdateUserProfileForm />
          </TabsContent>

          {/* Earnings */}
          <TabsContent value="earnings" className="flex items-center justify-center w-full h-full">
            Comming soon
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
