import { CircleCheckBig } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VideoYoutubeComponment from '@/components/VideoYoutubeComponment/VideoYoutube'
import ButtonComponent from '@/components/ButtonComponent/Button'
export default function CoursesNotLogin() {
  return (
    <div className="container mt-8 w-full">
      <div className="flex">
        <div className="w-[60%] p-5">
          <div className="mb-5">
            <div className="cactus-classical-serif-md text-[25px] mb-1 ">
              Lập Trình JavaScript Cơ Bản
            </div>
            <div className="text-[15px] mb-7 ">
              Học Javascript cơ bản phù hợp cho người chưa từng học lập trình.
              Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.
            </div>
          </div>

          <div className="mb-5">
            <div className="cactus-classical-serif-md text-[20px] mb-4 ">
              Bạn sẽ học được gì?
            </div>
            <div className="text-[15px] mb-7 flex justify-between">
              <div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                </div>
              </div>

              <div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                </div>
                <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <div>Hiểu chi tiết về các khái niệm cơ bản trong JS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="cactus-classical-serif-md text-[20px] mb-4 ">
              Nội dung khóa học
            </div>
            <div className="flex justify-between mb-3">
                <div>20 chương - 205 bài học - Thời lượng 29 giờ 14 phút</div>
                <div className="cactus-classical-serif-md text-[14px]">Mở rộng tất cả</div>
            </div>
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you
                    prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="mb-5">
            <div className="cactus-classical-serif-md text-[20px] mb-4 ">
                Yêu cầu
            </div>

            <div className="flex mb-1">
                  <CircleCheckBig className="w-[20px] h-[20px] mr-2" />
                  <div className="text-[14px]">Máy vi tính kết nối internet (Windows, Ubuntu hoặc MacOS)</div>
                </div>
          </div>  

        </div>
        <div className="flex-1  p-5 items-center">
        <div className="w-full flex justify-center mb-3">
            <VideoYoutubeComponment style={{width:'400px' , height:'200px', borderRadius: "20px"}} src="https://www.youtube.com/embed/0SJE9dYdpps?si=WSJflYm741-XWeem" title="YouTube video player"/>
            </div>
            <div className="w-full flex justify-center">
                <div className="cactus-classical-serif-md text-[25px]">Miễn phí</div>
            </div>
            <div className="w-full flex justify-center">
                <ButtonComponent className="p-6" style={{borderRadius:'20px'}}> ĐĂNG KÝ HỌC</ButtonComponent>
            </div>
        </div>
      </div>
    </div>
  );
}
