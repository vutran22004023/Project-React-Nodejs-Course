import Course from '../models/course.model';

class CourseController {
  async getCourses(req, res) {
    try {
      if (!req.body.coursename || !req.body.email || !req.body.password)
        return res.status(400).json({ message: 'Missing required fields' });

      const newCourse = {
        coursename: req.body.coursename,
        email: req.body.email,
        password: createHash('sha256').update(req.body.password).digest('hex'),
      };

      await Course.create(newCourse);

      return res.status(201).json({ message: 'Register successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async getCourse(req, res) {
    try {
      if (!req.body.coursenameOrEmail || !req.body.password)
        return res.status(400).json({ message: 'Missing required fields!' });

      const course = await Course.findOne({
        $or: [{ coursename: req.body.coursenameOrEmail }, { email: req.body.coursenameOrEmail }],
      });

      if (!course) return res.status(404).json({ message: 'Course not found!' });

      if (course.password !== createHash('sha256').update(req.body.password).digest('hex'))
        return res.status(401).json({ message: 'Credentials incorrect!' });

      const { token, expires } = issueJWT(course);

      const { password, ...auth } = course._doc;

      return res
        .status(200)
        .cookie('jwtToken', token, { maxAge: expires, httpOnly: true })
        .json({ success: true, message: 'Login successfully!', course: auth });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async addCourse(req, res) {
    try {
      const { id } = req.params;
      const course = await Course.findById(id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json(course);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async deleteCourse(req, res) {
    try {
      const courses = await Course.find({});
      res.status(200).json({ sucess: true, courses: courses });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const course = await Course.findById(id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json(course);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CourseController();
