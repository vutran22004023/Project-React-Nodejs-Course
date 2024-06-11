
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonComponent from "@/components/ButtonComponent/Button";
export default function Forgotpassword() {
  return (
    <div className="grid gap-4 py-4">
    <div className="text-left  grid gap-2">
      <Label htmlFor="name" className="">
        Email
      </Label>
      <Input
        id="name"
        // value="Pedro Duarte"
        className="col-span-3 w-[400px] "
        style={{ borderRadius: "10px", padding: "20px" }}
        placeholder="Nhập email"
      />
    </div>
    <div className="w-full">
    <ButtonComponent
    className=" p-5 m-0 mb-4"
    style={{ border: "1px solid #9c9c9c" }}
  >
      <div className="cactus-classical-serif-md">
        Đặt lại mật khẩu
      </div>
  </ButtonComponent>
    </div>
  </div>
  )
}
