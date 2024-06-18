import express from 'express';
import CourseController from '../controllers/course.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/all', CourseController.index);
router.get('/detail/:slug', CourseController.get);
router.post('/add', AuthMiddleware.authAdmin, CourseController.add);
router.put('/update/:id', AuthMiddleware.authAdmin, CourseController.update);
router.delete('/delete/:id', AuthMiddleware.authAdmin, CourseController.delete);

export default router;
