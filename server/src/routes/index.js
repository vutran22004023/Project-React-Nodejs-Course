import express from 'express';
import Login_RegisterRouter from './login_register.route.js';
import UserRouter from './user.route.js';
import CourseRouter from './course.route.js';

const router = express.Router();

router.use('/', Login_RegisterRouter);
router.use('/user', UserRouter);
router.use('/course', CourseRouter);

export default router;
