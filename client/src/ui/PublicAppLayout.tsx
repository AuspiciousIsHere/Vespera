import { Outlet } from "react-router";

import AppHeader from "./AppHeader";

export default function PublicAppLayout() {
  return (
    <div className="flex flex-col">
      <div className="h-[100svh - 56px]">
        <AppHeader showVespera={true} />
        <Outlet />
      </div>
    </div>
  );
}
