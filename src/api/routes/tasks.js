import express from 'express';
import controllers from '../controllers';
import { protect } from '../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(controllers.tasks.getTasks)
  .post(protect, controllers.tasks.createTask);

export default router;
