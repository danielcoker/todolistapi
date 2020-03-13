import express from 'express';
import authRoute from './auth';
import tasksRoute from './tasks';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/tasks', tasksRoute);

export default router;
