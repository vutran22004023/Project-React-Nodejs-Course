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
      const checkUserCourse = await UserCourse.findOne({
        userId: userId,
        courseId: courseId
      })

            // Kiểm tra xem người dùng đã học khóa học này chưa
            let userCourse = await UserCourse.aggregate([
              {
                $match: { userId: new mongoose.Types.ObjectId(userId), courseId: new mongoose.Types.ObjectId(courseId) },
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

      if (!checkUserCourse) {
        // Khởi tạo dữ liệu nếu người dùng chưa học khóa học này
        
        const chapters = course.chapters.map((chapter) => ({
          chapterId: chapter._id,
          videos: chapter.videos.map((video, index) => ({
            videoId: video._id,
            status: index === 0 ? 'in_progress' : 'not_started',
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
        data: checkUserCourse,
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
  
      // Tìm và cập nhật trạng thái video hiện tại thành 'completed'
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

      let nextVideo = null;
    for (let chapter of userCourse.chapters) {
      const currentVideoIndex = chapter.videos.findIndex(v => v.videoId.toString() === videoId.toString());
      if (currentVideoIndex !== -1) {
        const nextVideoIndex = currentVideoIndex + 1;
        if (nextVideoIndex < chapter.videos.length) {
          nextVideo = chapter.videos[nextVideoIndex];
          break;
        }
      }
    }
    if (!nextVideo) {
      return {
        status: 200,
        message: 'Progress updated, but there is no next video',
        data: userCourse,
      };
    }
  
      // Tìm video kế tiếp và cập nhật trạng thái của nó thành 'in_progress'
      const updatedCourse = await UserCourse.findOneAndUpdate(
        { userId, courseId, 'chapters.videos.videoId': nextVideo.videoId },
        {
          $set: {
            'chapters.$[chapter].videos.$[video].status': 'in_progress',
          },
        },
        {
          new: true,
          arrayFilters: [{ 'chapter.videos.videoId': nextVideo.videoId }, { 'video.videoId': nextVideo.videoId }],
        }
      );
  
      return {
        status: 200,
        message: 'Progress updated',
        data: updatedCourse,
      };
    } catch (err) {
      return {
        status: 'ERR',
        message: 'Đã xảy ra lỗi',
        error: err.message,
      };
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
