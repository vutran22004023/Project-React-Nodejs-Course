import SidebarUserComponment from "@/components/SidebarComponment/sidebarUser";
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
  path === "/personal-page"
    ? "personalpage"
    : path.includes("/dasd")
    ? "blogging"
    : path === "/blog"
    ? "myarticle"
    : path === "/saved-posts"
    ? "savedposts"
    : path === "/information-user"
    ? "informationuser"
    : path === "/password-and-security"
    ? "passwordandsecurity"
    : "";
  return (
    <>
      {isHeaderVisible && <HeaderLayout />}
      <div className="block md:flex w-full">
        {isSidebarVisible && (
          <>
            <SidebarUserComponment
              className="mt-3 hidden md:flex md:flex-col gap-2 border-r border-divider z-10 w-[300px] h-[calc(100vh)] fixed top-[50px]"
              activePage={activePage}
            />
            <div className="block md:flex-1 w-full mt-[60px] md:ml-[300px] h-[calc(100vh-50px)] overflow-y-auto">
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
