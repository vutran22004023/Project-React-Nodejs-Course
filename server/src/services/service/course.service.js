import Course from '../../models/course.model.js';
import mongoose from 'mongoose';

class CourseService {
  async getAllCourses(limit, page, sort, filter) {
    const totalCourses = await Course.countDocuments();
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

    const allCourses = await Course.find(query, null, options).select('-chapters').lean();

    return {
      status: 200,
      message: 'Xem tất cả khóa học',
      data: allCourses,
      total: totalCourses,
      pageCurrent: Number(page),
      totalPage: Math.ceil(totalCourses / limit),
    };
  }

  async updateCourse(courseId, reqData) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const course = await Course.findById(courseId).session(session);
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

      const updatedCourse = await Course.findById(courseId).lean();
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
