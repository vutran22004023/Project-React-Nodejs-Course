import VideoYoutubeComponment from "@/components/VideoYoutubeComponment/VideoYoutube";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ButtonComponment from "@/components/ButtonComponent/Button";
import { ArrowBigLeft, ArrowBigRight, CircleCheck ,Lock   } from "lucide-react";
import { useParams } from "react-router-dom";
import { useMutationHook } from "@/hooks";
import { CourseService, UserCourseService} from "@/services/index";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import {CheckCircleFilled} from '@ant-design/icons'

export default function CourseLogin() {
  const { slug } = useParams();
  const timeVideo = useSelector((state: RootState) => state.timesVideo);
  const user = useSelector((state: RootState) => state.user);
  const [dataCourseDetail, setDataCourseDetail] = useState();
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [dataVideo, setDataVideo] = useState()
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number | null>(null);
  const [playbackTime, setPlaybackTime] = useState<number>(0); // New state for tracking playback time
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialActiveVideoRef = useRef<any>(null); 
  // const [mergedChapters, setMergedChapters] = useState<any>()
  const mutationGetDetailCourse = useMutationHook(async (slug: any) => {
    try {
      const res = await CourseService.GetDetailCourses(slug);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });

  const mutationStateCouses = async () => {
    try {
      const res = await UserCourseService.StartCourse({userId:user.id,courseId: dataCourseDetail?._id });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  const mutationUpdateCourse = useMutationHook(async(data) => {
    try {
      const res = await UserCourseService.UpdateUserCourse(data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  })
  const {data: dataUpdateCourse} = mutationUpdateCourse

  const { data: dataStateCourses, isPending: __isPendingState } = useQuery({
    queryKey: ["dataLUserCouse"],
    queryFn: mutationStateCouses,
    enabled: Boolean(user.id && dataCourseDetail?._id),
    refetchInterval: 5000,
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
    setPlaybackTime(0);
    if (playbackIntervalRef.current) {
      clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    }
  }

  const timeStringToSeconds = (timeString: any) => {
    if (typeof timeString !== "string") {
      console.error("Invalid timeString:", timeString);
      return 0;
    }
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  useEffect(() => {
    if (dataVideo?.time && timeVideo.isPlaying) { // Check if isPlaying is true
      const videoDurationInSeconds = timeStringToSeconds(dataVideo.time);
      const halfDuration = videoDurationInSeconds / 2;
      const incrementPlaybackTime = () => {
        setPlaybackTime(prevTime => {
          const newTime = prevTime + 1;
          if (Math.abs(newTime - halfDuration) <= 1) {
            console.log('Thành công khóa học');
            mutationUpdateCourse.mutate({userId:user.id,courseId: dataCourseDetail?._id, videoId:dataVideo?._id })
          }
          return newTime;
        });
      };

      playbackIntervalRef.current = setInterval(incrementPlaybackTime, 1000);

      return () => {
        if (playbackIntervalRef.current) {
          clearInterval(playbackIntervalRef.current);
        }
      };
    } else {
      // Pause the playback if isPlaying is false or video data is not available
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
        playbackIntervalRef.current = null;
      }
    }
  }, [timeVideo.isPlaying, dataVideo]);



  const mergedChapters = dataCourseDetail?.chapters?.map((chapter: any) => {
    const userChapter = dataStateCourses?.chapters?.find((c:any) => {
      return c.chapterId === chapter._id
    });
    if (userChapter) {
      return {
        ...chapter,
        videos: chapter.videos.map((video: any) => {
          const userVideo = userChapter.videos.find((v: any) => v.videoId === video._id);
          return {
            ...video,
            status: userVideo?.status,
          };
        }),
      };
    }
    return chapter;
  }) || [];

  useEffect(() => {
    if (mergedChapters && mergedChapters.length > 0 && !initialActiveVideoRef.current) {
      let inProgressVideo = null;
      let chapterIndex = null;

      // Loop through each chapter to find the in-progress video
      for (let i = 0; i < mergedChapters.length; i++) {
        const chapter = mergedChapters[i];
        if (chapter.videos) {
          inProgressVideo = chapter.videos.find((video: any) => video.status === "in_progress");
          if (inProgressVideo) {
            chapterIndex = i;
            break; // Stop searching once the in-progress video is found
          }
        }
      }

      if (inProgressVideo) {
        initialActiveVideoRef.current = inProgressVideo; // Store the initially active video
        setDataVideo(inProgressVideo);
        setActiveSlug(inProgressVideo.slug);
        setActiveChapterIndex(chapterIndex); // Set the active chapter index
      }
    }
  }, [mergedChapters]);

  const handleAccordionChange = (value: string) => {
    const chapterIndex = parseInt(value.split('-')[1]);
    setActiveChapterIndex(chapterIndex);
  };

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
        <Accordion type="single" collapsible className="w-full" 
        value={activeChapterIndex !== null ? `item-${activeChapterIndex}` : undefined}
        onValueChange={handleAccordionChange}
        >
          {mergedChapters?.map((chapter: any, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="bg-slate-100 px-2 hover:bg-slate-200 ">
                {chapter.namechapter}
              </AccordionTrigger>
              {chapter.videos.map((video: any, vidIndex: number) => (
                <AccordionContent
                  key={vidIndex}
                  className={`flex justify-between p-3
                    ${video.slug === activeSlug ? "bg-slate-400" : ""}
                    ${
                      video.status === "not_started"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    ${
                      video.status === "not_started" ? "" : "hover:bg-slate-300"
                    }
                    ${video.status === "not_started" ? "bg-slate-200" : ""}
                    `}
                  onClick={() => {
                    if (video.status !== "not_started") {
                      handleVideo(video?.slug);
                    }
                  }}
                >
                  <div className="w-[80%] text-[14px]">
                    <div className="mb-1">{video.childname}</div>
                    <div>{video.time}</div>
                  </div>
                  <div className="w-[20%] justify-center items-center">
                    {video.status === "not_started" ? (
                      <div className="flex justify-between mr-3">
                        <div></div>
                        <Lock size="20"/>
                      </div>
                    ) : video.status === "completed" ? (
                      <div className="flex justify-between mr-3 text-center">
                        <div></div>
                          {/* <CircleCheck size="20" className="text-[#55c72b]" /> */}
                          <CheckCircleFilled  className="text-[#55c72b] text-[20px]" />
                      </div>
                    ) : (
                      []
                    )}
                  </div>
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
