import express from 'express';
import CourseController from '../controllers/course.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/get-all', CourseController.getCourses);
router.get('/detail/:id', CourseController.getCourse);
router.put('/update/:id', AuthMiddleware.authAdmin, CourseController.updateCourse);
router.delete('/delete/:id', AuthMiddleware.authAdmin, CourseController.deleteCourse);

export default router;
