import Router from 'express';
import { check } from 'express-validator';

import authMiddleware from '../middlewares/auth.js';
import authController from '../controllers/auth.js';

const router = Router();

const validations = [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Password must be longer than 3 and shorter that 12 characters').isLength({ min: 3, max: 12 }),
];

router.post('/registration', ...validations, authController.registerUser);
router.post('/login', authController.login);
router.get('/', authMiddleware, authController.authorizeUser);

export default router;
