import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router
  .route('/')
  .get(controllers.tasks.getTasks)
  .post(controllers.tasks.createTask);

export default router;
