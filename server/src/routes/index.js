import express from 'express';
import Login_RegisterRouter from './routers/login_register.js';
import UserRouter from './routers/user.js';

const router = express.Router();

router.use('/', Login_RegisterRouter);
router.use('/user', UserRouter);

export default router;
