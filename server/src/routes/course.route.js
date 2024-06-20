import express from 'express';
import CourseController from '../controllers/course.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/all-courses', CourseController.getAllCourses);
router.get('/detail-courses/:slug', CourseController.getDetailCourses);
router.post('/create-courses', CourseController.createCourse);
router.put('/update/:id', AuthMiddleware.authAdmin, CourseController.update);
router.delete('/delete/:id', AuthMiddleware.authAdmin, CourseController.delete);

export default router;
