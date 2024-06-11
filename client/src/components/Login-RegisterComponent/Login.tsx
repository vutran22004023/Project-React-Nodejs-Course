import  { useState } from "react";
import { User, ArrowBigLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalComponent from "@/components/ModalComponent/Modal";
import ButtonComponent from "@/components/ButtonComponent/Button";
import ForgotPassComponent from '@/components/Login-RegisterComponent/Forgot-password';
import iconfb from "@/assets/Images/icon_fb.png";
import icongg from "@/assets/Images/icon_google.png";
import icongit from "@/assets/Images/icon_git.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Register from '@/components/Login-RegisterComponent/Register';

export default function Login() {
  const [isModalInputLogin, setIsModalInputLogin] = useState(true);
  const [isModalForgotPass, setIsModalForgotPass] = useState(false);
  const [isModalRegister, setIsModalRegister] = useState(false);

  const handleIsModalInputLogin = () => {
    setIsModalInputLogin(false);
    setIsModalForgotPass(false);
    setIsModalRegister(false);
  };

  const handleCloseisModalLogin = () => {
    setIsModalInputLogin(true);
    setIsModalForgotPass(false);
    setIsModalRegister(false);
  };

  const handleIsModalOpenForPass = () => {
    setIsModalInputLogin(false);
    setIsModalForgotPass(true);
    setIsModalRegister(false);
  };

  const handleIsModalOpenRegister = () => {
    setIsModalInputLogin(false);
    setIsModalForgotPass(false);
    setIsModalRegister(true);
  };

  return (
    <ModalComponent
      triggerContent={
        <Button
          className="bg-gray-300 text-black hover:bg-gray-400"
          style={{ borderRadius: "20px" }}
        >
          Đăng nhập / Đăng ký
        </Button>
      }
      contentHeader={
        <>
          <div className="flex justify-center items-center w-full h-full ">
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
            {/* Login Modal */}
            <div style={{ display: isModalInputLogin && !isModalForgotPass && !isModalRegister ? "block" : "none" }}>
              <ButtonComponent
                className="w-[350px] p-5 bg-[#fbfbfb] text-black  hover:bg-[#e5e5e5] m-0 mb-3"
                style={{ border: "1px solid #9c9c9c" }}
                onClick={handleIsModalInputLogin}
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
                    Đăng nhập với Google
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
                    Đăng nhập với Facebook
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
                    Đăng nhập với Github
                  </div>
                </div>
              </ButtonComponent>
            </div>
            {/* Email Login Form */}
            <div style={{ display: !isModalInputLogin && !isModalForgotPass && !isModalRegister ? "block" : "none" }}>
              <div
                className="fixed p-2 top-2 left-0 cursor-pointer hover:text-[#4b4b4b]"
                onClick={handleCloseisModalLogin}
              >
                <div className="flex">
                  <ArrowBigLeft /> <div>Quay lại</div>
                </div>
              </div>
              <div className="grid gap-4 py-4">
                <div className="text-left grid gap-2">
                  <Label htmlFor="email" className="">
                    Email
                  </Label>
                  <Input
                    id="email"
                    className="col-span-3 w-[400px] "
                    style={{ borderRadius: "10px", padding: "20px" }}
                    placeholder="Nhập email"
                  />
                </div>
                <div className="text-left grid gap-2">
                  <Input
                    id="password"
                    className="col-span-3 w-[400px] "
                    style={{ borderRadius: "10px", padding: "20px" }}
                    placeholder="Nhập mật khẩu"
                    type="password"
                  />
                </div>
                <div className="w-full">
                  <ButtonComponent
                    className="p-5 m-0 mb-4"
                    style={{ border: "1px solid #9c9c9c" }}
                  >
                    <div className="cactus-classical-serif-md">
                      Đăng nhập
                    </div>
                  </ButtonComponent>
                </div>
              </div>
            </div>
            {/* Forgot Password */}
            <div style={{ display: isModalForgotPass ? "block" : "none" }}>
              <div
                className="fixed p-2 top-2 left-0 cursor-pointer hover:text-[#4b4b4b]"
                onClick={handleCloseisModalLogin}
              >
                <div className="flex">
                  <ArrowBigLeft /> <div>Quay lại</div>
                </div>
              </div>
              <ForgotPassComponent />
            </div>
            {/* Register */}
            <div style={{ display: isModalRegister ? "block" : "none" }}>
              <div
                className="fixed p-2 top-2 left-0 cursor-pointer hover:text-[#4b4b4b]"
                onClick={handleCloseisModalLogin}
              >
                <div className="flex">
                  <ArrowBigLeft /> <div>Quay lại</div>
                </div>
              </div>
              <Register />
            </div>
          </div>
        </div>
      }
      contentFooter={
        <div className="flex justify-center items-center w-full h-full ">
          <div className="text-center">
            <div className="text-[14px] mb-1">
              Bạn chưa có tài khoản?{" "}
              <span>
                <a
                  onClick={handleIsModalOpenRegister}
                  className="text-black hover:text-[#535353]"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Đăng ký
                </a>
              </span>
            </div>
            <div className="text-[14px] mb-1" style={{ display: isModalForgotPass ? "none" : "block" }}>
              <a
                className="text-black hover:text-[#535353]"
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={handleIsModalOpenForPass}
              >
                Quên mật khẩu
              </a>
            </div>
            <div className="text-[10px] ">
              Việc bạn tiếp tục sử dụng trang web nay đồng nghĩa bạn đã đồng ý
              với điều khoản sử dụng của chúng tôi
            </div>
          </div>
        </div>
      }
    />
  );
}
