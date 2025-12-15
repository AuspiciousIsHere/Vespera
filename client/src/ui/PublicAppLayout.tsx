import { Outlet } from "react-router";

import Header from "./AppHeader";

export default function PublicAppLayout() {
  return (
    <div className="flex flex-col">
      <div className="h-[100svh - 56px]">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
