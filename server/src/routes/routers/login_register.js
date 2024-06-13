import express from 'express';
import Login_registerController from '../../controllers/auth.controller.js';

const router = express.Router();

router.post('/login-in', Login_registerController.loginIn);
router.post('/register', Login_registerController.Register);
router.post('/login-out', Login_registerController.logout);
router.post('/forgot-password', Login_registerController.forgotPassword);
router.post('/reset-password', Login_registerController.resetPassword);
router.post('/authenticate-user', Login_registerController.authenticateUser);

export default router;
