import {DataTableDemo} from './tablecourse'
import ButtonComponent from '@/components/ButtonComponent/Button'
import NewCourses from './newCourses'
export default function courses() {
  return (
    <div className='container mt-9 w-full'>
        <div className='mb-3 flex justify-between'>
        <h3 className="cactus-classical-serif-md text-[25px] ">Khóa học</h3>
        <NewCourses/>
      </div>
      <div>
        <DataTableDemo/>
      </div>
    </div>
  )
}
