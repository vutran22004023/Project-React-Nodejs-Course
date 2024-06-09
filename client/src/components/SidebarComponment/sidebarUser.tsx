import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {Link} from 'react-router-dom'
import {
  User,
  BookOpenText,
  Album,
  NotebookPen, SquareUser,KeySquare      } from 'lucide-react';
interface SidebarProps {
  className?: string;
  activePage: string;
}

export default function SidebarUser({ className, activePage }: SidebarProps) {

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link to={'/personal-page'}>
            <Button
              variant={activePage === "personalpage" ? "default" : "secondary"}
              className={cn(
                "w-full justify-start hover:bg-[#a1a1a1] mb-1 rounded",
                activePage === "personalpage" && "bg-[#777777] text-white"
              )}
            >
              <User width={20} height={20} className="mr-1"/>
              Trang cá nhân
            </Button>
            </Link>
            <Link to={'/learning-paths'}>
            <Button
              variant={activePage === "blogging" ? "default" : "ghost"}
              className={cn(
                "w-full justify-start hover:bg-[#a1a1a1] mb-1 rounded",
                activePage === "blogging" && "bg-[#777777] text-white"
              )}
            >
              <NotebookPen width={20} height={20} className="mr-1"/>
              Viết Blog
            </Button>
            </Link>
            <Link to={'/blog'}>
            <Button
              variant={activePage === "myarticle" ? "default" : "ghost"}
              className={cn(
                "w-full justify-start hover:bg-[#a1a1a1] mb-1 rounded",
                activePage === "myarticle" && "bg-[#777777] text-white"
              )}
            >
              <Album width={20} height={20} className="mr-1"/>
              Bài viết của tôi
            </Button>
            </Link>

            <Link to={'/blog'}>
            <Button
              variant={activePage === "savedposts" ? "default" : "ghost"}
              className={cn(
                "w-full justify-start hover:bg-[#a1a1a1] mb-1 rounded",
                activePage === "savedposts" && "bg-[#777777] text-white"
              )}
            >
              <BookOpenText width={20} height={20} className="mr-1"/>
              Bài viết đã lưu
            </Button>
            </Link>

            <Link to={'/information-user'}>
            <Button
              variant={activePage === "informationuser" ? "default" : "ghost"}
              className={cn(
                "w-full justify-start hover:bg-[#a1a1a1] mb-1 rounded",
                activePage === "informationuser" && "bg-[#777777] text-white"
              )}
            >
              <SquareUser width={20} height={20} className="mr-1"/>
              Thông tin người dùng
            </Button>
            </Link>

            <Link to={'/password-and-security'}>
            <Button
              variant={activePage === "passwordandsecurity" ? "default" : "ghost"}
              className={cn(
                "w-full justify-start hover:bg-[#a1a1a1] mb-1 rounded",
                activePage === "passwordandsecurity" && "bg-[#777777] text-white"
              )}
            >
              <KeySquare width={20} height={20} className="mr-1"/>
              Mật khẩu và bảo mật 
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
