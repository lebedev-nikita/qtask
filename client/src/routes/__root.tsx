import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import LeftPanel from "./-components/LeftPanel";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex">
        <LeftPanel className="border p-1" />
        <div className="flex grow">
          <Outlet />
        </div>
      </div>
      <Toaster duration={10e3} />
      <TanStackRouterDevtools />
    </>
  ),
});
