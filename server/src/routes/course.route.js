import express from 'express';
import CourseController from '../controllers/course.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/get-all', CourseController.index);
router.post('/add', AuthMiddleware.authAdmin, CourseController.add);
router.get('/detail/:id', CourseController.get);
router.put('/update/:id', AuthMiddleware.authAdmin, CourseController.update);
router.delete('/delete/:id', AuthMiddleware.authAdmin, CourseController.delete);

export default router;
