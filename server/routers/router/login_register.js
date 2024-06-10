import express from  'express'
import {Login_registerController} from '../../controllers/index.js'

const router = express.Router()

router.post('/login-in',Login_registerController.loginIn)
router.post('/register',Login_registerController.Register)
router.post('/login-out',Login_registerController.logout)
router.post('/forgot-password', Login_registerController.forgotPassword);
router.post('/reset-password', Login_registerController.resetPassword);
export default router