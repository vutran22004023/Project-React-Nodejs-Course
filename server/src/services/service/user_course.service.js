import { CourseModel } from '../../models/index.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import { UserCourse } from '../../models/user_course.model.js';

class UserCourseService {
  async startUserCourse(data) {
    try {
      let { userId, courseId } = data;

      const course = await CourseModel.findById(courseId).populate({
        path: 'chapters',
        model: 'Chapter',
        populate: {
          path: 'videos',
          model: 'Video',
        },
      });

      if (!course) {
        return {
          status: 'ERR',
          message: 'Khóa học không tồn tại',
        };
      }

      // Kiểm tra xem người dùng đã học khóa học này chưa
      let userCourse = await UserCourse.aggregate([
        {
          $match: { userId: mongoose.Types.ObjectId(userId), courseId: mongoose.Types.ObjectId(courseId) },
        },
        {
          $unwind: '$chapters',
        },
        {
          $lookup: {
            from: 'chapters', // Tên collection chapters
            localField: 'chapters.chapterId',
            foreignField: '_id',
            as: 'chapterDetails',
          },
        },
        {
          $unwind: '$chapterDetails',
        },
        {
          $lookup: {
            from: 'videos',
            localField: 'chapterDetails.videos._id',
            foreignField: '_id',
            as: 'chapterDetails.videosDetails',
          },
        },
        {
          $group: {
            _id: '$_id',
            userId: { $first: '$userId' },
            courseId: { $first: '$courseId' },
            chapters: {
              $push: {
                chapterDetails: '$chapterDetails',
                videos: '$chapterDetails.videosDetails',
              },
            },
          },
        },
        {
          $lookup: {
            from: 'courses', // Tên collection courses
            localField: 'courseId',
            foreignField: '_id',
            as: 'courseDetails',
          },
        },
        {
          $unwind: '$courseDetails',
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            courseId: 1,
            chapters: 1,
            courseDetails: 1,
          },
        },
      ]);
      console.log(userCourse);

      if (!userCourse) {
        // Khởi tạo dữ liệu nếu người dùng chưa học khóa học này
        const chapters = course.chapters.map((chapter) => ({
          chapterId: chapter._id,
          videos: chapter.videos.map((video, index) => ({
            videoId: video._id,
            status: index === 0 ? 'completed' : 'not_started',
          })),
        }));
        userCourse = await UserCourse.create({ userId, courseId, chapters });

        return {
          status: 200,
          data: userCourse,
          message: 'Đã lưu tiến độ học',
        };
      }

      return {
        status: 200,
        data: userCourse,
        message: 'Lấy tiến độ học thành công',
      };
    } catch (err) {
      return {
        status: 'ERR',
        message: 'Đã xảy ra lỗi',
        error: err.message,
      };
    }
  }

  async updateProgress(data) {
    try {
      const { userId, courseId, videoId } = data;

      // Tìm và cập nhật trạng thái video trong UserCourse
      const userCourse = await UserCourse.findOneAndUpdate(
        { userId, courseId, 'chapters.videos.videoId': videoId },
        {
          $set: {
            'chapters.$[chapter].videos.$[video].status': 'completed',
          },
        },
        {
          new: true,
          arrayFilters: [{ 'chapter.videos.videoId': videoId }, { 'video.videoId': videoId }],
        }
      );

      if (!userCourse) {
        return {
          status: 'ERR',
          message: 'Khóa học không tồn tại',
        };
      }

      return {
        status: 200,
        message: `Đã cập nhật tiến độ`,
        data: userCourse,
      };
    } catch (err) {
      return this.validator(err);
    }
  }

  validator(err) {
    if (err.name === 'ValidationError') {
      const field = Object.keys(err.errors)[0];
      const error = err.errors[field];
      return {
        status: 'ERR',
        message: error.message,
      };
    } else throw err;
  }

  // async dataHandle(data) {
  //   // Trim data
  //   Object.keys(data).forEach((key) => {
  //     if (typeof data[key] === 'string') {
  //       data[key] = data[key].trim();
  //     }
  //   });

  //   for (const chapter of data.chapters) {
  //     for (const video of chapter.videos) {
  //       Object.keys(video).forEach((key) => {
  //         if (typeof video[key] === 'string') {
  //           video[key] = video[key].trim();
  //         }
  //       });
  //     }
  //   }

  //   // if (emptySlug)
  //   //   return {
  //   //     status: 'ERR',
  //   //     message: 'Thiếu slug video',
  //   //   };
  //   // else if (hasDuplicate)
  //   //   return {
  //   //     status: 'ERR',
  //   //     message: 'Slug video trong các chương bị trùng lặp',
  //   //   };
  //   // else return 0;
  // }
}

export default new UserCourseService();
