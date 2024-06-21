import React, { useCallback, useState, useEffect } from "react";
import ModalComponent from "@/components/ModalComponent/Modal";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import ButtonComponent from "@/components/ButtonComponent/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CourseService } from '@/services/index';
import { useMutationHook } from '@/hooks/index';
import {success, error} from '@/components/MessageComponents/Message'
import {IfetchTable} from '@/types/index'
interface IProp {
  chapter: any;
  chapterIndex: any;
  control: any;
  removeChapter: any;
}


// Function to generate slug
const generateSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Schema validation using Zod
const videoSchema = z.object({
  childname: z.string().min(1, "Vui lòng nhập tên video"),
  video: z.string().url("Vui lòng nhập URL hợp lệ"),
  time: z.string().optional(),
  slug: z.string().optional(),
});

const chapterSchema = z.object({
  namechapter: z.string().min(1, "Vui lòng nhập tên chương"),
  videos: z.array(videoSchema),
  slug: z.string().optional(),
});

const courseFormSchema = z.object({
  name: z
    .string()
    .min(2, "Tên khóa học phải ít nhất 2 kí tự")
    .max(30, "Tên khóa học phải tối đa 30 kí tự"),
  price: z.enum(["free", "paid"]),
  priceAmount: z.string().optional(),
  video: z.string().url("Vui lòng nhập URL hợp lệ").optional(),
  image: z.instanceof(File).optional(),
  chapters: z.array(chapterSchema),
  slug: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

// Default values (optional)
const defaultValues: Partial<CourseFormValues> = {
  // chapters: [
  //   {
  //     namechapter: "Chapter 1",
  //     videos: [
  //       { childname: "Video 1.1", video: "http://video-url-1", time: "10:00" },
  //       { childname: "Video 1.2", video: "http://video-url-2", time: "15:00" },
  //     ],
  //   },
  // ],
};

export default function NewCourses({ fetchTableData }: IfetchTable) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    fields: chapterFields,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({
    name: "chapters",
    control: form.control,
  });

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      form.setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    },
    [form]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const mutateCreate = useMutationHook(async (data) => {
    const res = await CourseService.CreateCourses(data);
    return res;
  });
  
  const { data: dataCreate } = mutateCreate;
  useEffect(() => {
    if(dataCreate?.status === 200) {
      success(`${dataCreate?.message}`)
      setImagePreview(null); 
      setIsModalOpen(false);
      fetchTableData.refetch();
      form.reset();
    }else if(dataCreate?.status === 'ERR') {
      error(`${dataCreate?.message}`)
    }
  }, [dataCreate])

  const onSubmit = (data: CourseFormValues) => {
    // Generate slugs before submitting
    data.slug = generateSlug(data.name);
    data.chapters = data.chapters.map(chapter => ({
      ...chapter,
      slug: generateSlug(chapter.namechapter),
      videos: chapter.videos.map(video => ({
        ...video,
        slug: generateSlug(video.childname),
      })),
    }));

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    mutateCreate.mutate(data);
  };

  return (
    <ModalComponent
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      triggerContent={
        <Button
          className="bg-[black] p-5 text-[#fff] hover:bg-[#6c6a6a]"
          style={{ borderRadius: "10px" }}
        >
          Thêm khóa học
        </Button>
      }
      contentHeader={
        <>
          <div>Thêm khóa học mới</div>
        </>
      }
      contentBody={
        <div className="p-2 max-h-[500px] overflow-y-auto">
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên khóa học</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên khóa học" {...field} />
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá khóa học</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giá khóa học" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#ececec]">
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              {form.watch("price") === "paid" && (
                <FormField
                  control={form.control}
                  name="priceAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số tiền</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập số tiền" {...field} />
                      </FormControl>
                      <FormMessage className="text-[red]" />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đường dẫn video giới thiệu</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập URL video giới thiệu" {...field} />
                    </FormControl>
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Hình ảnh khóa học</FormLabel>
                    <div {...getRootProps({ className: "dropzone cursor-pointer w-[100px]" })}>
                      <input {...getInputProps()} />
                      <p className="p-2 bg-black text-[#fff] w-[100px] cursor-pointer rounded-md">Thêm ảnh</p>
                    </div>
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="Image Preview"
                          className="w-[200px] h-[200px] object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <FormMessage className="text-[red]" />
                  </FormItem>
                )}
              />
              {chapterFields.map((chapter, chapterIndex) => (
                <ChapterField
                  key={chapter.id}
                  chapter={chapter}
                  chapterIndex={chapterIndex}
                  control={form.control}
                  removeChapter={removeChapter}
                />
              ))}
              <ButtonComponent
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-[100px]"
                onClick={() => appendChapter({ namechapter: "", videos: [] })}
              >
                Thêm chương
              </ButtonComponent>
            </form>
          </Form>
        </div>
      }
      contentFooter={
        <>
          <div className="flex justify-end p-4">
            <ButtonComponent
              type="submit"
              className="w-[150px]"
              onClick={form.handleSubmit(onSubmit)}
            >
              Thêm khóa học
            </ButtonComponent>
          </div>
        </>
      }
    />
  );
}

function ChapterField({
  chapter,
  chapterIndex,
  control,
  removeChapter,
}: IProp) {
  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({
    name: `chapters.${chapterIndex}.videos`,
    control,
  });

  return (
    <div key={chapter.id} className="p-4 border rounded-md mb-4">
      <div className="flex justify-between items-center">
        <div>Chương {chapterIndex + 1}</div>
        <ButtonComponent
          type="button"
          variant="outline"
          size="sm"
          className="ml-2 w-[100px]"
          onClick={() => removeChapter(chapterIndex)}
        >
          Xóa chương
        </ButtonComponent>
      </div>
      <FormField
        control={control}
        name={`chapters.${chapterIndex}.namechapter`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên chương</FormLabel>
            <FormControl>
              <Input placeholder="Nhập tên chương" {...field} />
            </FormControl>
            <FormMessage className="text-[red]" />
          </FormItem>
        )}
      />
      {videoFields.map((video, videoIndex) => (
        <div key={video.id} className="pl-4 mt-4 border-l-2">
          <div className="flex justify-between items-center">
            <div>Video {videoIndex + 1}</div>
            <ButtonComponent
              type="button"
              variant="outline"
              size="sm"
              className="ml-2 w-[100px]"
              onClick={() => removeVideo(videoIndex)}
            >
              Xóa video
            </ButtonComponent>
          </div>
          <FormField
            control={control}
            name={`chapters.${chapterIndex}.videos.${videoIndex}.childname`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên video</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên video" {...field} />
                </FormControl>
                <FormMessage className="text-[red]" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`chapters.${chapterIndex}.videos.${videoIndex}.video`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL video</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập URL video" {...field} />
                </FormControl>
                <FormMessage className="text-[red]" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`chapters.${chapterIndex}.videos.${videoIndex}.time`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời gian</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập thời gian video" {...field} />
                </FormControl>
                <FormMessage className="text-[red]" />
              </FormItem>
            )}
          />
        </div>
      ))}
      <ButtonComponent
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 w-[100px]"
        onClick={() => appendVideo({ childname: "", video: "", time: "" })}
      >
        Thêm video
      </ButtonComponent>
    </div>
  );
}
