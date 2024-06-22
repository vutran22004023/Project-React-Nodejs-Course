import express from 'express';
import CourseController from '../controllers/course.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/all-courses', CourseController.getAllCourses);
router.get('/detail-courses/:slug', CourseController.getDetailCourses);
router.post('/create-courses', CourseController.createCourse);
router.put('/update-courses/:id', CourseController.updateCourses);
router.delete('/delete-courses/:id', CourseController.deleteCourses);

export default router;
