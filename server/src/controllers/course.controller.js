import Course from '../models/course.model.js';

class CourseController {
  // Get all courses
  async index(req, res) {
    try {
      const result = await Course.find({}, 'title image slug');
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get course detail
  async get(req, res) {
    try {
      const { slug } = req.params;
      const result = await Course.populate('lessons', { title: 1, slug: 1 }).findOne({ slug: slug });
      if (!result) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add course
  async add(req, res) {
    try {
      if (!req.body.title || !req.body.description || !req.body.user_id)
        return res.status(400).json({ message: 'Missing required fields!' });
      await Course.create(req.body);
      res.status(201).json({ message: 'Add course successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete course
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await Course.findById(id);
      if (!result) res.status(404).json({ message: 'Course not found' });
      else if (result.user_id === req.body.user_id) {
        await result.deleteOne();
        res.status(200).json({ message: 'Delete course successfully!' });
      } else res.status(403).json({ message: 'Unauthorized to delete this course!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update course
  async update(req, res) {
    try {
      if (!req.body.title || !req.body.description || !req.body.user_id)
        return res.status(400).json({ message: 'Missing required fields!' });
      const { id } = req.params;
      const result = await Course.findById(id);
      if (!result) res.status(404).json({ message: 'Course not found' });
      else if (result.user_id === req.body.user_id) {
        await result.updateOne(req.body);
        res.status(200).json({ message: 'Update course successfully!' });
      } else res.status(403).json({ message: 'Unauthorized to update this course!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CourseController();
