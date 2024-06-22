import {CourseModel} from '../../models/index.js';

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

    const allCourses = await CourseModel.find(query, null, options)

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
    try {
      const checkCourse = await CourseModel.findOne({slug: slug})
      if(!checkCourse) {
        return {
          status: 'ERR',
          message: 'Khóa học không tồn tại'
        }
      }
      return {
        status: 200,
        data: checkCourse,
        message: 'Show dữ liệu thành công'
      }
    }catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async createCourse(data) {
    try {
      const { name, description, image, video, chapters, price, priceAmount } = data;
      
      // Check if the course already exists
      const checkCourse = await CourseModel.findOne({ name });
      if (checkCourse) {
        return {
          status: "ERR",
          message: 'Khóa học đã tồn tại'
        };
      }
      
      // Create the new course
      const createCourse = await CourseModel.create(data);
      if (createCourse) {
        return {
          status: 200,
          data: createCourse,
          message: 'Đã tạo khóa học thành công'
        };
      }
    } catch (error) {
      // Throw the error to be handled by the controller
      throw new Error(error.message);
    }
  }

  async updateCourses (id, data) {
    try {
      const checkCourses = await CourseModel.findOne({_id: id })
      if(!checkCourses) {
        return {
          status: 'ERR',
          message: 'Không tìn thấy id này'
        }
      }
      const updateCourse = await CourseModel.findByIdAndUpdate(id, data,{ new: true })
    return {
      status: 200,
      message: `Cập nhập thành công id : ${updateCourse._id}`,
      data: {
        ...updateCourse._doc,
      }
    }
  }catch(error) {
    throw new Error(error.message);
  }
  }

  async deleteCourses (id) {
    try {
      const checkCourses = await CourseModel.findById(id)
      if(!checkCourses) {
        return {
          status: 'ERR',
          message: "Id này không tồn tại"
        }
      }
       await CourseModel.findOneAndDelete({ _id: id });
      return {
        status: 200,
        message: 'Đã xóa thành công '
      }
    }catch(error) {
      throw new Error(error.message);
    }
  }
}

export default new CourseService();