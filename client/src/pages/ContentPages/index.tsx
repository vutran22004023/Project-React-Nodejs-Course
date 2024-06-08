import SidebarComponment from "@/components/SidebarComponment/sidebar";
import HeaderLayout from "@/layouts/Homepage/HeaderLayout";
import { Outlet } from 'react-router-dom';

export default function Index() {
  return (
    <>
      <HeaderLayout />
      <div className="block md:flex w-full">
        <SidebarComponment className='mt-3 hidden md:flex md:flex-col gap-2 border-r border-divider z-10 w-[200px] h-[calc(100vh)] fixed top-[50px]' />
        <div className="block md:flex-1 w-full mt-[50px] md:ml-[200px] h-[calc(100vh-50px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}