import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile
} from './userController.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route
router.get('/:id', getProfile);

export default router;