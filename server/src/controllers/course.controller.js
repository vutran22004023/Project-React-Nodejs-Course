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

    async updateCourses (req, res) {
      try{
        const { id } = req.params;
        const data = req.body;
        if(!id){
          return res.status(200).json({
            status: 'ERR',
            message: 'Chưa truyền id'
          })
        }
        if(!data) {
          return res.status(200).json({
            status: 'ERR',
            message: 'Chưa truyền đầy đủ thông tin'
          })
        }

        const result = await CourseService.updateCourses(id, data)
        return res.status(200).json(result);
      }catch (error) {
        res.status(500).json({ message: error.message });
      }
    }


    
    async deleteCourses(req, res) {
      try {
        const { id } = req.params;
        if(!id) {
          return res.status(200).json({
            status: 200,
            message: 'Chưa điền thông tin'
          })
        }
        
        const result = await CourseService.deleteCourses(id);
        return res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

}

export default new CourseController();
