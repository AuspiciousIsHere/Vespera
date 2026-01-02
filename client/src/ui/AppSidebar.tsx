import { Home, Proportions, UserRound, UserRoundPen } from "lucide-react";
import { NavLink, useLocation } from "react-router";

import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/authStore";

export default function AppSidebar() {
  const user = useAuthStore((state) => state.user);
  const { pathname } = useLocation();

  const sidebarItems = [
    { title: "Designs", url: "/designs", icon: Home },
    { title: "My Designs", url: `/designs/${user?.usernameSlug}`, icon: UserRoundPen, hidden: user?.role === "admin" },
    { title: "Profile", url: `/profile/${user?.usernameSlug}`, icon: Proportions },
    { title: "Manage Users", url: `/manage-users`, icon: UserRound, hidden: user?.role !== "admin" },
    { title: "Manage Desings", url: `/manage-designs`, icon: UserRound, hidden: user?.role !== "admin" },
  ];

  // const data = {
  //   user: {
  //     name: "shadcn",
  //     email: "m@example.com",
  //     avatar: "../../public/vespera-logo.png",
  //   },
  //   navMain: [
  //     { title: "Dashboard", url: "#" },
  //     { title: "Lifecycle", url: "#" },
  //     { title: "Analytics", url: "#" },
  //     { title: "Projects", url: "#" },
  //     { title: "Team", url: "#" },
  //   ],
  //   navClouds: [
  //     {
  //       title: "Capture",
  //       isActive: true,
  //       url: "#",
  //       items: [
  //         { title: "Active Proposals", url: "#" },
  //         { title: "Archived", url: "#" },
  //       ],
  //     },
  //     {
  //       title: "Proposal",
  //       url: "#",
  //       items: [
  //         { title: "Active Proposals", url: "#" },
  //         { title: "Archived", url: "#" },
  //       ],
  //     },
  //     {
  //       title: "Prompts",
  //       url: "#",
  //       items: [
  //         { title: "Active Proposals", url: "#" },
  //         { title: "Archived", url: "#" },
  //       ],
  //     },
  //   ],
  // };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="hover:bg-transparent">
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5! h-full hover:bg-transparent">
              <NavLink to="/">
                <img src="../../public/vespera-logo.png" className="size-10" />
                <span className="text-2xl font-semibold">Vespera</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {sidebarItems
              .filter((item) => !item.hidden)
              .map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`${pathname === item.url && "active-link"} transition-all`}>
                      <item.icon />
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
