import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ButtonComponent from '@/components/ButtonComponent/Button';
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { toast } from "@/components/ui/use-toast";

interface UpdateProps {
  data: any;
  isOpen: boolean;
  onClose: () => void;
}

interface IProp {
  chapter: any;
  chapterIndex: any;
  control: any;
  removeChapter: any;
}

// Schema validation using Zod
const videoSchema = z.object({
  childname: z.string().min(1, "Vui lòng nhập tên video"),
  video: z.string().url("Vui lòng nhập URL hợp lệ"),
  time: z.string().optional(),
});

const chapterSchema = z.object({
  namechapter: z.string().min(1, "Vui lòng nhập tên chương"),
  videos: z.array(videoSchema),
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
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

const UpdateCourse: React.FC<UpdateProps> = ({ data, isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      ...data,
      image: data.image ? data.image : null,
      chapters: data.chapters ? data.chapters : [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (data.image) {
      setImagePreview(data.image);
    }
    // Reset form values whenever `data` changes
    form.reset({
      ...data,
      image: data.image ? data.image : null,
      chapters: data.chapters ? data.chapters : [],
    });
  }, [data, form]);

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

  const onSubmit = (formData: CourseFormValues) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
        </pre>
      ),
    });
    console.log(formData);
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className="bg-[#fff] pr-[20px] w-[600px]">
        <SheetHeader className="mb-3">
          <SheetTitle>
            <div>Edit profile</div>
          </SheetTitle>
        </SheetHeader>
        <div className="max-h-[580px] overflow-y-auto">
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
        <SheetFooter>
          <SheetClose asChild>
            <ButtonComponent type="submit">Save changes</ButtonComponent>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

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
    <div className="pl-4 mt-4 border-l-2">
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
                <FormLabel>Tên video </FormLabel>
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

export default UpdateCourse;
