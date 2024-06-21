import { CourseModel } from '../../models/index.js';
import mongoose from 'mongoose';

class CourseService {
  async getAllCourses(limit, page, sort, filter) {
    const totalCourses = await CourseModel.countDocuments();
    const query = {};
    const options = {
      limit: limit,
      skip: page * limit,
    };
    if (filter) {
      query[filter[0]] = { $regex: filter[1], $options: 'i' };
    }
    if (sort) {
      options.sort = { [sort[1]]: sort[0] };
    }

    const allCourses = await CourseModel.find(query, null, options).select('-chapters').lean();

    return {
      status: 200,
      message: 'Xem tất cả khóa học',
      data: allCourses,
      total: totalCourses,
      pageCurrent: Number(page),
      totalPage: Math.ceil(totalCourses / limit),
    };
  }

  async getDetaiCourse(slug) {
    const checkCourse = await CourseModel.findOne({ slug: slug });
    if (!checkCourse) {
      return {
        status: 'ERR',
        message: 'Khóa học không tồn tại',
      };
    }
    return {
      status: 200,
      data: checkCourse,
      message: 'Show dữ liệu thành công',
    };
  }

  async createCourse(data) {
    try {
      const { name, description, image, video, chapters, price, priceAmount } = data;

      // Check if the course already exists
      const checkCourse = await CourseModel.findOne({ name });
      if (checkCourse) {
        return {
          status: 'ERR',
          message: 'Khóa học đã tồn tại',
        };
      }

      // Create the new course
      const createCourse = await CourseModel.create(data);
      if (createCourse) {
        return {
          status: 200,
          data: createCourse,
          message: 'Đã tạo khóa học thành công',
        };
      }
    } catch (error) {
      // Throw the error to be handled by the controller
      throw new Error(error.message);
    }
  }

  async updateCourse(courseId, reqData) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const course = await CourseModel.findById(courseId).session(session);
      if (!course) {
        return {
          status: 'ERR',
          message: 'Không tìm thấy khóa học!',
        };
      }

      course.chapters = course.chapters.filter((chapter) =>
        reqData.chapters.some((reqChapter) => reqChapter._id && reqChapter._id === chapter._id.toString())
      );

      reqData.chapters.forEach((chapter) => {
        const dbChapter = course.chapters.id(chapter._id);

        if (dbChapter) {
          dbChapter.namechapter = chapter.namechapter;

          dbChapter.videos = dbChapter.videos.filter((video) =>
            chapter.videos.some((reqVideo) => reqVideo._id && reqVideo._id === video._id.toString())
          );

          chapter.videos.forEach((reqVideo) => {
            if (!reqVideo._id) dbChapter.videos.push(reqVideo);
            else {
              const dbVideo = dbChapter.videos.id(reqVideo._id);

              if (dbVideo) {
                dbVideo.childname = reqVideo.childname;
                dbVideo.video = reqVideo.video;
                dbVideo.time = reqVideo.time;
              }
            }
          });
        } else {
          course.chapters.push(chapter);
        }
      });

      course.name = reqData.name;
      course.description = reqData.description;
      course.price = reqData.price;
      course.image = reqData.image;
      course.video = reqData.video;

      await course.save({ session });
      await session.commitTransaction();

      const updatedCourse = await CourseModel.findById(courseId).lean();
      return {
        status: 200,
        message: `Đã cập nhật khóa học id: ${updatedCourse._id}`,
        data: updatedCourse,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default new CourseService();
