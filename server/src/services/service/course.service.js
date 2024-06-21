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

  async updateCourse(courseId, data) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const course = await Course.findById(courseId).session(session);

      data.chapters.forEach((chapter) => {
        const existingChapter = course.chapters.id(chapter._id);

        if (existingChapter) {
          existingChapter.namechapter = chapter.namechapter;

          chapter.videos.forEach((updatedVideo) => {
            const existingVideo = existingChapter.videos.id(updatedVideo._id);

            if (existingVideo) {
              existingVideo.childname = updatedVideo.childname;
              existingVideo.video = updatedVideo.video;
            } else {
              existingChapter.videos.push(updatedVideo);
            }
          });

          existingChapter.videos = existingChapter.videos.filter((video) =>
            chapter.videos.some((updatedVideo) => updatedVideo._id && updatedVideo._id.equals(video._id))
          );
        } else {
          course.chapters.push(chapter);
        }
      });

      course.name = data.name;
      course.description = data.description;
      course.price = data.price;
      course.image = data.image;
      course.video = data.video;

      await course.save({ session });
      await session.commitTransaction();

      const updatedCourse = await Course.findById(courseId).lean();
      return updatedCourse;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default new CourseService();
