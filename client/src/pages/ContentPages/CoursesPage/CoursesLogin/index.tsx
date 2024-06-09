import { Outlet } from "react-router-dom";
import HeaderLayoutCourses from "@/layouts/Homepage/HeaderLayoutCourses";
interface IndexProps {
  isHeaderVisible: boolean;
}
export default function index({ isHeaderVisible }: IndexProps) {
  return (
    <>
      {isHeaderVisible && <HeaderLayoutCourses />}
      <div className="block w-full mt-[50px] h-[calc(100vh-50px)] overflow-y-auto">
      <Outlet/>
      </div>
    </>
  );
}
