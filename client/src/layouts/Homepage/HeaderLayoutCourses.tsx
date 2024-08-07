import React, {useEffect, useState} from 'react'
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
  
  const timeVideo = useSelector((state: RootState) => state.timesVideo);
  return (
    <div className="fixed top-0 left-0 bg-[#fff] right-0 z-10 border-b p-3 flex justify-between items-center">
      <div className="flex  justify-center items-center">
      <Link to='/'><ButtonComponent className="mr-3" ><ArrowBigLeft/></ButtonComponent></Link>
      <h1 className="text-[#040404] font-bold text-2xl mt-3">Header</h1>
      </div>
      <div>
        <input />
      </div>
      <div className="flex gap-4 items-center mr-3">
        <div className="flex  justify-center items-cente">
          <Progress type="circle" percent={timeVideo?.percentCourse}  size={40} />
          <div className="ml-1 mt-2">{timeVideo?.totalcompletedVideo}/{timeVideo?.totalVideo} bài học</div>
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
