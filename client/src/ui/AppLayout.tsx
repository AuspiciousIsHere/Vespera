import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router";

import AppSidebar from "./AppSidebar";
import Header from "./AppHeader";

export default function AppLayout() {
  const location = useLocation();

  const showSdiebar: Boolean = location.pathname !== "/login" && location.pathname !== "/sign-up";

  return (
    <div className="flex flex-col">
      <div className="h-[100svh - 56px]">
        <SidebarProvider>
          {showSdiebar && <AppSidebar />}
          <SidebarInset>
            <Header />
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
