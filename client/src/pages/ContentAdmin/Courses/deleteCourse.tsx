import React, {useEffect} from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ButtonComponent from '@/components/ButtonComponent/Button'
import {CourseService} from '@/services/index'
import { useMutationHook } from '@/hooks/index';
import { success, error } from '@/components/MessageComponents/Message'
import { message } from 'antd';
import {useCombinedData } from '@/hooks/index'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
interface DeleteProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
  }
export default function deleteCourse({id,isOpen, onClose}: DeleteProps) {
  const user = useSelector((state: RootState) => state.user);
  const getAllCourses = async() => {
    const res = await CourseService.GetAllCourses()
    return res
 } 
  const fetchTableData =useCombinedData('dataAllCoursess', getAllCourses);
  const { data: _dataAllCourses, error: _Errdata, isLoading: _isLoadingAllCourses,refetch  } = fetchTableData
  const mutationDeleteCourses = useMutationHook(async(idDelete) => {
    const access_Token = user?.access_Token;
    const res = await CourseService.DeleteCourses(idDelete,access_Token)
    return res
  })

  const {data: dataDeleteCourses} = mutationDeleteCourses

  useEffect(() => {
    if(dataDeleteCourses?.status === 200) {
      success(`${dataDeleteCourses?.message}`)
    }else if(dataDeleteCourses?.status === 'ERR') {
      error(`${dataDeleteCourses?.message}`)
    }
  },[dataDeleteCourses])

  const handleButtonDelete = () => {
    mutationDeleteCourses.mutate(id)
    onClose()
    refetch()
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fff]">
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn xóa khóa học ...</DialogTitle>
          <DialogDescription>
            Bạn phải chắc chắn rằng bạn sẽ xóa khóa học này, nếu xóa thì dữ liệu mất vĩnh viễn.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ButtonComponent type="submit" onClick={handleButtonDelete}>Xóa khóa học</ButtonComponent>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
