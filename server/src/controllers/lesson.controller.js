import Lesson from '../models/lesson.model.js';

class LessonController {
  // Get all lessons
  // async index(req, res) {
  //   try {
  //     const result = await Lesson.find({});
  //     res.status(200).json({ data: result });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // Get lesson detail
  async get(req, res) {
    try {
      const { slug } = req.params;
      const result = await Lesson.findOne({ slug: slug });
      if (!result) return res.status(404).json({ message: 'Lesson not found' });
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add lesson
  async add(req, res) {
    try {
      if (!req.body.title || !req.body.video || !req.body.course_id)
        return res.status(400).json({ message: 'Missing required fields!' });
      await Lesson.create(req.body);
      res.status(201).json({ message: 'Add lesson successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete lesson
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await Lesson.populate('courses', { user_id: 1 }).findById(id);
      if (!result) res.status(404).json({ message: 'Lesson not found' });
      else if (result.user_id === req.body.user_id) {
        await result.deleteOne();
        res.status(200).json({ message: 'Delete lesson successfully!' });
      } else res.status(403).json({ message: 'Unauthorized to delete this lesson!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update lesson
  async update(req, res) {
    try {
      if (!req.body.title || !req.body.video || !req.body.course_id)
        return res.status(400).json({ message: 'Missing required fields!' });
      const { id } = req.params;
      const result = await Lesson.populate('courses', { user_id: 1 }).findById(id);
      if (!result) res.status(404).json({ message: 'Lesson not found' });
      else if (result.user_id === req.body.user_id) {
        await result.updateOne(req.body);
        res.status(200).json({ message: 'Update lesson successfully!' });
      } else res.status(403).json({ message: 'Unauthorized to update this lesson!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new LessonController();
