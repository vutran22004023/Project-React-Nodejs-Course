import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {Link} from 'react-router-dom'
import { Home,LibraryBig, BookOpenText   } from 'lucide-react';
interface SidebarProps {
  className?: string;
  activePage: string;
}

export default function Sidebar({ className, activePage }: SidebarProps) {

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link to={'/'}>
            <Button
              variant={activePage === "listenNow" ? "default" : "secondary"}
              className={cn(
                "w-full justify-start hover:bg-[#a1a1a1] mb-1 rounded",
                activePage === "listenNow" && "bg-[#777777] text-white"
              )}
            >
              <Home width={20} height={20} className="mr-1"/>
              Trang chủ
            </Button>
            </Link>
            <Link to={'/learning-paths'}>
            <Button
              variant={activePage === "browse" ? "default" : "ghost"}
              className={cn(
                "w-full justify-start hover:bg-[#a1a1a1] mb-1 rounded",
                activePage === "browse" && "bg-[#777777] text-white"
              )}
            >
              <LibraryBig width={20} height={20} className="mr-1"/>
              Lộ trình
            </Button>
            </Link>
            <Link to={'/blog'}>
            <Button
              variant={activePage === "radio" ? "default" : "ghost"}
              className={cn(
                "w-full justify-start hover:bg-[#a1a1a1] mb-1 rounded",
                activePage === "radio" && "bg-[#777777] text-white"
              )}
            >
              <BookOpenText width={20} height={20} className="mr-1"/>
              Bài viết
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
