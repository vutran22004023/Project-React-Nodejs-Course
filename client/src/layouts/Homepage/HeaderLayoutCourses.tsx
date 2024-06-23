import React, {useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowBigLeft,
 } from "lucide-react";
// import { CalendarDays } from "lucide-react"
import { Flex, Progress } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import ButtonComponent from '@/components/ButtonComponent/Button'
import { RootState } from "@/redux/store";
import { success, error, warning } from "@/components/MessageComponents/Message";
export default function HeaderLayoutCourses() {

  return (
    <div className="fixed top-0 left-0 bg-[#fff] right-0 z-10 border-b p-3 flex justify-between items-center">
      <div className="flex  justify-center items-center">
      <ButtonComponent className="mr-3" style={{}}><ArrowBigLeft/></ButtonComponent>
      <h1 className="text-[#040404] font-bold text-2xl mt-3">Header</h1>
      </div>
      <div>
        <input />
      </div>
      <div className="flex gap-4 items-center mr-3">
        <div className="flex  justify-center items-cente">
          <Progress type="circle" percent={75}  size={40} />
          <div className="ml-1 mt-2">3/12 bài học</div>
        </div>
        <Link to="/my-courses" className="text-black">
          Chú thích
        </Link>
        <Link to="/my-courses" className="text-black">
          Hướng dẫn
        </Link>
      </div>
    </div>
  );
}
