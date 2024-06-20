import Course from '../../models/course.model.js';

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
}

export default new CourseService();
