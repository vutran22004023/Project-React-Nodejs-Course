import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonComponent from "@/components/ButtonComponent/Button";
import { Eye, EyeOff } from "lucide-react";
import { useMutationHook } from "@/hooks/index";
import { Login_Register } from "@/services/index.ts";
import { Registers } from "@/types/index";
import IsLoadingComponment from "@/components/LoadingComponent/Loading";
import {
  success,
  error,
  warning,
} from "@/components/MessageComponents/Message";
export default function Register() {
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [register, setRegister] = useState<Registers>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isError, setIsError] = useState(false);
  const [isErrPass, setIsErrPass] = useState(false);
  const [isErrEmail, setIsErrEmail] = useState(false);

  const handleOnChangeregister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }

    const updatedRegister = {
      ...register,
      [name]: value,
    };
    // Kiểm tra xem có trường nào rỗng không
    const hasEmptyField = Object.values(updatedRegister).some(
      (field) => field === ""
    );

    // Nếu có trường rỗng, đặt isError thành true, ngược lại đặt thành false
    setRegister(updatedRegister);
    setIsError(hasEmptyField);
  };

  useEffect(() => {
    if (!isError) {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const isEmailValid =
        register.email.trim() !== "" && mailformat.test(register.email);
      const isPasswordMatch = register.password === register.confirmPassword;
      setIsErrEmail(isEmailValid);
      setIsErrPass(isPasswordMatch);
    }
  }, [register]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword(!showConfirmPassword);
  };

  const checkPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getStrengthColor = (strength: number): string => {
    if (strength === 1) return "red";
    if (strength === 2) return "orange";
    if (strength === 3) return "green";
    return "gray";
  };

  const mutationRegister = useMutationHook(async (registerData: Registers) => {
    const res = await Login_Register.Register(registerData);
    return res;
  });

  const { data: dataRegister, isPending: isLoadingdataRegister } =
    mutationRegister;

  useEffect(() => {
    if ((dataRegister as { status?: number })?.status === 200) {
      success("Đã đăng ký thành công");
      setRegister({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else if ((dataRegister as { status?: string })?.status === "ERR") {
      error("Đăng ký thất bại");
    }
  }, [dataRegister]);
  const handleconfirmRegister = () => {
    mutationRegister.mutate(register);
  };

  return (
    <div className="grid gap-1 py-4 overflow-y-auto ">
      <div className="text-left grid gap-2 mb-3">
        <Label htmlFor="name" className="mb-1">
          Tên của bạn
        </Label>
        <Input
          name="name"
          value={register.name}
          onChange={handleOnChangeregister}
          className="col-span-3 w-[400px]"
          style={{ borderRadius: "10px", padding: "20px" }}
          placeholder="Họ và tên của bạn"
        />
      </div>
      <div className="text-left grid gap-2">
        <Label htmlFor="email" className="mb-1">
          Email của bạn
        </Label>
        <Input
          name="email"
          value={register.email}
          onChange={handleOnChangeregister}
          className="col-span-3 w-[400px]"
          style={{ borderRadius: "10px", padding: "20px" }}
          placeholder="Địa chỉ email"
        />
      </div>
      <div className="text-left grid gap-2">
        <div className="relative w-[400px]">
          <Input
            type={showPassword ? "text" : "password"}
            className="col-span-3 w-full"
            style={{ borderRadius: "10px", padding: "20px" }}
            placeholder="Mật khẩu mới"
            value={register.password}
            onChange={handleOnChangeregister}
            name="password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            style={{ padding: "0 10px" }}
          >
            {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        </div>
        <div className="relative w-[400px]">
          <Input
            name="confirmPassword"
            value={register.confirmPassword}
            onChange={handleOnChangeregister}
            type={showConfirmPassword ? "text" : "password"}
            className="col-span-3 w-full"
            style={{ borderRadius: "10px", padding: "20px" }}
            placeholder="Xác thực mật khẩu"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            style={{ padding: "0 10px" }}
          >
            {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        </div>
        <div className="relative w-[400px] mt-2">
          <div className="flex items-center">
            <div
              style={{
                height: "5px",
                flex: 1,
                backgroundColor: getStrengthColor(passwordStrength),
              }}
            ></div>
          </div>
          <div className="text-right text-sm mt-1">
            {passwordStrength === 0 && "Mật khẩu yếu"}
            {passwordStrength === 1 && "Mật khẩu yếu"}
            {passwordStrength === 2 && "Mật khẩu trung bình"}
            {passwordStrength === 3 && "Mật khẩu mạnh"}
          </div>
          {!isError && !isErrPass ? (
            <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
              <div className="text-[red]">
                Mật khẩu và xác nhận mật khẩu không khớp
              </div>
            </div>
          ) : null}

          {!isError && !isErrEmail ? (
            <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
              <div className="text-[red]">Định dạng email chưa đúng</div>
            </div>
          ) : null}

          {isError && (
            <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
              <div className="text-[red]">
                Vui lòng nhập họ và tên, email, mật khẩu, xác nhận lại mật khẩu
              </div>
              <div className="text-[red]">
                {passwordStrength === 0
                  ? "Mật khẩu phải có ít nhất 6 kí tự, chứa ít nhất một chữ cái in hoa và kết thúc bằng một kí tự đặc biệt."
                  : passwordStrength === 1
                  ? "Mật khẩu phải chứa ít nhất một chữ cái in hoa và kết thúc bằng một kí tự đặc biệt."
                  : passwordStrength === 2
                  ? "Mật khẩu phải kết thúc bằng một kí tự đặc biệt."
                  : passwordStrength === 3
                  ? ""
                  : ""}
              </div>
            </div>
          )}
          {}

          {dataRegister &&
            (dataRegister as { status?: number }).status === 200 && (
              <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                <div className="text-[#37d249]">
                  {(dataRegister as { message?: string })?.message}
                </div>
              </div>
            )}
            {dataRegister &&
            (dataRegister as { status?: string }).status === 'ERR' && (
              <div className="bg-[#eaeaea] rounded-sm p-1 text-[10px]">
                <div className="text-[red]">
                  {(dataRegister as { message?: string })?.message}
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="w-full">
        <ButtonComponent
          className={`p-5 m-0 mb-4 `}
          style={{
            border: "1px solid #9c9c9c",
          }}
          disabled={!isError && isErrPass && isErrEmail ? false : true}
          onClick={handleconfirmRegister}
        >
          <div className="cactus-classical-serif-md">
            <IsLoadingComponment IsLoading={isLoadingdataRegister}>
              Đăng ký ngay
            </IsLoadingComponment>
          </div>
        </ButtonComponent>
      </div>
    </div>
  );
}
