/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import authController from '@controllers/auth.controller';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout);
router.post('/requestrefresh', authController.requestRefresh);

export default router;
