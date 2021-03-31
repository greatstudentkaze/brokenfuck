import Router from 'express';
import { check } from 'express-validator';

import authController from '../controllers/auth.js';

const router = Router();

const validations = [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Password must be longer than 3 and shorter that 12 characters').isLength({ min: 3, max: 12 }),
];

router.post('/registration', ...validations, authController.registerUser);

export default router;
