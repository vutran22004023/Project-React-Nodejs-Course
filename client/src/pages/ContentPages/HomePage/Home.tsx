import { useState, useEffect } from "react";
import CarouselComponent from "@/components/CarouselComponent/carousel";
import CardComponent from "@/components/CardComponent/Card";
import { Link } from 'react-router-dom';
import { CourseService } from "@/services";
import { useCombinedData } from '@/hooks/index';
import LoadingCard from "@/components/LoadingComponent/LoadingCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// Định nghĩa kiểu dữ liệu cho khóa học
interface Course {
  chapters: any[];
  createdAt: string;
  image: string;
  name: string;
  price: string;
  slug: string;
  updatedAt: string;
  video: string;
  __v: number;
  _id: string;
}

// Định nghĩa kiểu dữ liệu cho dataAllCourses
interface DataAllCourses {
  status: number;
  message: string;
  data: Course[];
  total: number;
  pageCurrent: number;
  totalPage: number;
}

export default function Index() {
  const [dataCourseFree, setDataCourseFree] = useState<Course[]>([]);
  const [dataCoursePaid, setDataCoursePaid] = useState<Course[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const getAllCourses = async (): Promise<DataAllCourses> => {
    const res = await CourseService.GetAllCourses();
    return res;
  };

  const fetchTableData = useCombinedData('dataAllCourses', getAllCourses);
  const { data: dataAllCourses, error: _Errdata, isLoading: isLoadingAllCourses } = fetchTableData;
  useEffect(() => {
    if (dataAllCourses && dataAllCourses.data) {
      const freeCourses = dataAllCourses.data.filter((course: Course) => {
        return course.price === 'free';
      });
      setDataCourseFree(freeCourses);

      const paidCourses = dataAllCourses.data.filter((course: Course) => {
        return course.price === 'paid';
      });
      setDataCoursePaid(paidCourses);
    }
  }, [dataAllCourses]);

  return (
    <div className="container mt-8 w-full">
      <CarouselComponent />

      <div className="mt-5 p-7">
        <div className="cactus-classical-serif-md text-[25px]">
          Khóa học Pro
        </div>
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-2 mb-3 mt-3 md:gap-4">
          {isLoadingAllCourses
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex-none w-full md:w-auto">
                  <LoadingCard />
                </div>
              ))
            : dataCoursePaid.map((course: Course, index) => (
                <div key={course._id} className="flex-none w-full md:w-auto">
                  {user?.access_Token &&
                  user?.status === true &&
                  user?.isAdmin ? (
                    <Link to={`/courses-login/${course.slug}`}>
                      <CardComponent course={course} />
                    </Link>
                  ) : (
                    <Link to={`/courses-not-login/${course.slug}`}>
                      <CardComponent course={course} />
                    </Link>
                  )}
                </div>
              ))}
        </div>
      </div>

      <div className="mt-5 p-7">
        <div className="cactus-classical-serif-md text-[25px]">
          Khóa học free
        </div>
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-2 mb-3 mt-3 md:gap-4">
          {isLoadingAllCourses ? (
            <LoadingCard />
          ) : (
            dataCourseFree.map((course: Course, index) => (
              <div key={course._id} className="flex-none w-full md:w-auto">
                  {user?.access_Token &&
                  user?.status === true &&
                  user?.isAdmin ? (
                    <Link to={`/courses-login/${course.slug}`}>
                      <CardComponent course={course} />
                    </Link>
                  ) : (
                    <Link to={`/courses-not-login/${course.slug}`}>
                      <CardComponent course={course} />
                    </Link>
                  )}
                </div>
            ))
          )}
        </div>
      </div>

      {/* <div className="mt-5 p-7">
        <div className="cactus-classical-serif-md text-[25px]">
          Bài viết nổi bật
        </div>
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-2 mb-3 mt-3 md:gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-none w-full md:w-auto">
              <Link to={'blog/blog-detail'}>
                <CardComponent />
              </Link>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
