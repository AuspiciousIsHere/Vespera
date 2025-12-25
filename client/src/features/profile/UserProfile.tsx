import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";

import { UpdateUserProfileForm } from "./UpdateUserProfileForm";
import AccountSettings from "./AccountSettings";
import UserCardInfo from "./UserCardInfo";
import Security from "./Security";

export default function UserProfile() {
  const userProfileTabs = [
    { label: "Personal", value: "personal" },
    { label: "Account", value: "account" },
    { label: "Security", value: "security" },
    { label: "Earnings", value: "earnings" },
  ];

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto">
        {/* PROFILE CARD */}
        <UserCardInfo />

        {/* Tabs */}
        <Tabs defaultValue="personal">
          <TabsList className="w-full">
            {userProfileTabs.map((tab) => (
              <TabsTab key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTab>
            ))}
          </TabsList>

          <div className="mt-10">
            <TabsPanel value="personal" className="space-y-6">
              <UpdateUserProfileForm />
            </TabsPanel>

            <TabsPanel value="account" className="space-y-6">
              <AccountSettings />
            </TabsPanel>

            {/* Security */}
            <TabsPanel value="security" className="space-y-6">
              <Security />
            </TabsPanel>

            {/* Earnings */}
            <TabsPanel value="earnings" className="flex items-center justify-center w-full h-full">
              Comming soon
            </TabsPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
