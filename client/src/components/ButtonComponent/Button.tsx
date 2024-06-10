import React from 'react';
import { Button } from "@/components/ui/button";

interface ButtonProps {
    children: React.ReactNode;
    className: string;
    style: React.CSSProperties;
  }
  const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, style }, ref) => {
      return (
        <Button
          ref={ref}
          className={`bg-[#000] text-[#fff] hover:bg-[#5a5a5a] mt-4 ${className}`} 
          style={{ borderRadius: "20px", ...style }}
        >
          {children}
        </Button>
      );
    }
  );
  
  ButtonComponent.displayName = 'ButtonComponent'; // Đặt tên hiển thị cho component
  
  export default ButtonComponent;
