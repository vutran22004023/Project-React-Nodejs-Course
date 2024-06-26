import SidebarComponment from "@/components/SidebarComponment/sidebar";
import HeaderLayout from "@/layouts/Homepage/HeaderLayout";
import { Outlet, useLocation } from "react-router-dom";

interface IndexProps {
  isHeaderVisible: boolean;
  isSidebarVisible: boolean;
}
export default function Index({
  isHeaderVisible,
  isSidebarVisible,
}: IndexProps) {
  const location = useLocation();
  const path = location.pathname;
  const activePage =
    path === "/"
      ? "listenNow"
      : path.includes("/learning-paths")
      ? "browse"
      : path.includes("/blog")
      ? "radio"
      : "";
  return (
    <>
      {isHeaderVisible && <HeaderLayout />}
      <div className="block md:flex w-full">
        {isSidebarVisible && (
          <>
            <SidebarComponment
              className="mt-3 hidden md:flex md:flex-col gap-2 border-r border-divider z-10 w-[200px] h-[calc(100vh)] fixed top-[50px]"
              activePage={activePage}
            />
            <div className="block md:flex-1 w-full mt-[50px] md:ml-[200px] h-[calc(100vh-50px)] overflow-y-auto">
              <Outlet />
            </div>
          </>
        )}

        {!isSidebarVisible && (
          <div className="block w-full mt-[50px] h-[calc(100vh-50px)] overflow-y-auto">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}
