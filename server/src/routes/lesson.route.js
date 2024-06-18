import express from 'express';
import LessonController from '../controllers/lesson.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

// router.get('/get-all', LessonController.index);
router.get('/detail/:slug', AuthMiddleware.authUser, LessonController.get);
router.post('/add', AuthMiddleware.authAdmin, LessonController.add);
router.put('/update/:id', AuthMiddleware.authAdmin, LessonController.update);
router.delete('/delete/:id', AuthMiddleware.authAdmin, LessonController.delete);

export default router;
