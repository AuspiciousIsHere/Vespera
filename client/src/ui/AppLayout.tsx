import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router";

import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { useEffect, useState } from "react";

export default function AppLayout() {
  const { pathname } = useLocation();
  const [expandSdiebar, setExpandSidebar] = useState(true);

  const showSdiebar: Boolean = location.pathname !== "/login" && location.pathname !== "/sign-up";

  useEffect(
    function () {
      if (!pathname.includes("chat")) setExpandSidebar(true);
      else setExpandSidebar(false);
    },
    [pathname]
  );

  return (
    <div className="flex flex-col">
      <div className="h-[100svh - 56px]">
        <SidebarProvider open={expandSdiebar} className="bg-linear-30 from-secondary to-transparent">
          {showSdiebar && <AppSidebar />}
          <SidebarInset>
            <AppHeader />

            <div className={!pathname.includes("chat") ? "container mx-auto py-8 px-4 sm:px-6 lg:px-8" : "h-[calc(100svh-56px)]"}>
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
