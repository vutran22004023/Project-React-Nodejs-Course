// import { Link } from "react-router-dom";
// import {
//   BellRing,
//   LogOut,
//   Settings,
//   User,
//   BookOpenText,
//   Album,
//   NotebookPen,
// } from "lucide-react";
// // import { CalendarDays } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalComponent from "@/components/ModalComponent/Modal";
import ButtonComponent from "@/components/ButtonComponent/Button";
import iconfb from "@/assets/Images/icon_fb.png";
import icongg from "@/assets/Images/icon_google.png";
import icongit from "@/assets/Images/icon_git.png";
export default function HeaderLayout() {
  return (
    <div className="fixed top-0 left-0 bg-[#fff] right-0 z-10 border-b text-white p-3 flex justify-between items-center">
      <h1 className="text-[#040404] font-bold text-2xl">Header</h1>
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
      <div className="flex gap-2 items-center ">
        <ModalComponent
          triggerContent={
            <Button
              className="bg-gray-300 text-black hover:bg-gray-400"
              style={{ borderRadius: "20px" }}
            >
              Đăng nhập
            </Button>
          }
          contentHeader={
            <>
              <div className="flex justify-center items-center w-full h-full p-4">
                <div className="text-center">
                  <div className="cactus-classical-serif-md text-[25px]">
                    Header
                  </div>
                  <div className="cactus-classical-serif-md text-[25px] ">
                    Đăng nhập vào F8
                  </div>
                </div>
              </div>
            </>
          }
          contentBody={
            <div className="flex justify-center items-center w-full h-full p-4">
              <div className="text-center">
                <ButtonComponent
                  className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                  style={{ border: "1px solid #9c9c9c" }}
                >
                  <div className="flex">
                    <User className="right-20 w-[20px] h-[20px] relative" />
                    <div className="cactus-classical-serif-md">
                      Đăng nhập email
                    </div>
                  </div>
                </ButtonComponent>
                <ButtonComponent
                  className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                  style={{ border: "1px solid #9c9c9c" }}
                >
                  <div className="flex">
                    <img
                      src={icongg}
                      alt="icon"
                      className="mr-2 w-[20px] h-[20px] relative right-[70px]"
                    />
                    <div className="cactus-classical-serif-md">
                      Đăng nhập Google
                    </div>
                  </div>
                </ButtonComponent>
                <ButtonComponent
                  className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                  style={{ border: "1px solid #9c9c9c" }}
                >
                  <div className="flex">
                    <img
                      src={iconfb}
                      alt="icon"
                      className="mr-2 w-[20px] h-[20px] relative right-[60px]"
                    />
                    <div className="cactus-classical-serif-md">
                      Đăng nhập Facebook
                    </div>
                  </div>
                </ButtonComponent>

                <ButtonComponent
                  className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                  style={{ border: "1px solid #9c9c9c" }}
                >
                  <div className="flex">
                    <img
                      src={icongit}
                      alt="icon"
                      className="mr-2 w-[20px] h-[20px] relative right-[70px]"
                    />
                    <div className="cactus-classical-serif-md">
                      Đăng nhập Github
                    </div>
                  </div>
                </ButtonComponent>
              </div>
            </div>
          }
          contentFooter={
            <div className="flex justify-center items-center w-full h-full p-4">
              <div className="text-center">
                <div className="text-[14px] mb-2">Bạn chưa có tài khoản? <span><a href="" className="text-black  hover:text-[#535353]" style={{textDecoration: 'underline'}}>Đăng ký</a></span></div>
                <div className="text-[14px] mb-2"><a href="" className="text-black  hover:text-[#535353]" style={{textDecoration: 'underline'}}>Quên mật khẩu</a></div>
                <div className="text-[10px] mb-2">Việc bạn tiếp tục sử dụng trang web nay đồng nghĩa bạn đã đồng ý với điều khoản sử dụng của chúng tôi</div>
              </div>
            </div>
          }
        />


        <ModalComponent
          triggerContent={
            <Button
              className="bg-[#000] text-[#fff] hover:bg-[#5a5a5a]"
              style={{ borderRadius: "20px" }}
            >
              Đăng ký
            </Button>
          }
          contentHeader={
            <>
              <div className="flex justify-center items-center w-full h-full p-4">
                <div className="text-center">
                  <div className="cactus-classical-serif-md text-[25px]">
                    Header
                  </div>
                  <div className="cactus-classical-serif-md text-[25px] ">
                    Đăng nhập vào F8
                  </div>
                </div>
              </div>
            </>
          }
          contentBody={
            <div className="flex justify-center items-center w-full h-full p-4">
              <div className="text-center">
                <ButtonComponent
                  className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                  style={{ border: "1px solid #9c9c9c" }}
                >
                  <div className="flex">
                    <User className="right-20 w-[20px] h-[20px] relative" />
                    <div className="cactus-classical-serif-md">
                      Đăng nhập email
                    </div>
                  </div>
                </ButtonComponent>
                <ButtonComponent
                  className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                  style={{ border: "1px solid #9c9c9c" }}
                >
                  <div className="flex">
                    <img
                      src={icongg}
                      alt="icon"
                      className="mr-2 w-[20px] h-[20px] relative right-[70px]"
                    />
                    <div className="cactus-classical-serif-md">
                      Đăng nhập Google
                    </div>
                  </div>
                </ButtonComponent>
                <ButtonComponent
                  className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                  style={{ border: "1px solid #9c9c9c" }}
                >
                  <div className="flex">
                    <img
                      src={iconfb}
                      alt="icon"
                      className="mr-2 w-[20px] h-[20px] relative right-[60px]"
                    />
                    <div className="cactus-classical-serif-md">
                      Đăng nhập Facebook
                    </div>
                  </div>
                </ButtonComponent>

                <ButtonComponent
                  className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                  style={{ border: "1px solid #9c9c9c" }}
                >
                  <div className="flex">
                    <img
                      src={icongit}
                      alt="icon"
                      className="mr-2 w-[20px] h-[20px] relative right-[70px]"
                    />
                    <div className="cactus-classical-serif-md">
                      Đăng nhập Github
                    </div>
                  </div>
                </ButtonComponent>
              </div>
            </div>
          }
          contentFooter={<></>}
        />
        {/* <Link to="/my-courses" className="text-black">
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
        </DropdownMenu> */}
      </div>
    </div>
  );
}
