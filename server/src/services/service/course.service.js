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
      const result = this.dataHandle(data);
      if (result) return result;

      // Create the new course
      const createCourse = await CourseModel.create(data);
      if (createCourse) {
        return {
          status: 200,
          data: createCourse,
          message: 'Đã tạo khóa học thành công',
        };
      }
    } catch (err) {
      return this.validator(err);
    }
  }

  async updateCourse(courseId, reqData) {
    const result = this.dataHandle(reqData);
    if (result) return result;

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
                dbVideo.slug = reqVideo.slug;
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
      course.slug = reqData.slug;

      await course.save({ session });
      await session.commitTransaction();

      const updatedCourse = await CourseModel.findById(courseId).lean();
      return {
        status: 200,
        message: `Đã cập nhật khóa học id: ${updatedCourse._id}`,
        data: updatedCourse,
      };
    } catch (err) {
      await session.abortTransaction();
      return this.validator(err);
    } finally {
      session.endSession();
    }
  }

  validator(err) {
    if (err.name === 'ValidationError') {
      const field = Object.keys(err.errors)[0];
      const error = err.errors[field];
      console.log('CourseService ~ validator ~ error:', error);
      if (error.kind === 'unique') {
        const readableField =
          {
            name: 'khóa học',
            childname: 'video',
          }[error.path] || error.path;
        error.message = `Đã có ${readableField} "${error.value}"`;
      }
      return {
        status: 'ERR',
        message: error.message,
      };
    } else if (err.code == 11000) {
      let key = Object.keys(err.keyValue)[0];
      return {
        status: 'ERR',
        message: `Đã có slug "${err.keyValue[key]}"`,
      };
    } else throw err;
  }

  dataHandle(data) {
    // Trim data
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim();
      }
    });
    data.chapters.forEach((chapter) => {
      chapter.videos.forEach((video) => {
        Object.keys(video).forEach((key) => {
          if (typeof video[key] === 'string') {
            video[key] = video[key].trim();
          }
        });
      });
    });

    // Check duplicate
    const uniqueValues = new Set();
    let hasDuplicate = false;
    let emptySlug = false;

    data.chapters.some((chapter) => {
      for (let obj of chapter.videos) {
        if (!obj.slug) {
          emptySlug = true;
          break;
        } else if (uniqueValues.has(obj.slug)) {
          hasDuplicate = true;
          break;
        }
        uniqueValues.add(obj.slug);
      }
      return emptySlug || hasDuplicate;
    });

    if (emptySlug)
      return {
        status: 'ERR',
        message: 'Thiếu slug video',
      };
    else if (hasDuplicate)
      return {
        status: 'ERR',
        message: 'Slug video trong các chương bị trùng lặp',
      };
    else return 0;
  }
}

export default new CourseService();
