import express from 'express';
import UserCourseController from '../controllers/user_course.controller.js';

const router = express.Router();

router.post('/start-course', UserCourseController.createUserCourse);
router.get('/user-course/:userId/:courseId', UserCourseController.getUserCourse);
router.post('/update-progress', UserCourseController.updateProgress);

export default router;
