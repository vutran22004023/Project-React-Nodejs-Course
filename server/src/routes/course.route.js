import express from 'express';
import CourseController from '../controllers/course.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/get-all-users', CourseController.getCourses);
router.get('/get-detail-user/:id', AuthMiddleware.authUser, CourseController.getCourse);
router.put('/update-user/:id', AuthMiddleware.authUser, CourseController.updateCourse);
router.delete('/delete-user/:id', AuthMiddleware.authAdmin, CourseController.deleteCourse);

export default router;
