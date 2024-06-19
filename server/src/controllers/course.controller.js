import Course from '../models/course.model.js';

class CourseController {
  // Get all courses
  async index(req, res) {
    try {
      const result = await Course.find({}).select('name image slug').lean();
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get course detail
  async get(req, res) {
    try {
      const { slug } = req.params;
      const result = await Course.findOne({ slug: slug })
        .select('name description image video chapters.namechapter chapters.videos.childname chapters.videos.slug')
        .lean();
      if (!result) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add course
  async add(req, res) {
    try {
      await Course.create(req.body);
      res.status(201).json({ message: 'Add course successfully!' });
    } catch (error) {
      if (error.message.includes('validation')) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  // Delete course
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await Course.findById(id);
      if (!result) res.status(404).json({ message: 'Course not found' });
      else {
        await result.deleteOne();
        res.status(200).json({ message: 'Delete course successfully!' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update course
  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await Course.findById(id);
      if (!result) res.status(404).json({ message: 'Course not found' });
      else {
        await result.updateOne(req.body);
        res.status(200).json({ message: 'Update course successfully!' });
      }
    } catch (error) {
      if (error.message.includes('validation')) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CourseController();
