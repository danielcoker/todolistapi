import express from 'express';

/**
 * Router files.
 */
import auth from './auth';

const router = express.Router();

router.use('/auth', auth);

export default router;
