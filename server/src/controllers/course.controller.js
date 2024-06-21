import Course from '../models/course.model.js';
import { CourseService } from '../services/index.js';
import mongoose from 'mongoose';

class CourseController {
  // Get all courses
  async getAllCourses(req, res) {
    try {
      const { limit, page, sort, filter } = req.query;
      const limitValue = parseInt(limit) || 30;
      const pageValue = parseInt(page) || 0;
      const sortArray = sort ? sort.split(':') : null;
      const filterArray = filter ? filter.split(':') : null;
      const result = await CourseService.getAllCourses(limitValue, pageValue, sortArray, filterArray);
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get course detail
  async getDetailCourses(req, res) {
    try {
      const { slug } = req.params;
      if (!slug)
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa điền đầy đủ thông tin ',
        });
      const result = await CourseService.getDetaiCourse(slug)
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add course
  async createCourse(req, res) {
    try {
      const { name, description, image, video, chapters, price, priceAmount } = req.body;
      
      // Check for missing fields
      if (!name   || !video || !chapters || !price) {
        return res.status(200).json({
          status: 'ERR',
          message: 'Chưa điền đầy đủ thông tin'
        });
      }
      
      // Call the service method to create the course
      const result = await CourseService.createCourse(req.body);
      
      // Send the result back to the client
      return res.status(200).json(result);
    } catch (error) {
      // Handle validation errors specifically
      if (error.message.includes('validation')) {
        return res.status(400).json({ message: error.message });
      }
      
      // Handle general errors
      return res.status(500).json({ message: error.message });
    }
  }

  // Delete course
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ status: 400, message: 'ID không hợp lệ!' });
      }
      const result = await Course.findOneAndDelete({ _id: id });
      if (!result)
        res.status(404).json({
          status: 404,
          message: 'Không tìm thấy khóa học!',
        });
      else
        res.status(200).json({
          status: 200,
          message: `Đã xóa khóa học id: ${result._id}`,
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update course
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          status: 400,
          message: 'ID không hợp lệ!',
        });
      }

      const result = await Course.findOneAndUpdate(
        { _id: id },
        { $set: { chapters: req.body.chapters } },
        { new: true, runValidators: true }
      ).lean();

      if (!result)
        res.status(404).json({
          status: 404,
          message: 'Không tìm thấy khóa học!',
        });
      else
        res.status(200).json({
          status: 200,
          message: `Đã cập nhật khóa học id: ${result._id}`,
          data: result,
        });
    } catch (error) {
      if (error.message.includes('validation')) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CourseController();
