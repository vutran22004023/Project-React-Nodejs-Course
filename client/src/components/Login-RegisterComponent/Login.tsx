import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalComponent from "@/components/ModalComponent/Modal";
import ButtonComponent from "@/components/ButtonComponent/Button";
import iconfb from "@/assets/Images/icon_fb.png";
import icongg from "@/assets/Images/icon_google.png";
import icongit from "@/assets/Images/icon_git.png";
export default function Login() {
  return (
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
  )
}
