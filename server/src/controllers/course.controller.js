import Course from '../models/model/course.model';

class CourseController {
  async register(req, res) {
    try {
      if (!req.body.username || !req.body.email || !req.body.password)
        return res.status(400).json({ message: 'Missing required fields' });

      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: createHash('sha256').update(req.body.password).digest('hex'),
      };

      await User.create(newUser);

      return res.status(201).json({ message: 'Register successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      if (!req.body.usernameOrEmail || !req.body.password)
        return res.status(400).json({ message: 'Missing required fields!' });

      const user = await User.findOne({
        $or: [{ username: req.body.usernameOrEmail }, { email: req.body.usernameOrEmail }],
      });

      if (!user) return res.status(404).json({ message: 'User not found!' });

      if (user.password !== createHash('sha256').update(req.body.password).digest('hex'))
        return res.status(401).json({ message: 'Credentials incorrect!' });

      const { token, expires } = issueJWT(user);

      const { password, ...auth } = user._doc;

      return res
        .status(200)
        .cookie('jwtToken', token, { maxAge: expires, httpOnly: true })
        .json({ success: true, message: 'Login successfully!', user: auth });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await User.find({});
      res.status(200).json({ sucess: true, users: users });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CourseController();
