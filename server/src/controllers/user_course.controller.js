import { UserCourseService } from '../services/index.js';

class UserCourseController {
  // Get user-course
  async getUserCourse(req, res) {
    try {
      const result = await UserCourseService.getUserCourse(req.params);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Start user-course
  async createUserCourse(req, res) {
    try {
      const result = await UserCourseService.createUserCourse(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update progress
  async updateProgress(req, res) {
    try {
      const result = await UserCourseService.updateProgress(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserCourseController();
