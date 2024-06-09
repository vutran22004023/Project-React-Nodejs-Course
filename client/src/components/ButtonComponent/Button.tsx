import React from 'react';
import { Button } from "@/components/ui/button";

interface ButtonProps {
    children: React.ReactNode;
    className: string;
    style: React.CSSProperties;
  }
export default function Button1({children, className, style} : ButtonProps) {
  return (
    <Button
    className={`bg-[#000] text-[#fff] hover:text-[#000] mt-4 ${className}`} 
    style={{ borderRadius: "20px", ...style }}
    >
      {children}
    </Button>
  );
}
