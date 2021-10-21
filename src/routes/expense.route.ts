/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import expenseController from '@controllers/expense.controller';
import { authenticate } from '@utils/auth.util';

const router = express.Router();

router.post('/create', authenticate, expenseController.create);
router.get('/all', authenticate, expenseController.all);

export default router;
