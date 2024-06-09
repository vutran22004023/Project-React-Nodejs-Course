import CarouselComponent from "@/components/CarouselComponent/carousel";
import CardComponent from "@/components/CardComponent/Card";
import {Link} from 'react-router-dom'
export default function index() {
  return (
    <div className="container mt-8 w-full">
      <CarouselComponent />

      <div className="mt-5 p-7">
        <div className="cactus-classical-serif-md text-[25px] ">
          Khóa học Pro
        </div>
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-2 mb-3 mt-3 md:gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-none w-full md:w-auto">
              <Link to={'/courses-not-login'}>
              <CardComponent />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 p-7">
        <div className="cactus-classical-serif-md text-[25px] ">
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
      </div>
    </div>
  );
}
