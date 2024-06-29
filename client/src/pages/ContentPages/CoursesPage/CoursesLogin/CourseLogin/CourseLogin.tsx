import VideoYoutubeComponment from "@/components/VideoYoutubeComponment/VideoYoutube";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ButtonComponment from "@/components/ButtonComponent/Button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { useMutationHook } from "@/hooks";
import { CourseService } from "@/services/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
export default function CourseLogin() {
  const { slug } = useParams();
  const timeVideo = useSelector((state: RootState) => state.timesVideo);
  const [dataCourseDetail, setDataCourseDetail] = useState();
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [dataVideo, setDataVideo] = useState()
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const mutationGetDetailCourse = useMutationHook(async (slug: any) => {
    try {
      const res = await CourseService.GetDetailCourses(slug);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    mutationGetDetailCourse.mutate(slug, {
      onSuccess: (data) => {
        setDataCourseDetail(data);
        setIsLoadingDetail(false);
      },
      onError: () => {
        setIsLoadingDetail(false);
      },
    });
  }, [slug]);
  const handleVideo = (slug: any) => {
    const video = dataCourseDetail?.chapters?.flatMap((chapter: any) => chapter.videos).find((video: any) => video.slug === slug);
    setDataVideo(video);
    setActiveSlug(slug);
  }


  return (
    <div className="flex mt-[15px] ">
      <div className="w-[70%] ">
        <div className="bg-black pr-[20px] pl-[20px]">
          <VideoYoutubeComponment
            style={{
              width: "100%",
              height: "600px",
            }}
            src={dataVideo?.video}
            title="YouTube video player"
          />
        </div>
        <div className="p-10">
          <div className="flex justify-between">
            <div className="cactus-classical-serif-md mb-1 text-[25px]">
              {dataVideo?.childname}
            </div>
            <ButtonComponment
              className="p-5 w-[200px]"
              style={{ marginTop: "0", borderRadius: "10px" }}
            >
              {" "}
              Thêm ghi chú
            </ButtonComponment>
          </div>
          <div className="mb-5">Cập nhật {dataVideo?.updatedAt}</div>
          <div className="mb-5">
            Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính" xem
            F8 sắp có gì mới nhé!
          </div>
          <div>Fanpage: https://www.facebook.com/f8vnofficial</div>
        </div>
      </div>
      <div className="flex-1 border-l-2 mt-4">
        <div className="cactus-classical-serif-md mb-3 p-2">
          Nội dung khóa học
        </div>
        <Accordion type="single" collapsible className="w-full">
          {dataCourseDetail?.chapters?.map((chapter: any, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="bg-slate-100 px-2 hover:bg-slate-200 ">
                {chapter.namechapter}
              </AccordionTrigger>
              {chapter.videos.map((video: any, vidIndex: number) => (
                <AccordionContent
                  key={vidIndex}
                  className={`flex justify-between p-3 hover:bg-slate-100 cursor-pointer ${video.slug === activeSlug ? 'bg-slate-200' : ''}`}
                  onClick={() => handleVideo(video?.slug)}
                >
                  <div className="w-[80%] text-[14px]">
                    <div className="mb-1">{video.childname}</div>
                    <div>{video.time}</div>
                  </div>
                  <div className="w-[20%]"></div>
                </AccordionContent>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="fixed bottom-0 left-0 bg-[#dbdbdb] right-0 z-10 border-b p-3 flex  items-center">
        <div className="flex justify-center items-center w-full">
          <ButtonComponment
            className="w-[200px]"
            style={{ marginTop: "0", borderRadius: "10px", marginRight: "5px" }}
          >
            <ArrowBigLeft />
            BÀI TRƯỚC
          </ButtonComponment>
          <ButtonComponment
            className="w-[200px]"
            style={{ marginTop: "0", borderRadius: "10px" }}
          >
            BÀI TIẾP THEO
            <ArrowBigRight />
          </ButtonComponment>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-3 flex items-center">
          <div>1. Khái niệm kỹ thuật cần biết</div>
          <ButtonComponment
            className="ml-2 p-3 w-[50px]"
            style={{ marginTop: "0", borderRadius: "60%" }}
          >
            <ArrowBigRight />
          </ButtonComponment>
        </div>
      </div>
    </div>
  );
}
