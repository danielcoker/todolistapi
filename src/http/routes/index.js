import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.get('/home', controllers.home);

export default router;
