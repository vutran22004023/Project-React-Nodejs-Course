import VideoYoutubeComponment from "@/components/VideoYoutubeComponment/VideoYoutube";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ButtonComponment from "@/components/ButtonComponent/Button";
import { ArrowBigLeft ,ArrowBigRight } from 'lucide-react';
export default function CourseLogin() {
  return (
    <div className="flex mt-[15px] ">
      <div className="w-[70%] ">
        <div className="bg-black pr-[20px] pl-[20px]">
          <VideoYoutubeComponment
            style={{
              width: "100%",
              height: "500px",
              borderRadius: "none",
            }}
            src="https://www.youtube.com/embed/0SJE9dYdpps?si=WSJflYm741-XWeem"
            title="YouTube video player"
          />
        </div>
        <div className="p-10">
          <div className="flex justify-between">
            <div className="cactus-classical-serif-md mb-1 text-[25px]">
              Domain là gì? Tên miền là gì?
            </div>
            <ButtonComponment
              className="p-5 w-[200px]"
              style={{ marginTop: "0", borderRadius: "10px" }}
            >
              {" "}
              Thêm ghi chú
            </ButtonComponment>
          </div>
          <div className="mb-5">Cập nhật tháng 11 năm 2022</div>
          <div className="mb-5">
            Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính" xem
            F8 sắp có gì mới nhé!
          </div>
          <div>Fanpage: https://www.facebook.com/f8vnofficial</div>
        </div>
      </div>
      <div className="flex-1 p-3 border-l-2">
        <div className="cactus-classical-serif-md mb-3">Nội dung khóa học</div>
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

      <div className="fixed bottom-0 left-0 bg-[#dbdbdb] right-0 z-10 border-b p-3 flex  items-center">
        <div className="flex justify-center items-center w-full">
          <ButtonComponment
            className="w-[200px]"
            style={{ marginTop: "0", borderRadius: "10px", marginRight: "5px" }}
          >
            <ArrowBigLeft/>BÀI TRƯỚC
          </ButtonComponment>
          <ButtonComponment
            className="w-[200px]"
            style={{ marginTop: "0", borderRadius: "10px" }}
          >
            BÀI TIẾP THEO<ArrowBigRight/>
          </ButtonComponment>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-3 flex items-center">
          <div>1. Khái niệm kỹ thuật cần biết</div>
          <ButtonComponment
            className="ml-2 p-3 w-[50px]"
            style={{ marginTop: "0", borderRadius: "60%" }}
          >
            <ArrowBigRight/>
          </ButtonComponment>
        </div>
      </div>
    </div>
  );
}
