import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.get('/register', controllers.auth.register);
router.get('/login', controllers.auth.login);

export default router;
