import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router";

import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

export default function AppLayout() {
  const location = useLocation();

  const showSdiebar: Boolean = location.pathname !== "/login" && location.pathname !== "/sign-up";

  return (
    <div className="flex flex-col">
      <div className="h-[100svh - 56px]">
        <SidebarProvider>
          {showSdiebar && <AppSidebar />}
          <SidebarInset>
            <AppHeader />

            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
