import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.get('/register', controllers.auth.register);

export default router;
