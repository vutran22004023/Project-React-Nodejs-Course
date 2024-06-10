import { Link } from "react-router-dom";
import { BellRing,
  LogOut,
  Settings,
  User,
  BookOpenText,
  Album,
  NotebookPen 
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
import { Button } from "@/components/ui/button";
export default function HeaderLayout() {
  return (
    <div className="fixed top-0 left-0 bg-[#fff] right-0 z-10 border-b text-white p-3 flex justify-between items-center">
      <h1 className="text-[#040404] font-bold text-2xl">Header</h1>
      <div className="flex items-center w-[500px] px-4 py-2 ">
      <input
        type="text"
        placeholder="Search"
        className="flex-grow ml-4 text-gray-700 focus:text-gray-800 "
        style={{padding:'5px 10px', border: '1px solid #000', borderRadius: '10px'}}
      />
    </div>
      <div className="flex gap-4 items-center ">
        <Link to="/my-courses" className="text-black">
          Khóa học của tôi
        </Link>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="cursor-pointer">
              {" "}
              <BellRing className="text-black" />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-100 mt-4 mr-7  text-black bg-[#f0efef] rounded p-2">
            <div className="flex justify-between space-x-4">
              {/* <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar> */}
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                {/* <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div> */}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 mt-4 mr-7 p-2 bg-[#f0efef] rounded">
          <DropdownMenuLabel>Xin chào, Vũ Trần</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={'/personal-page'}>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span className="hover:text-[#a1a1a1]">Trang cá nhân</span>
          </DropdownMenuItem>
          </Link>
          
          <Link to={'/posts-blog'}>
          <DropdownMenuItem className="cursor-pointer">
            <NotebookPen className="mr-2 h-4 w-4" />
            <span className="hover:text-[#a1a1a1]">Viết Blog</span>
          </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer">
            <Album className="mr-2 h-4 w-4" />
            <span className="hover:text-[#a1a1a1]">Bài viết của tôi</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <BookOpenText className="mr-2 h-4 w-4" />
            <span className="hover:text-[#a1a1a1]">Bài viết đã lưu</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link to={'/information-user'}>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span className="hover:text-[#a1a1a1]">Cài đặt</span>
        </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span className="hover:text-[#a1a1a1]">Đăng xuất</span>
        </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
