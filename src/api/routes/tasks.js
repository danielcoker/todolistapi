import express from 'express';
import controllers from '../controllers';
import { protect } from '../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(controllers.tasks.getTasks)
  .post(protect, controllers.tasks.createTask);

router.route('/:slug').put(protect, controllers.tasks.updateTask);

export default router;
