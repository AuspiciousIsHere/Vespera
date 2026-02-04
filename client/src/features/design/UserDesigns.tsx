import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { useGetUserDesigns } from "./hooks/useGetUserDesigns";
import DesignsContainerMap from "./DesignsContainerMap";
import { useAuthStore } from "@/store/authStore";
import PageSpinner from "@/ui/PageSpinner";
import { LayoutGrid, List } from "lucide-react";
import DesignsTable from "./DesignsTable";
import ButtonLink from "@/ui/ButtonLink";

export default function UserDesigns() {
  const user = useAuthStore((state) => state.user);
  const { isPending: isGettingUserDesigns, data: designs } = useGetUserDesigns(user?._id);

  const viewTabs = [
    { value: "grid", icon: <LayoutGrid /> },
    { value: "list", icon: <List /> },
  ];

  if (isGettingUserDesigns) return <PageSpinner />;

  return (
    <Tabs className={"w-full"}>
      <div className="flex items-center justify-between w-full mb-2">
        <h1 className="text-2xl font-bold">
          {designs?.total} Design{designs && designs.total > 1 && "s"}
        </h1>

        <div className="flex items-center gap-2">
          <TabsList>
            {viewTabs.map((tab) => (
              <TabsTab key={tab.value} value={tab.value}>
                {tab.icon}
              </TabsTab>
            ))}
          </TabsList>

          <ButtonLink to="/create-design">New</ButtonLink>
        </div>
      </div>

      <TabsPanel value="grid" className="w-full">
        <DesignsContainerMap designs={designs} />
      </TabsPanel>

      <TabsPanel value="list" className="w-full">
        <DesignsTable designs={designs} />
      </TabsPanel>
    </Tabs>
  );
}
