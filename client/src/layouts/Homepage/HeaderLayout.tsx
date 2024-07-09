import { Link } from "react-router-dom";
import {
  BellRing,
  LogOut,
  Settings,
  User,
  BookOpenText,
  Album,
  NotebookPen,
  Lock,
} from "lucide-react";
// import { CalendarDays } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginComponent from "@/components/Login-RegisterComponent/Login";
import RegisterComponent from "@/components/Login-RegisterComponent/Register";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { resetUser } from "@/redux/Slides/userSide";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HeaderLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("access_Token");
      localStorage.removeItem("refresh_Token");
      document.cookie =
        "access_Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refresh_Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      await axios.post("/api/login-out");
      dispatch(resetUser());
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="fixed top-0 left-0 bg-[#fff] right-0 z-10 border-b text-white p-3 flex justify-between items-center">
      <h1
        className="text-[#040404] font-bold text-2xl"
        onClick={() => navigate("/")}
      >
        Header
      </h1>
      <div className="flex items-center w-[500px] px-4 py-2 ">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow ml-4 text-gray-700 focus:text-gray-800 "
          style={{
            padding: "5px 10px",
            border: "1px solid #000",
            borderRadius: "10px",
          }}
        />
      </div>
      <div className="flex gap-4 items-center mr-4">
        {user.access_Token && user.status === true ? (
          <>
          <HoverCard>
              <HoverCardTrigger asChild>
                <div className="cursor-pointer">
                  {" "}
                  <div className="text-black">Khóa học của tôi</div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-100 mt-2 mr-20  text-black bg-[#f0efef] rounded p-2">
                <div className="flex justify-between space-x-4 p-2 w-[350px] h-[300px]">
                  <div className=" flex justify-between w-full">
                    <div className="text-sm font-semibold  ">Khóa học của tôi</div>
                    <div className="text-sm  font-semibold ">Xem tất cả</div>
                  </div>

                  <div></div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="cursor-pointer">
                  {" "}
                  <BellRing className="text-black" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-100 mt-2 mr-10  text-black bg-[#f0efef] rounded p-2">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@nextjs</h4>
                    <p className="text-sm">
                      The React Framework – created and maintained by @vercel.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer mr-2">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 mt-4 mr-7 p-2 bg-[#f0efef] rounded">
                <DropdownMenuLabel>Xin chào, Vũ Trần</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to={"/personal-page"}>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span className="hover:text-[#a1a1a1]">
                        Trang cá nhân
                      </span>
                    </DropdownMenuItem>
                  </Link>

                  <Link to={"/posts-blog"}>
                    <DropdownMenuItem className="cursor-pointer">
                      <NotebookPen className="mr-2 h-4 w-4" />
                      <span className="hover:text-[#a1a1a1]">Viết Blog</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer">
                    <Album className="mr-2 h-4 w-4" />
                    <span className="hover:text-[#a1a1a1]">
                      Bài viết của tôi
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <BookOpenText className="mr-2 h-4 w-4" />
                    <span className="hover:text-[#a1a1a1]">
                      Bài viết đã lưu
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {user.isAdmin === true && (
                  <Link to={"/admin/dash-board"}>
                    <DropdownMenuItem className="cursor-pointer">
                      <Lock className="mr-2 h-4 w-4" />
                      <span className="hover:text-[#a1a1a1]">
                        Thông tin trang web
                      </span>
                    </DropdownMenuItem>
                  </Link>
                )}
                <Link to={"/information-user"}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="hover:text-[#a1a1a1]">Cài đặt</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="hover:text-[#a1a1a1]">Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <LoginComponent />
            {/* <RegisterComponent/> */}
          </>
        )}
      </div>
    </div>
  );
}
