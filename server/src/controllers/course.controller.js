import Course from '../models/course.model.js';

class CourseController {
  // Get all courses
  async index(req, res) {
    try {
      const result = await Course.find({});

      return res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get course detail
  async get(req, res) {
    try {
      const { id } = req.params;
      const result = await Course.findById(id);
      if (!result) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add course
  async add(req, res) {
    try {
      if (!req.body.title || !req.body.image || !req.body.description || !req.body.author)
        return res.status(400).json({ message: 'Missing required fields!' });

      const course = {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        author: req.body.author,
      };

      await Course.create(course);

      res.status(201).json({ message: 'Add course successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete course
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await Course.findByIdAndDelete(id);

      if (!result) return res.status(404).json({ message: 'Course not found' });

      res.status(200).json({ message: 'Delete course successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update course
  async update(req, res) {
    try {
      if (!req.body.title || !req.body.image || !req.body.description || !req.body.author)
        return res.status(400).json({ message: 'Missing required fields!' });

      const { id } = req.params;
      const course = {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        author: req.body.author,
      };

      const result = await Course.findByIdAndUpdate(id, course);

      if (!result) return res.status(404).json({ message: 'Course not found' });
      res.status(201).json({ message: 'Update course successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CourseController();
